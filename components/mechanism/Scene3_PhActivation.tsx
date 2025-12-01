"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MECHANISM_COLORS } from "./constants";
import { useState, useEffect } from "react";

export const Scene3_PhActivation = () => {
  // Animation cycle for pH to show both states automatically
  const [pH, setPh] = useState(7.4); 
  
  useEffect(() => {
    // Cycle from 7.4 (neutral) to 6.0 (acidic) and back
    const duration = 6000; // 6 seconds cycle
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Sine wave to oscillate between 7.4 and 6.0
        // 0 -> 7.4, 0.5 -> 6.0, 1 -> 7.4
        const wave = Math.sin(progress * Math.PI * 2); 
        // map -1..1 to 6.0..7.4
        // Actually we want start at 7.4 -> 6.0 -> 7.4
        // cos starts at 1 (7.4) goes to -1 (6.0) back to 1
        const cosWave = Math.cos(progress * Math.PI * 2); // 1 to -1 to 1
        // normalize to 0..1 (1 is 7.4, 0 is 6.0)
        const normalized = (cosWave + 1) / 2;
        
        const currentPh = 6.0 + (normalized * 1.4);
        setPh(currentPh);
        
        requestAnimationFrame(animate);
    };
    
    const timer = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timer);
  }, []);

  const isAcidic = pH < 6.8;

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between bg-gradient-to-b from-white to-stone-50 rounded-xl border border-stone-200 shadow-sm p-8 overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Smart Activation</h3>
      </div>

      {/* Environment Background Gradient */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{ 
          background: `linear-gradient(to bottom, #ffffff 0%, ${isAcidic ? '#FFF8E1' : '#F5F5F5'} 100%)`
        }}
        transition={{ duration: 0.5 }} // Smoother background transition
      />

      <div className="flex-1 flex items-center justify-center w-full relative">
        
        {/* Activation Pulse Effect */}
        <AnimatePresence>
            {isAcidic && (
                <motion.div
                    className="absolute"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                >
                    <div className="w-32 h-32 rounded-full bg-gold-primary/30 blur-xl" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* The Peptide */}
        <motion.div
          className="relative w-32 h-32 z-10"
          animate={{ 
            rotate: 360,
            filter: isAcidic ? `drop-shadow(0 0 25px ${MECHANISM_COLORS.peptideActive})` : 'none'
          }}
          transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
        >
           <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
             <motion.circle 
               cx="50" cy="50" r="40" 
               stroke={isAcidic ? MECHANISM_COLORS.peptideActive : "#9CA3AF"}
               strokeWidth="6"
               fill="none"
               animate={{ stroke: isAcidic ? MECHANISM_COLORS.peptideActive : "#9CA3AF" }}
             />
             {/* R Group */}
             <motion.g animate={{ opacity: isAcidic ? 0 : 1 }}>
               <text x="50" y="50" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="16" fontWeight="bold">R</text>
             </motion.g>
             
             {/* RH+ Group */}
             <motion.g animate={{ opacity: isAcidic ? 1 : 0 }}>
               <text x="50" y="50" textAnchor="middle" dy=".3em" fill={MECHANISM_COLORS.peptideActive} fontSize="16" fontWeight="bold">RH+</text>
             </motion.g>
           </svg>
        </motion.div>

        {/* Activation Callout */}
        <AnimatePresence>
            {isAcidic && (
                <motion.div 
                className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20"
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 20 }}
                transition={{ type: "spring", bounce: 0.5 }}
                >
                    <div className="bg-gradient-to-br from-gold-light to-gold-primary border border-white text-black-primary font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
                        <span className="text-xl">⚡</span> Activated!
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Controls Display (Read-only) */}
      <div className="w-full max-w-md flex flex-col gap-6 z-10 bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white shadow-sm">
        <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em]">
          <span className={isAcidic ? "text-stone-300" : "text-stone-600"}>Bloodstream (pH 7.4)</span>
          <span className={isAcidic ? "text-amber-600" : "text-stone-300"}>Lesion (pH 6.0)</span>
        </div>
        
        <div className="relative h-12 flex items-center">
            {/* Custom Gradient Track */}
            <div className="absolute inset-0 h-3 rounded-full bg-gradient-to-r from-gray-200 via-orange-100 to-gold-primary shadow-inner top-1/2 -translate-y-1/2" />
            
            {/* Custom Thumb (Animated) */}
            <motion.div 
                className="absolute h-10 w-10 bg-white border-4 border-coral-primary rounded-full shadow-lg z-10 flex items-center justify-center"
                style={{ 
                    left: `calc(${((7.4 - pH) / 1.4) * 100}% - 20px)` // Reversed scale: 7.4 is left (0%), 6.0 is right (100%)
                }}
                animate={{ 
                    scale: isAcidic ? 1.2 : 1,
                    borderColor: isAcidic ? '#E5A83D' : '#FF6B6B'
                }}
            >
                <div className="w-2 h-2 rounded-full bg-stone-300" />
            </motion.div>
        </div>

        <div className="text-center">
          <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-1">Current Environment pH</p>
          <motion.div 
            // removed key={pH} to avoid thrashing the DOM with rapid updates
            animate={{ scale: isAcidic ? 1.1 : 1, color: isAcidic ? '#C9A961' : '#4B5563' }}
            className="text-4xl font-mono font-bold"
          >
              {pH.toFixed(1)}
          </motion.div>
        </div>
      </div>

    </div>
  );
};
