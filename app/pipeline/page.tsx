"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import MagneticButton from "@/components/site/MagneticButton";
import { PIPELINE, PHASES, type Candidate } from "@/lib/site";

/* ------------------------------------------------------------- PhaseScale */
/**
 * Segmented phase bar over PHASES with the current phase labelled in gold —
 * mirrors the homepage pipeline scale.
 */
function PhaseScale({
  phaseIndex,
  tone = "light",
}: {
  phaseIndex: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Development stage: ${PHASES[phaseIndex]} (of ${PHASES.length} phases, Discovery through Phase 3)`}
    >
      <div className="flex gap-1.5">
        {PHASES.map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-1 flex-1 rounded-full",
              i <= phaseIndex ? "bg-gold" : dark ? "bg-line-on-dark" : "bg-line",
            )}
          />
        ))}
      </div>
      <div
        className={clsx(
          "mt-3 flex justify-between t-label",
          dark ? "text-muted-on-dark" : "text-ink-muted",
        )}
      >
        <span>{PHASES[0]}</span>
        <span className={dark ? "text-gold-light" : "text-gold-ink"}>{PHASES[phaseIndex]}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Candidate plate */
function CandidatePlate({
  candidate,
  role,
  tone = "light",
  index,
}: {
  candidate: Candidate;
  role: string;
  tone?: "light" | "dark";
  index: number;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      delay={index * 0.1}
      className={clsx(
        "grid gap-8 border-t pt-10 md:grid-cols-12 md:gap-10",
        dark ? "border-line-on-dark" : "border-line",
      )}
    >
      {/* Left rail — identity */}
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className={clsx("t-label", dark ? "text-gold-light" : "text-gold-ink")}>
            {candidate.modality}
          </span>
          <span
            aria-hidden
            className={clsx("h-1 w-1 rounded-full", dark ? "bg-line-on-dark" : "bg-line")}
          />
          <span className={clsx("t-label", dark ? "text-muted-on-dark" : "text-ink-muted")}>
            {role}
          </span>
        </div>
        <h3
          className={clsx(
            "t-h2 mt-5",
            dark ? "text-paper-on-dark" : "text-ink",
          )}
        >
          {candidate.name}
        </h3>
        <p className={clsx("mt-4 t-body", dark ? "text-muted-on-dark" : "text-ink-muted")}>
          {candidate.mechanism}
        </p>
        <p className={clsx("mt-6 t-label", dark ? "text-gold-light" : "text-gold-ink")}>
          {candidate.stage}
        </p>
        <div className="mt-8">
          <PhaseScale phaseIndex={candidate.phaseIndex} tone={tone} />
        </div>
      </div>

      {/* Right — summary + highlights */}
      <div className="md:col-span-7 md:col-start-6">
        <p
          className={clsx(
            "t-lead max-w-2xl",
            dark ? "text-paper-on-dark" : "text-ink-soft",
          )}
        >
          {candidate.summary}
        </p>
        <ul className="mt-8">
          {candidate.highlights.map((h, i) => (
            <li
              key={i}
              className={clsx(
                "grid grid-cols-[auto_1fr] gap-4 border-t py-4",
                dark ? "border-line-on-dark" : "border-line",
              )}
            >
              <span
                className={clsx(
                  "t-num text-lg leading-none",
                  dark ? "text-gold-light" : "text-gold-ink",
                )}
              >
                {`0${i + 1}`}
              </span>
              <span className={clsx("t-body", dark ? "text-muted-on-dark" : "text-ink-muted")}>
                {h}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------- Hero */
function Hero() {
  return (
    <Section tone="paper" className="overflow-hidden pt-32 md:pt-40" rhythm={false}>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[4%] top-[30%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        Rx
      </span>
      <Container className="relative z-10 pb-[clamp(4rem,9vw,8rem)]">
        <Reveal y={14}>
          <Eyebrow>Pipeline</Eyebrow>
        </Reveal>

        <h1 className="t-display mt-8 text-ink md:mt-10">
          <SplitText
            lines={[
              [{ text: "Four programs." }],
              [{ text: "One platform.", accent: true, italic: true }],
            ]}
            accentClass="text-gold-ink"
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.4} className="md:col-span-6">
            <p className="t-lead max-w-xl text-ink-soft">
              Two therapeutic and diagnostic pairs across endometriosis and oncology, built on one
              <span className="text-ink"> non-hormonal precision peptide platform</span> — engineered
              to detect disease and treat it at the source.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="self-end md:col-span-5 md:col-start-8">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="/innovation" variant="primary">
                How the platform works
              </MagneticButton>
              <MagneticButton href="/contact?subject=partnership" variant="ghost" arrow={false}>
                Partner with us
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Phase legend */
function PhaseLegend() {
  return (
    <div className="border-y border-line bg-paper-raised py-8">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <span className="t-label text-ink-muted">Development stage</span>
          </Reveal>
          <Reveal delay={0.1} className="w-full md:max-w-3xl">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
              {PHASES.map((phase, i) => (
                <li key={phase} className="flex items-center gap-3">
                  <span className="flex items-center gap-2 t-label text-ink">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
                    {phase}
                  </span>
                  {i < PHASES.length - 1 && (
                    <ArrowRight aria-hidden size={13} className="text-ink-muted/60" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------- Endometriosis pair */
function EndometriosisPair() {
  const endo205 = PIPELINE.find((c) => c.id === "ENDO-205")!;
  const femluna = PIPELINE.find((c) => c.id === "FemLUNA")!;
  return (
    <Section id="endometriosis" tone="paper">
      <Container>
        <FolioHeading index="01" label="Endometriosis · Detect & Treat" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              A matched pair to <span className="italic-display text-gold-ink">find it, then end it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              FemLUNA™ is developed to see the disease standard imaging misses; ENDO-205 is designed
              to eliminate the lesions it reveals — a diagnostic and a therapeutic engineered as one
              program.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <CandidatePlate candidate={endo205} role="Endometriosis" index={0} />
          <CandidatePlate candidate={femluna} role="Endometriosis" index={1} />
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Oncology pair (dark plate) */
function OncologyPair() {
  const endo995 = PIPELINE.find((c) => c.id === "ENDO-995")!;
  const endo311 = PIPELINE.find((c) => c.id === "ENDO-311")!;
  return (
    <Section id="oncology" tone="dark" grain>
      <Container>
        <FolioHeading index="02" label="Oncology · Detect & Treat" tone="dark" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-paper-on-dark">
              The platform, turned on <span className="italic-display text-gold-light">solid tumors.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-muted-on-dark">
              A second matched pair. ENDO-995 is designed to overcome therapeutic resistance and
              restore responsiveness in cold tumors; ENDO-311 is developed to detect and monitor them
              — radiation-free.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              k: "Overcome resistance",
              v: "Designed to restore responsiveness in ‘cold’ tumors that evade current therapies.",
            },
            {
              k: "Undruggable targets",
              v: "Engineered to unlock previously undruggable intracellular targets via selective peptide engineering.",
            },
            {
              k: "Broad potential",
              v: "Potential applicability across 25%+ of solid tumor types.",
            },
            {
              k: "Clean imaging",
              v: "ENDO-311 is radiation-free, non-hormonal, heavy-metal-free, and compatible with standard imaging systems.",
            },
          ].map((p, i) => (
            <Reveal
              as="div"
              key={p.k}
              delay={i * 0.08}
              className="border-t border-line-on-dark pt-6"
            >
              <h3 className="font-serif text-2xl text-paper-on-dark">{p.k}</h3>
              <p className="mt-3 t-body text-muted-on-dark">{p.v}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <CandidatePlate candidate={endo995} role="Oncology" tone="dark" index={0} />
          <CandidatePlate candidate={endo311} role="Oncology" tone="dark" index={1} />
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="abyss" grain className="overflow-hidden">
      <Container>
        <Reveal>
          <span className="t-label text-gold-light">One platform, four programs</span>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <h2 className="t-display max-w-5xl text-paper-on-dark">
            See where selectivity <span className="italic-display text-gold-light">comes from.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/innovation" variant="primary-on-dark">
            How the platform works
          </MagneticButton>
          <MagneticButton href="/contact?subject=partnership" variant="ghost-on-dark">
            Partner with us
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function PipelinePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <PhaseLegend />
        <EndometriosisPair />
        <OncologyPair />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
