"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import PortfolioMatrix from "@/components/PortfolioMatrix";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PipelinePreview() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-plum-dark/10"
      style={{
        background:
          "radial-gradient(72% 52% at 80% 16%, rgba(201,169,97,0.10), transparent 60%), linear-gradient(180deg, #FAF6EC, #F4EEE1)",
      }}
    >
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Matched-pair matrix — the single source of truth for the portfolio */}
          <div
            className="reveal-rise order-2 lg:order-1"
            style={{ animationDelay: "0.1s" }}
          >
            <motion.div
              style={reduced ? undefined : { y }}
              className="relative rounded-[20px] border border-plum-dark/10 bg-bone-raised p-3 shadow-gold-glow-sm will-change-transform"
            >
              <PortfolioMatrix variant="compact" />
            </motion.div>
          </div>

          {/* Thesis + CTA — no restating the pairing shown at left */}
          <div className="order-1 lg:order-2 flex flex-col relative z-10">
            <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
              <Eyebrow tone="plum" className="mb-8 block font-sans">
                Therapeutics &amp; Diagnostics
              </Eyebrow>
            </div>

            <SectionHeading className="reveal-rise mb-10">
              Our <br /> <span className="italic text-gold-deep">Pipeline</span>
            </SectionHeading>

            <p
              className="reveal-rise text-xl text-black-soft leading-relaxed font-normal border-l-2 border-gold-primary pl-6 font-sans mb-10"
              style={{ animationDelay: "0.15s" }}
            >
              One precision-peptide engine, two disease areas. Each therapeutic is
              matched to a diagnostic that finds the disease it clears — a
              first-in-class portfolio spanning endometriosis and oncology.
            </p>

            {/* Lead-program status readout — corrects each candidate individually */}
            <dl
              className="reveal-rise flex flex-wrap gap-x-10 gap-y-4 mb-12"
              style={{ animationDelay: "0.24s" }}
            >
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep mb-1">
                  ENDO-205
                </dt>
                <dd className="text-sm font-semibold text-plum-dark font-sans">
                  IND cleared · Phase 1
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep mb-1">
                  FemLUNA&trade;
                </dt>
                <dd className="text-sm font-semibold text-plum-dark font-sans">
                  IND-enabling
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep mb-1">
                  Oncology
                </dt>
                <dd className="text-sm font-semibold text-plum-dark font-sans">
                  25%+ of solid tumor types
                </dd>
              </div>
            </dl>

            <div className="reveal-rise" style={{ animationDelay: "0.32s" }}>
              <MagneticButton href="/pipeline">View Pipeline</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
