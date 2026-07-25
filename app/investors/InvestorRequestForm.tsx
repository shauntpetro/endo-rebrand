"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Honeypot, TextArea, TextField } from "@/components/site/Field";
import {
  FORM_RATE_LIMIT_MESSAGE,
  normalizeContactEmail,
  withPublicContactRecovery,
} from "@/lib/contact-config";
import {
  formatRetryAfterCountdown,
  FormRequestTimeoutError,
  postFormJson,
} from "@/lib/form-client";
import { INVESTOR_SUCCESS_MESSAGE } from "@/lib/form-messages";
import { SITE } from "@/lib/site";
import { useIsHydrated } from "@/components/site/useIsHydrated";
import RetryAfterNotice, {
  useRetryAfterGate,
} from "@/components/site/RetryAfterNotice";
import { captureSiteEvent } from "@/components/PostHogProvider";
import FormDeliveryUnavailable from "@/components/site/FormDeliveryUnavailable";

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

function withoutFieldError(
  previous: FieldErrors,
  field: keyof FieldErrors,
): FieldErrors {
  const next = { ...previous };
  delete next[field];
  return next;
}

export default function InvestorRequestForm({
  deliveryAvailable = true,
}: {
  deliveryAvailable?: boolean;
} = {}) {
  return deliveryAvailable ? (
    <ConfiguredInvestorRequestForm />
  ) : (
    <FormDeliveryUnavailable kind="investor" />
  );
}

