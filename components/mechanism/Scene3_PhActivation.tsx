"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { useState, useEffect, useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Deterministic pseudo-random: same seed always yields the same 0-1 value */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/** Generates a wavy circle path for the cyclic peptide shape */
function wavyCirclePath(cx: number, cy: number, baseR: number, amplitude: number, bumps: number): string {
  const steps = bumps * 12;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const r = baseR + amplitude * Math.sin(angle * bumps);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ") + " Z";
}

const PEPTIDE_PATH = wavyCirclePath(50, 50, 30, 8, 12);

/* ------------------------------------------------------------------ */
/*  H+ ion particle component                                        */
/* ------------------------------------------------------------------ */
const HParticle = ({ delay, startX, startY, index }: { delay: number; startX: number; startY: number; index: number }) => {
  const randoms = useMemo(() => ({
    x1: (seededRandom(index * 5) - 0.5) * 60,
    x2: (seededRandom(index * 5 + 1) - 0.5) * 40,
    y1: (seededRandom(index * 5 + 2) - 0.5) * 60,
    y2: (seededRandom(index * 5 + 3) - 0.5) * 80,
    duration: 3 + seededRandom(index * 5 + 4) * 2,
  }), [index]);

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ left: startX, top: startY }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.5, 0],
        scale: [0, 1, 0.8, 0],
        x: [0, randoms.x1, randoms.x2],
        y: [0, randoms.y1, randoms.y2],
      }}
      transition={{
        duration: randoms.duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <span className="text-[9px] font-bold font-sans" style={{ color: MECHANISM_COLORS.phRed }}>H⁺</span>
    </motion.div>
  );
};

