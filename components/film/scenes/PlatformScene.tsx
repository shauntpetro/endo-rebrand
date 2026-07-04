"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Scene, { SceneBody } from "@/components/film/Scene";
import SplitText from "@/components/site/SplitText";
import Reveal from "@/components/site/Reveal";
import FilmCTA from "@/components/film/FilmCTA";

const EASE = [0.16, 1, 0.3, 1] as const;

type Principle = {
  n: string;
  title: string;
  body: string;
  bg: string;
  text: string;
  sub: string;
  chip: string;
};

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: "pH-mediated activation",
    body: "Inert in healthy tissue — it switches on only inside the acidic microenvironment of disease.",
    bg: "bg-plum",
    text: "text-cream",
    sub: "text-muted-on-dark",
    chip: "bg-gold",
  },
  {
    n: "02",
    title: "Selective uptake",
    body: "A proprietary endocytic pathway concentrates it inside diseased cells — not healthy ones.",
    bg: "bg-teal",
    text: "text-cream-on-dark",
    sub: "text-cream/80",
    chip: "bg-gold",
  },
  {
    n: "03",
    title: "Non-hormonal",
    body: "Designed to act without hormones, surgery, or systemic toxicity — precision, not blunt force.",
    bg: "bg-gold",
    text: "text-ink",
    sub: "text-ink/75",
    chip: "bg-ink",
  },
];

export default function PlatformScene() {
  const reduced = useReducedMotion();
  return (
    <Scene id="platform" tone="cream" aria-label="The Platform">
      {/* Bauhaus geometry */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute -left-[10vmin] -top-[10vmin] h-[42vmin] w-[42vmin] shape-dot bg-teal/15"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="pointer-events-none absolute right-0 top-[18%] h-3 w-[34vw] origin-right bg-gold"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[6%] h-[16vmin] w-[16vmin] shape-half-t bg-plum/10"
      />

      <SceneBody>
        <Reveal>
          <p className="t-label flex items-center gap-2 text-gold-ink">
            <span aria-hidden className="h-2 w-2 bg-gold" /> § The Platform
          </p>
        </Reveal>

        <h2 className="t-h1 mt-6 max-w-[15ch] uppercase text-ink">
          <SplitText
            lines={[
              [{ text: "A precision peptide" }],
              [{ text: "that reads the" }],
              [{ text: "body’s " }, { text: "chemistry.", accent: true }],
            ]}
            play={!reduced}
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="t-lead mt-8 max-w-2xl text-ink-muted">
            One proprietary precision peptide platform, built on three principles that let a single
            medicine tell diseased tissue apart from healthy tissue — and act only where disease lives.
          </p>
        </Reveal>

        {/* Three principles as bold color-block cells */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={0.12 + i * 0.1}>
              <div className={clsx("relative flex h-full flex-col overflow-hidden p-8 md:p-9", p.bg, p.text)}>
                <span aria-hidden className={clsx("mb-8 inline-block h-2 w-10", p.chip)} />
                <span className={clsx("t-num text-5xl leading-none md:text-6xl", p.text)}>{p.n}</span>
                <h3 className="t-h3 mt-6 uppercase">{p.title}</h3>
                <p className={clsx("mt-4 t-body", p.sub)}>{p.body}</p>
                <span
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 shape-dot opacity-10",
                    p.bg === "bg-gold" ? "bg-ink" : "bg-cream",
                  )}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Reach line + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col gap-8 border-t-2 border-ink pt-8 md:flex-row md:items-end md:justify-between">
            <p className="t-h3 max-w-[24ch] text-ink">
              One platform spanning{" "}
              <span className="text-gold-ink">therapeutics, diagnostics, and oncology</span>
              {" "}— expanding into additional women’s health indications.
            </p>
            <FilmCTA overlay="pipeline" variant="ghost" className="shrink-0">
              See the pipeline
            </FilmCTA>
          </div>
        </Reveal>
      </SceneBody>
    </Scene>
  );
}
