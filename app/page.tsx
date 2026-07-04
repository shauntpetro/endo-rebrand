"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { clsx } from "clsx";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import Marquee from "@/components/site/Marquee";
import CountUp from "@/components/site/CountUp";
import MagneticButton from "@/components/site/MagneticButton";
import PeptideDiagram from "@/components/site/PeptideDiagram";
import {
  BURDEN_STATS,
  PIPELINE,
  PHASES,
  MILESTONES,
  VALIDATION_WORDS,
} from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6%] top-[34%] select-none font-serif text-[26vw] leading-none text-ink/[0.03]"
      >
        pH
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-5">
            <span className="t-label text-ink">EndoCyclic Therapeutics</span>
            <span className="t-label text-ink-muted">Irvine, California</span>
            <span className="t-label hidden text-ink-muted sm:inline">Clinical-stage precision medicine</span>
            <span className="t-label ml-auto flex items-center gap-2 text-gold-ink">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              FDA IND Allowance · 2026
            </span>
          </div>
        </Reveal>

        <h1 className="t-display mt-10 text-ink md:mt-14">
          <SplitText
            lines={[
              [{ text: "Correction," }],
              [{ text: "not" }, { text: " destruction.", accent: true, italic: true }],
            ]}
            accentClass="text-gold-ink"
          />
        </h1>

        <motion.div
          className="mt-10 h-px w-full origin-left bg-line"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
        />

        <div className="mt-10 grid gap-10 pb-24 md:grid-cols-12 md:pb-32">
          <Reveal delay={0.5} className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="/innovation" variant="primary">
                Explore the platform
              </MagneticButton>
              <MagneticButton href="/contact?subject=partnership" variant="ghost" arrow={false}>
                Partner with us
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.6} className="md:col-span-6 md:col-start-7">
            <p className="t-lead max-w-xl text-ink-soft">
              EndoCyclic is a clinical-stage precision medicine company. Our lead therapeutic,
              <span className="text-ink"> ENDO-205</span>, is a first-in-class, non-hormonal peptide
              designed to eliminate endometriosis lesions — and resolve the pain they cause — rather
              than simply mask symptoms.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Marquee bar */
function ValidationBar() {
  return (
    <div className="border-y border-line bg-paper py-5">
      <Marquee
        items={VALIDATION_WORDS.map((w) => (
          <span key={w} className="t-label text-ink/70">{w}</span>
        ))}
      />
    </div>
  );
}

