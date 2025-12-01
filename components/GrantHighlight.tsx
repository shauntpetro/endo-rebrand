"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function GrantHighlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="border-b border-black-primary bg-gradient-to-b from-white via-[#F3F0F7] to-[#E8E4F0] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square md:aspect-auto md:h-full bg-pastel-plum border-r border-black-primary/10 overflow-hidden"
          >
            <div ref={ref} className="absolute inset-0" />
            {/* Background Image with Parallax */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center h-[120%] -top-[10%]"
              style={{
                backgroundImage: "url('/recognition-perfect10.jpg')",
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
                className="text-gold-primary italic inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                "unicorn"
              </motion.span>{" "}
              NIH grant score of 10.
            </motion.h2>
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
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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
