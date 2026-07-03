"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DotGrid } from "@/components/ui/DotGrid";

const cards = [
  {
    id: "01",
    title: "The Unmet Need",
    description:
      "Over 190 million women affected worldwide. No disease-modifying therapy exists. An average 8-year diagnostic delay leaves patients suffering without answers.",
  },
  {
    id: "02",
    title: "The Breakthrough",
    description:
      "First non-hormonal, disease-modifying therapeutic approach. IND cleared with a perfect NIH grant score. Paired non-invasive diagnostic platform.",
  },
  {
    id: "03",
    title: "The Moment",
    description:
      "Clinical-stage entry with FDA IND clearance. Companion diagnostic potential for earlier identification. Broad peptide platform extending beyond one asset.",
  },
];

export default function WhyNowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setRef: setVisRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();

  const animateOrb = isVisible && !reduced;

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        setVisRef(el);
      }}
      className="bg-bone border-b border-plum-dark/10 relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(70% 55% at 50% 30%, rgba(201,169,97,0.10), transparent 62%), #F4EEE1",
      }}
    >
      {/* Background Dot Pattern */}
      <DotGrid />

      {/* Warm luminous accent — the one confident glow, frozen static under reduced motion */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.16) 0%, transparent 70%)",
        }}
        animate={
          animateOrb
            ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }
            : undefined
        }
        transition={
          animateOrb
            ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header — deterministic CSS reveal (visible in static state) */}
        <div className="text-center mb-16">
          <span
            className="reveal-rise mb-8 block font-sans"
            style={{ animationDelay: "0.05s" }}
          >
            <Eyebrow>Strategic Inflection</Eyebrow>
          </span>
          <h2
            className="reveal-rise text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]"
            style={{ animationDelay: "0.15s" }}
          >
            Why EndoCyclic,
            <br />
            <span className="italic text-gold-deep">Why Now</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="reveal-rise group relative bg-bone-raised border border-plum-dark/10 rounded-xl p-10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] transition-all duration-500 hover:border-gold-primary/40 hover:-translate-y-1"
              style={{ animationDelay: `${0.25 + index * 0.12}s` }}
            >
              {/* One warm accent rule — hairline gold, widens on hover */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-[2px] w-16 bg-gold-primary transition-all duration-500 group-hover:w-full"
              />

              {/* Card Top */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-bold text-gold-deep tracking-widest font-sans border border-gold-primary/40 px-3 py-1 rounded-full tabular-nums transition-colors duration-300 group-hover:bg-gold-primary/10">
                  {card.id}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="text-2xl font-serif font-bold text-plum-dark mb-4 text-balance">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-black-soft text-lg leading-relaxed font-sans font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
