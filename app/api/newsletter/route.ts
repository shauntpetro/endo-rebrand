import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Resend client — gracefully falls back to console.log if no API key is set
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

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
    const { email, _honeypot } = body;

    // Honeypot check - silently accept to not tip off bots
    if (_honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const subscriberEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();

    // Log the subscription
    console.log("[Newsletter Subscription]", { email: subscriberEmail, timestamp });

    // Send notification email via Resend if configured
    if (resend) {
      try {
        await resend.emails.send({
          from: "EndoCyclic Newsletter <contact@endocyclic.com>",
          to: ["info@endocyclic.com"],
          subject: `New Newsletter Subscriber: ${subscriberEmail}`,
          text: [
            "New newsletter subscription:",
            `Email: ${subscriberEmail}`,
            `Subscribed: ${timestamp}`,
          ].join("\n"),
        });
      } catch (emailError) {
        // Log but don't fail the request — the subscription is already logged
        console.error("[Resend Error]", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
