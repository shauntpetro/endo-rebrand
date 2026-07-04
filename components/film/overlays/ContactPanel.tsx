"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Linkedin, Mail, MapPin } from "lucide-react";
import { TextField, SelectField, TextArea, Honeypot } from "@/components/site/Field";
import { SITE, CONTACT_SUBJECTS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: string; email?: string; message?: string };
type Status = "idle" | "loading" | "done";

function isSubject(v: string | undefined): boolean {
  return !!v && CONTACT_SUBJECTS.some((s) => s.value === v);
}

export default function ContactPanel({ param }: { param?: string }) {
  const reduced = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(() => (isSubject(param) ? (param as string) : "general"));
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address.";
    if (message.trim().length < 10) e.message = "Please write at least 10 characters.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setFormError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          subject,
          message: message.trim(),
          _honeypot: hp,
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.status === 429) {
        setStatus("idle");
        setFormError(data?.error || "Too many requests. Please wait a minute and try again.");
        return;
      }
      if (!res.ok || !data?.success) {
        setStatus("idle");
        setFormError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("idle");
      setFormError("Network error — please check your connection and try again.");
    }
  };

  const subjectLabel =
    CONTACT_SUBJECTS.find((s) => s.value === subject)?.label ?? "General inquiry";

  return (
    <div className="grid min-h-[calc(100svh-73px)] lg:grid-cols-12">
      {/* ── Left: plum invitation block ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-plum px-6 py-14 text-cream md:px-10 lg:col-span-5 lg:py-20">
        {/* Bauhaus geometry */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[18%] -right-[22%] h-[52vmin] w-[52vmin] shape-dot bg-gold"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[10%] h-[11vmin] w-[11vmin] shape-dot bg-teal"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-[46%] h-2 w-[38%] bg-teal"
        />

        <div className="relative">
          <p className="t-label flex items-center gap-2 text-gold-soft">
            <span aria-hidden className="h-2 w-2 bg-gold" />
            Direct line
          </p>

          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="t-h1 mt-8 max-w-[10ch] uppercase text-cream"
          >
            Let&rsquo;s change what a diagnosis{" "}
            <span className="text-gold-soft">can mean.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="t-body mt-8 max-w-md text-muted-on-dark"
          >
            Partnership, investment, media, or data room access — every message reaches the
            EndoCyclic team directly.
          </motion.p>

          <motion.ul
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-12 space-y-5 border-t-2 border-line-on-dark pt-8"
          >
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 text-cream transition-colors hover:text-gold-soft"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold text-ink transition-colors group-hover:bg-cream"
                >
                  <Mail size={17} />
                </span>
                <span>
                  <span className="t-label block text-muted-on-dark">Email</span>
                  <span className="font-display font-bold">{SITE.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-cream transition-colors hover:text-gold-soft"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-teal text-cream transition-colors group-hover:bg-cream group-hover:text-ink"
                >
                  <Linkedin size={17} />
                </span>
                <span>
                  <span className="t-label block text-muted-on-dark">LinkedIn</span>
                  <span className="font-display font-bold">EndoCyclic Therapeutics</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-line-on-dark text-cream"
              >
                <MapPin size={17} />
              </span>
              <span>
                <span className="t-label block text-muted-on-dark">Headquarters</span>
                <span className="font-display font-bold text-cream">Irvine, California</span>
              </span>
            </li>
          </motion.ul>
        </div>
      </div>

      {/* ── Right: form on cream ────────────────────────────────────────── */}
      <div className="relative bg-cream px-6 py-14 md:px-10 lg:col-span-7 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-3 w-[34%] bg-gold"
        />

        {status === "done" ? (
          <motion.div
            role="status"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex h-full flex-col justify-center"
          >
            <span
              aria-hidden
              className="flex h-16 w-16 items-center justify-center shape-dot bg-teal text-cream"
            >
              <Check size={28} strokeWidth={3} />
            </span>
            <h3 className="t-h2 mt-8 max-w-[14ch] uppercase text-ink">
              Message <span className="mark-gold">received.</span>
            </h3>
            <p className="t-body mt-6 max-w-md text-ink-muted">
              Thank you — your {subjectLabel.toLowerCase()} note is on its way to the team.
              We&rsquo;ll get back to you soon.
            </p>
            <p className="t-body mt-3 max-w-md text-ink-muted">
              Need us faster? Write directly to{" "}
              <a href={`mailto:${SITE.email}`} className="klink font-bold text-gold-ink">
                {SITE.email}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={submit}
            noValidate
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="relative mx-auto max-w-xl"
          >
            <h3 className="t-h3 uppercase text-ink">Send a message</h3>
            <p className="t-body mt-2 text-ink-muted">
              Fields marked <span aria-hidden className="font-bold text-gold-ink">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            <Honeypot value={hp} onChange={setHp} />

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <TextField
                label="Name"
                name="name"
                required
                value={name}
                onChange={(v) => {
                  setName(v);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                error={errors.name}
                placeholder="Full name"
                autoComplete="name"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                error={errors.email}
                placeholder="name@company.com"
                autoComplete="email"
              />
              <TextField
                label="Company"
                name="company"
                value={company}
                onChange={setCompany}
                placeholder="Organization (optional)"
                autoComplete="organization"
              />
              <SelectField
                label="Subject"
                name="subject"
                value={subject}
                onChange={setSubject}
                options={CONTACT_SUBJECTS}
              />
              <TextArea
                label="Message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(v) => {
                  setMessage(v);
                  if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                }}
                error={errors.message}
                placeholder="How can we work together? (minimum 10 characters)"
                className="sm:col-span-2"
              />
            </div>

            {formError && (
              <p
                role="alert"
                className="mt-6 border-l-4 border-rose bg-cream-2 px-4 py-3 text-sm font-bold text-rose-deep"
              >
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group mt-10 inline-flex items-center gap-3 bg-ink px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
