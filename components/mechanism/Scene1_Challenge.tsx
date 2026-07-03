"use client";

import { motion, useInView } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { PeptideRing, PeptideRingProtonated, IntracellularTarget } from "./Shapes";
import React, { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ====================================================================
   Scene 1 — "The Discovery"

   Normal tissue (left): sealed membrane, peptides bounce off.
   Lesion tissue (right) — 6-phase endocytosis cycle:
     Phase 0: Peptide drifts above FLAT membrane, H+ ions visible
     Phase 1: Peptide protonates & approaches; membrane forms shallow C-pocket
     Phase 2: Peptide enters deep C-pocket (fully wrapped)
     Phase 3: C-pocket lips close → forms O (vesicle), membrane seals
     Phase 4: Vesicle transports to intracellular target
     Phase 5: Vesicle scatters open, peptide binds to target

   Motion policy (Luminous Editorial):
   - The perpetual auto-cycle + all infinite sub-animations run only when the
     figure is in view AND the OS does not request reduced motion.
   - Reduced motion / no forcePhase → freeze to a static, fully-resolved
     end-state (phase 5, peptide engaged at target) so the schematic reads
     clearly without any looping.
   ==================================================================== */

const PHASE_DURATIONS = [3000, 2800, 2800, 2000, 2500, 4000];
const TOTAL_PHASES = 6;
// Static end-state shown when motion is reduced: the completed uptake cycle.
const REDUCED_PHASE = 5;

/* ------------------------------------------------------------------ */
/*  Lesion membrane SVG paths — identical command structure for morph  */
/*  viewBox: 0 0 200 300.  Membrane sits around y ≈ 132.             */
/* ------------------------------------------------------------------ */

// Fill paths (tissue mass below membrane)
const FILL_FLAT =
  "M -5,300 L 205,300 L 205,132 Q 165,118 140,126 Q 120,132 108,131 Q 100,130 92,131 Q 80,132 60,126 Q 35,118 -5,132 Z";
const FILL_C_SHALLOW =
  "M -5,300 L 205,300 L 205,132 Q 165,118 140,126 Q 118,131 110,150 Q 100,170 90,150 Q 82,131 60,126 Q 35,118 -5,132 Z";
const FILL_C_DEEP =
  "M -5,300 L 205,300 L 205,132 Q 165,118 140,125 Q 120,128 115,165 Q 100,240 85,165 Q 80,128 60,125 Q 35,118 -5,132 Z";

// Stroke paths (membrane line)
const MEMBRANE_FLAT =
  "M 205,132 Q 165,118 140,126 Q 120,132 108,131 Q 100,130 92,131 Q 80,132 60,126 Q 35,118 -5,132";
const MEMBRANE_C_SHALLOW =
  "M 205,132 Q 165,118 140,126 Q 118,131 110,150 Q 100,170 90,150 Q 82,131 60,126 Q 35,118 -5,132";
const MEMBRANE_C_DEEP =
  "M 205,132 Q 165,118 140,125 Q 120,128 115,165 Q 100,240 85,165 Q 80,128 60,125 Q 35,118 -5,132";

// Inner membrane echo (offset ~8 units inside)
const INNER_FLAT =
  "M 205,140 Q 165,126 140,134 Q 120,140 108,139 Q 100,138 92,139 Q 80,140 60,134 Q 35,126 -5,140";
const INNER_C_SHALLOW =
  "M 205,140 Q 165,126 140,134 Q 118,139 110,158 Q 100,178 90,158 Q 82,139 60,134 Q 35,126 -5,140";
const INNER_C_DEEP =
  "M 205,140 Q 165,126 140,133 Q 120,136 115,173 Q 100,248 85,173 Q 80,136 60,133 Q 35,126 -5,140";

const VESICLE_CIRC = 119; // 2*PI*19

// Gold that passes as TEXT on warm cream (WCAG). Bright gold is fills/decoration only.
const GOLD_TEXT = "#8A6D2E";

interface Scene1Props {
  forcePhase?: number;
}

export const Scene1_Challenge = ({ forcePhase }: Scene1Props = {}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reduced = usePrefersReducedMotion();

  const [phase, setPhase] = useState(forcePhase ?? (reduced ? REDUCED_PHASE : 0));

  // Infinite loops become one-shot settles when motion is reduced.
  const loop = reduced ? 0 : Infinity;

  useEffect(() => {
    // Explicit phase (test harness / step-driven) always wins — sync to the prop.
    if (forcePhase !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- controlled-prop sync
      setPhase(forcePhase);
      return;
    }
    // Reduced motion → initial state is already REDUCED_PHASE; just never cycle.
    if (reduced) return;
    // Only advance the cycle while the figure is actually on screen.
    if (!inView) return;
    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % TOTAL_PHASES);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(timer);
  }, [phase, forcePhase, reduced, inView]);

  // Membrane path states based on phase
  // Phase 3+: membrane morphs from C_DEEP directly to FLAT
  // — the C's open ends close together, forming a vesicle below
  const fillD =
    phase === 0 ? FILL_FLAT :
    phase === 1 ? FILL_C_SHALLOW :
    phase === 2 ? FILL_C_DEEP :
    FILL_FLAT;

  const membraneD =
    phase === 0 ? MEMBRANE_FLAT :
    phase === 1 ? MEMBRANE_C_SHALLOW :
    phase === 2 ? MEMBRANE_C_DEEP :
    MEMBRANE_FLAT;

  const innerD =
    phase === 0 ? INNER_FLAT :
    phase === 1 ? INNER_C_SHALLOW :
    phase === 2 ? INNER_C_DEEP :
    INNER_FLAT;

  return (
    <div
      ref={rootRef}
      className="w-full h-full relative flex flex-col overflow-hidden rounded-xl border border-plum-dark/10 shadow-sm bg-bone-raised"
    >
      {/* Warm luminous wash — one confident accent from the top edge */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -12%, rgba(201,169,97,0.12), transparent 60%)",
        }}
      />

      {/* Dot-grid — warm gold hairline dots */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A961 0.6px, transparent 0.6px)",
          backgroundSize: "13px 13px",
        }}
      />

      {/* Title bar */}
      <div
        className="reveal-rise relative z-30 flex items-center gap-2 px-5 pt-4 pb-2"
        style={{ animationDelay: "0.08s" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
        <h3 className="font-bold text-plum-dark uppercase tracking-widest text-xs">
          The Discovery
        </h3>
      </div>

      {/* ============ MAIN SPLIT VIEW ============ */}
      <div className="flex-1 relative flex min-h-0">

        {/* ========== NORMAL TISSUE (LEFT) ========== */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: MECHANISM_COLORS.normalTissue,
            }}
          />

          {/* Label */}
          <div
            className="reveal-rise absolute top-3 left-3 z-20"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2 bg-bone-raised/85 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-plum-dark/10">
              <div className="w-2 h-2 rounded-full bg-clinical-teal" />
              <div>
                <h3 className="font-bold text-plum-dark text-[11px] tracking-wide font-sans leading-tight">
                  Normal Tissue
                </h3>
                <p className="text-[8px] text-plum-primary/60 font-bold tracking-widest font-mono">pH 7.4</p>
              </div>
            </div>
          </div>

          {/* Tissue mass — sealed, gentle wavy membrane */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none">
            <path
              d="M -5,300 L 205,300 L 205,140 Q 165,120 140,128 Q 120,135 108,133 Q 100,131 92,133 Q 80,135 60,128 Q 35,120 -5,135 Z"
              fill={MECHANISM_COLORS.normalTissue}
              opacity="0.85"
            />
            <path
              d="M 205,140 Q 165,120 140,128 Q 120,135 108,133 Q 100,131 92,133 Q 80,135 60,128 Q 35,120 -5,135"
              fill="none"
              stroke={MECHANISM_COLORS.cellMembrane}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M 205,148 Q 165,128 140,136 Q 120,143 108,141 Q 100,139 92,141 Q 80,143 60,136 Q 35,128 -5,143"
              fill="none"
              stroke={MECHANISM_COLORS.cellMembraneLight}
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>

          {/* Drifting peptides — above the membrane */}
          {[
            { top: "12%", left: "22%", dur: 7 },
            { top: "18%", left: "62%", dur: 8 },
          ].map((p, i) => (
            <motion.div
              key={`drift-n-${i}`}
              className="absolute w-6 h-6"
              style={{ top: p.top, left: p.left, opacity: 0.7 }}
              animate={{
                x: [0, 6 * (i % 2 ? 1 : -1), -4, 0],
                y: [0, -3, 2, 0],
              }}
              transition={{
                x: { duration: p.dur, repeat: loop, ease: "easeInOut" },
                y: { duration: p.dur * 0.9, repeat: loop, ease: "easeInOut" },
              }}
            >
              <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
            </motion.div>
          ))}

          {/* Rejection peptide — approaches membrane & bounces */}
          <motion.div
            className="absolute w-7 h-7 z-10"
            animate={{
              top: phase <= 1 ? "15%" : phase === 2 ? "34%" : phase === 3 ? "10%" : "8%",
              left: "44%",
              rotate: phase === 3 ? 45 : 0,
              scale: phase === 3 ? 0.85 : 1,
            }}
            transition={{
              duration: phase === 3 ? 0.6 : 1.2,
              ease: phase === 3 ? "easeOut" : "easeInOut",
            }}
          >
            <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
          </motion.div>

          {/* Rejection X — Phase 3 (at membrane surface) */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ top: "38%", left: "47%" }}
            animate={{
              opacity: phase === 3 ? [0, 1, 1, 0] : 0,
              scale: phase === 3 ? [0.5, 1.3, 1.1, 0.5] : 0.5,
            }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.25, 0.6, 1] }}
          >
            <div className="w-7 h-7 rounded-full bg-red-100/90 flex items-center justify-center shadow-sm">
              <span className="text-[11px] font-black text-red-400">&times;</span>
            </div>
          </motion.div>

          {/* "No uptake" label — Phase 3+ */}
          <motion.div
            className="absolute z-20 text-center"
            style={{ top: "24%", left: "20%", width: "60%" }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
            transition={{ duration: 0.5, delay: phase === 3 ? 0.4 : 0 }}
          >
            <span className="text-[8px] font-bold uppercase tracking-widest text-plum-primary/70 bg-bone-raised/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
              No uptake
            </span>
          </motion.div>
        </div>

        {/* ============ DIVIDER ============ */}
        <div className="w-[2px] h-full bg-plum-dark z-30" />

        {/* ========== LESION TISSUE (RIGHT) ========== */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: MECHANISM_COLORS.lesionTissue,
            }}
          />

          {/* Acidic tint — static warm ground */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(194,85,63,0.03) 0%, rgba(194,85,63,0.05) 30%, transparent 60%)" }}
          />

          {/* Label */}
          <div
            className="reveal-rise absolute top-3 left-3 z-20"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2 bg-bone-raised/85 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-plum-dark/10">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: MECHANISM_COLORS.phRed }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  scale: { duration: 1.5, repeat: loop, ease: "easeInOut" },
                }}
              />
              <div>
                <h3 className="font-bold text-plum-dark text-[11px] tracking-wide font-sans leading-tight">Lesion Tissue</h3>
                <p
                  className="text-[8px] font-bold tracking-widest font-mono"
                  style={{ color: MECHANISM_COLORS.phRed }}
                >
                  pH 6.0&ndash;6.5
                </p>
              </div>
            </div>
          </div>

          {/* Tissue mass — animated C-pocket membrane */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none">
            {/* Fill */}
            <motion.path
              fill={MECHANISM_COLORS.lesionTissue}
              opacity="0.85"
              animate={{ d: fillD }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Outer membrane */}
            <motion.path
              fill="none"
              stroke={MECHANISM_COLORS.cellMembrane}
              strokeWidth="1.4"
              strokeLinecap="round"
              animate={{ d: membraneD }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Inner membrane echo */}
            <motion.path
              fill="none"
              stroke={MECHANISM_COLORS.cellMembraneLight}
              strokeWidth="1"
              opacity="0.3"
              strokeLinecap="round"
              animate={{ d: innerD }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* C-pocket glow — phases 1-2 */}
            <motion.ellipse
              cx="100" cy="185"
              rx="18" ry="35"
              fill={MECHANISM_COLORS.calloutGold}
              animate={{ opacity: phase === 2 ? 0.3 : phase === 1 ? 0.12 : 0 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* H+ ions — always present in acidic tissue
              Ions 1 & 3 (nearest peptide) dim during Phase 2+ to show proton transfer */}
          {[
            { top: "10%", left: "15%", delay: 0, nearPeptide: false },
            { top: "6%", left: "50%", delay: 0.2, nearPeptide: true },
            { top: "20%", left: "70%", delay: 0.35, nearPeptide: false },
            { top: "16%", left: "35%", delay: 0.15, nearPeptide: true },
          ].map((h, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute z-10"
              style={{ top: h.top, left: h.left }}
              animate={{
                opacity: h.nearPeptide && phase >= 2 ? 0.15 : [0.5, 0.85, 0.5],
                y: h.nearPeptide && phase >= 2 ? 0 : [0, -2, 0],
                scale: h.nearPeptide && phase === 1 ? [1, 1.3, 0.8] : 1,
              }}
              transition={{
                opacity: h.nearPeptide && phase >= 2
                  ? { duration: 0.6 }
                  : { duration: 2.5 + i * 0.3, repeat: loop, ease: "easeInOut", delay: h.delay },
                y: h.nearPeptide && phase >= 2
                  ? { duration: 0.4 }
                  : { duration: 2.5 + i * 0.3, repeat: loop, ease: "easeInOut", delay: h.delay },
                scale: { duration: 0.8 },
              }}
            >
              <span className="text-[10px] font-bold font-sans" style={{ color: MECHANISM_COLORS.phRed }}>H&#x207A;</span>
            </motion.div>
          ))}

          {/* === PEPTIDE LIFECYCLE ===
              Phase 0: neutral peptide drifts above flat membrane
              Phase 1: protonation flash → active peptide approaches → C forms
              Phase 2: peptide enters deep C-pocket (fully wrapped)
              Phase 3: hidden inside closing vesicle
              Phase 4: hidden inside transporting vesicle
              Phase 5: released at target after vesicle scatters */}

          {/* Neutral peptide — Phase 0 only */}
          <motion.div
            className="absolute w-7 h-7 z-20"
            style={{ top: "18%", left: "42%" }}
            animate={{
              opacity: phase === 0 ? 0.9 : 0,
              x: [0, 3, -2, 0],
              y: [0, -2, 1, 0],
            }}
            transition={{
              opacity: { duration: 0.3 },
              x: { duration: 5, repeat: loop, ease: "easeInOut" },
              y: { duration: 4.5, repeat: loop, ease: "easeInOut" },
            }}
          >
            <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
          </motion.div>

          {/* Protonation flash — Phase 1 */}
          <motion.div
            className="absolute w-16 h-16 rounded-full pointer-events-none z-[15]"
            style={{
              top: "16%",
              left: "35%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${MECHANISM_COLORS.calloutGold}60 0%, transparent 70%)`,
            }}
            animate={{
              scale: phase === 1 ? [0, 2, 0] : 0,
              opacity: phase === 1 ? [0, 0.8, 0] : 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Active peptide — Phase 1: approaches; Phase 2: inside deep C-pocket */}
          <motion.div
            className="absolute w-8 h-7 z-20"
            animate={{
              opacity:
                phase === 1 ? 1 :
                phase === 2 ? 1 :
                0, // Phase 3+: hidden inside vesicle
              top:
                phase === 1 ? "28%" :
                phase === 2 ? "58%" :
                "58%",
              left:
                phase === 1 ? "40%" :
                phase === 2 ? "45%" :
                "45%",
              scale: phase === 1 ? [0.7, 1.15, 1] : 1,
            }}
            transition={{
              opacity: { duration: 0.4 },
              top: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
              left: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 0.6 },
            }}
          >
            <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
          </motion.div>

          {/* Entry arrow — Phase 2 (peptide entering wider C-pocket) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <marker id="arrow-s1" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={MECHANISM_COLORS.calloutGold} />
              </marker>
            </defs>
            <motion.path
              d="M 95,75 Q 98,115 100,165 Q 102,200 105,230"
              fill="none"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-s1)"
              animate={{
                pathLength: phase === 2 ? 1 : 0,
                opacity: phase === 2 ? 0.6 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut", delay: phase === 2 ? 0.2 : 0 }}
            />
          </svg>

          {/* "Selective uptake" label — Phase 3+ (mirrors normal side's "No uptake") */}
          <motion.div
            className="absolute z-20 text-center"
            style={{ top: "24%", left: "15%", width: "70%" }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
            transition={{ duration: 0.5, delay: phase === 3 ? 0.6 : 0 }}
          >
            <span
              className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md backdrop-blur-sm"
              style={{ color: GOLD_TEXT, backgroundColor: "rgba(250,246,236,0.8)" }}
            >
              Selective uptake
            </span>
          </motion.div>

          {/* ======= VESICLE (C-pocket closes its open ends into O) =======
              Phase 3: C closes → vesicle circle forms at pocket location
              Phase 4: detached vesicle travels to target
              Phase 5: scatters open, releases peptide */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ zIndex: 19, left: "50%" }}
            animate={{
              top:
                phase === 3 ? "58%" :
                phase === 4 ? "72%" :
                phase === 5 ? "74%" :
                "58%",
              opacity: phase >= 3 ? 1 : 0,
            }}
            transition={{
              top: {
                duration: phase === 4 ? 1.5 : 0.6,
                ease: [0.4, 0, 0.2, 1],
                delay: phase === 4 ? 0.3 : 0,
              },
              opacity: { duration: 0.8, delay: phase === 3 ? 0.2 : 0 },
            }}
          >
            <motion.div
              style={{ transform: "translate(-50%, -50%)" }}
              className="relative"
              animate={{
                scale: phase === 3 ? [0.3, 1.1, 1] : phase >= 4 ? 1 : 0.3,
              }}
              transition={{
                scale: { duration: 0.8, ease: "easeOut", delay: phase === 3 ? 0.1 : 0 },
              }}
            >
              <svg width="54" height="54" viewBox="0 0 54 54">
                {/* Vesicle interior fill */}
                <motion.circle
                  cx="27" cy="27" r="19"
                  fill={`${MECHANISM_COLORS.calloutGold}18`}
                  animate={{
                    opacity:
                      phase === 5 ? [1, 1, 0] :
                      phase >= 3 ? 1 : 0,
                  }}
                  transition={{
                    duration: phase === 5 ? 1.2 : 0.5,
                    delay: phase === 5 ? 2.0 : 0,
                    times: phase === 5 ? [0, 0.3, 1] : undefined,
                  }}
                />
                {/* Vesicle membrane — full circle that breaks apart in Phase 5 */}
                <motion.circle
                  cx="27" cy="27" r="19"
                  fill="none"
                  stroke={MECHANISM_COLORS.cellMembrane}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{
                    strokeDasharray:
                      phase === 5
                        ? [`${VESICLE_CIRC} 0`, `${VESICLE_CIRC} 0`, "18 101"]
                        : `${VESICLE_CIRC} 0`,
                    opacity:
                      phase === 5 ? [1, 1, 0] :
                      phase >= 3 ? 1 : 0,
                  }}
                  transition={{
                    strokeDasharray: {
                      duration: 1.5,
                      delay: phase === 5 ? 1.8 : 0,
                      times: [0, 0.4, 1],
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 1.0,
                      delay: phase === 5 ? 2.2 : 0,
                      times: phase === 5 ? [0, 0.3, 1] : undefined,
                    },
                  }}
                />
                {/* Outer membrane echo */}
                <motion.circle
                  cx="27" cy="27" r="22"
                  fill="none"
                  stroke={MECHANISM_COLORS.cellMembraneLight}
                  strokeWidth="1"
                  strokeLinecap="round"
                  animate={{
                    opacity:
                      phase === 5 ? [0.25, 0.25, 0] :
                      phase >= 3 ? 0.25 : 0,
                  }}
                  transition={{
                    duration: phase === 5 ? 1.0 : 0.5,
                    delay: phase === 5 ? 2.3 : 0,
                    times: phase === 5 ? [0, 0.3, 1] : undefined,
                  }}
                />
              </svg>
              {/* Peptide inside vesicle — keeps wavy shape with H+ */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-6"
                animate={{
                  opacity:
                    phase === 3 ? 1 :
                    phase === 4 ? 1 :
                    phase === 5 ? [1, 1, 0] :
                    0,
                }}
                transition={{
                  duration: phase === 5 ? 1.2 : 0.3,
                  delay: phase === 5 ? 2.0 : (phase === 3 ? 0.3 : 0),
                  times: phase === 5 ? [0, 0.3, 1] : undefined,
                }}
              >
                <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Transport path — Phase 4 dashed line from vesicle to target */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <marker id="arrow-transport" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
                <polygon points="0 0, 5 2, 0 4" fill={MECHANISM_COLORS.calloutGold} />
              </marker>
            </defs>
            <motion.line
              x1="100" y1="200"
              x2="100" y2="240"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              markerEnd="url(#arrow-transport)"
              animate={{
                opacity: phase === 4 ? [0, 0.5, 0.5, 0] : 0,
              }}
              transition={{
                duration: 2.0,
                times: [0, 0.2, 0.7, 1],
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* ======= SCATTER PARTICLES — Phase 5 =======
              Vesicle membrane fragments burst outward when opening at target */}
          {[
            { angle: 0, dist: 36 },
            { angle: 45, dist: 30 },
            { angle: 90, dist: 38 },
            { angle: 135, dist: 28 },
            { angle: 180, dist: 34 },
            { angle: 225, dist: 36 },
            { angle: 270, dist: 26 },
            { angle: 315, dist: 32 },
          ].map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const dx = Math.cos(rad) * p.dist;
            const dy = Math.sin(rad) * p.dist;
            return (
              <motion.div
                key={`scatter-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "74%",
                  left: "50%",
                  width: i % 2 === 0 ? 5 : 4,
                  height: i % 2 === 0 ? 5 : 4,
                  backgroundColor: MECHANISM_COLORS.cellMembrane,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  x: phase === 5 ? [0, 0, dx, dx * 1.4] : 0,
                  y: phase === 5 ? [0, 0, dy, dy * 1.4] : 0,
                  opacity: phase === 5 ? [0, 0, 0.9, 0] : 0,
                  scale: phase === 5 ? [0, 0, 1.3, 0.2] : 0,
                }}
                transition={{
                  duration: 3.2,
                  delay: phase === 5 ? 0.3 + i * 0.04 : 0,
                  times: [0, 0.56, 0.72, 1],
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Released peptide — appears after vesicle scatters, binds to target */}
          <motion.div
            className="absolute w-8 h-7 z-20"
            style={{ top: "76%", left: "46%" }}
            animate={{
              opacity: phase === 5 ? [0, 0, 0, 1] : 0,
              scale: phase === 5 ? [0.3, 0.3, 0.3, 1.05] : 0.3,
            }}
            transition={{
              duration: 3.2,
              delay: phase === 5 ? 0.3 : 0,
              times: [0, 0.56, 0.68, 0.85],
              ease: "easeOut",
            }}
          >
            <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
          </motion.div>

          {/* Intracellular target — deep in tissue */}
          <motion.div
            className="absolute z-20"
            style={{ top: "78%", left: "44%", width: "48px", height: "48px" }}
            animate={{
              scale: phase === 5 ? [1, 1, 1.2, 1.1] : phase >= 3 ? 0.95 : 0.85,
              opacity: phase >= 2 ? (phase === 5 ? 1 : 0.55) : 0.3,
            }}
            transition={{
              scale: { duration: 3.2, delay: phase === 5 ? 0.3 : 0, times: [0, 0.6, 0.82, 1] },
              opacity: { duration: 0.5 },
            }}
          >
            <IntracellularTarget color={MECHANISM_COLORS.intracellularTarget} />
            {/* Binding pulse ring — Phase 5 */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid ${MECHANISM_COLORS.calloutGold}`,
              }}
              animate={{
                scale: phase === 5 ? [1, 1, 1.6, 1.8] : 1,
                opacity: phase === 5 ? [0, 0, 0.7, 0] : 0,
              }}
              transition={{
                duration: 3.2,
                delay: phase === 5 ? 0.3 : 0,
                times: [0, 0.6, 0.82, 1],
                ease: "easeOut",
              }}
            />
            {/* Intracellular target label */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              animate={{ opacity: phase >= 3 ? 0.7 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[7px] font-bold uppercase tracking-widest text-plum-primary/70">
                Intracellular target
              </span>
            </motion.div>
          </motion.div>

          {/* Target glow — Phase 5 after vesicle opens */}
          <motion.div
            className="absolute w-20 h-20 rounded-full pointer-events-none"
            style={{
              top: "76%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${MECHANISM_COLORS.calloutGold}80 0%, ${MECHANISM_COLORS.calloutGold}30 40%, transparent 70%)`,
              filter: "blur(8px)",
            }}
            animate={{
              scale: phase === 5 ? [0, 0, 3, 2.2] : 0,
              opacity: phase === 5 ? [0, 0, 1, 0.5] : 0,
            }}
            transition={{
              duration: 3.2,
              delay: phase === 5 ? 0.3 : 0,
              times: [0, 0.6, 0.82, 1],
              ease: "easeOut",
            }}
          />

          {/* Burst ring — Phase 5 scatter pulse */}
          <motion.div
            className="absolute rounded-full pointer-events-none border-2"
            style={{
              top: "74%",
              left: "50%",
              borderColor: `${MECHANISM_COLORS.calloutGold}A0`,
              width: "32px",
              height: "32px",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: phase === 5 ? [0, 0, 1, 3.5] : 0,
              opacity: phase === 5 ? [0, 0, 0.9, 0] : 0,
            }}
            transition={{
              duration: 3.2,
              delay: phase === 5 ? 0.3 : 0,
              times: [0, 0.56, 0.68, 1],
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      {/* ============ BOTTOM LEGEND ============ */}
      <div
        className="reveal-rise relative mx-3 mb-3 mt-2 px-4 py-3 rounded-xl bg-bone/80 backdrop-blur-sm border border-plum-dark/10"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex-1 h-1 bg-plum-dark/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: MECHANISM_COLORS.calloutGold }}
              animate={{ width: `${((phase + 1) / TOTAL_PHASES) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: TOTAL_PHASES }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor: i <= phase ? MECHANISM_COLORS.calloutGold : "#D8CFBE",
                  scale: phase === i ? 1.4 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            <motion.div className="w-8 h-8" animate={{ scale: phase <= 0 ? 1 : 0.85, opacity: phase <= 0 ? 1 : 0.4 }}>
              <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
            </motion.div>
            <motion.span className="text-[9px] font-bold uppercase tracking-wider" animate={{ color: phase <= 0 ? "#4A3F5C" : "#A8A299" }}>
              Inactive
            </motion.span>
          </div>
          <svg className="w-5 h-3 flex-shrink-0" viewBox="0 0 20 12">
            <motion.path
              d="M 2,6 L 14,6 M 11,3 L 15,6 L 11,9"
              fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ stroke: phase === 1 ? MECHANISM_COLORS.calloutGold : "#B8B0A2" }}
            />
          </svg>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-10 h-8" animate={{ scale: phase >= 1 ? 1.05 : 0.85, opacity: phase >= 1 ? 1 : 0.35 }}>
              <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
            </motion.div>
            <motion.span className="text-[9px] font-bold uppercase tracking-wider" animate={{ color: phase >= 1 ? "#4A3F5C" : "#A8A299" }}>
              Activated
            </motion.span>
          </div>
          <div className="w-px h-5 bg-plum-dark/15 mx-1" />
          <motion.span
            className="text-[9px] font-bold uppercase tracking-widest text-plum-primary/70"
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["Peptide drift", "Protonation", "Cell entry", "Vesicle forming", "Transport", "Target binding"][phase]}
          </motion.span>
        </div>
      </div>
    </div>
  );
};
