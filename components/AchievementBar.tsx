"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "NICHD", label: "NICHD", logo: "/NIH_2013_logo_vertical.svg" },
  { name: "EndoFound", label: "Endometriosis Foundation of America", logo: "/Endofound.png", darkInLight: true },
  { name: "RADxTech", label: "RADx Tech", logo: "/challenge-logo.svg" },
  { name: "Biocom", label: "Biocom California", logo: "/biocom_ca_primary_logo.svg" },
  { name: "UCLA", label: "University of California, Los Angeles", logo: "/University_of_California,_Los_Angeles_logo.svg" },
  { name: "White House", label: "White House Recognition", logo: "/white-house.webp" },
  { name: "Milken Institute", label: "Milken Institute", logo: "/Milken_Institute_logo.svg", allowColor: true },
  { name: "Cool Company", label: "Cool Company", logo: "/cool-company.webp", allowColor: true }
];

// Duplicate partners to ensure smooth scrolling
const tickerPartners = [...partners, ...partners, ...partners];

export default function AchievementBar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const isLight = theme === "light";
  
  return (
    <section className={`${isLight ? 'bg-cream-primary border-plum-primary/10' : 'bg-plum-dark border-white/10'} border-b py-12 overflow-hidden relative`}>
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isLight ? 'text-plum-primary/40' : 'text-white/40'}`}>
          Trusted and Supported by
        </span>
      </div>

      {/* Ticker Container */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Vignette Effects */}
        <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r ${isLight ? 'from-cream-primary' : 'from-plum-dark'} to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l ${isLight ? 'from-cream-primary' : 'from-plum-dark'} to-transparent pointer-events-none`} />

        {/* Scrolling Track */}
        <motion.div 
          className="flex items-center gap-16 md:gap-24 px-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 50, // Adjust speed here
            repeatType: "loop"
          }}
          style={{ width: "fit-content" }} // Ensure it takes up necessary space
        >
          {tickerPartners.map((partner, i) => (
            <div 
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 relative h-16 w-32 md:h-20 md:w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center justify-center"
            >
              {partner.logo ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={partner.logo} 
                    alt={partner.label} 
                    fill
                    className={`object-contain ${
                      isLight 
                        ? (partner as any).allowColor 
                          ? 'grayscale opacity-80 contrast-125' // Complex logos: grayscale to preserve detail
                          : 'brightness-0 opacity-80'           // Text/Simple logos: pure black for readability
                        : (partner as any).allowColor
                          ? 'brightness-125 contrast-125'
                          : 'brightness-0 invert'
                    }`}
                  />
                </div>
              ) : (
                <h3 className={`text-sm font-bold ${isLight ? 'text-plum-primary/60' : 'text-white/60'} uppercase tracking-widest whitespace-nowrap`}>
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
