"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SITE, FOOTER_NAV } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setMsg("Enter a valid email.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), _honeypot: hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setState("error");
        setMsg(data.error || "Something went wrong.");
        return;
      }
      setState("done");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Network error.");
    }
  };

  return (
    <footer role="contentinfo" className="border-t border-line bg-tint-warm">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" aria-label="EndoCyclic — home" className="relative block h-8 w-40">
            <Image src="/logo.avif" alt="EndoCyclic Therapeutics" fill sizes="160px" className="object-contain object-left" />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted">
            A clinical-stage precision medicine company developing non-hormonal peptides that act only where disease lives.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" /> {SITE.location}
          </p>
        </div>

        {(Object.entries(FOOTER_NAV) as [string, readonly { name: string; href: string; external?: boolean }[]][]).map(
          ([heading, links]) => (
            <nav key={heading} aria-label={heading} className="md:col-span-2">
              <h2 className="eyebrow text-teal-ink">{heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.name}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-ink">
                        {l.name}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                        {l.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ),
        )}

        <div className="md:col-span-2">
          <h2 className="eyebrow text-teal-ink">Updates</h2>
          {state === "done" ? (
            <p className="mt-4 flex items-center gap-2 text-sm text-teal-ink" role="status">
              <Check size={15} /> Subscribed.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-4">
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="foot-hp">Leave empty</label>
                <input id="foot-hp" name="_honeypot" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>
              <label htmlFor="foot-email" className="sr-only">Email address</label>
              <div className="flex items-center gap-2 border-b border-line focus-within:border-teal-ink">
                <input
                  id="foot-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="Email"
                  aria-invalid={state === "error" || undefined}
                  className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-muted focus:outline-none"
                />
                <button type="submit" disabled={state === "loading"} aria-label="Subscribe" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-plum text-on-dark transition-colors hover:bg-teal-ink disabled:opacity-50">
                  <ArrowRight size={15} />
                </button>
              </div>
              {state === "error" && <p role="alert" className="mt-2 text-xs text-rose">{msg}</p>}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}</p>
          <div className="flex gap-6">
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-ink">{SITE.email}</a>
            <Link href="/contact?subject=privacy" className="transition-colors hover:text-ink">Privacy</Link>
            <Link href="/contact?subject=terms" className="transition-colors hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
