"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, Linkedin, ArrowRight } from "lucide-react";

const team = [
  {
    id: "tanya",
    name: "Tanya Petrossian, Ph.D.",
    role: "CEO, Founder, and Inventor",
    bio: "Dr. Petrossian is a biochemist and entrepreneur with over 15 years of experience in peptide therapeutics and targeted drug delivery. She holds a B.S. and Ph.D. in Biochemistry & Molecular Biology from UCLA, where she trained under Distinguished Professor Steven Clarke. Named City of Los Angeles Entrepreneur in Residence and a Biocom California Life Science Catalyst Award winner, she has led EndoCyclic from discovery through FDA IND clearance.",
    image: "/team/tanya-petrossian.avif",
    quote: "Our peptides help restore the body's natural surveillance system.",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "melanie",
    name: "Melanie Hartsough, Ph.D.",
    role: "Nonclinical Toxicology",
    bio: "Dr. Hartsough holds a Ph.D. in Pharmacology from Penn State College of Medicine and completed a postdoctoral fellowship at the NIH. A former FDA reviewer in both CBER and CDER, she brings over two decades of experience in pharmacology and toxicology assessment. She is the first recipient of the ACT Mildred Christian Women's Leadership in Toxicology Award and a former President of the American Board of Toxicology.",
    image: "/team/melanie-hartsough.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "david",
    name: "David Lin, Ph.D.",
    role: "CMC",
    bio: "Dr. Lin brings over 27 years of pharmaceutical regulatory experience in Chemistry, Manufacturing, and Controls (CMC). He holds a Ph.D. in organic chemistry and an MBA, and previously served as a CMC reviewer and acting Division Director at the FDA's Office of New Drug Chemistry (CDER).",
    image: "/team/david-lin.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "frank",
    name: "Frank Fernandez",
    role: "CFO",
    bio: "Frank brings decades of financial leadership experience in the life sciences sector, guiding strategic financial planning and investor relations.",
    image: "/team/frank-fernandez.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "andrea",
    name: "Andrea Lukes, MD",
    role: "Clinical Affairs",
    bio: "Dr. Lukes is a board-certified OB/GYN and Fellow of ACOG with over 30 years of clinical experience. She has conducted or overseen more than 90 clinical trials of investigational women's health products, spanning endometriosis, uterine fibroids, contraception, and menopause. She is the founder of Carolina Women's Research & Wellness Center.",
    image: "/team/andrea-lukes.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "aileen",
    name: "Aileen Ryan",
    role: "Regulatory Affairs",
    bio: "Aileen brings over 40 years of pharmaceutical regulatory experience, including leadership roles at Ludwig Institute for Cancer Research and Bayer Pharmaceuticals. She holds an M.S. in Basic Medical Sciences and has guided IND, NDA, BLA, and MAA submissions across oncology, women's health, and rare diseases.",
    image: "/team/aileen-ryan.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  },
  {
    id: "miganush",
    name: "Miganush Stepanians, Ph.D.",
    role: "Biostatistics",
    bio: "Dr. Stepanians holds a Ph.D. in Statistics from Boston University and an M.S. in Mathematics from MIT. With over 30 years in drug development, she has designed analyses for more than 20 successful marketing applications (NDAs/MAAs) and has presented on behalf of sponsors in meetings with the FDA.",
    image: "/team/miganush-stepanians.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics"
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedMember(null);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedMember, handleKeyDown]);

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 container mx-auto px-6 flex-grow max-w-7xl">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full md:w-5/12 lg:w-4/12"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={team[0].image}
                  alt={team[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="w-full md:w-7/12 lg:w-8/12"
            >
              <div className="border-l-2 border-gold-primary pl-8">
                <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">Founder & CEO</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black-primary mb-4">{team[0].name}</h2>
                <blockquote className="text-xl font-light italic text-black-soft mb-6 font-serif leading-relaxed">
                  &ldquo;{team[0].quote}&rdquo;
                </blockquote>
                <p className="text-black-soft/80 leading-relaxed mb-6 text-base md:text-lg max-w-2xl">
                  {team[0].bio}
                </p>
                <a href={team[0].linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-black-primary hover:text-gold-primary transition-colors group">
                  <Linkedin size={16} />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Grid - Smaller Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
            {team.slice(1).map((member) => (
                <motion.div
                    key={member.id}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                    className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-lg"
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedMember(member); } }}
                    onClick={() => setSelectedMember(member)}
                >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-lg shadow-sm group-hover:shadow-[0_8px_30px_rgba(74,63,92,0.15)] transition-all duration-500">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1.5 shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-plum-dark">View Bio</span>
                            <ArrowRight className="text-gold-primary" size={12} />
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
        </motion.div>
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
                    className="bg-white w-full max-w-4xl max-h-[85svh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setSelectedMember(null)}
                        aria-label="Close modal"
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 hover:rotate-90 transition-all duration-300 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                    >
                        <X size={20} />
                    </button>

                    <div className="md:w-5/12 min-h-[180px] md:min-h-full relative">
                         <Image
                            src={selectedMember.image}
                            alt={selectedMember.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                         />
                    </div>
                    
                    <motion.div
                        className="md:w-7/12 p-8 md:p-10 bg-white flex flex-col justify-center"
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
                    >
                        <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">{selectedMember.role}</motion.p>
                        <motion.h3 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-3xl font-serif font-bold text-black-primary mb-6">{selectedMember.name}</motion.h3>
                        
                        {selectedMember.quote && (
                          <motion.blockquote variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-lg font-light italic text-black-soft mb-6 border-l-2 border-gold-primary pl-4">
                              &ldquo;{selectedMember.quote}&rdquo;
                          </motion.blockquote>
                        )}

                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="prose text-black-soft/80 font-light leading-relaxed mb-8 text-sm md:text-base">
                            <p>{selectedMember.bio}</p>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black-primary hover:text-gold-primary transition-colors font-medium uppercase tracking-wider text-xs">
                                <Linkedin size={16} />
                                LinkedIn Profile
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
