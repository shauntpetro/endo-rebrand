"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { DitherOverlay } from "./DitherOverlay";
import { useVisibility } from "@/hooks/useVisibility";

const WORDS = [
  "targeted therapeutics",
  "precision diagnostics",
  "disease-modifying therapies",
  "clinical breakthroughs",
  "novel medicines"
];

export default function TransitionStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setRef: setVisRef, isVisible } = useVisibility();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500); // Change word every 2.5s
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Reveal expansion
  const clipRadius = useTransform(scrollYProgress, [0, 0.6], [0, 150]);
  const clipPath = useTransform(clipRadius, (r) => `circle(${r}% at 50% 50%)`);

  // Text effects
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [50, 0]);

  return (
    <div ref={(el) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      setVisRef(el);
    }} className="relative h-[250vh]">
      <div className="sticky top-0 h-[100svh] max-h-screen overflow-hidden w-full">
        
        {/* Layer 1: Base (Subtle Ghost) */}
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <div className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 to-white opacity-50" />
          <StatementContent 
            theme="ghost" 
            scale={scale} 
            opacity={opacity} 
            y={y}
            currentWord={WORDS[wordIndex]}
          />
        </div>

        {/* Layer 2: Reveal (Rich Dark Mode) */}
        <motion.div
          className="absolute inset-0 bg-black-primary flex items-center justify-center overflow-hidden will-change-[clip-path]"
          style={{ clipPath }}
        >
          {/* Atmospheric Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-plum-primary via-plum-dark to-black-primary" />
          
          {/* Animated Orbs inside the reveal */}
          <motion.div
            animate={isVisible ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : undefined}
            transition={isVisible ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/20 rounded-full blur-[100px] mix-blend-screen"
          />
          <motion.div
            animate={isVisible ? { scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] } : undefined}
            transition={isVisible ? { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 } : { duration: 0 }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-plum-primary/40 rounded-full blur-[120px] mix-blend-screen"
          />

          <DitherOverlay />

          <StatementContent 
            theme="rich" 
            scale={scale} 
            opacity={opacity} 
            y={y}
            currentWord={WORDS[wordIndex]}
          />
        </motion.div>
      </div>
    </div>
  );
}

function StatementContent({ 
  theme, 
  scale, 
  opacity,
  y,
  currentWord
}: { 
  theme: "ghost" | "rich", 
  scale: MotionValue<number>, 
  opacity: MotionValue<number>,
  y: MotionValue<number>,
  currentWord: string
}) {
  const isGhost = theme === "ghost";
  
  return (
    <motion.div 
      style={{ scale, opacity, y }}
      className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-8 max-w-5xl"
    >
      <h2 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight transition-colors duration-500 ${
        isGhost ? "text-gray-200 blur-sm" : "text-white drop-shadow-2xl"
      }`}>
        Leading the development of 
        <div className="h-[1.2em] mt-2 md:mt-4 relative overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWord}
              initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="block whitespace-nowrap"
            >
              {currentWord}
            </motion.span>
          </AnimatePresence>
        </div>
      </h2>

      <p className={`text-3xl md:text-5xl lg:text-6xl font-serif italic leading-[1.2] tracking-wide ${
        isGhost ? "text-gray-200 blur-sm" : "text-gold-primary drop-shadow-lg"
      }`}>
        that will transform patient lives
      </p>
    </motion.div>
  );
}
