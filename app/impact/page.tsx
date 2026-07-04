"use client";

import Link from "next/link";
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
import Marquee from "@/components/site/Marquee";
import CountUp from "@/components/site/CountUp";
import MagneticButton from "@/components/site/MagneticButton";
import { BURDEN_STATS, MILESTONES } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[4%] top-[30%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        1 in 10
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <Eyebrow>Impact</Eyebrow>
        </Reveal>

        <h1 className="t-display mt-8 text-ink md:mt-10">
          <SplitText
            lines={[
              [{ text: "The most common disease" }],
              [{ text: "you’ve", accent: true, italic: true }, { text: " never", accent: true, italic: true }, { text: " been", accent: true, italic: true }, { text: " taught", accent: true, italic: true }, { text: " to", accent: true, italic: true }, { text: " see.", accent: true, italic: true }],
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
          <Reveal delay={0.5} className="md:col-span-6">
            <p className="t-lead max-w-xl text-ink-soft">
              Endometriosis affects an estimated
              <span className="text-ink"> 190 million women</span> — roughly
              <span className="text-ink"> one in ten</span> of reproductive age — yet it remains
              under-recognized, under-diagnosed, and under-treated.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="self-end md:col-span-5 md:col-start-8">
            <p className="t-body text-ink-muted">
              It is a leading cause of infertility and chronic pelvic pain. We build the tools to
              see it earlier — and a therapeutic designed to change its course.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Marquee bar */
const BURDEN_WORDS = [
  "190M+ affected worldwide",
  "1 in 10 of reproductive age",
  "$200B US burden",
  "8-year diagnostic delay",
  "Leading cause of infertility",
];

function BurdenBar() {
  return (
    <div className="border-y border-line bg-paper py-5">
      <Marquee
        items={BURDEN_WORDS.map((w) => (
          <span key={w} className="t-label text-ink/70">
            {w}
          </span>
        ))}
      />
    </div>
  );
}

/* ------------------------------------------------------------- The burden */
function Burden() {
  const facts = [
    "A chronic disease in which endometrial-like tissue grows outside the uterus.",
    "A leading cause of infertility and chronic pelvic pain.",
    "Associated comorbidities span cardiovascular disease, an increased risk of certain cancers, and other inflammatory conditions.",
  ];
  return (
    <Section id="burden" tone="paper">
      <Container>
        <FolioHeading index="01" label="The Burden" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              A disease measured in <span className="italic-display text-gold-ink">missing years.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              The scale is systemic — in the number of lives affected, in the years lost to delay,
              and in the economic weight it carries. Today’s therapies are largely hormonal and
              symptomatic; they do not modify the disease.
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

        <div className="mt-24 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal as="div" key={f} delay={i * 0.08} className="border-t border-line pt-6">
              <span className="t-num text-lg text-gold-ink">{`0${i + 1}`}</span>
              <p className="mt-4 t-body text-ink-soft">{f}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------- The 8-year delay */
function Delay() {
  return (
    <Section id="delay" tone="dark" grain>
      <Container>
        <FolioHeading index="02" label="The Diagnostic Delay" tone="dark" />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-paper-on-dark">
              Eight years to a <span className="italic-display text-gold-light">first answer.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-muted-on-dark">
              On average, eight years pass between a first symptom and a confirmed diagnosis — years
              of pain misread, tests inconclusive, and disease left to progress.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <div className="grid gap-8 border-t border-line-on-dark pt-10 md:grid-cols-2">
            <div>
              <span className="t-label text-gold-light">See it earlier</span>
              <h3 className="mt-4 font-serif text-3xl text-paper-on-dark">
                FemLUNA™ — a non-invasive diagnostic
              </h3>
              <p className="mt-4 t-body text-muted-on-dark">
                Developed as the first non-invasive, definitive diagnostic for endometriosis —
                designed to detect superficial and sub-millimeter lesions often missed by current
                imaging, and to shorten the eight-year delay.
              </p>
            </div>
            <div>
              <span className="t-label text-gold-light">Change its course</span>
              <h3 className="mt-4 font-serif text-3xl text-paper-on-dark">
                ENDO-205 — a disease-modifying therapeutic
              </h3>
              <p className="mt-4 t-body text-muted-on-dark">
                A first-in-class, non-hormonal precision peptide designed to eliminate lesions and
                resolve associated symptoms, including pain — rather than mask them. A short-course,
                disease-modifying approach.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <p className="t-lead max-w-3xl text-paper-on-dark">
            Detect it sooner. Treat it at the source. Together, these programs are designed to
            change the trajectory of a disease that has gone unseen for too long.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- The mission */
function Mission() {
  const pillars = [
    {
      k: "Eliminate, don’t mask",
      v: "Designed to eliminate lesions and modify the disease at its source — rather than manage symptoms indefinitely.",
    },
    {
      k: "Non-hormonal by design",
      v: "A precision peptide that works without hormones, surgery, or systemic toxicity — a categorically different approach.",
    },
    {
      k: "Designed to preserve fertility",
      v: "Engineered to act only where disease lives, sparing healthy tissue and designed to preserve fertility.",
    },
  ];
  return (
    <Section id="mission" tone="paper-sunk">
      <Container>
        <FolioHeading index="03" label="The Mission" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="t-h1 text-ink">
              Correction, <span className="italic-display text-gold-ink">not management.</span>
            </h2>
            <p className="t-lead mt-8 max-w-lg text-ink-muted">
              Our mission is to give women a fundamentally different option: precision medicine
              designed to modify disease rather than manage it — and to do so without the trade-offs
              of hormones or surgery.
            </p>
            <div className="mt-10 rounded-2xl border border-line bg-paper-raised p-8">
              <span className="t-label text-gold-ink">Founding member</span>
              <p className="mt-3 font-serif text-2xl text-ink">
                Milken Institute Women’s Health Network
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                EndoCyclic is a founding member — part of a national effort to close the gap in
                women’s health research and care.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-5 md:col-start-8">
            <div>
              {pillars.map((p, i) => (
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

        <div className="mt-20">
          <Reveal>
            <p className="t-label text-ink-muted">Recognized along the way</p>
          </Reveal>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {MILESTONES.map((m, i) => (
              <Reveal
                as="div"
                key={m.title}
                delay={i * 0.06}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-line pt-5"
              >
                <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-gold" />
                <div>
                  <h3 className="font-serif text-xl text-ink">{m.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/pipeline"
              className="klink t-label inline-flex items-center gap-2 text-gold-ink"
            >
              See the pipeline behind the mission <ArrowRight size={15} />
            </Link>
          </Reveal>
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
              Let’s make this disease <span className="italic-display text-gold-light">impossible to miss.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact?subject=partnership" variant="primary-on-dark">
              Partner with us
            </MagneticButton>
            <MagneticButton href="/news" variant="ghost-on-dark">
              Read the news
            </MagneticButton>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

export default function ImpactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <BurdenBar />
        <Burden />
        <Delay />
        <Mission />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
