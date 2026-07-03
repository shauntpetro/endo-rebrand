"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DitherOverlay } from "@/components/DitherOverlay";
import { Scan, Eye, Target, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DotGrid } from "@/components/ui/DotGrid";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const Scene4_SelectiveUptake = dynamic(
  () => import("@/components/mechanism/Scene4_SelectiveUptake").then(m => m.Scene4_SelectiveUptake),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-bone-raised to-bone rounded-xl">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 animate-pulse" />
      </div>
    ),
  }
);

export default function ImagingPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

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
    <main className="min-h-screen bg-surface flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* Immersive Hero Section — luminous cream, monumental serif */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 34%, rgba(201,169,97,0.18), transparent 62%), linear-gradient(180deg, #FAF6EC, #F4EEE1 64%)",
        }}
      >
        <DotGrid />
        <DitherOverlay />

        {/* Warm ambient light — static, blurred (CSS-only, no JS loop) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/20 rounded-full blur-[110px]" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-clinical-teal/12 rounded-full blur-[90px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] bg-plum-primary/[0.06] rounded-full blur-[130px]" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }}
            className="max-w-5xl mx-auto text-center will-change-[transform,opacity]"
          >
            <span
              className="reveal-rise inline-block py-1.5 px-4 border border-gold-primary/40 rounded-full mb-8 bg-bone-raised/60 backdrop-blur-sm"
              style={{ animationDelay: "0.05s" }}
            >
              <Eyebrow>FemLUNA Imaging Platform</Eyebrow>
            </span>
            <h1
              className="reveal-rise text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-[0.9] mb-8 text-plum-dark text-balance"
              style={{ animationDelay: "0.15s" }}
            >
              Seeing the <br />
              <span className="text-gold-deep italic">Undetectable</span>
            </h1>

            <p
              className="reveal-rise text-xl md:text-2xl text-black-soft font-light leading-relaxed max-w-2xl mx-auto mb-12"
              style={{ animationDelay: "0.3s" }}
            >
              Turning the invisible visible. The first non-invasive, high-fidelity visualization of endometriotic lesions.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator — JS loop gated behind reduced motion */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-plum-primary/80"
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={reduced ? { duration: 0 } : { duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-plum-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Comparison Slider — dark clinical figure, overlapping the hero */}
      <section className="relative z-30 -mt-24 pb-24 px-6">
        <div className="container mx-auto">
          <div className="reveal-rise max-w-6xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-plum-dark/10 ring-1 ring-black/5 bg-plum-dark">
            <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] w-full cursor-col-resize group"
                 ref={containerRef}
                 role="slider"
                 aria-label="Compare Standard MRI and FemLUNA Enhanced imaging"
                 aria-valuemin={0}
                 aria-valuemax={100}
                 aria-valuenow={Math.round(sliderPosition)}
                 aria-valuetext={`${Math.round(sliderPosition)}% Standard MRI, ${100 - Math.round(sliderPosition)}% FemLUNA Enhanced`}
                 aria-orientation="horizontal"
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
                  <div className="absolute top-[78%] left-[37%] w-2 h-2 md:w-3 md:h-3 bg-gold-primary rounded-full shadow-[0_0_25px_#C9A961] animate-pulse" />
                  {/* Posterior lesion (0.8mm) - near rectum, back of pelvis - larger */}
                  <div className="absolute bottom-[38%] right-[28%] w-3 h-3 md:w-5 md:h-5 bg-gold-primary rounded-full shadow-[0_0_40px_#C9A961] animate-pulse delay-100" />

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
                  <div className="absolute inset-0 bg-[url('/standard-mri.webp')] bg-cover bg-center opacity-[0.7] grayscale scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/60 backdrop-blur px-4 py-2 text-zinc-300 font-mono text-xs uppercase tracking-widest border border-zinc-800">No Signal</span>
                  </div>
              </div>

              {/* Slider Handle */}
              <div
                 className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_24px_rgba(201,169,97,0.45)] z-10 pointer-events-none"
                 style={{ left: `${sliderPosition}%` }}
              >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-xl ring-1 ring-gold-primary/40 flex items-center justify-center cursor-col-resize hover:scale-110 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-plum-primary" aria-hidden="true">
                       <path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                 </div>
                 {/* Soft pulse ring */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-gold-primary/30 animate-ping pointer-events-none" />
              </div>

              {/* Labels */}
              <div className="absolute top-6 left-6 text-xs font-bold text-white/85 uppercase tracking-[0.2em] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">Standard MRI</div>
              <div className="absolute top-6 right-6 text-xs font-bold text-gold-primary uppercase tracking-[0.2em]">FemLUNA Enhanced</div>
            </div>
          </div>

          <div className="reveal-rise flex justify-center gap-8 mt-8 text-sm font-medium text-plum-primary" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 hover:text-gold-deep transition-colors">
               <Scan size={16} aria-hidden="true" /> <span>Non-Invasive Detection</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gold-deep transition-colors">
               <Eye size={16} aria-hidden="true" /> <span>Sub-mm Detection</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Diagnostic Gap — plum-dark cinematic beat */}
      <section className="py-32 bg-plum-dark text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('/cubes.webp')] mix-blend-overlay" />
        {/* One warm luminous accent */}
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(201,169,97,0.12) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="reveal-rise block mb-4" style={{ animationDelay: "0.05s" }}>
                <Eyebrow tone="gold-on-dark">The Current Standard Fails</Eyebrow>
              </span>
              <h2
                className="reveal-rise text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight text-balance"
                style={{ animationDelay: "0.15s" }}
              >
                Diagnosis should start with <span className="text-gold-primary italic">answers</span>, not surgery.
              </h2>
              <p className="reveal-rise text-xl text-white/70 font-light leading-relaxed mb-4" style={{ animationDelay: "0.25s" }}>
                Exploratory surgery is currently the only definitive way to diagnose endometriosis. It is invasive, expensive, and often inconclusive.
              </p>
              <p className="reveal-rise text-base text-white/50 font-light leading-relaxed mb-8" style={{ animationDelay: "0.32s" }}>
                Conventional MRI agents based on heavy metals cannot visualize fibrotic or superficial subtypes, which account for more than 80% of disease burden. Ultrasound is highly operator-dependent, and many lesions involving the bowel, bladder, or deep pelvic structures are impossible to detect.
              </p>

              <div className="grid grid-cols-1 gap-6 mt-12">
                {[
                  { title: "Diagnostic Limbo", desc: "Blood & saliva tests lack actionable lesion data." },
                  { title: "Surgical Uncertainty", desc: "Exploratory procedures often miss hidden lesions." },
                  { title: "Delayed Care", desc: "8-year average diagnostic delay." }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="reveal-rise flex items-start gap-4 border-l border-white/15 pl-6 py-2 hover:border-coral-primary transition-colors duration-300"
                    style={{ animationDelay: `${0.4 + i * 0.12}s` }}
                  >
                    <AlertCircle className="text-coral-primary shrink-0 mt-1" size={20} aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="reveal-rise bg-white/[0.04] p-12 rounded-2xl border border-white/10 backdrop-blur-sm text-center relative overflow-hidden group hover:border-gold-primary/30 transition-colors duration-500" style={{ animationDelay: "0.2s" }}>
                <div className="text-9xl font-serif font-bold text-white mb-4 relative z-10 tabular-nums">
                  1<span className="text-white/40 text-7xl">/</span>3
                </div>
                <p className="text-2xl text-white/80 font-light max-w-xs mx-auto relative z-10">
                  women leave surgery <span className="text-coral-primary font-medium">without</span> a diagnosis.
                </p>
                <div className="mt-8 text-sm text-white/60 uppercase tracking-widest">
                  Misdiagnosis Rate
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-white/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Recurrence Insight — luminous editorial pull-quote */}
      <section
        className="py-24 relative border-b border-plum-dark/10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(201,169,97,0.10), transparent 62%), #F4EEE1",
        }}
      >
        <DotGrid />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <blockquote className="reveal-rise text-2xl md:text-3xl font-serif text-plum-dark leading-relaxed italic text-balance" style={{ animationDelay: "0.1s" }}>
            Most recurrences happen not because the disease is uncontrollable, but because the original lesions were never fully removed. FemLUNA is not just an imaging agent. It is a clinical roadmap.
          </blockquote>
        </div>
      </section>

      {/* The FemLUNA Solution — mechanism figure on warm bone */}
      <section className="py-32 bg-bone-raised relative">
        <div className="container mx-auto px-6">
           <div className="mb-20 text-center max-w-3xl mx-auto">
              <span className="reveal-rise block mb-4" style={{ animationDelay: "0.05s" }}>
                <Eyebrow tone="plum">The Solution</Eyebrow>
              </span>
              <h2 className="reveal-rise text-5xl md:text-7xl font-serif font-bold text-plum-dark mb-6 text-balance" style={{ animationDelay: "0.15s" }}>
                Targeted Precision
              </h2>
              <p className="reveal-rise text-xl text-black-soft font-light" style={{ animationDelay: "0.25s" }}>
                FemLUNA utilizes a novel peptide mechanism to selectively bind to endometriotic tissue, highlighting even the smallest lesions.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Side */}
              <div className="lg:col-span-5 space-y-12">
                 {[
                   { Icon: Target, title: "Selective Uptake", desc: "Absorbed only by endometriotic lesions, ignoring healthy tissue. This selectivity allows for high-contrast imaging without background noise." },
                   { Icon: Scan, title: "Lesion-Level Clarity", desc: "Identifies location, severity, and organ involvement (bowel, ovary, diaphragm) before a scalpel ever touches skin." },
                   { Icon: CheckCircle2, title: "Non-Invasive", desc: "Replaces exploratory surgery with a simple imaging procedure, reducing risk and recovery time for patients." },
                 ].map(({ Icon, title, desc }, i) => (
                   <div className="reveal-rise group" key={title} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                      <h3 className="text-2xl font-serif font-bold text-plum-dark mb-4 flex items-center gap-3 group-hover:text-plum-primary transition-colors">
                        <Icon className="text-gold-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" /> {title}
                      </h3>
                      <p className="text-lg text-black-soft leading-relaxed border-l-2 border-plum-dark/10 pl-6 group-hover:border-gold-primary transition-colors">
                        {desc}
                      </p>
                   </div>
                 ))}
              </div>

              {/* Visual Side - Reusing Mechanism Component */}
              <div className="lg:col-span-7 h-[280px] sm:h-[350px] md:h-[600px] relative">
                <div className="absolute inset-0 bg-bone rounded-xl transform rotate-2 scale-[0.98] -z-10" />
                <div
                  className="h-full w-full shadow-2xl rounded-xl overflow-hidden border border-plum-dark/10"
                  role="img"
                  aria-label="Animated visualization of selective uptake: FemLUNA peptides binding to endometriotic lesion tissue while ignoring healthy tissue"
                >
                   <Scene4_SelectiveUptake />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Clinical Impact Grid — warm bone ground, hairline cards */}
      <section className="py-32 bg-surface border-t border-plum-dark/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="reveal-rise text-4xl md:text-6xl font-serif font-bold text-plum-dark max-w-xl text-balance" style={{ animationDelay: "0.05s" }}>
              Changing the Clinical Picture
            </h2>
            <p className="reveal-rise text-black-soft max-w-md mt-6 md:mt-0 text-lg font-light" style={{ animationDelay: "0.15s" }}>
              Better imaging leads to better decisions. FemLUNA empowers physicians and patients alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Earlier Diagnosis", desc: "Detects disease years earlier than current standards.", dark: true },
              { title: "Surgical Planning", desc: "Surgeons know exactly where to cut, reducing incomplete removals.", dark: false },
              { title: "Fertility Preservation", desc: "Avoids unnecessary damage to healthy reproductive tissue.", dark: false },
              { title: "Treatment Monitoring", desc: "Track disease progression or regression non-invasively.", dark: false }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`reveal-rise p-8 rounded-xl h-64 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 ${
                  card.dark
                    ? "bg-plum-dark text-white hover:shadow-[0_12px_40px_rgba(46,38,58,0.3)]"
                    : "bg-bone-raised text-plum-dark border border-plum-dark/10 hover:border-gold-primary/40 hover:shadow-[0_12px_40px_rgba(201,169,97,0.12)]"
                }`}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-full transition-transform duration-300 group-hover:scale-110 ${card.dark ? "bg-white/10" : "bg-gold-primary/10 group-hover:bg-gold-primary/20"}`}>
                     <Target size={24} className={card.dark ? "text-gold-primary" : "text-gold-deep"} aria-hidden="true" />
                  </div>
                  <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${card.dark ? "text-white" : "text-plum-dark"}`} aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${card.dark ? "text-white/60" : "text-black-soft"}`}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
