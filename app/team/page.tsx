"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, Linkedin, ArrowRight } from "lucide-react";

const team = [
  {
    id: "tanya",
    name: "Tanya Petrossian, Ph.D.",
    role: "CEO, Founder, and Inventor",
    bio: "Dr. Petrossian is a biochemist and serial entrepreneur with over 15 years of experience in peptide therapeutics and targeted drug delivery. She holds a Ph.D. from UCLA and has led multiple successful biotech ventures from discovery to clinical stages.",
    image: "/team/tanya-petrossian.avif",
    quote: "Our peptides help restore the body's natural surveillance system.",
    linkedin: "#"
  },
  {
    id: "melanie",
    name: "Melanie Hartsough, Ph.D.",
    role: "Nonclinical Toxicology",
    bio: "Dr. Hartsough leads our nonclinical toxicology efforts with deep expertise in safety assessment and preclinical development of novel therapeutics.",
    image: "/team/melanie-hartsough.avif",
    linkedin: "#"
  },
  {
    id: "david",
    name: "David Lin, Ph.D.",
    role: "CMC",
    bio: "Dr. Lin oversees Chemistry, Manufacturing, and Controls (CMC) with extensive experience in pharmaceutical development and quality systems.",
    image: "/team/david-lin.avif",
    linkedin: "#"
  },
  {
    id: "frank",
    name: "Frank Fernandez",
    role: "CFO",
    bio: "Frank brings decades of financial leadership experience in the life sciences sector, guiding strategic financial planning and investor relations.",
    image: "/team/frank-fernandez.avif",
    linkedin: "#"
  },
  {
    id: "andrea",
    name: "Andrea Lukes, MD",
    role: "Clinical Affairs",
    bio: "Dr. Lukes brings extensive clinical expertise in women's health and gynecology. Her research has shaped treatment paradigms for endometriosis and other reproductive disorders.",
    image: "/team/andrea-lukes.avif",
    linkedin: "#"
  },
  {
    id: "aileen",
    name: "Aileen Ryan",
    role: "Regulatory Affairs",
    bio: "Aileen guides our regulatory strategy with extensive FDA experience. She has successfully shepherded numerous drug applications through the approval process.",
    image: "/team/aileen-ryan.avif",
    linkedin: "#"
  },
  {
    id: "miganush",
    name: "Miganush Stepanians, Ph.D.",
    role: "Biostatistics",
    bio: "Dr. Stepanians leads our biostatistics efforts, bringing rigorous analytical expertise to clinical trial design and data interpretation.",
    image: "/team/miganush-stepanians.avif",
    linkedin: "#"
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6 flex-grow max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl leading-none font-serif font-bold mb-6 tracking-tight text-black-primary">
            Our Team
          </h1>
          <div className="w-16 h-0.5 bg-gold-primary mb-6" />
          <p className="text-xl md:text-2xl text-black-soft leading-relaxed font-light max-w-2xl">
            Led by Dr. Tanya Petrossian, we combine world-class expertise in peptide chemistry, oncology, and women&apos;s health to solve the most challenging problems in medicine.
          </p>
        </motion.div>

        {/* Founder Spotlight - Compact Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-5/12 lg:w-4/12">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${team[0].image})` }}
                />
              </div>
            </div>
            
            <div className="w-full md:w-7/12 lg:w-8/12">
              <div className="border-l-2 border-gold-primary pl-8">
                <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">Founder & CEO</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black-primary mb-4">{team[0].name}</h2>
                <blockquote className="text-xl font-light italic text-black-soft mb-6 font-serif leading-relaxed">
                  &ldquo;{team[0].quote}&rdquo;
                </blockquote>
                <p className="text-black-soft/80 leading-relaxed mb-6 text-base md:text-lg max-w-2xl">
                  {team[0].bio}
                </p>
                <a href={team[0].linkedin} className="inline-flex items-center gap-2 text-sm font-semibold text-black-primary hover:text-gold-primary transition-colors group">
                  <Linkedin size={16} />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Grid - Smaller Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {team.slice(1).map((member, index) => (
                <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <div className="absolute inset-0 bg-black-primary/0 group-hover:bg-black-primary/10 transition-colors duration-500" />
                        
                        {/* Hover Overlay Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500">
                            <ArrowRight className="text-black-primary" size={20} />
                          </div>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-gold-primary text-[10px] font-bold uppercase tracking-widest mb-1.5">{member.role}</p>
                        <h3 className="text-lg font-serif font-bold text-black-primary group-hover:text-gold-primary transition-colors leading-tight">
                            {member.name}
                        </h3>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Bio Modal - Refined */}
      <AnimatePresence>
        {selectedMember && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black-primary/60 backdrop-blur-sm"
                onClick={() => setSelectedMember(null)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row rounded-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedMember(null)}
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="md:w-5/12 min-h-[250px] md:min-h-full relative">
                         <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${selectedMember.image})` }}
                         />
                    </div>
                    
                    <div className="md:w-7/12 p-8 md:p-10 bg-white flex flex-col justify-center">
                        <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">{selectedMember.role}</p>
                        <h3 className="text-3xl font-serif font-bold text-black-primary mb-6">{selectedMember.name}</h3>
                        
                        {selectedMember.quote && (
                          <blockquote className="text-lg font-light italic text-black-soft mb-6 border-l-2 border-gold-primary pl-4">
                              &ldquo;{selectedMember.quote}&rdquo;
                          </blockquote>
                        )}

                        <div className="prose text-black-soft/80 font-light leading-relaxed mb-8 text-sm md:text-base">
                            <p>{selectedMember.bio}</p>
                        </div>

                        <div>
                            <a href={selectedMember.linkedin} className="inline-flex items-center gap-2 text-black-primary hover:text-gold-primary transition-colors font-medium uppercase tracking-wider text-xs">
                                <Linkedin size={16} /> 
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
