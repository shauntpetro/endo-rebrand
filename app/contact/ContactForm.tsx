"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/form-messages";
import { CONTACT_SUBJECTS, SITE } from "@/lib/site";
import { useIsHydrated } from "@/components/site/useIsHydrated";
import RetryAfterNotice, {
  useRetryAfterGate,
} from "@/components/site/RetryAfterNotice";
import { captureSiteEvent } from "@/components/PostHogProvider";
import FormDeliveryUnavailable from "@/components/site/FormDeliveryUnavailable";
import {
  DEFAULT_CONTACT_SUBJECT,
  resolveContactRoute,
  type ContactIntentValue,
  type ContactSubjectValue,
} from "./contact-subject";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const CONTACT_INTENT_COPY: Record<
  ContactIntentValue,
  { routeDetail: string; description: string; placeholder: string }
> = {
  press: {
    routeDetail: "Press desk support",
    description:
      "Include your outlet, deadline, and the context you need confirmed.",
    placeholder:
      "Share your outlet, deadline, question, or interview request.",
  },
  asset: {
    routeDetail: "Alternate asset format",
    description:
      "Include the asset, required format, intended use, and delivery timing.",
    placeholder:
      "Tell us which asset and format you need, plus the intended use.",
  },
};

function withoutFieldError(
  previous: FieldErrors,
  field: keyof FieldErrors,
): FieldErrors {
  const next = { ...previous };
  delete next[field];
  return next;
}

type ContactFormProps = {
  initialSubject?: ContactSubjectValue | null;
  initialIntent?: ContactIntentValue | null;
  deliveryAvailable?: boolean;
};

export default function ContactForm({
  deliveryAvailable = true,
  ...props
}: ContactFormProps) {
  return deliveryAvailable ? (
    <ConfiguredContactForm {...props} />
  ) : (
    <FormDeliveryUnavailable kind="contact" />
  );
}

