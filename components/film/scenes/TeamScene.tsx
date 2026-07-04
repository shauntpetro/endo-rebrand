"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Scene, { SceneBody } from "@/components/film/Scene";
import Reveal from "@/components/site/Reveal";
import FilmCTA from "@/components/film/FilmCTA";
import { useOverlay } from "@/components/film/overlay";
import { TEAM } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TeamScene() {
  const reduced = useReducedMotion();
  const { open } = useOverlay();
  const founder = TEAM[0];
  const rest = TEAM.slice(1, 7);

  return (
    <Scene id="team-scene" tone="cream-2" aria-label="Team">
      {/* Bauhaus geometry */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-none absolute -left-[10vmin] top-[8%] h-[36vmin] w-[36vmin] shape-dot bg-gold"
      />
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="pointer-events-none absolute right-0 top-[14%] h-3 w-[30vw] origin-right bg-teal"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] right-[8%] h-[10vmin] w-[10vmin] shape-dot bg-teal"
      />

      <SceneBody>
        <p className="t-label text-teal-ink">§ Team</p>
        <Reveal className="mt-6">
          <h2 className="t-h1 max-w-[14ch] uppercase text-ink">
            The people <span className="text-gold-ink">behind</span> the platform.
          </h2>
        </Reveal>

        {/* Founder feature */}
        <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <div className="relative max-w-sm">
              {/* offset color block behind the portrait */}
              <div aria-hidden className="pointer-events-none absolute -left-4 -top-4 h-full w-full bg-plum" />
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={founder.image}
                  alt={`Portrait of ${founder.name}, ${founder.role} of EndoCyclic Therapeutics`}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden className="pointer-events-none absolute -bottom-5 -right-5 h-14 w-14 shape-dot bg-gold" />
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h3 className="t-h3 uppercase text-ink">{founder.name}</h3>
              <p className="t-label mt-2 text-gold-ink">{founder.role}</p>
            </Reveal>
            {founder.quote && (
              <Reveal delay={0.1}>
                <blockquote className="mt-8 border-l-8 border-gold pl-6">
                  <p className="font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <p className="t-body mt-6 max-w-xl text-ink-muted">
                Named City of Los Angeles Entrepreneur in Residence and a Biocom California Life
                Science Catalyst Award winner, she has led EndoCyclic from discovery through FDA
                IND clearance.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <FilmCTA overlay="team" variant="solid">Meet the full team</FilmCTA>
            </Reveal>
          </div>
        </div>

        {/* The rest of the team — a glimpse */}
        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-20 lg:grid-cols-6" role="list">
          {rest.map((m, i) => (
            <Reveal as="li" key={m.id} delay={0.05 * i}>
              <button
                type="button"
                onClick={() => open("team", m.id)}
                aria-label={`${m.name}, ${m.role} — open full team`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[3/4] w-full overflow-hidden bg-cream">
                  <Image
                    src={m.image}
                    alt={`Portrait of ${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 block h-1.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
                <span className="mt-3 block font-display text-sm font-bold leading-snug text-ink">
                  {m.name}
                </span>
                <span className="t-label mt-1 block text-ink-muted">{m.role}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </SceneBody>
    </Scene>
  );
}
