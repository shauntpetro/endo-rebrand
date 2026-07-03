"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGPUDetect } from "@/hooks/useGPUDetect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Scene1_Challenge } from "./Scene1_Challenge";
import { Scene2_CyclicAdvantage } from "./Scene2_CyclicAdvantage";
import { Scene3_PhActivation } from "./Scene3_PhActivation";
import { Scene4_SelectiveUptake } from "./Scene4_SelectiveUptake";
import { Scene5_TargetEngagement } from "./Scene5_TargetEngagement";

interface MechanismCanvasProps {
  currentStep: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  children?: React.ReactNode;
}

export const MechanismCanvas = ({ currentStep, children }: MechanismCanvasProps) => {
  const gpuTier = useGPUDetect();
  const reduced = usePrefersReducedMotion();

  // Full cross-fade choreography only on capable GPUs with motion allowed.
  // Otherwise the scene still switches — it just snaps into place statically,
  // so the diagram is always visible without waiting on an animation.
  const animate = gpuTier === "high" && !reduced;

  // Preserve the exact step → scene mapping (steps 3 and 4 are intentionally
  // paired with Scene4/Scene3). Scene 1 yields to composed children when present.
  const scene: ReactNode = (() => {
    switch (currentStep) {
      case 1:
        return children ? null : <Scene1_Challenge />;
      case 2:
        return <Scene2_CyclicAdvantage />;
      case 3:
        return <Scene4_SelectiveUptake />;
      case 4:
        return <Scene3_PhActivation />;
      case 5:
        return <Scene5_TargetEngagement />;
      default:
        return null;
    }
  })();

  return (
    <div
      role="group"
      aria-label="Mechanism of action animation"
      aria-roledescription="animated diagram"
      className="w-full aspect-[4/3] md:aspect-square lg:aspect-auto lg:h-full relative rounded-2xl overflow-hidden border border-plum-dark/10 shadow-gold-glow-sm"
      style={{
        background:
          "radial-gradient(80% 65% at 50% 32%, rgba(201,169,97,0.14), transparent 62%), linear-gradient(180deg, #FAF6EC 0%, #F4EEE1 100%)",
      }}
    >
      <div className="w-full h-full relative">
        {/* Persistent continuity motif — luminous gold ground, constant across all scenes */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #C9A961 0%, transparent 60%), linear-gradient(#A68945 1px, transparent 1px), linear-gradient(90deg, #A68945 1px, transparent 1px)",
            backgroundSize: "100% 100%, 28px 28px, 28px 28px",
          }}
        />
        {children}
        <AnimatePresence mode="popLayout">
          {scene && (
            <motion.div
              key={`scene${currentStep}`}
              className="absolute inset-0 p-4 md:p-8"
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={animate ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: animate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              {scene}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
