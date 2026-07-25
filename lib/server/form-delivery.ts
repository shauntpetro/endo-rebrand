import { createHash } from "node:crypto";
import { Resend } from "resend";
import {
  normalizeContactEmail,
  withPublicContactRecovery,
} from "@/lib/contact-config";

type FormDeliveryKind = "contact" | "investor" | "newsletter";

type FormDeliveryRequest = {
  kind: FormDeliveryKind;
  senderName: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export type FormDeliveryResult = "sent" | "unconfigured" | "failed";
export const FORM_DELIVERY_TIMEOUT_MS = 8_000;

type FormDeliveryConfig = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
};

function getFormDeliveryConfig(): FormDeliveryConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = normalizeContactEmail(process.env.FORM_FROM_EMAIL);
  const toEmail = normalizeContactEmail(process.env.FORM_TO_EMAIL);
  const publicContactEmail = normalizeContactEmail(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  );

  if (!apiKey || !fromEmail || !toEmail || !publicContactEmail) {
    return null;
  }

  return {
    apiKey,
    fromEmail,
    toEmail,
  };
}

/**
 * Expose only whether every required delivery setting is valid. Server
 * components use this to avoid rendering a submission surface that cannot
 * deliver; configuration values and the reason for failure remain private.
 */
export function isFormDeliveryConfigured(): boolean {
  return getFormDeliveryConfig() !== null;
}

function safeErrorType(error: unknown): string {
  const candidate =
    error instanceof Error
      ? error.name
      : typeof error === "object" &&
          error !== null &&
          "name" in error &&
          typeof error.name === "string"
        ? error.name
        : "";

  return /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(candidate)
    ? candidate
    : "ProviderError";
}

function logDeliveryFailure(kind: FormDeliveryKind, error: unknown) {
  // Do not log provider payloads: they can contain recipient or reply-to PII.
  console.error("[Form delivery failed]", {
    form: kind,
    errorType: safeErrorType(error),
  });
}

function deliveryIdempotencyKey(request: FormDeliveryRequest): string {
  // Routes add an informational timestamp to the message body. Remove only
  // that volatile line so retrying the same logical submission is deduplicated
  // by the provider without putting contact details into the header.
  const stableText = request.text.replace(
    /^(Submitted|Requested):\s+.*$/gm,
    "$1:",
  );
  const digest = createHash("sha256")
    .update(
      JSON.stringify([
        request.kind,
        request.senderName,
        request.subject,
        request.replyTo ?? "",
        stableText,
      ]),
    )
    .digest("hex");

  return `form-${request.kind}-${digest}`;
}

export function deliveryRecoveryMessage(message: string): string {
  return withPublicContactRecovery(
    message,
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  );
}

export async function deliverFormEmail(
  request: FormDeliveryRequest,
): Promise<FormDeliveryResult> {
  const config = getFormDeliveryConfig();
  if (!config) return "unconfigured";

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    FORM_DELIVERY_TIMEOUT_MS,
  );

  try {
    const resend = new Resend(config.apiKey);
    const deliveryOptions = {
      idempotencyKey: deliveryIdempotencyKey(request),
      // Resend forwards request options to fetch even though the current SDK
      // type omits RequestInit.signal.
      signal: controller.signal,
    };
    const { error } = await resend.emails.send(
      {
        from: `${request.senderName} <${config.fromEmail}>`,
        to: [config.toEmail],
        subject: request.subject,
        replyTo: request.replyTo,
        text: request.text,
      },
      deliveryOptions,
    );

    if (error) {
      logDeliveryFailure(
        request.kind,
        controller.signal.aborted
          ? { name: "FormDeliveryTimeoutError" }
          : error,
      );
      return "failed";
    }

    return "sent";
  } catch (error) {
    logDeliveryFailure(
      request.kind,
      controller.signal.aborted
        ? { name: "FormDeliveryTimeoutError" }
        : error,
    );
    return "failed";
  } finally {
    clearTimeout(timeout);
  }
}
