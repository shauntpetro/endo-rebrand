"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Scene, { SceneBody } from "@/components/film/Scene";
import Reveal from "@/components/site/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    n: "01",
    title: "pH-mediated activation",
    caption:
      "The peptide stays dormant in the body — switching on only in the acidic microenvironment that surrounds diseased tissue.",
  },
  {
    n: "02",
    title: "Selective uptake",
    caption:
      "Once active, it is taken up selectively by diseased tissue through a proprietary endocytic pathway. Healthy tissue is passed over.",
  },
  {
    n: "03",
    title: "Correction at the source",
    caption:
      "Lesions are designed to be eliminated where they live — with no hormones, no surgery, and healthy tissue left untouched.",
  },
] as const;

/**
 * Mechanism act — "Correction, not destruction."
 * A bold Bauhaus geometric illustration (big circles, bars, blocks) tells the
 * three-step story left-to-right. Purely illustrative: no efficacy numbers.
 */
export default function MechanismScene() {
  const reduced = useReducedMotion();

  const stage: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const pop: Variants = {
    hidden: reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  };
  const grow: Variants = {
    hidden: reduced ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 },
    show: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: EASE } },
  };
  // Lesion "clears": starts present, wipes away to reveal untouched tissue.
  const clear: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 1, clipPath: "inset(0 0% 0 0)" },
    show: reduced
      ? { opacity: 0 }
      : { opacity: 0, clipPath: "inset(0 0 0 100%)", transition: { duration: 0.9, ease: EASE, delay: 0.55 } },
  };

  return (
    <Scene id="mechanism" tone="ink" grain aria-label="Mechanism">
      {/* Bauhaus decorative geometry */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[8%] h-[34vmin] w-[34vmin] shape-dot bg-plum-mid opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[10%] h-4 w-4 shape-dot bg-teal"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-0 h-3 w-[36vw] bg-gold opacity-70"
      />

      <SceneBody>
        <p className="t-label text-gold-soft">§ Mechanism</p>

        <Reveal className="mt-6">
          <h2 className="t-display max-w-[15ch] uppercase text-cream">
            Correction, not{" "}
            <span className="text-gold-soft">destruction.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 max-w-2xl">
          <p className="t-lead text-muted-on-dark">
            One non-hormonal precision peptide, three steps — engineered to find disease,
            enter only where it lives, and clear it without touching healthy tissue.
          </p>
        </Reveal>

        {/* Three-step geometric mechanism */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              variants={stage}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
              className="flex flex-col"
            >
              {/* illustration stage */}
              <div
                aria-hidden
                className="relative flex h-52 items-center justify-center overflow-hidden bg-plum-deep"
              >
                {i === 0 && (
                  <>
                    <motion.span
                      variants={pop}
                      className="absolute left-4 top-4 inline-flex items-center gap-1 bg-gold px-2 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-ink"
                    >
                      pH ↓
                    </motion.span>
                    {/* teal activation ring */}
                    <motion.div variants={pop} className="h-32 w-32 shape-dot border-[6px] border-teal" />
                    {/* dormant plum core */}
                    <motion.div variants={pop} className="absolute h-16 w-16 shape-dot bg-plum-mid" />
                    {/* activated gold core */}
                    <motion.div variants={pop} className="absolute h-9 w-9 shape-dot bg-gold" />
                    {/* trigger bar */}
                    <motion.div
                      variants={grow}
                      className="absolute bottom-5 left-6 right-6 h-2 origin-left bg-teal-bright"
                    />
                  </>
                )}

                {i === 1 && (
                  <>
                    <div className="grid grid-cols-3 gap-5">
                      {[0, 1, 2, 3, 4, 5].map((d) =>
                        d === 4 ? (
                          <motion.div
                            key={d}
                            variants={pop}
                            className="h-11 w-11 shape-dot bg-gold ring-4 ring-gold/30"
                          />
                        ) : (
                          <motion.div
                            key={d}
                            variants={pop}
                            className="h-10 w-10 shape-dot border-[3px] border-teal/60"
                          />
                        ),
                      )}
                    </div>
                    {/* uptake arrow into diseased cell */}
                    <motion.div
                      variants={grow}
                      className="absolute bottom-5 left-1/2 flex origin-left -translate-x-1/2 items-center gap-1 text-gold-soft"
                    >
                      <span className="block h-2 w-14 bg-gold" />
                      <ArrowRight size={18} strokeWidth={3} />
                    </motion.div>
                  </>
                )}

                {i === 2 && (
                  <>
                    {/* untouched healthy tissue */}
                    <div className="flex items-center gap-6">
                      <motion.div variants={pop} className="h-12 w-12 shape-dot bg-teal" />
                      {/* lesion site: block clears to reveal clean outline */}
                      <div className="relative h-16 w-16">
                        <motion.div
                          variants={pop}
                          className="absolute inset-0 shape-dot border-[3px] border-dashed border-cream/35"
                        />
                        <motion.div
                          variants={clear}
                          className="absolute inset-0 shape-dot bg-gold"
                        />
                      </div>
                      <motion.div variants={pop} className="h-12 w-12 shape-dot bg-teal" />
                    </div>
                    <motion.div
                      variants={grow}
                      className="absolute bottom-5 left-6 right-6 h-2 origin-left bg-teal-bright"
                    />
                  </>
                )}
              </div>

              {/* caption */}
              <div className="mt-6 border-t-2 border-line-on-dark pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="t-num text-2xl text-gold-soft">{step.n}</span>
                  <h3 className="t-h3 uppercase text-cream">{step.title}</h3>
                </div>
                <p className="t-body mt-3 text-muted-on-dark">{step.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <p className="font-display text-xl font-bold text-cream sm:text-2xl">
            Designed to act{" "}
            <span className="text-gold-soft">only where disease lives.</span>
          </p>
        </Reveal>
      </SceneBody>
    </Scene>
  );
}
