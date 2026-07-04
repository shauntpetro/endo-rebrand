"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Check } from "lucide-react";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import MagneticButton from "@/components/site/MagneticButton";
import { TextField, TextArea, SelectField, Honeypot } from "@/components/site/Field";
import { SITE, CONTACT_SUBJECTS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = CONTACT_SUBJECTS.map((s) => s.value) as readonly string[];

type Fields = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

/* ------------------------------------------------------------ Subject reader */
function SubjectSync({ onResolve }: { onResolve: (v: string) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const raw = params.get("subject");
    onResolve(raw && VALID_SUBJECTS.includes(raw) ? raw : "general");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return null;
}

/* ------------------------------------------------------------------ The form */
function ContactForm({ initialSubject = "general" }: { initialSubject?: string }) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    company: "",
    subject: initialSubject,
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Fields>(key: K) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (formError) setFormError("");
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Name is required.";
    if (!fields.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!VALID_SUBJECTS.includes(fields.subject)) next.subject = "Please select a subject.";
    if (!fields.message.trim()) next.message = "Message is required.";
    else if (fields.message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, _honeypot: honeypot }),
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

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start border-t border-line pt-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-ink/40 text-gold-ink">
          <Check size={22} aria-hidden />
        </span>
        <h2 className="t-h3 mt-6 text-ink">Message received.</h2>
        <p className="t-body mt-3 max-w-md text-ink-muted">
          Thank you for reaching out. A member of our team will be in touch shortly. For
          time-sensitive matters, you can also write to us directly at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="klink text-gold-ink"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {formError && (
        <p
          role="alert"
          className="mb-8 border-l-2 border-rose bg-rose/10 px-4 py-3 text-sm text-rose"
        >
          {formError}
        </p>
      )}

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          value={fields.name}
          onChange={set("name")}
          required
          autoComplete="name"
          placeholder="Your name"
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          required
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email}
        />
        <TextField
          label="Company / Organization"
          name="company"
          value={fields.company}
          onChange={set("company")}
          autoComplete="organization"
          placeholder="Optional"
          className="sm:col-span-2"
        />
        <SelectField
          label="Subject"
          name="subject"
          value={fields.subject}
          onChange={set("subject")}
          options={CONTACT_SUBJECTS}
          required
          error={errors.subject}
          className="sm:col-span-2"
        />
        <TextArea
          label="Message"
          name="message"
          value={fields.message}
          onChange={set("message")}
          required
          rows={5}
          placeholder="Tell us how we can help. (Minimum 10 characters.)"
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-10 flex items-center gap-5">
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-plum-deep px-7 py-3.5 t-label text-paper-on-dark transition-colors duration-300 hover:bg-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-paper-on-dark/30 border-t-paper-on-dark"
              />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
        <span className="t-label hidden text-ink-muted sm:inline">
          We reply within two business days
        </span>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------------- Hero */
function Hero() {
  const reduced = useReducedMotion();
  const [subject, setSubject] = useState("general");

  return (
    <Section tone="paper" className="relative overflow-hidden pt-32 md:pt-40" rhythm={false}>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[4%] top-[42%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        @
      </span>

      <Suspense fallback={null}>
        <SubjectSync onResolve={setSubject} />
      </Suspense>

      <Container className="relative z-10">
        <Reveal y={14}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-5">
            <span className="t-label text-ink">EndoCyclic Therapeutics</span>
            <span className="t-label text-ink-muted">Irvine, California</span>
            <span className="t-label ml-auto text-gold-ink">Get in touch</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-16 pb-24 md:grid-cols-12 md:pb-32">
          {/* Left — invitation + direct channels */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <h1 className="t-display mt-6 text-ink">
              <SplitText
                lines={[[{ text: "Let’s" }], [{ text: "talk.", accent: true, italic: true }]]}
                accentClass="text-gold-ink"
              />
            </h1>

            <motion.div
              className="mt-10 h-px w-full origin-left bg-line"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            />

            <Reveal delay={0.15}>
              <p className="t-lead mt-10 max-w-md text-ink-soft">
                Whether you’re exploring a partnership, evaluating an investment, or writing
                a story — we’d like to hear from you. Tell us what brings you here and the
                right person will follow up.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <dl className="mt-12 space-y-8">
                <div className="flex items-start gap-4 border-t border-line pt-6">
                  <Mail size={18} className="mt-1 shrink-0 text-gold-ink" aria-hidden />
                  <div>
                    <dt className="t-label text-ink-muted">Direct email</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${SITE.email}`}
                        className="klink font-serif text-2xl text-ink"
                      >
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-line pt-6">
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-gold-ink"
                    aria-hidden
                  />
                  <div>
                    <dt className="t-label text-ink-muted">On LinkedIn</dt>
                    <dd className="mt-1">
                      <a
                        href={SITE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="klink font-serif text-2xl text-ink"
                      >
                        EndoCyclic Therapeutics
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-line pt-6">
                  <MapPin size={18} className="mt-1 shrink-0 text-gold-ink" aria-hidden />
                  <div>
                    <dt className="t-label text-ink-muted">Headquarters</dt>
                    <dd className="mt-1 font-serif text-2xl text-ink">Irvine, California</dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Right — the form */}
          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7">
            <div className="rounded-2xl border border-line bg-paper-raised p-8 md:p-10">
              <span aria-hidden className="mb-8 block h-[3px] w-16 rounded-full bg-gold" />
              <FormWithSubject subject={subject} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Bridges the resolved ?subject= value into the form's initial subject.
 * Remounts when the resolved subject changes so preselection is reliable.
 */
function FormWithSubject({ subject }: { subject: string }) {
  return <ContactForm key={subject} initialSubject={subject} />;
}

/* -------------------------------------------------------------- Closing plate */
function Closing() {
  return (
    <Section tone="abyss" grain>
      <Container>
        <p className="t-label text-gold-light">Irvine, California · Clinical-stage</p>
        <Reveal className="mt-8">
          <h2 className="t-h1 max-w-4xl text-paper-on-dark">
            Building the diligence front door for{" "}
            <span className="italic-display text-gold-light">women’s health.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mt-8 max-w-xl text-muted-on-dark">
            For partnership and business development inquiries, we’re glad to open the
            conversation.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/contact?subject=partnership" variant="primary-on-dark">
            Partner with us
          </MagneticButton>
          <MagneticButton href="/investors" variant="ghost-on-dark">
            For investors
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
