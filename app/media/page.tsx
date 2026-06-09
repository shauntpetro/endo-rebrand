"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  FlaskConical,
  Dna,
  Layers,
  Users,
  Award,
  Download,
  ArrowRight,
  Mail,
  Newspaper,
} from "lucide-react";

const keyFacts = [
  {
    icon: MapPin,
    label: "Founded",
    value: "Irvine, California",
    description:
      "Clinical-stage precision medicine company founded by Dr. Tanya Petrossian, PhD",
  },
  {
    icon: FlaskConical,
    label: "Stage",
    value: "Clinical-Stage (IND Cleared)",
    description: "FDA IND Allowance achieved in 2026 for lead therapeutic ENDO-205",
  },
  {
    icon: Dna,
    label: "Platform",
    value: "Cyclic Peptide Therapeutics",
    description:
      "Proprietary precision peptide platform with pH-mediated activation",
  },
  {
    icon: Layers,
    label: "Pipeline",
    value: "4 Candidates",
    description:
      "ENDO-205 (Phase 1), FemLUNA (IND-enabling), ENDO-995, ENDO-311",
  },
  {
    icon: Users,
    label: "Impact",
    value: "190M+ Women Affected",
    description:
      "Endometriosis affects 10% of reproductive-age women globally",
  },
  {
    icon: Award,
    label: "Recognition",
    value: 'NIH "Perfect 10" Grant',
    description:
      "Multiple NIH awards, White House recognition, Milken Institute founding member",
  },
];

const logos = [
  {
    src: "/logo.avif",
    alt: "EndoCyclic Therapeutics Logo",
    filename: "logo.avif",
    label: "Primary Logo",
  },
  {
    src: "/challenge-logo.svg",
    alt: "EndoCyclic Therapeutics Challenge Logo",
    filename: "challenge-logo.svg",
    label: "Challenge Logo",
  },
];

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-plum-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] max-w-[80vw] max-h-[80vw] rounded-full bg-gold-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] max-w-[80vw] max-h-[80vw] rounded-full bg-plum-primary/10 blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="text-gold-primary font-bold tracking-widest uppercase mb-4 text-sm">
                Press Resources
              </h5>
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-tight">
                Media Kit
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Resources for press, partners, and stakeholders. Everything you
                need to cover EndoCyclic Therapeutics accurately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Boilerplate */}
      <section className="py-20 md:py-28 bg-cream-primary">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gold-primary text-sm font-bold uppercase tracking-widest">
                About the Company
              </span>
              <div className="h-px flex-1 bg-gold-primary/20" />
            </div>

            <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                EndoCyclic Therapeutics, Inc. is a clinical-stage precision
                medicine company headquartered in Irvine, California. Founded by
                Dr. Tanya Petrossian, PhD, the company is developing a
                proprietary precision peptide platform with pH-mediated
                activation designed to act only in diseased tissue while avoiding
                hormones, surgery, and systemic toxicity.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                The company&apos;s lead therapeutic, ENDO-205, is a first-in-class,
                non-hormonal precision peptide therapeutic for endometriosis that
                has received FDA IND Allowance and is currently in Phase 1
                clinical study. Its lead diagnostic candidate, FemLUNA, is
                designed to be the first non-invasive, definitive diagnostic for
                endometriosis.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                Endometriosis affects more than 190 million women and girls
                worldwide, with an estimated annual economic burden exceeding
                $200 billion in the United States alone, and an average
                diagnostic delay of 8 years. The platform spans therapeutics,
                diagnostics, and oncology.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                  Boilerplate for press use
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Facts Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum-primary mb-4">
              Key Facts
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="relative p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-[0_8px_40px_rgba(201,169,97,0.12)] hover:border-gold-primary/20 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-cream-primary border border-gold-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <fact.icon className="w-5 h-5 text-gold-primary" />
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-hover:text-plum-primary transition-colors">
                  {fact.label}
                </p>
                <h3 className="text-xl font-serif font-bold text-plum-primary mb-3">
                  {fact.value}
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {fact.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section className="py-20 md:py-28 bg-cream-primary">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum-primary mb-4">
              Logo Downloads
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mx-auto mb-6" />
            <p className="text-gray-600 max-w-lg mx-auto">
              Download official logos for use in press coverage and
              publications. Please do not modify or alter the logos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-[0_8px_40px_rgba(201,169,97,0.12)] hover:border-gold-primary/20 transition-all duration-500"
              >
                <div className="relative h-48 md:h-56 bg-gray-50 flex items-center justify-center p-8">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={280}
                    height={140}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-6 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <p className="font-bold text-plum-primary text-sm">
                      {logo.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {logo.filename}
                    </p>
                  </div>
                  <a
                    href={logo.src}
                    download={logo.filename}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-plum-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gold-primary transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gold-primary text-sm font-bold uppercase tracking-widest">
                Leadership
              </span>
              <div className="h-px flex-1 bg-gold-primary/20" />
            </div>

            <div className="bg-cream-primary/50 rounded-xl border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden relative flex-shrink-0 shadow-lg">
                <Image
                  src="/team/tanya-petrossian.avif"
                  alt="Dr. Tanya Petrossian"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-2">
                  CEO, Founder & Inventor
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-plum-primary mb-4">
                  Dr. Tanya Petrossian, PhD
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Dr. Petrossian is a biochemist and serial entrepreneur with
                  over 15 years of experience in peptide therapeutics and
                  targeted drug delivery. She holds a Ph.D. from UCLA and has
                  led multiple biotech ventures from discovery to clinical
                  stages.
                </p>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-sm font-bold text-plum-primary hover:text-gold-primary transition-colors group uppercase tracking-wider"
                >
                  View Full Team
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20 md:py-28 bg-plum-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Media Contact
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-lg mx-auto mb-12 font-light leading-relaxed">
              For press inquiries, interview requests, or additional information,
              please reach out to our communications team.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 max-w-2xl mx-auto">
              <div className="flex flex-col gap-6">
                <a
                  href="mailto:info@endocyclic.com"
                  className="inline-flex items-center justify-center gap-3 text-lg text-white hover:text-gold-primary transition-colors group"
                >
                  <Mail size={20} className="text-gold-primary" />
                  <span className="font-medium">info@endocyclic.com</span>
                </a>

                <div className="h-px bg-white/10" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-primary text-plum-dark font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-white transition-colors"
                  >
                    <Mail size={16} />
                    Contact Us
                  </Link>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:border-gold-primary hover:text-gold-primary transition-colors"
                  >
                    <Newspaper size={16} />
                    Latest Coverage
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
