import { CONTACT_SUBJECTS } from "@/lib/site";

export type ContactSubjectValue = (typeof CONTACT_SUBJECTS)[number]["value"];

export const DEFAULT_CONTACT_SUBJECT: ContactSubjectValue = "general";

export const CONTACT_INTENTS = ["press", "asset"] as const;

export type ContactIntentValue = (typeof CONTACT_INTENTS)[number];

const CONTACT_SUBJECT_INTENTS = [
  "partnership",
  "investor",
  "media",
] as const satisfies readonly ContactSubjectValue[];

type ContactSearchValue = string | string[] | null | undefined;

export function parseContactSubject(
  value: ContactSearchValue,
): ContactSubjectValue | null {
  const candidate = Array.isArray(value) ? value[0] : value;

  return CONTACT_SUBJECTS.some((subject) => subject.value === candidate)
    ? (candidate as ContactSubjectValue)
    : null;
}

export function parseContactIntent(
  value: ContactSearchValue,
): ContactIntentValue | null {
  const candidate = Array.isArray(value) ? value[0] : value;

  return CONTACT_INTENTS.includes(candidate as ContactIntentValue)
    ? (candidate as ContactIntentValue)
    : null;
}

function parseContactSubjectIntent(
  value: ContactSearchValue,
): ContactSubjectValue | null {
  const candidate = Array.isArray(value) ? value[0] : value;

  return CONTACT_SUBJECT_INTENTS.includes(
    candidate as (typeof CONTACT_SUBJECT_INTENTS)[number],
  )
    ? (candidate as ContactSubjectValue)
    : null;
}

export function resolveContactRoute({
  subject,
  intent,
}: {
  subject?: ContactSearchValue;
  intent?: ContactSearchValue;
}): {
  subject: ContactSubjectValue | null;
  intent: ContactIntentValue | null;
} {
  const resolvedSubject =
    parseContactSubject(subject) ?? parseContactSubjectIntent(intent);

  return {
    subject: resolvedSubject,
    intent: resolvedSubject === "media" ? parseContactIntent(intent) : null,
  };
}
