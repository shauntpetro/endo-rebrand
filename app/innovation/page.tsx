"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { MechanismCanvas } from "@/components/mechanism/MechanismCanvas";
import { EfficacyGraph } from "@/components/mechanism/EfficacyGraph";
import { STEPS } from "@/components/mechanism/constants";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import Link from "next/link";

export default function InnovationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(97); 
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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

    stepsRef.current.forEach(step => {
        if (step) observer.observe(step);
    });

    return () => {
        stepsRef.current.forEach(step => {
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

  const bgColors = [
      'rgba(250, 250, 250, 1)', // Default/Hero
      'rgba(245, 241, 232, 1)', // Step 1
      'rgba(248, 248, 250, 1)', // Step 2
      'rgba(255, 255, 255, 1)', // Step 3
      'rgba(252, 248, 250, 1)', // Step 4
      'rgba(255, 255, 255, 1)'  // Step 5
  ];

  return (
    <motion.main 
        className="min-h-screen flex flex-col font-sans transition-colors duration-1000"
        animate={{ backgroundColor: bgColors[activeStep + 1] || bgColors[0] }}
    >
      <Navbar />
      
      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-20 container mx-auto px-6 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
        >
            <h1 className="text-6xl md:text-[96px] font-serif font-bold mb-8 tracking-tight text-black-primary leading-[0.95]">
              Treating the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-dark italic">"Untreatable"</span>
            </h1>
            <p className="text-xl md:text-2xl text-black-soft max-w-3xl leading-relaxed font-light mb-12">
              A new frontier in peptide therapeutics and imaging. EndoCyclic’s precision peptides target diseased cells from the inside out, enabling selective uptake, pH-sensitive activation, and direct engagement of intracellular targets.
            </p>
        </motion.div>
      </section>

      {/* Wrapper for Sticky Elements */}
      <div className="relative">
          {/* Step Progress Bar - Sticky within this wrapper */}
          <motion.section 
            className="sticky z-30 backdrop-blur-md border-b border-black-primary/5 hidden md:block"
            style={{ top: navbarHeight }}
          >
            <motion.div 
                className="absolute inset-0 -z-10"
                animate={{ backgroundColor: bgColors[activeStep + 1] || bgColors[0] }}
                style={{ opacity: 0.9 }}
            />
            
            <div className="relative flex justify-between items-start max-w-5xl mx-auto py-6 px-6">
                {/* Progress Line */}
                <div className="absolute top-[42px] left-[40px] right-[40px] h-0.5 bg-gray-200 -z-10">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-gold-primary to-gold-active"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeStep) / (STEPS.length - 1) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </div>

                {STEPS.map((step, index) => (
                    <div 
                        key={step.id}
                        onClick={() => scrollToStep(index)}
                        className={clsx(
                            "flex flex-col items-center gap-2 cursor-pointer group relative z-10",
                            activeStep >= index ? "text-gold-primary" : "text-gray-400"
                        )}
                    >
                        <div className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-[2px] transition-all duration-500",
                            activeStep === index 
                                ? "border-gold-primary bg-gold-primary text-white scale-110 shadow-lg" 
                                : activeStep > index 
                                    ? "border-black-primary bg-black-primary text-gold-primary"
                                    : "border-gray-300 bg-white text-gray-300"
                        )}>
                            {index + 1}
                        </div>
                        <span className={clsx(
                            "text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 hidden md:block text-center max-w-[120px]",
                            activeStep === index ? "text-gold-primary" : "text-gray-400"
                        )}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
          </motion.section>

          {/* Scroll-telling Section */}
          <div className="relative pb-32 pt-12 md:pt-24">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Sticky Visual (Left) */}
                <div className="hidden lg:block relative">
                  <div className="sticky top-64 h-[600px] w-full rounded-3xl shadow-2xl border border-gray-mid bg-white overflow-hidden transition-all duration-500">
                    {/* The Interactive Mechanism Canvas */}
                    <div className="w-full h-full">
                      <MechanismCanvas currentStep={activeStep + 1} autoPlay={false} />
                    </div>
                  </div>
                </div>

                {/* Scrollable Content (Right) */}
                <div className="py-12 lg:py-0 relative">
                  {/* Navigation Helpers */}
                  <div className="fixed right-6 bottom-12 z-50 flex flex-col gap-2 mix-blend-multiply text-black-primary opacity-50 hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => activeStep > 0 && scrollToStep(activeStep - 1)}
                        disabled={activeStep === 0}
                        className="p-3 rounded-full border border-black-primary/20 bg-white/50 hover:bg-white shadow-sm disabled:opacity-30"
                      >
                          <ChevronUp size={20} />
                      </button>
                      <button 
                        onClick={() => activeStep < STEPS.length - 1 && scrollToStep(activeStep + 1)}
                        disabled={activeStep === STEPS.length - 1}
                        className="p-3 rounded-full border border-black-primary/20 bg-white/50 hover:bg-white shadow-sm disabled:opacity-30"
                      >
                          <ChevronDown size={20} />
                      </button>
                  </div>

                  {STEPS.map((step, index) => (
                    <ScrollStep 
                      key={step.id} 
                      step={step} 
                      index={index} 
                      isActive={activeStep === index}
                      // Remove manual onActive, use IntersectionObserver logic above
                      ref={(el: HTMLDivElement | null) => { stepsRef.current[index] = el; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* CEO Quote Section */}
      <section className="py-24 bg-plum-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <Quote className="w-12 h-12 text-gold-primary mx-auto mb-8 opacity-80" />
                <blockquote className="text-3xl md:text-5xl font-serif font-light leading-tight mb-12">
                    "We aim to end the era of blanket, cytotoxic compounds and usher in a new class of targeted, non-hormonal therapeutics."
                </blockquote>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 overflow-hidden border-2 border-gold-primary">
                         <img 
                            src="/team/tanya-placeholder.jpg" 
                            alt="Dr. Tanya Petrossian" 
                            className="w-full h-full object-cover"
                            // Add real image here
                         />
                    </div>
                    <cite className="not-italic">
                        <div className="text-lg font-bold text-white">Dr. Tanya Petrossian</div>
                        <div className="text-sm text-gold-primary uppercase tracking-widest">CEO, Founder, and Inventor</div>
                    </cite>
                </div>
            </div>
        </div>
      </section>

      {/* Tuned For Purpose */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-plum-primary mb-6 block">Platform Flexibility</span>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-black-primary mb-8">Tuned for Purpose</h2>
                      <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                          EndoCyclic’s peptide platform allows for precise control over how long each peptide remains active. Diagnostic agents are designed to clear quickly after delivering their signal, while therapeutic peptides are optimized for longer residence in diseased tissue to sustain their effect.
                      </p>
                      <blockquote className="border-l-4 border-gold-primary pl-6 italic text-gray-600 my-8">
                          "The same core chemistry can be used for two entirely different applications. It’s just a matter of tuning how long it stays and what it’s meant to do."
                      </blockquote>
                  </div>
                  <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100 relative overflow-hidden min-h-[400px] flex items-center justify-center">
                        {/* Abstract Visualization of Tuning */}
                        <div className="relative w-64 h-1 bg-gray-200">
                             <div className="absolute top-1/2 left-0 w-full h-16 -translate-y-1/2 flex justify-between items-center px-4">
                                 <div className="flex flex-col items-center">
                                     <div className="w-12 h-12 rounded-full bg-clinical-teal flex items-center justify-center text-white mb-2">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                     </div>
                                     <span className="text-xs font-bold uppercase text-clinical-teal">Diagnostic</span>
                                 </div>
                                 <div className="flex flex-col items-center">
                                     <div className="w-12 h-12 rounded-full bg-plum-primary flex items-center justify-center text-white mb-2">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                     </div>
                                     <span className="text-xs font-bold uppercase text-plum-primary">Therapeutic</span>
                                 </div>
                             </div>
                             {/* Slider */}
                             <motion.div 
                                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gold-primary rounded-full border-4 border-white shadow-lg"
                                animate={{ left: ["20%", "80%", "20%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                             />
                        </div>
                  </div>
              </div>
          </div>
      </section>

      {/* A New Approach Section */}
      <section className="py-24 bg-cream-primary border-t border-gray-200">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-serif font-bold text-black-primary mb-8">A New Approach to Chronic Disease</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                            Every person carries cells that could one day become abnormal. Pre-endometriotic, pre-cancerous, pre-fibrotic. The difference is often whether the body notices and clears them.
                        </p>
                        <p className="text-lg text-black-soft leading-relaxed mb-6 font-light">
                            Our peptides help restore that surveillance system. They’re not forcing the body to do something unnatural. They’re helping it recognize what’s out of place and respond appropriately.
                        </p>
                    </div>
                    <div>
                        <div className="bg-white p-8 rounded-3xl border border-gold-primary/20 shadow-lg">
                            <p className="text-xl italic font-serif text-plum-dark mb-6">
                                "We’ve seen peptides do amazing things, drugs like Ozempic and Wegovy have transformed how we treat metabolic disease. Now we’re using that same power to take on endometriosis."
                            </p>
                            <div className="flex items-center gap-2 text-sm font-bold text-gold-primary uppercase tracking-widest">
                                <span className="w-8 h-[1px] bg-gold-primary" />
                                Dr. Tanya Petrossian
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Efficacy Graph / Programs */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black-primary mb-6">Programs in Development</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Guided by the same precision-based design, we are advancing a new generation of targeted peptide medicines.
            </p>
        </div>
        
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <EfficacyGraph />
            </div>
            <div className="text-center mt-12">
                <Link 
                    href="/pipeline"
                    className="inline-flex items-center px-8 py-4 bg-plum-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-gold-primary transition-colors duration-300 rounded-sm"
                >
                    View Full Pipeline
                </Link>
            </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}

function ScrollStep({ step, index, isActive, ref }: { step: any, index: number, isActive: boolean, ref: React.RefCallback<HTMLDivElement | null> }) {
  
  // Determine text colors based on background
  const borderColor = isActive ? "border-gold-primary" : "border-gray-200";

  return (
    <motion.div 
      id={`step-${index}`}
      ref={ref}
      data-index={index} // Add data attribute for observer
      className={clsx(
        "min-h-[80vh] flex flex-col justify-center p-8 pl-12 border-l-2 transition-all duration-500 scroll-mt-32",
        borderColor
      )}
      // Removed onViewportEnter
      initial={{ opacity: 0.3, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
    >
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={clsx(
          "font-sans text-sm font-bold uppercase tracking-[3px] mb-6 block transition-colors duration-500",
          isActive ? "text-gold-primary" : "text-gray-400"
        )}
      >
        STEP 0{index + 1}
      </motion.span>
      
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={clsx(
          "text-4xl md:text-[64px] font-serif font-bold mb-8 leading-[1.1] transition-colors duration-500",
          isActive ? "text-black-primary" : "text-gray-400"
        )}
      >
        {step.title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={clsx("text-lg md:text-[20px] leading-[1.7] font-light mb-8 transition-colors duration-500 text-black-soft")}
      >
        {step.description}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={clsx(
          "p-8 transition-all duration-500 border-l-[4px]",
          isActive ? "bg-gold-primary/10 border-gold-primary" : "bg-transparent border-transparent"
        )}
      >
          <p className="text-[22px] font-medium italic leading-relaxed text-black-primary/80">
            "{step.detail}"
          </p>
      </motion.div>
    </motion.div>
  );
}
