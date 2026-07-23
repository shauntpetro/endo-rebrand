"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setMessage("Enter a valid email.");
      return;
    }
    setState("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), _honeypot: hp }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setState("error");
        setMessage(data.error || "We couldn’t subscribe you. Please try again.");
        return;
      }
      setState("done");
      setEmail("");
    } catch {
      setState("error");
      setMessage("We couldn’t subscribe you. Check your connection and try again.");
    }
  };

  if (state === "done") {
    return (
      <p className="page-enter mt-4 flex min-h-11 items-center gap-2 text-sm text-teal-on-dark" role="status">
        <Check size={15} /> Update request received.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4" aria-busy={state === "loading"}>
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="foot-hp">Leave empty</label>
        <input id="foot-hp" name="_honeypot" tabIndex={-1} autoComplete="off" value={hp} onChange={(event) => setHp(event.target.value)} />
      </div>
      <label htmlFor="foot-email" className="sr-only">Email address</label>
      <div className="flex items-center gap-2 border-b border-line-on-dark focus-within:border-teal-on-dark">
        <input
          id="foot-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="Email address"
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? "foot-email-error" : undefined}
          className="min-h-11 w-full bg-transparent py-2 text-sm text-on-dark placeholder:text-muted-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-on-dark"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label={state === "loading" ? "Subscribing" : "Subscribe"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-on-dark text-plum transition-[background-color,transform] hover:bg-teal-on-dark active:scale-95 disabled:opacity-50 motion-reduce:transform-none"
        >
          <ArrowRight size={15} className={state === "loading" ? "animate-pulse" : undefined} />
        </button>
      </div>
      {state === "error" && <p id="foot-email-error" role="alert" className="page-enter mt-2 text-xs text-[#f1b9c3]">{message}</p>}
    </form>
  );
}
