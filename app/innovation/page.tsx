"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import clsx from "clsx";
import CanvasErrorBoundary from "@/components/CanvasErrorBoundary";
import { STEPS } from "@/components/mechanism/constants";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import Link from "next/link";
import SuppressionCorrection from "@/components/SuppressionCorrection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MechanismCanvas = dynamic(
  () => import("@/components/mechanism/MechanismCanvas").then(m => m.MechanismCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-b from-bone-raised to-bone rounded-xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-primary/30 to-gold-primary/10 animate-pulse" />
      </div>
    ),
  }
);

const EfficacyGraph = dynamic(
  () => import("@/components/mechanism/EfficacyGraph").then(m => m.EfficacyGraph),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center bg-bone-raised rounded-xl border border-plum-dark/10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 animate-pulse" />
      </div>
    ),
  }
);

export default function InnovationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(97);
  // Render a SINGLE MechanismCanvas responsively so only one R3F tree ticks at a
  // time. `isDesktop` decides which layout slot the canvas mounts into; the other
  // slot renders no canvas, so the two React trees never run simultaneously.
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mechanismWrapperRef = useRef<HTMLDivElement>(null);
  const mechanismEndRef = useRef<HTMLDivElement>(null);
  const mechanismInView = useInView(mechanismWrapperRef, { margin: "0px" });
  const mechanismEndInView = useInView(mechanismEndRef, { margin: "200px 0px 0px 0px" });
  const showStepper = mechanismInView && !mechanismEndInView;
  const sliderRef = useRef(null);
  const sliderInView = useInView(sliderRef, { margin: "200px" });
  const animateSlider = sliderInView && !reduced;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  // Improved scroll detection using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when element is in middle 20% of viewport
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setActiveStep(index);
                }
            }
        });
    }, observerOptions);

    const currentSteps = stepsRef.current;
    currentSteps.forEach(step => {
        if (step) observer.observe(step);
    });

    return () => {
        currentSteps.forEach(step => {
            if (step) observer.unobserve(step);
        });
    };
  }, []);

  const scrollToStep = (index: number) => {
    const element = document.getElementById(`step-${index}`);
    if (element) {
        const offset = window.innerHeight / 2 - element.offsetHeight / 2;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
  };

  // Warm bone / bone-raised beats that breathe as you move through the mechanism.
  const bgColors = [
      'rgba(250, 246, 236, 1)', // Default / Hero — bone-raised
      'rgba(244, 238, 225, 1)', // Step 1 — bone
      'rgba(250, 246, 236, 1)', // Step 2
      'rgba(244, 238, 225, 1)', // Step 3
      'rgba(250, 246, 236, 1)', // Step 4
      'rgba(244, 238, 225, 1)'  // Step 5
  ];

  return (
    <motion.main
        className="min-h-screen flex flex-col font-sans transition-colors duration-500"
        animate={{ backgroundColor: bgColors[activeStep + 1] || bgColors[0] }}
    >
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-24 md:pt-40 pb-16 md:pb-24 container mx-auto px-6 relative z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 30%, rgba(201,169,97,0.14), transparent 62%)",
        }}
      >
        <div className="max-w-5xl">
            <div className="reveal-rise mb-6" style={{ animationDelay: "0.05s" }}>
              <Eyebrow>Our Platform</Eyebrow>
            </div>
            <h1
                className="reveal-rise text-6xl md:text-[96px] font-serif font-bold mb-8 tracking-tight text-plum-dark leading-[0.95] text-balance"
                style={{ animationDelay: "0.14s" }}
            >
              Treating the <br />
              <span className="text-gold-primary italic">&ldquo;Untreatable&rdquo;</span>
            </h1>
            <p
                className="reveal-rise text-xl md:text-2xl text-black-soft max-w-3xl leading-relaxed font-light mb-12"
                style={{ animationDelay: "0.26s" }}
            >
              A new frontier in peptide therapeutics and imaging. EndoCyclic&apos;s precision peptides target diseased cells from the inside out, enabling selective uptake, pH-sensitive activation, and direct engagement of intracellular targets.
            </p>
            <div
                className="reveal-rise flex items-center gap-6 text-sm text-plum-dark/60 font-medium"
                style={{ animationDelay: "0.38s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-clinical-teal" />
                <span>IND Cleared</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                <span>5-Step Mechanism</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-plum-primary" />
                <span>Non-Hormonal</span>
              </div>
            </div>
        </div>

        {/* Scroll hint — visible in static state; bounce freezes under reduced motion */}
        <div className="reveal-rise flex flex-col items-center mt-12" style={{ animationDelay: "0.52s" }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-plum-dark/40 mb-3">Explore the mechanism</span>
          <motion.div
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={reduced ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-gold-deep" />
          </motion.div>
        </div>
      </section>

      {/* Wrapper for Sticky Elements */}
      <div className="relative" ref={mechanismWrapperRef}>
          {/* Step Progress Bar - Sticky within this wrapper */}
          <motion.section
            className="sticky z-30 backdrop-blur-md border-b border-plum-dark/10 hidden md:block"
            style={{ top: navbarHeight }}
            animate={{ opacity: showStepper ? 1 : 0, pointerEvents: showStepper ? "auto" as const : "none" as const }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
                className="absolute inset-0 -z-10 opacity-90"
                animate={{ backgroundColor: bgColors[activeStep + 1] || bgColors[0] }}
            />

            <div className="relative flex justify-between items-start max-w-5xl mx-auto py-3 px-6">
                {/* Progress Line */}
                <div className="absolute top-[34px] left-[40px] right-[40px] h-0.5 bg-plum-dark/10 -z-10">
                    <motion.div
                        className="h-full w-full bg-gradient-to-r from-gold-primary to-gold-dark origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: (activeStep) / (STEPS.length - 1) }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </div>

                {STEPS.map((step, index) => (
                    <div
                        key={step.id}
                        onClick={() => scrollToStep(index)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Go to step ${index + 1}: ${step.title}`}
                        aria-current={activeStep === index ? "step" : undefined}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollToStep(index); } }}
                        className={clsx(
                            "flex flex-col items-center gap-2 cursor-pointer group relative z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-full",
                            activeStep >= index ? "text-gold-deep" : "text-plum-dark/40"
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-[2px] transition-all duration-500",
                            activeStep === index
                                ? "border-gold-primary bg-gold-primary text-white scale-110 shadow-gold-glow-sm"
                                : activeStep > index
                                    ? "border-plum-dark bg-plum-dark text-gold-primary"
                                    : "border-plum-dark/25 bg-bone-raised text-plum-dark/30"
                        )}>
                            {index + 1}
                        </div>
                        <span className={clsx(
                            "text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 hidden md:block text-center max-w-[100px] leading-tight",
                            activeStep === index ? "text-gold-deep" : "text-plum-dark/40"
                        )}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
          </motion.section>

          {/* Scroll-telling Section */}
          <div className="relative pb-16 pt-8 md:pt-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Mobile Visual (shown only on mobile) — single canvas, mounts only when NOT desktop */}
                <div className="lg:hidden relative mb-8">
                  <div className="aspect-[4/3] w-full rounded-xl shadow-lg shadow-plum-dark/10 border border-plum-dark/10 bg-bone-raised overflow-hidden">
                    {!isDesktop && (
                      <CanvasErrorBoundary><MechanismCanvas currentStep={activeStep + 1} autoPlay={false} /></CanvasErrorBoundary>
                    )}
                  </div>
                </div>

                {/* Sticky Visual (Left — Desktop) — single canvas, mounts only when desktop */}
                <div className="hidden lg:block relative">
                  <div className="sticky top-[230px] h-[min(520px,calc(100vh-260px))] w-full rounded-2xl shadow-2xl shadow-plum-dark/10 border border-plum-dark/10 bg-bone-raised overflow-hidden transition-all duration-500">
                    <div className="w-full h-full">
                      {isDesktop && (
                        <CanvasErrorBoundary><MechanismCanvas currentStep={activeStep + 1} autoPlay={false} /></CanvasErrorBoundary>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scrollable Content (Right) */}
                <div className="py-12 lg:py-0 relative">
                  {/* Navigation Helpers — only visible during mechanism steps */}
                  <motion.div
                    className="fixed right-6 bottom-24 z-50 flex flex-col gap-2 text-plum-dark hover:opacity-100 transition-opacity"
                    animate={{ opacity: showStepper ? 0.7 : 0, pointerEvents: showStepper ? "auto" as const : "none" as const }}
                    transition={{ duration: 0.3 }}
                  >
                      <button
                        onClick={() => activeStep > 0 && scrollToStep(activeStep - 1)}
                        disabled={activeStep === 0}
                        aria-label="Previous step"
                        className="p-3 rounded-full border border-plum-dark/15 bg-bone-raised/70 hover:bg-bone-raised shadow-sm disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                      >
                          <ChevronUp size={20} />
                      </button>
                      <button
                        onClick={() => activeStep < STEPS.length - 1 && scrollToStep(activeStep + 1)}
                        disabled={activeStep === STEPS.length - 1}
                        aria-label="Next step"
                        className="p-3 rounded-full border border-plum-dark/15 bg-bone-raised/70 hover:bg-bone-raised shadow-sm disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                      >
                          <ChevronDown size={20} />
                      </button>
                  </motion.div>

                  {STEPS.map((step, index) => (
                    <ScrollStep
                      key={step.id}
                      step={step}
                      index={index}
                      isActive={activeStep === index}
                      reduced={reduced}
                      // Remove manual onActive, use IntersectionObserver logic above
                      ref={(el: HTMLDivElement | null) => { stepsRef.current[index] = el; }}
                    />
                  ))}
                  {/* Sentinel to detect end of scroll-telling */}
                  <div ref={mechanismEndRef} className="h-px" />
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Mechanism Summary Bridge */}
      <section className="py-20 bg-gradient-to-b from-bone-raised to-bone relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="mb-6 block">The Complete Mechanism</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum-dark mb-10 text-balance">Five Layers of Precision</h2>

            {/* Horizontal step summary */}
            <div className="grid grid-cols-5 gap-2 max-w-3xl mx-auto">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark flex items-center justify-center text-white font-bold text-sm mb-2 shadow-md shadow-gold-primary/20">
                    {index + 1}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-plum-dark/70 leading-tight text-center">
                    {step.title}
                  </span>
                </motion.div>
              ))}
              {/* Connecting line behind circles */}
              <div className="col-span-5 -mt-[52px] md:-mt-[56px] mx-auto w-[calc(100%-60px)] h-px bg-gradient-to-r from-gold-primary/20 via-gold-primary/50 to-gold-primary/20 pointer-events-none relative z-[-1]" />
            </div>

            <motion.p
              className="text-lg text-black-soft font-light mt-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Together, these five layers are designed to concentrate therapeutic activity at the site of disease — the foundation of our precision approach.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SuppressionCorrection />

      {/* CEO Quote Section — deliberate plum-dark cinematic beat */}
      <section className="py-24 bg-plum-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.8, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="w-12 h-12 text-gold-primary mx-auto mb-8" />
                </motion.div>
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-5xl font-serif font-light leading-tight mb-12 text-balance"
                >
                    &ldquo;We aim to end the era of blanket, cytotoxic compounds and usher in a new class of targeted, non-hormonal therapeutics.&rdquo;
                </motion.blockquote>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                    <div className="relative w-16 h-16 rounded-full bg-plum-primary mb-4 overflow-hidden border-2 border-gold-primary">
                         <Image
                            src="/team/tanya-petrossian.avif"
                            alt="Dr. Tanya Petrossian"
                            fill
                            sizes="64px"
                            className="object-cover"
                         />
                    </div>
                    <cite className="not-italic">
                        <div className="text-lg font-bold text-white">Dr. Tanya Petrossian</div>
                        <div className="text-sm text-gold-primary uppercase tracking-widest">CEO, Founder, and Inventor</div>
                    </cite>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-12"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 border-2 border-gold-primary text-gold-primary font-bold uppercase tracking-widest text-sm hover:bg-gold-primary hover:text-plum-dark transition-all duration-300 rounded-xl"
                  >
                    Explore a Partnership
                  </Link>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Tuned For Purpose */}
      <section className="py-24 bg-bone-raised">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                      <Eyebrow tone="plum" className="mb-6 block">Platform Flexibility</Eyebrow>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum-dark mb-8 text-balance">Tuned for Purpose</h2>
                      <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                          EndoCyclic&apos;s peptide platform allows for precise control over how long each peptide remains active. Diagnostic agents are designed to clear quickly after delivering their signal, while therapeutic peptides are optimized for longer residence in diseased tissue to sustain their effect.
                      </p>
                      <div className="p-5 rounded-lg bg-gradient-to-r from-gold-primary/12 to-transparent border-l-[3px] border-gold-primary my-8">
                          <p className="text-lg font-serif font-medium italic leading-relaxed text-plum-dark/80">
                            &ldquo;The same core chemistry can be used for two entirely different applications. It&apos;s just a matter of tuning how long it stays and what it&apos;s meant to do.&rdquo;
                          </p>
                      </div>
                  </motion.div>
                  <motion.div
                    ref={sliderRef}
                    className="bg-bone rounded-xl p-8 md:p-12 border border-plum-dark/10 relative overflow-hidden min-h-[400px] flex flex-col justify-center"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                        {/* Title */}
                        <div className="text-center mb-10">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-plum-dark/40">Residence Time Spectrum</span>
                        </div>

                        {/* Spectrum bar */}
                        <div className="relative mx-auto w-full max-w-sm">
                          {/* Gradient track */}
                          <div className="h-3 rounded-full bg-gradient-to-r from-clinical-teal via-gold-primary to-plum-primary opacity-90" />

                          {/* Animated slider thumb — freezes under reduced motion */}
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-bone-raised rounded-full shadow-lg border-[3px] border-gold-primary z-10 will-change-[left]"
                            animate={animateSlider ? { left: ["10%", "90%", "10%"] } : undefined}
                            transition={animateSlider ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                          />

                          {/* Tick marks */}
                          <div className="flex justify-between mt-4 px-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-px h-2 bg-plum-dark/20" />
                            ))}
                          </div>
                        </div>

                        {/* Labels */}
                        <div className="flex justify-between items-start mt-6 mx-auto w-full max-w-sm">
                          <div className="flex flex-col items-center text-center max-w-[120px]">
                            <div className="w-11 h-11 rounded-full bg-clinical-teal/10 border-2 border-clinical-teal flex items-center justify-center mb-2">
                              <svg className="w-5 h-5 text-clinical-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-clinical-teal">Diagnostic</span>
                            <span className="text-[10px] text-plum-dark/40 mt-1 leading-tight">Rapid clearance<br />Signal &amp; release</span>
                          </div>
                          <div className="flex flex-col items-center text-center max-w-[120px]">
                            <div className="w-11 h-11 rounded-full bg-plum-primary/10 border-2 border-plum-primary flex items-center justify-center mb-2">
                              <svg className="w-5 h-5 text-plum-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-plum-primary">Therapeutic</span>
                            <span className="text-[10px] text-plum-dark/40 mt-1 leading-tight">Sustained presence<br />Engage &amp; correct</span>
                          </div>
                        </div>

                        {/* Product labels */}
                        <div className="flex justify-between items-center mt-8 mx-auto w-full max-w-sm px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-clinical-teal" />
                            <span className="text-[11px] font-bold text-plum-dark/70">FemLUNA&trade;</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-plum-primary" />
                            <span className="text-[11px] font-bold text-plum-dark/70">ENDO-205</span>
                          </div>
                        </div>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* A New Approach Section */}
      <section className="py-24 bg-cream-primary relative overflow-hidden">

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Eyebrow className="mb-4 block">Beyond Targeted Delivery</Eyebrow>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum-dark mb-10 text-balance">A New Approach to Chronic Disease</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                            Every person carries cells that could one day become abnormal. Pre-endometriotic, pre-cancerous, pre-fibrotic. The difference is often whether the body notices and clears them.
                        </p>
                        <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                            Our peptides help restore that surveillance system. They&apos;re not forcing the body to do something unnatural. They&apos;re helping it recognize what&apos;s out of place and respond appropriately.
                        </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="bg-bone-raised p-8 rounded-xl border border-gold-primary/25 shadow-lg shadow-plum-dark/5">
                            <p className="text-xl italic font-serif text-plum-dark mb-6">
                                &ldquo;We&apos;ve seen peptides do amazing things, drugs like Ozempic and Wegovy have transformed how we treat metabolic disease. Now we&apos;re using that same power to take on endometriosis.&rdquo;
                            </p>
                            <div className="flex items-center gap-2 text-sm font-bold text-gold-deep uppercase tracking-widest">
                                <span className="w-8 h-[1px] bg-gold-primary" />
                                Dr. Tanya Petrossian
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Efficacy Graph / Programs */}
      <section className="py-24 bg-bone relative overflow-hidden">

        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow tone="plum" className="mb-4 block">Preclinical Evidence</Eyebrow>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum-dark mb-6 text-balance">Programs in Development</h2>
              <p className="text-xl text-black-soft max-w-2xl mx-auto font-light">
                  Guided by the same precision-based design, we are advancing a new generation of targeted peptide medicines.
              </p>
            </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <CanvasErrorBoundary><EfficacyGraph /></CanvasErrorBoundary>
            </motion.div>
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Link
                    href="/pipeline"
                    className="inline-flex items-center px-8 py-4 bg-plum-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-gold-primary transition-colors duration-300 rounded-xl shadow-lg shadow-plum-primary/20 hover:shadow-gold-primary/20"
                >
                    View Full Pipeline
                </Link>
            </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}

function ScrollStep({ step, index, isActive, reduced, ref }: { step: { id: number; title: string; description: string; detail: string }, index: number, isActive: boolean, reduced: boolean, ref: React.RefCallback<HTMLDivElement | null> }) {

  return (
    <div
      id={`step-${index}`}
      ref={ref}
      data-index={index}
      className="min-h-[100vh] relative scroll-mt-48"
    >
      {/* Sticky inner content that locks to viewport while scrolling through this step */}
      <div className="sticky top-[230px]">
        <motion.div
          className={clsx(
            "flex flex-col justify-center p-6 pl-10 border-l-2 transition-all duration-500",
            isActive ? "border-gold-primary" : "border-plum-dark/15"
          )}
          initial={{ opacity: 0.3, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-20% 0px -20% 0px" }}
        >
          {/* Step number with decorative dot */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              className="w-2 h-2 rounded-full transition-colors duration-500"
              animate={{
                backgroundColor: isActive ? "var(--color-gold-primary)" : "#C9B8A8",
                scale: isActive && !reduced ? [1, 1.3, 1] : 1,
              }}
              transition={{ scale: { duration: 2, repeat: isActive && !reduced ? Infinity : 0, ease: "easeInOut" } }}
            />
            <span className={clsx(
              "font-sans text-sm font-bold uppercase tracking-[3px] transition-colors duration-500",
              isActive ? "text-gold-deep" : "text-plum-dark/40"
            )}>
              STEP 0{index + 1}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={clsx(
              "text-3xl md:text-[44px] font-serif font-bold mb-6 leading-[1.1] transition-colors duration-500 text-balance",
              isActive ? "text-plum-dark" : "text-plum-dark/35"
            )}
          >
            {step.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg leading-[1.8] font-light mb-8 transition-colors duration-500 text-black-soft"
          >
            {step.description}
          </motion.p>

          {/* Pull-quote callout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={clsx(
              "p-5 rounded-lg transition-all duration-500 border-l-[3px]",
              isActive
                ? "bg-gradient-to-r from-gold-primary/12 to-transparent border-gold-primary"
                : "bg-transparent border-transparent"
            )}
          >
              <p className="text-lg md:text-xl font-serif font-medium italic leading-relaxed text-plum-dark/80">
                &ldquo;{step.detail}&rdquo;
              </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
