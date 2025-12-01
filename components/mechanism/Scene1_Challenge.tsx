"use client";

import { motion } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { PeptideRing, IntracellularTarget } from "./Shapes";
import React from "react";

export const Scene1_Challenge = () => {
  return (
    <div className="w-full h-full relative flex overflow-hidden rounded-xl border border-stone-200 shadow-sm bg-white">
      
      {/* ================= NORMAL TISSUE (LEFT) ================= */}
      <div className="w-1/2 h-full relative overflow-hidden border-r border-stone-100">
        
        {/* Backgrounds - Unified Top/Bottom split */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-stone-50/80" /> {/* Extracellular */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-stone-100/50" /> {/* Intracellular */}

        {/* Membrane Rendering */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
             {/* Cytoplasm Fill (Bottom) */}
             <path 
               d="M 0,100 L 0,40 Q 50,38 100,40 L 100,100 Z" 
               fill="#F3F4F6" 
             />
             
             {/* Lipid Bilayer Representation */}
             <path 
               d="M 0,40 Q 50,38 100,40" 
               fill="none" 
               stroke="#D1D5DB" 
               strokeWidth="1.5"
             />
             <path 
               d="M 0,42 Q 50,40 100,42" 
               fill="none" 
               stroke="#D1D5DB" 
               strokeWidth="1.5"
             />
             <path 
               d="M 0,41 Q 50,39 100,41" 
               fill="none" 
               stroke="#9CA3AF" 
               strokeWidth="4"
               strokeDasharray="1 2"
               strokeOpacity="0.3"
             />
           </svg>
        </div>

        {/* Non-Target "Ghost" Structures - REMOVED to clean up UI */}
        
        {/* Labels */}
        <div className="absolute top-6 left-6 z-20">
            <div className="inline-block bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-100 mb-2">
                <h3 className="font-bold text-stone-700 uppercase tracking-widest text-[10px]">NORMAL TISSUE</h3>
            </div>
            <p className="text-[11px] text-stone-500 font-medium max-w-[140px] leading-relaxed pl-1">
              Healthy membranes resist peptide entry.
            </p>
        </div>
        
        {/* Floating Peptides (Extracellular) */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={`normal-pep-${i}`}
                className="absolute w-5 h-5"
                style={{ 
                    top: `${10 + (i * 5)}%`, 
                    left: `${20 + (i * 15)}%` 
                }}
                animate={{
                    y: [0, 5, 0],
                    x: [0, 3, 0],
                    rotate: [0, 20, 0]
                }}
                transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
               <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
            </motion.div>
        ))}

        {/* The "Bounce" Peptide - More obvious rejection */}
        <motion.div
            className="absolute w-5 h-5"
            initial={{ top: '20%', left: '50%' }}
            animate={{
                top: ['20%', '38%', '15%'], // Hits membrane and bounces way up
                left: ['50%', '60%', '40%'],
                rotate: [0, 90, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
             <PeptideRing color={MECHANISM_COLORS.peptideInactive} />
        </motion.div>
      </div>

      {/* ================= LESION TISSUE (RIGHT) ================= */}
      <div className="w-1/2 h-full relative overflow-hidden">
        
        {/* Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-rose-50/30" /> 
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-rose-100/30" /> 

        {/* Membrane Rendering (Endocytosis) */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
             <defs>
                <linearGradient id="lesion-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFE4E6" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#FECDD3" stopOpacity="0.8"/>
                </linearGradient>
             </defs>

             {/* Smoother, wider Endocytosis Path - Mostly Flat initially */}
             <path 
               d="M 0,100 L 0,40 L 100,40 L 100,100 Z" 
               fill="url(#lesion-fill)" 
             />
             
             {/* Membrane Outline - Flat */}
             <path 
               d="M 0,40 L 100,40"
               fill="none" 
               stroke="#FDA4AF" 
               strokeWidth="2"
             />
             <path 
               d="M 0,42 L 100,42"
               fill="none" 
               stroke="#F43F5E" 
               strokeWidth="1"
               strokeDasharray="2 2"
             />
           </svg>
        </div>

        {/* Labels */}
        <div className="absolute top-6 left-6 z-20">
            <div className="inline-block bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-rose-100 mb-2">
                <h3 className="font-bold text-rose-700 uppercase tracking-widest text-[10px]">LESION TISSUE</h3>
            </div>
            <p className="text-[11px] text-rose-600/70 font-medium max-w-[140px] leading-relaxed pl-1">
              Diseased cells actively internalize peptides.
            </p>
        </div>

        {/* Intracellular Targets - Moved up slightly to fill space better */}
        {[...Array(5)].map((_, i) => (
           <motion.div
            key={`target-${i}`}
            className="absolute w-6 h-6"
            style={{ 
              top: `${65 + (i % 2) * 10}%`, 
              left: `${25 + i * 15}%` 
            }}
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "easeInOut"
            }}
           >
            <IntracellularTarget color={MECHANISM_COLORS.intracellularTarget} />
           </motion.div>
        ))}

        {/* Active Peptide Uptake Animation - Modified to land on targets */}
        {[
            { delay: 0, targetX: '40%', targetY: '75%', entryX: 45 },
            { delay: 1.5, targetX: '55%', targetY: '65%', entryX: 50 },
            { delay: 3, targetX: '70%', targetY: '75%', entryX: 55 }
        ].map((path, i) => (
           <React.Fragment key={`reaction-${i}`}>
           {/* ==================== MEMBRANE REACTION & VESICLE ==================== */}
             
             {/* 1. Surface Receptors (Wait for peptide) */}
             {/* Shown before invagination starts */}
             <motion.div
                className="absolute flex justify-center items-end gap-1"
                style={{
                    top: '38%', // Just above membrane (40%)
                    left: `${path.entryX - 3}%`,
                    width: '6%',
                    height: '2%',
                    zIndex: 15,
                    opacity: 0
                }}
                animate={{ opacity: [0, 1, 1, 0, 0] }} // Visible then disappears into invagination
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 8,
                    delay: path.delay,
                    times: [0, 0.1, 0.3, 0.35, 1]
                }}
             >
                {[...Array(3)].map((_, r) => (
                    <div key={r} className="w-[2px] h-[4px] bg-rose-500 rounded-full" />
                ))}
             </motion.div>

             {/* 2. Invagination (The "Cup") - Fixed at Membrane */}
             <motion.div
                className="absolute"
                style={{ 
                    top: '40%', // Centered on membrane line
                    left: `${path.entryX - 10}%`,
                    width: '20%',
                    height: '20%',
                    zIndex: 10 
                }}
             >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    {/* Mask to hide static membrane */}
                    <motion.rect 
                        x="0" y="-2" width="100" height="4" 
                        fill="#FFF1F2" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 8,
                            delay: path.delay,
                            times: [0, 0.25, 0.49, 0.5, 1] // Mask stays until snap
                        }}
                    />

                    {/* The Deforming Membrane (Coated Pit) */}
                    <motion.path 
                        fill="none"
                        stroke="#FDA4AF"
                        strokeWidth="2"
                        initial={{ d: "M 0,0 L 100,0" }} 
                        animate={{
                            d: [
                                "M 0,0 L 100,0", // Flat (Start)
                                "M 0,0 L 30,0 Q 50,40 70,0 L 100,0", // 0.25: Shallow Cup 
                                "M 0,0 L 35,0 C 35,0 20,70 50,70 C 80,70 65,0 65,0 L 100,0", // 0.35: Omega / Deep envelop
                                "M 0,0 L 42,0 C 42,0 48,70 50,70 C 52,70 58,0 58,0 L 100,0", // 0.45: Pinching neck
                                "M 0,0 L 100,0" // 0.5: Snap back to flat
                            ],
                            strokeDasharray: ["0 0", "0 0", "2 2", "2 2", "0 0"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 8,
                            delay: path.delay,
                            times: [0, 0.25, 0.35, 0.48, 0.5] 
                        }}
                    />
                    
                    {/* Clathrin Coat "Fuzz" */}
                     <motion.path 
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1"
                        strokeLinecap="round"
                        d="M 30,10 l -2,4 M 40,20 l -2,5 M 50,25 l 0,6 M 60,20 l 2,5 M 70,10 l 2,4"
                        style={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 1, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 8,
                            delay: path.delay,
                            times: [0, 0.25, 0.3, 0.48, 0.5]
                        }}
                    />
                </svg>
             </motion.div>

             {/* 3. Detached Vesicle (Moves with Peptide) */}
             <motion.div
                className="absolute w-12 h-12 rounded-full border-2 border-rose-300 bg-rose-50/50 flex items-center justify-center"
                style={{ zIndex: 19, marginLeft: '-1.5rem' }} // Centering correction (w-12 is 3rem, so -1.5rem)
                initial={{ top: '45%', left: `${path.entryX}%`, scale: 0, opacity: 0 }}
                animate={{
                    top: ['45%', '55%', path.targetY], 
                    left: [`${path.entryX}%`, `${path.entryX}%`, path.targetX],
                    scale: [0.2, 1, 1, 1], // Pop in small then full size
                    opacity: [0, 1, 1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 8,
                    delay: path.delay,
                    times: [0, 0.5, 0.6, 1] // Starts exactly at 0.5 (when membrane snaps)
                }}
             >
                <div className="absolute inset-0 rounded-full border border-dashed border-rose-400 opacity-50 animate-spin-slow" />
             </motion.div>

             {/* 4. The Peptide Itself */}
             <motion.div
                key={`uptake-${i}`}
                className="absolute w-5 h-5"
                style={{ zIndex: 20, marginLeft: '-0.625rem' }} // Centering correction (w-5 is 1.25rem)
                initial={{ top: '10%', left: '10%', opacity: 0, scale: 1 }}
                animate={{
                    // Timing Aligned with Membrane Phases:
                    // 0.0-0.25: Approach (Top 10 -> 40)
                    // 0.25-0.35: Into Cup (Top 40 -> 45)
                    // 0.35-0.50: Inside Pinch (Top 45 -> 48)
                    // 0.50-1.00: Transport (Top 48 -> Target)
                    top: ['10%', '40%', '45%', '48%', '55%', path.targetY], 
                    left: ['20%', `${path.entryX}%`, `${path.entryX}%`, `${path.entryX}%`, `${path.entryX}%`, path.targetX],
                    opacity: [0, 1, 1, 1, 1, 1],
                    scale: [1, 1, 0.9, 0.8, 0.8, 0.8],
                    rotate: [0, 45, 90, 135, 180, 225]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 8, 
                    delay: path.delay,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.35, 0.48, 0.6, 1]
                }}
               >
                 <PeptideRing color={MECHANISM_COLORS.peptideActive} />
                 
                 <motion.div 
                    className="absolute inset-0 rounded-full bg-amber-400/50 blur-sm"
                    animate={{ opacity: [0, 0, 0, 1, 0.5] }}
                    transition={{ 
                        duration: 3, 
                        times: [0, 0.8, 0.9, 0.95, 1], 
                        repeat: Infinity, 
                        repeatDelay: 8,
                        delay: path.delay 
                    }}
                 />
               </motion.div>
           </React.Fragment>
        ))}

      </div>

      {/* Central Callout */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-stone-100 text-center min-w-[220px] z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-1">THE KEY DIFFERENCE</p>
        <p className="font-serif text-stone-800 text-base leading-none">
            Active <span className="italic text-rose-600">Intracellular</span> Uptake
        </p>
      </motion.div>
    </div>
  );
};
