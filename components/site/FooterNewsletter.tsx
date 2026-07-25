"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
import { SITE } from "@/lib/site";
import { useIsHydrated } from "./useIsHydrated";
import RetryAfterNotice, {
  useRetryAfterGate,
} from "./RetryAfterNotice";
import FormDeliveryUnavailable from "./FormDeliveryUnavailable";

type NewsletterState =
  | "idle"
  | "loading"
  | "done"
  | "invalid"
  | "error";

export default function FooterNewsletter({
  deliveryAvailable = true,
}: {
  deliveryAvailable?: boolean;
} = {}) {
  return deliveryAvailable ? (
    <ConfiguredFooterNewsletter />
  ) : (
    <FormDeliveryUnavailable kind="newsletter" tone="dark" />
  );
}

function ConfiguredFooterNewsletter() {
  const isHydrated = useIsHydrated();
  const emailRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const requestInFlightRef = useRef(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<NewsletterState>("idle");
  const [message, setMessage] = useState("");
  const {
    clearRetryGate,
    hasRetryGate,
    initialRetrySeconds,
    retryBlocked,
    retrySeconds,
    startRetryGate,
  } = useRetryAfterGate();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (requestInFlightRef.current || retryBlocked) return;

    clearRetryGate();
    if (!normalizeContactEmail(email)) {
      setState("invalid");
      setMessage("Enter a complete email address, such as name@company.com.");
      emailRef.current?.focus();
      return;
    }
    requestInFlightRef.current = true;
    submitRef.current?.focus();
    setMessage("");
    setState("loading");
    try {
      const { response, data } = await postFormJson<{
        success?: boolean;
        error?: string;
      }>("/api/newsletter", {
        email: email.trim(),
        _honeypot: hp,
      });
      if (!response.ok || !data?.success) {
        if (response.status === 429) {
          startRetryGate(response);
          setState("error");
          setMessage(FORM_RATE_LIMIT_MESSAGE);
          return;
        }
        setState("error");
        setMessage(
          data?.error ||
            withPublicContactRecovery(
              "We couldn’t send your update request. Please try again.",
              SITE.email,
            ),
        );
        return;
      }
      setState("done");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof FormRequestTimeoutError
          ? withPublicContactRecovery(
              "The request took too long. Please check your connection and try again.",
              SITE.email,
            )
          : withPublicContactRecovery(
              "We couldn’t send your update request. Check your connection and try again.",
          SITE.email,
        ),
      );
    } finally {
      requestInFlightRef.current = false;
    }
  };

  const statusMessage =
    state === "loading"
      ? "Sending your company update request. Please wait."
      : state === "done"
        ? "Update request received."
        : hasRetryGate
          ? retryBlocked
            ? `Submission temporarily paused. ${formatRetryAfterCountdown(initialRetrySeconds)}`
            : "Submission is available again."
          : state === "invalid" || state === "error"
            ? message
            : "";

  return (
    <form
      onSubmit={submit}
      method="post"
      action="/api/newsletter"
      noValidate={isHydrated}
      className="mt-4"
      aria-label="Request company updates"
      aria-busy={state === "loading"}
    >
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="foot-hp">Leave empty</label>
        <input id="foot-hp" name="_honeypot" tabIndex={-1} autoComplete="off" value={hp} onChange={(event) => setHp(event.target.value)} />
      </div>
      <fieldset className="min-w-0">
        <legend className="sr-only">Company updates request</legend>
        <label htmlFor="foot-email" className="sr-only">Email address</label>
        <div className="flex min-w-0 flex-col items-stretch gap-3 border-b border-line-on-dark focus-within:border-teal-on-dark sm:flex-row sm:items-center sm:gap-2 lg:flex-col lg:items-stretch lg:gap-3">
          <input
            ref={emailRef}
            id="foot-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            readOnly={state === "loading"}
            value={email}
            onChange={(event) => {
              if (state === "loading") return;
              const nextEmail = event.target.value;
              setEmail(nextEmail);
              if (
                (state === "invalid" && normalizeContactEmail(nextEmail)) ||
                state === "error" ||
                state === "done"
              ) {
                setState("idle");
              }
            }}
            placeholder="Email address"
            maxLength={254}
            aria-invalid={state === "invalid" || undefined}
            aria-describedby={
              state === "invalid" || state === "error"
                ? "foot-email-error"
                : undefined
            }
            className="min-h-11 min-w-0 w-full flex-1 bg-transparent py-2 text-sm text-on-dark placeholder:text-muted-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-on-dark"
          />
          <button
            ref={submitRef}
            type="submit"
            aria-disabled={state === "loading" || retryBlocked}
            aria-describedby={
              hasRetryGate ? "newsletter-retry-after" : undefined
            }
            aria-label={
              state === "loading"
                ? "Sending update request…"
                : retryBlocked
                  ? "Request temporarily unavailable"
                  : "Request updates — company news"
            }
            className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-on-dark px-4 text-plum transition-[background-color,transform] hover:bg-teal-on-dark active:scale-95 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-on-dark motion-reduce:transform-none sm:w-auto lg:w-full"
          >
            <span className="min-w-0 text-center text-xs font-semibold leading-tight [overflow-wrap:anywhere]">
              {state === "loading"
                ? "Sending update request…"
                : retryBlocked
                  ? "Request temporarily unavailable"
                  : "Request updates"}
            </span>
            <ArrowRight
              size={15}
              className={
                state === "loading"
                  ? "animate-pulse motion-reduce:animate-none"
                  : undefined
              }
            />
          </button>
        </div>
      </fieldset>
      {(state === "invalid" || state === "error") && <p id="foot-email-error" className="page-enter mt-2 min-w-0 text-xs text-error-on-dark [overflow-wrap:anywhere]">{message}</p>}
      {hasRetryGate && (
        <RetryAfterNotice
          id="newsletter-retry-after"
          secondsRemaining={retrySeconds}
          initialSeconds={initialRetrySeconds}
          className="mt-2 text-xs text-error-on-dark"
          announce={false}
        />
      )}
      <p
        id="newsletter-submit-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={
          state === "done"
            ? "page-enter mt-2 flex min-h-11 min-w-0 items-center gap-2 text-sm text-teal-on-dark [overflow-wrap:anywhere]"
            : "sr-only"
        }
      >
        {state === "done" && <Check aria-hidden size={15} />}
        {statusMessage}
      </p>
    </form>
  );
}
