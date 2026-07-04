"use client";

import { useState } from "react";
import { ArrowRight, Check, Download, Lock } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { TextField, TextArea, Honeypot } from "@/components/site/Field";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUMMARY_PDF = "/downloads/endocyclic-investor-summary.pdf";

/* Investment highlights — every claim traces to truth.md / lib/site. */
type Tone = "plum" | "gold" | "teal" | "cream";
const HIGHLIGHTS: {
  kicker: string;
  headline: string;
  detail: string;
  tone: Tone;
}[] = [
  {
    kicker: "Regulatory",
    headline: "FDA IND Allowance (2026)",
    detail: "Achieved for lead therapeutic ENDO-205, now in a first-in-human Phase 1 study.",
    tone: "plum",
  },
  {
    kicker: "Lead asset",
    headline: "First-in-class, non-hormonal, disease-modifying",
    detail: "A short-course precision peptide designed to eliminate endometriosis lesions — not mask symptoms.",
    tone: "gold",
  },
  {
    kicker: "Market",
    headline: "$180B–$250B global potential",
    detail: "Estimated market for endometriosis treatments (McKinsey estimate).",
    tone: "teal",
  },
  {
    kicker: "Platform",
    headline: "One platform, three fronts",
    detail: "A precision peptide platform spanning therapeutics, diagnostics, and oncology.",
    tone: "cream",
  },
  {
    kicker: "Validation",
    headline: "NIH perfect “10” grant score",
    detail: "A rare unicorn impact score, plus multiple awards from NICHD.",
    tone: "cream",
  },
  {
    kicker: "Team",
    headline: "Built by former FDA reviewers",
    detail: "An experienced leadership team with regulatory, CMC, and clinical depth.",
    tone: "plum",
  },
];

const TONE_STYLE: Record<Tone, { block: string; kicker: string; head: string; body: string; tick: string }> = {
  plum: {
    block: "bg-plum",
    kicker: "text-gold-soft",
    head: "text-cream",
    body: "text-muted-on-dark",
    tick: "bg-gold",
  },
  gold: {
    block: "bg-gold",
    kicker: "text-gold-deep",
    head: "text-ink",
    body: "text-ink-soft",
    tick: "bg-ink",
  },
  teal: {
    block: "bg-teal",
    kicker: "text-cream",
    head: "text-cream",
    body: "text-cream/85",
    tick: "bg-cream",
  },
  cream: {
    block: "bg-cream-2",
    kicker: "text-gold-ink",
    head: "text-ink",
    body: "text-ink-muted",
    tick: "bg-teal",
  },
};

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

function DataRoomForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Full name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!company.trim()) next.company = "Company or firm name is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setState("loading");
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          message: message.trim(),
          _honeypot: hp,
        }),
      });
      let data: { success?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (res.status === 429) {
        setState("idle");
        setFormError(data.error || "Too many requests. Please try again in a minute.");
        return;
      }
      if (!res.ok || !data.success) {
        setState("idle");
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("done");
    } catch {
      setState("idle");
      setFormError("Network error. Please check your connection and try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="border-2 border-ink bg-cream-2 p-8">
        <p className="t-label flex items-center gap-2 text-teal-ink">
          <Check size={18} /> Request received
        </p>
        <h3 className="t-h3 mt-4 text-ink">Thank you &mdash; we&rsquo;ll be in touch.</h3>
        <p className="t-body mt-3 text-ink-muted">
          Our team will review your request and follow up regarding data-room access.
          For anything time-sensitive, email{" "}
          <a href={`mailto:${SITE.email}`} className="klink text-gold-ink">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-6">
      <Honeypot value={hp} onChange={setHp} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          required
          value={name}
          onChange={(v) => {
            setName(v);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          error={errors.name}
          placeholder="Jane Doe"
          autoComplete="name"
        />
        <TextField
          label="Work email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          error={errors.email}
          placeholder="name@firm.com"
          autoComplete="email"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Company or firm"
          name="company"
          required
          value={company}
          onChange={(v) => {
            setCompany(v);
            if (errors.company) setErrors((p) => ({ ...p, company: undefined }));
          }}
          error={errors.company}
          placeholder="Firm name"
          autoComplete="organization"
        />
        <TextField
          label="Role or title"
          name="role"
          value={role}
          onChange={setRole}
          placeholder="e.g. Partner, Principal"
          autoComplete="organization-title"
        />
      </div>
      <TextArea
        label="What would you like to review?"
        name="message"
        value={message}
        onChange={setMessage}
        rows={4}
        placeholder="Optional — tell us about your mandate, stage focus, or specific diligence needs."
      />

      {formError && (
        <p role="alert" className="border-l-2 border-rose bg-rose/10 px-4 py-3 text-sm text-rose-deep">
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-cream transition-colors hover:bg-plum disabled:opacity-50"
        >
          <span className="t-label">
            {state === "loading" ? "Sending…" : "Request data-room access"}
          </span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
        <p className="t-label flex items-center gap-2 text-ink-muted">
          <Lock size={14} aria-hidden /> Confidential — reviewed under NDA
        </p>
      </div>
    </form>
  );
}

export default function InvestPanel({ param }: { param?: string }) {
  return (
    <div className="container-editorial py-14 md:py-20" data-param={param}>
      {/* Intro */}
      <Reveal>
        <p className="t-label text-gold-ink">Investor relations · {SITE.location}</p>
        <h2 className="t-h1 mt-5 max-w-[16ch] uppercase text-ink">
          A clinical-stage <span className="mark-gold">precision</span> medicine company.
        </h2>
        <p className="t-lead mt-8 max-w-2xl text-ink-muted">
          {SITE.name} builds non-hormonal peptides that act only where disease lives — starting
          with endometriosis, a condition affecting 190M+ women with an 8-year average diagnostic
          delay. Request access to the diligence data room below.
        </p>
      </Reveal>

      {/* Investment highlights — color-block list */}
      <Reveal delay={0.05} className="mt-14">
        <h3 className="t-label mb-6 flex items-center gap-2 text-ink">
          <span aria-hidden className="h-2.5 w-2.5 bg-gold" /> Why now
        </h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h) => {
            const s = TONE_STYLE[h.tone];
            return (
              <li key={h.headline} className={`relative overflow-hidden p-6 ${s.block}`}>
                <span aria-hidden className={`absolute right-5 top-6 h-3 w-3 shape-dot ${s.tick}`} />
                <p className={`t-label ${s.kicker}`}>{h.kicker}</p>
                <p className={`mt-3 font-display text-2xl font-bold leading-[1.02] tracking-tight ${s.head}`}>
                  {h.headline}
                </p>
                <p className={`t-body mt-3 text-[0.95rem] leading-relaxed ${s.body}`}>{h.detail}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* Download summary */}
      <Reveal delay={0.05} className="mt-10">
        <div className="flex flex-col items-start gap-5 border-2 border-ink bg-cream-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="t-h3 text-ink">Investor summary</p>
            <p className="t-body mt-1 text-ink-muted">
              A concise overview of the platform, pipeline, and milestones.
            </p>
          </div>
          <a
            href={SUMMARY_PDF}
            download
            aria-label="Download the EndoCyclic investor summary PDF"
            className="group inline-flex shrink-0 items-center gap-3 border-2 border-ink bg-transparent px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            <Download size={18} aria-hidden />
            <span className="t-label">Download summary (PDF)</span>
          </a>
        </div>
      </Reveal>

      {/* Data-room request form */}
      <Reveal delay={0.05} className="mt-14">
        <div className="border-t-2 border-ink pt-10">
          <h3 className="t-h2 max-w-[14ch] uppercase text-ink">
            Request <span className="mark-teal">data-room</span> access
          </h3>
          <p className="t-body mt-4 max-w-xl text-ink-muted">
            Share a few details and our team will follow up. Fields marked{" "}
            <span className="text-gold-ink">*</span> are required.
          </p>
          <div className="mt-8 max-w-3xl">
            <DataRoomForm />
          </div>
          <p className="t-body mt-8 max-w-2xl text-sm text-ink-muted">
            Confidentiality: information you submit is used solely to evaluate and respond to your
            request. Data-room materials are shared under a non-disclosure agreement. This page is
            not an offer to sell or a solicitation to buy any security.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
