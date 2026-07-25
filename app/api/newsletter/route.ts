import { NextRequest } from "next/server";
import {
  FORM_RATE_LIMIT_MESSAGE,
  normalizeContactEmail,
} from "@/lib/contact-config";
import {
  JsonBodyTooLargeError,
  readLimitedJson,
} from "@/lib/server/read-json-body";
import {
  formResponse,
  getFormRequestMode,
  jsonNoStore,
  sanitizeHeaderText,
  type FormRequestMode,
  type NativeFormStatus,
} from "@/lib/server/form-api";
import {
  deliverFormEmail,
  deliveryRecoveryMessage,
} from "@/lib/server/form-delivery";
import { consumeFormRateLimit } from "@/lib/server/form-rate-limit";
import {
  readLimitedUrlEncoded,
  UrlEncodedBodyTooLargeError,
} from "@/lib/server/read-urlencoded-body";

const MAX_EMAIL_LENGTH = 254;

type NewsletterRequestBody = {
  email?: unknown;
  _honeypot?: unknown;
};

function newsletterResponse<T>(
  request: NextRequest,
  mode: FormRequestMode,
  nativeStatus: NativeFormStatus,
  body: T,
  init: ResponseInit = {},
) {
  return formResponse(request, mode, "newsletter", nativeStatus, body, init);
}

function rateLimitResponse(request: NextRequest, mode: FormRequestMode) {
  const result = consumeFormRateLimit(request);
  if (result.allowed) return null;

  return newsletterResponse(
    request,
    mode,
    "rate-limited",
    { success: false, error: FORM_RATE_LIMIT_MESSAGE },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSeconds) },
    },
  );
}

export async function POST(request: NextRequest) {
  const mode = getFormRequestMode(request);
  if (!mode) {
    return jsonNoStore(
      { success: false, error: "Invalid content type." },
      { status: 415 },
    );
  }

  const limitedResponse = rateLimitResponse(request, mode);
  if (limitedResponse) return limitedResponse;

  try {
    const body =
      mode === "native"
        ? await readLimitedUrlEncoded<NewsletterRequestBody>(request)
        : await readLimitedJson<NewsletterRequestBody>(request);
    const { email, _honeypot } = body;

    if (_honeypot) {
      return newsletterResponse(request, mode, "success", { success: true });
    }

    if (typeof email !== "string" || email.trim().length === 0) {
      return newsletterResponse(
        request,
        mode,
        "invalid",
        { success: false, error: "Email is required." },
        { status: 400 },
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return newsletterResponse(
        request,
        mode,
        "invalid",
        { success: false, error: "Email address is too long." },
        { status: 400 },
      );
    }

    const normalizedEmail = normalizeContactEmail(email);
    if (!normalizedEmail) {
      return newsletterResponse(
        request,
        mode,
        "invalid",
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const subscriberEmail = normalizedEmail.toLowerCase();
    const safeSubscriberHeader = sanitizeHeaderText(subscriberEmail);
    const timestamp = new Date().toISOString();

    const delivery = await deliverFormEmail({
      kind: "newsletter",
      senderName: "EndoCyclic Updates",
      subject: `New Company Update Request: ${safeSubscriberHeader}`,
      text: [
        "New company update request:",
        `Email: ${subscriberEmail}`,
        `Requested: ${timestamp}`,
      ].join("\n"),
    });

    if (delivery === "unconfigured") {
      return newsletterResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "Update requests are temporarily unavailable.",
          ),
        },
        { status: 503 },
      );
    }

    if (delivery === "failed") {
      return newsletterResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "We couldn’t deliver your update request. Please try again.",
          ),
        },
        { status: 502 },
      );
    }

    return newsletterResponse(request, mode, "success", { success: true });
  } catch (error) {
    if (
      error instanceof JsonBodyTooLargeError ||
      error instanceof UrlEncodedBodyTooLargeError
    ) {
      return newsletterResponse(
        request,
        mode,
        "too-large",
        { success: false, error: "Request body is too large." },
        { status: 413 },
      );
    }

    return newsletterResponse(
      request,
      mode,
      "invalid",
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
