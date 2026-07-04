import Image from "next/image";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { PIPELINE, PHASES, BURDEN_STATS, MILESTONES, PARTNERS } from "@/lib/site";

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      {/* soft, quiet accents */}
      <div aria-hidden className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-tint-teal blur-2xl md:right-[-2rem]" />
      <div aria-hidden className="pointer-events-none absolute right-24 top-52 h-40 w-40 rounded-full bg-tint-plum blur-2xl" />
      <Container className="relative">
        <div className="max-w-3xl reveal">
          <Eyebrow>Clinical-stage precision medicine</Eyebrow>
          <h1 className="t-hero mt-6 text-ink">
            Medicine designed to act only where disease lives.
          </h1>
          <p className="t-lead mt-6 max-w-2xl">
            EndoCyclic develops non-hormonal precision peptides that eliminate disease at the
            source — starting with ENDO-205 for endometriosis, now in Phase 1.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/innovation" variant="primary">Explore the platform</Button>
            <Button href="/contact?subject=partnership" variant="ghost">Partner with us</Button>
          </div>
          <p className="mt-10 flex items-center gap-2.5 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
            FDA IND Allowance · 2026
          </p>
        </div>
        <div className="mt-16 h-px w-full bg-line md:mt-24" />
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- The problem */
function Problem() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              Endometriosis is common, costly, and quietly overlooked.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-6 md:col-start-7">
            <p className="t-body text-muted">
              A chronic disease in which endometrial-like tissue grows outside the uterus — a
              leading cause of infertility and chronic pelvic pain. Today’s therapies are largely
              hormonal, symptomatic, and do not modify the disease.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {BURDEN_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-t border-line pt-5">
              <div className="t-stat">
                <CountUp value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">{s.label}</p>
              <p className="mt-1.5 text-sm text-muted">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- The platform */
function Platform() {
  const principles = [
    { k: "pH-mediated activation", v: "The peptide stays inert in healthy tissue and switches on only in the acidic microenvironment of disease." },
    { k: "Selective uptake", v: "A proprietary endocytic pathway concentrates it inside diseased cells — not healthy ones." },
    { k: "Non-hormonal", v: "It works without hormones, surgery, or systemic toxicity — designed to correct, not suppress." },
  ];
  return (
    <Section tone="tint-teal">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The platform</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">A precision peptide that reads the body’s chemistry.</h2>
            <p className="t-lead mt-5">
              One platform spanning therapeutics, diagnostics, and oncology — engineered to be
              exquisitely selective.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <div className="text-sm font-medium text-teal-ink">{`0${i + 1}`}</div>
              <h3 className="t-h3 mt-3 text-ink">{p.k}</h3>
              <p className="mt-2 text-sm text-muted">{p.v}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/innovation" variant="quiet">How the platform works</Button>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------- Pipeline */
function PhaseBar({ phaseIndex }: { phaseIndex: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Stage: ${PHASES[phaseIndex]}`}>
      {PHASES.map((_, i) => (
        <span key={i} className={`h-1 w-6 rounded-full ${i <= phaseIndex ? "bg-teal" : "bg-line"}`} />
      ))}
    </div>
  );
}

function Pipeline() {
  return (
    <Section tone="paper">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Pipeline</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">Four programs. One platform.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/pipeline" variant="quiet">View the full pipeline</Button>
          </Reveal>
        </div>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {PIPELINE.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-12 md:items-center md:gap-6">
                <div className="md:col-span-3">
                  <h3 className="t-h3 text-ink">{c.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-teal-ink">{c.modality} · {c.area}</p>
                </div>
                <p className="text-sm text-muted md:col-span-5">{c.mechanism}</p>
                <div className="md:col-span-2"><PhaseBar phaseIndex={c.phaseIndex} /></div>
                <p className="text-sm text-ink md:col-span-2 md:text-right">{c.stage}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Validation */
function Validation() {
  return (
    <Section tone="tint-warm">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>Validation</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">Backed, scored, and recognized.</h2>
            <p className="t-body mt-5 text-muted">
              A rare depth of external validation for a company at this stage — from the NIH’s
              highest grant score to national recognition.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
              {PARTNERS.map((p) => (
                <div key={p.name} className="relative h-8 w-24 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <Image src={p.src} alt={p.name} fill sizes="96px" className="object-contain object-left" />
                </div>
              ))}
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <dl className="divide-y divide-line border-t border-line">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.05}>
                  <div className="py-4">
                    <dt className="t-h3 text-ink">{m.title}</dt>
                    <dd className="mt-1 text-sm text-muted">{m.detail}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="plum">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="dark">The diligence front door</Eyebrow>
            <h2 className="t-h2 mt-4 text-on-dark">Let’s change what a diagnosis can mean.</h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">
              For partnership, investment, or media — the right person on our team will follow up.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact?subject=partnership" variant="ghost-on-dark">Partner with us</Button>
              <Button href="/investors" variant="ghost-on-dark">For investors</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Problem />
      <Platform />
      <Pipeline />
      <Validation />
      <Closing />
    </main>
  );
}
