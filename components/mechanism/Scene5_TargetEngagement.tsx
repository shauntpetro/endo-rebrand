"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { useState, useEffect, useMemo } from "react";


/** Deterministic pseudo-random: same seed always yields the same 0-1 value */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const ATOM_COLORS = ["#9F8CA6", "#D6B65F", "#8C7A6B", "#5D4E60"];

/* CSS Peptide Ring — replaces Three.js Canvas to avoid AnimatePresence crash */
function PeptideRingCSS() {
  const count = 8;
  const radius = 35;
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: count }).map((_, i) => {
          const a1 = (i / count) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) % count / count) * Math.PI * 2 - Math.PI / 2;
          return (
            <line key={i} x1={50 + radius * Math.cos(a1)} y1={50 + radius * Math.sin(a1)} x2={50 + radius * Math.cos(a2)} y2={50 + radius * Math.sin(a2)} stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" />
          );
        })}
      </svg>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (radius / 50) * 50 * Math.cos(angle);
        const y = 50 + (radius / 50) * 50 * Math.sin(angle);
        const color = ATOM_COLORS[i % ATOM_COLORS.length];
        return (
          <div key={i} className="absolute rounded-full" style={{ width: 10, height: 10, left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", background: color, boxShadow: "none" }} />
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle Burst — radiating particles on engagement                */
/* ------------------------------------------------------------------ */
const BurstParticle = ({ angle, delay, index }: { angle: number; delay: number; index: number }) => {
  const rad = (angle * Math.PI) / 180;
  const { dist, dur } = useMemo(() => ({
    dist: 80 + seededRandom(index * 3 + 300) * 60,
    dur: 0.8 + seededRandom(index * 3 + 301) * 0.4,
  }), [index]);
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        top: '50%', left: '50%',
        backgroundColor: MECHANISM_COLORS.calloutGold,
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{ duration: dur, delay, ease: "easeOut" }}
    />
  );
};

export const Scene5_TargetEngagement = () => {
  const [phase, setPhase] = useState<'approaching' | 'engaged' | 'resolved'>('approaching');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setPhase('approaching');
      timer = setTimeout(() => {
        setPhase('engaged');
        timer = setTimeout(() => {
          setPhase('resolved');
          timer = setTimeout(cycle, 3000);
        }, 2500);
      }, 2500);
    };
    cycle();
    return () => clearTimeout(timer);
  }, []);

  const engaged = phase === 'engaged' || phase === 'resolved';

  return (
    <motion.div
      className="w-full h-full relative flex items-center justify-center bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden p-8"
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
          <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs">Target Engagement</h3>
        </div>
      </motion.div>

      {/* Phase indicator — pill badge style */}
      <motion.div className="absolute top-6 right-6 z-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-stone-200/60 shadow-sm flex items-center gap-2">
          {['approaching', 'engaged', 'resolved'].map((p) => (
            <motion.div
              key={p}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: phase === p ? MECHANISM_COLORS.calloutGold : '#E5E7EB',
                scale: phase === p ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
          <span className="text-[9px] font-bold uppercase tracking-wider ml-1" style={{ color: phase === 'resolved' ? '#7C3AED' : phase === 'engaged' ? '#A68945' : '#9CA3AF' }}>
            {phase === 'resolved' ? 'Resolved' : phase === 'engaged' ? 'Engaging' : 'Approaching'}
          </span>
        </div>
      </motion.div>

      {/* The Cell Container — breathing pulse */}
      <motion.div
        className="w-[400px] h-[400px] rounded-full relative flex items-center justify-center overflow-hidden"
        style={{
          background: MECHANISM_COLORS.lesionTissue,
          border: `2px solid ${MECHANISM_COLORS.cellMembrane}`,
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
        }}
        animate={{
          scale: phase === 'resolved' ? 0.85 : phase === 'engaged' ? 0.92 : [1, 1.015, 1],
          filter: phase === 'resolved' ? "grayscale(0.4)" : "grayscale(0)",
        }}
        transition={{
          scale: phase === 'approaching'
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 1.5, ease: "easeInOut" },
          filter: { duration: 1 },
        }}
      >
        {/* Nucleus */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-plum-dark/20 blur-xl top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Organelle details */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 400">
          <motion.path
            d="M 80,200 Q 130,180 100,160 Q 70,140 110,120 Q 140,100 120,80"
            fill="none" stroke="#9F8CA6" strokeWidth="2.5"
            animate={{ d: ["M 80,200 Q 130,180 100,160 Q 70,140 110,120 Q 140,100 120,80", "M 82,202 Q 128,178 98,158 Q 68,138 108,118 Q 138,98 118,78", "M 80,200 Q 130,180 100,160 Q 70,140 110,120 Q 140,100 120,80"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M 90,210 Q 140,190 110,170 Q 80,150 120,130" fill="none" stroke="#9F8CA6" strokeWidth="1.5" />
          <motion.ellipse
            cx="300" cy="280" rx="35" ry="18" fill="none" stroke="#8C7A6B" strokeWidth="2" transform="rotate(-30, 300, 280)"
            animate={{ rx: [35, 38, 35], ry: [18, 16, 18] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="120" cy="300" r="12" fill="none" stroke="#D6B65F" strokeWidth="1.5" opacity="0.6" />
          <circle cx="280" cy="120" r="8" fill="none" stroke="#D6B65F" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Intracellular Target — pulses when approaching, locks when engaged */}
        <motion.div
          className="w-20 h-20 rounded-xl flex items-center justify-center relative z-10"
          style={{
            backgroundColor: MECHANISM_COLORS.intracellularTarget,
            boxShadow: '0 10px 20px rgba(244, 224, 77, 0.3)',
          }}
          animate={{
            rotate: phase === 'approaching' ? [0, 5, -5, 0] : 0,
            scale: phase === 'engaged' ? [1, 1.08, 1] : 1,
            boxShadow: phase === 'engaged'
              ? ['0 10px 20px rgba(201,169,97,0.3)', '0 10px 40px rgba(201,169,97,0.6)', '0 10px 20px rgba(201,169,97,0.3)']
              : '0 10px 20px rgba(244, 224, 77, 0.3)',
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">Target</span>
          <div className="absolute -top-3 w-10 h-5 bg-gold-primary/20/50 rounded-b-full backdrop-blur-sm" />
        </motion.div>

        {/* Targeting reticle — appears during approach */}
        <AnimatePresence>
          {phase === 'approaching' && (
            <motion.div
              className="absolute pointer-events-none z-5"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
                <motion.circle cx="60" cy="60" r="50" fill="none" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="1" strokeDasharray="8 4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle cx="60" cy="60" r="35" fill="none" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="0.5" strokeDasharray="4 6"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Crosshair lines */}
                <line x1="60" y1="5" x2="60" y2="25" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="0.5" opacity="0.5" />
                <line x1="60" y1="95" x2="60" y2="115" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="0.5" opacity="0.5" />
                <line x1="5" y1="60" x2="25" y2="60" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="0.5" opacity="0.5" />
                <line x1="95" y1="60" x2="115" y2="60" stroke={MECHANISM_COLORS.cellMembrane} strokeWidth="0.5" opacity="0.5" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Peptide — arc trajectory approach */}
        <AnimatePresence>
          {phase === 'approaching' && (
            <motion.div
              className="absolute w-28 h-28 z-20 pointer-events-none"
              initial={{ x: 220, y: -180, opacity: 0, scale: 0.4 }}
              animate={{
                x: [220, 140, 60, 30],
                y: [-180, -140, -80, -40],
                opacity: [0, 0.7, 1, 1],
                scale: [0.4, 0.6, 0.85, 1],
                rotate: [0, 120, 240, 360],
              }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] as const, times: [0, 0.3, 0.7, 1] }}
            >
              <PeptideRingCSS />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Binding Flash + Particle Burst */}
        <AnimatePresence>
          {phase === 'engaged' && (
            <>
              {/* Central flash */}
              <motion.div
                className="absolute w-32 h-32 rounded-full blur-xl z-0"
                style={{ background: `${MECHANISM_COLORS.calloutGold}60` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 3, 2.5], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              {/* Expanding ring */}
              <motion.div
                className="absolute w-full h-full rounded-full border-4 z-0"
                style={{ borderColor: `${MECHANISM_COLORS.cellMembrane}4D` }}
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1 }}
              />
              {/* Radiating particles */}
              {Array.from({ length: 16 }).map((_, i) => (
                <BurstParticle key={`burst-${i}`} angle={(360 / 16) * i} delay={0.05 * i} index={i} />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Resolution visualization */}
        <AnimatePresence>
          {phase === 'resolved' && (
            <>
              {/* Spiral-closing rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`close-ring-${i}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none rounded-full border-[2px]"
                  style={{ borderColor: `${MECHANISM_COLORS.peptideDark}80` }}
                  initial={{ width: 180 - i * 30, height: 180 - i * 30, opacity: 0, rotate: i * 30 }}
                  animate={{ width: 20, height: 20, opacity: [0, 0.8, 0.5], rotate: 360 + i * 30 }}
                  transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut" }}
                />
              ))}
              {/* Resolution stamp */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                initial={{ opacity: 0, scale: 3, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-clinical-teal/30 shadow-lg flex items-center gap-2">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-clinical-teal/15 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-clinical-teal"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                  <span className="text-sm font-bold text-stone-700 uppercase tracking-wider">Resolved</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Natural Clearance panel */}
      <AnimatePresence>
        {phase === 'resolved' && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.0, type: "spring", bounce: 0.3 }}
          >
            <div className="bg-stone-50/90 backdrop-blur-md px-6 py-3 rounded-xl border border-stone-200/60 shadow-sm flex items-center gap-4">
              <VolumeCounter />
              <div className="w-px h-10 bg-stone-200" />
              <div>
                <p className="text-xs font-bold text-stone-700">Natural Clearance</p>
                <p className="text-[10px] text-stone-400 mt-0.5">No inflammation, no toxicity</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VolumeCounter = () => {
  const [volume, setVolume] = useState(100);
  const circumference = 2 * Math.PI * 18;

  useEffect(() => {
    const interval = setInterval(() => {
      setVolume(v => Math.max(0, v - 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#F5D5A8" strokeWidth="3" />
          <motion.circle
            cx="22" cy="22" r="18"
            fill="none" stroke="#C9A961" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - volume / 100)}
            animate={{ stroke: volume < 20 ? '#4A9B8E' : '#C9A961' }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-mono font-bold"
            style={{
              color: volume < 20 ? '#4A9B8E' : '#A68945',
            }}
          >
            {volume}%
          </span>
        </div>
      </div>
      <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Volume</span>
    </div>
  );
};
