"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, AlertCircle, Download } from "lucide-react";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import MagneticButton from "@/components/site/MagneticButton";
import { TextField, TextArea, Honeypot } from "@/components/site/Field";
import { SITE } from "@/lib/site";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------------------------------------------------------------- Highlights */
const HIGHLIGHTS = [
  {
    kicker: "Regulatory",
    title: "FDA IND Allowance, 2026",
    body: "The lead therapeutic ENDO-205 has cleared its investigational new drug allowance and is now in a first-in-human Phase 1 study — a validating regulatory milestone.",
  },
  {
    kicker: "Differentiation",
    title: "First-in-class, non-hormonal, disease-modifying",
    body: "A short-course precision peptide designed to eliminate endometriosis lesions at the source — not another hormonal, symptomatic therapy.",
  },
  {
    kicker: "Market",
    title: "$180B–$250B global market potential",
    body: "McKinsey's estimated market for endometriosis treatments — a large, underserved opportunity against an $200B annual US economic burden.",
  },
  {
    kicker: "Platform",
    title: "One platform across Rx, Dx, and oncology",
    body: "A precision peptide platform spanning therapeutics and diagnostics, expanding into additional women's health indications and oncology.",
  },
  {
    kicker: "Validation",
    title: "NIH perfect “10” score and multiple NICHD awards",
    body: "A rare unicorn impact score on the NIH Commercialization Readiness Pilot grant, plus multiple awards from the NICHD and an NIH SBIR Success Story.",
  },
  {
    kicker: "Team",
    title: "A seasoned team, including former FDA reviewers",
    body: "Founder and CEO Dr. Tanya Petrossian, PhD leads a team with deep regulatory and scientific experience, including former FDA reviewers.",
  },
];

