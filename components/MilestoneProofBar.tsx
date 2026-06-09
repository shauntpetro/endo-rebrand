"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Zap, Award } from "lucide-react";
import { useVisibility } from "@/hooks/useVisibility";

const milestones = [
  {
    icon: ShieldCheck,
    label: "IND Cleared",
    sublabel: "FDA Regulatory Milestone",
    colorClass: "text-clinical-teal",
    bgClass: "bg-clinical-teal/10",
  },
  {
    icon: Zap,
    label: "Fast Track Filing",
    sublabel: "Expedited Designation",
    colorClass: "text-gold-primary",
    bgClass: "bg-gold-primary/10",
  },
  {
    icon: Award,
    label: "NIH-Backed Platform",
    sublabel: "Perfect Grant Score",
    colorClass: "text-plum-primary",
    bgClass: "bg-plum-primary/10",
  },
];

export default function MilestoneProofBar() {
  const { setRef: setVisRef, isVisible } = useVisibility();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={(el) => { (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el; setVisRef(el); }}
      className="relative overflow-hidden bg-plum-dark py-16"
    >
      {/* ── Background dot grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ── Slow-moving gold gradient orb ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-primary/10 blur-[100px]"
        animate={isVisible ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        } : undefined}
        transition={isVisible ? {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        } : { duration: 0 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <div className="mb-12 text-center">
          <span className="mb-2 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-primary">
            Clinical Milestones
          </span>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Advancing Toward{" "}
            <span className="italic text-gold-primary">Patient Impact</span>
          </h2>
        </div>

        {/* ── Milestone cards grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <motion.div
                key={milestone.label}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,169,97,0.15)] hover:border-gold-primary/30 hover:-translate-y-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* ── Gold shimmer sweep ── */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(201,169,97,0.08) 40%, rgba(201,169,97,0.15) 50%, rgba(201,169,97,0.08) 60%, transparent 100%)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={
                    isInView && isVisible
                      ? {
                          x: ["-100%", "200%"],
                        }
                      : {}
                  }
                  transition={isVisible ? {
                    delay: index * 0.3,
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5,
                  } : { duration: 0 }}
                />

                {/* ── Card content ── */}
                <div className="relative z-10 flex flex-col items-start gap-4">
                  {/* Icon circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${milestone.bgClass}`}
                  >
                    <Icon
                      className={`h-6 w-6 ${milestone.colorClass}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-primary transition-colors duration-300">
                    {milestone.label}
                  </h3>

                  {/* Sublabel */}
                  <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                    {milestone.sublabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
