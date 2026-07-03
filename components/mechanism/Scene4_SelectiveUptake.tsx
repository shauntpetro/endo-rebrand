"use client";

import { motion } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { PeptideRing, PeptideRingProtonated, IntracellularTarget } from "./Shapes";
import { useState, useEffect } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ====================================================================
   Scene 4 — "Selective Uptake"

   Normal tissue (left): sealed horizontal membrane, peptides bounce off.
   Lesion tissue (right) — 5-phase endocytosis cycle:
     Phase 0: Peptide drifts above FLAT membrane
     Phase 1: Peptide approaches; membrane forms shallow C-pocket
     Phase 2: Peptide enters deep C-pocket
     Phase 3: C-pocket closes → vesicle forms, membrane seals
     Phase 4: Vesicle transports to intracellular target & releases
   ==================================================================== */

const PHASE_DURATIONS = [2500, 2500, 2500, 2000, 3500];
const TOTAL_PHASES = 5;

/* ------------------------------------------------------------------ */
/*  Lesion membrane SVG paths — viewBox: 0 0 200 300                  */
/*  Membrane sits around y ≈ 130                                      */
/* ------------------------------------------------------------------ */

// Fill paths (tissue mass below membrane)
const FILL_FLAT =
  "M -5,300 L 205,300 L 205,130 Q 165,118 140,125 Q 120,130 108,129 Q 100,128 92,129 Q 80,130 60,125 Q 35,118 -5,130 Z";
const FILL_C_SHALLOW =
  "M -5,300 L 205,300 L 205,130 Q 165,118 140,125 Q 118,129 110,148 Q 100,168 90,148 Q 82,129 60,125 Q 35,118 -5,130 Z";
const FILL_C_DEEP =
  "M -5,300 L 205,300 L 205,130 Q 165,118 140,124 Q 120,127 115,162 Q 100,235 85,162 Q 80,127 60,124 Q 35,118 -5,130 Z";

// Stroke paths (membrane line)
const MEMBRANE_FLAT =
  "M 205,130 Q 165,118 140,125 Q 120,130 108,129 Q 100,128 92,129 Q 80,130 60,125 Q 35,118 -5,130";
const MEMBRANE_C_SHALLOW =
  "M 205,130 Q 165,118 140,125 Q 118,129 110,148 Q 100,168 90,148 Q 82,129 60,125 Q 35,118 -5,130";
const MEMBRANE_C_DEEP =
  "M 205,130 Q 165,118 140,124 Q 120,127 115,162 Q 100,235 85,162 Q 80,127 60,124 Q 35,118 -5,130";

// Inner membrane echo
const INNER_FLAT =
  "M 205,138 Q 165,126 140,133 Q 120,138 108,137 Q 100,136 92,137 Q 80,138 60,133 Q 35,126 -5,138";
const INNER_C_SHALLOW =
  "M 205,138 Q 165,126 140,133 Q 118,137 110,156 Q 100,176 90,156 Q 82,137 60,133 Q 35,126 -5,138";
const INNER_C_DEEP =
  "M 205,138 Q 165,126 140,132 Q 120,135 115,170 Q 100,243 85,170 Q 80,135 60,132 Q 35,126 -5,138";

const VESICLE_CIRC = 119; // 2*PI*19

