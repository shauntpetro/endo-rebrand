"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const LEFT = {
  eyebrow: "Today's Hormonal Drugs",
  title: "System-Wide Suppression",
  points: [
    "Act across the whole body, not just diseased tissue",
    "Hormonal — can suppress fertility and carry systemic side effects",
    "Manage symptoms while lesions remain in place",
    "Require continuous, long-term dosing",
  ],
};

const RIGHT = {
  eyebrow: "ENDO-205",
  title: "Targeted Correction",
  points: [
    "Designed to act only in diseased tissue via a pH-gated mechanism",
    "Non-hormonal — designed to preserve fertility",
    "Designed to eliminate lesions, not just mask symptoms",
    "Short-course, disease-modifying by design",
  ],
};

function Column({
  data,
  accent,
  delay,
  highlight,
}: {
  data: typeof LEFT;
  accent: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`reveal-rise group relative rounded-2xl p-7 md:p-8 h-full bg-bone-raised transition-all duration-500 ${
        highlight
          ? "border border-gold-primary/40 hover:border-gold-primary/70 hover:-translate-y-1"
          : "border border-plum-dark/10"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Highlighted candidate gets one confident hairline gold rule, widens on hover */}
      {highlight && (
        <span className="absolute top-0 left-0 h-[2px] w-16 bg-gold-primary rounded-full transition-all duration-500 group-hover:w-full" />
      )}

      <span
        className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
        style={{ color: accent }}
      >
        {data.eyebrow}
      </span>
      <h3
        className={`font-serif font-bold mt-2 mb-6 text-2xl md:text-3xl text-balance ${
          highlight ? "text-plum-dark" : "text-plum-dark/75"
        }`}
      >
        {data.title}
      </h3>
      <ul className="space-y-3.5">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
            <span
              className="mt-1.5 w-2 h-2 rounded-full shrink-0"
              style={{ background: accent, opacity: highlight ? 1 : 0.7 }}
            />
            <span className={highlight ? "text-black-soft" : "text-black-primary/70"}>
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SuppressionCorrection() {
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
      className="py-24 bg-bone relative overflow-hidden"
      style={{
        background:
          "radial-gradient(65% 50% at 78% 40%, rgba(201,169,97,0.10), transparent 60%), #F4EEE1",
      }}
    >
      {/* One warm luminous accent, biased toward the correction column — frozen static under reduced motion */}
      <motion.div
        className="absolute top-[42%] right-[8%] w-[26rem] h-[26rem] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.14) 0%, transparent 70%)",
        }}
        animate={
          animateOrb ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : undefined
        }
        transition={
          animateOrb
            ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="reveal-rise mb-4 block" style={{ animationDelay: "0.05s" }}>
            <Eyebrow>The Difference</Eyebrow>
          </span>
          <h2
            className="reveal-rise text-4xl md:text-5xl font-serif font-bold text-plum-dark tracking-tight text-balance"
            style={{ animationDelay: "0.15s" }}
          >
            Suppression vs. Correction
          </h2>
          <p
            className="reveal-rise text-lg text-black-soft font-light mt-5 leading-relaxed"
            style={{ animationDelay: "0.25s" }}
          >
            Conventional therapy quiets the whole system. Our lead candidate is designed to act only where disease lives — correction, not destruction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          <Column data={LEFT} accent="#6B6270" delay={0.35} />
          <Column data={RIGHT} accent="#8A6D2E" delay={0.47} highlight />
        </div>
      </div>
    </section>
  );
}
