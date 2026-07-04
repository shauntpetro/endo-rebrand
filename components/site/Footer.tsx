"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { clsx } from "clsx";
import { SITE, FOOTER_NAV } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YEAR = 2026;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      setMsg("Enter a valid email address.");
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
        setMsg(data.error || "Something went wrong. Please try again.");
        return;
      }
      setState("done");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Network error. Please try again.");
    }
  };

  return (
    <footer role="contentinfo" className="grain relative overflow-hidden bg-plum-abyss text-paper-on-dark">
      <div className="container-editorial relative z-10 pb-12 pt-20 lg:pt-28">
        {/* Top: wordmark statement + newsletter */}
        <div className="grid gap-12 border-b border-line-on-dark pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="font-serif text-3xl leading-tight text-paper-on-dark md:text-4xl">
              Non-hormonal medicine that acts <span className="italic-display text-gold-light">only where disease lives.</span>
            </p>
            <div className="mt-8 flex items-center gap-3 text-muted-on-dark">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="t-label">{SITE.location}</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="t-label text-gold-light">Stay close to the science</h2>
            <p className="mt-3 max-w-sm text-muted-on-dark">
              Milestone-only updates on our clinical progress. No noise.
            </p>
            {state === "done" ? (
              <div className="mt-6 flex items-center gap-3 text-gold-light" role="status">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                  <Check size={16} />
                </span>
                <span>You’re subscribed. Thank you.</span>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6">
                <div className="absolute left-[-9999px] top-0 overflow-hidden" aria-hidden>
                  <label htmlFor="footer-hp">Leave empty</label>
                  <input id="footer-hp" name="_honeypot" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
                <div className="flex items-center gap-3 border-b border-line-on-dark focus-within:border-gold-light">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="name@company.com"
                    aria-invalid={state === "error" || undefined}
                    className="w-full bg-transparent py-3 text-paper-on-dark placeholder:text-muted-on-dark/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    aria-label="Subscribe"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-plum-abyss transition-colors hover:bg-paper-on-dark disabled:opacity-50"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {state === "error" && (
                  <p role="alert" className="mt-2 text-sm text-rose">{msg}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Sitemap */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="EndoCyclic — home" className="relative block h-9 w-48">
              <Image src="/logo.avif" alt="EndoCyclic Therapeutics" fill sizes="192px" className="object-contain object-left brightness-0 invert" />
            </Link>
          </div>
          {(Object.entries(FOOTER_NAV) as [string, readonly { name: string; href: string; external?: boolean }[]][]).map(
            ([heading, links]) => (
              <nav key={heading} aria-label={heading} className="lg:col-span-2">
                <h3 className="t-label text-gold-light">{heading}</h3>
                <ul className="mt-5 space-y-3">
                  {links.map((l) => (
                    <li key={l.name}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="klink text-muted-on-dark transition-colors hover:text-paper-on-dark">
                          {l.name}
                        </a>
                      ) : (
                        <Link href={l.href} className="klink text-muted-on-dark transition-colors hover:text-paper-on-dark">
                          {l.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ),
          )}
        </div>

        {/* Folio */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line-on-dark pt-8 text-muted-on-dark sm:flex-row sm:items-center">
          <p className="t-label">© {YEAR} {SITE.legalName}</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${SITE.email}`} className={clsx("klink t-label transition-colors hover:text-paper-on-dark")}>{SITE.email}</a>
            <Link href="/contact?subject=privacy" className="klink t-label transition-colors hover:text-paper-on-dark">Privacy</Link>
            <Link href="/contact?subject=terms" className="klink t-label transition-colors hover:text-paper-on-dark">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
