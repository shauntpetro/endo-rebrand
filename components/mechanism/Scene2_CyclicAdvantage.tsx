"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ------------------------------------------------------------------ */
/*  Stagger variants                                                  */
/* ------------------------------------------------------------------ */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.15 } },
};
const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.3, duration: 0.8 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, bounce: 0.4, duration: 0.9 } },
};

/* ------------------------------------------------------------------ */
/*  CSS Cyclic Peptide Ring                                           */
/* ------------------------------------------------------------------ */
const ATOM_COLORS = ["#9F8CA6", "#D6B65F", "#8C7A6B", "#5D4E60"];

function CyclicPeptideCSS({ reduced }: { reduced: boolean }) {
  const count = 10;
  const radius = 50; // px
  return (
    <motion.div
      className="relative w-full h-full"
      animate={reduced ? undefined : { rotate: 360 }}
      transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Bonds (lines between atoms) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
        {Array.from({ length: count }).map((_, i) => {
          const angle1 = (i / count) * Math.PI * 2 - Math.PI / 2;
          const angle2 = ((i + 1) % count / count) * Math.PI * 2 - Math.PI / 2;
          const x1 = 60 + radius * Math.cos(angle1);
          const y1 = 60 + radius * Math.sin(angle1);
          const x2 = 60 + radius * Math.cos(angle2);
          const y2 = 60 + radius * Math.sin(angle2);
          return (
            <line key={`bond-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2E263A" strokeWidth="2.5" strokeLinecap="round" />
          );
        })}
      </svg>
      {/* Atoms */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (radius / 60) * 50 * Math.cos(angle);
        const y = 50 + (radius / 60) * 50 * Math.sin(angle);
        const color = ATOM_COLORS[i % ATOM_COLORS.length];
        const size = i % 3 === 0 ? 12 : 10;
        return (
          <div
            key={`atom-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              background: color,
              boxShadow: "none",
            }}
          />
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Antibody Y-shape                                              */
/* ------------------------------------------------------------------ */
function AntibodySVG({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 80 90"
      className="w-full h-full"
      animate={reduced ? undefined : { y: [0, -3, 0] }}
      transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Left arm */}
      <line x1="40" y1="45" x2="15" y2="15" stroke="#5D4E60" strokeWidth="5" strokeLinecap="round" />
      <line x1="38" y1="42" x2="10" y2="18" stroke="#9F8CA6" strokeWidth="4" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="40" y1="45" x2="65" y2="15" stroke="#5D4E60" strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="70" y2="18" stroke="#9F8CA6" strokeWidth="4" strokeLinecap="round" />
      {/* Stem */}
      <line x1="40" y1="45" x2="40" y2="80" stroke="#5D4E60" strokeWidth="5" strokeLinecap="round" />
      <line x1="38" y1="45" x2="38" y2="80" stroke="#5D4E60" strokeWidth="5" strokeLinecap="round" />
      {/* Hinge */}
      <circle cx="40" cy="45" r="4" fill="#8C7A6B" />
      {/* Tips */}
      <circle cx="15" cy="15" r="4" fill="#9F8CA6" />
      <circle cx="65" cy="15" r="4" fill="#9F8CA6" />
      <circle cx="10" cy="18" r="3" fill="#D6B65F" />
      <circle cx="70" cy="18" r="3" fill="#D6B65F" />
      {/* Bottom */}
      <circle cx="40" cy="80" r="4" fill="#8C7A6B" />
      <circle cx="38" cy="80" r="4" fill="#8C7A6B" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                             */
/* ------------------------------------------------------------------ */
export const Scene2_CyclicAdvantage = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="w-full h-full relative flex flex-col items-center justify-center bg-bone-raised rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] p-8 overflow-hidden"
      variants={container}
      initial={reduced ? "show" : "hidden"}
      animate="show"
    >
      {/* Warm luminous accent — the one confident glow (frozen static under reduced motion) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.14) 0%, transparent 70%)" }}
        animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={reduced ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #2E263A 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px',
        }}
      />

      <motion.div className="absolute top-6 left-6 z-10" variants={slideUp}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
          <h3 className="font-bold text-plum-primary uppercase tracking-widest text-xs">The Cyclic Advantage</h3>
        </div>
      </motion.div>

      {/* Size comparison bracket / baseline */}
      <motion.div
        className="absolute bottom-[140px] left-1/2 -translate-x-1/2 w-[85%] max-w-lg h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(46,38,58,0.14) 20%, rgba(46,38,58,0.14) 80%, transparent 100%)' }}
        variants={slideUp}
      />

      <div className="flex items-end justify-center gap-4 md:gap-8 w-full h-56 relative z-10 mt-8">

        {/* Small Molecule — stagger in from left */}
        <motion.div className="flex flex-col items-center justify-end h-full gap-3 group relative p-2 w-28" variants={slideUp}>
          <div className="h-24 flex items-center justify-center">
            <motion.div className="relative w-14 h-14">
              {/* Dashed orbit ring */}
              <motion.div
                className="absolute inset-0 border border-dashed border-plum-dark/20 rounded-full"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Scattered dots — chaotic motion showing lack of control */}
              <motion.div
                animate={reduced ? undefined : { rotate: 360 }}
                transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute top-0 right-1 w-2.5 h-2.5 bg-plum-dark/30 rounded-full"
                  animate={reduced ? undefined : { x: [0, 5, -3, 0], y: [0, -4, 3, 0] }}
                  transition={reduced ? undefined : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1 left-1 w-3.5 h-3.5 bg-plum-dark/40 rounded-full"
                  animate={reduced ? undefined : { x: [0, -4, 6, 0], y: [0, 3, -2, 0] }}
                  transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-3 left-0 w-2 h-2 bg-plum-dark/25 rounded-full"
                  animate={reduced ? undefined : { x: [0, 3, -5, 0], y: [0, 5, -1, 0] }}
                  transition={reduced ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              {/* Size indicator line — statically visible for legibility */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-px bg-plum-dark/20" />
                <span className="text-[10px] font-mono text-plum-dark/50 mt-0.5 tabular-nums">~0.5 kDa</span>
              </div>
            </motion.div>
          </div>
          <div className="text-center relative z-10">
            <p className="font-bold text-plum-primary text-xs uppercase tracking-wide mb-1">Small Molecule</p>
            <p className="text-[9px] font-medium text-plum-dark/50 uppercase tracking-wider">Low Specificity</p>
          </div>
        </motion.div>

        {/* Cyclic Peptide — CSS ring of atoms (replaces Three.js Canvas) */}
        <motion.div className="flex flex-col items-center justify-end h-full gap-2 w-44" variants={scaleIn}>
          <div className="w-36 h-36 relative -mt-8">
            {/* Double-layer pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.09) 0%, transparent 60%)' }}
              animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, transparent 50%)' }}
              animate={reduced ? undefined : { scale: [1.2, 1.6, 1.2], opacity: [0.1, 0.3, 0.1] }}
              transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <CyclicPeptideCSS reduced={reduced} />
            {/* Size indicator line — statically visible for legibility */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-16 h-px bg-gold-primary/60" />
              <span className="text-[10px] font-mono text-gold-deep mt-0.5 tabular-nums">~1–3 kDa</span>
            </div>
          </div>
          <motion.div
            className="text-center relative z-20 -mt-2 bg-bone-raised/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold-primary/30 shadow-gold-glow-sm"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full blur-sm"
              style={{ background: 'rgba(201,169,97,0.3)' }}
              animate={reduced ? undefined : { opacity: [0.3, 0.6, 0.3] }}
              transition={reduced ? undefined : { duration: 2, repeat: Infinity }}
            />
            <p className="font-bold text-gold-deep text-base font-serif">Cyclic Peptide</p>
            <p className="text-[9px] font-bold text-plum-primary uppercase tracking-[0.2em]">High Specificity</p>
          </motion.div>
        </motion.div>

        {/* Antibody — SVG Y-shape (replaces Three.js Canvas) */}
        <motion.div className="flex flex-col items-center justify-end h-full gap-3 group relative p-2 w-28" variants={slideUp}>
          <div className="h-24 w-24 relative flex items-center justify-center">
            <AntibodySVG reduced={reduced} />
            {/* Size indicator — statically visible for legibility */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-14 h-px bg-plum-dark/20" />
              <span className="text-[10px] font-mono text-plum-dark/50 mt-0.5 tabular-nums">~150 kDa</span>
            </div>
          </div>
          <div className="text-center relative z-10">
            <p className="font-bold text-plum-primary text-xs uppercase tracking-wide mb-1">Antibody</p>
            <p className="text-[9px] font-medium text-plum-dark/50 uppercase tracking-wider">Too Large</p>
          </div>
        </motion.div>
      </div>

      {/* Quote panel */}
      <motion.div
        className="mt-6 text-center max-w-md relative z-10 bg-bone/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-plum-dark/10"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-sm text-black-soft font-serif leading-relaxed">
          &ldquo;Cyclic peptides occupy the <motion.span
            className="text-gold-deep italic font-bold"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
          >sweet spot</motion.span>: large enough for specificity, small enough to penetrate cells.&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
};
