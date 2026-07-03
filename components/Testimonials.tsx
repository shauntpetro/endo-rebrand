"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Founder pull-quote — a single plum-dark cinematic beat.
 *
 * Copy traces to truth.md: non-hormonal, disease-modifying, "designed to
 * eliminate" (all approved language). No cure-adjacent or absolute claims.
 */
const FOUNDER_QUOTE = {
  lead: "For decades, endometriosis has been managed, not modified.",
  emphasis:
    "We built a non-hormonal, disease-modifying approach designed to eliminate lesions at their source",
  tail: " — not just quiet the symptoms.",
  name: "Dr. Tanya Petrossian, PhD",
  title: "Founder & CEO, EndoCyclic Therapeutics",
};

export default function Testimonials() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-plum-dark py-28 md:py-40">
      {/* Single luminous gold accent — static radial glow (no looping animation) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 30%, rgba(201,169,97,0.16), transparent 65%)",
        }}
      />
      {/* Hairline top rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gold-primary/25" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="reveal-rise block mb-10 text-xs font-bold uppercase tracking-[0.2em] text-gold-primary"
            style={reduced ? undefined : { animationDelay: "0.05s" }}
          >
            From Our Founder
          </span>

          {/* Oversized decorative quote mark */}
          <span
            aria-hidden="true"
            className="reveal-rise block font-serif text-gold-primary/40 leading-none select-none text-7xl md:text-8xl mb-2"
            style={reduced ? undefined : { animationDelay: "0.1s" }}
          >
            {"“"}
          </span>

          <blockquote
            className="reveal-rise font-serif font-medium text-cream-primary tracking-tight text-balance text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.12]"
            style={reduced ? undefined : { animationDelay: "0.18s" }}
          >
            {FOUNDER_QUOTE.lead}{" "}
            <span className="text-gold-primary italic">{FOUNDER_QUOTE.emphasis}</span>
            {FOUNDER_QUOTE.tail}
          </blockquote>

          {/* Attribution */}
          <figcaption
            className="reveal-rise mt-12 flex flex-col items-center gap-1"
            style={reduced ? undefined : { animationDelay: "0.3s" }}
          >
            <span className="mb-5 h-px w-12 bg-gold-primary/50" aria-hidden="true" />
            <span className="font-sans font-bold text-cream-primary text-sm md:text-base">
              {FOUNDER_QUOTE.name}
            </span>
            <span className="font-sans text-cream-primary/60 text-sm">
              {FOUNDER_QUOTE.title}
            </span>
          </figcaption>
        </div>
      </div>
    </section>
  );
}
