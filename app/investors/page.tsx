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
    name: "FemLUNA\u2122",
    indication: "Endometriosis (Diagnostic)",
    stage: "IND-Enabling",
    stageColor: "bg-gold-primary",
    description:
      "First non-invasive, definitive diagnostic for endometriosis.",
  },
  {
    name: "ENDO-995",
    indication: "Maintenance Therapy",
    stage: "Preclinical",
    stageColor: "bg-plum-primary",
    description: "Maintenance therapy program for sustained disease management.",
  },
  {
    name: "ENDO-311",
    indication: "Colorectal Cancer / Solid Tumors",
    stage: "Preclinical",
    stageColor: "bg-plum-primary",
    description:
      "Expanding the precision peptide platform into oncology indications.",
  },
];

/* ─── Animation variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/* ─── Page Component ─── */

export default function InvestorsPage() {
  const formRef = useRef<HTMLDivElement>(null);

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
        : "border-gray-mid focus:border-gold-primary focus:ring-gold-primary focus:shadow-[0_0_0_3px_rgba(201,169,97,0.1)]"
    }`;
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative bg-plum-dark text-white pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-plum-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Investor Relations
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-[1.1]">
              Invest in the Future of Women&apos;s Health
            </h1>
            <div className="w-16 h-0.5 bg-gold-primary mb-6" />
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              EndoCyclic Therapeutics is redefining precision medicine with a
              clinical-stage pipeline addressing a $200B unmet need in
              endometriosis and women&apos;s health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          KEY METRICS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-cream-primary py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.value}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                  <metric.icon className="text-gold-primary" size={22} />
                </div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-plum-primary mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-black-soft leading-relaxed">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARKET OPPORTUNITY
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-mid">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                The Opportunity
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black-primary mb-4 tracking-tight">
                A Massively Underserved Market
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-4" />
              <p className="text-black-soft leading-relaxed max-w-3xl mb-10 text-base md:text-lg">
                Closing the women&apos;s health gap represents a $1&nbsp;trillion annual
                global economic opportunity (McKinsey, 2024). Endometriosis alone accounts
                for $180&ndash;250B in global market potential, yet the space remains dramatically
                underfunded relative to its burden.
              </p>
            </motion.div>

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
                <motion.div
                  key={item.value}
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-cream-primary rounded-xl p-6 md:p-8 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="text-gold-primary" size={20} />
                  </div>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-plum-primary mb-2">
                    {item.value}
                  </p>
                  <p className="text-sm text-black-soft leading-relaxed">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-10 bg-plum-dark rounded-xl p-8 md:p-10 text-white"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                    Funding Disparity
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                    $44M vs. $1.24B
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    From 2019&ndash;2023, endometriosis research received just $44M in
                    funding — compared to $1.24B for erectile dysfunction over the
                    same period. Despite affecting 190M+ women worldwide, the disease
                    remains one of the most underfunded conditions in medicine.
                  </p>
                </div>
                <div>
                  <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                    Momentum Building
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PLATFORM OVERVIEW
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                Our Platform
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black-primary mb-4 tracking-tight">
                Precision Peptide Platform
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-8" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-clinical-teal/10 flex items-center justify-center mb-4 group-hover:bg-clinical-teal/20 group-hover:scale-110 transition-all duration-300">
                  <FlaskConical className="text-clinical-teal" size={22} />
                </div>
                <h3 className="text-lg font-serif font-bold text-black-primary mb-3">
                  Non-Hormonal Approach
                </h3>
                <p className="text-black-soft leading-relaxed text-sm md:text-base">
                  Our proprietary cyclic peptides offer a non-hormonal mechanism
                  of action, designed to act only in diseased tissue while
                  avoiding hormones, surgery, and systemic toxicity.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-clinical-teal/10 flex items-center justify-center mb-4 group-hover:bg-clinical-teal/20 group-hover:scale-110 transition-all duration-300">
                  <Microscope className="text-clinical-teal" size={22} />
                </div>
                <h3 className="text-lg font-serif font-bold text-black-primary mb-3">
                  pH-Mediated Activation
                </h3>
                <p className="text-black-soft leading-relaxed text-sm md:text-base">
                  Selective uptake by diseased tissue via a proprietary
                  endocytic pathway with pH-mediated activation, enabling
                  precision targeting with a favorable selectivity profile.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-clinical-teal/10 flex items-center justify-center mb-4 group-hover:bg-clinical-teal/20 group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="text-clinical-teal" size={22} />
                </div>
                <h3 className="text-lg font-serif font-bold text-black-primary mb-3">
                  Multi-Indication Potential
                </h3>
                <p className="text-black-soft leading-relaxed text-sm md:text-base">
                  The platform spans therapeutics, diagnostics, and oncology —
                  expanding into additional women&apos;s health indications and
                  oncology applications.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PIPELINE SNAPSHOT
      ════════════════════════════════════════════════════════ */}
      <section className="bg-cream-primary py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                Clinical Pipeline
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-black-primary mb-4 tracking-tight">
                Pipeline Snapshot
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-10" />
            </motion.div>

            {/* Pipeline table */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              {/* Table header — hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-8 py-4 bg-plum-dark text-white text-xs font-bold uppercase tracking-wider">
                <div className="col-span-2">Program</div>
                <div className="col-span-4">Indication</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-4">Description</div>
              </div>

              {pipelineItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 md:px-8 py-5 md:py-4 items-center ${
                    i < pipelineItems.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } hover:bg-cream-primary/50 transition-colors`}
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
                            ? "bg-gold-primary/10 text-gold-primary"
                            : "bg-plum-primary/10 text-plum-primary"
                      }`}
                    >
                      {item.stage}
                    </span>
                  </div>
                  <div className="md:col-span-4 text-black-soft text-sm leading-relaxed mt-1 md:mt-0">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-8 text-center"
            >
              <Link
                href="/pipeline"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-plum-primary hover:text-gold-primary transition-colors group"
              >
                View Full Pipeline
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DOWNLOAD & ACCESS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-plum-dark text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                For Investors
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                Access Investor Materials
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-6 mx-auto" />
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Download our investor summary or request access to our
                confidential data room for detailed due diligence materials.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/downloads/endocyclic-investor-summary.pdf"
                download
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold-primary text-black-primary font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-white hover:shadow-[0_4px_20px_rgba(201,169,97,0.3)] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DATA ROOM REQUEST FORM
      ════════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="data-room-request"
        className="bg-white py-16 md:py-24"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-gold-primary font-bold uppercase tracking-[0.2em] text-xs mb-3">
                Data Room Access
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black-primary mb-4 tracking-tight">
                Request Access
              </h2>
              <div className="w-16 h-0.5 bg-gold-primary mb-6" />
              <p className="text-black-soft leading-relaxed">
                Complete the form below to request access to our confidential
                investor data room. Our team will review your request and
                respond within two business days.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="bg-gray-light rounded-xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-gold-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-black-primary mb-3">
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
                        className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider"
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
                        className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider"
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
                        className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider"
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
                        className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider"
                      >
                        Role / Title
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-mid rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                        placeholder="e.g. Managing Director"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider"
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
                      className="w-full px-4 py-3 bg-white border border-gray-mid rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary resize-none"
                      placeholder="Tell us about your interest or any specific materials you'd like access to..."
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-black-primary text-white font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-gold-primary hover:shadow-[0_4px_20px_rgba(201,169,97,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section className="bg-cream-primary py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black-primary mb-4 tracking-tight">
              Schedule a Meeting
            </h2>
            <p className="text-black-soft text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Interested in learning more about EndoCyclic Therapeutics? Connect
              with our investor relations team.
            </p>
            <Link
              href="/contact?subject=investor"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-plum-primary text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-gold-primary hover:shadow-[0_4px_20px_rgba(201,169,97,0.3)] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
