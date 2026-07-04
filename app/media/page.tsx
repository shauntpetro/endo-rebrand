"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import MagneticButton from "@/components/site/MagneticButton";
import { SITE } from "@/lib/site";

/* --------------------------------------------------------------- data */

const KEY_FACTS = [
  {
    label: "Founded",
    value: "Irvine, California",
    detail: "Clinical-stage precision medicine company founded by Dr. Tanya Petrossian, PhD.",
  },
  {
    label: "Stage",
    value: "Clinical-stage · FDA IND Allowance (2026)",
    detail: "IND Allowance achieved in 2026 for lead therapeutic ENDO-205.",
  },
  {
    label: "Platform",
    value: "Precision peptide platform",
    detail: "Proprietary precision peptide platform with pH-mediated activation.",
  },
  {
    label: "Pipeline",
    value: "Four candidates",
    detail: "ENDO-205 (Phase 1), FemLUNA™ (IND-enabling), ENDO-995, ENDO-311.",
  },
  {
    label: "Impact",
    value: "190M+ women affected",
    detail: "Endometriosis affects roughly 1 in 10 women of reproductive age, worldwide.",
  },
  {
    label: "Recognition",
    value: "NIH perfect “10” score",
    detail: "White House recognition and Milken Institute Women’s Health Network founding member.",
  },
];

const LOGOS = [
  { src: "/logo.avif", filename: "logo.avif", label: "Primary Logo" },
  { src: "/challenge-logo.svg", filename: "challenge-logo.svg", label: "Challenge Logo" },
];

/* --------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[38%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        press
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <Eyebrow>Press resources</Eyebrow>
        </Reveal>

        <h1 className="t-display mt-8 text-ink md:mt-10">
          <SplitText
            lines={[[{ text: "Media" }], [{ text: "kit.", accent: true, italic: true }]]}
            accentClass="text-gold-ink"
          />
        </h1>

        <div className="mt-12 grid gap-10 pb-24 md:mt-16 md:grid-cols-12 md:pb-32">
          <Reveal delay={0.4} className="md:col-span-6">
            <p className="t-lead max-w-xl text-ink-soft">
              Everything the press, partners, and stakeholders need to cover
              <span className="text-ink"> EndoCyclic</span> accurately — boilerplate, key facts,
              logos, and leadership.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="self-end md:col-span-4 md:col-start-9">
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#boilerplate" variant="ghost" arrow>
                Boilerplate
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- boilerplate */

