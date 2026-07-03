"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Award,
  FlaskConical,
  Microscope,
  Download,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Send,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Target,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Data ─── */

const metrics = [
  {
    icon: TrendingUp,
    value: "$200B+",
    label: "Annual US economic burden of endometriosis",
  },
  {
    icon: Users,
    value: "190M+",
    label: "Women affected worldwide",
  },
  {
    icon: ShieldCheck,
    value: "IND Cleared",
    label: "FDA regulatory milestone for ENDO-205",
  },
  {
    icon: Award,
    value: 'Perfect "10"',
    label: "NIH grant score — 'unicorn' designation",
  },
];

const pipelineItems = [
  {
    name: "ENDO-205",
    indication: "Endometriosis (Therapeutic)",
    stage: "Phase 1",
    stageColor: "bg-clinical-teal",
    description:
      "First-in-class, non-hormonal precision peptide therapeutic designed to eliminate endometriosis lesions.",
  },
  {
    name: "FemLUNA™",
    indication: "Endometriosis (Diagnostic)",
    stage: "IND-Enabling",
    stageColor: "bg-gold-primary",
    description:
      "First non-invasive, definitive diagnostic for endometriosis.",
  },
  {
    name: "ENDO-995",
    indication: "Oncology (Therapeutic)",
    stage: "Preclinical",
    stageColor: "bg-plum-primary",
    description:
      "Tumor-selective, non-hormonal cyclic peptide in development for malignant solid tumors.",
  },
  {
    name: "ENDO-311",
    indication: "Oncology (Diagnostic)",
    stage: "Preclinical",
    stageColor: "bg-plum-primary",
    description:
      "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors.",
  },
];

/* ─── Page Component ─── */

