"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Microscope, Activity, Pill, ChevronDown, Sparkles, FlaskConical, Eye, Target } from "lucide-react";
import { useState } from "react";
import { pipeline, PHASES as phases } from "@/components/pipeline/pipelineData";
import PortfolioMatrix from "@/components/PortfolioMatrix";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useVisibility } from "@/hooks/useVisibility";

/** Static, always-visible phase visualization — fills render in the resting state
    (no width-from-0 reveal that could leave the bar blank if JS is paused). */
function PhaseBar({ activePhase, progress, color }: { activePhase: number; progress: number; color: string }) {
  return (
    <div
      className="w-full relative h-8 flex items-center"
      role="img"
      aria-label={`Development progress: currently in ${phases[activePhase]}`}
    >
      <div className="absolute inset-0 grid grid-cols-6 gap-1.5">
        {phases.map((_, i) => {
          const filled = i < activePhase;
          const current = i === activePhase;
          const width = filled ? "100%" : current ? `${Math.max(progress * 100, 6)}%` : "0%";
          return (
            <div key={i} className="relative h-2 rounded-full bg-plum-dark/[0.07]">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
                style={{ width, backgroundColor: color }}
              />
              {current && (
                <span
                  className="absolute top-1/2 w-3 h-3 rounded-full border-2 z-10 bg-bone-raised"
                  style={{
                    left: `${Math.max(progress * 100, 6)}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: color,
                    boxShadow: `0 0 8px ${color}55`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GridPattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default function PipelinePage() {
  const [filter, setFilter] = useState<"All" | "Therapeutic" | "Diagnostic">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { setRef: setVisRef, isVisible } = useVisibility();

  const animateOrb = isVisible && !reduced;

  const filteredPipeline = pipeline.filter((item) => filter === "All" || item.type === filter);

  const getColor = (type: string) => (type === "Diagnostic" ? "#4A9B8E" : "#C9A961");

  return (
    <main
      ref={(node) => setVisRef(node)}
      className="min-h-screen bg-surface flex flex-col font-sans relative overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 45% at 78% 8%, rgba(201,169,97,0.12), transparent 60%), #F4EEE1",
      }}
    >
      <Navbar />

      {/* Background elements — static luminous field (visible without JS) */}
      <div className="absolute inset-0 text-plum-dark">
        <GridPattern />
      </div>

      {/* One confident warm accent — frozen static under reduced motion */}
      <motion.div
        className="absolute top-[6%] right-0 w-[42rem] h-[42rem] rounded-full pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.16) 0%, transparent 70%)" }}
        animate={animateOrb ? { scale: [1, 1.1, 1], opacity: [0.75, 1, 0.75] } : undefined}
        transition={animateOrb ? { duration: 20, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-t from-plum-primary/10 to-transparent blur-3xl rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="pt-40 pb-24 container mx-auto px-6 relative z-10">
        {/* Header — deterministic CSS reveal, fully visible in static state */}
        <div className="max-w-4xl mb-20">
          <span className="reveal-rise mb-8 block" style={{ animationDelay: "0.05s" }}>
            <Eyebrow>Investigational Pipeline</Eyebrow>
          </span>
          <h1
            className="reveal-rise text-6xl md:text-[80px] font-serif font-bold mb-8 text-plum-dark leading-[0.9] tracking-tight text-balance"
            style={{ animationDelay: "0.15s" }}
          >
            Precision <br />
            <span className="text-gold-deep italic">Pipeline</span>
          </h1>
          <p
            className="reveal-rise text-xl md:text-2xl text-black-soft font-light leading-relaxed max-w-2xl border-l-2 border-gold-primary pl-6"
            style={{ animationDelay: "0.25s" }}
          >
            A proprietary peptide platform designed to act only where it matters. Our investigational
            pipeline advances first-in-class agents for endometriosis and oncology, with continued
            exploration of fibrosis and other chronic conditions.
          </p>
        </div>

        {/* Portfolio overview diagram + matched-pair thesis */}
        <div className="reveal-rise mb-16" style={{ animationDelay: "0.32s" }}>
          <div className="mb-6 max-w-3xl">
            <p className="text-sm md:text-base text-black-soft font-light leading-relaxed">
              Every program is a{" "}
              <span className="font-semibold text-gold-deep">matched pair</span> — a precision
              therapeutic developed alongside its companion diagnostic.{" "}
              <span className="font-semibold text-plum-dark">ENDO-205</span> with{" "}
              <span className="font-semibold text-plum-dark">FemLUNA&trade;</span> in endometriosis;{" "}
              <span className="font-semibold text-plum-dark">ENDO-995</span> with{" "}
              <span className="font-semibold text-plum-dark">ENDO-311</span> in oncology.
            </p>
          </div>
          <PortfolioMatrix variant="full" />
        </div>

        {/* Controls */}
        <div
          className="reveal-rise flex flex-col md:flex-row justify-between items-end gap-8 mb-12"
          style={{ animationDelay: "0.4s" }}
        >
          <div
            role="group"
            aria-label="Filter pipeline by program type"
            className="flex gap-1.5 sm:gap-2 bg-bone-raised p-1.5 rounded-full shadow-sm border border-plum-dark/10"
          >
            {(["All", "Therapeutic", "Diagnostic"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                aria-pressed={filter === type}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary ${
                  filter === type
                    ? "bg-plum-dark text-white shadow-md"
                    : "text-plum-primary/80 hover:text-plum-primary hover:bg-plum-dark/[0.04]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-plum-primary/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold-primary"></div> Therapeutic
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-clinical-teal"></div> Diagnostic
            </div>
          </div>
        </div>

        {/* Pipeline Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-plum-primary/80">
          <div className="col-span-4">Candidate Profile</div>
          <div className="col-span-8 grid grid-cols-6 gap-1 text-center">
            {phases.map((phase) => (
              <div key={phase}>{phase}</div>
            ))}
          </div>
        </div>

        {/* Pipeline List */}
        <div className="space-y-4 min-h-[250px] md:min-h-[400px]">
          {filteredPipeline.map((candidate, index) => (
            <div
              key={candidate.id}
              className={`reveal-rise group bg-bone-raised rounded-xl border border-plum-dark/10 hover:border-gold-primary/40 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] hover:shadow-[0_8px_40px_rgba(201,169,97,0.14)] transition-all duration-500 overflow-hidden ${
                expandedId === candidate.id ? "ring-1 ring-gold-primary/30 shadow-[0_8px_40px_rgba(201,169,97,0.14)]" : ""
              }`}
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <div
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === candidate.id}
                aria-controls={`candidate-details-${candidate.id}`}
                className="px-8 py-8 cursor-pointer relative"
                onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedId(expandedId === candidate.id ? null : candidate.id);
                  }
                }}
              >
                {/* Warm accent rule on the left edge — widens on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to bottom, ${getColor(candidate.type)}, ${getColor(candidate.type)}40)` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Candidate Info */}
                  <div className="col-span-1 md:col-span-4">
                    <div className="flex items-center gap-3 mb-2">
                      {candidate.type === "Therapeutic" ? (
                        <div className="w-9 h-9 rounded-lg bg-gold-primary/12 flex items-center justify-center text-gold-deep shrink-0 group-hover:bg-gold-primary/20 transition-colors duration-300">
                          <Pill size={15} aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-clinical-teal/12 flex items-center justify-center text-clinical-teal shrink-0 group-hover:bg-clinical-teal/20 transition-colors duration-300">
                          <Microscope size={15} aria-hidden="true" />
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-plum-dark group-hover:text-gold-deep transition-colors leading-tight">
                          {candidate.name}
                        </h2>
                      </div>
                      {/* Status Badge */}
                      <span
                        className="ml-auto md:ml-2 shrink-0 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border"
                        style={{
                          color: getColor(candidate.type) === "#C9A961" ? "#806524" : "#2F6E62",
                          borderColor: `${getColor(candidate.type)}30`,
                          backgroundColor: `${getColor(candidate.type)}0F`,
                        }}
                      >
                        {candidate.status}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-plum-primary/80 mb-1 pl-12">
                      {candidate.mechanism}
                    </p>
                    <p className="text-sm text-black-soft pl-12 font-light">{candidate.indication}</p>
                  </div>

                  {/* Phase Visualization */}
                  <div className="col-span-1 md:col-span-8 w-full">
                    <div className="md:hidden flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-plum-primary/80">Current Phase</span>
                      <span className="text-xs font-bold text-plum-dark">{phases[candidate.phase]}</span>
                    </div>
                    <PhaseBar activePhase={candidate.phase} progress={candidate.progress} color={getColor(candidate.type)} />
                  </div>
                </div>

                {/* Expand / Collapse Indicator */}
                <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep flex items-center gap-1.5 bg-bone-raised/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-plum-dark/10 hover:bg-gold-primary hover:text-white hover:border-transparent transition-colors">
                    {expandedId === candidate.id ? "Collapse" : "Learn More"}
                    <ChevronDown size={12} aria-hidden="true" className={`transition-transform duration-300 ${expandedId === candidate.id ? "rotate-180" : ""}`} />
                  </span>
                </div>
              </div>

              {/* Expanded Details — user-triggered disclosure (accordion) */}
              <motion.div
                id={`candidate-details-${candidate.id}`}
                role="region"
                aria-label={`${candidate.name} details`}
                initial={false}
                animate={{ height: expandedId === candidate.id ? "auto" : 0 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
                inert={expandedId !== candidate.id}
              >
                <div className="px-8 py-8 md:pl-[calc(33.33%+2rem)] border-t border-plum-dark/10 bg-gradient-to-br from-bone to-bone-raised">
                  <p className="text-black-soft font-light leading-relaxed max-w-2xl text-sm mb-6">
                    {candidate.description}
                  </p>
                  {candidate.highlights && candidate.highlights.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {candidate.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-black-soft p-3 bg-bone-raised rounded-lg border border-plum-dark/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        >
                          <span
                            aria-hidden="true"
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-black-primary text-[10px] font-bold tabular-nums"
                            style={{ backgroundColor: getColor(candidate.type) }}
                          >
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Link
                      href="/contact?subject=data"
                      className="flex items-center gap-2 px-5 py-2.5 bg-plum-dark text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gold-primary transition-colors whitespace-nowrap group/btn shadow-sm"
                    >
                      View Data <ArrowRight size={14} aria-hidden="true" className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10px] text-plum-primary/80 uppercase tracking-widest font-bold">
                      {phases[candidate.phase]} &middot; {candidate.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {filteredPipeline.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-16 h-16 bg-plum-dark/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity aria-hidden="true" className="w-8 h-8 text-plum-primary/30" />
              </div>
              <p className="text-plum-primary/80 font-light">No candidates found matching this criteria.</p>
            </div>
          )}
        </div>

        {/* Future Applications — plum-dark cinematic beat */}
        <motion.div
          initial={false}
          className="reveal-rise mt-20 bg-plum-dark rounded-xl p-8 md:p-12 relative overflow-hidden"
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,169,97,0.14) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold-primary/15 flex items-center justify-center text-gold-primary shrink-0">
                <Activity size={14} aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-cream-primary">Future Applications</h2>
            </div>
            <p className="text-cream-primary/70 font-light leading-relaxed max-w-3xl mb-8">
              Building on the versatility of our platform, we are actively exploring additional
              indications where non-hormonal, tissue-specific targeting is essential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Fibrosis", desc: "Tissue-specific targeting for fibrotic conditions", icon: Target },
                { label: "PCOS", desc: "Polycystic ovary syndrome therapeutic approaches", icon: Sparkles },
                { label: "Uterine Fibroids", desc: "Non-surgical alternatives for fibroid management", icon: Pill },
                { label: "Image-Guided Surgery", desc: "Real-time visualization during minimally invasive procedures", icon: Eye },
                { label: "Blood-Based Diagnostics", desc: "Biomarker-driven patient stratification", icon: FlaskConical },
                { label: "Treatment Monitoring", desc: "Track response and disease progression non-invasively", icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-gold-primary/40 hover:bg-white/[0.07] transition-all duration-300 group/future cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 group-hover/future:bg-gold-primary/15 transition-colors duration-300">
                      <Icon size={14} aria-hidden="true" className="text-cream-primary/60 group-hover/future:text-gold-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-cream-primary group-hover/future:text-gold-primary transition-colors duration-300">{item.label}</p>
                      <p className="text-xs text-cream-primary/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
