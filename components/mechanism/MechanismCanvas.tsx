"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  return (
    <div className="w-full aspect-[4/3] md:aspect-square lg:aspect-auto lg:h-full relative rounded-xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)]" style={{ background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF8F0 100%)' }}>
      <div className="w-full h-full relative">
          {/* Persistent continuity motif — constant across all scenes */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #C9A961 0%, transparent 60%), linear-gradient(#A68945 1px, transparent 1px), linear-gradient(90deg, #A68945 1px, transparent 1px)",
              backgroundSize: "100% 100%, 28px 28px, 28px 28px",
            }}
          />
          {children}
          <AnimatePresence mode="popLayout">
            {!children && currentStep === 1 && (
              <motion.div
                key="scene1"
                className="absolute inset-0 p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene1_Challenge />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                key="scene2"
                className="absolute inset-0 p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene2_CyclicAdvantage />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div
                key="scene3"
                className="absolute inset-0 p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene4_SelectiveUptake />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div
                key="scene4"
                className="absolute inset-0 p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene3_PhActivation />
              </motion.div>
            )}
            {currentStep === 5 && (
              <motion.div
                key="scene5"
                className="absolute inset-0 p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene5_TargetEngagement />
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
};
