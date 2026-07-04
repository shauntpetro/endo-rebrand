"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Scene, { SceneBody } from "@/components/film/Scene";
import Reveal from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import FilmCTA from "@/components/film/FilmCTA";
import { BURDEN_STATS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  raw?: boolean;
};

/** Supporting truth.md facts, rendered as bold color-block cards. */
const FACTS: { k: string; v: string; accent: "gold" | "teal" }[] = [
  {
    k: "What it is",
    v: "A chronic disease in which endometrial-like tissue grows outside the uterus.",
    accent: "teal",
  },
  {
    k: "What it causes",
    v: "The leading cause of infertility and chronic pelvic pain in women.",
    accent: "gold",
  },
  {
    k: "How it's treated today",
    v: "Current therapies are largely hormonal and symptomatic — they do not modify the disease.",
    accent: "gold",
  },
  {
    k: "What it carries with it",
    v: "Comorbidities include cardiovascular disease, increased risk of certain cancers, and other inflammatory conditions.",
    accent: "teal",
  },
];

function StatCell({ s, i }: { s: Stat; i: number }) {
  const numClass = "t-num text-gold-soft leading-[0.82] text-[clamp(3.4rem,11vw,7.5rem)]";
  return (
    <Reveal
      delay={i * 0.08}
      className="relative border-t-2 border-line-on-dark pt-6 md:border-l-2 md:border-t-0 md:pl-8 md:pt-2"
    >
      <div className={numClass}>
        {s.raw ? (
          <span>
            {s.prefix}
            {s.value}
            {s.suffix}
          </span>
        ) : (
          <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
        )}
      </div>
      <p className="t-h3 mt-5 max-w-[14ch] uppercase text-cream">{s.label}</p>
      <p className="t-body mt-3 max-w-[34ch] text-muted-on-dark">{s.detail}</p>
    </Reveal>
  );
}

export default function ProblemScene() {
  const reduced = useReducedMotion();
  return (
    <Scene id="problem" tone="plum" grain aria-label="The Problem">
      {/* Bauhaus geometry */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute -left-[10vmin] top-[8%] h-[34vmin] w-[34vmin] shape-dot bg-teal opacity-90"
      />
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute right-[7%] top-[14%] h-[13vmin] w-[13vmin] shape-dot bg-gold"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        className="pointer-events-none absolute bottom-[6%] right-0 h-3 w-[38vw] origin-right bg-gold"
      />

      <SceneBody>
        <p className="t-label flex items-center gap-2 text-gold-soft">
          <span aria-hidden className="h-2 w-2 bg-gold" /> The Problem — endometriosis
        </p>

        <Reveal className="mt-6">
          <h2 className="t-h1 max-w-[18ch] uppercase text-cream">
            The most common disease <span className="mark-gold">no one is taught to see.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 max-w-2xl">
          <p className="t-lead text-muted-on-dark">
            A chronic, whole-body disease that goes years without a name — under-recognized,
            under-diagnosed, and still treated at the symptom, not the source.
          </p>
        </Reveal>

        {/* Burden as bold data cells */}
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {(BURDEN_STATS as readonly Stat[]).map((s, i) => (
            <StatCell key={s.label} s={s} i={i} />
          ))}
        </div>

        {/* Supporting facts */}
        <div className="mt-20 grid gap-px overflow-hidden border-2 border-line-on-dark bg-line-on-dark sm:grid-cols-2">
          {FACTS.map((f, i) => (
            <Reveal
              key={f.k}
              delay={i * 0.06}
              className="bg-plum p-7 md:p-9"
            >
              <span
                aria-hidden
                className={clsx(
                  "block h-3 w-10",
                  f.accent === "gold" ? "bg-gold" : "bg-teal",
                )}
              />
              <p className="t-label mt-5 text-gold-soft">{f.k}</p>
              <p className="t-h3 mt-3 max-w-[26ch] text-cream">{f.v}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center gap-6">
          <p className="t-lead max-w-lg text-cream">
            The unmet need is the whole point. <span className="text-gold-soft">A different mechanism changes the answer.</span>
          </p>
          <FilmCTA scene="platform" variant="gold-on-dark">
            See the platform
          </FilmCTA>
        </Reveal>
      </SceneBody>
    </Scene>
  );
}
