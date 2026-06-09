"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useVisibility } from "@/hooks/useVisibility";

function Counter({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px" });
  
  useEffect(() => {
    if (!inView || !nodeRef.current) return;
    
    let startTime: number;
    const duration = 2000; // 2 seconds
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = easeProgress * value;
      
      if (nodeRef.current) {
        nodeRef.current.textContent = current.toFixed(decimals) + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, value, suffix, decimals]);
  
  return <span ref={nodeRef} className="tabular-nums inline-block">0{suffix}</span>;
}

export default function ImpactSection() {
  const { ref: visRef, isVisible } = useVisibility();

  return (
    <section ref={visRef as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-plum-primary to-plum-dark text-white border-b border-white/10 relative overflow-hidden">
      {/* Background visual noise/grain - using CSS pattern instead of image */}
      <motion.div
        className="absolute -inset-5 opacity-[0.03] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
        animate={isVisible ? {
          x: [0, 20],
          y: [0, 20],
        } : undefined}
        transition={isVisible ? {
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        } : { duration: 0 }}
      />
      
      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl"
        animate={isVisible ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        } : undefined}
        transition={isVisible ? {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        } : { duration: 0 }}
      />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-8 block font-sans">
              Impact
            </span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-12 tracking-tighter leading-none">
              Why It <br/> <span className="italic text-white/80">Matters</span>
            </h2>
            
            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-x-8 gap-y-16 border-t border-white/10 pt-12 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { value: 190, suffix: "M+", label: "Women Affected", desc: "Worldwide" },
                { value: 10, suffix: "%", label: "Global Prevalence", desc: "Of Reproductive Age" },
                { value: 200, suffix: "B", label: "Economic Burden", desc: "Annual Cost in US" },
                { value: 8, suffix: "yr", decimals: 0, label: "Avg Diagnosis Delay", desc: "Years of Suffering" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-primary/0 via-gold-primary/30 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-5xl md:text-6xl font-light text-white mb-2 font-serif tracking-tighter group-hover:text-gold-primary transition-colors duration-500">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gold-primary mb-1">{stat.label}</div>
                  <div className="text-[10px] text-white/60 font-mono uppercase tracking-wider">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between lg:pl-12"
          >
            <p className="text-2xl md:text-4xl text-white/90 leading-tight font-normal mb-16 font-sans border-l-2 border-gold-primary pl-8 hover:border-l-4 transition-all duration-500">
              Endometriosis affects over <span className="text-white font-bold">190 million women</span> and remains one of the leading causes of pain and infertility worldwide.
            </p>
            
            <motion.div 
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Card 1 */}
              <motion.div
                className="group relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-xl overflow-hidden hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,169,97,0.1)] transition-all duration-500"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-plum-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                   <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-primary/10 transition-all duration-500 flex-shrink-0">
                      <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                   </div>
                   <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-primary transition-colors duration-300">The Diagnostic Gap</h3>
                      <p className="text-white/70 leading-relaxed font-sans">
                        Most patients face years of diagnostic delays and limited treatment options. We are changing that with the first non-invasive diagnostic.
                      </p>
                   </div>
                </div>
              </motion.div>
              
              {/* Card 2 */}
              <motion.div
                className="group relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-xl overflow-hidden hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,169,97,0.1)] transition-all duration-500"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-plum-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                   <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-primary/10 transition-all duration-500 flex-shrink-0">
                      <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                   </div>
                   <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-primary transition-colors duration-300">Curative Potential</h3>
                      <p className="text-white/70 leading-relaxed font-sans">
                        A disease-modifying therapy with curative potential, built to detect and treat the root cause of disease, not just the symptoms.
                      </p>
                   </div>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="mt-12 text-right">
              <Link 
                href="/impact"
                className="inline-flex items-center group text-lg text-white hover:text-gold-primary transition-colors font-sans"
              >
                <span className="border-b border-gold-primary pb-1">Read Full Impact Report</span>
                <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
