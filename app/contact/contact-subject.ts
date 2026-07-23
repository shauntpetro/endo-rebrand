import { CONTACT_SUBJECTS } from "@/lib/site";

export type ContactSubjectValue = (typeof CONTACT_SUBJECTS)[number]["value"];

export const DEFAULT_CONTACT_SUBJECT: ContactSubjectValue = "general";

export function parseContactSubject(
  value: string | string[] | null | undefined,
): ContactSubjectValue | null {
  const candidate = Array.isArray(value) ? value[0] : value;

  return CONTACT_SUBJECTS.some((subject) => subject.value === candidate)
    ? (candidate as ContactSubjectValue)
    : null;
}