function ConfiguredInvestorRequestForm() {
  const isHydrated = useIsHydrated();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const requestInFlightRef = useRef(false);
  const formStartedRef = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const {
    clearRetryGate,
    hasRetryGate,
    initialRetrySeconds,
    retryBlocked,
    retrySeconds,
    startRetryGate,
  } = useRetryAfterGate();

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!normalizeContactEmail(email))
      next.email = "Please provide a valid email address.";
    if (!company.trim()) next.company = "Please enter your firm or company.";
    setFieldErrors(next);
    const firstInvalidField = Object.keys(next)[0];
    if (firstInvalidField) {
      void captureSiteEvent("investor_form_validation_failure");
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      });
      return false;
    }
    return true;
  }

  function trackFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    void captureSiteEvent("investor_form_start");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestInFlightRef.current || retryBlocked) return;

    setFormError("");
    clearRetryGate();
    if (!validate()) return;

    requestInFlightRef.current = true;
    submitRef.current?.focus();
    setStatus("submitting");
    try {
      const { response, data } = await postFormJson<{
        success?: boolean;
        error?: string;
      }>("/api/investor", {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          message: message.trim(),
          _honeypot: honeypot,
      });

      if (response.ok && data?.success) {
        void captureSiteEvent("investor_form_submission_success");
        setStatus("success");
        return;
      }

      void captureSiteEvent("investor_form_submission_failure");
      if (response.status === 429) {
        startRetryGate(response);
        setFormError(FORM_RATE_LIMIT_MESSAGE);
      } else {
        setFormError(
          data?.error ||
            withPublicContactRecovery(
              "We couldn't submit your request. Please try again.",
              SITE.email,
            ),
        );
      }
      setStatus("idle");
    } catch (error) {
      void captureSiteEvent("investor_form_submission_failure");
      setFormError(
        error instanceof FormRequestTimeoutError
          ? withPublicContactRecovery(
              "The request took too long. Please check your connection and try again.",
              SITE.email,
            )
          : withPublicContactRecovery(
              "We couldn't reach the server. Check your connection and try again.",
              SITE.email,
            ),
      );
      setStatus("idle");
    } finally {
      requestInFlightRef.current = false;
    }
  }

  const submissionStatus =
    status === "success"
      ? INVESTOR_SUCCESS_MESSAGE
      : status === "submitting"
        ? "Sending your data-room access request. Please wait."
        : hasRetryGate
          ? retryBlocked
            ? `Submission temporarily paused. ${formatRetryAfterCountdown(initialRetrySeconds)}`
            : "Submission is available again."
          : formError;

  return (
    <>
      <div
        id="investor-submit-status"
        ref={successRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={status === "success" ? -1 : undefined}
        className={
          status === "success"
            ? "page-enter min-w-0 scroll-mt-28 border-y border-line bg-tint-teal px-6 py-10 [overflow-wrap:anywhere] sm:px-8"
            : "sr-only"
        }
      >
        {status === "success" ? (
          <>
            <CheckCircle2 size={28} className="text-teal-ink" aria-hidden />
            <h3 className="t-h3 mt-4 text-ink">Request received.</h3>
            <p className="mt-3 text-sm text-muted">
              {INVESTOR_SUCCESS_MESSAGE}
              {SITE.email ? (
                <>
                  {" "}
                  For anything urgent, email us at{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="prose-link min-w-0 text-teal-ink [overflow-wrap:anywhere]"
                  >
                    {SITE.email}
                  </a>
                  .
                </>
              ) : null}
            </p>
            <Link
              href="/pipeline"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
            >
              <span className="link-underline">Review the pipeline</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </>
        ) : (
          submissionStatus
        )}
      </div>
      {status !== "success" && (
      <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={trackFormStart}
      method="post"
      action="/api/investor"
      noValidate={isHydrated}
      aria-label="Investor data-room access request"
      aria-busy={status === "submitting"}
      className="border-y border-line py-7 sm:py-9"
    >
      {Object.keys(fieldErrors).length > 0 && (
        <div
          role="region"
          aria-labelledby="investor-error-summary-title"
          className="page-enter mb-6 min-w-0 border-y border-rose/30 bg-petal px-4 py-4 text-sm text-ink [overflow-wrap:anywhere]"
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
        <p className="page-enter mb-6 min-w-0 border-y border-rose/30 bg-petal px-4 py-3 text-sm text-ink [overflow-wrap:anywhere]">
          {formError}
        </p>
      )}
      {hasRetryGate && (
        <RetryAfterNotice
          id="investor-retry-after"
          secondsRemaining={retrySeconds}
          initialSeconds={initialRetrySeconds}
          className="mb-6 text-sm text-rose-ink"
          announce={false}
        />
      )}
      <fieldset
        disabled={status === "submitting"}
        className="grid min-w-0 gap-5 sm:grid-cols-2"
      >
        <legend className="sr-only">Investor request details</legend>
        <TextField
          label="Full name"
          name="name"
          required
          value={name}
          onChange={(value) => {
            setName(value);
            if (fieldErrors.name && value.trim()) {
              setFieldErrors((previous) =>
                withoutFieldError(previous, "name"),
              );
            }
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
            if (fieldErrors.email && normalizeContactEmail(value)) {
              setFieldErrors((previous) =>
                withoutFieldError(previous, "email"),
              );
            }
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
            if (fieldErrors.company && value.trim()) {
              setFieldErrors((previous) =>
                withoutFieldError(previous, "company"),
              );
            }
          }}
          error={fieldErrors.company}
          autoComplete="organization"
          maxLength={200}
        />
        <TextField label="Role or title" name="role" value={role} onChange={setRole} autoComplete="organization-title" maxLength={200} />
        <TextArea className="sm:col-span-2" label="Message" name="message" value={message} onChange={setMessage} maxLength={5000} placeholder="Tell us about your interest or mandate (optional)." />
        <Honeypot value={honeypot} onChange={setHoneypot} />
      </fieldset>
        <div className="mt-5">
          <button
            ref={submitRef}
            type="submit"
            aria-disabled={status === "submitting" || retryBlocked}
            aria-describedby={
              hasRetryGate ? "investor-retry-after" : undefined
            }
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-rose-ink px-6 py-3 text-sm font-medium text-on-dark transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-rose-ink motion-reduce:active:scale-100"
          >
            {status === "submitting"
              ? "Sending…"
              : retryBlocked
                ? "Request temporarily unavailable"
                : "Request data-room access"}
          </button>
        </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        The information you provide is used to review and respond to this request. Please do
        not include confidential information unless requested by the EndoCyclic team.
      </p>
      </form>
      )}
    </>
  );
}
