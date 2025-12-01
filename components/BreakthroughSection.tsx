"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function BreakthroughSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // New state for hydration-safe random values
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    left: string;
    top: string;
  }>>([]);

  useEffect(() => {
    setParticles([...Array(5)].map(() => ({
      width: Math.random() * 400 + 200,
      height: Math.random() * 400 + 200,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    })));
  }, []);

  const [step, setStep] = useState(0);
  const steps = [
    { label: "Detect", desc: "Identifies specific markers on diseased cells" },
    { label: "Bind", desc: "Selectively attaches with high affinity" },
    { label: "Eliminate", desc: "Induces apoptosis in target cells only" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section ref={containerRef} className="py-32 bg-plum-primary overflow-hidden relative">
      {/* Background Particles (Simulated) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-gold-primary to-gold-light opacity-5 blur-3xl"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              y: y
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[48px] md:text-[72px] font-serif font-bold mb-8 leading-[1.1] tracking-tight text-white">
              What if endometriosis could be <span className="text-gold-primary italic">cured</span>, not just managed?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-10 font-light font-sans">
              Current treatments rely on hormonal suppression or surgery, often with temporary results and significant side effects. EndoCyclic takes a different approach: directly targeting the diseased cells while leaving healthy tissue physically and hormonally intact.
            </p>
            <button className="text-coral-primary font-medium text-lg border-b border-coral-primary pb-1 hover:text-coral-primary/80 hover:border-coral-primary/80 transition-colors tracking-wide">
              Read the Science
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-white rounded-sm overflow-hidden shadow-2xl border border-gray-mid group"
          >
             {/* Interactive Visualization */}
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#F5F5F5]">
                {/* Simulated Cell Membrane / Environment */}
                <div className="absolute inset-0 overflow-hidden">
                   {/* Outer ring */}
                   <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-[60px] border-warm-rose/10 rounded-full"
                      animate={{ scale: step === 2 ? 0.9 : [1, 1.05, 1], opacity: step === 2 ? 0.5 : 1 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   />
                   {/* Inner targeting ring */}
                   <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-[2px] border-dashed border-gold-primary/30 rounded-full"
                      animate={{ 
                        rotate: 360,
                        scale: step === 1 ? 0.8 : 1,
                        borderColor: step === 1 ? "rgba(201, 169, 97, 0.8)" : "rgba(201, 169, 97, 0.3)"
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   />
                </div>
                
                {/* Central "Peptide" / Target Action */}
                <motion.div 
                  key={step}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark shadow-2xl flex items-center justify-center text-white font-serif font-bold text-2xl cursor-pointer border-4 border-white/20 backdrop-blur-sm"
                >
                  {step === 0 && (
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  )}
                  {steps[step].label}
                </motion.div>

                <div className="absolute bottom-12 left-0 right-0 text-center z-20 px-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm uppercase tracking-[0.2em] font-bold text-gray-therapeutics mb-2">
                          Step {step + 1}: {steps[step].label}
                        </p>
                        <p className="text-gray-600 font-sans text-sm max-w-xs mx-auto">
                          {steps[step].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Step Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                      {steps.map((_, i) => (
                        <div 
                          key={i} 
                          onClick={() => setStep(i)}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${i === step ? "bg-gold-primary w-6" : "bg-gray-300"}`} 
                        />
                      ))}
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
