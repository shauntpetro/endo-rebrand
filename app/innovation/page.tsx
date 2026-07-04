"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
import PeptideDiagram from "@/components/site/PeptideDiagram";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[30%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        pH
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-5">
            <Eyebrow>The Platform</Eyebrow>
            <span className="t-label hidden text-ink-muted sm:inline">
              Precision peptide platform
            </span>
            <span className="t-label ml-auto flex items-center gap-2 text-gold-ink">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Non-hormonal · pH-activated
            </span>
          </div>
        </Reveal>

        <h1 className="t-display mt-10 text-ink md:mt-14">
          <SplitText
            lines={[
              [{ text: "A new grammar" }],
              [{ text: "for" }, { text: " medicine.", accent: true, italic: true }],
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
              <MagneticButton href="/pipeline" variant="primary">
                See the pipeline
              </MagneticButton>
              <MagneticButton
                href="/contact?subject=partnership"
                variant="ghost"
                arrow={false}
              >
                Partner with us
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.6} className="md:col-span-6 md:col-start-7">
            <p className="t-lead max-w-xl text-ink-soft">
              A proprietary precision peptide platform built on{" "}
              <span className="text-ink">pH-mediated activation</span> and selective uptake by
              diseased tissue through a proprietary endocytic pathway. It is non-hormonal, and
              designed to act only in diseased tissue — avoiding hormones, surgery, and systemic
              toxicity.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------ §01 The status quo */
function StatusQuo() {
  return (
    <Section id="status-quo" tone="paper-sunk">
      <Container>
        <FolioHeading index="01" label="The status quo" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              Managing symptoms is not the same as{" "}
              <span className="italic-display text-gold-ink">modifying disease.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              Current endometriosis therapies are largely hormonal and symptomatic. They can
              quiet the pain for a time — but they do not eliminate lesions, and they do not
              change the underlying biology of the disease.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-line pt-14 md:grid-cols-2">
          <Reveal>
            <p className="t-label text-gold-ink">The prevailing approach</p>
            <p className="mt-5 t-body text-ink-soft">
              Hormone-based regimens work by suppressing the whole system. Relief is often
              partial, temporary, and comes with the trade-offs of altering the body&rsquo;s
              hormonal balance. When medication falls short, surgery becomes the next step — and
              lesions frequently return.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-label text-gold-ink">What&rsquo;s still missing</p>
            <p className="mt-5 t-body text-ink-soft">
              A therapy that acts on the lesion itself, at its source, without hormones or
              surgery. That is the gap EndoCyclic&rsquo;s platform is engineered to close: a
              non-hormonal, disease-modifying approach designed to treat the disease rather than
              mask its symptoms.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------- §02 Mechanism */
function Mechanism() {
  return (
    <Section id="mechanism" tone="dark" grain>
      <Container>
        <FolioHeading index="02" label="Mechanism" tone="dark" />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-paper-on-dark">
              Correction, <span className="italic-display text-gold-light">not destruction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-muted-on-dark">
              Rather than suppress the whole system, the peptide is designed to act only where
              disease lives — reading the body&rsquo;s chemistry to switch on inside diseased
              tissue and pass healthy tissue by.
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

/* --------------------------------------------- §03 One platform, three fronts */
const FRONTS = [
  {
    n: "01",
    label: "Therapeutics",
    body: "Non-hormonal precision peptides designed to eliminate lesions and modify disease — beginning with endometriosis and expanding into additional women's health indications.",
  },
  {
    n: "02",
    label: "Diagnostics",
    body: "Targeted imaging agents developed to detect disease non-invasively, including superficial and sub-millimeter lesions often missed by current imaging methods.",
  },
  {
    n: "03",
    label: "Oncology",
    body: "Tumor-selective peptides — investigational therapeutic and diagnostic programs in development for malignant solid tumors, matched as a detect-and-treat pair.",
  },
];

function ThreeFronts() {
  return (
    <Section id="platform-breadth" tone="paper">
      <Container>
        <FolioHeading index="03" label="Platform breadth" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="t-h1 text-ink">
              One platform, <span className="italic-display text-gold-ink">three fronts.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              The same core chemistry spans therapeutics, diagnostics, and oncology — and is
              expanding into additional women&rsquo;s health indications and oncology.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {FRONTS.map((f, i) => (
            <Reveal as="div" key={f.label} delay={i * 0.08} className="border-t border-line pt-6">
              <div className="flex items-baseline gap-4">
                <span className="t-num text-lg text-gold-ink">{f.n}</span>
                <h3 className="font-serif text-3xl text-ink">{f.label}</h3>
              </div>
              <p className="mt-5 text-ink-muted">{f.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <Link
            href="/pipeline"
            className="klink t-label inline-flex items-center gap-2 text-gold-ink"
          >
            See all four programs <ArrowRight size={15} />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------- §04 The preclinical signal */
const SIGNAL = [
  {
    k: "Lesion elimination",
    v: "Preclinical: demonstrated elimination of endometriosis lesions and the associated inflammation — a disease-modifying effect, not symptom suppression.",
  },
  {
    k: "No dose-limiting toxicities",
    v: "Preclinical: no dose-limiting toxicities observed in GLP toxicology studies, consistent with a peptide designed to act only where disease lives.",
  },
  {
    k: "Short-course by design",
    v: "Engineered as a short-course, disease-modifying therapeutic — designed to avoid hormones, surgery, and systemic toxicity.",
  },
];

function PreclinicalSignal() {
  return (
    <Section id="preclinical-signal" tone="paper-sunk">
      <Container>
        <FolioHeading index="04" label="The preclinical signal" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="t-h1 text-ink">
              Preclinical evidence, <span className="italic-display text-gold-ink">then the clinic.</span>
            </h2>
            <p className="t-lead mt-8 max-w-lg text-ink-muted">
              The lead therapeutic, <span className="text-ink">ENDO-205</span>, carries FDA IND
              Allowance (2026) and is now in a first-in-human Phase 1 study — advancing on the
              strength of its preclinical profile.
            </p>
            <div className="mt-10">
              <MagneticButton href="/pipeline" variant="ghost">
                View the pipeline
              </MagneticButton>
            </div>
          </Reveal>

          <div className="md:col-span-5 md:col-start-8">
            <div>
              {SIGNAL.map((s, i) => (
                <Reveal
                  as="div"
                  key={s.k}
                  delay={i * 0.09}
                  className="border-t border-line py-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="t-num text-lg text-gold-ink">{`0${i + 1}`}</span>
                    <div>
                      <h3 className="font-serif text-2xl text-ink">{s.k}</h3>
                      <p className="mt-2 text-ink-muted">{s.v}</p>
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

/* ------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="abyss" grain className="overflow-hidden">
      <Container>
        <Reveal>
          <p className="t-label text-gold-light">From platform to partnership</p>
        </Reveal>
        <Reveal className="mt-8">
          <h2 className="t-display max-w-5xl text-paper-on-dark">
            A different kind of <span className="italic-display text-gold-light">medicine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/pipeline" variant="primary-on-dark">
            Explore the pipeline
          </MagneticButton>
          <MagneticButton href="/contact?subject=partnership" variant="ghost-on-dark">
            Partner with us
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function InnovationPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <StatusQuo />
        <Mechanism />
        <ThreeFronts />
        <PreclinicalSignal />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
