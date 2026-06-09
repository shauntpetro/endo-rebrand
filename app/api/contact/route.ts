import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Resend client — gracefully falls back to console.log if no API key is set
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60_000 });
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Clean up stale entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = ["partnership", "media", "investor", "career", "general", "other", "data", "report"];
const MAX_FIELD_LENGTH = { name: 200, email: 254, company: 200, subject: 50, message: 5000 };

export async function POST(request: NextRequest) {
  // Periodically clean up stale rate limit entries
  cleanupRateLimitMap();

  // Rate limiting
  const rateLimitKey = getRateLimitKey(request);
  if (!checkRateLimit(rateLimitKey)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Content-Type check
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "Invalid content type." },
      { status: 415 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, subject, message, _honeypot } = body;

    // Honeypot check - if this hidden field is filled, it's likely a bot
    if (_honeypot) {
      // Silently accept to not tip off the bot, but don't process
      return NextResponse.json({
        success: true,
        message: "Thank you for your message. We'll get back to you soon.",
      });
    }

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required.");
    } else if (name.length > MAX_FIELD_LENGTH.name) {
      errors.push(`Name must be under ${MAX_FIELD_LENGTH.name} characters.`);
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email is required.");
    } else if (email.length > MAX_FIELD_LENGTH.email) {
      errors.push("Email address is too long.");
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.push("Please provide a valid email address.");
    }

    if (subject && typeof subject === "string" && !VALID_SUBJECTS.includes(subject.trim())) {
      errors.push("Please select a valid subject.");
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.push("Message is required and must be at least 10 characters.");
    } else if (message.length > MAX_FIELD_LENGTH.message) {
      errors.push(`Message must be under ${MAX_FIELD_LENGTH.message} characters.`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(" ") },
        { status: 400 }
      );
    }

    // Sanitize inputs (strip potential HTML/script injection)
    const sanitize = (s: string) => s.trim().replace(/<[^>]*>/g, "");

    const sanitizedData = {
      name: sanitize(name),
      email: email.trim(),
      company: company ? sanitize(company) : "",
      subject: subject?.trim() || "general",
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    };

    // Log the submission
    console.log("[Contact Form Submission]", sanitizedData);

    // Send email notification via Resend if configured
    if (resend) {
      try {
        await resend.emails.send({
          from: "EndoCyclic Contact Form <contact@endocyclic.com>",
          to: ["info@endocyclic.com"],
          subject: `New Contact Form: ${sanitizedData.subject} — ${sanitizedData.name}`,
          replyTo: sanitizedData.email,
          text: [
            `Name: ${sanitizedData.name}`,
            `Email: ${sanitizedData.email}`,
            `Company: ${sanitizedData.company || "Not provided"}`,
            `Subject: ${sanitizedData.subject}`,
            `Message:\n${sanitizedData.message}`,
            `\n---\nSubmitted: ${sanitizedData.timestamp}`,
          ].join("\n"),
        });
      } catch (emailError) {
        // Log but don't fail the request — the form data is already logged
        console.error("[Resend Error]", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