export default function InvestorsPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const animateOrb = !reduced;

  /* ─── Form state ─── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  /* ─── Form handlers ─── */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (formError) setFormError("");
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string): boolean => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full name is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!EMAIL_REGEX.test(value.trim()))
          error = "Please enter a valid email address.";
        break;
      case "company":
        if (!value.trim()) error = "Company or firm name is required.";
        break;
    }
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
      return false;
    }
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    return true;
  };

  const validateForm = (): boolean => {
    const nameValid = validateField("name", formData.name);
    const emailValid = validateField("email", formData.email);
    const companyValid = validateField("company", formData.company);
    setTouchedFields({ name: true, email: true, company: true });
    return nameValid && emailValid && companyValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          message: "",
        });
        setTouchedFields({});
        setFieldErrors({});
      }, 5000);
    } catch {
      setFormError(
        "Network error. Please check your connection and try again."
      );
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getFieldClassName = (fieldName: string, baseClass: string) => {
    const hasError = touchedFields[fieldName] && fieldErrors[fieldName];
    return `${baseClass} ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
        : "border-plum-dark/15 focus:border-gold-primary focus:ring-gold-primary focus:shadow-[0_0_0_3px_rgba(201,169,97,0.12)]"
    }`;
  };

  return (
    <main className="min-h-screen bg-bone flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      {/* ════════════════════════════════════════════════════════
          HERO — cinematic plum-dark beat
      ════════════════════════════════════════════════════════ */}
      <section className="relative bg-plum-dark text-white pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        {/* Warm luminous accents */}
        <motion.div
          className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.22) 0%, transparent 70%)",
          }}
          animate={
            animateOrb ? { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] } : undefined
          }
          transition={
            animateOrb
              ? { duration: 20, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-plum-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <span
              className="reveal-rise mb-4 block"
              style={{ animationDelay: "0.05s" }}
            >
              <Eyebrow>Investor Relations</Eyebrow>
            </span>
            <h1
              className="reveal-rise text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-[1.05] text-balance"
              style={{ animationDelay: "0.15s" }}
            >
              Invest in the Future of{" "}
              <span className="italic text-gold-primary">Women&apos;s Health</span>
            </h1>
            <div
              className="reveal-rise w-16 h-0.5 bg-gold-primary mb-6"
              style={{ animationDelay: "0.24s" }}
            />
            <p
              className="reveal-rise text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light"
              style={{ animationDelay: "0.32s" }}
            >
              EndoCyclic Therapeutics is redefining precision medicine with a
              clinical-stage pipeline addressing a $200B unmet need in
              endometriosis and women&apos;s health.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          KEY METRICS
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-24 border-b border-plum-dark/10"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 0%, rgba(201,169,97,0.10), transparent 62%), #F4EEE1",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {metrics.map((metric, i) => (
              <div
                key={metric.value}
                className="reveal-rise group bg-bone-raised border border-plum-dark/10 rounded-xl p-8 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] hover:border-gold-primary/40 hover:-translate-y-1 transition-all duration-300 text-center"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-gold-primary/12 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                  <metric.icon className="text-gold-primary" size={22} />
                </div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-plum-dark mb-2 tabular-nums">
                  {metric.value}
                </p>
                <p className="text-sm text-black-soft leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARKET OPPORTUNITY
      ════════════════════════════════════════════════════════ */}
      <section className="bg-bone py-16 md:py-24 border-b border-plum-dark/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
            <Eyebrow className="mb-3 block">The Opportunity</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum-dark mb-4 tracking-tight text-balance">
              A Massively Underserved Market
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mb-4" />
            <p className="text-black-soft leading-relaxed max-w-3xl mb-10 text-base md:text-lg">
              Closing the women&apos;s health gap represents a $1&nbsp;trillion annual
              global economic opportunity (McKinsey, 2024). Endometriosis alone accounts
              for $180&ndash;250B in global market potential, yet the space remains dramatically
              underfunded relative to its burden.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                value: "$9.5K–$21K",
                label: "Annual cost per patient — 65–84% from lost productivity",
              },
              {
                icon: Clock,
                value: "7–9 Years",
                label: "Average diagnostic delay — patients see 7 providers before diagnosis",
              },
              {
                icon: BarChart3,
                value: "~2%",
                label: "Share of health VC funding directed to women's health",
              },
              {
                icon: Target,
                value: "13.7%",
                label: "Projected CAGR for non-hormonal endometriosis therapies",
              },
            ].map((item, i) => (
              <div
                key={item.value}
                className="reveal-rise group bg-bone-raised border border-plum-dark/10 rounded-xl p-6 md:p-8 hover:border-gold-primary/40 hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-gold-primary/12 flex items-center justify-center mb-4 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="text-gold-primary" size={20} />
                </div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-plum-dark mb-2 tabular-nums">
                  {item.value}
                </p>
                <p className="text-sm text-black-soft leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Funding contrast — cinematic plum-dark beat */}
          <div
            className="reveal-rise mt-10 bg-plum-dark rounded-xl p-8 md:p-10 text-white"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Eyebrow className="mb-3 block">Funding Disparity</Eyebrow>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 tabular-nums">
                  $44M vs. $1.24B
                </h3>
                <p className="text-white/70 leading-relaxed">
                  From 2019&ndash;2023, endometriosis research received just $44M in
                  funding — compared to $1.24B for erectile dysfunction over the
                  same period. Despite affecting 190M+ women worldwide, the disease
                  remains one of the most underfunded conditions in medicine.
                </p>
              </div>
              <div className="md:border-l border-white/15 md:pl-8">
                <Eyebrow className="mb-3 block">Momentum Building</Eyebrow>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 tabular-nums">
                  $2.6B in 2024
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Venture investment in women&apos;s health reached $2.6B in 2024, a
                  55% year-over-year increase. Every $1 invested in women&apos;s
                  health yields an estimated $3 in economic return (McKinsey Health
                  Institute).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PLATFORM OVERVIEW
      ════════════════════════════════════════════════════════ */}
      <section className="bg-bone py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
            <Eyebrow className="mb-3 block">Our Platform</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum-dark mb-4 tracking-tight text-balance">
              Precision Peptide Platform
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: FlaskConical,
                title: "Non-Hormonal Approach",
                body: "Our proprietary cyclic peptides offer a non-hormonal mechanism of action, designed to act only in diseased tissue while avoiding hormones, surgery, and systemic toxicity.",
              },
              {
                icon: Microscope,
                title: "pH-Mediated Activation",
                body: "Selective uptake by diseased tissue via a proprietary endocytic pathway with pH-mediated activation, enabling precision targeting with a favorable selectivity profile.",
              },
              {
                icon: TrendingUp,
                title: "Multi-Indication Potential",
                body: "The platform spans therapeutics, diagnostics, and oncology — expanding into additional women's health indications and oncology applications.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal-rise group"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-clinical-teal/10 flex items-center justify-center mb-4 group-hover:bg-clinical-teal/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="text-clinical-teal" size={22} />
                </div>
                <h3 className="text-lg font-serif font-bold text-plum-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-black-soft leading-relaxed text-sm md:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PIPELINE SNAPSHOT
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-24 border-b border-plum-dark/10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,169,97,0.08), transparent 60%), #F4EEE1",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
            <Eyebrow className="mb-3 block">Clinical Pipeline</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum-dark mb-4 tracking-tight text-balance">
              Pipeline Snapshot
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mb-10" />
          </div>

          {/* Pipeline table */}
          <div
            className="reveal-rise bg-bone-raised border border-plum-dark/10 rounded-xl overflow-hidden"
            style={{ animationDelay: "0.15s" }}
          >
            {/* Table header — hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-8 py-4 bg-plum-dark text-white text-xs font-bold uppercase tracking-wider">
              <div className="col-span-2">Program</div>
              <div className="col-span-4">Indication</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-4">Description</div>
            </div>

            {pipelineItems.map((item, i) => (
              <div
                key={item.name}
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 md:px-8 py-5 md:py-4 items-center ${
                  i < pipelineItems.length - 1
                    ? "border-b border-plum-dark/10"
                    : ""
                } hover:bg-gold-primary/[0.04] transition-colors`}
              >
                <div className="md:col-span-2">
                  <span className="font-bold text-plum-dark text-base md:text-sm">
                    {item.name}
                  </span>
                </div>
                <div className="md:col-span-4 text-black-soft text-sm">
                  {item.indication}
                </div>
                <div className="md:col-span-2 mt-1 md:mt-0">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      item.stageColor === "bg-clinical-teal"
                        ? "bg-clinical-teal/10 text-clinical-teal"
                        : item.stageColor === "bg-gold-primary"
                          ? "bg-gold-primary/12 text-gold-deep"
                          : "bg-plum-primary/10 text-plum-primary"
                    }`}
                  >
                    {item.stage}
                  </span>
                </div>
                <div className="md:col-span-4 text-black-soft text-sm leading-relaxed mt-1 md:mt-0">
                  {item.description}
                </div>
              </div>
            ))}
          </div>

          <div
            className="reveal-rise mt-8 text-center"
            style={{ animationDelay: "0.25s" }}
          >
            <Link
              href="/pipeline"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-plum-primary hover:text-gold-deep transition-colors group"
            >
              View Full Pipeline
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DOWNLOAD & ACCESS — cinematic plum-dark beat
      ════════════════════════════════════════════════════════ */}
      <section className="bg-plum-dark text-white py-16 md:py-24 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4 pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.2) 0%, transparent 70%)",
          }}
          animate={
            animateOrb ? { scale: [1, 1.1, 1], opacity: [0.75, 1, 0.75] } : undefined
          }
          transition={
            animateOrb
              ? { duration: 22, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="reveal-rise" style={{ animationDelay: "0.05s" }}>
              <Eyebrow className="mb-3 block">For Investors</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight text-balance">
                Access Investor Materials
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-6 mx-auto" />
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Download our investor summary or request access to our
                confidential data room for detailed due diligence materials.
              </p>
            </div>

            <div
              className="reveal-rise flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ animationDelay: "0.18s" }}
            >
              <a
                href="/downloads/endocyclic-investor-summary.pdf"
                download
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold-primary text-black-primary font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-white hover:shadow-[0_4px_24px_rgba(201,169,97,0.35)] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
              >
                <Download
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
                Download Investor Summary
              </a>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
              >
                <Lock
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                Request Data Room Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DATA ROOM REQUEST FORM
      ════════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="data-room-request"
        className="bg-bone py-16 md:py-24"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="reveal-rise mb-10" style={{ animationDelay: "0.05s" }}>
            <Eyebrow className="mb-3 block">Data Room Access</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum-dark mb-4 tracking-tight text-balance">
              Request Access
            </h2>
            <div className="w-16 h-0.5 bg-gold-primary mb-6" />
            <p className="text-black-soft leading-relaxed">
              Complete the form below to request access to our confidential
              investor data room. Our team will review your request and
              respond within two business days.
            </p>
          </div>

          <div
            className="reveal-rise bg-bone-raised border border-plum-dark/10 rounded-xl p-8 md:p-10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
            style={{ animationDelay: "0.15s" }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-gold-primary/12 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-gold-primary" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-plum-dark mb-3">
                  Request Received
                </h3>
                <p className="text-black-soft">
                  Thank you for your interest. Our investor relations team
                  will review your request and follow up shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field — hidden from humans */}
                <div
                  className="absolute opacity-0 -z-10"
                  aria-hidden="true"
                >
                  <label htmlFor="investor_website">Website</label>
                  <input
                    type="text"
                    id="investor_website"
                    name="_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Form-level error */}
                {formError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle
                      className="text-red-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-sm text-red-700">{formError}</p>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-plum-dark mb-2 uppercase tracking-wider"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-describedby={
                        touchedFields.name && fieldErrors.name
                          ? "inv-name-error"
                          : undefined
                      }
                      aria-invalid={
                        touchedFields.name && !!fieldErrors.name
                      }
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClassName(
                        "name",
                        "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                      )}
                      placeholder="Your full name"
                    />
                    {touchedFields.name && fieldErrors.name && (
                      <p
                        id="inv-name-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-plum-dark mb-2 uppercase tracking-wider"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-describedby={
                        touchedFields.email && fieldErrors.email
                          ? "inv-email-error"
                          : undefined
                      }
                      aria-invalid={
                        touchedFields.email && !!fieldErrors.email
                      }
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClassName(
                        "email",
                        "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                      )}
                      placeholder="your.email@example.com"
                    />
                    {touchedFields.email && fieldErrors.email && (
                      <p
                        id="inv-email-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company & Role */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-plum-dark mb-2 uppercase tracking-wider"
                    >
                      Company / Firm *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      aria-describedby={
                        touchedFields.company && fieldErrors.company
                          ? "inv-company-error"
                          : undefined
                      }
                      aria-invalid={
                        touchedFields.company && !!fieldErrors.company
                      }
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClassName(
                        "company",
                        "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                      )}
                      placeholder="Your firm or organization"
                    />
                    {touchedFields.company && fieldErrors.company && (
                      <p
                        id="inv-company-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-semibold text-plum-dark mb-2 uppercase tracking-wider"
                    >
                      Role / Title
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-plum-dark/15 rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                      placeholder="e.g. Managing Director"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-plum-dark mb-2 uppercase tracking-wider"
                  >
                    Message{" "}
                    <span className="font-normal normal-case tracking-normal text-black-soft/60">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-plum-dark/15 rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary resize-none"
                    placeholder="Tell us about your interest or any specific materials you'd like access to..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-plum-dark text-white font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-gold-primary hover:text-black-primary hover:shadow-[0_4px_24px_rgba(201,169,97,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(201,169,97,0.10), transparent 62%), #F4EEE1",
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="reveal-rise text-center" style={{ animationDelay: "0.05s" }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum-dark mb-4 tracking-tight text-balance">
              Schedule a Meeting
            </h2>
            <p className="text-black-soft text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Interested in learning more about EndoCyclic Therapeutics? Connect
              with our investor relations team.
            </p>
            <Link
              href="/contact?subject=investor"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-plum-primary text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-gold-primary hover:text-black-primary hover:shadow-[0_4px_24px_rgba(201,169,97,0.35)] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
            >
              <Calendar
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Schedule a Meeting
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
