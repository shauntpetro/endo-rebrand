"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Honeypot, TextArea, TextField } from "@/components/site/Field";
import { CONTACT_SUBJECTS } from "@/lib/site";
import {
  DEFAULT_CONTACT_SUBJECT,
  type ContactSubjectValue,
} from "./contact-subject";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm({
  initialSubject = null,
}: {
  initialSubject?: ContactSubjectValue | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const subjectOptionsRef = useRef<HTMLDivElement>(null);
  const changeSubjectRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState<ContactSubjectValue>(
    initialSubject ?? DEFAULT_CONTACT_SUBJECT,
  );
  const [subjectChooserOpen, setSubjectChooserOpen] = useState(!initialSubject);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setSubject(initialSubject ?? DEFAULT_CONTACT_SUBJECT);
    setSubjectChooserOpen(!initialSubject);
  }, [initialSubject]);

  const selectedSubject =
    CONTACT_SUBJECTS.find((option) => option.value === subject) ??
    CONTACT_SUBJECTS.find(
      (option) => option.value === DEFAULT_CONTACT_SUBJECT,
    )!;

  function resetForm() {
    setName("");
    setEmail("");
    setCompany("");
    setSubject(initialSubject ?? DEFAULT_CONTACT_SUBJECT);
    setSubjectChooserOpen(!initialSubject);
    setMessage("");
    setHoneypot("");
    setErrors({});
    setServerError("");
    setSuccessMessage("");
  }

  function restartForm() {
    resetForm();
    requestAnimationFrame(() => {
      if (initialSubject) {
        changeSubjectRef.current?.focus();
      } else {
        subjectOptionsRef.current
          ?.querySelector<HTMLInputElement>(
            `input[value="${DEFAULT_CONTACT_SUBJECT}"]`,
          )
          ?.focus();
      }
    });
  }

  function openSubjectChooser() {
    setSubjectChooserOpen(true);
    requestAnimationFrame(() => {
      subjectOptionsRef.current
        ?.querySelector<HTMLInputElement>(`input[value="${subject}"]`)
        ?.focus();
    });
  }

  function selectSubject(nextSubject: ContactSubjectValue) {
    setSubject(nextSubject);
  }

  function confirmSubject() {
    setSubjectChooserOpen(false);
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
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
      const data = await response.json().catch(() => null);

      if (response.status === 429) {
        setServerError(data?.error ?? "Too many requests. Please wait a minute and try again.");
      } else if (!response.ok || !data?.success) {
        setServerError(data?.error ?? "We couldn't send your message. Please try again, or email info@endocyclic.com.");
      } else {
        setSuccessMessage(data?.message ?? "Thank you for your message. We'll get back to you soon.");
      }
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again, or email info@endocyclic.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div role="status" className="page-enter border-y border-line bg-tint-teal px-6 py-10 md:px-10">
        <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-teal" />
        <h2 className="t-h3 mt-4 text-ink">Message received</h2>
        <p className="mt-2 text-sm text-muted">{successMessage}</p>
        <button
          type="button"
          onClick={restartForm}
          className="link-underline mt-6 inline-flex min-h-11 items-center text-sm font-medium text-teal-ink hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className="relative border-t border-line pt-8"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {Object.keys(errors).length > 0 && (
        <div
          role="region"
          aria-labelledby="contact-error-summary-title"
          className="page-enter mb-7 border-y border-rose/30 bg-petal px-4 py-4 text-sm text-ink"
        >
          <p id="contact-error-summary-title" className="font-semibold">
            Please check the highlighted fields.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-rose-ink">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <a href={`#field-${field}`} className="link-underline">
                  {error}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        <legend className="sr-only">What would you like to discuss?</legend>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-5 border-y border-line bg-tint-warm px-4 py-4 sm:px-5">
          <div className="col-start-1 row-start-1 min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rose-ink">
              Selected inquiry route
            </p>
            <p className="mt-1 font-medium text-ink">{selectedSubject.label}</p>
          </div>

          <div
            id="contact-subject-options"
            ref={subjectOptionsRef}
            hidden={!subjectChooserOpen}
            className="page-enter col-span-full row-start-2 border-t border-line pt-5"
          >
            <p className="text-sm font-semibold text-ink">What would you like to discuss?</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CONTACT_SUBJECTS.map((option) => {
                const id = `contact-subject-${option.value}`;
                return (
                  <label key={option.value} htmlFor={id} className="cursor-pointer">
                    <input
                      id={id}
                      type="radio"
                      name="subject"
                      value={option.value}
                      checked={subject === option.value}
                      onChange={() => selectSubject(option.value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-12 items-center rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted transition-colors peer-checked:border-rose-ink peer-checked:bg-peony peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-teal-ink peer-focus-visible:ring-offset-2 hover:border-rose-ink/60">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            ref={changeSubjectRef}
            type="button"
            aria-expanded={subjectChooserOpen}
            aria-controls="contact-subject-options"
            onClick={subjectChooserOpen ? confirmSubject : openSubjectChooser}
            className={
              subjectChooserOpen
                ? "col-span-full row-start-3 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-rose-ink px-6 py-3 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink motion-reduce:active:scale-100 motion-reduce:transition-none"
                : "link-underline col-start-2 row-start-1 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-teal-ink hover:text-ink"
            }
          >
            {subjectChooserOpen ? "Continue" : "Change"}
          </button>
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          required
          value={name}
          onChange={(value) => {
            setName(value);
            if (errors.name) setErrors((previous) => ({ ...previous, name: undefined }));
          }}
          error={errors.name}
          autoComplete="name"
          maxLength={200}
          placeholder="Your full name"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (errors.email) setErrors((previous) => ({ ...previous, email: undefined }));
          }}
          error={errors.email}
          autoComplete="email"
          maxLength={254}
          inputMode="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5">
        <TextField
          label="Company"
          name="company"
          value={company}
          onChange={setCompany}
          autoComplete="organization"
          maxLength={200}
          placeholder="Organization (optional)"
        />
      </div>

      <div className="mt-5">
        <TextArea
          label="Message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          value={message}
          onChange={(value) => {
            setMessage(value);
            if (errors.message) setErrors((previous) => ({ ...previous, message: undefined }));
          }}
          error={errors.message}
          placeholder="Share the context for your inquiry."
        />
      </div>

      {serverError && (
        <p role="alert" className="page-enter mt-5 border-y border-rose/30 bg-petal px-4 py-3 text-sm text-ink">
          {serverError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-rose-ink px-7 py-3 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:active:scale-100"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">Required fields are marked with an asterisk.</p>
      </div>
      <p className="mt-5 max-w-2xl border-t border-line pt-4 text-xs leading-relaxed text-muted">
        The information you provide is used to review and respond to this inquiry. Please do
        not include confidential information unless requested by the EndoCyclic team.
      </p>
    </form>
  );
}
