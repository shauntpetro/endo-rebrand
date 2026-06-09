"use client";

import { useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { DitherOverlay } from "./DitherOverlay";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGPUDetect } from "@/hooks/useGPUDetect";
import { useVisibility } from "@/hooks/useVisibility";
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

/** Static fallback when GPU is unavailable */
const StaticHeroBackground = () => (
  <div className="absolute inset-0 z-0 opacity-60">
    <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-gold-primary/30 to-plum-primary/20 blur-3xl" />
    <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-gold-light/25 to-clinical-teal/15 blur-2xl" />
    <div className="absolute top-1/2 right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-plum-primary/10 to-gold-primary/15 blur-3xl" />
  </div>
);

// Cinematic stagger sequence — matches original GSAP timing:
// Headline at 2.8s, paragraph staggered after, badge, then CTA
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 2.8,
      staggerChildren: 0.4,
    },
  },
};

const heroItemVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(12px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const heroBadgeVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const gpuTier = useGPUDetect();
  const { setRef: setVisRef, isVisible } = useVisibility();

  // rAF-throttled mouse spotlight
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.4), transparent 40%)`;
      }
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        setVisRef(node);
      }}
      className="relative min-h-screen w-full bg-[#FDF6E9] flex flex-col justify-end overflow-hidden"
    >
      {/* Spotlight Layer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ease-out"
      />

      {/* Aurora Gradient Layer */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-20 will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,97,0.3) 0%, rgba(74,63,92,0.15) 40%, transparent 70%)',
          }}
          animate={isVisible ? {
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          } : undefined}
          transition={isVisible ? { duration: 20, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-[50vw] h-[50vw] rounded-full opacity-15 will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(74,155,142,0.2) 0%, rgba(74,63,92,0.1) 50%, transparent 70%)',
          }}
          animate={isVisible ? {
            x: [0, -60, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.1, 1.05, 1],
          } : undefined}
          transition={isVisible ? { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 } : { duration: 0 }}
        />
      </div>

      {/* 3D Background Layers */}
      <div className="absolute inset-0 h-full w-full top-0 pointer-events-none">
         {/* Main Interactive Peptide — falls back to static gradient on no-GPU */}
         <div className="absolute inset-0 lg:inset-auto lg:top-0 lg:right-0 lg:w-[70%] lg:h-full opacity-40 lg:opacity-100">
           {gpuTier !== "none" ? <CanvasErrorBoundary><PeptideCanvas /></CanvasErrorBoundary> : <StaticHeroBackground />}
         </div>

         {/* Dither & Grain */}
         <DitherOverlay />

         {/* Vignette/Gradient Overlay for text readability */}
         <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/80 lg:via-[#FDF6E9]/40 to-[#FDF6E9]/30 lg:to-transparent pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6E9] via-transparent to-transparent h-32 bottom-0 pointer-events-none" />
      </div>

      {/* Content Grid */}
      <motion.div
        className="container mx-auto px-6 pb-8 md:pb-12 relative z-10"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center pt-8 md:pt-12 border-t border-black-primary/10">
          <div className="lg:col-span-6">
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl md:text-[84px] font-serif font-bold tracking-tight leading-[1.05] sm:leading-[1.0] md:leading-[0.9] text-plum-dark mb-6 md:mb-8"
            >
              Clinical-stage <br />
              <span className="text-plum-primary">precision <br />
              medicine</span> <span className="text-gold-primary italic">for women</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-8 flex flex-col justify-center h-full lg:pl-8 lg:border-l border-black-primary/10">
            <motion.p
              variants={heroItemVariants}
              className="text-lg md:text-xl font-sans font-normal leading-relaxed text-black-soft mb-6"
            >
              IND cleared. First-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology.
            </motion.p>

            {/* IND Cleared Badge */}
            <motion.div variants={heroBadgeVariants} className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-clinical-teal/10 border border-clinical-teal/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-clinical-teal animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-clinical-teal">IND Cleared</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border border-gold-primary/30 rounded-full">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-primary">NIH-Backed</span>
              </div>
            </motion.div>

            <motion.div variants={heroItemVariants}>
              <div className="flex items-center gap-4">
                <MagneticButton href="/innovation">
                  Our Platform
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
