"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { useState, useEffect, useMemo } from "react";

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
  const [pH, setPh] = useState(7.4);
  const particlePositions = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: 80 + seededRandom(i * 2 + 100) * 300,
      y: 50 + seededRandom(i * 2 + 101) * 250,
    })),
  []);

  useEffect(() => {
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
  }, []);

  const isAcidic = pH < 6.8;
  const acidity = Math.max(0, Math.min(1, (7.4 - pH) / 1.4)); // 0 = neutral, 1 = fully acidic

  return (
    <motion.div
      className="w-full h-full relative flex flex-col items-center justify-between rounded-xl border border-stone-200 shadow-sm p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
          backgroundSize: '12px 12px',
        }}
      />

      <motion.div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
          <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs">Smart Activation</h3>
        </div>
      </motion.div>

      {/* pH status badge */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        animate={{
          opacity: 1,
        }}
      >
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border shadow-sm flex items-center gap-1.5"
          animate={{
            borderColor: isAcidic ? 'rgba(201,169,97,0.4)' : 'rgba(214,211,209,0.6)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor: isAcidic ? '#C9A961' : '#D1D5DB',
              scale: isAcidic ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: isAcidic ? 1.5 : 0.3, repeat: isAcidic ? Infinity : 0 }}
          />
          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: isAcidic ? '#A68945' : '#9CA3AF' }}>
            {isAcidic ? 'Active' : 'Dormant'}
          </span>
        </motion.div>
      </motion.div>

      {/* Environment Background — shifts from neutral cream to warm gold */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isAcidic ? MECHANISM_COLORS.lesionTissue : MECHANISM_COLORS.normalTissue
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Ambient H+ ions floating around when acidic */}
      <AnimatePresence>
        {isAcidic && (
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

        {/* Activation Ripple Pulses */}
        <AnimatePresence>
          {isAcidic && [0, 1, 2].map((i) => (
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
          {isAcidic && (
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

        {/* The Peptide — with dramatic glow build-up */}
        <motion.div
          className="relative w-36 h-36 z-10"
          animate={{
            rotate: 360,
            filter: isAcidic ? `drop-shadow(0 0 6px ${MECHANISM_COLORS.peptideActive})` : 'none',
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            filter: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Outer glow ring when activating */}
            <motion.circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1"
              animate={{ opacity: isAcidic ? [0.3, 0.6, 0.3] : 0, r: isAcidic ? [44, 48, 44] : 46 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Wavy peptide ring */}
            <motion.path
              d={PEPTIDE_PATH}
              fill={isAcidic ? MECHANISM_COLORS.peptideActive : "none"}
              fillOpacity={isAcidic ? 0.15 : 0}
              stroke={isAcidic ? MECHANISM_COLORS.peptideActive : "#9CA3AF"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                stroke: isAcidic ? MECHANISM_COLORS.peptideActive : "#9CA3AF",
                strokeWidth: isAcidic ? 6 : 5,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Neutral R label */}
            <motion.g animate={{ opacity: isAcidic ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <text x="50" y="50" textAnchor="middle" dy=".35em" fill="#6B7280" fontSize="16" fontWeight="bold" fontFamily="sans-serif">R</text>
            </motion.g>

            {/* Activated RH+ label */}
            <motion.g animate={{ opacity: isAcidic ? 1 : 0, scale: isAcidic ? 1 : 0.8 }} transition={{ duration: 0.3 }}>
              <text x="42" y="50" textAnchor="middle" dy=".35em" fill={MECHANISM_COLORS.peptideActive} fontSize="14" fontWeight="bold" fontFamily="sans-serif">R</text>
              <motion.text
                x="64" y="43" textAnchor="middle" dy=".35em"
                fill={MECHANISM_COLORS.phRed} fontSize="13" fontWeight="bold" fontFamily="sans-serif"
                animate={{ scale: isAcidic ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                H⁺
              </motion.text>
            </motion.g>
          </svg>
        </motion.div>

        {/* Activation Callout — slides in from right */}
        <AnimatePresence>
          {isAcidic && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20"
              initial={{ opacity: 0, scale: 0.5, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 30 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            >
              <motion.div
                className="bg-gradient-to-br from-gold-light to-gold-primary border border-white text-black-primary font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                animate={{ boxShadow: ['0 4px 20px rgba(201,169,97,0.3)', '0 8px 30px rgba(201,169,97,0.5)', '0 4px 20px rgba(201,169,97,0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="flex items-center"
                  animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z" /></svg>
                </motion.span>
                Activated!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neutral state label */}
        <AnimatePresence>
          {!isAcidic && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-stone-400 font-medium text-sm tracking-wide px-4 py-2 rounded-lg border border-stone-200 bg-white/80">
                Inactive
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Display */}
      <motion.div
        className="w-full max-w-md flex flex-col gap-6 z-10 bg-stone-50/80 backdrop-blur-sm p-6 rounded-xl border border-stone-200/60 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em]">
          <motion.span animate={{ color: isAcidic ? '#D1D5DB' : '#4B5563' }} transition={{ duration: 0.3 }}>
            Bloodstream (pH 7.4)
          </motion.span>
          <motion.span animate={{ color: isAcidic ? '#C9A961' : '#D1D5DB' }} transition={{ duration: 0.3 }}>
            Lesion (pH 6.0)
          </motion.span>
        </div>

        <div className="relative h-12 flex items-center">
          {/* Gradient Track */}
          <div className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-gray-200 via-orange-100 to-gold-primary shadow-inner top-1/2 -translate-y-1/2" />

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
                <div className="w-px h-5 bg-stone-300/50" />
                <span className="text-[7px] text-stone-400 font-mono mt-0.5">{tick.toFixed(1)}</span>
              </div>
            );
          })}

          {/* Animated Thumb */}
          <motion.div
            className="absolute h-10 w-10 bg-white rounded-full shadow-lg z-10 flex items-center justify-center"
            style={{
              left: `calc(${((7.4 - pH) / 1.4) * 100}% - 20px)`,
              border: `4px solid ${isAcidic ? MECHANISM_COLORS.calloutGold : MECHANISM_COLORS.cellMembrane}`,
            }}
            animate={{
              scale: isAcidic ? 1.15 : 1,
              boxShadow: isAcidic
                ? `0 0 20px ${MECHANISM_COLORS.calloutGold}60`
                : '0 2px 8px rgba(0,0,0,0.1)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{ backgroundColor: isAcidic ? MECHANISM_COLORS.calloutGold : '#D1D5DB' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-1">Current Environment pH</p>
          <motion.div
            animate={{
              scale: isAcidic ? 1.1 : 1,
              color: isAcidic ? MECHANISM_COLORS.peptideActive : '#4B5563',
            }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-mono font-bold"
          >
            {pH.toFixed(1)}
          </motion.div>
          {/* pH indicator bar */}
          <motion.div
            className="mx-auto mt-2 h-1 rounded-full"
            style={{ width: '60%' }}
            animate={{
              background: `linear-gradient(90deg, #D1D5DB ${(1 - acidity) * 100}%, ${MECHANISM_COLORS.calloutGold} ${(1 - acidity) * 100}%)`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
