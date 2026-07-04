"use client";

import { motion, useReducedMotion } from "framer-motion";
import Scene, { SceneBody } from "@/components/film/Scene";
import SplitText from "@/components/site/SplitText";
import FilmCTA from "@/components/film/FilmCTA";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CoverScene() {
  const reduced = useReducedMotion();
  return (
    <Scene id="cover" tone="ink" grain aria-label="Cover">
      {/* Bauhaus geometry */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className="pointer-events-none absolute -right-[8%] top-1/2 h-[62vmin] w-[62vmin] -translate-y-1/2 shape-dot bg-gold"
      />
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
        className="pointer-events-none absolute right-[6%] top-[24%] h-[20vmin] w-[20vmin] shape-dot bg-teal"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        className="pointer-events-none absolute bottom-[16%] left-0 h-3 w-[42vw] origin-left bg-teal"
      />

      <SceneBody>
        {/* folio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b-2 border-line-on-dark pb-5"
        >
          <span className="t-label text-cream">EndoCyclic Therapeutics</span>
          <span className="t-label text-muted-on-dark">Clinical-stage precision medicine</span>
          <span className="t-label ml-auto flex items-center gap-2 text-gold-soft">
            <span aria-hidden className="h-2 w-2 bg-gold" />
            FDA IND Allowance · 2026
          </span>
        </motion.div>

        <h1 className="t-display max-w-[16ch] uppercase text-cream">
          <SplitText
            lines={[[{ text: "Correction," }], [{ text: "not" }, { text: " destruction.", accent: true }]]}
            accentClass="text-gold-soft"
          />
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="t-lead md:col-span-6 text-muted-on-dark"
          >
            A non-hormonal precision peptide designed to eliminate endometriosis lesions — and
            resolve the pain they cause — rather than simply mask symptoms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
            className="flex flex-wrap items-start gap-4 md:col-span-5 md:col-start-8"
          >
            <FilmCTA scene="problem" variant="gold-on-dark">Enter the film</FilmCTA>
            <FilmCTA overlay="contact" variant="ghost-on-dark" arrow={false}>Partner with us</FilmCTA>
          </motion.div>
        </div>
      </SceneBody>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-on-dark"
      >
        <span className="t-label">Scroll</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-[2px] bg-gold"
        />
      </motion.div>
    </Scene>
  );
}
