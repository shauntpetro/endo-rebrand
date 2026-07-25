import { NextRequest } from "next/server";
import {
  FORM_RATE_LIMIT_MESSAGE,
  normalizeContactEmail,
} from "@/lib/contact-config";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/form-messages";
import {
  JsonBodyTooLargeError,
  readLimitedJson,
} from "@/lib/server/read-json-body";
import {
  formResponse,
  getFormRequestMode,
  jsonNoStore,
  sanitizeFormText,
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

const VALID_SUBJECTS = [
  "partnership",
  "media",
  "investor",
  "career",
  "general",
  "other",
  "data",
  "report",
] as const;
const MAX_FIELD_LENGTH = {
  name: 200,
  email: 254,
  company: 200,
  subject: 50,
  message: 5000,
};

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
  _honeypot?: unknown;
};

function contactResponse<T>(
  request: NextRequest,
  mode: FormRequestMode,
  nativeStatus: NativeFormStatus,
  body: T,
  init: ResponseInit = {},
) {
  return formResponse(request, mode, "contact", nativeStatus, body, init);
}

function rateLimitResponse(request: NextRequest, mode: FormRequestMode) {
  const result = consumeFormRateLimit(request);
  if (result.allowed) return null;

  return contactResponse(
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
        ? await readLimitedUrlEncoded<ContactRequestBody>(request)
        : await readLimitedJson<ContactRequestBody>(request);
    const { name, email, company, subject, message, _honeypot } = body;

    if (_honeypot) {
      return contactResponse(request, mode, "success", {
        success: true,
        message: CONTACT_SUCCESS_MESSAGE,
      });
    }

    const errors: string[] = [];

    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required.");
    } else if (name.length > MAX_FIELD_LENGTH.name) {
      errors.push(`Name must be under ${MAX_FIELD_LENGTH.name} characters.`);
    }

    if (typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email is required.");
    } else if (email.length > MAX_FIELD_LENGTH.email) {
      errors.push("Email address is too long.");
    } else if (!normalizeContactEmail(email)) {
      errors.push("Please provide a valid email address.");
    }

    if (company !== undefined && typeof company !== "string") {
      errors.push("Company must be text.");
    } else if (
      typeof company === "string" &&
      company.length > MAX_FIELD_LENGTH.company
    ) {
      errors.push(
        `Company must be under ${MAX_FIELD_LENGTH.company} characters.`,
      );
    }

    if (subject !== undefined && typeof subject !== "string") {
      errors.push("Please select a valid subject.");
    } else if (
      typeof subject === "string" &&
      (subject.length > MAX_FIELD_LENGTH.subject ||
        !VALID_SUBJECTS.includes(
          subject.trim() as (typeof VALID_SUBJECTS)[number],
        ))
    ) {
      errors.push("Please select a valid subject.");
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      errors.push("Message is required and must be at least 10 characters.");
    } else if (message.length > MAX_FIELD_LENGTH.message) {
      errors.push(
        `Message must be under ${MAX_FIELD_LENGTH.message} characters.`,
      );
    }

    if (errors.length > 0) {
      return contactResponse(
        request,
        mode,
        "invalid",
        { success: false, error: errors.join(" ") },
        { status: 400 },
      );
    }

    // The validation branches above prove these fields are strings.
    const safeName = sanitizeHeaderText(name as string);
    const safeEmail = normalizeContactEmail(email as string)!;
    const safeCompany =
      typeof company === "string" ? sanitizeFormText(company) : "";
    const safeSubject =
      typeof subject === "string" ? subject.trim() : "general";
    const safeMessage = sanitizeFormText(message as string);

    if (!safeName || safeMessage.length < 10) {
      return contactResponse(
        request,
        mode,
        "invalid",
        {
          success: false,
          error: "Please provide a valid name and message.",
        },
        { status: 400 },
      );
    }

    const delivery = await deliverFormEmail({
      kind: "contact",
      senderName: "EndoCyclic Contact Form",
      subject: `New Contact Form: ${safeSubject} — ${safeName}`,
      replyTo: safeEmail,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Company: ${safeCompany || "Not provided"}`,
        `Subject: ${safeSubject}`,
        `Message:\n${safeMessage}`,
        `\n---\nSubmitted: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (delivery === "unconfigured") {
      return contactResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "Message delivery is temporarily unavailable.",
          ),
        },
        { status: 503 },
      );
    }

    if (delivery === "failed") {
      return contactResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "We couldn’t deliver your message. Please try again.",
          ),
        },
        { status: 502 },
      );
    }

    return contactResponse(request, mode, "success", {
      success: true,
      message: CONTACT_SUCCESS_MESSAGE,
    });
  } catch (error) {
    if (
      error instanceof JsonBodyTooLargeError ||
      error instanceof UrlEncodedBodyTooLargeError
    ) {
      return contactResponse(
        request,
        mode,
        "too-large",
        { success: false, error: "Request body is too large." },
        { status: 413 },
      );
    }

    return contactResponse(
      request,
      mode,
      "invalid",
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