/* --------------------------------------------------------------------- Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <Section tone="abyss" grain className="overflow-hidden pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[30%] select-none font-serif text-[26vw] leading-none text-paper-on-dark/[0.035]"
      >
        IR
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <Eyebrow tone="dark">Investor relations</Eyebrow>
        </Reveal>

        <h1 className="t-display mt-8 text-paper-on-dark md:mt-10">
          <SplitText
            lines={[
              [{ text: "The diligence" }],
              [{ text: "front", accent: true, italic: true }, { text: " ", accent: true }, { text: "door.", accent: true, italic: true }],
            ]}
            accentClass="text-gold-light"
          />
        </h1>

        <motion.div
          className="mt-10 h-px w-full origin-left bg-line-on-dark"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        />

        <div className="mt-10 grid gap-10 pb-8 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-7">
            <p className="t-lead max-w-2xl text-muted-on-dark">
              EndoCyclic is a clinical-stage precision medicine company. This is the front door
              for qualified investors and partners: a concise view of the investment case, and a
              request line into our confidential data room.
            </p>
          </Reveal>
          <Reveal delay={0.62} className="flex items-end md:col-span-4 md:col-start-9">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#data-room" variant="primary-on-dark" arrow={false}>
                Request data room
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Highlights */
function Highlights() {
  return (
    <Section id="highlights" tone="paper">
      <Container>
        <FolioHeading index="01" label="Why EndoCyclic" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              A rare depth of validation for a company at{" "}
              <span className="italic-display text-gold-ink">this stage.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              Six reasons the diligence tends to come out in our favor — regulatory, scientific,
              and commercial. Every claim here traces to our approved disclosures.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal
              as="li"
              key={h.title}
              delay={i * 0.06}
              className="grid grid-cols-1 gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="flex items-baseline gap-4 md:col-span-4">
                <span className="t-num text-2xl text-gold-ink">{`0${i + 1}`}</span>
                <span className="t-label mt-1 text-ink-muted">{h.kicker}</span>
              </div>
              <h3 className="font-serif text-2xl text-ink md:col-span-4 md:text-[1.7rem]">
                {h.title}
              </h3>
              <p className="t-body text-ink-muted md:col-span-4">{h.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Data room */
function DataRoom() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      });
    }
    if (formError) setFormError("");
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.company.trim()) next.company = "Company or firm name is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _honeypot: honeypot }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setFormError(
          data.error || "Too many requests. Please wait a moment and try again.",
        );
        setSubmitting(false);
        return;
      }
      if (!res.ok || !data.success) {
        setFormError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <Section id="data-room" tone="paper-sunk">
      <Container>
        <FolioHeading index="02" label="Data Room" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          {/* Left — invitation */}
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="t-h1 text-ink">
                Request the <span className="italic-display text-gold-ink">data room.</span>
              </h2>
              <p className="t-body mt-8 max-w-md text-ink-muted">
                Complete the form to request access to our confidential investor data room. Our
                team reviews each request and typically responds within two business days.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 border-t border-line pt-8">
              <p className="t-label text-ink-muted">Prefer the short version?</p>
              <div className="mt-4">
                <a
                  href="/downloads/endocyclic-investor-summary.pdf"
                  download
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-3.5 t-label text-ink transition-colors duration-300 hover:border-gold-ink hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <Download
                    size={15}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                  Download investor summary
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-10 border-t border-line pt-6">
              <p className="text-sm leading-relaxed text-ink-muted">
                <span className="text-ink">Confidentiality.</span> Information submitted here is
                used solely to evaluate and respond to your request. Data room materials are shared
                under confidentiality; access is granted at EndoCyclic&apos;s discretion.
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="md:col-span-6 md:col-start-7">
            {submitted ? (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-line bg-paper-raised p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                  <CheckCircle2 className="text-gold-ink" size={26} aria-hidden />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-ink">Request received</h3>
                <p className="mt-3 t-body text-ink-muted">
                  Thank you for your interest. Our investor relations team will review your request
                  and follow up shortly.
                </p>
              </motion.div>
            ) : (
              <Reveal>
                <form onSubmit={onSubmit} noValidate className="relative">
                  <Honeypot value={honeypot} onChange={setHoneypot} />

                  {formError && (
                    <div
                      role="alert"
                      className="mb-8 flex items-start gap-3 border-l-2 border-rose pl-4"
                    >
                      <AlertCircle className="mt-0.5 shrink-0 text-rose" size={18} aria-hidden />
                      <p className="text-sm text-ink-soft">{formError}</p>
                    </div>
                  )}

                  <div className="grid gap-8 sm:grid-cols-2">
                    <TextField
                      label="Full name"
                      name="name"
                      required
                      value={values.name}
                      onChange={set("name")}
                      error={errors.name}
                      autoComplete="name"
                      placeholder="Your full name"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={set("email")}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="you@firm.com"
                    />
                    <TextField
                      label="Company / firm"
                      name="company"
                      required
                      value={values.company}
                      onChange={set("company")}
                      error={errors.company}
                      autoComplete="organization"
                      placeholder="Your firm or organization"
                    />
                    <TextField
                      label="Role / title"
                      name="role"
                      value={values.role}
                      onChange={set("role")}
                      autoComplete="organization-title"
                      placeholder="e.g. Managing Director"
                    />
                  </div>

                  <TextArea
                    label="Message"
                    name="message"
                    className="mt-8"
                    rows={4}
                    value={values.message}
                    onChange={set("message")}
                    placeholder="Tell us about your interest or any specific materials you'd like access to."
                  />

                  <div className="mt-10">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-plum-deep px-8 py-3.5 t-label text-paper-on-dark transition-colors duration-300 hover:bg-gold-ink disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {submitting ? (
                        <>
                          <span
                            aria-hidden
                            className="h-4 w-4 animate-spin rounded-full border-2 border-paper-on-dark/30 border-t-paper-on-dark"
                          />
                          Submitting…
                        </>
                      ) : (
                        "Submit request"
                      )}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="abyss" grain className="overflow-hidden">
      <Container>
        <Reveal>
          <p className="t-label text-gold-light">Investor relations</p>
        </Reveal>
        <Reveal className="mt-8">
          <h2 className="t-display max-w-5xl text-paper-on-dark">
            Let&apos;s open the <span className="italic-display text-gold-light">conversation.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href={`mailto:${SITE.email}`} variant="primary-on-dark" external arrow={false}>
            Email investor relations
          </MagneticButton>
          <MagneticButton href="/contact?subject=investor" variant="ghost-on-dark">
            Contact us
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function InvestorsPage() {
  return (
    <>
      <Nav overDark />
      <main id="main-content">
        <Hero />
        <Highlights />
        <DataRoom />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