/* ------------------------------------------------------------- The problem */
function Problem() {
  return (
    <Section id="problem" tone="paper">
      <Container>
        <FolioHeading index="01" label="The Problem" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              The most common disease <span className="italic-display text-gold-ink">no one is taught to see.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              Endometriosis is a chronic disease in which endometrial-like tissue grows outside the
              uterus. It is a leading cause of infertility and chronic pelvic pain — yet today’s
              therapies are largely hormonal, symptomatic, and do not modify the disease.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {BURDEN_STATS.map((s, i) => (
            <Reveal as="div" key={s.label} delay={i * 0.09} className="border-t border-line pt-6">
              <div className="t-num text-[clamp(3rem,6vw,5rem)] leading-none text-ink">
                <CountUp
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : ""}
                  suffix={"suffix" in s ? s.suffix : ""}
                />
              </div>
              <p className="mt-4 text-ink">{s.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- The platform */
function Platform() {
  const principles = [
    { k: "pH-mediated activation", v: "The peptide stays inert in healthy tissue and switches on only in the acidic microenvironment of disease." },
    { k: "Selective uptake", v: "A proprietary endocytic pathway concentrates it inside diseased cells — not healthy ones." },
    { k: "Non-hormonal", v: "It works without hormones, surgery, or systemic toxicity — a categorically different approach." },
  ];
  return (
    <Section id="platform" tone="paper-sunk">
      <Container>
        <FolioHeading index="02" label="The Platform" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="t-h1 text-ink">
              A precision peptide that reads the body’s <span className="italic-display text-gold-ink">chemistry.</span>
            </h2>
            <p className="t-lead mt-8 max-w-lg text-ink-muted">
              One platform, engineered to be exquisitely selective. It spans therapeutics,
              diagnostics, and oncology — and is expanding into additional women’s health indications.
            </p>
            <div className="mt-10">
              <Link href="/innovation" className="klink t-label inline-flex items-center gap-2 text-gold-ink">
                How the platform works <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <div className="md:col-span-5 md:col-start-8">
            <div>
              {principles.map((p, i) => (
                <Reveal as="div" key={p.k} delay={i * 0.09} className="border-t border-line py-6">
                  <div className="flex items-baseline gap-4">
                    <span className="t-num text-lg text-gold-ink">{`0${i + 1}`}</span>
                    <div>
                      <h3 className="font-serif text-2xl text-ink">{p.k}</h3>
                      <p className="mt-2 text-ink-muted">{p.v}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Mechanism plate */
function Mechanism() {
  return (
    <Section id="mechanism" tone="dark" grain>
      <Container>
        <FolioHeading index="03" label="Mechanism" tone="dark" />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-paper-on-dark">
              Correction, <span className="italic-display text-gold-light">not destruction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-muted-on-dark">
              Instead of suppressing the whole system, the peptide is designed to act only where
              disease lives — eliminating lesions at the source while leaving healthy tissue untouched.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-16">
          <PeptideDiagram tone="dark" />
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Pipeline strip */
function PhaseScale({ phaseIndex, tone = "light" }: { phaseIndex: number; tone?: "light" | "dark" }) {
  return (
    <div className="mt-8">
      <div className="flex gap-1.5">
        {PHASES.map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-1 flex-1 rounded-full",
              i <= phaseIndex ? "bg-gold" : tone === "dark" ? "bg-line-on-dark" : "bg-line",
            )}
          />
        ))}
      </div>
      <div className={clsx("mt-3 flex justify-between t-label", tone === "dark" ? "text-muted-on-dark" : "text-ink-muted")}>
        <span>{PHASES[0]}</span>
        <span className={tone === "dark" ? "text-gold-light" : "text-gold-ink"}>{PHASES[phaseIndex]}</span>
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <Section id="pipeline" tone="paper">
      <Container>
        <FolioHeading index="04" label="Pipeline" />
        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="t-h1 max-w-2xl text-ink">
              Four programs. <span className="italic-display text-gold-ink">One platform.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="t-label hidden items-center gap-2 text-ink-muted md:flex">
              Drag to explore <MoveRight size={14} />
            </span>
          </Reveal>
        </div>
      </Container>

      <div
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-[clamp(1.5rem,5vw,6rem)] pb-4"
        role="region"
        aria-label="Pipeline candidates"
        tabIndex={0}
      >
        {PIPELINE.map((c) => (
          <article
            key={c.id}
            className="group relative flex w-[86vw] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-paper-raised p-8 sm:w-[60vw] lg:w-[38vw] xl:w-[30vw]"
          >
            <span className="absolute left-0 top-0 h-[3px] w-16 rounded-full bg-gold transition-all duration-500 group-hover:w-2/3" />
            <div>
              <div className="flex items-center gap-3">
                <span className="t-label text-gold-ink">{c.modality}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
                <span className="t-label text-ink-muted">{c.area}</span>
              </div>
              <h3 className="mt-6 font-serif text-4xl text-ink">{c.name}</h3>
              <p className="mt-2 text-ink-muted">{c.mechanism}</p>
              <p className="mt-6 t-body text-ink-soft">{c.summary}</p>
            </div>
            <div>
              <PhaseScale phaseIndex={c.phaseIndex} />
              <p className="mt-4 t-label text-ink">{c.stage}</p>
            </div>
          </article>
        ))}
        <Link
          href="/pipeline"
          className="group flex w-[70vw] shrink-0 snap-start flex-col justify-center gap-4 rounded-2xl bg-plum-deep p-8 text-paper-on-dark sm:w-[40vw] lg:w-[26vw]"
        >
          <span className="t-label text-gold-light">Full pipeline</span>
          <span className="font-serif text-3xl">See all four programs in detail</span>
          <span className="mt-2 inline-flex items-center gap-2 t-label text-paper-on-dark">
            View pipeline <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- Validation */
function Validation() {
  return (
    <Section id="validation" tone="paper-sunk">
      <Container>
        <FolioHeading index="05" label="Validation" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="t-h1 text-ink">
              Backed, scored, and <span className="italic-display text-gold-ink">recognized.</span>
            </h2>
            <p className="t-body mt-8 max-w-md text-ink-muted">
              A rare depth of external validation for a company at this stage — from the NIH’s
              highest grant score to national recognition.
            </p>
            <div className="mt-10">
              <MagneticButton href="/impact" variant="ghost">Why it matters</MagneticButton>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <div>
              {MILESTONES.map((m, i) => (
                <Reveal as="div" key={m.title} delay={i * 0.06} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-5">
                  <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-gold" />
                  <div>
                    <h3 className="font-serif text-xl text-ink">{m.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{m.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Closing CTA */
function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["10%", "-10%"]);

  return (
    <Section tone="abyss" grain className="overflow-hidden">
      <div ref={ref}>
        <Container>
          <motion.p style={{ y }} className="t-label text-gold-light">
            The strategic diligence front door
          </motion.p>
          <Reveal className="mt-8">
            <h2 className="t-display max-w-5xl text-paper-on-dark">
              Let’s change what a diagnosis <span className="italic-display text-gold-light">can mean.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact?subject=partnership" variant="primary-on-dark">
              Partner with us
            </MagneticButton>
            <MagneticButton href="/investors" variant="ghost-on-dark">
              For investors
            </MagneticButton>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <ValidationBar />
        <Problem />
        <Platform />
        <Mechanism />
        <Pipeline />
        <Validation />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
