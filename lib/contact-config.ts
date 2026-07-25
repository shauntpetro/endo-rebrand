const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const MAX_EMAIL_LENGTH = 254;

export const FORM_RATE_LIMIT_MESSAGE =
  "The submission limit was reached. Your entered details remain in this form.";

/**
 * Validate and normalize a mailbox used in public UI or delivery configuration.
 * Display-name formats are intentionally rejected so callers can construct
 * trusted headers themselves.
 */
export function normalizeContactEmail(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;

  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    normalized.length > MAX_EMAIL_LENGTH ||
    /[\r\n]/.test(normalized) ||
    normalized.split("@", 1)[0]?.startsWith(".") ||
    normalized.split("@", 1)[0]?.endsWith(".") ||
    normalized.split("@", 1)[0]?.includes("..") ||
    !EMAIL_PATTERN.test(normalized)
  ) {
    return null;
  }

  return normalized;
}

/**
 * Public contact details are intentionally configuration-driven. An empty
 * value keeps unapproved domains out of the rendered site and recovery copy.
 */
export const PUBLIC_CONTACT_EMAIL =
  normalizeContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "";

export function withPublicContactRecovery(
  message: string,
  contactEmail: string | null | undefined = PUBLIC_CONTACT_EMAIL,
): string {
  const normalizedEmail = normalizeContactEmail(contactEmail);
  const normalizedMessage = message.trim();

  return normalizedEmail
    ? `${normalizedMessage} You can also email ${normalizedEmail} directly.`
    : normalizedMessage;
}
