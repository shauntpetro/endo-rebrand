"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useVisibility } from "@/hooks/useVisibility";

interface Partner {
  name: string;
  label: string;
  logo: string;
  darkInLight?: boolean;
  allowColor?: boolean;
}

const partners: Partner[] = [
  { name: "NICHD", label: "NICHD", logo: "/NIH_2013_logo_vertical.svg" },
  { name: "EndoFound", label: "Endometriosis Foundation of America", logo: "/Endofound.webp", darkInLight: true },
  { name: "RADxTech", label: "RADx Tech", logo: "/challenge-logo.svg" },
  { name: "Biocom", label: "Biocom California", logo: "/biocom_ca_primary_logo.svg" },
  { name: "UCLA", label: "University of California, Los Angeles", logo: "/University_of_California,_Los_Angeles_logo.svg" },
  { name: "White House", label: "White House Recognition", logo: "/white-house.webp" },
  { name: "Milken Institute", label: "Milken Institute", logo: "/Milken_Institute_logo.svg", allowColor: true }
];

// Duplicate partners for seamless CSS loop
const tickerPartners = [...partners, ...partners];

export default function AchievementBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const isLight = theme === "light";
  const [isPaused, setIsPaused] = useState(false);
  const { ref: visRef, isVisible } = useVisibility();

  return (
    <section ref={visRef as React.RefObject<HTMLElement>} aria-label="Partner organizations" className={`${isLight ? 'bg-cream-primary border-plum-primary/10' : 'bg-plum-dark border-white/10'} border-b py-12 overflow-hidden relative`}>
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent z-10"
        animate={isVisible ? { opacity: [0.3, 0.7, 0.3] } : undefined}
        transition={isVisible ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      />
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className={`text-xs font-bold uppercase tracking-[0.2em] font-sans ${isLight ? 'text-plum-primary/60' : 'text-white/60'}`}>
          Trusted and Supported by
        </h2>
      </div>

      {/* Ticker Container */}
      <div
        className="relative w-full flex items-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Vignette Effects */}
        <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r ${isLight ? 'from-cream-primary' : 'from-plum-dark'} to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l ${isLight ? 'from-cream-primary' : 'from-plum-dark'} to-transparent pointer-events-none`} />

        {/* Scrolling Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 px-16"
          animate={isVisible ? { x: ["0%", "-50%"] } : undefined}
          transition={isVisible ? {
            repeat: Infinity,
            ease: "linear",
            duration: isPaused ? 200 : 50,
            repeatType: "loop"
          } : { duration: 0 }}
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {tickerPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 relative h-16 w-32 md:h-20 md:w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 flex items-center justify-center"
              aria-hidden={i >= partners.length ? true : undefined}
            >
              {partner.logo ? (
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.label} logo`}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className={`object-contain ${
                      isLight 
                        ? partner.allowColor 
                          ? 'grayscale opacity-80 contrast-125' // Complex logos: grayscale to preserve detail
                          : 'brightness-0 opacity-80'           // Text/Simple logos: pure black for readability
                        : partner.allowColor
                          ? 'brightness-125 contrast-125'
                          : 'brightness-0 invert'
                    }`}
                  />
                </div>
              ) : (
                <h3 className={`text-sm font-bold ${isLight ? 'text-plum-primary/70' : 'text-white/70'} uppercase tracking-widest whitespace-nowrap`}>
                  {partner.name}
                </h3>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
