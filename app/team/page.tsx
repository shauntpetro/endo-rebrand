"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, Linkedin, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
    <main className="min-h-screen bg-bone flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      <div
        className="pt-24 md:pt-32 pb-12 md:pb-20 flex-grow relative"
        style={{
          background:
            "radial-gradient(60% 40% at 78% 8%, rgba(201,169,97,0.10), transparent 60%)",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header Section — deterministic CSS reveal (visible in static state) */}
          <div className="mb-16 md:mb-20 max-w-4xl">
            <span
              className="reveal-rise mb-6 block"
              style={{ animationDelay: "0.05s" }}
            >
              <Eyebrow>The People Behind the Platform</Eyebrow>
            </span>
            <h1
              className="reveal-rise font-serif font-bold tracking-tighter text-plum-dark text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] text-balance mb-6"
              style={{ animationDelay: "0.15s" }}
            >
              Our Team
            </h1>
            <div className="reveal-rise w-16 h-0.5 bg-gold-primary mb-6" style={{ animationDelay: "0.25s" }} />
            <p
              className="reveal-rise text-xl md:text-2xl text-black-soft leading-relaxed font-light max-w-2xl text-balance"
              style={{ animationDelay: "0.35s" }}
            >
              Led by Dr. Tanya Petrossian, we combine world-class expertise in peptide chemistry, oncology, and women&apos;s health to advance a precision medicine platform.
            </p>
          </div>

          {/* Founder Spotlight — cinematic plum-dark beat */}
          <div
            className="reveal-rise mb-24 md:mb-28 rounded-2xl overflow-hidden bg-plum-dark text-cream-primary relative"
            style={{ animationDelay: "0.15s" }}
          >
            {/* Warm luminous accent — single confident glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(45% 60% at 24% 40%, rgba(201,169,97,0.18), transparent 65%)",
              }}
            />
            <div className="flex flex-col md:flex-row items-stretch gap-0 relative z-10">
              <div className="w-full md:w-5/12 lg:w-4/12">
                <div className="relative aspect-[3/4] md:h-full overflow-hidden group">
                  <Image
                    src={team[0].image}
                    alt={team[0].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full md:w-7/12 lg:w-8/12 flex items-center">
                <div className="border-l-2 border-gold-primary pl-8 md:pl-10 py-10 md:py-12 pr-8">
                  <Eyebrow className="mb-3 block">Founder &amp; CEO</Eyebrow>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-cream-primary mb-5 tracking-tight text-balance">
                    {team[0].name}
                  </h2>
                  <blockquote className="text-xl md:text-2xl font-light italic text-gold-light mb-6 font-serif leading-relaxed text-balance">
                    &ldquo;{team[0].quote}&rdquo;
                  </blockquote>
                  <p className="text-cream-primary/75 leading-relaxed mb-8 text-base md:text-lg max-w-2xl font-light">
                    {team[0].bio}
                  </p>
                  <a
                    href={team[0].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cream-primary hover:text-gold-light transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-sm"
                  >
                    <Linkedin size={16} />
                    <span>Connect on LinkedIn</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Grid — CSS reveal, content visible in static state */}
          <div className="mb-6">
            <Eyebrow tone="plum">The Full Bench</Eyebrow>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {team.slice(1).map((member, index) => (
              <div
                key={member.id}
                className="reveal-rise group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-lg"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`View bio for ${member.name}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedMember(member); } }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-bone-raised mb-4 rounded-lg border border-plum-dark/10 transition-all duration-500 group-hover:border-gold-primary/40 group-hover:-translate-y-1">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-3 py-1.5 rounded-full bg-bone-raised/95 backdrop-blur-sm flex items-center gap-1.5 shadow-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-plum-dark">View Bio</span>
                      <ArrowRight className="text-gold-deep" size={12} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gold-deep text-[10px] font-bold uppercase tracking-widest mb-1.5">{member.role}</p>
                  <h3 className="text-lg font-serif font-bold text-plum-dark group-hover:text-gold-deep transition-colors leading-tight text-balance">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Modal — Luminous Editorial */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-plum-dark/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="bio-modal-name"
              initial={{ scale: 0.97, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 16 }}
              className="bg-bone-raised w-full max-w-4xl max-h-[85svh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row rounded-2xl border border-plum-dark/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-2 bg-bone-raised/85 backdrop-blur rounded-full text-plum-dark hover:bg-gold-primary/15 hover:rotate-90 transition-all duration-300 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
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

              <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
                <Eyebrow className="mb-3 block">{selectedMember.role}</Eyebrow>
                <h3
                  id="bio-modal-name"
                  className="text-3xl md:text-4xl font-serif font-bold text-plum-dark mb-6 tracking-tight text-balance"
                >
                  {selectedMember.name}
                </h3>

                {selectedMember.quote && (
                  <blockquote className="text-lg font-light italic text-black-soft mb-6 border-l-2 border-gold-primary pl-4 leading-relaxed">
                    &ldquo;{selectedMember.quote}&rdquo;
                  </blockquote>
                )}

                <div className="text-black-soft/85 font-light leading-relaxed mb-8 text-sm md:text-base">
                  <p>{selectedMember.bio}</p>
                </div>

                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-plum-dark hover:text-gold-deep transition-colors font-medium uppercase tracking-wider text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-sm"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
