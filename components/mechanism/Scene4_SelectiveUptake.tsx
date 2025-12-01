"use client";

import { motion } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { PeptideRing } from "./Shapes";

export const Scene4_SelectiveUptake = () => {
  return (
    <div className="w-full h-full relative flex rounded-xl border border-stone-200 overflow-hidden bg-white shadow-sm">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Selective Uptake</h3>
      </div>
      
      {/* Split Layout */}
      <div className="w-full h-full flex">
          
          {/* Normal Tissue (Left) */}
          <div className="w-1/2 h-full relative border-r border-stone-100 bg-stone-50/30">
              {/* Membrane Barrier */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none">
                     {/* Cell Membrane - Smooth curve */}
                     <path 
                        d="M -50,600 Q 200,300 50,0 L -50,0 Z" 
                        fill="#F3F4F6"
                        stroke="#D1D5DB"
                        strokeWidth="2"
                     />
                     <path 
                        d="M 50,0 Q 200,300 -50,600"
                        fill="none"
                        stroke="#9CA3AF"
                        strokeWidth="3" 
                        strokeDasharray="4 4"
                     />
                </svg>
              </div>
              
              <div className="absolute bottom-12 left-0 w-full text-center px-4">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Passive Exclusion</span>
              </div>

              {/* Bouncing Peptides */}
              <motion.div 
                className="absolute w-8 h-8"
                style={{ top: '30%', left: '60%' }}
                animate={{
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                  <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
              </motion.div>
              
              <motion.div 
                className="absolute w-8 h-8"
                style={{ top: '50%', left: '50%' }}
                animate={{
                    x: [0, -15, 0],
                    y: [0, -40, 0],
                    rotate: [0, -30, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                  <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
              </motion.div>
          </div>

          {/* Lesion Tissue (Right) */}
          <div className="w-1/2 h-full relative bg-rose-50/20">
              {/* Active Uptake Membrane */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none">
                     <defs>
                         <linearGradient id="lesion-uptake-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#FFE4E6" />
                             <stop offset="100%" stopColor="#FECDD3" />
                         </linearGradient>
                     </defs>
                     {/* Cell Body with deep invagination */}
                     <path 
                        d="M 450,600 L 450,0 L 350,0 Q 200,100 250,200 Q 300,300 200,400 Q 150,500 350,600 Z" 
                        fill="url(#lesion-uptake-grad)"
                        opacity="0.5"
                     />
                     {/* Membrane Line */}
                     <path 
                        d="M 350,0 Q 200,100 250,200 Q 300,300 200,400 Q 150,500 350,600"
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="3" 
                        strokeDasharray="3 3"
                     />
                </svg>
              </div>

              <div className="absolute bottom-12 left-0 w-full text-center px-4">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Active Endocytosis</span>
              </div>

              {/* Entering Peptides */}
              {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`uptake-pep-${i}`}
                    className="absolute w-8 h-8"
                    initial={{ top: '10%', left: '10%', opacity: 0 }}
                    animate={{
                        top: ['10%', '33%', '66%', '85%'], // Path down the invagination
                        left: ['10%', '40%', '20%', '50%'], // Winding path
                        opacity: [0, 1, 1, 0],
                        scale: [1, 1, 0.8, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut"
                    }}
                  >
                      <PeptideRing color={MECHANISM_COLORS.peptideActive} />
                  </motion.div>
              ))}
              
              {/* "Vesicle" forming animation (optional detail) */}
              <motion.div
                className="absolute w-16 h-16 rounded-full border-2 border-rose-300 border-dashed opacity-50"
                style={{ top: '60%', left: '30%' }}
                animate={{
                    scale: [0, 1],
                    opacity: [0, 0.5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
          </div>
      </div>

      <div className="absolute bottom-4 w-full text-center z-20">
          <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-stone-600 text-xs shadow-sm border border-stone-100">
              Targeted uptake mechanism prevents off-target effects
          </span>
      </div>
    </div>
  );
};
