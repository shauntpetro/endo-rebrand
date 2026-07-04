"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import Scene, { SceneBody } from "@/components/film/Scene";
import Reveal from "@/components/site/Reveal";
import Marquee from "@/components/site/Marquee";
import { useOverlay } from "@/components/film/overlay";
import { MILESTONES, PARTNERS, VALIDATION_WORDS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Feature the NIH perfect "10" as its own block; list the rest as the grid. */
const FEATURED = MILESTONES.find((m) => m.title.includes("10"));
const REST = MILESTONES.filter((m) => m !== FEATURED);

export default function ProofScene() {
  const reduced = useReducedMotion();
  const { open } = useOverlay();

  return (
    <Scene id="proof" tone="gold" grain aria-label="Validation">
      {/* Bauhaus geometry */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute -right-[10%] -top-[12%] h-[46vmin] w-[46vmin] shape-dot bg-plum"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        className="pointer-events-none absolute bottom-[10%] left-0 h-3 w-[34vw] origin-left bg-teal"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[14%] hidden h-10 w-10 bg-ink lg:block"
      />

      <SceneBody>
        <Reveal>
          <p className="t-label flex items-center gap-2 text-ink/70">
            <span aria-hidden className="h-2 w-2 bg-ink" />
            § Validation — external proof
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="t-h1 mt-6 max-w-[14ch] uppercase text-ink text-[clamp(1.25rem,7vw,6rem)]!">
            Backed, scored, and <span className="mark-teal">recognized.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
          {/* The "10" block — NIH perfect score */}
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative flex h-full flex-col justify-between overflow-hidden bg-ink p-8 md:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 shape-dot bg-teal"
              />
              <p className="t-label text-muted-on-dark">
                NIH Commercialization Readiness Pilot
              </p>
              <p className="t-num my-4 text-[clamp(8rem,22vmin,15rem)] leading-[0.8] text-gold-soft">
                10
              </p>
              <div>
                <p className="t-label text-cream">Perfect impact score</p>
                <p className="t-body mt-3 max-w-sm text-muted-on-dark">
                  A rare &ldquo;unicorn&rdquo; impact score of 10 on the NIH
                  Commercialization Readiness Pilot grant.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Milestone blocks */}
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:gap-5">
            {REST.map((m, i) => (
              <Reveal
                key={m.title}
                delay={0.12 + i * 0.06}
                className={clsx(i === REST.length - 1 && "sm:col-span-2")}
              >
                <div className="flex h-full flex-col gap-3 bg-cream p-6 md:p-7">
                  <span aria-hidden className="h-2.5 w-2.5 bg-gold" />
                  <h3 className="t-h3 uppercase text-ink">{m.title}</h3>
                  <p className="t-body text-ink-muted">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SceneBody>

      {/* Validation marquee band — full bleed */}
      <Reveal delay={0.1} className="relative z-10 mt-14 border-y-2 border-ink/80 py-5">
        {/* Marquee track is aria-hidden; give AT the same list. */}
        <p className="sr-only">{VALIDATION_WORDS.join(", ")}</p>
        <Marquee
          tone="light"
          items={VALIDATION_WORDS.map((w) => (
            <span
              key={w}
              className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl"
            >
              {w}
            </span>
          ))}
        />
      </Reveal>

      <SceneBody className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="t-label text-ink/70">Partners &amp; recognition</p>
          <button
            onClick={() => open("news")}
            className="t-label inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-ink transition-colors hover:text-teal-ink"
          >
            Read the coverage <ArrowUpRight size={16} />
          </button>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} as="li" delay={i * 0.05}>
              <div className="flex h-24 items-center justify-center bg-cream p-4">
                <Image
                  src={p.src}
                  alt={`${p.name} logo`}
                  width={140}
                  height={56}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </SceneBody>
    </Scene>
  );
}
