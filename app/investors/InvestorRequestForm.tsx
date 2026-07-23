"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Honeypot, TextArea, TextField } from "@/components/site/Field";
import { SITE } from "@/lib/site";

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

export default function InvestorRequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
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
    const firstInvalidField = Object.keys(next)[0];
    if (firstInvalidField) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          message: message.trim(),
          _honeypot: honeypot,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      if (response.status === 429) {
        setFormError("Too many requests. Please wait a minute before trying again.");
      } else {
        const data = await response.json().catch(() => null);
        setFormError(data?.error || "We couldn't submit your request. Please try again.");
      }
      setStatus("idle");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="page-enter border-y border-line bg-tint-teal px-6 py-10 sm:px-8">
        <CheckCircle2 size={28} className="text-teal-ink" aria-hidden />
        <h3 className="t-h3 mt-4 text-ink">Request received.</h3>
        <p className="mt-3 text-sm text-muted">
          Our team will review your request and respond. For anything urgent, email us at{" "}
          <a href={`mailto:${SITE.email}`} className="link-underline text-teal-ink">{SITE.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "submitting"}
      className="border-y border-line py-7 sm:py-9"
    >
      {Object.keys(fieldErrors).length > 0 && (
        <div
          role="region"
          aria-labelledby="investor-error-summary-title"
          className="page-enter mb-6 border-y border-rose/30 bg-petal px-4 py-4 text-sm text-ink"
        >
          <p id="investor-error-summary-title" className="font-semibold">
            Please check the highlighted fields.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-rose-ink">
            {Object.entries(fieldErrors).map(([field, error]) => (
              <li key={field}>
                <a href={`#field-${field}`} className="link-underline">
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formError && (
        <p role="alert" className="page-enter mb-6 border-y border-rose/30 bg-petal px-4 py-3 text-sm text-ink">
          {formError} If the issue continues, email us at{" "}
          <a href={`mailto:${SITE.email}`} className="link-underline font-medium text-teal-ink">{SITE.email}</a>.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          required
          value={name}
          onChange={(value) => {
            setName(value);
            if (fieldErrors.name) setFieldErrors((previous) => ({ ...previous, name: undefined }));
          }}
          error={fieldErrors.name}
          autoComplete="name"
          maxLength={200}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (fieldErrors.email) setFieldErrors((previous) => ({ ...previous, email: undefined }));
          }}
          error={fieldErrors.email}
          autoComplete="email"
          maxLength={254}
          inputMode="email"
        />
        <TextField
          label="Firm or company"
          name="company"
          required
          value={company}
          onChange={(value) => {
            setCompany(value);
            if (fieldErrors.company) setFieldErrors((previous) => ({ ...previous, company: undefined }));
          }}
          error={fieldErrors.company}
          autoComplete="organization"
          maxLength={200}
        />
        <TextField label="Role or title" name="role" value={role} onChange={setRole} autoComplete="organization-title" maxLength={200} />
        <TextArea className="sm:col-span-2" label="Message" name="message" value={message} onChange={setMessage} maxLength={5000} placeholder="Tell us about your interest or mandate (optional)." />
        <Honeypot value={honeypot} onChange={setHoneypot} />
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-rose-ink px-6 py-3 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:active:scale-100"
          >
            {status === "submitting" ? "Sending…" : "Request data-room access"}
          </button>
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        The information you provide is used to review and respond to this request. Please do
        not include confidential information unless requested by the EndoCyclic team.
      </p>
    </form>
  );
}
