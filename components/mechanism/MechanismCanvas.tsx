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
    <div className="w-full aspect-[4/3] md:aspect-square lg:aspect-auto lg:h-[600px] relative bg-stone-50 rounded-xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100">
      <div className="w-full h-full relative">
          {children}
          {!children && currentStep === 1 && (
            <div className="absolute inset-0 p-4 md:p-8">
              <Scene1_Challenge />
            </div>
          )}
          {currentStep === 2 && (
             <div className="absolute inset-0 p-4 md:p-8">
              <Scene2_CyclicAdvantage />
             </div>
          )}
          {currentStep === 3 && (
             <div className="absolute inset-0 p-4 md:p-8">
               <Scene4_SelectiveUptake />
             </div>
          )}
          {currentStep === 4 && (
             <div className="absolute inset-0 p-4 md:p-8">
               <Scene3_PhActivation />
             </div>
          )}
          {currentStep === 5 && (
             <div className="absolute inset-0 p-4 md:p-8">
               <Scene5_TargetEngagement />
             </div>
          )}
      </div>
    </div>
  );
};