function ConfiguredContactForm({
  initialSubject,
  initialIntent,
}: Omit<ContactFormProps, "deliveryAvailable">) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const subjectOptionsRef = useRef<HTMLDivElement>(null);
  const changeSubjectRef = useRef<HTMLButtonElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const requestInFlightRef = useRef(false);
  const formStartedRef = useRef(false);
  const isHydrated = useIsHydrated();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [routedSubject, setRoutedSubject] =
    useState<ContactSubjectValue | null>(initialSubject ?? null);
  const [routedIntent, setRoutedIntent] =
    useState<ContactIntentValue | null>(initialIntent ?? null);
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
  const {
    clearRetryGate,
    hasRetryGate,
    initialRetrySeconds,
    retryBlocked,
    retrySeconds,
    startRetryGate,
  } = useRetryAfterGate();

  useEffect(() => {
    let focusObserver: MutationObserver | null = null;

    function applyRouteSelection({
      subject: nextSubject,
      intent: nextIntent,
    }: ReturnType<typeof resolveContactRoute>) {
      setRoutedSubject(nextSubject);
      setRoutedIntent(nextIntent);
      setSubject(nextSubject ?? DEFAULT_CONTACT_SUBJECT);
      setSubjectChooserOpen(!nextSubject);
    }

    function syncRoutedSubject(search: string) {
      const searchParams = new URLSearchParams(search);
      applyRouteSelection(
        resolveContactRoute({
          subject: searchParams.get("subject"),
          intent: searchParams.get("intent"),
        }),
      );
    }

    function syncFromLocation() {
      syncRoutedSubject(window.location.search);
    }

    function syncFromSameRouteLink(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target.toLowerCase() !== "_self")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        (!destination.searchParams.has("subject") &&
          !destination.searchParams.has("intent"))
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState(
        null,
        "",
        `${destination.pathname}${destination.search}${destination.hash}`,
      );
      syncRoutedSubject(destination.search);

      if (destination.hash) {
        let targetId = destination.hash.slice(1);
        try {
          targetId = decodeURIComponent(targetId);
        } catch {
          // Keep the encoded id if the destination contains malformed escapes.
        }
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ block: "start" });

        if (target instanceof HTMLElement) {
          const inertAncestor = target.closest<HTMLElement>("[inert]");

          if (!inertAncestor) {
            window.requestAnimationFrame(() => {
              if (target.isConnected) {
                target.focus({ preventScroll: true });
              }
            });
          } else {
            focusObserver?.disconnect();
            focusObserver = new MutationObserver(() => {
              if (!target.isConnected) {
                focusObserver?.disconnect();
                return;
              }
              if (target.closest("[inert]")) return;

              focusObserver?.disconnect();
              target.focus({ preventScroll: true });
            });

            focusObserver.observe(inertAncestor, {
              attributes: true,
              attributeFilter: ["inert"],
            });
          }
        }
      }
    }

    if (initialSubject !== undefined || initialIntent !== undefined) {
      applyRouteSelection({
        subject: initialSubject ?? null,
        intent:
          initialSubject === "media" ? (initialIntent ?? null) : null,
      });
    } else {
      syncFromLocation();
    }
    window.addEventListener("popstate", syncFromLocation);
    document.addEventListener("click", syncFromSameRouteLink, true);

    return () => {
      focusObserver?.disconnect();
      window.removeEventListener("popstate", syncFromLocation);
      document.removeEventListener("click", syncFromSameRouteLink, true);
    };
  }, [initialIntent, initialSubject]);

  useEffect(() => {
    if (successMessage) {
      successRef.current?.focus();
    }
  }, [successMessage]);

  const selectedSubject =
    CONTACT_SUBJECTS.find((option) => option.value === subject) ??
    CONTACT_SUBJECTS.find(
      (option) => option.value === DEFAULT_CONTACT_SUBJECT,
    )!;
  const activeIntent =
    subject === "media" && routedIntent
      ? CONTACT_INTENT_COPY[routedIntent]
      : null;

  function resetForm() {
    formStartedRef.current = false;
    setName("");
    setEmail("");
    setCompany("");
    setSubject(routedSubject ?? DEFAULT_CONTACT_SUBJECT);
    setSubjectChooserOpen(!routedSubject);
    setMessage("");
    setHoneypot("");
    setErrors({});
    setServerError("");
    setSuccessMessage("");
    clearRetryGate();
  }

  function restartForm() {
    resetForm();
    requestAnimationFrame(() => {
      if (routedSubject) {
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

  function trackFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    void captureSiteEvent("contact_form_start");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestInFlightRef.current || retryBlocked) return;

    setServerError("");
    clearRetryGate();

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!normalizeContactEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      nextErrors.message = "Please write a message of at least 10 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      void captureSiteEvent("contact_form_validation_failure");
      const firstInvalidField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      });
      return;
    }

    requestInFlightRef.current = true;
    submitRef.current?.focus();
    setSubmitting(true);
    try {
      const { response, data } = await postFormJson<{
        success?: boolean;
        error?: string;
        message?: string;
      }>("/api/contact", {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          subject,
          message: message.trim(),
          _honeypot: honeypot,
      });

      if (response.status === 429) {
        void captureSiteEvent("contact_form_submission_failure");
        startRetryGate(response);
        setServerError(FORM_RATE_LIMIT_MESSAGE);
      } else if (!response.ok || !data?.success) {
        void captureSiteEvent("contact_form_submission_failure");
        setServerError(
          data?.error ??
            withPublicContactRecovery(
              "We couldn't send your message. Please try again.",
              SITE.email,
            ),
        );
      } else {
        void captureSiteEvent("contact_form_submission_success");
        setSuccessMessage(data?.message ?? CONTACT_SUCCESS_MESSAGE);
      }
    } catch (error) {
      void captureSiteEvent("contact_form_submission_failure");
      setServerError(
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
    } finally {
      requestInFlightRef.current = false;
      setSubmitting(false);
    }
  }

  const submissionStatus = successMessage
    ? successMessage
    : submitting
      ? "Sending your message. Please wait."
      : hasRetryGate
        ? retryBlocked
          ? `Submission temporarily paused. ${formatRetryAfterCountdown(initialRetrySeconds)}`
          : "Submission is available again."
        : serverError;

  return (
    <>
      <div
        id="contact-submit-status"
        ref={successRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={successMessage ? -1 : undefined}
        className={
          successMessage
            ? "page-enter min-w-0 scroll-mt-28 border-y border-line bg-tint-teal px-6 py-10 [overflow-wrap:anywhere] md:px-10"
            : "sr-only"
        }
      >
        {successMessage ? (
          <>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-teal"
            />
            <h3 className="t-h3 mt-4 text-ink">Message received</h3>
            <p className="mt-2 text-sm text-muted">{successMessage}</p>
            <button
              type="button"
              onClick={restartForm}
              className="link-underline mt-6 inline-flex min-h-11 items-center text-sm font-medium text-teal-ink hover:text-ink"
            >
              Send another message
            </button>
          </>
        ) : (
          submissionStatus
        )}
      </div>
      {!successMessage && (
      <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={trackFormStart}
      method="post"
      action="/api/contact"
      noValidate={isHydrated}
      aria-label="Contact inquiry"
      aria-busy={submitting}
      className="relative border-t border-line pt-8"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {Object.keys(errors).length > 0 && (
        <div
          role="region"
          aria-labelledby="contact-error-summary-title"
          className="page-enter mb-7 min-w-0 border-y border-rose/30 bg-petal px-4 py-4 text-sm text-ink [overflow-wrap:anywhere]"
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

      <fieldset disabled={submitting} className="min-w-0">
        <legend className="sr-only">Contact inquiry details</legend>
        <fieldset>
          <legend className="sr-only">What would you like to discuss?</legend>
          <div
            className={`grid items-center gap-x-5 gap-y-5 border-y border-line bg-tint-warm px-4 py-4 sm:px-5 ${
              isHydrated
                ? "grid-cols-[minmax(0,1fr)_auto]"
                : "grid-cols-1"
            }`}
          >
          <div className="col-start-1 row-start-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
              Selected inquiry route
            </p>
            <p className="mt-1 font-medium text-ink">
              {selectedSubject.label}
            </p>
            {activeIntent && (
              <p className="mt-2 text-sm text-muted">
                {activeIntent.routeDetail}
              </p>
            )}
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
                    <span className="flex min-h-12 items-center rounded-xl border border-control-line bg-surface px-4 py-3 text-sm text-muted transition-colors peer-checked:border-rose-ink peer-checked:bg-peony peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-ink peer-focus-visible:ring-2 peer-focus-visible:ring-teal-ink peer-focus-visible:ring-offset-2 hover:border-rose-ink/60">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {isHydrated && (
            <button
              ref={changeSubjectRef}
              type="button"
              aria-expanded={subjectChooserOpen}
              aria-controls="contact-subject-options"
              onClick={subjectChooserOpen ? confirmSubject : openSubjectChooser}
              className={
                subjectChooserOpen
                  ? "col-span-full row-start-3 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-rose-ink px-6 py-3 text-sm font-medium text-on-dark transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink motion-reduce:active:scale-100 motion-reduce:transition-none"
                  : "link-underline col-start-2 row-start-1 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-teal-ink hover:text-ink"
              }
            >
              {subjectChooserOpen ? "Continue" : "Change"}
            </button>
          )}
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
            if (errors.name && value.trim()) {
              setErrors((previous) => withoutFieldError(previous, "name"));
            }
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
            if (errors.email && normalizeContactEmail(value)) {
              setErrors((previous) => withoutFieldError(previous, "email"));
            }
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
            minLength={10}
            maxLength={5000}
            value={message}
            onChange={(value) => {
              setMessage(value);
              if (errors.message && value.trim().length >= 10) {
                setErrors((previous) => withoutFieldError(previous, "message"));
              }
            }}
            error={errors.message}
            description={
              activeIntent?.description
                ? `${activeIntent.description} At least 10 characters.`
                : "At least 10 characters."
            }
            placeholder={
              activeIntent?.placeholder ?? "Share the context for your inquiry."
            }
          />
        </div>
      </fieldset>

        {serverError && (
          <p className="page-enter mt-5 min-w-0 border-y border-rose/30 bg-petal px-4 py-3 text-sm text-ink [overflow-wrap:anywhere]">
            {serverError}
          </p>
        )}
        {hasRetryGate && (
          <RetryAfterNotice
            id="contact-retry-after"
            secondsRemaining={retrySeconds}
            initialSeconds={initialRetrySeconds}
            className="mt-3 text-sm text-rose-ink"
            announce={false}
          />
        )}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            ref={submitRef}
            type="submit"
            aria-disabled={submitting || retryBlocked}
            aria-describedby={
              hasRetryGate ? "contact-retry-after" : undefined
            }
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-rose-ink px-7 py-3 text-sm font-medium text-on-dark transition-[background-color,transform] duration-300 hover:bg-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-rose-ink motion-reduce:active:scale-100"
          >
            {submitting
              ? "Sending…"
              : retryBlocked
                ? "Send temporarily unavailable"
                : "Send message"}
          </button>
          <p className="text-xs text-muted">Required fields are marked with an asterisk.</p>
        </div>
        <p className="mt-5 max-w-2xl border-t border-line pt-4 text-xs leading-relaxed text-muted">
          The information you provide is used to review and respond to this inquiry. Please do
          not include confidential information unless requested by the EndoCyclic team.
        </p>
      </form>
      )}
    </>
  );
}
