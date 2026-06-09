"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DitherOverlay } from "@/components/DitherOverlay";
import { Scan, Eye, Target, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const Scene4_SelectiveUptake = dynamic(
  () => import("@/components/mechanism/Scene4_SelectiveUptake").then(m => m.Scene4_SelectiveUptake),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#FFFBF5] to-[#FFF8F0] rounded-xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 animate-pulse" />
      </div>
    ),
  }
);

export default function ImagingPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const rafRef = useRef<number>(0);
  const rectRef = useRef<DOMRect | null>(null);

  const cacheRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const updateSlider = useCallback((clientX: number) => {
    const rect = rectRef.current;
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateSlider(e.clientX));
  }, [updateSlider]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateSlider(e.touches[0].clientX));
  }, [updateSlider]);

  // Invalidate cached rect on resize and clean up rAF
  useEffect(() => {
    const invalidate = () => { rectRef.current = null; };
    window.addEventListener("resize", invalidate);
    return () => {
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Immersive Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-[#2a2435] to-black-primary text-white">
        <DitherOverlay />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black-primary/90 pointer-events-none z-10" />
        
        {/* Background abstract element */}
        <div className="absolute inset-0 opacity-40">
             <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse" />
             <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-plum-primary/20 rounded-full blur-[80px]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-plum-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            style={{ y, opacity }}
            className="max-w-5xl mx-auto text-center will-change-[transform,opacity]"
          >
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
            >
                <Eyebrow className="inline-block py-1 px-3 border border-gold-primary/30 rounded-full mb-6 backdrop-blur-sm">
                  FemLUNA Imaging Platform
                </Eyebrow>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  Seeing the <br/>
                  <span className="text-gold-primary italic">Undetectable</span>
                </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Turning the invisible visible. The first non-invasive, high-fidelity visualization of endometriotic lesions.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Comparison Slider - Breaking the grid (Overlapping) */}
      <section className="relative z-30 -mt-24 pb-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-white/10 ring-1 ring-black/5 bg-black"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] w-full cursor-col-resize group"
                 ref={containerRef}
                 role="slider"
                 aria-label="Compare Standard MRI and FemLUNA Enhanced imaging"
                 aria-valuemin={0}
                 aria-valuemax={100}
                 aria-valuenow={Math.round(sliderPosition)}
                 tabIndex={0}
                 onKeyDown={(e) => {
                   if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 2));
                   if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 2));
                 }}
                 onMouseEnter={cacheRect}
                 onMouseMove={handleMouseMove}
                 onTouchStart={cacheRect}
                 onTouchMove={handleTouchMove}
            >
              {/* Right Image (FemLUNA) */}
              <div className="absolute inset-0 bg-black-primary flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/FemLUNA-enhanced.webp')] bg-cover bg-center opacity-100 scale-110" />
                  {/* Glowing Lesions - Positioned over actual lesions in the image */}
                  {/* Anterior lesion (0.5mm) - near bladder, front of pelvis */}
                  <div className="absolute top-[78%] left-[37%] w-2 h-2 md:w-3 md:h-3 bg-gold-primary rounded-full shadow-[0_0_25px_#D4AF37] animate-pulse" />
                  {/* Posterior lesion (0.8mm) - near rectum, back of pelvis - larger */}
                  <div className="absolute bottom-[38%] right-[28%] w-3 h-3 md:w-5 md:h-5 bg-gold-primary rounded-full shadow-[0_0_40px_#D4AF37] animate-pulse delay-100" />
                  
                  <div className="absolute bottom-8 right-8 text-gold-primary font-mono text-xs md:text-sm tracking-wider backdrop-blur-md bg-black/50 p-2 rounded border border-gold-primary/30">
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-gold-primary rounded-full animate-pulse" />
                       SIGNAL DETECTED: POSITIVE
                     </div>
                  </div>
              </div>

              {/* Left Image (Standard MRI) */}
              <div 
                className="absolute inset-0 bg-zinc-900 overflow-hidden border-r border-white/50"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                  <div className="absolute inset-0 bg-[url('/standard-mri.webp')] bg-cover bg-center opacity-20 grayscale scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/60 backdrop-blur px-4 py-2 text-zinc-500 font-mono text-xs uppercase tracking-widest border border-zinc-800">No Signal</span>
                  </div>
              </div>
              
              {/* Slider Handle */}
              <div
                 className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 pointer-events-none"
                 style={{ left: `${sliderPosition}%` }}
              >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize hover:scale-110 transition-transform">
                    <div className="flex gap-1">
                       <div className="w-0.5 h-4 bg-zinc-400" />
                       <div className="w-0.5 h-4 bg-zinc-400" />
                    </div>
                 </div>
                 {/* Pulse ring */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white/30 animate-ping pointer-events-none" />
              </div>

              {/* Labels */}
              <div className="absolute top-6 left-6 text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mix-blend-difference">Standard MRI</div>
              <div className="absolute top-6 right-6 text-xs font-bold text-gold-primary uppercase tracking-[0.2em]">FemLUNA Enhanced</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-8 mt-8 text-sm font-medium text-zinc-500"
          >
            <div className="flex items-center gap-2 hover:text-gold-primary transition-colors">
               <Scan size={16} /> <span>98% Sensitivity</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gold-primary transition-colors">
               <Eye size={16} /> <span>Sub-mm Detection</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Diagnostic Gap - Dark Stats Section */}
      <section className="py-32 bg-zinc-900 text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('/cubes.webp')] mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-coral-primary font-bold tracking-widest uppercase text-sm mb-4 block"
              >
                The Current Standard Fails
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight"
              >
                Diagnosis should start with <span className="text-zinc-500 italic">answers</span>, not surgery.
              </motion.h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-4">
                Exploratory surgery is currently the only definitive way to diagnose endometriosis. It is invasive, expensive, and often inconclusive.
              </p>
              <p className="text-base text-zinc-500 font-light leading-relaxed mb-8">
                Conventional MRI agents based on heavy metals cannot visualize fibrotic or superficial subtypes, which account for more than 80% of disease burden. Ultrasound is highly operator-dependent, and many lesions involving the bowel, bladder, or deep pelvic structures are impossible to detect.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-12">
                {[
                  { title: "Diagnostic Limbo", desc: "Blood & saliva tests lack actionable lesion data." },
                  { title: "Surgical Uncertainty", desc: "Exploratory procedures often miss hidden lesions." },
                  { title: "Delayed Care", desc: "Average 7-10 years to diagnosis." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex items-start gap-4 border-l border-zinc-700 pl-6 py-2 hover:border-coral-primary transition-colors duration-300"
                  >
                    <AlertCircle className="text-coral-primary shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-800/50 p-12 rounded-2xl border border-zinc-700 backdrop-blur-sm text-center relative overflow-hidden group hover:border-coral-primary/30 transition-colors duration-500">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral-primary/10 rounded-full blur-3xl group-hover:bg-coral-primary/20 transition-all duration-500" />
                
                <motion.div
                   initial={{ scale: 0.5, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", bounce: 0.5 }}
                   className="text-9xl font-serif font-bold text-white mb-4 relative z-10"
                >
                  1<span className="text-zinc-600 text-7xl">/</span>3
                </motion.div>
                <p className="text-2xl text-zinc-300 font-light max-w-xs mx-auto relative z-10">
                  women leave surgery <span className="text-coral-primary font-medium">without</span> a diagnosis.
                </p>
                <div className="mt-8 text-sm text-zinc-500 uppercase tracking-widest">
                  Misdiagnosis Rate
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-zinc-800 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Recurrence Insight */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-black-primary leading-relaxed italic"
          >
            Most recurrences happen not because the disease is uncontrollable, but because the original lesions were never fully removed. FemLUNA is not just an imaging agent. It is a clinical roadmap.
          </motion.blockquote>
        </div>
      </section>

      {/* The FemLUNA Solution - 3D Vis Integration */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
           <div className="mb-20 text-center max-w-3xl mx-auto">
              <span className="text-plum-primary font-bold tracking-widest uppercase text-sm mb-4 block">The Solution</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-black-primary mb-6">
                Targeted Precision
              </h2>
              <p className="text-xl text-black-soft font-light">
                FemLUNA utilizes a novel peptide mechanism to selectively bind to endometriotic tissue, highlighting even the smallest lesions.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Side */}
              <div className="lg:col-span-5 space-y-12">
                 <div className="group">
                    <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3 group-hover:text-plum-primary transition-colors">
                      <Target className="text-gold-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" /> Selective Uptake
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-6 group-hover:border-gold-primary transition-colors">
                      Absorbed only by endometriotic lesions, ignoring healthy tissue. This selectivity allows for high-contrast imaging without background noise.
                    </p>
                 </div>
                 
                 <div className="group">
                    <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3 group-hover:text-plum-primary transition-colors">
                      <Scan className="text-gold-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" /> Lesion-Level Clarity
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-6 group-hover:border-gold-primary transition-colors">
                      Identifies location, severity, and organ involvement (bowel, ovary, diaphragm) before a scalpel ever touches skin.
                    </p>
                 </div>

                 <div className="group">
                    <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3 group-hover:text-plum-primary transition-colors">
                      <CheckCircle2 className="text-gold-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" /> Non-Invasive
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-6 group-hover:border-gold-primary transition-colors">
                      Replaces exploratory surgery with a simple imaging procedure, reducing risk and recovery time for patients.
                    </p>
                 </div>
              </div>

              {/* Visual Side - Reusing Mechanism Component */}
              <div className="lg:col-span-7 h-[280px] sm:h-[350px] md:h-[600px] relative">
                <div className="absolute inset-0 bg-gray-50 rounded-xl transform rotate-2 scale-[0.98] -z-10" />
                <div className="h-full w-full shadow-2xl rounded-xl overflow-hidden border border-gray-100">
                   <Scene4_SelectiveUptake />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Clinical Impact Grid */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-black-primary max-w-xl">
              Changing the Clinical Picture
            </h2>
            <p className="text-gray-500 max-w-md mt-6 md:mt-0 text-lg font-light">
              Better imaging leads to better decisions. FemLUNA empowers physicians and patients alike.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { title: "Earlier Diagnosis", desc: "Detects disease years earlier than current standards.", color: "bg-plum-primary text-white" },
              { title: "Surgical Planning", desc: "Surgeons know exactly where to cut, reducing incomplete removals.", color: "bg-white text-black-primary" },
              { title: "Fertility Preservation", desc: "Avoids unnecessary damage to healthy reproductive tissue.", color: "bg-white text-black-primary" },
              { title: "Treatment Monitoring", desc: "Track disease progression or regression non-invasively.", color: "bg-white text-black-primary" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className={`p-8 rounded-xl h-64 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 ${card.color} ${card.color.includes('bg-white') ? 'border border-gray-200 hover:border-gold-primary/30 hover:shadow-[0_12px_40px_rgba(201,169,97,0.1)]' : 'hover:shadow-[0_12px_40px_rgba(74,63,92,0.25)]'}`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-full transition-transform duration-300 group-hover:scale-110 ${card.color.includes('plum') ? 'bg-white/10' : 'bg-gray-100 group-hover:bg-gold-primary/10'}`}>
                     <Target size={24} className={card.color.includes('plum') ? 'text-gold-primary' : 'text-black-primary'} />
                  </div>
                  <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${card.color.includes('plum') ? 'text-white' : 'text-black-primary'}`} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${card.color.includes('plum') ? 'text-gray-300' : 'text-gray-500'}`}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
