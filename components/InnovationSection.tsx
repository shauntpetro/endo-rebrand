"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useMemo } from "react";

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

export default function InnovationSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="bg-gradient-to-b from-[#E5D4A6]/20 via-white to-[#E8E4F0] border-b border-black-primary overflow-hidden">
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Content - Swiss Flush Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col relative z-10"
          >
            <div className="overflow-hidden mb-8">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-plum-primary block font-sans"
              >
                The Platform
              </motion.span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-plum-dark mb-12 tracking-tighter leading-[0.9]">
              Our <br/> <span className="italic text-gold-primary relative inline-block">
                Innovation
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gold-primary mb-12 origin-left" 
            />
            
            <p className="text-xl md:text-2xl text-black-soft leading-relaxed mb-8 font-normal max-w-xl font-sans">
              EndoCyclic Therapeutics has spent over a decade developing an innovative platform that produces cell-permeating, pH-sensitive peptides designed to act only in diseased tissue. 
            </p>
            <p className="text-lg text-gray-therapeutics leading-relaxed mb-12 font-normal max-w-xl font-sans border-l-2 border-gray-200 pl-6">
              Built for specificity, each targeted peptide is tuned for either therapy or imaging, delivering precision without hormones, radiation, cargo agents or systemic toxicity.
            </p>
            
            <div>
              <Link 
                href="/innovation"
                className="group inline-flex items-center px-10 py-5 border border-plum-primary text-plum-primary text-sm font-bold uppercase tracking-widest hover:bg-plum-primary hover:text-white transition-all duration-300 font-sans rounded-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Read More
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Visualization - Clean Frame */}
          <motion.div 
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square bg-white border border-black-primary/10 shadow-2xl rounded-sm overflow-hidden group"
          >
             <div className="absolute inset-0 flex flex-col">
                {/* Systemic Zone (Neutral pH) */}
                <div className="h-1/2 w-full bg-gray-50 relative overflow-hidden">
                   <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest z-10">Systemic Circulation (pH 7.4)</div>
                   
                   {/* Floating Particles - Inactive */}
                   {[...Array(8)].map((_, i) => (
                     <motion.div
                       key={`inactive-${i}`}
                       className="absolute w-3 h-3 rounded-full border-2 border-gray-300 opacity-60 backdrop-blur-sm"
                       initial={{ 
                         x: toFixedNumber(getDeterministicRandom(i * 10 + 1), 400), 
                         y: toFixedNumber(getDeterministicRandom(i * 10 + 2), 200) 
                       }}
                       animate={{
                         x: [null, toFixedNumber(getDeterministicRandom(i * 10 + 3), 400)],
                         y: [null, toFixedNumber(getDeterministicRandom(i * 10 + 4), 200)],
                         rotate: [0, 360]
                       }}
                       transition={{
                         duration: Math.round((15 + getDeterministicRandom(i * 10 + 5) * 10) * 100) / 100,
                         repeat: Infinity,
                         repeatType: "mirror",
                         ease: "easeInOut"
                       }}
                       style={{
                         left: toFixedPercent(getDeterministicRandom(i * 10 + 6), 80),
                         top: toFixedPercent(getDeterministicRandom(i * 10 + 7), 80)
                       }}
                     />
                   ))}
                </div>

                {/* Membrane / Barrier Interface */}
                <div className="h-px w-full relative z-10 flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
                   <div className="absolute inset-0 w-full h-4 -top-2 bg-gradient-to-b from-white/0 via-white/50 to-white/0 backdrop-blur-[1px]" />
                   
                   <div className="relative bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                      <span className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">Activation Threshold</span>
                   </div>
                </div>

                {/* Tumor Microenvironment (Acidic pH) */}
                <div className="h-1/2 w-full bg-gradient-to-b from-plum-primary/5 to-plum-primary/15 relative overflow-hidden">
                   <div className="absolute top-4 left-4 text-[10px] font-mono text-plum-primary uppercase tracking-widest z-10">
                      Diseased Microenvironment (pH 6.5)<br/>
                      <span className="text-gold-primary font-bold shadow-gold-glow">Active Binding</span>
                   </div>
                   
                   {/* Active Peptides */}
                   {[...Array(6)].map((_, i) => (
                     <motion.div
                       key={`active-${i}`}
                       className="absolute w-4 h-4 rounded-full bg-gold-primary shadow-[0_0_20px_#C9A961] z-0"
                       initial={{ scale: 0.8, opacity: 0.5 }}
                       animate={{
                         scale: [0.8, 1.1, 0.8],
                         opacity: [0.6, 1, 0.6],
                         x: [0, Math.round((getDeterministicRandom(i * 20 + 1) * 20 - 10) * 100) / 100, 0],
                         y: [0, Math.round((getDeterministicRandom(i * 20 + 2) * 20 - 10) * 100) / 100, 0]
                       }}
                       transition={{
                         duration: Math.round((3 + getDeterministicRandom(i * 20 + 3)) * 100) / 100,
                         repeat: Infinity,
                         ease: "easeInOut"
                       }}
                       style={{
                          top: `${Math.round((20 + getDeterministicRandom(i * 20 + 4) * 60) * 100) / 100}%`,
                          left: `${Math.round((10 + getDeterministicRandom(i * 20 + 5) * 80) * 100) / 100}%`
                       }}
                     />
                   ))}
                   
                   {/* Subtle Grid Texture */}
                   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
                </div>

                {/* Crossing Particle - The Hero Animation */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 z-20"
                  initial={{ top: "35%" }}
                  animate={{ top: ["35%", "65%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                >
                   <motion.div 
                     className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white/50 backdrop-blur-sm"
                     animate={{
                        backgroundColor: ["rgba(255,255,255,0.5)", "#D4AF37"],
                        borderColor: ["#9CA3AF", "#D4AF37"],
                        boxShadow: ["0 0 0px transparent", "0 0 30px #C9A961", "0 0 10px #C9A961"],
                        scale: [1, 1.2]
                     }}
                     transition={{
                        duration: 4,
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                     }}
                   />
                   {/* Ripple Effect on Activation */}
                   <motion.div
                      className="absolute top-0 left-0 w-4 h-4 rounded-full border border-gold-primary/50"
                      animate={{ scale: [1, 2.5], opacity: [0, 1, 0] }}
                      transition={{
                         duration: 1,
                         delay: 2, // Sync with crossing midpoint
                         repeat: Infinity,
                         repeatDelay: 4
                      }}
                   />
                </motion.div>
             </div>
             
             <div className="absolute bottom-0 left-0 w-full p-6 border-t border-black-primary/5 flex justify-between items-center bg-white/80 backdrop-blur-md z-20">
               <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                 FIG 1.0 — pH-MEDIATED ACTIVATION
               </div>
               <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full border border-gray-400" title="Inactive" />
                 <div className="w-2 h-2 rounded-full bg-gold-primary shadow-[0_0_5px_#C9A961]" title="Active" />
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
