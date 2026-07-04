"use client";

import { useState } from "react";
import { CheckCircle2, FileDown, Lock } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import { TextField, TextArea, Honeypot } from "@/components/site/Field";
import { SITE } from "@/lib/site";

/* Investment highlights — every claim traces to truth.md / lib/site */
const HIGHLIGHTS = [
  {
    k: "FDA IND Allowance (2026)",
    v: "Achieved for lead therapeutic ENDO-205, now in a first-in-human Phase 1 study.",
  },
  {
    k: "First-in-class, non-hormonal, disease-modifying",
    v: "A short-course precision peptide designed to eliminate endometriosis lesions at the source — not suppress symptoms with hormones.",
  },
  {
    k: "$180B–$250B global market potential",
    v: "Estimated market for endometriosis treatments (McKinsey), against an $200B annual US economic burden.",
  },
  {
    k: "One platform, multiple shots on goal",
    v: "A precision peptide platform spanning therapeutics, diagnostics, and oncology — with a paired detect-and-treat oncology program.",
  },
  {
    k: "Rare depth of non-dilutive validation",
    v: "A perfect NIH “10” impact score on the Commercialization Readiness Pilot grant, plus multiple NICHD awards.",
  },
  {
    k: "Experienced, regulatory-fluent team",
    v: "Includes former FDA reviewers across CBER, CDER, and CMC alongside seasoned clinical and regulatory leaders.",
  },
] as const;

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

export default function InvestorsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please provide a valid email address.";
    if (!company.trim()) next.company = "Please enter your firm or company.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          message,
          _honeypot: honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 429) {
        setFormError("Too many requests. Please wait a moment and try again.");
      } else {
        const data = await res.json().catch(() => null);
        setFormError(
          data?.error || "Something went wrong. Please try again, or email us directly.",
        );
      }
      setStatus("idle");
    } catch {
      setFormError("Network error. Please try again, or email us directly.");
      setStatus("idle");
    }
  }

  return (
    <main id="main-content">
      {/* --------------------------------------------------------------- Hero */}
      <Section tone="paper" className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl reveal">
            <Eyebrow>Investor relations</Eyebrow>
            <h1 className="t-hero mt-6 text-ink">The diligence front door.</h1>
            <p className="t-lead mt-6 max-w-2xl">
              EndoCyclic is building a non-hormonal precision medicine platform with a
              clinical-stage lead program and rare external validation. We welcome
              conversations with qualified investors and strategic partners.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#data-room" variant="primary">Request data-room access</Button>
              <Button
                href="/downloads/endocyclic-investor-summary.pdf"
                variant="ghost"
                external
                arrow
              >
                Download investor summary
              </Button>
            </div>
          </div>
          <div className="mt-16 h-px w-full bg-line md:mt-24" />
        </Container>
      </Section>

      {/* --------------------------------------------------- Investment highlights */}
      <Section tone="tint-teal">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Investment highlights</Eyebrow>
              <h2 className="t-h2 mt-4 text-ink">Why EndoCyclic, why now.</h2>
              <p className="t-lead mt-5">
                A first-in-class program addressing a large, chronically underserved
                market — de-risked by regulatory progress and independent recognition.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.k} delay={i * 0.06} className="border-t border-line pt-5">
                <div className="text-sm font-medium text-teal-ink">{`0${i + 1}`}</div>
                <h3 className="t-h3 mt-3 text-ink">{h.k}</h3>
                <p className="mt-2 text-sm text-muted">{h.v}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Data-room request */}
      <Section tone="paper" id="data-room">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <Eyebrow>Data room</Eyebrow>
              <h2 className="t-h2 mt-4 text-ink">Request access.</h2>
              <p className="t-body mt-5 text-muted">
                Share a few details and the right person on our team will follow up to
                arrange access to the confidential investor data room.
              </p>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface p-4">
                <Lock size={18} className="mt-0.5 shrink-0 text-teal-ink" aria-hidden />
                <p className="text-sm text-muted">
                  Requests are handled in confidence. Data-room access is granted to
                  qualified investors and partners and may be subject to a confidentiality
                  agreement.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="/downloads/endocyclic-investor-summary.pdf"
                  download
                  aria-label="Download the EndoCyclic investor summary (PDF)"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-teal-ink hover:text-ink"
                >
                  <FileDown size={16} aria-hidden />
                  <span className="link-underline">Download investor summary (PDF)</span>
                </a>
              </div>
            </Reveal>

            <div className="md:col-span-6 md:col-start-7">
              {status === "success" ? (
                <Reveal
                  className="rounded-2xl border border-line bg-surface p-8"
                  aria-live="polite"
                >
                  <CheckCircle2 size={28} className="text-teal-ink" aria-hidden />
                  <h3 className="t-h3 mt-4 text-ink">Request received.</h3>
                  <p className="mt-3 text-sm text-muted">
                    Thank you. Our team will review your request and respond shortly. For
                    anything urgent, email us at{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="link-underline text-teal-ink"
                    >
                      {SITE.email}
                    </a>
                    .
                  </p>
                </Reveal>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                  {formError && (
                    <p
                      role="alert"
                      className="mb-6 rounded-lg border border-rose bg-tint-warm px-4 py-3 text-sm text-ink"
                    >
                      {formError}
                    </p>
                  )}
                  <div className="grid gap-5">
                    <TextField
                      label="Full name"
                      name="name"
                      required
                      value={name}
                      onChange={setName}
                      error={fieldErrors.name}
                      autoComplete="name"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={setEmail}
                      error={fieldErrors.email}
                      autoComplete="email"
                    />
                    <TextField
                      label="Firm or company"
                      name="company"
                      required
                      value={company}
                      onChange={setCompany}
                      error={fieldErrors.company}
                      autoComplete="organization"
                    />
                    <TextField
                      label="Role or title"
                      name="role"
                      value={role}
                      onChange={setRole}
                      autoComplete="organization-title"
                    />
                    <TextArea
                      label="Message"
                      name="message"
                      value={message}
                      onChange={setMessage}
                      placeholder="Tell us a little about your interest or mandate (optional)."
                    />
                    <Honeypot value={honeypot} onChange={setHoneypot} />

                    <div className="mt-1">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-on-dark transition-colors duration-300 hover:bg-teal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "submitting" ? "Sending…" : "Request access"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- Closing CTA */}
      <Section tone="plum">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="dark">Let’s talk</Eyebrow>
              <h2 className="t-h2 mt-4 text-on-dark">
                A conversation is the fastest path to diligence.
              </h2>
              <p className="mt-5 max-w-xl text-muted-on-dark">
                Prefer to reach out directly? We read every message and route it to the
                right person on our team.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={`mailto:${SITE.email}`} variant="ghost-on-dark" external>
                  Email investor relations
                </Button>
                <Button href="/contact?subject=investor" variant="ghost-on-dark">
                  Contact the team
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
