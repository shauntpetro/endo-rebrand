import Image from "next/image";
import Reveal from "@/components/site/Reveal";

const CURRENT_PATH = ["Hormone-based", "Symptom-focused", "Does not eliminate lesions"] as const;
const PLATFORM_PATH = ["pH-mediated activation", "Selective uptake", "Non-hormonal"] as const;

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
        <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2/1]">
          <Image
            src="/illustrations/care-gap-selective-shift-v1.avif"
            alt="Conceptual illustration contrasting a repeating symptom-management path with pH-mediated selective uptake into diseased tissue."
            fill
            sizes="(min-width: 1184px) 1120px, calc(100vw - 48px)"
            className="object-cover object-center"
          />
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
          <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-ink">
            Design shift
          </span>
          <span aria-hidden className="text-base leading-none text-gold-ink md:hidden">↓</span>
          <span aria-hidden className="hidden text-base leading-none text-gold-ink md:inline">→</span>
          <span aria-hidden className="h-px flex-1 bg-gold/65 md:h-auto md:w-px" />
        </div>

        <Reveal delay={0.08} className="min-w-0 px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Platform design objective</p>
          <h3 className="t-h3 mt-3 max-w-sm text-ink">A selective route into diseased tissue.</h3>
          <EvidenceList items={PLATFORM_PATH} tone="teal" />
        </Reveal>
      </div>

      <figcaption className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
        Conceptual comparison of current therapies and the platform&apos;s design strategy; not clinical outcome data.
      </figcaption>
    </figure>
  );
}
