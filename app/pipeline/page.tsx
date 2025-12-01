"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Microscope, Activity, Pill } from "lucide-react";
import { useState, useEffect } from "react";

const phases = ["Discovery", "Preclinical", "IND Enabling", "Phase 1", "Phase 2", "Phase 3"];

interface PipelineItem {
  id: string;
  name: string;
  mechanism: string;
  indication: string;
  phase: number; // Index in phases array
  progress: number; // 0-1 progress within phase
  type: "Therapeutic" | "Diagnostic";
  description: string;
}

const pipeline: PipelineItem[] = [
  {
    id: "ENDO-205",
    name: "ENDO-205",
    mechanism: "Intracellular Peptide Inhibitor",
    indication: "Endometriosis (Non-Hormonal)",
    phase: 3,
    progress: 0.3,
    type: "Therapeutic",
    description: "First-in-class non-hormonal therapeutic targeting the root cause of endometriosis lesions. Currently enrolling for multi-center clinical trials."
  },
  {
    id: "FemLUNA",
    name: "FemLUNA™",
    mechanism: "Targeted Imaging Agent",
    indication: "Diagnostic Imaging",
    phase: 2,
    progress: 0.5,
    type: "Diagnostic",
    description: "Precision imaging agent designed to visualize endometriosis lesions with high specificity, enabling earlier and non-invasive diagnosis."
  },
  {
    id: "ENDO-995",
    name: "ENDO-995",
    mechanism: "Next-Gen Cyclic Peptide",
    indication: "Maintenance Therapy",
    phase: 1,
    progress: 0.75,
    type: "Therapeutic",
    description: "Oral maintenance therapy for long-term management of endometriosis symptoms and prevention of recurrence post-surgery."
  },
  {
    id: "ENDO-311",
    name: "ENDO-311",
    mechanism: "Dual-Action Peptide",
    indication: "Fibroids / Adenomyosis",
    phase: 1,
    progress: 0.6,
    type: "Therapeutic",
    description: "Dual-action peptide targeting both fibroid growth and associated pain pathways, offering a novel non-surgical alternative."
  }
];

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
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-2 rounded-full shadow-sm z-10" style={{ borderColor: color }} />
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
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans relative overflow-hidden">
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
                    We are advancing a diverse portfolio of first-in-class candidates to redefine care in endometriosis and women's health.
                </p>
            </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="flex gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                {(["All", "Therapeutic", "Diagnostic"] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
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
        </div>

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
        <div className="space-y-4 min-h-[400px]">
            <AnimatePresence mode="popLayout">
                {filteredPipeline.map((candidate, index) => (
                    <motion.div 
                        key={candidate.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`group bg-white rounded-lg border border-gray-100 hover:border-gold-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${expandedId === candidate.id ? 'ring-1 ring-gold-primary/30' : ''}`}
                    >
                        <div 
                            className="px-8 py-8 cursor-pointer relative"
                            onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                {/* Candidate Info */}
                                <div className="col-span-1 md:col-span-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        {candidate.type === 'Therapeutic' ? (
                                            <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shrink-0">
                                                <Pill size={14} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-clinical-teal/10 flex items-center justify-center text-clinical-teal shrink-0">
                                                <Microscope size={14} />
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-serif font-bold text-plum-dark group-hover:text-gold-primary transition-colors">
                                            {candidate.name}
                                        </h3>
                                    </div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1 pl-11">
                                        {candidate.mechanism}
                                    </p>
                                    <p className="text-sm text-gray-600 pl-11 font-light">
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
                            
                            {/* View Data Button - Bottom Right */}
                            <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-primary flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:bg-gold-primary hover:text-white transition-colors">
                                    Learn More <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        <motion.div 
                            initial={false}
                            animate={{ height: expandedId === candidate.id ? 'auto' : 0 }}
                            className="bg-gray-50/50 overflow-hidden"
                        >
                             <div className="px-8 py-6 md:pl-[calc(33.33%+2rem)] border-t border-gray-100">
                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                    <p className="text-gray-600 font-light leading-relaxed max-w-2xl text-sm">
                                        {candidate.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-plum-primary text-xs font-bold uppercase tracking-widest hover:text-gold-primary transition-colors whitespace-nowrap group/btn">
                                        View Data <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                             </div>
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
      </div>
      <Footer />
    </main>
  );
}
