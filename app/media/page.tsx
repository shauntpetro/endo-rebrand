import Image from "next/image";
import { Download } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

/* Key facts (traceable to truth.md) */
const KEY_FACTS = [
  { k: "Founded", v: "Irvine, California" },
  { k: "Stage", v: "Clinical-stage precision medicine · FDA IND Allowance (2026)" },
  {
    k: "Platform",
    v: "Precision peptide platform with pH-mediated activation, selective uptake by diseased tissue, non-hormonal — spanning therapeutics, diagnostics, and oncology.",
  },
  {
    k: "Pipeline",
    v: "Four candidates: ENDO-205 (lead therapeutic), FemLUNA™ (lead diagnostic), ENDO-995 and ENDO-311 (oncology).",
  },
  { k: "Impact", v: "Endometriosis affects 190M+ women worldwide, with a $200B annual US burden." },
  {
    k: "Recognition",
    v: "NIH perfect “10” score, White House recognition, and founding member of the Milken Institute Women’s Health Network.",
  },
];

/* Logo assets */
const LOGOS = [
  { name: "Primary Logo", src: "/logo.avif", file: "endocyclic-logo.avif" },
  { name: "Challenge Logo", src: "/challenge-logo.svg", file: "endocyclic-challenge-logo.svg" },
];

export default function MediaPage() {
  return (
    <main id="main-content">
      {/* -------------------------------------------------------------- Hero */}
      <Section tone="paper" className="pt-32 md:pt-40" rhythm={false}>
        <Container>
          <div className="max-w-3xl reveal pb-16 md:pb-24">
            <Eyebrow>Press resources</Eyebrow>
            <h1 className="t-hero mt-6 text-ink">Media kit.</h1>
            <p className="t-lead mt-6 max-w-2xl">
              Everything the press needs to tell our story accurately — company boilerplate,
              key facts, logos, and how to reach us.
            </p>
          </div>
          <div className="h-px w-full bg-line" />
        </Container>
      </Section>

      {/* ------------------------------------------------------- Boilerplate */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <Eyebrow>Boilerplate</Eyebrow>
              <h2 className="t-h2 mt-4 text-ink">About the company</h2>
              <p className="mt-4 text-sm text-muted">Boilerplate for press use.</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
              <p className="t-body text-ink-body">
                EndoCyclic Therapeutics, Inc. is a clinical-stage precision medicine company based in
                Irvine, California, founded by Dr. Tanya Petrossian, PhD. The company is built on a
                proprietary precision peptide platform with pH-mediated activation and selective
                uptake by diseased tissue — a non-hormonal approach designed to act only where disease
                lives. Its lead therapeutic, ENDO-205, is a first-in-class non-hormonal treatment for
                endometriosis that has received FDA IND Allowance and is now in Phase 1. Its lead
                diagnostic, FemLUNA™, is designed to be the first non-invasive, definitive diagnostic
                for endometriosis — a disease that affects more than 190 million women worldwide,
                carries a $200 billion annual economic burden in the United States, and takes an
                average of eight years to diagnose. The platform spans therapeutics, diagnostics, and
                oncology.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Key facts */}
      <Section tone="tint-teal">
        <Container>
          <Reveal>
            <Eyebrow>At a glance</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">Key facts</h2>
          </Reveal>
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {KEY_FACTS.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:gap-6">
                  <dt className="text-sm font-medium text-teal-ink md:col-span-3">{f.k}</dt>
                  <dd className="t-body text-ink-body md:col-span-8 md:col-start-5">{f.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Logo downloads */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <Eyebrow>Brand assets</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">Logo downloads</h2>
            <p className="t-body mt-4 max-w-xl text-muted">
              Please use the official marks without alteration. Maintain clear space and do not
              recolor, stretch, or add effects.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LOGOS.map((logo, i) => (
              <Reveal key={logo.name} delay={i * 0.08}>
                <div className="rounded-2xl border border-line bg-surface p-4">
                  <div className="relative flex h-48 items-center justify-center rounded-xl bg-tint-warm p-8">
                    <Image
                      src={logo.src}
                      alt={`EndoCyclic Therapeutics ${logo.name}`}
                      fill
                      sizes="(min-width: 640px) 40vw, 90vw"
                      className="object-contain p-8"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-ink">{logo.name}</span>
                    <a
                      href={logo.src}
                      download={logo.file}
                      aria-label={`Download EndoCyclic ${logo.name}`}
                      className="group inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-teal-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink"
                    >
                      <span className="link-underline">Download</span>
                      <Download size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Leadership */}
      <Section tone="tint-warm">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="t-h2 mt-4 text-ink">Dr. Tanya Petrossian</h2>
              <p className="mt-2 text-sm font-medium text-teal-ink">Founder &amp; CEO</p>
              <p className="t-body mt-5 text-muted">
                A biochemist and entrepreneur, Dr. Petrossian founded EndoCyclic Therapeutics and has
                led it from discovery through FDA IND clearance. She is a founding member of the
                Milken Institute Women’s Health Network.
              </p>
              <div className="mt-8">
                <Button href="/team" variant="quiet">Meet the full team</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src="/team/tanya-petrossian.avif"
                  alt="Portrait of Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics"
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Media contact */}
      <Section tone="plum">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="dark">Media contact</Eyebrow>
              <h2 className="t-h2 mt-4 text-on-dark">For press inquiries.</h2>
              <p className="mt-5 max-w-xl text-muted-on-dark">
                Journalists and media partners — reach our team directly and we’ll follow up
                promptly.
              </p>
              <div className="mt-8">
                <Button href={`mailto:${SITE.email}`} variant="ghost-on-dark" external>
                  {SITE.email}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
