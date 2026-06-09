"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Microscope, Activity, Pill, ChevronDown, Sparkles, FlaskConical, Eye, Target } from "lucide-react";
import { useState } from "react";
import { pipeline, PHASES as phases } from "@/components/pipeline/pipelineData";
import PortfolioMatrix from "@/components/PortfolioMatrix";

function PhaseBar({ activePhase, progress, color }: { activePhase: number, progress: number, color: string }) {
  return (
    <div className="w-full relative h-8 flex items-center">
      {/* Track */}
      <div className="absolute inset-0 grid grid-cols-6 gap-1">
        {phases.map((_, i) => (
          <div key={i} className={`h-2 rounded-full ${i <= activePhase ? 'bg-gray-200' : 'bg-gray-100'} transition-colors duration-500`} />
        ))}
      </div>

      {/* Active Progress */}
      <div className="absolute inset-0 grid grid-cols-6 gap-1 pointer-events-none">
        {phases.map((_, i) => {
             // Full bars for completed phases
             if (i < activePhase) {
                 return (
                    <motion.div 
                        key={i}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                 );
             }
             // Partial bar for current phase
             if (i === activePhase) {
                 return (
                    <motion.div 
                        key={i}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: activePhase * 0.1, ease: "circOut" }}
                        className="h-2 rounded-full relative"
                        style={{ backgroundColor: color }}
                    >
                        {/* Current Phase Indicator Dot */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-2 rounded-full shadow-sm z-10 animate-pulse" style={{ borderColor: color, boxShadow: `0 0 8px ${color}40` }} />
                    </motion.div>
                 );
             }
             return <div key={i} className="h-2 rounded-full bg-transparent" />;
        })}
      </div>
    </div>
  );
}

function GridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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
  
  const filteredPipeline = pipeline.filter(item => filter === "All" || item.type === filter);

  const getColor = (type: string) => type === 'Diagnostic' ? '#4A9B8E' : '#C9A961';

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative overflow-hidden">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 text-black-primary">
          <GridPattern />
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-gold-light/20 to-transparent blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-plum-primary/10 to-transparent blur-3xl rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="pt-40 pb-24 container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-6xl md:text-[80px] font-serif font-bold mb-8 text-plum-dark leading-[0.9] tracking-tight">
                    Precision <br/>
                    <span className="text-gold-primary italic">Pipeline</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl border-l-4 border-gold-primary pl-6">
                    Advancing a proprietary peptide platform designed to act only where it matters. Our investigational pipeline includes first-in-class agents for endometriosis and oncology, with continued development for fibrosis and other chronic conditions.
                </p>
            </motion.div>
        </div>

        {/* Portfolio overview diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <PortfolioMatrix variant="full" />
        </motion.div>

        {/* Controls */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12"
        >
            <div className="flex gap-1.5 sm:gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                {(["All", "Therapeutic", "Diagnostic"] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        aria-pressed={filter === type}
                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary ${
                            filter === type
                            ? "bg-plum-dark text-white shadow-md"
                            : "text-gray-500 hover:text-plum-primary hover:bg-gray-50"
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
            
            <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-gold-primary"></div> Therapeutic
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-clinical-teal"></div> Diagnostic
                </div>
            </div>
        </motion.div>

        {/* Pipeline Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-6 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-plum-primary/40">
            <div className="col-span-4">Candidate Profile</div>
            <div className="col-span-8 grid grid-cols-6 gap-1 text-center">
                {phases.map((phase) => (
                    <div key={phase}>{phase}</div>
                ))}
            </div>
        </div>

        {/* Pipeline List */}
        <div className="space-y-4 min-h-[250px] md:min-h-[400px]">
            <AnimatePresence mode="popLayout">
                {filteredPipeline.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`group bg-white rounded-xl border border-gray-100 hover:border-gold-primary/30 shadow-sm hover:shadow-[0_8px_40px_rgba(201,169,97,0.12)] transition-all duration-500 overflow-hidden ${expandedId === candidate.id ? 'ring-1 ring-gold-primary/30 shadow-[0_8px_40px_rgba(201,169,97,0.12)]' : ''}`}
                    >
                        <div
                            className="px-8 py-8 cursor-pointer relative"
                            onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                        >
                            {/* Subtle gradient accent on left edge */}
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                              style={{ background: `linear-gradient(to bottom, ${getColor(candidate.type)}, ${getColor(candidate.type)}40)` }}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                {/* Candidate Info */}
                                <div className="col-span-1 md:col-span-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        {candidate.type === 'Therapeutic' ? (
                                            <div className="w-9 h-9 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0 group-hover:bg-gold-primary/20 transition-colors duration-300">
                                                <Pill size={15} />
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 rounded-lg bg-clinical-teal/10 flex items-center justify-center text-clinical-teal shrink-0 group-hover:bg-clinical-teal/20 transition-colors duration-300">
                                                <Microscope size={15} />
                                            </div>
                                        )}
                                        <div>
                                          <h3 className="text-2xl font-serif font-bold text-plum-dark group-hover:text-gold-primary transition-colors leading-tight">
                                              {candidate.name}
                                          </h3>
                                        </div>
                                        {/* Status Badge */}
                                        <span
                                          className="ml-auto md:ml-2 shrink-0 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border"
                                          style={{
                                            color: getColor(candidate.type),
                                            borderColor: `${getColor(candidate.type)}30`,
                                            backgroundColor: `${getColor(candidate.type)}08`,
                                          }}
                                        >
                                          {candidate.status}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1 pl-12">
                                        {candidate.mechanism}
                                    </p>
                                    <p className="text-sm text-gray-600 pl-12 font-light">
                                        {candidate.indication}
                                    </p>
                                </div>

                                {/* Phase Visualization */}
                                <div className="col-span-1 md:col-span-8 w-full">
                                    <div className="md:hidden flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Current Phase</span>
                                        <span className="text-xs font-bold text-plum-dark">{phases[candidate.phase]}</span>
                                    </div>
                                    <PhaseBar
                                        activePhase={candidate.phase}
                                        progress={candidate.progress}
                                        color={getColor(candidate.type)}
                                    />
                                </div>
                            </div>

                            {/* Expand / Collapse Indicator */}
                            <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-primary flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:bg-gold-primary hover:text-white transition-colors">
                                    {expandedId === candidate.id ? 'Collapse' : 'Learn More'}
                                    <ChevronDown size={12} className={`transition-transform duration-300 ${expandedId === candidate.id ? 'rotate-180' : ''}`} />
                                </span>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        <motion.div
                            initial={false}
                            animate={{ height: expandedId === candidate.id ? 'auto' : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-gray-50/50 overflow-hidden"
                        >
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: expandedId === candidate.id ? 1 : 0 }}
                                transition={{ duration: 0.3, delay: expandedId === candidate.id ? 0.2 : 0 }}
                                className="px-8 py-8 md:pl-[calc(33.33%+2rem)] border-t border-gray-100 bg-gradient-to-br from-gray-50/80 to-white"
                             >
                                <p className="text-gray-600 font-light leading-relaxed max-w-2xl text-sm mb-6">
                                    {candidate.description}
                                </p>
                                {candidate.highlights && candidate.highlights.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                        {candidate.highlights.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: expandedId === candidate.id ? 1 : 0, y: expandedId === candidate.id ? 0 : 8 }}
                                                transition={{ duration: 0.3, delay: expandedId === candidate.id ? 0.3 + i * 0.08 : 0 }}
                                                className="flex items-start gap-3 text-sm text-gray-600 p-3 bg-white rounded-lg border border-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                                            >
                                                <span
                                                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-white text-[10px] font-bold"
                                                  style={{ backgroundColor: getColor(candidate.type) }}
                                                >
                                                  {i + 1}
                                                </span>
                                                <span className="leading-relaxed">{h}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <Link href="/contact?subject=data" className="flex items-center gap-2 px-5 py-2.5 bg-plum-dark text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gold-primary transition-colors whitespace-nowrap group/btn shadow-sm">
                                        View Data <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                        {phases[candidate.phase]} &middot; {candidate.type}
                                    </span>
                                </div>
                             </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {filteredPipeline.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="py-32 text-center"
                >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-light">No candidates found matching this criteria.</p>
                </motion.div>
            )}
        </div>
        {/* Future Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-12 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-plum-primary/10 flex items-center justify-center text-plum-primary shrink-0">
              <Activity size={14} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-plum-dark">Future Applications</h2>
          </div>
          <p className="text-gray-600 font-light leading-relaxed max-w-3xl mb-6">
            Building on the versatility of our platform, we are actively exploring additional indications where non-hormonal, tissue-specific targeting is essential.
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
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3 p-5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gold-primary/20 hover:bg-white hover:shadow-[0_4px_20px_rgba(201,169,97,0.08)] transition-all duration-300 group/future cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-plum-primary/5 flex items-center justify-center shrink-0 group-hover/future:bg-gold-primary/10 transition-colors duration-300">
                    <Icon size={14} className="text-plum-primary/60 group-hover/future:text-gold-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-plum-dark group-hover/future:text-gold-primary transition-colors duration-300">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
