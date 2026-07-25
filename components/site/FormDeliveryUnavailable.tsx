import Button from "./Button";
import { SITE } from "@/lib/site";

type FormDeliveryKind = "contact" | "investor" | "newsletter";

const COPY: Record<
  FormDeliveryKind,
  { eyebrow: string; title: string; body: string }
> = {
  contact: {
    eyebrow: "Direct contact",
    title: "The online inquiry form is temporarily unavailable.",
    body: "Please use one of the direct channels below.",
  },
  investor: {
    eyebrow: "Investor contact",
    title: "Online data-room requests are temporarily unavailable.",
    body: "Please use a direct channel to reach EndoCyclic.",
  },
  newsletter: {
    eyebrow: "Company updates",
    title: "Online update requests are temporarily unavailable.",
    body: "Please use a direct channel to connect with EndoCyclic.",
  },
};

export default function FormDeliveryUnavailable({
  kind,
  tone = "light",
}: {
  kind: FormDeliveryKind;
  tone?: "light" | "dark";
}) {
  const copy = COPY[kind];
  const titleId = `form-delivery-${kind}-title`;
  const isDark = tone === "dark";
  const recoveryBody = SITE.email
    ? copy.body
    : kind === "newsletter"
      ? "Follow EndoCyclic on LinkedIn for company news."
      : "Please connect with EndoCyclic on LinkedIn instead.";

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className={
        isDark
          ? "mt-4 min-w-0 border-y border-line-on-dark py-5"
          : "min-w-0 border-y border-line bg-tint-warm px-5 py-7 sm:px-7 sm:py-8"
      }
    >
      <p
        className={
          isDark
            ? "text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark"
            : "text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink"
        }
      >
        {copy.eyebrow}
      </p>
      <h3
        id={titleId}
        className={
          isDark
            ? "mt-3 text-base font-medium leading-snug text-on-dark"
            : "t-h3 mt-3 max-w-xl text-ink"
        }
      >
        {copy.title}
      </h3>
      <p
        className={
          isDark
            ? "mt-2 text-sm leading-relaxed text-muted-on-dark"
            : "mt-3 max-w-xl text-sm leading-relaxed text-muted"
        }
      >
        {recoveryBody}
      </p>
      <div className="mt-5 flex min-w-0 flex-wrap gap-3">
        {SITE.email ? (
          <Button
            href={`mailto:${SITE.email}`}
            external
            variant={isDark ? "ghost-on-dark" : "primary"}
            className="max-w-full [overflow-wrap:anywhere]"
          >
            Email EndoCyclic
          </Button>
        ) : null}
        <Button
          href={SITE.linkedin}
          external
          variant={isDark ? "ghost-on-dark" : SITE.email ? "ghost" : "primary"}
          className="max-w-full"
        >
          Connect on LinkedIn
        </Button>
      </div>
    </section>
  );
}