export const Scene3_PhActivation = () => {
  const reduced = usePrefersReducedMotion();
  // When reduced motion is preferred, freeze to the activated lesion state
  // (pH 6.0) so the mechanism reads fully in a static frame.
  const [pH, setPh] = useState(reduced ? 6.0 : 7.4);
  const particlePositions = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: 80 + seededRandom(i * 2 + 100) * 300,
      y: 50 + seededRandom(i * 2 + 101) * 250,
    })),
  []);

  useEffect(() => {
    // Reduced motion: initial state is already 6.0 — skip the per-frame rAF sweep.
    if (reduced) return;
    const duration = 7000;
    const startTime = Date.now();
    let raf: number;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      const cosWave = Math.cos(progress * Math.PI * 2);
      const normalized = (cosWave + 1) / 2;
      const currentPh = 6.0 + normalized * 1.4;
      setPh(currentPh);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const isAcidic = pH < 6.8;
  const acidity = Math.max(0, Math.min(1, (7.4 - pH) / 1.4)); // 0 = neutral, 1 = fully acidic
  const pulse = isAcidic && !reduced; // gate looping pulses behind reduced motion

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] p-8 overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #2E263A 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px',
        }}
      />

      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
          <h3 className="font-bold text-plum-dark uppercase tracking-widest text-xs">Smart Activation</h3>
        </div>
      </div>

      {/* pH status badge — flat, warm-clinical */}
      <div className="absolute top-6 right-6 z-10">
        <motion.div
          className="bg-bone-raised/90 backdrop-blur-sm rounded-full px-3 py-1.5 border shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] flex items-center gap-1.5"
          animate={{
            borderColor: isAcidic ? 'rgba(201,169,97,0.45)' : 'rgba(46,38,58,0.12)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor: isAcidic ? '#C9A961' : '#C3BDB1',
              scale: pulse ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: pulse ? 1.5 : 0.3, repeat: pulse ? Infinity : 0 }}
          />
          <span className={`text-[9px] font-bold uppercase tracking-wider ${isAcidic ? 'text-gold-deep' : 'text-plum-primary/50'}`}>
            {isAcidic ? 'Active' : 'Dormant'}
          </span>
        </motion.div>
      </div>

      {/* Environment Background — shifts from neutral cream to warm gold */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isAcidic ? MECHANISM_COLORS.lesionTissue : MECHANISM_COLORS.normalTissue
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Ambient H+ ions floating around when acidic — motion only */}
      <AnimatePresence>
        {pulse && (
          <>
            {particlePositions.map((pos, i) => (
              <HParticle
                key={`h-particle-${i}`}
                delay={i * 0.4}
                startX={pos.x}
                startY={pos.y}
                index={i}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex items-center justify-center w-full relative">

        {/* Activation Ripple Pulses — motion only (frozen under reduced motion) */}
        <AnimatePresence>
          {pulse && [0, 1, 2].map((i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute rounded-full"
              style={{ width: 160, height: 160, border: `2px solid ${MECHANISM_COLORS.calloutGold}40` }}
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          {pulse && (
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5], opacity: [0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.3, ease: "easeOut" }}
            >
              <div className="w-36 h-36 rounded-full blur-xl" style={{ background: `${MECHANISM_COLORS.calloutGold}30` }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Peptide — warm gold glow in the acidic state */}
        <motion.div
          className="relative w-36 h-36 z-10"
          animate={{
            rotate: reduced ? 0 : 360,
            filter: isAcidic ? `drop-shadow(0 0 6px ${MECHANISM_COLORS.peptideActive})` : 'none',
          }}
          transition={{
            rotate: reduced ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "linear" },
            filter: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Outer accent ring when activating — steady hairline under reduced motion */}
            <motion.circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1"
              animate={{
                opacity: isAcidic ? (pulse ? [0.3, 0.6, 0.3] : 0.5) : 0,
                r: pulse ? [44, 48, 44] : 46,
              }}
              transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
            />

            {/* Wavy peptide ring */}
            <motion.path
              d={PEPTIDE_PATH}
              fill={isAcidic ? MECHANISM_COLORS.peptideActive : "none"}
              fillOpacity={isAcidic ? 0.15 : 0}
              stroke={isAcidic ? MECHANISM_COLORS.peptideActive : MECHANISM_COLORS.peptideInactive}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                stroke: isAcidic ? MECHANISM_COLORS.peptideActive : MECHANISM_COLORS.peptideInactive,
                strokeWidth: isAcidic ? 6 : 5,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Neutral R label */}
            <motion.g animate={{ opacity: isAcidic ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <text x="50" y="50" textAnchor="middle" dy=".35em" fill={MECHANISM_COLORS.cellMembrane} fontSize="16" fontWeight="bold" fontFamily="sans-serif">R</text>
            </motion.g>

            {/* Activated RH+ label */}
            <motion.g animate={{ opacity: isAcidic ? 1 : 0, scale: isAcidic ? 1 : 0.8 }} transition={{ duration: 0.3 }}>
              <text x="42" y="50" textAnchor="middle" dy=".35em" fill={MECHANISM_COLORS.peptideDark} fontSize="14" fontWeight="bold" fontFamily="sans-serif">R</text>
              <motion.text
                x="64" y="43" textAnchor="middle" dy=".35em"
                fill={MECHANISM_COLORS.phRed} fontSize="13" fontWeight="bold" fontFamily="sans-serif"
                animate={{ scale: pulse ? [1, 1.15, 1] : 1 }}
                transition={pulse ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              >
                H⁺
              </motion.text>
            </motion.g>
          </svg>
        </motion.div>

        {/* Active state label — flat, warm-clinical (replaces gamified badge) */}
        <AnimatePresence mode="wait">
          {isAcidic ? (
            <motion.div
              key="active"
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 bg-bone-raised border border-gold-primary/40 px-5 py-2.5 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">Active</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 bg-bone-raised/80 border border-plum-dark/10 px-5 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-plum-primary/30" />
                <span className="text-xs font-bold uppercase tracking-widest text-plum-primary/50">Inactive</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Display */}
      <div className="w-full max-w-md flex flex-col gap-6 z-10 bg-bone-raised/80 backdrop-blur-sm p-6 rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em]">
          <motion.span animate={{ color: isAcidic ? '#C3BDB1' : '#4A3F5C' }} transition={{ duration: 0.3 }}>
            Bloodstream (pH 7.4)
          </motion.span>
          <motion.span animate={{ color: isAcidic ? '#8A6D2E' : '#C3BDB1' }} transition={{ duration: 0.3 }}>
            Lesion (pH 6.0)
          </motion.span>
        </div>

        <div className="relative h-12 flex items-center">
          {/* Gradient Track */}
          <div className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-stone-200 via-orange-100 to-gold-primary shadow-inner top-1/2 -translate-y-1/2" />

          {/* Active region highlight */}
          <motion.div
            className="absolute h-3 rounded-full top-1/2 -translate-y-1/2"
            style={{
              left: `${((7.4 - pH) / 1.4) * 100}%`,
              right: 0,
              background: `linear-gradient(90deg, ${MECHANISM_COLORS.calloutGold}40, ${MECHANISM_COLORS.calloutGold}20)`,
            }}
            animate={{ opacity: isAcidic ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* pH Tick Marks */}
          {[7.4, 7.0, 6.5, 6.0].map((tick) => {
            const pct = ((7.4 - tick) / 1.4) * 100;
            return (
              <div key={tick} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${pct}%` }}>
                <div className="w-px h-5 bg-plum-dark/15" />
                <span className="text-[7px] text-plum-primary/40 font-mono mt-0.5 tabular-nums">{tick.toFixed(1)}</span>
              </div>
            );
          })}

          {/* Animated Thumb */}
          <motion.div
            className="absolute h-10 w-10 bg-bone-raised rounded-full shadow-lg z-10 flex items-center justify-center"
            style={{
              left: `calc(${((7.4 - pH) / 1.4) * 100}% - 20px)`,
              border: `4px solid ${isAcidic ? MECHANISM_COLORS.calloutGold : MECHANISM_COLORS.cellMembraneLight}`,
            }}
            animate={{
              scale: isAcidic ? 1.12 : 1,
              boxShadow: isAcidic
                ? `0 0 14px ${MECHANISM_COLORS.calloutGold}55`
                : '0 2px 8px rgba(46,38,58,0.10)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{ backgroundColor: isAcidic ? MECHANISM_COLORS.calloutGold : '#C3BDB1' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-plum-primary/50 text-sm font-medium uppercase tracking-widest mb-1">Current Environment pH</p>
          <motion.div
            animate={{
              scale: isAcidic ? 1.1 : 1,
              color: isAcidic ? MECHANISM_COLORS.peptideActive : '#4A3F5C',
            }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-mono font-bold tabular-nums"
          >
            {pH.toFixed(1)}
          </motion.div>
          {/* pH indicator bar */}
          <motion.div
            className="mx-auto mt-2 h-1 rounded-full"
            style={{ width: '60%' }}
            animate={{
              background: `linear-gradient(90deg, #C3BDB1 ${(1 - acidity) * 100}%, ${MECHANISM_COLORS.calloutGold} ${(1 - acidity) * 100}%)`,
            }}
            transition={{ duration: reduced ? 0 : 0.1 }}
          />
        </div>
      </div>
    </div>
  );
};
