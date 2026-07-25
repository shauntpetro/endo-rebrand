import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import RecoveryTrace from "@/components/site/RecoveryTrace";
import Section from "@/components/site/Section";
import {
  CONTACT_SUCCESS_MESSAGE,
  INVESTOR_SUCCESS_MESSAGE,
  NEWSLETTER_SUCCESS_MESSAGE,
} from "@/lib/form-messages";
import {
  normalizeNativeReturnPath,
  type NativeFormKind,
  type NativeFormStatus,
} from "@/lib/server/form-api";
import DraftRecoveryLink from "./DraftRecoveryLink";

// Submission outcomes are query-specific and must never enter the public HTML
// cache inherited by the rest of the site.
export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchValue = string | string[] | undefined;

type FormResponsePageProps = {
  searchParams: Promise<Record<string, SearchValue>>;
};

const FORM_KINDS = new Set<NativeFormKind>([
  "contact",
  "investor",
  "newsletter",
]);
const FORM_STATUSES = new Set<NativeFormStatus>([
  "success",
  "invalid",
  "too-large",
  "rate-limited",
  "unavailable",
]);

const SUCCESS_DESTINATIONS: Record<
  NativeFormKind,
  { href: string; label: string }
> = {
  contact: {
    href: "/",
    label: "Return home",
  },
  investor: {
    href: "/pipeline",
    label: "Review the pipeline",
  },
  newsletter: {
    href: "/news",
    label: "Read company news",
  },
};

const RECOVERY_DESTINATIONS: Record<
  NativeFormKind,
  { href: string; label: string }
> = {
  contact: {
    href: "/contact#contact-form",
    label: "Return to contact",
  },
  investor: {
    href: "/investors#data-room",
    label: "Return to investor relations",
  },
  newsletter: {
    href: "/",
    label: "Return home",
  },
};

const SUCCESS_MESSAGES: Record<NativeFormKind, string> = {
  contact: CONTACT_SUCCESS_MESSAGE,
  investor: INVESTOR_SUCCESS_MESSAGE,
  newsletter: NEWSLETTER_SUCCESS_MESSAGE,
};

const STATUS_CONTENT: Record<
  Exclude<NativeFormStatus, "success">,
  { eyebrow: string; title: string; message: string }
> = {
  invalid: {
    eyebrow: "Check your submission",
    title: "We couldn’t process those details.",
    message:
      "Please return to the form, review the required fields, and submit it again.",
  },
  "too-large": {
    eyebrow: "Submission too long",
    title: "Please shorten your response.",
    message:
      "The form exceeded the submission limit. Shorten longer fields and try again.",
  },
  "rate-limited": {
    eyebrow: "Please wait",
    title: "Too many requests were received.",
    message:
      "Wait about a minute before returning to the form and trying again.",
  },
  unavailable: {
    eyebrow: "Delivery unavailable",
    title: "We couldn’t complete your request.",
    message:
      "Please return to the form and try again later. Your submitted details are not included in this page’s address.",
  },
};

function firstValue(value: SearchValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseKind(value: SearchValue): NativeFormKind {
  const candidate = firstValue(value);
  return candidate && FORM_KINDS.has(candidate as NativeFormKind)
    ? (candidate as NativeFormKind)
    : "contact";
}

function parseStatus(value: SearchValue): NativeFormStatus {
  const candidate = firstValue(value);
  return candidate && FORM_STATUSES.has(candidate as NativeFormStatus)
    ? (candidate as NativeFormStatus)
    : "invalid";
}

export default async function FormResponsePage({
  searchParams,
}: FormResponsePageProps) {
  const params = await searchParams;
  const kind = parseKind(params.form);
  const status = parseStatus(params.status);
  const returnPath = normalizeNativeReturnPath(firstValue(params.returnTo));
  const recoveryDestination =
    kind === "newsletter" && returnPath
      ? {
          href: returnPath,
          label: returnPath === "/" ? "Return home" : "Return to previous page",
        }
      : RECOVERY_DESTINATIONS[kind];
  const destination =
    status === "success" ? SUCCESS_DESTINATIONS[kind] : recoveryDestination;
  const content =
    status === "success"
      ? {
          eyebrow: "Submission received",
          title: "Thank you.",
          message: SUCCESS_MESSAGES[kind],
        }
      : STATUS_CONTENT[status];

  return (
    <main id="main-content" tabIndex={-1}>
      <Section
        tone="tint-warm"
        size="hero"
        className="relative min-h-[68svh] overflow-hidden !pt-28 sm:!pt-32"
      >
        <div aria-hidden className="hero-thread-trace" />
        <Container className="relative z-10">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-7 lg:gap-12">
            <div className="page-enter border-y border-line bg-paper px-6 py-10 shadow-[0_22px_70px_rgb(57_38_56/0.06)] sm:px-10 sm:py-12 md:col-span-7 md:rounded-bl-[3rem] md:rounded-tr-[3rem] md:border">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h1 className="t-hero mt-5 text-ink">{content.title}</h1>
              <p className="t-lead mt-5 max-w-xl">{content.message}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {status === "success" ? (
                  <Button href={destination.href} arrow>
                    {destination.label}
                  </Button>
                ) : (
                  <>
                    <DraftRecoveryLink href={destination.href} />
                    <Button href={destination.href} variant="ghost">
                      {destination.label}
                    </Button>
                  </>
                )}
                {kind !== "newsletter" && destination.href !== "/" && (
                  <Button
                    href="/"
                    variant={status === "success" ? "ghost" : "quiet"}
                  >
                    Back to home
                  </Button>
                )}
              </div>
            </div>

            <div className="page-enter hidden md:col-span-5 md:block">
              <RecoveryTrace
                eyebrow={
                  status === "success" ? "Path received" : "Recovery route"
                }
                caption={
                  status === "success"
                    ? "Your request has moved into the EndoCyclic review path."
                    : "Return to your draft or choose a direct route back to the form."
                }
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
