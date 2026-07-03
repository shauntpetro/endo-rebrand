"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award } from "lucide-react";
import { useVisibility } from "@/hooks/useVisibility";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";

const milestones = [
  {
    icon: ShieldCheck,
    label: "IND Cleared",
    sublabel: "FDA Regulatory Milestone",
    colorClass: "text-clinical-teal",
    bgClass: "bg-clinical-teal/10",
    accent: false,
  },
  {
    icon: Zap,
    label: "Fast Track Filing",
    sublabel: "FDA Filing Underway",
    colorClass: "text-gold-deep",
    bgClass: "bg-gold-primary/12",
    accent: true,
  },
  {
    icon: Award,
    label: "NIH-Backed Platform",
    sublabel: "Perfect Grant Score",
    colorClass: "text-plum-primary",
    bgClass: "bg-plum-primary/10",
    accent: false,
  },
];

export default function MilestoneProofBar() {
  const { setRef: setVisRef, isVisible } = useVisibility();
  const reduced = usePrefersReducedMotion();

  const animateOrb = isVisible && !reduced;

  return (
    <section
      ref={(node) => setVisRef(node)}
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background:
          "radial-gradient(70% 55% at 50% 0%, rgba(201,169,97,0.10), transparent 65%), linear-gradient(180deg, #FAF6EC, #F4EEE1)",
      }}
    >
      {/* ── Single warm luminous orb behind the accent card (gated on reduced motion) ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.18) 0%, transparent 70%)",
        }}
        animate={
          animateOrb
            ? { scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }
            : undefined
        }
        transition={
          animateOrb
            ? { duration: 12, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <div
          className="reveal-rise mb-12 border-t border-plum-dark/10 pt-8 text-center"
          style={{ animationDelay: "0.08s" }}
        >
          <Eyebrow className="mb-2 block font-sans">
            Clinical Milestones
          </Eyebrow>
          <h2
            className="font-serif text-3xl font-bold tracking-tight text-plum-dark md:text-4xl"
            style={{ textWrap: "balance" }}
          >
            Advancing Toward{" "}
            <span className="italic text-gold-deep">Patient Impact</span>
          </h2>
        </div>

        {/* ── Milestone cards grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <div
                key={milestone.label}
                className={`reveal-rise group relative overflow-hidden rounded-xl border bg-bone-raised p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-primary/40 hover:shadow-gold-glow-sm ${
                  milestone.accent
                    ? "border-gold-primary/40 shadow-gold-glow-sm"
                    : "border-plum-dark/10"
                }`}
                style={{ animationDelay: `${0.16 + index * 0.12}s` }}
              >
                {/* ── Card content ── */}
                <div className="relative z-10 flex flex-col items-start gap-4">
                  {/* Icon circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${milestone.bgClass}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-6 w-6 ${milestone.colorClass}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="font-serif text-2xl font-bold text-plum-dark transition-colors duration-300 group-hover:text-gold-deep">
                    {milestone.label}
                  </h3>

                  {/* Sublabel */}
                  <span className="font-mono text-xs uppercase tracking-widest text-black-primary/75">
                    {milestone.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
