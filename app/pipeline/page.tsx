import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import { PIPELINE, PHASES, type Candidate } from "@/lib/site";

/* -------------------------------------------------------------- Phase bar */
function PhaseBar({ phaseIndex }: { phaseIndex: number }) {
  return (
    <div
      role="img"
      aria-label={`Current stage: ${PHASES[phaseIndex]}`}
      className="flex items-center gap-1.5"
    >
      {PHASES.map((phase, i) => (
        <span
          key={phase}
          aria-hidden
          className={`h-1 flex-1 rounded-full transition-colors ${
            i <= phaseIndex ? "bg-teal" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Candidate */
function CandidateBlock({ c }: { c: Candidate }) {
  return (
    <article className="grid gap-8 md:grid-cols-12 md:gap-10">
      {/* Left: identity */}
      <div className="md:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
          {c.modality} · {c.area}
        </p>
        <h3 className="t-h3 mt-3 text-ink">{c.name}</h3>
        <p className="mt-2 text-sm text-muted">{c.mechanism}</p>

        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Indication</dt>
            <dd className="mt-0.5 font-medium text-ink">{c.indication}</dd>
          </div>
          <div>
            <dt className="text-muted">Stage</dt>
            <dd className="mt-0.5 font-medium text-ink">{c.stage}</dd>
          </div>
        </dl>
      </div>

      {/* Right: detail */}
      <div className="md:col-span-8">
        <p className="t-body text-ink-body">{c.summary}</p>

        <div className="mt-7">
          <PhaseBar phaseIndex={c.phaseIndex} />
          <p className="mt-2 text-xs text-muted">
            {PHASES[c.phaseIndex]} · {c.phaseIndex + 1} of {PHASES.length} phases
          </p>
        </div>

        <ul className="mt-7 space-y-2.5">
          {c.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-muted">
              <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-teal" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------- Group */
function PairGroup({
  label,
  title,
  description,
  candidates,
  tone,
}: {
  label: string;
  title: string;
  description: string;
  candidates: Candidate[];
  tone: "paper" | "white" | "tint-teal" | "tint-warm";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="t-h2 mt-4 text-ink">{title}</h2>
          <p className="t-body mt-4 text-muted">{description}</p>
        </Reveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {candidates.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className="py-12 first:pt-0 last:pb-0">
              <CandidateBlock c={c} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ Page */
export default function PipelinePage() {
  const endo = PIPELINE.filter((c) => c.area === "Endometriosis");
  const onco = PIPELINE.filter((c) => c.area === "Oncology");

  return (
    <main id="main-content">
      {/* Hero */}
      <Section tone="paper" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl reveal">
            <Eyebrow>Pipeline</Eyebrow>
            <h1 className="t-hero mt-6 text-ink">Four programs. One platform.</h1>
            <p className="t-lead mt-6 max-w-2xl">
              Two therapeutic-and-diagnostic pairs — one for endometriosis, one for oncology —
              built on a single non-hormonal precision peptide platform designed to act only where
              disease lives.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/innovation" variant="primary">
                How the platform works
              </Button>
              <Button href="/contact?subject=partnership" variant="ghost">
                Partner with us
              </Button>
            </div>
          </div>

          {/* Phase legend */}
          <div className="mt-16 border-t border-line pt-8 md:mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Development phases
            </p>
            <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
              {PHASES.map((phase, i) => (
                <li key={phase} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-tint text-[0.65rem] font-semibold text-teal-ink"
                  >
                    {i + 1}
                  </span>
                  <span className="text-ink-body">{phase}</span>
                  {i < PHASES.length - 1 && (
                    <span aria-hidden className="ml-1 text-muted">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Endometriosis pair */}
      <PairGroup
        tone="tint-teal"
        label="Endometriosis"
        title="Detect the disease, then treat it at the source."
        description="A matched therapeutic and diagnostic pair for endometriosis — a lead precision peptide now in Phase 1, alongside the first non-invasive imaging agent designed to end the diagnostic delay."
        candidates={endo}
      />

      {/* Oncology pair */}
      <PairGroup
        tone="paper"
        label="Oncology"
        title="The same platform, extended to solid tumors."
        description="An investigational therapeutic-and-diagnostic pair applying the platform's selective peptide engineering to malignant solid tumors — a detect-and-treat approach beginning in colon and endometrial cancers."
        candidates={onco}
      />

      {/* Closing CTA */}
      <Section tone="plum">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="dark">One platform, four shots on goal</Eyebrow>
              <h2 className="t-h2 mt-4 text-on-dark">
                See how a single peptide reads the body&rsquo;s chemistry.
              </h2>
              <p className="mt-5 max-w-xl text-muted-on-dark">
                Every program traces back to the same non-hormonal mechanism. Explore the science,
                or reach the right person on our team.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/innovation" variant="ghost-on-dark">
                  Explore the platform
                </Button>
                <Button href="/contact?subject=partnership" variant="ghost-on-dark">
                  Partner with us
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
