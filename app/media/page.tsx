"use client";

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
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DotGrid } from "@/components/ui/DotGrid";

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
    value: "Precision Peptide Platform",
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
    value: 'NIH "Unicorn" Score of 10',
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
    <main className="min-h-screen bg-surface flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      {/* Hero Section — cinematic plum-dark beat */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-plum-dark overflow-hidden">
        {/* One confident luminous accent (static) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] max-w-[80vw] max-h-[80vw] rounded-full bg-gold-primary/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] max-w-[80vw] max-h-[80vw] rounded-full bg-plum-primary/20 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span
              className="reveal-rise mb-6 block text-gold-primary text-xs font-bold uppercase tracking-[0.2em]"
              style={{ animationDelay: "0.05s" }}
            >
              Press Resources
            </span>
            <h1
              className="reveal-rise font-serif font-medium text-white mb-8 text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-balance"
              style={{ animationDelay: "0.15s" }}
            >
              Media Kit
            </h1>
            <p
              className="reveal-rise text-xl text-white/70 max-w-2xl leading-relaxed font-light"
              style={{ animationDelay: "0.28s" }}
            >
              Resources for press, partners, and stakeholders. Everything you
              need to cover EndoCyclic Therapeutics accurately.
            </p>
          </div>
        </div>
      </section>

      {/* Company Boilerplate */}
      <section className="relative py-24 md:py-32 bg-bone border-b border-plum-dark/10 overflow-hidden">
        <DotGrid />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div
            className="reveal-rise flex items-center gap-4 mb-10"
            style={{ animationDelay: "0.05s" }}
          >
            <Eyebrow>About the Company</Eyebrow>
            <div className="h-px flex-1 bg-plum-dark/10" />
          </div>

          <div
            className="reveal-rise relative bg-bone-raised p-8 md:p-12 rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="absolute top-0 left-0 h-[2px] w-16 bg-gold-primary rounded-full" />
            <p className="text-lg md:text-xl text-black-soft leading-relaxed mb-6">
              EndoCyclic Therapeutics, Inc. is a clinical-stage precision
              medicine company headquartered in Irvine, California. Founded by
              Dr. Tanya Petrossian, PhD, the company is developing a
              proprietary precision peptide platform with pH-mediated
              activation designed to act only in diseased tissue while avoiding
              hormones, surgery, and systemic toxicity.
            </p>
            <p className="text-lg md:text-xl text-black-soft leading-relaxed mb-6">
              The company&apos;s lead therapeutic, ENDO-205, is a first-in-class,
              non-hormonal precision peptide therapeutic for endometriosis that
              has received FDA IND Allowance and is currently in Phase 1
              clinical study. Its lead diagnostic candidate, FemLUNA, is
              designed to be the first non-invasive, definitive diagnostic for
              endometriosis.
            </p>
            <p className="text-base text-black-soft/70 leading-relaxed">
              Endometriosis affects more than 190 million women and girls
              worldwide, with an estimated annual economic burden exceeding
              $200 billion in the United States alone, and an average
              diagnostic delay of 8 years. The platform spans therapeutics,
              diagnostics, and oncology.
            </p>
            <div className="mt-8 pt-6 border-t border-plum-dark/10">
              <p className="text-xs text-plum-dark/40 uppercase tracking-[0.2em] font-bold">
                Boilerplate for press use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Grid */}
      <section className="relative py-24 md:py-32 bg-surface border-b border-plum-dark/10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span
              className="reveal-rise mb-8 block"
              style={{ animationDelay: "0.05s" }}
            >
              <Eyebrow>Fact Sheet</Eyebrow>
            </span>
            <SectionHeading className="reveal-rise" >
              Key Facts
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyFacts.map((fact, i) => (
              <div
                key={fact.label}
                className="reveal-rise group relative p-8 bg-bone-raised rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] transition-all duration-500 hover:border-gold-primary/40 hover:-translate-y-1"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <span className="absolute top-0 left-0 h-[2px] w-12 bg-gold-primary rounded-full transition-all duration-500 group-hover:w-full" />
                <div className="w-12 h-12 rounded-full bg-surface border border-gold-primary/30 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <fact.icon className="w-5 h-5 text-gold-deep" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-dark/40 mb-2 group-hover:text-plum-dark transition-colors">
                  {fact.label}
                </p>
                <h3 className="text-xl font-serif font-bold text-plum-dark mb-3 text-balance">
                  {fact.value}
                </h3>
                <p className="text-sm text-black-soft/80 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section className="relative py-24 md:py-32 bg-bone border-b border-plum-dark/10 overflow-hidden">
        <DotGrid />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <span
              className="reveal-rise mb-8 block"
              style={{ animationDelay: "0.05s" }}
            >
              <Eyebrow>Brand Assets</Eyebrow>
            </span>
            <SectionHeading className="reveal-rise mb-6">
              Logo Downloads
            </SectionHeading>
            <p
              className="reveal-rise text-black-soft/80 max-w-lg mx-auto leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Download official logos for use in press coverage and
              publications. Please do not modify or alter the logos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logos.map((logo, i) => (
              <div
                key={logo.filename}
                className="reveal-rise group bg-bone-raised rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] overflow-hidden transition-all duration-500 hover:border-gold-primary/40 hover:-translate-y-1"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <div className="relative h-48 md:h-56 bg-surface flex items-center justify-center p-8">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={280}
                    height={140}
                    style={{ width: "auto", height: "auto" }}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-6 flex items-center justify-between border-t border-plum-dark/10">
                  <div>
                    <p className="font-bold text-plum-dark text-sm">
                      {logo.label}
                    </p>
                    <p className="text-xs text-plum-dark/40 mt-0.5 tabular-nums">
                      {logo.filename}
                    </p>
                  </div>
                  <a
                    href={logo.src}
                    download={logo.filename}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-plum-dark text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gold-primary hover:text-plum-dark transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative py-24 md:py-32 bg-surface border-b border-plum-dark/10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div
            className="reveal-rise flex items-center gap-4 mb-10"
            style={{ animationDelay: "0.05s" }}
          >
            <Eyebrow>Leadership</Eyebrow>
            <div className="h-px flex-1 bg-plum-dark/10" />
          </div>

          <div
            className="reveal-rise relative bg-bone-raised rounded-xl border border-plum-dark/10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="absolute top-0 left-0 h-[2px] w-16 bg-gold-primary rounded-full" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden relative flex-shrink-0 ring-1 ring-gold-primary/30">
              <Image
                src="/team/tanya-petrossian.avif"
                alt="Dr. Tanya Petrossian"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div>
              <Eyebrow className="mb-2 block">Founder &amp; CEO</Eyebrow>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-plum-dark mb-4 text-balance">
                Dr. Tanya Petrossian, PhD
              </h3>
              <p className="text-black-soft leading-relaxed mb-6">
                Dr. Tanya Petrossian, PhD, is Founder and CEO of EndoCyclic
                Therapeutics and a founding member of the Milken Institute
                Women&apos;s Health Network. She leads the company&apos;s
                development of a non-hormonal precision peptide platform
                spanning therapeutics, diagnostics, and oncology.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-sm font-bold text-plum-dark hover:text-gold-deep transition-colors group uppercase tracking-wider"
              >
                View Full Team
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact — cinematic plum-dark beat */}
      <section className="py-24 md:py-32 bg-plum-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] max-w-[70vw] max-h-[70vw] rounded-full bg-gold-primary/12 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <span
              className="reveal-rise mb-6 block text-gold-primary text-xs font-bold uppercase tracking-[0.2em]"
              style={{ animationDelay: "0.05s" }}
            >
              Get In Touch
            </span>
            <h2
              className="reveal-rise text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter leading-[0.9] text-balance"
              style={{ animationDelay: "0.15s" }}
            >
              Media Contact
            </h2>
            <p
              className="reveal-rise text-xl text-white/70 max-w-lg mx-auto mb-12 font-light leading-relaxed"
              style={{ animationDelay: "0.28s" }}
            >
              For press inquiries, interview requests, or additional information,
              please reach out to our communications team.
            </p>

            <div
              className="reveal-rise bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 max-w-2xl mx-auto"
              style={{ animationDelay: "0.38s" }}
            >
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
