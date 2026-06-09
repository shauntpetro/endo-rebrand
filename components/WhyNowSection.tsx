"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { Eyebrow } from "@/components/ui/Eyebrow";

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

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        setVisRef(el);
      }}
      className="bg-gradient-to-b from-cream-primary via-white to-pastel-plum border-b border-black-primary relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#4A3B52 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Gold Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-primary/10 rounded-full blur-[100px] pointer-events-none"
        animate={isVisible ? {
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        } : undefined}
        transition={isVisible ? {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        } : { duration: 0 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="mb-8 block font-sans"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>Strategic Inflection</Eyebrow>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]"
          >
            Why EndoCyclic,
            <br />
            <span className="italic text-gold-primary">Why Now</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + index * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-xl p-10 shadow-[0_8px_32px_rgba(74,63,92,0.08)] hover:bg-white hover:shadow-[0_20px_60px_rgba(74,63,92,0.12)] hover:border-gold-primary/20 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Animated Accent Bar */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-primary via-plum-primary to-clinical-teal"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originX: 0 }}
              />

              {/* Card Top */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-bold text-gold-primary tracking-widest font-sans border border-gold-primary/30 px-3 py-1 rounded-full group-hover:bg-gold-primary/10 group-hover:scale-110 transition-all duration-300">
                  {card.id}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="text-2xl font-serif font-bold text-plum-dark mb-4">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-black-soft text-lg leading-relaxed font-sans font-normal">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
