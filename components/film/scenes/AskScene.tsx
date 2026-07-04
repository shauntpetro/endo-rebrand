"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Scene, { SceneBody } from "@/components/film/Scene";
import Reveal from "@/components/site/Reveal";
import FilmCTA from "@/components/film/FilmCTA";
import { useOverlay } from "@/components/film/overlay";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
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

  if (state === "done") {
    return (
      <p className="t-label flex items-center gap-2 text-gold-soft" role="status">
        <Check size={16} /> Subscribed — thank you.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="film-hp">Leave empty</label>
        <input id="film-hp" name="_honeypot" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <label htmlFor="film-news" className="t-label mb-2 block text-muted-on-dark">Milestone-only updates</label>
      <div className="flex items-center gap-2 border-b-2 border-line-on-dark focus-within:border-gold">
        <input
          id="film-news"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="name@company.com"
          aria-invalid={state === "error" || undefined}
          className="w-full bg-transparent py-3 text-cream placeholder:text-muted-on-dark/60 focus:outline-none"
        />
        <button type="submit" disabled={state === "loading"} aria-label="Subscribe" className="flex h-9 w-9 shrink-0 items-center justify-center bg-gold text-ink transition-colors hover:bg-cream disabled:opacity-50">
          <ArrowRight size={16} />
        </button>
      </div>
      {state === "error" && <p role="alert" className="mt-2 text-sm text-rose">{msg}</p>}
    </form>
  );
}

function FilmFooter() {
  const { open } = useOverlay();
  return (
    <footer role="contentinfo" className="bg-ink text-cream">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold text-cream">
            Non-hormonal medicine that acts <span className="text-gold-soft">only where disease lives.</span>
          </p>
          <p className="t-label mt-6 flex items-center gap-2 text-muted-on-dark">
            <span aria-hidden className="h-2 w-2 bg-gold" /> {SITE.location}
          </p>
        </div>
        <nav aria-label="More" className="md:col-span-3">
          <h2 className="t-label text-gold-soft">Explore</h2>
          <ul className="mt-5 space-y-3">
            {([["Pipeline", "pipeline"], ["Team", "team"], ["News", "news"], ["Investors", "invest"], ["Media kit", "media"]] as const).map(
              ([label, id]) => (
                <li key={id}>
                  <button onClick={() => open(id)} className="klink text-muted-on-dark transition-colors hover:text-cream">{label}</button>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <Newsletter />
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="klink t-label text-muted-on-dark hover:text-cream">LinkedIn</a>
            <a href={SITE.twitter} target="_blank" rel="noopener noreferrer" className="klink t-label text-muted-on-dark hover:text-cream">Twitter / X</a>
            <a href={`mailto:${SITE.email}`} className="klink t-label text-muted-on-dark hover:text-cream">{SITE.email}</a>
          </div>
        </div>
      </div>
      <div className="container-editorial flex flex-col gap-3 border-t border-line-on-dark py-6 text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
        <p className="t-label">© 2026 {SITE.legalName}</p>
        <div className="flex gap-6">
          <button onClick={() => open("contact")} className="klink t-label hover:text-cream">Contact</button>
          <button onClick={() => open("media")} className="klink t-label hover:text-cream">Media</button>
        </div>
      </div>
    </footer>
  );
}

export default function AskScene() {
  return (
    <Scene id="ask" tone="gold" center={false} aria-label="The Ask">
      <div className="flex min-h-svh flex-col">
        <div className="flex flex-1 items-center py-24">
          <SceneBody>
            <p className="t-label text-ink/70">The strategic diligence front door</p>
            <Reveal className="mt-6">
              <h2 className="t-display max-w-[18ch] uppercase text-ink">
                Change what a diagnosis <span className="mark-teal">can mean.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
              <FilmCTA overlay="contact" variant="solid">Partner with us</FilmCTA>
              <FilmCTA overlay="invest" variant="ghost">For investors</FilmCTA>
            </Reveal>
          </SceneBody>
        </div>
        <FilmFooter />
      </div>
    </Scene>
  );
}
