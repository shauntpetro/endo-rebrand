"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ScanLine, Ban, Sparkles } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { useOverlay } from "@/components/film/overlay";
import { PIPELINE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const femluna = PIPELINE.find((c) => c.id === "FemLUNA")!;
const endo311 = PIPELINE.find((c) => c.id === "ENDO-311")!;

/* Attribute chips — designed-for qualifiers, no efficacy claims. */
const FEMLUNA_ATTRS = [
  "Non-invasive",
  "Radiation-free",
  "Non-hormonal",
  "Heavy-metal-free",
  "Sub-millimeter lesions",
  "Standard + low-field imaging",
] as const;

const ENDO311_ATTRS = [
  "Radiation-free",
  "Non-hormonal",
  "Heavy-metal-free",
  "Standard imaging systems",
] as const;

export default function ImagingPanel({ param }: { param?: string }) {
  const { open } = useOverlay();
  const reduced = useReducedMotion();

  return (
    <div data-param={param}>
      {/* ============================= FemLUNA hero (plum block) ============ */}
      <section className="relative overflow-hidden bg-plum text-cream">
        {/* Bauhaus geometry */}
        <motion.div
          aria-hidden
          initial={{ scale: reduced ? 1 : 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="pointer-events-none absolute -right-[10%] -top-[18%] h-[46vmin] w-[46vmin] shape-dot bg-teal"
        />
        <motion.div
          aria-hidden
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="pointer-events-none absolute bottom-0 left-0 h-3 w-[38vw] origin-left bg-gold"
        />

        <div className="container-editorial relative z-10 py-16 md:py-20">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-2.5 bg-gold" />
            <span className="t-label text-gold-soft">Diagnostic · Endometriosis</span>
            <span aria-hidden className="opacity-40">/</span>
            <span className="t-label text-muted-on-dark">{femluna.stage}</span>
          </div>

          <h2 className="t-display mt-6 uppercase text-cream">
            FemLUNA<span className="align-top text-[0.4em] text-gold-soft">™</span>
          </h2>

          <p className="t-lead mt-8 max-w-3xl text-muted-on-dark">
            {femluna.summary}
          </p>

          {/* attribute chips */}
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {FEMLUNA_ATTRS.map((a) => (
              <li
                key={a}
                className="t-label border border-line-on-dark px-3.5 py-2 text-cream"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================= What it sees (cream) ================= */}
      <section className="bg-cream text-ink">
        <div className="container-editorial py-16 md:py-20">
          <p className="t-label text-gold-ink">§ What it is designed to see</p>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {femluna.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.08} className="border-t-2 border-ink pt-5">
                <span aria-hidden className="t-num block text-3xl text-gold-ink">
                  0{i + 1}
                </span>
                <p className="t-body mt-3 text-ink-soft">{h}</p>
              </Reveal>
            ))}
          </div>

          <p className="t-body mt-12 max-w-3xl text-ink-muted">
            Developed as a non-invasive alternative to laparoscopy, today&rsquo;s diagnostic gold
            standard — designed to detect superficial and sub-millimeter lesions often missed by
            current imaging, and intended for sensitive populations including adolescents and
            reproductive-age women.
          </p>
        </div>
      </section>

      {/* ============================= Before / after (ink block) ========== */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <span
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[10%] hidden h-16 w-16 shape-dot bg-teal opacity-80 md:block"
        />
        <div className="container-editorial py-16 md:py-20">
          <div className="flex items-center gap-3">
            <ScanLine size={18} className="text-gold-soft" aria-hidden />
            <span className="t-label text-gold-soft">Illustrative comparison</span>
          </div>
          <h3 className="t-h2 mt-5 max-w-[18ch] uppercase text-cream">
            The lesions standard imaging can <span className="mark-teal">miss.</span>
          </h3>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal className="group">
              <div className="relative overflow-hidden border-2 border-line-on-dark">
                <Image
                  src="/standard-mri.webp"
                  alt="Standard MRI scan of the pelvis, an illustrative example in which small endometriosis lesions are not clearly distinguishable."
                  width={1024}
                  height={559}
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="h-auto w-full"
                />
                <span className="t-label absolute left-0 top-0 bg-ink px-3 py-2 text-cream">
                  Standard MRI
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="group">
              <div className="relative overflow-hidden border-2 border-gold">
                <Image
                  src="/FemLUNA-enhanced.webp"
                  alt="FemLUNA-enhanced illustrative rendering of the same pelvic region, in which targeted imaging highlights candidate lesion sites for concept demonstration."
                  width={1024}
                  height={565}
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="h-auto w-full"
                />
                <span className="t-label absolute left-0 top-0 bg-gold px-3 py-2 text-ink">
                  FemLUNA-enhanced (illustrative)
                </span>
              </div>
            </Reveal>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-on-dark">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-gold-soft" aria-hidden />
            Illustrative comparison for concept demonstration only — not clinical study data.
          </p>
        </div>
      </section>

      {/* ============================= ENDO-311 (teal block) =============== */}
      <section className="relative overflow-hidden bg-teal text-cream">
        <motion.div
          aria-hidden
          initial={{ scale: reduced ? 1 : 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-none absolute -bottom-[20%] -right-[8%] h-[40vmin] w-[40vmin] shape-dot bg-plum"
        />
        <div className="container-editorial relative z-10 py-16 md:py-20">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-2.5 bg-gold" />
            <span className="t-label text-cream">Diagnostic · Oncology</span>
            <span aria-hidden className="opacity-50">/</span>
            <span className="t-label text-cream/80">{endo311.stage}</span>
          </div>

          <h3 className="t-h1 mt-6 uppercase text-cream">ENDO-311</h3>
          <p className="t-lead mt-6 max-w-2xl text-cream/90">{endo311.summary}</p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {ENDO311_ATTRS.map((a) => (
              <li key={a} className="t-label border border-cream/30 px-3.5 py-2 text-cream">
                {a}
              </li>
            ))}
          </ul>

          <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-3">
            {endo311.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-t border-cream/25 pt-4">
                <Ban size={16} className="mt-1 shrink-0 rotate-45 text-gold-soft" aria-hidden />
                <span className="t-body text-cream/90">{h}</span>
              </li>
            ))}
          </ul>

          {/* cross-link to pipeline */}
          <button
            onClick={() => open("pipeline", "ENDO-995")}
            className={clsx(
              "t-label mt-12 inline-flex items-center gap-2 bg-gold px-6 py-3 text-ink transition-colors hover:bg-cream",
            )}
          >
            See the ENDO-995 pairing in the pipeline <ArrowUpRight size={16} aria-hidden />
          </button>
        </div>
      </section>
    </div>
  );
}
