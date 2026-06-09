"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";

export default function GrantHighlight() {
  const ref = useRef(null);
  const { ref: visRef, isVisible } = useVisibility();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={visRef as React.RefObject<HTMLElement>} className="border-b border-black-primary bg-gradient-to-b from-white via-[#F3F0F7] to-[#E8E4F0] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square md:aspect-auto md:h-full bg-pastel-plum border-r border-black-primary/10 overflow-hidden group"
          >
            <div ref={ref} className="absolute inset-0" />
            {/* Background Image with Parallax */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center h-[120%] -top-[10%] transition-transform duration-700 group-hover:scale-105 will-change-transform"
              style={{
                backgroundImage: "url('/recognition-perfect10.webp')",
                y
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-plum-primary/10 to-transparent z-10"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center p-12 md:p-24"
          >
            <motion.span 
              className="block text-xs font-bold uppercase tracking-[0.2em] text-gold-primary mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Recognition
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-serif font-bold text-plum-dark mb-12 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              EndoCyclic Therapeutics receives perfect{" "}
              <motion.span
                className="text-gold-primary italic inline-block drop-shadow-[0_0_12px_rgba(201,169,97,0.4)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                &ldquo;unicorn&rdquo;
              </motion.span>{" "}
              NIH grant score of 10.
            </motion.h2>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
            >
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-clinical-teal/10 text-clinical-teal border border-clinical-teal/20 rounded-full hover:scale-105 hover:shadow-[0_0_12px_rgba(58,142,130,0.2)] transition-all duration-300 cursor-default">
                IND Cleared
              </span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gold-primary/10 text-gold-primary border border-gold-primary/20 rounded-full hover:scale-105 hover:shadow-[0_0_12px_rgba(201,169,97,0.2)] transition-all duration-300 cursor-default">
                NIH Perfect Score
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="h-px bg-gold-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link 
                  href="/news"
                  className="text-sm font-bold uppercase tracking-widest text-plum-primary hover:text-gold-primary transition-colors inline-flex items-center gap-2"
                >
                  Read the Full Report
                  <motion.span
                    animate={isVisible ? { x: [0, 4, 0] } : undefined}
                    transition={isVisible ? { duration: 1.5, repeat: Infinity } : { duration: 0 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