function Boilerplate() {
  return (
    <Section id="boilerplate" tone="paper">
      <Container>
        <FolioHeading index="01" label="Company boilerplate" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="t-h1 text-ink">
              For <span className="italic-display text-gold-ink">press use.</span>
            </h2>
            <p className="t-body mt-6 max-w-xs text-ink-muted">
              Approved language. Please quote or condense as needed — every claim traces to our
              public record.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <div className="border-l-2 border-gold pl-8">
              <p className="t-lead text-ink">
                EndoCyclic Therapeutics, Inc. is a clinical-stage precision medicine company
                headquartered in Irvine, California. Founded by Dr. Tanya Petrossian, PhD, the
                company is developing a proprietary precision peptide platform with pH-mediated
                activation, designed to act only in diseased tissue while avoiding hormones,
                surgery, and systemic toxicity.
              </p>
              <p className="t-body mt-6 text-ink-soft">
                Its lead therapeutic, ENDO-205, is a first-in-class, non-hormonal precision peptide
                for endometriosis that has received FDA IND Allowance and is currently in a Phase 1
                clinical study. Its lead diagnostic candidate, FemLUNA™, is designed to be the first
                non-invasive, definitive diagnostic for endometriosis.
              </p>
              <p className="t-body mt-6 text-ink-muted">
                Endometriosis affects more than 190 million women and girls worldwide, with an
                estimated annual economic burden exceeding $200 billion in the United States alone,
                and an average diagnostic delay of eight years. The platform spans therapeutics,
                diagnostics, and oncology.
              </p>
              <p className="t-label mt-10 text-ink-muted">Boilerplate for press use</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------- key facts */

function KeyFacts() {
  return (
    <Section id="facts" tone="paper-sunk">
      <Container>
        <FolioHeading index="02" label="Fact sheet" />
        <div className="mt-12 max-w-2xl">
          <Reveal>
            <h2 className="t-h1 text-ink">
              The essentials, <span className="italic-display text-gold-ink">at a glance.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16">
          {KEY_FACTS.map((f, i) => (
            <Reveal
              as="div"
              key={f.label}
              delay={i * 0.06}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="t-label text-gold-ink md:col-span-3">{f.label}</span>
              <h3 className="font-serif text-2xl leading-tight text-ink md:col-span-5">{f.value}</h3>
              <p className="t-body text-ink-muted md:col-span-4">{f.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- logos */

function Logos() {
  return (
    <Section id="logos" tone="paper">
      <Container>
        <FolioHeading index="03" label="Brand assets" />
        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="t-h1 max-w-xl text-ink">
              Logo <span className="italic-display text-gold-ink">downloads.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body max-w-sm text-ink-muted">
              Official logos for press coverage and publications. Please do not modify or alter the
              marks.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {LOGOS.map((logo, i) => (
            <Reveal as="div" key={logo.filename} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-line bg-paper-raised">
                <div className="relative flex h-56 items-center justify-center bg-paper-sunk p-10">
                  <Image
                    src={logo.src}
                    alt={`EndoCyclic Therapeutics — ${logo.label}`}
                    width={280}
                    height={140}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-line p-6">
                  <div>
                    <p className="font-serif text-lg text-ink">{logo.label}</p>
                    <p className="t-num mt-1 text-sm text-ink-muted">{logo.filename}</p>
                  </div>
                  <a
                    href={logo.src}
                    download={logo.filename}
                    aria-label={`Download ${logo.label} (${logo.filename})`}
                    className="inline-flex items-center gap-2 rounded-full bg-plum-deep px-5 py-3 t-label text-paper-on-dark transition-colors duration-300 hover:bg-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Download size={14} aria-hidden />
                    Download
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------- leadership */

function Leadership() {
  return (
    <Section id="leadership" tone="paper-sunk">
      <Container>
        <FolioHeading index="04" label="Leadership" />
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
              <Image
                src="/team/tanya-petrossian.avif"
                alt="Portrait of Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <Eyebrow>Founder &amp; CEO</Eyebrow>
            <h2 className="t-h1 mt-6 text-ink">Dr. Tanya Petrossian, PhD</h2>
            <p className="t-lead mt-8 max-w-lg text-ink-soft">
              Dr. Petrossian is Founder and CEO of EndoCyclic Therapeutics and a founding member of
              the Milken Institute Women’s Health Network. She leads the company’s development of a
              non-hormonal precision peptide platform spanning
              <span className="text-ink"> therapeutics, diagnostics, and oncology.</span>
            </p>
            <div className="mt-10">
              <Link
                href="/team"
                className="klink t-label inline-flex items-center gap-2 text-gold-ink"
              >
                View full team <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- closing */

function Closing() {
  return (
    <Section tone="abyss" grain>
      <Container>
        <Reveal>
          <p className="t-label text-gold-light">Media contact</p>
        </Reveal>
        <Reveal className="mt-8">
          <h2 className="t-display max-w-5xl text-paper-on-dark">
            Let’s get the story <span className="italic-display text-gold-light">right.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <a
            href={`mailto:${SITE.email}`}
            className="klink t-h3 inline-flex items-center gap-2 text-paper-on-dark"
          >
            {SITE.email}
            <ArrowUpRight size={22} aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/contact?subject=media" variant="primary-on-dark">
            Contact us
          </MagneticButton>
          <MagneticButton href="/news" variant="ghost-on-dark">
            Latest coverage
          </MagneticButton>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function MediaPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Boilerplate />
        <KeyFacts />
        <Logos />
        <Leadership />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
