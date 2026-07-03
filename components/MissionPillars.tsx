"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DotGrid } from "@/components/ui/DotGrid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    id: "01",
    numeral: "1",
    title: "Women's Health",
    description:
      "Developing the first non-hormonal therapeutic with curative potential for endometriosis — designed to eliminate both the disease and its associated symptoms.",
    link: "/pipeline",
  },
  {
    id: "02",
    numeral: "2",
    title: "Oncology",
    description:
      "A new era of precision treatment — selectively accessing targets once beyond the limits of traditional therapy, and designed to restore responsiveness in “cold” tumors.",
    link: "/pipeline",
  },
  {
    id: "03",
    numeral: "3",
    title: "Diagnostics",
    description:
      "Pioneering first-in-class targeted, non-invasive, definitive imaging probes — spanning endometriosis and colon cancer.",
    link: "/imaging",
  },
];

export default function MissionPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setRef: setVisRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();

  const animateGlyph = isVisible && !reduced;

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        setVisRef(el);
      }}
      className="bg-surface border-b border-plum-dark/10 relative overflow-hidden py-24"
      style={{
        backgroundImage:
          "radial-gradient(70% 55% at 50% 0%, rgba(201,169,97,0.10), transparent 60%)",
      }}
    >
      {/* Subtle texture */}
      <DotGrid />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="reveal-rise mb-5" style={{ animationDelay: "0.05s" }}>
            <Eyebrow className="inline-block">What we build</Eyebrow>
          </div>
          <div className="reveal-rise" style={{ animationDelay: "0.12s" }}>
            <SectionHeading>Our Mission Pillars</SectionHeading>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="reveal-rise group relative flex flex-col h-full rounded-sm bg-bone-raised border border-plum-dark/10 p-10 lg:p-12 transition-shadow duration-500 hover:shadow-gold-glow-sm"
              style={{ animationDelay: `${0.18 + index * 0.12}s` }}
            >
              {/* Static luminous gold hairline top-border */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent"
              />

              <div className="flex justify-between items-start mb-10">
                <span className="text-xs font-bold text-gold-deep tracking-[0.2em] font-sans tabular-nums border border-gold-primary/40 px-3 py-1 rounded-full">
                  {pillar.id}
                </span>
                <motion.span
                  className="font-serif text-6xl lg:text-7xl leading-none text-plum-primary/15 group-hover:text-gold-primary/60 transition-colors duration-500 tabular-nums"
                  aria-hidden="true"
                  animate={animateGlyph ? { y: [0, -4, 0] } : undefined}
                  transition={
                    animateGlyph
                      ? { duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut", delay: index * 0.4 }
                      : { duration: 0 }
                  }
                >
                  {pillar.numeral}
                </motion.span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-plum-primary mb-6 tracking-tight text-balance">
                {pillar.title}
              </h3>

              <p className="text-black-soft text-lg leading-relaxed mb-12 flex-grow font-sans font-normal border-l-2 border-gold-primary/30 pl-5">
                {pillar.description}
              </p>

              <Link
                href={pillar.link}
                aria-label={`Learn more about ${pillar.title}`}
                className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-plum-primary group-hover:text-gold-deep transition-colors font-sans mt-auto"
              >
                <span className="border-b border-current pb-1">Learn More</span>
                <span
                  aria-hidden="true"
                  className="ml-3 text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
