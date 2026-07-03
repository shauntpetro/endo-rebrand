"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function GrantHighlight() {
  const ref = useRef(null);
  const { ref: visRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const animateArrow = isVisible && !reduced;

  return (
    <section
      ref={visRef as React.RefObject<HTMLElement>}
      className="relative border-b border-plum-dark/10 overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 55% at 26% 42%, rgba(201,169,97,0.14), transparent 62%), linear-gradient(180deg, #FAF6EC, #F4EEE1)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="reveal-rise relative aspect-square md:aspect-auto md:h-full bg-bone-raised border-r border-plum-dark/10 overflow-hidden group">
            <div ref={ref} className="absolute inset-0" />
            {/* Background photo with parallax — frozen when reduced motion is preferred */}
            <motion.div
              role="img"
              aria-label="EndoCyclic Therapeutics recognition photograph for its perfect NIH grant score of 10"
              className="absolute inset-0 bg-cover bg-center h-[120%] -top-[10%] transition-transform duration-700 group-hover:scale-105 will-change-transform"
              style={{
                backgroundImage: "url('/recognition-perfect10.webp')",
                y: reduced ? 0 : parallaxY,
              }}
            />
            {/* Warm wash — lifts on hover */}
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
              style={{
                background:
                  "linear-gradient(to top right, rgba(46,38,58,0.14), transparent 55%, rgba(201,169,97,0.10))",
              }}
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-12 md:p-24">
            <div className="reveal-rise" style={{ animationDelay: "0.1s" }}>
              <Eyebrow className="block mb-8">Recognition</Eyebrow>
            </div>

            <h2
              className="reveal-rise text-4xl md:text-6xl font-serif font-bold text-plum-dark mb-10 leading-[1.05] tracking-tight [text-wrap:balance]"
              style={{ animationDelay: "0.24s" }}
            >
              EndoCyclic Therapeutics receives perfect{" "}
              <span className="text-gold-deep italic">&ldquo;unicorn&rdquo;</span>{" "}
              NIH grant score of{" "}
              <span className="relative inline-block whitespace-nowrap">
                {/* Single luminous accent — warm halo behind the score */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-5 -inset-y-2 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(201,169,97,0.22), transparent)",
                  }}
                />
                <span className="relative text-gold-deep tabular-nums">10</span>
              </span>
              .
            </h2>

            <div
              className="reveal-rise flex items-center gap-3 mb-10"
              style={{ animationDelay: "0.38s" }}
            >
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-clinical-teal/10 text-clinical-teal border border-clinical-teal/20 rounded-full">
                IND Cleared
              </span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gold-primary/12 text-gold-deep border border-gold-primary/40 rounded-full">
                NIH Perfect Score
              </span>
            </div>

            <div
              className="reveal-rise flex items-center gap-6"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="h-px w-12 bg-gold-primary" />
              <motion.div
                whileHover={reduced ? undefined : { x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href="/news"
                  className="text-sm font-bold uppercase tracking-widest text-plum-primary hover:text-gold-deep transition-colors inline-flex items-center gap-2"
                >
                  Read the Full Report
                  <motion.span
                    aria-hidden="true"
                    animate={animateArrow ? { x: [0, 4, 0] } : undefined}
                    transition={
                      animateArrow
                        ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 }
                    }
                  >
                    &rarr;
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
