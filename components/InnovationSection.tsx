"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useGPUDetect } from "@/hooks/useGPUDetect";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Helper for deterministic random values during SSR/Hydration
function getDeterministicRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Round to fixed precision to avoid hydration mismatch
function toFixedPercent(value: number, multiplier: number): string {
  return `${Math.round(value * multiplier * 100) / 100}%`;
}

function toFixedNumber(value: number, multiplier: number): number {
  return Math.round(value * multiplier * 100) / 100;
}

// Trimmed counts vs. the original (8 / 6) to reduce always-on infinite loops.
const INACTIVE_COUNT = 4;
const ACTIVE_COUNT = 3;

export default function InnovationSection() {
  const { setRef: setVisRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();
  const gpuTier = useGPUDetect();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Motion gating:
  // - heavy ambient drift (many looping particles) only on capable GPUs
  // - the single hero "activation" beat runs on any GPU, still frozen for reduced-motion
  const ambientMotion = isVisible && !reduced && gpuTier === "high";
  const heroMotion = isVisible && !reduced;

  return (
    <section
      ref={(el) => { (ref as React.MutableRefObject<HTMLElement | null>).current = el; setVisRef(el); }}
      className="relative overflow-hidden border-b border-plum-dark/10"
      style={{
        background:
          "radial-gradient(70% 55% at 78% 30%, rgba(201,169,97,0.14), transparent 60%), linear-gradient(180deg, #FAF6EC 0%, #F4EEE1 100%)",
      }}
    >
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Content — Swiss flush-left, statically visible with transform-only reveals */}
          <div className="flex flex-col relative z-10">
            <div className="reveal-rise mb-8" style={{ animationDelay: "0.05s" }}>
              <Eyebrow tone="plum">The Platform</Eyebrow>
            </div>

            <div className="reveal-rise mb-10" style={{ animationDelay: "0.14s" }}>
              <SectionHeading>
                Our <br/> <span className="italic text-gold-primary relative inline-block">
                  Innovation
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold-primary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </SectionHeading>
            </div>

            <div
              className="reveal-rise w-24 h-[3px] bg-gold-primary mb-12 origin-left"
              style={{ animationDelay: "0.22s" }}
            />

            <p
              className="reveal-rise text-xl md:text-2xl text-black-soft leading-relaxed mb-8 font-normal max-w-xl font-sans"
              style={{ animationDelay: "0.3s" }}
            >
              EndoCyclic Therapeutics has spent over a decade developing an innovative platform that produces cell-permeating, pH-sensitive peptides designed to act only in diseased tissue.
            </p>
            <p
              className="reveal-rise text-lg text-gray-therapeutics leading-relaxed mb-12 font-normal max-w-xl font-sans border-l-2 border-gold-primary/30 pl-6"
              style={{ animationDelay: "0.38s" }}
            >
              Built for specificity, each targeted peptide is tuned for either therapy or imaging, delivering precision without hormones, radiation, cargo agents or systemic toxicity.
            </p>

            <div className="reveal-rise" style={{ animationDelay: "0.46s" }}>
              <Link
                href="/innovation"
                className="group inline-flex items-center px-10 py-5 border border-plum-primary text-plum-primary text-sm font-bold uppercase tracking-widest hover:bg-plum-primary hover:text-white transition-all duration-300 font-sans rounded-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Read More
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Visualization — luminous figure: hairline frame, warm glow on the active peptide only */}
          <motion.div
            style={reduced ? undefined : { y }}
            className="relative aspect-square bg-bone-raised border border-plum-dark/10 rounded-xl overflow-hidden will-change-transform"
          >
             <div className="absolute inset-0 flex flex-col">
                {/* Systemic Zone (Neutral pH) — warm cream */}
                <div className="h-1/2 w-full relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FDEBD0 100%)' }}>
                   <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-500 uppercase tracking-widest z-10">Normal Tissue (pH 7.4)</div>

                   {/* Inactive peptides — hairline rings, no glow. Statically placed; drift only on capable GPUs. */}
                   {[...Array(INACTIVE_COUNT)].map((_, i) => (
                     <motion.div
                       key={`inactive-${i}`}
                       className="absolute w-3 h-3 rounded-full border border-gold-primary/40 opacity-70"
                       animate={ambientMotion ? {
                         x: [0, toFixedNumber(getDeterministicRandom(i * 10 + 3), 40) - 20, 0],
                         y: [0, toFixedNumber(getDeterministicRandom(i * 10 + 4), 40) - 20, 0],
                         rotate: [0, 360]
                       } : undefined}
                       transition={ambientMotion ? {
                         duration: Math.round((16 + getDeterministicRandom(i * 10 + 5) * 10) * 100) / 100,
                         repeat: Infinity,
                         repeatType: "mirror",
                         ease: "easeInOut"
                       } : undefined}
                       style={{
                         left: toFixedPercent(getDeterministicRandom(i * 10 + 6), 80),
                         top: toFixedPercent(getDeterministicRandom(i * 10 + 7), 80)
                       }}
                     />
                   ))}
                </div>

                {/* Membrane / Barrier Interface — gold hairline divider */}
                <div className="h-px w-full relative z-10 flex items-center justify-center bg-gold-primary/70">
                   <div className="relative bg-bone-raised px-3 py-1 rounded-full border border-gold-primary/30">
                      <span className="text-[8px] text-gold-deep font-mono uppercase tracking-widest font-bold">Activation Threshold</span>
                   </div>
                </div>

                {/* Lesion Microenvironment (Acidic pH) — warm peach */}
                <div className="h-1/2 w-full relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDE0C5 0%, #F9CFA8 100%)' }}>
                   <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-700 uppercase tracking-widest z-10">
                      Lesion Tissue (pH 6.5)<br/>
                      <span className="text-gold-deep font-bold">Active Uptake</span>
                   </div>

                   {/* Active peptides — warm glow. Static (visible + glowing) unless capable GPU drives the pulse. */}
                   {[...Array(ACTIVE_COUNT)].map((_, i) => (
                     <motion.div
                       key={`active-${i}`}
                       className="absolute w-4 h-4 rounded-full bg-gold-primary shadow-gold-glow-sm z-0"
                       animate={ambientMotion ? {
                         scale: [0.9, 1.12, 0.9],
                         opacity: [0.7, 1, 0.7],
                         x: [0, Math.round((getDeterministicRandom(i * 20 + 1) * 20 - 10) * 100) / 100, 0],
                         y: [0, Math.round((getDeterministicRandom(i * 20 + 2) * 20 - 10) * 100) / 100, 0]
                       } : undefined}
                       transition={ambientMotion ? {
                         duration: Math.round((3 + getDeterministicRandom(i * 20 + 3)) * 100) / 100,
                         repeat: Infinity,
                         ease: "easeInOut"
                       } : undefined}
                       style={{
                          top: `${Math.round((20 + getDeterministicRandom(i * 20 + 4) * 60) * 100) / 100}%`,
                          left: `${Math.round((10 + getDeterministicRandom(i * 20 + 5) * 80) * 100) / 100}%`
                       }}
                     />
                   ))}

                   {/* Subtle Grid Texture */}
                   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
                </div>

                {/* Crossing peptide — the single hero activation beat (runs on any GPU, frozen for reduced-motion) */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 z-20"
                  style={{ top: "35%" }}
                  animate={heroMotion ? { y: ["0%", "100%"] } : undefined}
                  transition={heroMotion ? {
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  } : undefined}
                >
                   <motion.div
                     className="w-4 h-4 rounded-full border border-gold-primary/60 bg-gold-primary/25"
                     animate={heroMotion ? {
                        backgroundColor: ["rgba(201,169,97,0.25)", "#C9A961"],
                        boxShadow: ["0 0 0px rgba(201,169,97,0)", "0 0 22px rgba(201,169,97,0.65)", "0 0 10px rgba(201,169,97,0.4)"],
                        scale: [1, 1.2]
                     } : undefined}
                     transition={heroMotion ? {
                        duration: 4,
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                     } : undefined}
                     style={heroMotion ? undefined : { backgroundColor: "#C9A961", boxShadow: "0 0 12px rgba(201,169,97,0.5)" }}
                   />
                </motion.div>
             </div>

             <div className="absolute bottom-0 left-0 w-full p-6 border-t border-plum-dark/10 flex justify-between items-center bg-bone-raised/80 backdrop-blur-md z-20">
               <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                 FIG 1.0 — pH-MEDIATED SELECTIVE UPTAKE
               </div>
               <div className="flex gap-2 items-center">
                 <div className="w-2 h-2 rounded-full border border-gold-primary/50" title="Inactive" />
                 <span className="text-[7px] text-stone-400 uppercase">Inactive</span>
                 <div className="w-2 h-2 rounded-full bg-gold-primary shadow-gold-glow-sm" title="Active" />
                 <span className="text-[7px] text-stone-400 uppercase">Active</span>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