export const Scene4_SelectiveUptake = () => {
  const reduced = usePrefersReducedMotion();
  const { setRef: setVisRef, isVisible } = useVisibility();
  // Motion runs only when the figure is on-screen AND motion is allowed.
  const animate = isVisible && !reduced;

  // Reduced motion: start (and stay) on the final phase (target binding) so the
  // full mechanism reads as a complete static end-state.
  const [phase, setPhase] = useState(reduced ? TOTAL_PHASES - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    // Only advance the endocytosis cycle while the figure is in view.
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % TOTAL_PHASES);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(timer);
  }, [phase, reduced, isVisible]);

  // Membrane path states
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
    <motion.div
      ref={(node) => setVisRef(node)}
      className="w-full h-full relative flex flex-col overflow-hidden rounded-xl border border-plum-dark/10 bg-bone-raised shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_34px_-16px_rgba(74,63,92,0.22)]"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Title bar */}
      <motion.div
        className="relative z-30 flex items-center gap-2 px-5 pt-4 pb-2"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary shadow-gold-glow-sm" />
        <h3 className="font-bold text-plum-dark uppercase tracking-widest text-xs">
          Selective Uptake
        </h3>
      </motion.div>

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
          <motion.div
            className="absolute top-3 left-3 z-20"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-stone-200/60">
              <div className="w-2 h-2 rounded-full bg-clinical-teal" />
              <div>
                <h3 className="font-bold text-plum-dark text-[11px] tracking-wide font-sans leading-tight">
                  Normal Tissue
                </h3>
                <p className="text-[8px] text-stone-400 font-bold tracking-widest font-mono">pH 7.4</p>
              </div>
            </div>
          </motion.div>

          {/* Sealed horizontal membrane */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none">
            <path
              d="M -5,300 L 205,300 L 205,138 Q 165,120 140,128 Q 120,135 108,133 Q 100,131 92,133 Q 80,135 60,128 Q 35,120 -5,135 Z"
              fill={MECHANISM_COLORS.normalTissue}
              opacity="0.85"
            />
            <path
              d="M 205,138 Q 165,120 140,128 Q 120,135 108,133 Q 100,131 92,133 Q 80,135 60,128 Q 35,120 -5,135"
              fill="none"
              stroke={MECHANISM_COLORS.cellMembrane}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M 205,146 Q 165,128 140,136 Q 120,143 108,141 Q 100,139 92,141 Q 80,143 60,136 Q 35,128 -5,143"
              fill="none"
              stroke={MECHANISM_COLORS.cellMembraneLight}
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>

          {/* Drifting peptides above membrane */}
          {[
            { top: "12%", left: "22%", dur: 7 },
            { top: "18%", left: "62%", dur: 8 },
            { top: "26%", left: "40%", dur: 6.5 },
          ].map((p, i) => (
            <motion.div
              key={`drift-n-${i}`}
              className="absolute w-6 h-6"
              style={{ top: p.top, left: p.left }}
              animate={
                animate
                  ? { opacity: 0.7, x: [0, 6 * (i % 2 ? 1 : -1), -4, 0], y: [0, -3, 2, 0] }
                  : { opacity: 0.7, x: 0, y: 0 }
              }
              transition={
                animate
                  ? {
                      opacity: { duration: 0.6, delay: 0.3 },
                      x: { duration: p.dur, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: p.dur * 0.9, repeat: Infinity, ease: "easeInOut" },
                    }
                  : { duration: 0 }
              }
            >
              <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
            </motion.div>
          ))}

          {/* Rejection peptide — approaches membrane & bounces */}
          <motion.div
            className="absolute w-7 h-7 z-10"
            animate={{
              top: phase <= 1 ? "15%" : phase === 2 ? "32%" : "10%",
              left: "44%",
              rotate: phase >= 3 ? 45 : 0,
              scale: phase >= 3 ? 0.85 : 1,
            }}
            transition={{
              duration: phase >= 3 ? 0.6 : 1.2,
              ease: phase >= 3 ? "easeOut" : "easeInOut",
            }}
          >
            <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
          </motion.div>

          {/* Rejection X */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ top: "36%", left: "47%" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: phase >= 2 && phase <= 3 ? [0, 1, 1, 0] : 0,
              scale: phase >= 2 && phase <= 3 ? [0.5, 1.3, 1.1, 0.5] : 0.5,
            }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.25, 0.6, 1] }}
          >
            <div className="w-7 h-7 rounded-full bg-red-100/90 flex items-center justify-center shadow-sm">
              <span className="text-[11px] font-black text-red-400">&times;</span>
            </div>
          </motion.div>

          {/* "Passive exclusion" label */}
          <motion.div
            className="absolute z-20 text-center"
            style={{ top: "22%", left: "20%", width: "60%" }}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
            transition={{ duration: 0.5, delay: phase === 3 ? 0.4 : 0 }}
          >
            <span className="text-[8px] font-bold uppercase tracking-widest text-stone-500 bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
              Passive exclusion
            </span>
          </motion.div>
        </div>

        {/* ============ DIVIDER ============ */}
        <div className="w-[2px] h-full bg-stone-900 z-30" />

        {/* ========== LESION TISSUE (RIGHT) ========== */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: MECHANISM_COLORS.lesionTissue,
            }}
          />

          {/* Acidic microenvironment tint */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(194,85,63,0.03) 0%, rgba(194,85,63,0.05) 30%, transparent 60%)" }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Label */}
          <motion.div
            className="absolute top-3 left-3 z-20"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-stone-200/60">
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={
                  animate
                    ? { backgroundColor: MECHANISM_COLORS.phRed, scale: [1, 1.3, 1] }
                    : { backgroundColor: MECHANISM_COLORS.phRed, scale: 1 }
                }
                transition={
                  animate
                    ? { scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
                    : { duration: 0 }
                }
              />
              <div>
                <h3 className="font-bold text-plum-dark text-[11px] tracking-wide font-sans leading-tight">Lesion Tissue</h3>
                <motion.p
                  className="text-[8px] font-bold tracking-widest font-mono"
                  style={{ color: MECHANISM_COLORS.phRed }}
                >
                  pH 6.0&ndash;6.5
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Animated C-pocket membrane */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none">
            {/* Fill */}
            <motion.path
              fill={MECHANISM_COLORS.lesionTissue}
              opacity="0.85"
              animate={{ d: fillD }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Outer membrane */}
            <motion.path
              fill="none"
              stroke={MECHANISM_COLORS.cellMembrane}
              strokeWidth="1.4"
              strokeLinecap="round"
              animate={{ d: membraneD }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Inner membrane echo */}
            <motion.path
              fill="none"
              stroke={MECHANISM_COLORS.cellMembraneLight}
              strokeWidth="1"
              opacity="0.3"
              strokeLinecap="round"
              animate={{ d: innerD }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* C-pocket glow — phases 1-2 */}
            <motion.ellipse
              cx="100" cy="180"
              rx="18" ry="35"
              fill={MECHANISM_COLORS.calloutGold}
              animate={{ opacity: phase === 2 ? 0.3 : phase === 1 ? 0.12 : 0 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* H+ ions — acidic environment indicator */}
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
              animate={
                animate
                  ? {
                      opacity: h.nearPeptide && phase >= 1 ? 0.15 : [0.5, 0.85, 0.5],
                      y: h.nearPeptide && phase >= 1 ? 0 : [0, -2, 0],
                      scale: h.nearPeptide && phase === 1 ? [1, 1.3, 0.8] : 1,
                    }
                  : {
                      opacity: h.nearPeptide && phase >= 1 ? 0.15 : 0.7,
                      y: 0,
                      scale: 1,
                    }
              }
              transition={
                animate
                  ? {
                      opacity: h.nearPeptide && phase >= 1
                        ? { duration: 0.6 }
                        : { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: h.delay },
                      y: h.nearPeptide && phase >= 1
                        ? { duration: 0.4 }
                        : { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: h.delay },
                      scale: { duration: 0.8 },
                    }
                  : { duration: 0 }
              }
            >
              <span className="text-[10px] font-bold font-sans" style={{ color: MECHANISM_COLORS.phRed }}>H&#x207A;</span>
            </motion.div>
          ))}

          {/* === PEPTIDE LIFECYCLE ===
              Phase 0: peptide drifts above flat membrane
              Phase 1: protonation → approaches → C forms
              Phase 2: enters deep C-pocket
              Phase 3: hidden in vesicle
              Phase 4: released at target */}

          {/* Neutral peptide — Phase 0 only */}
          <motion.div
            className="absolute w-7 h-7 z-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 0 ? 0.9 : 0,
              top: "18%",
              left: "42%",
              x: animate ? [0, 3, -2, 0] : 0,
              y: animate ? [0, -2, 1, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.3 },
              x: animate ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
              y: animate ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
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
              background: `radial-gradient(circle, ${MECHANISM_COLORS.calloutGold}20 0%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 1 ? [0, 2, 0] : 0,
              opacity: phase === 1 ? [0, 0.8, 0] : 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Active peptide — Phase 1: approaches; Phase 2: inside C-pocket */}
          <motion.div
            className="absolute w-8 h-7 z-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                phase === 1 ? 1 :
                phase === 2 ? 1 :
                0,
              top:
                phase === 1 ? "28%" :
                phase === 2 ? "55%" :
                "55%",
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

          {/* Entry arrow — Phase 2 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <marker id="arrow-s4" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill={MECHANISM_COLORS.calloutGold} />
              </marker>
            </defs>
            <motion.path
              d="M 95,75 Q 98,115 100,165 Q 102,200 105,225"
              fill="none"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-s4)"
              style={{ opacity: 0 }}
              animate={{
                pathLength: phase === 2 ? 1 : 0,
                opacity: phase === 2 ? 0.6 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut", delay: phase === 2 ? 0.2 : 0 }}
            />
          </svg>

          {/* "Active endocytosis" label — Phase 3+ */}
          <motion.div
            className="absolute z-20 text-center"
            style={{ top: "22%", left: "15%", width: "70%" }}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
            transition={{ duration: 0.5, delay: phase === 3 ? 0.6 : 0 }}
          >
            <span
              className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md backdrop-blur-sm"
              style={{ color: MECHANISM_COLORS.calloutGold, backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              Active endocytosis
            </span>
          </motion.div>

          {/* ======= VESICLE =======
              Phase 3: C closes → vesicle forms
              Phase 4: vesicle transports & scatters at target */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ zIndex: 19 }}
            initial={{ opacity: 0, top: "55%", left: "50%" }}
            animate={{
              top:
                phase === 3 ? "55%" :
                phase === 4 ? "72%" :
                "55%",
              left: "50%",
              opacity: phase >= 3 ? 1 : 0,
            }}
            transition={{
              top: {
                duration: phase === 4 ? 1.5 : 0.6,
                ease: [0.4, 0, 0.2, 1],
                delay: phase === 4 ? 0.3 : 0,
              },
              left: { duration: 0.6 },
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
                {/* Vesicle interior */}
                <motion.circle
                  cx="27" cy="27" r="19"
                  fill={`${MECHANISM_COLORS.calloutGold}18`}
                  animate={{
                    opacity:
                      phase === 4 ? [1, 1, 0] :
                      phase >= 3 ? 1 : 0,
                  }}
                  transition={{
                    duration: phase === 4 ? 1.5 : 0.5,
                    delay: phase === 4 ? 1.5 : 0,
                    times: phase === 4 ? [0, 0.3, 1] : undefined,
                  }}
                />
                {/* Vesicle membrane */}
                <motion.circle
                  cx="27" cy="27" r="19"
                  fill="none"
                  stroke={MECHANISM_COLORS.cellMembrane}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{
                    strokeDasharray:
                      phase === 4
                        ? [`${VESICLE_CIRC} 0`, `${VESICLE_CIRC} 0`, "18 101"]
                        : `${VESICLE_CIRC} 0`,
                    opacity:
                      phase === 4 ? [1, 1, 0] :
                      phase >= 3 ? 1 : 0,
                  }}
                  transition={{
                    strokeDasharray: {
                      duration: 2.0,
                      delay: phase === 4 ? 1.2 : 0,
                      times: [0, 0.4, 1],
                      ease: "easeOut",
                    },
                    opacity: {
                      duration: 1.0,
                      delay: phase === 4 ? 1.8 : 0,
                      times: phase === 4 ? [0, 0.3, 1] : undefined,
                    },
                  }}
                />
                {/* Outer echo */}
                <motion.circle
                  cx="27" cy="27" r="22"
                  fill="none"
                  stroke={MECHANISM_COLORS.cellMembraneLight}
                  strokeWidth="1"
                  strokeLinecap="round"
                  animate={{
                    opacity:
                      phase === 4 ? [0.25, 0.25, 0] :
                      phase >= 3 ? 0.25 : 0,
                  }}
                  transition={{
                    duration: phase === 4 ? 1.0 : 0.5,
                    delay: phase === 4 ? 1.8 : 0,
                    times: phase === 4 ? [0, 0.3, 1] : undefined,
                  }}
                />
              </svg>
              {/* Peptide inside vesicle */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-6"
                animate={{
                  opacity:
                    phase === 3 ? 1 :
                    phase === 4 ? [1, 1, 0] :
                    0,
                }}
                transition={{
                  duration: phase === 4 ? 1.5 : 0.3,
                  delay: phase === 4 ? 1.5 : (phase === 3 ? 0.3 : 0),
                  times: phase === 4 ? [0, 0.3, 1] : undefined,
                }}
              >
                <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Transport path — Phase 4 dashed line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 200 300" preserveAspectRatio="none">
            <defs>
              <marker id="arrow-transport-s4" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
                <polygon points="0 0, 5 2, 0 4" fill={MECHANISM_COLORS.calloutGold} />
              </marker>
            </defs>
            <motion.line
              x1="100" y1="195"
              x2="100" y2="235"
              stroke={MECHANISM_COLORS.calloutGold}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              markerEnd="url(#arrow-transport-s4)"
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

          {/* Scatter particles — Phase 4 */}
          {[
            { angle: 0, dist: 30 },
            { angle: 60, dist: 26 },
            { angle: 120, dist: 32 },
            { angle: 180, dist: 28 },
            { angle: 240, dist: 30 },
            { angle: 300, dist: 26 },
          ].map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const dx = Math.cos(rad) * p.dist;
            const dy = Math.sin(rad) * p.dist;
            return (
              <motion.div
                key={`scatter-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "72%",
                  left: "50%",
                  width: i % 2 === 0 ? 5 : 4,
                  height: i % 2 === 0 ? 5 : 4,
                  backgroundColor: MECHANISM_COLORS.cellMembrane,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  x: phase === 4 ? [0, 0, dx, dx * 1.4] : 0,
                  y: phase === 4 ? [0, 0, dy, dy * 1.4] : 0,
                  opacity: phase === 4 ? [0, 0, 0.9, 0] : 0,
                  scale: phase === 4 ? [0, 0, 1.3, 0.2] : 0,
                }}
                transition={{
                  duration: 3.0,
                  delay: phase === 4 ? 0.3 + i * 0.04 : 0,
                  times: [0, 0.45, 0.6, 1],
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Released peptide — appears after vesicle opens */}
          <motion.div
            className="absolute w-8 h-7 z-20"
            style={{ top: "74%", left: "46%" }}
            animate={{
              opacity: phase === 4 ? [0, 0, 0, 1] : 0,
              scale: phase === 4 ? [0.3, 0.3, 0.3, 1.05] : 0.3,
            }}
            transition={{
              duration: 3.0,
              delay: phase === 4 ? 0.3 : 0,
              times: [0, 0.45, 0.55, 0.75],
              ease: "easeOut",
            }}
          >
            <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
          </motion.div>

          {/* Intracellular target */}
          <motion.div
            className="absolute z-20"
            style={{ top: "76%", left: "44%", width: "48px", height: "48px" }}
            initial={{ scale: 0.85, opacity: 0.3 }}
            animate={{
              scale: phase === 4 ? [1, 1, 1.2, 1.1] : phase >= 3 ? 0.95 : 0.85,
              opacity: phase >= 2 ? (phase === 4 ? 1 : 0.55) : 0.3,
            }}
            transition={{
              scale: { duration: 3.0, delay: phase === 4 ? 0.3 : 0, times: [0, 0.5, 0.75, 1] },
              opacity: { duration: 0.5 },
            }}
          >
            <IntracellularTarget color={MECHANISM_COLORS.intracellularTarget} />
            {/* Binding pulse — Phase 4 */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: `2px solid ${MECHANISM_COLORS.calloutGold}` }}
              animate={{
                scale: phase === 4 ? [1, 1, 1.6, 1.8] : 1,
                opacity: phase === 4 ? [0, 0, 0.7, 0] : 0,
              }}
              transition={{
                duration: 3.0,
                delay: phase === 4 ? 0.3 : 0,
                times: [0, 0.5, 0.75, 1],
                ease: "easeOut",
              }}
            />
            {/* Intracellular target label */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              animate={{ opacity: phase >= 3 ? 0.7 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[7px] font-bold uppercase tracking-widest text-stone-500">
                Intracellular target
              </span>
            </motion.div>
          </motion.div>

          {/* Target glow — Phase 4 */}
          <motion.div
            className="absolute w-20 h-20 rounded-full pointer-events-none"
            style={{
              top: "74%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${MECHANISM_COLORS.calloutGold}25 0%, transparent 65%)`,
              filter: "blur(3px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 4 ? [0, 0, 3, 2.2] : 0,
              opacity: phase === 4 ? [0, 0, 1, 0.5] : 0,
            }}
            transition={{
              duration: 3.0,
              delay: phase === 4 ? 0.3 : 0,
              times: [0, 0.5, 0.75, 1],
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      {/* ============ BOTTOM LEGEND ============ */}
      <motion.div
        className="relative mx-3 mb-3 mt-2 px-4 py-3 rounded-xl bg-bone/70 backdrop-blur-sm border border-plum-dark/10"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
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
                  backgroundColor: i <= phase ? MECHANISM_COLORS.calloutGold : "#D1D5DB",
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
            <motion.span className="text-[9px] font-bold uppercase tracking-wider" animate={{ color: phase <= 0 ? "#57534e" : "#a8a29e" }}>
              Excluded
            </motion.span>
          </div>
          <svg className="w-5 h-3 flex-shrink-0" viewBox="0 0 20 12">
            <motion.path
              d="M 2,6 L 14,6 M 11,3 L 15,6 L 11,9"
              fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ stroke: phase >= 1 ? MECHANISM_COLORS.calloutGold : "#9CA3AF" }}
            />
          </svg>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-10 h-8" animate={{ scale: phase >= 1 ? 1.05 : 0.85, opacity: phase >= 1 ? 1 : 0.35 }}>
              <PeptideRingProtonated color={MECHANISM_COLORS.peptideActive} />
            </motion.div>
            <motion.span className="text-[9px] font-bold uppercase tracking-wider" animate={{ color: phase >= 1 ? "#57534e" : "#a8a29e" }}>
              Absorbed
            </motion.span>
          </div>
          <div className="w-px h-5 bg-stone-300 mx-1" />
          <motion.span
            className="text-[9px] font-bold uppercase tracking-widest text-stone-500"
            key={phase}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["Peptide drift", "Protonation", "Cell entry", "Vesicle forming", "Target binding"][phase]}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};
