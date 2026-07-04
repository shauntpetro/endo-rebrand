"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
import { PIPELINE, PHASES } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const femluna = PIPELINE.find((c) => c.id === "FemLUNA")!;
const endo311 = PIPELINE.find((c) => c.id === "ENDO-311")!;

/* ------------------------------------------------------------------ Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <Section tone="abyss" grain className="overflow-hidden pt-40 md:pt-48">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-[30%] select-none font-serif text-[26vw] leading-none text-paper-on-dark/[0.035]"
      >
        mm
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <Eyebrow tone="dark">Imaging &amp; Diagnostics</Eyebrow>
        </Reveal>

        <h1 className="t-display mt-10 text-paper-on-dark md:mt-14">
          <SplitText
            lines={[
              [{ text: "See what laparoscopy" }],
              [{ text: "can’t.", accent: true, italic: true }],
            ]}
            accentClass="text-gold-light"
          />
        </h1>

        <motion.div
          className="mt-10 h-px w-full origin-left bg-line-on-dark"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
        />

        <div className="mt-10 grid gap-10 pb-8 md:grid-cols-12 md:pb-12">
          <Reveal delay={0.5} className="md:col-span-6">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="/pipeline" variant="primary-on-dark">
                See the full pipeline
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost-on-dark" arrow={false}>
                Contact us
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.6} className="md:col-span-6 md:col-start-7">
            <p className="t-lead max-w-xl text-muted-on-dark">
              <span className="text-paper-on-dark">FemLUNA™</span> is developed to be the first
              non-invasive, definitive diagnostic for endometriosis — capable of detecting
              superficial and sub-millimeter lesions often missed by current imaging — a
              non-invasive alternative to laparoscopy, today’s diagnostic gold standard.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- FemLUNA */
function FemLuna() {
  const highlights = [
    "Developed to visualize lesion subtypes that are difficult to detect with standard imaging.",
    "Intended to shorten the 8-year average diagnostic delay from first symptom to diagnosis.",
    "Intended for sensitive populations, including adolescents and reproductive-age women.",
    "Compatible with standard and low-field imaging platforms.",
    "Radiation-free, non-hormonal, and free of heavy metals.",
  ];

  return (
    <Section id="femluna" tone="paper">
      <Container>
        <FolioHeading index="01" label="FemLUNA™" />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              A diagnosis that begins with <span className="italic-display text-gold-ink">answers.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              {femluna.summary}
            </p>
          </Reveal>
        </div>

        {/* Before / after comparison — side by side */}
        <Reveal delay={0.1} className="mt-16">
          <figure>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { src: "/standard-mri.webp", label: "Standard MRI", alt: "Standard MRI pelvic scan in which endometriosis lesions are difficult to distinguish." },
                { src: "/FemLUNA-enhanced.webp", label: "FemLUNA-enhanced (illustrative)", alt: "Illustrative FemLUNA-enhanced imaging in which lesions are visualized with high contrast." },
              ].map((img) => (
                <div
                  key={img.label}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-plum-abyss"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 44vw, 90vw"
                      className="object-cover"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum-abyss/70 via-transparent to-transparent" />
                  </div>
                  <figcaption className="absolute bottom-4 left-4 t-label text-paper-on-dark [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                    {img.label}
                  </figcaption>
                </div>
              ))}
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-ink-muted">
              Illustrative comparison for concept demonstration only — not clinical study data.
            </figcaption>
          </figure>
        </Reveal>

        {/* Highlights */}
        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h3 className="t-h3 text-ink">Designed to be seen</h3>
            <p className="mt-4 t-body text-ink-muted">
              FemLUNA™ is a targeted imaging agent developed to make endometriosis visible
              non-invasively — without radiation, hormones, or heavy metals.
            </p>
          </Reveal>

          <ul className="md:col-span-7 md:col-start-6">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={i * 0.08} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line py-5">
                <span aria-hidden className="mt-1 t-num text-lg text-gold-ink">{`0${i + 1}`}</span>
                <p className="t-body text-ink-soft">{h}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- ENDO-311 */
function Endo311() {
  const points = [
    "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors, with an initial focus on colon cancer.",
    "Radiation-free, non-hormonal, and free of heavy metals.",
    "Designed for early-stage tumor localization and disease monitoring.",
    "Compatible with standard imaging systems.",
    "Companion diagnostic to ENDO-995 — the oncology “detect and treat” pair.",
  ];
  const phaseIndex = endo311.phaseIndex;

  return (
    <Section id="endo-311" tone="dark" grain>
      <Container>
        <FolioHeading index="02" label="ENDO-311" tone="dark" />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="t-label text-gold-light">Oncology · Diagnostic</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-line-on-dark" />
              <span className="t-label text-muted-on-dark">Investigational</span>
            </div>
            <h2 className="t-h1 mt-6 text-paper-on-dark">
              The same precision, <span className="italic-display text-gold-light">turned to tumors.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-muted-on-dark">
              {endo311.summary}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-7">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.08} className="grid grid-cols-[auto_1fr] gap-5 border-t border-line-on-dark py-5">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <p className="t-body text-paper-on-dark/90">{p}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <div className="rounded-2xl border border-line-on-dark p-8">
              <span className="t-label text-muted-on-dark">Development stage</span>
              <div className="mt-6 flex gap-1.5">
                {PHASES.map((_, i) => (
                  <span
                    key={i}
                    className={i <= phaseIndex ? "h-1 flex-1 rounded-full bg-gold" : "h-1 flex-1 rounded-full bg-line-on-dark"}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between t-label text-muted-on-dark">
                <span>{PHASES[0]}</span>
                <span className="text-gold-light">{PHASES[phaseIndex]}</span>
              </div>
              <p className="mt-8 t-body text-muted-on-dark">
                Paired with <span className="text-paper-on-dark">ENDO-995</span> as the oncology
                therapeutic and diagnostic match.
              </p>
              <div className="mt-6">
                <a
                  href="/pipeline"
                  className="klink t-label inline-flex items-center gap-2 text-gold-light"
                >
                  See it in the pipeline <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Closing */
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
            Detect earlier. Treat sooner.
          </motion.p>
          <Reveal className="mt-8">
            <h2 className="t-display max-w-5xl text-paper-on-dark">
              Let’s change what a diagnosis <span className="italic-display text-gold-light">can mean.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href="/pipeline" variant="primary-on-dark">
              See the full pipeline
            </MagneticButton>
            <MagneticButton href="/contact" variant="ghost-on-dark">
              Contact us
            </MagneticButton>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

export default function ImagingPage() {
  return (
    <>
      <Nav overDark />
      <main id="main-content">
        <Hero />
        <FemLuna />
        <Endo311 />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
