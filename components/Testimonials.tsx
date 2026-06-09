"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { DotGrid } from "@/components/ui/DotGrid";

const testimonials = [
  {
    id: 1,
    quote:
      "Endometriosis has seen limited true innovation for decades, with treatments focused primarily on managing symptoms rather than addressing the underlying disease.",
    name: "Dr. Tanya Petrossian, PhD",
    title: "Founder & CEO",
    organization: "EndoCyclic Therapeutics",
  },
  {
    id: 2,
    quote:
      "It has taken more than a decade of focused research and an entirely new scientific path to establish that there is not only a non-hormonal approach, but that it is the only way forward.",
    name: "Dr. Tanya Petrossian, PhD",
    title: "Founder & CEO",
    organization: "EndoCyclic Therapeutics",
  },
  {
    id: 3,
    quote:
      "A disease that attacks 10 percent of our girls and women worldwide attacks all of us, so let's wipe it out.",
    name: "Dr. Tanya Petrossian, PhD",
    title: "Founder & CEO",
    organization: "EndoCyclic Therapeutics",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setRef: setVisRef, isVisible } = useVisibility();

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        setVisRef(el);
      }}
      className="bg-cream-primary py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background dot pattern */}
      <DotGrid />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-8 block font-sans"
          >
            From Our Founder
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl md:text-6xl font-serif font-bold text-plum-dark tracking-tight"
          >
            The Vision Behind{" "}
            <span className="italic text-gold-primary">EndoCyclic</span>
          </motion.h2>
        </div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative bg-white rounded-xl p-8 md:p-10 shadow-[0_4px_24px_rgba(74,63,92,0.06)] hover:shadow-[0_16px_48px_rgba(74,63,92,0.12)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Gold accent bar at top */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative quotation mark */}
              <span
                className="block text-6xl md:text-7xl leading-none text-gold-primary/30 font-serif select-none mb-4"
                aria-hidden="true"
              >
                {"\u201C"}
              </span>

              {/* Quote text */}
              <p className="text-black-primary text-base md:text-lg leading-relaxed font-sans mb-8">
                {testimonial.quote}
              </p>

              {/* Attribution */}
              <div className="border-t border-gray-mid pt-5">
                <p className="font-sans font-bold text-plum-dark text-sm">
                  {testimonial.name}
                </p>
                <p className="font-sans text-gray-therapeutics text-sm">
                  {testimonial.title}, {testimonial.organization}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
