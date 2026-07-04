"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Linkedin, MapPin } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import { TextField, TextArea, SelectField, Honeypot } from "@/components/site/Field";
import { CONTACT_SUBJECTS, SITE } from "@/lib/site";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidSubject(value: string | null): value is (typeof CONTACT_SUBJECTS)[number]["value"] {
  return CONTACT_SUBJECTS.some((s) => s.value === value);
}

/* ------------------------------------------------------------------- Form */
function ContactForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("subject");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState<string>(isValidSubject(requested) ? requested : "general");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function resetForm() {
    setName("");
    setEmail("");
    setCompany("");
    setSubject("general");
    setMessage("");
    setHoneypot("");
    setErrors({});
    setServerError("");
    setSuccessMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      nextErrors.message = "Please write a message of at least 10 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
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
          _honeypot: honeypot,
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.status === 429) {
        setServerError(data?.error ?? "Too many requests. Please wait a minute and try again.");
      } else if (!res.ok || !data?.success) {
        setServerError(data?.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccessMessage(data?.message ?? "Thank you for your message. We'll get back to you soon.");
      }
    } catch {
      setServerError("We couldn't send your message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div
        role="status"
        className="rounded-xl border border-line bg-surface p-8 md:p-10"
      >
        <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-teal" />
        <h2 className="t-h3 mt-4 text-ink">Message received</h2>
        <p className="mt-2 text-sm text-muted">{successMessage}</p>
        <button
          type="button"
          onClick={resetForm}
          className="link-underline mt-6 inline-flex text-sm font-medium text-teal-ink hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-5 sm:grid-cols-2">
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
          autoComplete="name"
          placeholder="Your full name"
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
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField
          label="Company"
          name="company"
          value={company}
          onChange={setCompany}
          autoComplete="organization"
          placeholder="Organization (optional)"
        />
        <SelectField
          label="Subject"
          name="subject"
          value={subject}
          onChange={setSubject}
          options={CONTACT_SUBJECTS}
        />
      </div>

      <div className="mt-5">
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
          placeholder="How can we help?"
        />
      </div>

      {serverError && (
        <p role="alert" className="mt-5 text-sm text-rose">
          {serverError}
        </p>
      )}

      <div className="mt-7">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-on-dark transition-colors duration-300 hover:bg-teal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------- Page */
export default function ContactPage() {
  return (
    <main id="main-content">
      <Section tone="paper" rhythm={false} className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        {/* soft, quiet accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-tint-teal blur-2xl md:right-[-2rem]"
        />
        <Container className="relative">
          <div className="grid gap-14 md:grid-cols-12 md:gap-10">
            {/* Left — invitation + direct lines */}
            <Reveal className="md:col-span-5">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="t-hero mt-6 text-ink">Let&rsquo;s talk.</h1>
              <p className="t-lead mt-6 max-w-md">
                For partnership, investment, media, or anything else — the right person on our
                team will follow up.
              </p>

              <ul className="mt-10 max-w-md divide-y divide-line border-t border-line">
                <li className="flex items-center gap-3 py-4">
                  <Mail size={16} className="shrink-0 text-teal-ink" aria-hidden />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline text-sm font-medium text-ink"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 py-4">
                  <Linkedin size={16} className="shrink-0 text-teal-ink" aria-hidden />
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm font-medium text-ink"
                  >
                    EndoCyclic on LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-3 py-4">
                  <MapPin size={16} className="shrink-0 text-teal-ink" aria-hidden />
                  <span className="text-sm text-muted">Irvine, California</span>
                </li>
              </ul>
            </Reveal>

            {/* Right — the form */}
            <Reveal delay={0.1} className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Quiet signposts */}
      <Section tone="tint-warm" className="py-14 md:py-16" rhythm={false}>
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "For investors", detail: "Data room access and materials.", href: "/investors", cta: "Investor relations" },
              { label: "For media", detail: "Logos, boilerplate, and facts.", href: "/media", cta: "Media kit" },
              { label: "The science", detail: "Platform, pipeline, and programs.", href: "/pipeline", cta: "View the pipeline" },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 0.06} className="border-t border-line pt-5">
                <h2 className="text-sm font-medium text-ink">{item.label}</h2>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
                <div className="mt-3">
                  <Button href={item.href} variant="quiet">{item.cta}</Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
