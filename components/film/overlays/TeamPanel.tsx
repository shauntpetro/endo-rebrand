"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import Reveal from "@/components/site/Reveal";
import FilmCTA from "@/components/film/FilmCTA";
import { TEAM, SITE } from "@/lib/site";

/** Accent cycle for the bench cards (Bauhaus color blocks on cream). */
const ACCENTS = [
  { bar: "bg-gold", label: "text-gold-ink" },
  { bar: "bg-teal", label: "text-teal-ink" },
  { bar: "bg-plum", label: "text-ink-muted" },
] as const;

export default function TeamPanel({ param }: { param?: string }) {
  const reduced = useReducedMotion();
  const founder = TEAM[0];
  const bench = TEAM.slice(1);

  // Deep link: #!team/<member-id> scrolls to that member.
  useEffect(() => {
    if (!param) return;
    const raf = requestAnimationFrame(() => {
      document
        .getElementById(`team-${param}`)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [param, reduced]);

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* Intro                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Team introduction"
        className="relative overflow-hidden px-6 py-14 md:px-10 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 shape-dot bg-gold"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-24 top-24 h-10 w-10 shape-dot bg-teal"
        />
        <Reveal>
          <p className="t-label flex items-center gap-2 text-gold-ink">
            <span aria-hidden className="h-2 w-2 bg-gold" />
            § The team
          </p>
          <h2 className="t-h1 mt-6 max-w-[16ch] uppercase text-ink">
            The people behind <span className="mark-gold">the platform.</span>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-ink-muted">
            Led by the founder-inventor — and backed by former FDA reviewers, veteran drug
            developers, and clinical researchers across toxicology, CMC, regulatory,
            clinical affairs, and biostatistics.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Founder spotlight — plum color block                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        id={`team-${founder.id}`}
        aria-label={`Founder spotlight: ${founder.name}`}
        className="relative overflow-hidden bg-plum px-6 py-14 text-paper-on-dark md:px-10 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 shape-dot bg-teal opacity-30"
        />
        <div className="relative z-10 grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Portrait with offset gold block */}
          <Reveal className="md:col-span-5">
            <div className="relative max-w-sm">
              <div aria-hidden className="absolute -left-3 -top-3 h-full w-full bg-gold" />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={founder.image}
                  alt={`Portrait of ${founder.name}, ${founder.role} of ${SITE.name}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden className="absolute -bottom-4 -right-4 h-9 w-9 shape-dot bg-teal" />
            </div>
          </Reveal>

          {/* Name, quote, bio */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="t-label text-gold-soft">Founder spotlight — {founder.role}</p>
              <h3 className="t-h2 mt-4 uppercase text-cream">{founder.name}</h3>
            </Reveal>
            {founder.quote && (
              <Reveal delay={0.08}>
                <blockquote className="mt-8 border-l-4 border-gold pl-5">
                  <p className="font-display text-xl font-bold leading-snug text-gold-soft md:text-2xl">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}
            <Reveal delay={0.14}>
              <p className="t-body mt-8 max-w-prose text-muted-on-dark">{founder.bio}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="klink t-label mt-8 inline-flex items-center gap-2 text-cream hover:text-gold-soft"
              >
                LinkedIn <ArrowUpRight size={15} aria-hidden />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* The bench                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Leadership and advisors" className="px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <p className="t-label flex items-center gap-2 text-teal-ink">
            <span aria-hidden className="h-2 w-2 bg-teal" />
            § The bench
          </p>
          <h3 className="t-h2 mt-5 max-w-[18ch] uppercase text-ink">
            Deep on every axis <span className="text-gold-ink">of drug development.</span>
          </h3>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {bench.map((m, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Reveal
                as="li"
                key={m.id}
                delay={Math.min(i * 0.05, 0.25)}
                className="flex"
              >
                <article
                  id={`team-${m.id}`}
                  className="relative flex w-full flex-col border-2 border-ink bg-paper-raised"
                >
                  {/* accent bar */}
                  <div aria-hidden className={clsx("h-2 w-full", accent.bar)} />
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={m.image}
                      alt={`Portrait of ${m.name}, ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden
                      className="t-num absolute bottom-2 right-3 text-4xl leading-none text-cream mix-blend-difference"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className={clsx("t-label", accent.label)}>{m.role}</p>
                    <h4 className="t-h3 mt-2 text-ink">{m.name}</h4>
                    <p className="t-body mt-3 text-ink-muted">{m.bio}</p>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="klink t-label mt-auto inline-flex items-center gap-2 pt-6 text-ink hover:text-gold-ink"
                    >
                      LinkedIn <ArrowUpRight size={15} aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA — ink color block                                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Contact the team"
        className="relative overflow-hidden bg-ink px-6 py-14 text-paper-on-dark md:px-10 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 top-1/2 h-44 w-44 -translate-y-1/2 shape-dot bg-gold opacity-90"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-1/3 bg-teal"
        />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <h3 className="t-h2 uppercase text-cream">
              Diligence <span className="text-gold-soft">welcome.</span>
            </h3>
            <p className="t-lead mt-5 max-w-xl text-muted-on-dark">
              From regulatory strategy to biostatistics — bring your questions to the team
              behind the platform.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-4">
            <FilmCTA overlay="contact" variant="gold-on-dark">
              Start the conversation
            </FilmCTA>
            <FilmCTA href={SITE.linkedin} external variant="ghost-on-dark" arrow={false}>
              Company LinkedIn
            </FilmCTA>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
