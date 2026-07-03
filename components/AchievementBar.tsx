"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

// Duplicate partners for the seamless marquee loop (motion path only)
const tickerPartners = [...partners, ...partners];

function logoFilter(isLight: boolean, partner: Partner) {
  if (isLight) {
    return partner.allowColor
      ? "grayscale opacity-80 contrast-125" // Complex logos: grayscale to preserve detail
      : "brightness-0 opacity-80";          // Text/simple logos: pure black for readability
  }
  return partner.allowColor ? "brightness-125 contrast-125" : "brightness-0 invert";
}

export default function AchievementBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const isLight = theme === "light";
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const { ref: visRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();

  // Marquee only runs when motion is welcome AND the section is on screen.
  // WCAG 2.2.2: userPaused gives keyboard/AT users a way to stop the movement.
  const animateMarquee = isVisible && !reduced && !userPaused;

  return (
    <section
      ref={visRef as React.RefObject<HTMLElement>}
      aria-label="Partner organizations"
      className={`${
        isLight ? "border-plum-dark/10" : "bg-plum-dark border-white/10"
      } border-y py-16 overflow-hidden relative`}
      style={
        isLight
          ? {
              background:
                "radial-gradient(60% 80% at 50% 0%, rgba(201,169,97,0.10), transparent 60%), #F4EEE1",
            }
          : undefined
      }
    >
      {/* Warm hairline seam — one confident luminous accent, frozen static under reduced motion */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent z-10"
        animate={animateMarquee ? { opacity: [0.35, 0.7, 0.35] } : undefined}
        transition={
          animateMarquee
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
        style={reduced ? { opacity: 0.5 } : undefined}
      />

      {/* Eyebrow */}
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2
          className={`text-xs font-bold uppercase tracking-[0.25em] font-sans ${
            isLight ? "text-gold-deep" : "text-white/60"
          }`}
        >
          Recognized &amp; Supported By
        </h2>
      </div>

      {reduced ? (
        /* Static hairline grid — full content visible, no motion */
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-plum-dark/10 border border-plum-dark/10 rounded-2xl overflow-hidden">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`flex items-center justify-center p-8 ${
                  isLight ? "bg-bone-raised" : "bg-plum-dark"
                }`}
              >
                <div className="relative h-14 w-32 md:h-16 md:w-36">
                  <Image
                    src={partner.logo}
                    alt={`${partner.label} logo`}
                    fill
                    sizes="(max-width: 768px) 128px, 144px"
                    className={`object-contain ${logoFilter(isLight, partner)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Marquee — motion path only, gated behind reduced-motion + visibility */
        <div
          className="relative w-full flex items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* WCAG 2.2.2 pause control — visually hidden until keyboard focus */}
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            className={`sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-20 focus:px-3 focus:py-1.5 focus:rounded-md focus:text-xs focus:font-sans focus:font-semibold ${
              isLight
                ? "focus:bg-plum-dark focus:text-white"
                : "focus:bg-white focus:text-plum-dark"
            }`}
          >
            {userPaused ? "Play partner logo animation" : "Pause partner logo animation"}
          </button>

          {/* Warm vignette edges */}
          <div
            aria-hidden="true"
            className={`absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r ${
              isLight ? "from-bone" : "from-plum-dark"
            } to-transparent pointer-events-none`}
          />
          <div
            aria-hidden="true"
            className={`absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l ${
              isLight ? "from-bone" : "from-plum-dark"
            } to-transparent pointer-events-none`}
          />

          {/* Scrolling track */}
          <motion.div
            className="flex items-center gap-16 md:gap-24 px-16"
            animate={animateMarquee ? { x: ["0%", "-50%"] } : undefined}
            transition={
              animateMarquee
                ? {
                    repeat: Infinity,
                    ease: "linear",
                    duration: isPaused ? 200 : 50,
                    repeatType: "loop",
                  }
                : { duration: 0 }
            }
            style={{ width: "fit-content", willChange: "transform" }}
          >
            {tickerPartners.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 relative h-16 w-32 md:h-20 md:w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105 flex items-center justify-center"
                aria-hidden={i >= partners.length ? true : undefined}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.label} logo`}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className={`object-contain ${logoFilter(isLight, partner)}`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
