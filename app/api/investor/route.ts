import { NextRequest } from "next/server";
import {
  FORM_RATE_LIMIT_MESSAGE,
  normalizeContactEmail,
} from "@/lib/contact-config";
import { INVESTOR_SUCCESS_MESSAGE } from "@/lib/form-messages";
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

const MAX_FIELD_LENGTH = {
  name: 200,
  email: 254,
  company: 200,
  role: 200,
  message: 5000,
};

type InvestorRequestBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  message?: unknown;
  _honeypot?: unknown;
};

function investorResponse<T>(
  request: NextRequest,
  mode: FormRequestMode,
  nativeStatus: NativeFormStatus,
  body: T,
  init: ResponseInit = {},
) {
  return formResponse(request, mode, "investor", nativeStatus, body, init);
}

function rateLimitResponse(request: NextRequest, mode: FormRequestMode) {
  const result = consumeFormRateLimit(request);
  if (result.allowed) return null;

  return investorResponse(
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
        ? await readLimitedUrlEncoded<InvestorRequestBody>(request)
        : await readLimitedJson<InvestorRequestBody>(request);
    const { name, email, company, role, message, _honeypot } = body;

    if (_honeypot) {
      return investorResponse(request, mode, "success", {
        success: true,
        message: INVESTOR_SUCCESS_MESSAGE,
      });
    }

    const errors: string[] = [];

    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("Full name is required.");
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

    if (typeof company !== "string" || company.trim().length === 0) {
      errors.push("Company or firm name is required.");
    } else if (company.length > MAX_FIELD_LENGTH.company) {
      errors.push(
        `Company name must be under ${MAX_FIELD_LENGTH.company} characters.`,
      );
    }

    if (role !== undefined && typeof role !== "string") {
      errors.push("Role must be text.");
    } else if (
      typeof role === "string" &&
      role.length > MAX_FIELD_LENGTH.role
    ) {
      errors.push(`Role must be under ${MAX_FIELD_LENGTH.role} characters.`);
    }

    if (message !== undefined && typeof message !== "string") {
      errors.push("Message must be text.");
    } else if (
      typeof message === "string" &&
      message.length > MAX_FIELD_LENGTH.message
    ) {
      errors.push(
        `Message must be under ${MAX_FIELD_LENGTH.message} characters.`,
      );
    }

    if (errors.length > 0) {
      return investorResponse(
        request,
        mode,
        "invalid",
        { success: false, error: errors.join(" ") },
        { status: 400 },
      );
    }

    const safeName = sanitizeHeaderText(name as string);
    const safeEmail = normalizeContactEmail(email as string)!;
    const safeCompany = sanitizeHeaderText(company as string);
    const safeRole = typeof role === "string" ? sanitizeFormText(role) : "";
    const safeMessage =
      typeof message === "string" ? sanitizeFormText(message) : "";

    if (!safeName || !safeCompany) {
      return investorResponse(
        request,
        mode,
        "invalid",
        {
          success: false,
          error: "Please provide a valid name and company or firm.",
        },
        { status: 400 },
      );
    }

    const delivery = await deliverFormEmail({
      kind: "investor",
      senderName: "EndoCyclic Investor Relations",
      subject: `Data Room Access Request — ${safeName} (${safeCompany})`,
      replyTo: safeEmail,
      text: [
        "=== Investor Data Room Access Request ===",
        "",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Company/Firm: ${safeCompany}`,
        `Role/Title: ${safeRole || "Not provided"}`,
        `Message: ${safeMessage || "Not provided"}`,
        "",
        "---",
        `Submitted: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (delivery === "unconfigured") {
      return investorResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "Request delivery is temporarily unavailable.",
          ),
        },
        { status: 503 },
      );
    }

    if (delivery === "failed") {
      return investorResponse(
        request,
        mode,
        "unavailable",
        {
          success: false,
          error: deliveryRecoveryMessage(
            "We couldn’t deliver your request. Please try again.",
          ),
        },
        { status: 502 },
      );
    }

    return investorResponse(request, mode, "success", {
      success: true,
      message: INVESTOR_SUCCESS_MESSAGE,
    });
  } catch (error) {
    if (
      error instanceof JsonBodyTooLargeError ||
      error instanceof UrlEncodedBodyTooLargeError
    ) {
      return investorResponse(
        request,
        mode,
        "too-large",
        { success: false, error: "Request body is too large." },
        { status: 413 },
      );
    }

    return investorResponse(
      request,
      mode,
      "invalid",
      { success: false, error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
