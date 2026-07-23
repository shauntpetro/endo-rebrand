import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Delivery must be configured before a real submission can be accepted.
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
const MAX_FIELD_LENGTH = {
  name: 200,
  email: 254,
  company: 200,
  role: 200,
  message: 5000,
};

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
    const { name, email, company, role, message, _honeypot } = body;

    // Honeypot check - if this hidden field is filled, it's likely a bot
    if (_honeypot) {
      // Silently accept to not tip off the bot, but don't process
      return NextResponse.json({
        success: true,
        message:
          "Thank you for your request. Our team will review and respond shortly.",
      });
    }

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Full name is required.");
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

    if (!company || typeof company !== "string" || company.trim().length === 0) {
      errors.push("Company or firm name is required.");
    } else if (company.length > MAX_FIELD_LENGTH.company) {
      errors.push(
        `Company name must be under ${MAX_FIELD_LENGTH.company} characters.`
      );
    }

    if (role && typeof role === "string" && role.length > MAX_FIELD_LENGTH.role) {
      errors.push(
        `Role must be under ${MAX_FIELD_LENGTH.role} characters.`
      );
    }

    if (
      message &&
      typeof message === "string" &&
      message.length > MAX_FIELD_LENGTH.message
    ) {
      errors.push(
        `Message must be under ${MAX_FIELD_LENGTH.message} characters.`
      );
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
      company: sanitize(company),
      role: role ? sanitize(role) : "",
      message: message ? sanitize(message) : "",
      timestamp: new Date().toISOString(),
    };

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          error: "Request delivery is temporarily unavailable. Please email info@endocyclic.com directly.",
        },
        { status: 503 },
      );
    }

    try {
      const { error } = await resend.emails.send({
          from: "EndoCyclic Investor Relations <investor@endocyclic.com>",
          to: ["info@endocyclic.com"],
          subject: `Data Room Access Request — ${sanitizedData.name} (${sanitizedData.company})`,
          replyTo: sanitizedData.email,
          text: [
            `=== Investor Data Room Access Request ===`,
            ``,
            `Name: ${sanitizedData.name}`,
            `Email: ${sanitizedData.email}`,
            `Company/Firm: ${sanitizedData.company}`,
            `Role/Title: ${sanitizedData.role || "Not provided"}`,
            `Message: ${sanitizedData.message || "Not provided"}`,
            ``,
            `---`,
            `Submitted: ${sanitizedData.timestamp}`,
          ].join("\n"),
      });
      if (error) throw error;
    } catch (emailError) {
      console.error("[Investor request delivery failed]", emailError);
      return NextResponse.json(
        {
          success: false,
          error: "We couldn’t deliver your request. Please try again or email info@endocyclic.com directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for your request. Our team will review and respond shortly.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
