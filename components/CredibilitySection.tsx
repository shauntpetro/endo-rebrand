"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DotGrid } from "@/components/ui/DotGrid";

interface Recognition {
  name: string;
  label: string;
  src: string;
  width: number;
  height: number;
}

/**
 * Federal science agencies and institutions that have recognized or supported
 * EndoCyclic. Federal entities recognize; UCLA is a genuine research partner.
 * (Sourced from truth.md milestones/validation.)
 */
const recognitions: Recognition[] = [
  { name: "NICHD", label: "Eunice Kennedy Shriver NICHD (NIH)", src: "/NIH_2013_logo_vertical.svg", width: 80, height: 80 },
  { name: "UCLA", label: "University of California, Los Angeles", src: "/University_of_California,_Los_Angeles_logo.svg", width: 110, height: 60 },
  { name: "RADx Tech", label: "NIH RADx Tech", src: "/challenge-logo.svg", width: 130, height: 64 },
  { name: "White House", label: "White House Recognition", src: "/white-house.webp", width: 72, height: 72 },
  { name: "Milken Institute", label: "Milken Institute", src: "/Milken_Institute_logo.svg", width: 140, height: 44 },
  { name: "Biocom California", label: "Biocom California", src: "/biocom_ca_primary_logo.svg", width: 150, height: 44 },
  { name: "Endometriosis Foundation", label: "Endometriosis Foundation of America", src: "/Endofound.webp", width: 130, height: 64 },
];

export default function CredibilitySection() {
  return (
    <section className="relative overflow-hidden bg-surface border-y border-plum-dark/10 py-24 md:py-28">
      <DotGrid />

      {/* Single confident luminous accent — warm gold light above the wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[70vw] -translate-x-1/2 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,169,97,0.14), transparent 70%)" }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="plum" className="reveal-rise inline-block" >
            Validation
          </Eyebrow>
          <h2
            className="reveal-rise mt-5 font-serif font-bold tracking-tight text-plum-dark text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] text-balance"
            style={{ animationDelay: "0.08s" }}
          >
            Recognized <span className="italic text-gold-deep">&amp;</span> supported by
          </h2>
          <p
            className="reveal-rise mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black-soft"
            style={{ animationDelay: "0.16s" }}
          >
            Backed by federal science agencies and leading institutions advancing the future of women&rsquo;s health.
          </p>
        </div>

        {/* Recognition grid — warm, hairline, tasteful */}
        <div className="mt-14 flex flex-wrap justify-center gap-4 md:mt-16">
          {recognitions.map((item, index) => (
            <div
              key={item.name}
              className="reveal-rise group flex w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-4 rounded-2xl border border-plum-dark/10 bg-bone-raised px-6 py-8 transition-colors duration-500 hover:border-gold-primary/40 sm:w-[calc(33.333%-0.75rem)] lg:w-[220px]"
              style={{ animationDelay: `${0.22 + index * 0.07}s` }}
            >
              <div className="flex h-14 w-full items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={item.width}
                  height={item.height}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <span className="block text-center text-[11px] font-sans uppercase tracking-wider leading-snug text-plum-primary/60 transition-colors duration-500 group-hover:text-plum-primary/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
