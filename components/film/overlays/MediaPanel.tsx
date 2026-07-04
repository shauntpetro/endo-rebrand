"use client";

import Image from "next/image";
import { Download, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

/* Key facts — every value traces to truth.md / lib/site. */
const FACTS: { k: string; v: string }[] = [
  { k: "Founded", v: "Irvine, California" },
  { k: "Stage", v: "Clinical-stage · FDA IND Allowance (2026)" },
  { k: "Platform", v: "Precision peptide platform · pH-mediated activation · non-hormonal" },
  { k: "Pipeline", v: "4 candidates across endometriosis and oncology" },
  { k: "Impact", v: "190M+ women affected worldwide" },
  { k: "Recognition", v: "NIH perfect “10” · White House recognition · Milken founding member" },
];

/* Logo assets shipped in /public. */
const LOGOS: { src: string; label: string; note: string; alt: string; download: string }[] = [
  {
    src: "/logo.avif",
    label: "Primary Logo",
    note: "AVIF",
    alt: "EndoCyclic Therapeutics primary wordmark logo",
    download: "Download the EndoCyclic primary logo",
  },
  {
    src: "/challenge-logo.svg",
    label: "Challenge Logo",
    note: "SVG",
    alt: "EndoCyclic Therapeutics challenge logo mark",
    download: "Download the EndoCyclic challenge logo",
  },
];

export default function MediaPanel({ param }: { param?: string }) {
  return (
    <div className="relative overflow-hidden" data-param={param}>
      {/* Bauhaus geometry */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 shape-dot bg-gold/25" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-[42%] h-2 w-40 bg-teal" />

      <div className="container-editorial relative z-10 py-14 md:py-20">
        {/* Masthead */}
        <Reveal>
          <p className="t-label flex items-center gap-2 text-teal-ink">
            <span aria-hidden className="h-2.5 w-2.5 bg-teal" />
            Media kit
          </p>
          <h2 className="t-h1 mt-5 uppercase text-ink">
            Press &amp; <span className="text-gold-ink">assets.</span>
          </h2>
          <p className="t-lead mt-5 max-w-[46ch] text-ink-muted">
            Approved boilerplate, key facts, and downloadable logos for {SITE.name}.
          </p>
        </Reveal>

        {/* Boilerplate — plum block */}
        <Reveal delay={0.05} className="mt-12">
          <section aria-label="Company boilerplate" className="relative overflow-hidden bg-plum p-8 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 shape-dot bg-gold/20" />
            <p className="t-label relative z-10 flex items-center gap-2 text-gold-soft">
              <span aria-hidden className="h-2 w-2 bg-gold" />
              Boilerplate for press use
            </p>
            <p className="relative z-10 mt-6 max-w-[62ch] text-lg leading-relaxed text-paper-on-dark md:text-xl">
              {SITE.legalName} is a clinical-stage precision medicine company based in {SITE.location},
              founded by {SITE.founder}. Its proprietary precision peptide platform uses pH-mediated
              activation for selective uptake by diseased tissue — a non-hormonal mechanism designed to
              act only where disease lives, avoiding hormones, surgery, and systemic toxicity. The lead
              therapeutic, ENDO-205, is a first-in-class, non-hormonal, short-course, disease-modifying
              peptide for endometriosis that has received FDA IND Allowance and is now in a
              first-in-human Phase 1 study. The lead diagnostic, FemLUNA™, is the first non-invasive,
              definitive diagnostic for endometriosis. Endometriosis affects more than 190 million women
              worldwide, carries a $200 billion annual economic burden in the U.S., and takes an average
              of 8 years to diagnose. The EndoCyclic platform spans therapeutics, diagnostics, and
              oncology.
            </p>
          </section>
        </Reveal>

        {/* Key facts */}
        <Reveal delay={0.05} className="mt-14">
          <h3 className="t-h3 uppercase text-ink">
            <span className="mark-gold">Key facts</span>
          </h3>
        </Reveal>
        <ul className="mt-6 grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2">
          {FACTS.map((f, i) => (
            <Reveal as="li" key={f.k} delay={0.04 * i} className="bg-cream-2 p-6">
              <span className="t-label text-teal-ink">{f.k}</span>
              <p className="t-h3 mt-2 text-ink">{f.v}</p>
            </Reveal>
          ))}
        </ul>

        {/* Logo downloads */}
        <Reveal delay={0.05} className="mt-14">
          <h3 className="t-h3 uppercase text-ink">
            Logo <span className="text-teal-ink">downloads.</span>
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {LOGOS.map((logo, i) => (
            <Reveal key={logo.src} delay={0.05 * i}>
              <figure className="flex h-full flex-col border-2 border-ink">
                <div className="relative flex h-44 items-center justify-center bg-bone p-8">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 520px"
                    className="object-contain p-8"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t-2 border-ink bg-cream px-5 py-4">
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg font-bold text-ink">
                      {logo.label}
                    </span>
                    <span className="t-label text-ink-muted">{logo.note}</span>
                  </span>
                  <a
                    href={logo.src}
                    download
                    aria-label={logo.download}
                    className="group inline-flex shrink-0 items-center gap-2 bg-ink px-5 py-3 t-label text-paper-on-dark transition-colors hover:bg-gold hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Download size={15} strokeWidth={2.5} aria-hidden />
                    Download
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Media contact — gold block */}
        <Reveal delay={0.05} className="mt-14">
          <section
            aria-label="Media contact"
            className="relative flex flex-col gap-6 overflow-hidden bg-gold p-8 sm:flex-row sm:items-center sm:justify-between md:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 shape-dot bg-ink/10" />
            <div className="relative z-10">
              <p className="t-label text-gold-deep">Media contact</p>
              <p className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
                Press &amp; interview requests
              </p>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="group relative z-10 inline-flex shrink-0 items-center gap-2.5 bg-ink px-8 py-4 t-label text-paper-on-dark transition-colors hover:bg-cream hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {SITE.email}
              <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
