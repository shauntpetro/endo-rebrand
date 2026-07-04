"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { useOverlay } from "@/components/film/overlay";
import { PIPELINE, PHASES, type Candidate } from "@/lib/site";

/* ---------------------------------------------------------------------------
   Pipeline overlay — all four programs in full, grouped as the two
   therapeutic + diagnostic pairs. Cream ground, Bauhaus color-block headers.
   Every claim traces to lib/site → truth.md; no invented efficacy.
   --------------------------------------------------------------------------- */

const PAIRS: {
  key: string;
  kicker: string;
  title: string;
  blurb: string;
  tone: "plum" | "teal";
  ids: string[];
}[] = [
  {
    key: "endometriosis",
    kicker: "Pair 01 — Endometriosis",
    title: "Treat & detect",
    blurb:
      "A first-in-class non-hormonal therapeutic and the first non-invasive diagnostic — one disease, addressed from both ends.",
    tone: "plum",
    ids: ["ENDO-205", "FemLUNA"],
  },
  {
    key: "oncology",
    kicker: "Pair 02 — Oncology",
    title: "Detect & treat",
    blurb:
      "The precision peptide platform extended to malignant solid tumors — an investigational therapeutic matched to a companion imaging agent.",
    tone: "teal",
    ids: ["ENDO-995", "ENDO-311"],
  },
];

function byId(id: string): Candidate | undefined {
  return PIPELINE.find((c) => c.id === id);
}

/** Segmented Discovery→Phase 3 scale; current phase in gold. */
function PhaseScale({ candidate }: { candidate: Candidate }) {
  const cur = candidate.phaseIndex;
  return (
    <div>
      <div className="flex gap-1" role="img" aria-label={`Current stage: ${PHASES[cur]}`}>
        {PHASES.map((_, p) => (
          <span
            key={p}
            aria-hidden
            className={clsx(
              "h-2 flex-1",
              p < cur && "bg-ink",
              p === cur && "bg-gold",
              p > cur && "bg-ink/15",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        {PHASES.map((phase, p) => (
          <span
            key={phase}
            aria-hidden
            className={clsx(
              "flex-1 text-center text-[0.58rem] font-bold uppercase leading-tight tracking-[0.04em]",
              p === cur ? "text-gold-ink" : "text-ink-muted/60",
            )}
          >
            {phase}
          </span>
        ))}
      </div>
    </div>
  );
}

function Tag({ children, filled }: { children: React.ReactNode; filled?: boolean }) {
  return (
    <span
      className={clsx(
        "t-label inline-flex items-center px-2.5 py-1",
        filled ? "bg-ink text-cream" : "border-2 border-ink text-ink",
      )}
    >
      {children}
    </span>
  );
}

function ProgramCard({ candidate, index, active }: { candidate: Candidate; index: number; active: boolean }) {
  return (
    <article
      id={candidate.id}
      aria-current={active ? "true" : undefined}
      className={clsx(
        "relative scroll-mt-24 border-2 border-ink bg-cream-2/40",
        active && "ring-4 ring-gold ring-offset-2 ring-offset-cream",
      )}
    >
      {/* index numeral, decorative */}
      <span
        aria-hidden
        className="t-num pointer-events-none absolute right-4 top-2 select-none text-[5rem] leading-none text-ink/[0.06]"
      >
        0{index}
      </span>

      <div className="relative p-6 md:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <Tag filled>{candidate.modality}</Tag>
          <Tag>{candidate.area}</Tag>
          {active && (
            <span className="t-label inline-flex items-center gap-1.5 bg-gold px-2.5 py-1 text-ink">
              <span aria-hidden className="h-2 w-2 shape-dot bg-ink" />
              Selected
            </span>
          )}
        </div>

        <h4 className="t-h2 mt-5 uppercase text-ink">{candidate.name}</h4>
        <p className="mt-2 t-body font-semibold text-gold-ink">{candidate.mechanism}</p>

        <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 border-t-2 border-ink/15 pt-5 sm:grid-cols-2">
          <div>
            <dt className="t-label text-ink-muted">Indication</dt>
            <dd className="mt-1 t-body text-ink">{candidate.indication}</dd>
          </div>
          <div>
            <dt className="t-label text-ink-muted">Stage</dt>
            <dd className="mt-1 t-body font-semibold text-ink">{candidate.stage}</dd>
          </div>
        </dl>

        <p className="mt-5 t-body text-ink-muted">{candidate.summary}</p>

        <div className="mt-6">
          <p className="t-label mb-3 text-ink-muted">Phase scale</p>
          <PhaseScale candidate={candidate} />
        </div>

        <ul className="mt-7 space-y-2.5 border-t-2 border-ink/15 pt-6">
          {candidate.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 t-body text-ink">
              <span
                aria-hidden
                className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center bg-teal text-cream"
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function PipelinePanel({ param }: { param?: string }) {
  const { open } = useOverlay();
  const activeId = param && PIPELINE.some((c) => c.id === param) ? param : undefined;
  const didScroll = useRef(false);

  // Scroll the requested program into view on mount (inside the overlay scroll container).
  useEffect(() => {
    if (!activeId || didScroll.current) return;
    didScroll.current = true;
    const raf = requestAnimationFrame(() => {
      document.getElementById(activeId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  return (
    <div className="container-editorial py-14 md:py-16">
      {/* Header */}
      <header className="relative">
        <p className="t-label flex items-center gap-2 text-gold-ink">
          <span aria-hidden className="h-2.5 w-2.5 shape-dot bg-gold" />
          Four programs · one platform
        </p>
        <h2 className="t-h1 mt-5 max-w-[14ch] uppercase text-ink">
          The <span className="mark-gold">pipeline</span>
        </h2>
        <p className="mt-6 max-w-2xl t-lead text-ink-muted">
          Two therapeutic-and-diagnostic pairs — across endometriosis and oncology — built on a single
          non-hormonal precision peptide platform designed to act only where disease lives.
        </p>
      </header>

      {/* Pairs */}
      <div className="mt-14 space-y-16">
        {PAIRS.map((pair) => (
          <section key={pair.key} aria-label={pair.title}>
            {/* color-block section header */}
            <div
              className={clsx(
                "relative overflow-hidden px-6 py-8 md:px-9",
                pair.tone === "plum" ? "bg-plum text-cream" : "bg-teal text-cream-on-dark",
              )}
            >
              {/* Bauhaus geometry */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 shape-dot bg-gold/25"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-16 h-3 w-40 origin-left bg-gold/50"
              />
              <div className="relative">
                <p className="t-label text-gold-soft">{pair.kicker}</p>
                <h3 className="t-h2 mt-3 uppercase">{pair.title}</h3>
                <p className="mt-4 max-w-xl t-body text-muted-on-dark">{pair.blurb}</p>
              </div>
            </div>

            {/* program cards */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {pair.ids.map((id, i) => {
                const c = byId(id);
                if (!c) return null;
                return (
                  <Reveal key={id} delay={i * 0.06}>
                    <ProgramCard candidate={c} index={PIPELINE.indexOf(c) + 1} active={c.id === activeId} />
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Cross-links */}
      <div className="mt-16 flex flex-col gap-4 border-t-2 border-ink pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md t-body text-ink-muted">
          Non-hormonal medicine and imaging, engineered together — see how the diagnostic side works, or
          start a partnering conversation.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => open("imaging")}
            className="group inline-flex items-center gap-2 border-2 border-ink px-6 py-3 t-label text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            See the imaging
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            onClick={() => open("contact")}
            className="group inline-flex items-center gap-2 bg-gold px-6 py-3 t-label text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Talk to us
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
