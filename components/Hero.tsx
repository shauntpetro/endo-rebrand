"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { DitherOverlay } from "./DitherOverlay";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGPUDetect } from "@/hooks/useGPUDetect";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import CanvasErrorBoundary from "@/components/CanvasErrorBoundary";

// Dynamically import Canvas to avoid SSR issues
const PeptideCanvas = dynamic(() => import("@/components/PeptideCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 opacity-60 flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-primary to-gold-light opacity-20 animate-pulse" />
    </div>
  ),
});

/** Static luminous fallback when the GPU can't drive the full canvas (low/none tier). */
const StaticHeroBackground = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-gold-primary/40 to-plum-primary/20 blur-3xl" />
    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-gold-light/35 to-clinical-teal/15 blur-2xl" />
    <div className="absolute top-1/2 right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-plum-primary/10 to-gold-primary/25 blur-3xl" />
  </div>
);

export default function Hero() {
  const gpuTier = useGPUDetect();
  const reduced = usePrefersReducedMotion();
  const { setRef: setVisRef, isVisible } = useVisibility();

  const animateAurora = isVisible && !reduced;

  return (
    <section
      ref={(node) => setVisRef(node)}
      className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 72% 38%, rgba(201,169,97,0.16), transparent 60%), linear-gradient(180deg, #FAF6EC, #F4EEE1 62%)",
      }}
    >
      {/* Aurora Gradient Layer — warm, ambient, gated on reduced motion */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-25 will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(201,169,97,0.35) 0%, rgba(74,63,92,0.15) 40%, transparent 70%)" }}
          animate={animateAurora ? { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] } : undefined}
          transition={animateAurora ? { duration: 22, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-[50vw] h-[50vw] rounded-full opacity-15 will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(74,155,142,0.2) 0%, rgba(74,63,92,0.1) 50%, transparent 70%)" }}
          animate={animateAurora ? { x: [0, -60, 30, 0], y: [0, 40, -30, 0], scale: [1, 1.1, 1.05, 1] } : undefined}
          transition={animateAurora ? { duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 } : { duration: 0 }}
        />
      </div>

      {/* 3D Background Layers */}
      <div className="absolute inset-0 h-full w-full top-0 pointer-events-none">
        {/* Full canvas only on capable GPUs — low/none tiers get the static luminous fallback */}
        <div className="absolute inset-0 lg:inset-auto lg:top-0 lg:right-0 lg:w-[70%] lg:h-full opacity-50 lg:opacity-100">
          {gpuTier === "high" ? (
            <CanvasErrorBoundary>
              <PeptideCanvas />
            </CanvasErrorBoundary>
          ) : (
            <StaticHeroBackground />
          )}
        </div>

        {/* Dither & Grain */}
        <DitherOverlay />

        {/* Warm readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#F4EEE1] via-[#F4EEE1]/80 lg:via-[#F4EEE1]/40 to-[#F4EEE1]/30 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4EEE1] via-transparent to-transparent h-32 bottom-0 pointer-events-none" />
      </div>

      {/* Content Grid — deterministic CSS reveal (SSR-safe, reduced-motion aware) */}
      <div className="container mx-auto px-6 pb-8 md:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center pt-8 md:pt-12 border-t border-plum-dark/15">
          <div className="lg:col-span-6">
            <h1
              className="reveal-rise font-serif font-bold tracking-tight text-plum-dark mb-6 md:mb-8 text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.92]"
              style={{ animationDelay: "0.1s" }}
            >
              Clinical-stage <br />
              <span className="text-plum-primary">precision <br />
              medicine</span> <span className="text-gold-deep italic">for women</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-8 flex flex-col justify-center h-full lg:pl-8 lg:border-l border-plum-dark/15">
            <p
              className="reveal-rise text-lg md:text-xl font-sans font-normal leading-relaxed text-black-soft mb-6"
              style={{ animationDelay: "0.28s" }}
            >
              IND cleared. First-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology.
            </p>

            {/* Proof badges */}
            <div className="reveal-rise flex items-center gap-3 mb-8" style={{ animationDelay: "0.42s" }}>
              <div className="flex items-center gap-2 px-4 py-2 bg-clinical-teal/10 border border-clinical-teal/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-clinical-teal" />
                <span className="text-xs font-bold uppercase tracking-widest text-clinical-teal-deep">IND Cleared</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gold-primary/12 border border-gold-primary/40 rounded-full">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-deep">NIH-Backed</span>
              </div>
            </div>

            <div className="reveal-rise" style={{ animationDelay: "0.52s" }}>
              <div className="flex items-center gap-4">
                <MagneticButton href="/innovation">Our Platform</MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
