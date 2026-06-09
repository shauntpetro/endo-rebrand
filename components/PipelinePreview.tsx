"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import PortfolioMatrix from "@/components/PortfolioMatrix";

// Reusable progress bar component
const PipelineItem = ({
  title,
  description,
  phase,
  color = "bg-plum-primary",
  delay = 0
}: {
  title: string,
  description: string,
  phase: string,
  color?: string,
  delay?: number
}) => {
  const { ref: visRef, isVisible } = useVisibility();

  return (
    <motion.div
      ref={visRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 bg-white/50 backdrop-blur-sm border border-plum-primary/5 rounded-xl hover:bg-white hover:shadow-lg hover:border-plum-primary/10 hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-plum-dark font-sans group-hover:text-plum-primary transition-colors">{title}</h3>
        {phase === "IND Cleared" ? (
          <span className="relative overflow-hidden text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-clinical-teal/15 text-clinical-teal border border-clinical-teal/30">
            {phase}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={isVisible ? { x: ["-100%", "200%"] } : undefined}
              transition={isVisible ? { duration: 2, repeat: Infinity, repeatDelay: 3 } : { duration: 0 }}
            />
          </span>
        ) : (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${color.replace('bg-', 'bg-').replace('primary', 'primary/10')} ${color.replace('bg-', 'text-')}`}>
            {phase}
          </span>
        )}
      </div>
      <p className="text-gray-therapeutics font-normal font-sans text-sm mb-4">{description}</p>

      {/* Animated Progress Line */}
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-full ${color} opacity-50`}
        />
      </div>
    </motion.div>
  );
};

export default function PipelinePreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="bg-gradient-to-b from-[#E8E4F0] via-[#E0DBEA] to-[#D8D1E4] border-b border-black-primary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Dynamic Visual Visualization */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 relative aspect-[4/5] bg-white border border-black-primary/10 shadow-2xl rounded-xl overflow-hidden group hover:shadow-[0_30px_60px_rgba(58,46,69,0.15)] transition-all duration-700 ring-1 ring-black/5 will-change-transform"
          >
             <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
               <div className="w-full">
                 <PortfolioMatrix variant="compact" />
               </div>
             </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col relative z-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-plum-primary mb-8 block font-sans">
              Therapeutics & Diagnostics
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-plum-dark mb-12 tracking-tighter leading-[0.9]">
              Our <br/> <span className="italic text-gold-primary">Pipeline</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <p className="text-xl text-black-soft leading-relaxed font-normal border-l-2 border-gold-primary pl-6 font-sans">
                Redefining care in endometriosis and oncology through a robust pipeline of first-in-class candidates.
              </p>
              
              <div className="space-y-4 pt-8">
                <PipelineItem 
                  title="ENDO-205 & FemLUNA"
                  description="Non-hormonal therapeutic and precision imaging for endometriosis."
                  phase="IND Cleared"
                  color="bg-plum-primary"
                  delay={0.2}
                />
                <PipelineItem 
                  title="ENDO-995 & ENDO-311"
                  description="Targeting 25% of malignant solid tumors and colorectal cancer."
                  phase="Pre-Clinical"
                  color="bg-gold-primary"
                  delay={0.4}
                />
              </div>
            </div>

            <div>
              <Link 
                href="/pipeline"
                className="group inline-flex items-center px-10 py-5 bg-plum-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-primary hover:shadow-[0_10px_30px_rgba(201,169,97,0.3)] transition-all duration-300 font-sans rounded-lg shadow-lg transform hover:-translate-y-1"
              >
                <span className="flex items-center relative z-10">
                  View Pipeline
                  <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
