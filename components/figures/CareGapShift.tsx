import Image from "next/image";
import CareGapMobileComparison from "@/components/figures/CareGapMobileComparison";
import Reveal from "@/components/site/Reveal";

const CURRENT_PATH = ["Hormone-based", "Symptom-focused", "Does not eliminate lesions"] as const;
const PLATFORM_PATH = [
  "Selective uptake",
  "pH-mediated activation",
  "Non-hormonal",
  "Preclinical lesion elimination",
] as const;
const COMPARISON_IMAGE = "/illustrations/care-gap-selective-shift-v7.avif";
const MOBILE_COMPARISON_IMAGES = {
  left: "/illustrations/care-gap-current-path-mobile-v1.avif",
  right: "/illustrations/care-gap-selective-path-mobile-v6.avif",
} as const;

function MobileComparisonPanel({
  side,
  label,
  alt,
}: {
  side: "left" | "right";
  label: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-surface">
      <Image
        src={MOBILE_COMPARISON_IMAGES[side]}
        alt={alt}
        fill
        sizes="(min-width: 640px) and (max-width: 767px) 50vw, calc(100vw - 42px)"
        className="object-cover object-center"
      />
      <span
        className={`absolute left-4 top-4 rounded-full border bg-paper/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] backdrop-bl-sm ${
          side === "left"
            ? "border-rose/35 text-rose-ink"
            : "border-teal/35 text-teal-ink"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function EvidenceList({
  items,
  tone,
}: {
  items: readonly string[];
  tone: "rose" | "teal";
}) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium leading-snug text-ink">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full ${tone === "rose" ? "bg-rose" : "bg-teal"}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CareGapShift() {
  return (
    <figure>
      <Reveal className="relative overflow-hidden border-x border-t border-line bg-surface">
        <CareGapMobileComparison />

        <div className="hidden gap-px bg-line sm:grid sm:grid-cols-2 md:hidden">
          <MobileComparisonPanel
            side="left"
            label="Current path"
            alt="Conceptual lesion surrounded by a repeating symptom-management loop."
          />
          <MobileComparisonPanel
            side="right"
            label="Selective path"
            alt="Conceptual selective-uptake and pH-activation sequence with an intact peptide remaining visible within diseased tissue, followed by a separate state in which the same lesion recedes to represent the ENDO-205 preclinical lesion-elimination finding."
          />
        </div>

        <div className="relative hidden aspect-[3/2] md:block">
          <Image
            src={COMPARISON_IMAGE}
            alt="Conceptual comparison showing a persistent lesion in a repeating symptom-management loop beside selective uptake and pH-mediated activation, followed by a separate state in which the same lesion recedes to represent the ENDO-205 preclinical lesion-elimination finding."
            fill
            sizes="(min-width: 1184px) 1120px, calc(100vw - 48px)"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-x-6 top-6 z-10 flex items-center justify-between gap-6 lg:inset-x-8 lg:top-8"
          >
            <span className="rounded-full border border-rose/35 bg-paper/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-rose-ink backdrop-bl-sm">
              Current path
            </span>
            <span className="rounded-full border border-teal/35 bg-paper/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-teal-ink backdrop-bl-sm">
              Selective path
            </span>
          </div>
        </div>
      </Reveal>

      <div className="grid border-y border-line bg-surface md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]">
        <Reveal className="min-w-0 px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">Current therapies</p>
          <h3 className="t-h3 mt-3 max-w-sm text-ink">A symptom-focused loop.</h3>
          <EvidenceList items={CURRENT_PATH} tone="rose" />
        </Reveal>

        <div className="relative flex min-h-16 items-center justify-center gap-3 border-y border-line bg-tint-warm px-4 md:min-h-0 md:flex-col md:border-x md:border-y-0 md:px-2">
          <span aria-hidden className="h-px flex-1 bg-gold/65 md:h-auto md:w-px" />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-gold-ink">
            Design shift
          </span>
          <span aria-hidden className="text-base leading-none text-gold-ink md:hidden">↓</span>
          <span aria-hidden className="hidden text-base leading-none text-gold-ink md:inline">→</span>
          <span aria-hidden className="h-px flex-1 bg-gold/65 md:h-auto md:w-px" />
        </div>

        <Reveal delay={0.08} className="min-w-0 px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Disease-directed path</p>
          <h3 className="t-h3 mt-3 max-w-sm text-ink">From selective uptake to preclinical lesion elimination.</h3>
          <EvidenceList items={PLATFORM_PATH} tone="teal" />
        </Reveal>
      </div>

      <figcaption className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
        Conceptual comparison of current therapies and the EndoCyclic path.
        Selective uptake and pH-mediated activation appear before the separate
        final state representing the ENDO-205 preclinical lesion-elimination
        finding; not clinical outcome data or restored-tissue histology.
      </figcaption>
    </figure>
  );
}
