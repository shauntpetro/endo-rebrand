"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DitherOverlay } from "./DitherOverlay";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Dynamically import Canvas to avoid SSR issues
const PeptideCanvas = dynamic(() => import("@/components/PeptideCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 opacity-60 flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-primary to-gold-light opacity-20 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Cinematic reveal sequence:
    // 1. Logo (0.2s delay, 1.0s duration) - handled in Navbar
    // 2. Nav links (0.8s+ staggered) - handled in Navbar  
    // 3. Peptides (0.8s delay, 2.0s fade + scale) - handled in PeptideCanvas
    // 4. Headline (2.8s delay) - after peptides have emerged
    // 5. Subheadline (staggered after headline)
    // 6. Button (staggered after subheadline)
    
    if (headingRef.current) {
      gsap.set(headingRef.current, { y: 40, autoAlpha: 0, filter: 'blur(12px)' });
      tl.to(headingRef.current, { 
        y: 0, 
        autoAlpha: 1, 
        filter: 'blur(0px)',
        duration: 1.8,
        ease: "power2.out"
      }, 2.8); // After peptides have scaled in
    }

    if (paraRef.current) {
      gsap.set(paraRef.current, { y: 30, autoAlpha: 0 });
      tl.to(paraRef.current, { 
        y: 0, 
        autoAlpha: 1, 
        duration: 1.2,
        ease: "power2.out"
      }, "-=1.2");
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 20, autoAlpha: 0 });
      tl.to(ctaRef.current, { 
        y: 0, 
        autoAlpha: 1, 
        duration: 1.0,
        ease: "power2.out"
      }, "-=0.8");
    }
  }, { scope: containerRef });

  // Mouse movement for spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FDF6E9] flex flex-col justify-end overflow-hidden"
    >
      {/* Spotlight Layer */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ease-out"
      />

      {/* 3D Background Layers */}
      <div className="absolute inset-0 h-full w-full top-0 pointer-events-none">
         {/* Main Interactive Peptide */}
         <PeptideCanvas />
         
         {/* Dither & Grain */}
         <DitherOverlay />
         
         {/* Vignette/Gradient Overlay for text readability */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9]/90 via-[#FDF6E9]/40 to-transparent pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6E9] via-transparent to-transparent h-32 bottom-0 pointer-events-none" />
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-12 border-t border-black-primary/10">
          <div className="lg:col-span-6">
            <h1 
              ref={headingRef}
              className="text-5xl md:text-[84px] font-serif font-bold tracking-tight leading-[1.0] md:leading-[0.9] text-plum-dark mb-8 opacity-0"
            >
              Leading a new <br />
              era in <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum-primary to-coral-primary">women&apos;s <br />
              health</span> <span className="text-gold-primary italic">& oncology</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-8 flex flex-col justify-center h-full lg:pl-8 lg:border-l border-black-primary/10">
            <p 
              ref={paraRef}
              className="text-lg md:text-xl font-sans font-normal leading-relaxed text-black-soft mb-8 opacity-0"
            >
              With first-in-class, targeted, non-hormonal therapeutics and diagnostics.
            </p>
            
            <div ref={ctaRef} className="opacity-0">
              <div className="flex items-center gap-4">
                <MagneticButton href="/innovation">
                  Our Platform
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
