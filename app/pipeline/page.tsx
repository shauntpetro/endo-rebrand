import Image from "next/image";
import Button from "@/components/site/Button";
import ChapterIntro from "@/components/site/ChapterIntro";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import NextChapter from "@/components/site/NextChapter";
import PipelineChapterNav from "@/components/site/PipelineChapterNav";
import {
  PipelineAtlasMotion,
  PipelineScaleFade,
  PipelineThesis,
} from "@/components/site/PipelineMotion";
import Reveal from "@/components/site/Reveal";
import SciencePlate from "@/components/site/SciencePlate";
import Section from "@/components/site/Section";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import { PIPELINE } from "@/lib/site";

const FEMLUNA = PIPELINE[1];
const ENDO_995 = PIPELINE[2];
const ENDO_311 = PIPELINE[3];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper pb-16 pt-28 md:pb-20 md:pt-32">
      <svg
        aria-hidden
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="pipeline-hero-thread pointer-events-none absolute inset-x-0 top-20 h-72 w-full opacity-25"
      >
        <path
          d="M-80 328C165 360 262 190 476 244c192 48 280-126 441-42 133 70 203 15 363-111"
          fill="none"
          stroke="url(#pipeline-hero-thread)"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="pipeline-hero-thread" x1="0" x2="1">
            <stop stopColor="#c9798a" />
            <stop offset="0.5" stopColor="#d8b850" />
            <stop offset="1" stopColor="#43877d" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="hero-copy-enter lg:col-span-6 xl:col-span-5">
            <div data-hero-step="eyebrow">
              <Eyebrow>Development portfolio</Eyebrow>
            </div>
            <h1
              data-hero-step="title"
              className="mt-6 max-w-2xl text-[clamp(2.45rem,5vw,4.5rem)] font-medium leading-[1.01] tracking-[-0.045em] text-ink"
            >
              One precision platform. Four programs.
            </h1>
            <p data-hero-step="intro" className="t-lead mt-7 max-w-xl">
              EndoCyclic is advancing therapeutic and diagnostic programs
              across endometriosis and oncology, led by ENDO-205 now in Phase
              1.
            </p>
            <div data-hero-step="actions" className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?subject=partnership">
                Discuss a partnership
              </Button>
              <Button href="#development" variant="ghost">
                View development stages
              </Button>
            </div>
          </div>

          <Reveal delay={0.06} className="lg:col-span-6 xl:col-span-7">
            <figure>
              <div className="hero-visual-frame relative aspect-[2/1] overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-tint-warm md:rounded-bl-[3rem] md:rounded-tr-[6rem]">
                <Image
                  src="/illustrations/pipeline-portfolio-wide-v1.avif"
                  alt="Conceptual editorial illustration of one precision peptide platform branching toward four therapeutic and diagnostic program paths."
                  fill
                  priority
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 94vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-paper/5"
                />
                <p className="absolute inset-x-0 bottom-0 max-w-md p-5 text-sm font-medium leading-relaxed text-on-dark sm:p-7">
                  A common logic of pH-mediated activation and selective uptake.
                </p>
              </div>
              <figcaption className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
                Conceptual portfolio architecture; not clinical imagery or
                development-performance data.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-10 md:mt-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line lg:grid-cols-4">
            {PIPELINE.map((candidate, index) => (
              <a
                key={candidate.id}
                href={
                  candidate.area === "Oncology"
                    ? "#oncology"
                    : `#${candidate.id.toLowerCase()}`
                }
                className="group flex min-h-40 flex-col bg-paper px-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal-ink sm:px-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold tracking-[0.16em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${
                      candidate.area === "Endometriosis"
                        ? "text-rose-ink"
                        : "text-teal-ink"
                    }`}
                  >
                    {candidate.area}
                  </span>
                </div>
                <p className="mt-5 text-lg font-medium leading-tight text-ink">
                  {candidate.name}
                </p>
                <p className="mt-1 text-xs font-medium text-muted">
                  {candidate.modality}
                </p>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3">
                  <p className="text-xs font-medium leading-snug text-ink-body">
                    {candidate.stage}
                  </p>
                  <span
                    aria-hidden
                    className="shrink-0 text-base text-teal-ink transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function DevelopmentOverview() {
  return (
    <Section
      tone="tint-plum"
      size="chapter"
      className="overflow-hidden"
    >
      <Container id="development" className="scroll-mt-32">
        <ChapterIntro
          eyebrow="Current development"
          title="The lead program has crossed into the clinic."
        >
          ENDO-205 is in Phase 1 following FDA IND Allowance in 2026. FemLUNA™ is IND-enabling, with two paired oncology programs in preclinical development.
        </ChapterIntro>

        <Reveal className="mt-14 md:mt-16">
          <PipelineAtlasMotion>
            <PipelineStageAtlas />
          </PipelineAtlasMotion>
        </Reveal>
      </Container>
    </Section>
  );
}

function PlatformThesis() {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-plum py-24 text-on-dark md:py-36">
      <div
        aria-hidden
        className="absolute -right-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-line-on-dark"
      />
      <Container className="relative">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-12 bg-gradient-to-r from-rose via-gold to-teal" />
          <Eyebrow tone="dark">The selective thread</Eyebrow>
        </div>
        <PipelineThesis className="mt-8 max-w-5xl text-[clamp(2rem,4vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.035em] text-on-dark">
          A single precision peptide platform extends into therapeutics and diagnostics across endometriosis and oncology.
        </PipelineThesis>
      </Container>
    </section>
  );
}

function LeadProgram() {
  const dossier = [
    {
      label: "Current status",
      value: "FDA IND Allowance (2026) · Phase 1",
    },
    {
      label: "First-in-human study",
      value: "Healthy pre-menopausal women of reproductive age",
    },
    {
      label: "Treatment design",
      value: "Short-course, disease-modifying, and non-hormonal",
    },
    {
      label: "Preclinical evidence",
      value:
        "Demonstrated elimination of lesions and associated inflammation; no dose-limiting toxicities in GLP toxicology studies.",
    },
  ] as const;

  return (
    <Section
      tone="tint-teal"
      size="chapter"
      className="overflow-hidden"
    >
      <Container id="endo-205" className="scroll-mt-32">
        <ChapterIntro
          eyebrow="Clinical lead · ENDO-205"
          title="A non-hormonal approach now in Phase 1."
        >
          ENDO-205 is a first-in-class precision peptide therapeutic designed to eliminate endometriosis lesions and resolve associated symptoms, including pain.
        </ChapterIntro>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <PipelineScaleFade className="lg:col-span-7">
            <SciencePlate
              src="/illustrations/endo-205-translation-v1.avif"
              alt="Conceptual editorial illustration of a precision peptide activating at an endometriosis lesion boundary and undergoing selective uptake."
              aspect="landscape"
              frame="bleed"
              sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
              imageClassName="object-center"
              caption="ENDO-205 applies the platform's pH-mediated activation and selective-uptake logic to a non-hormonal endometriosis therapeutic."
              disclosure="Conceptual representation; not clinical imagery or efficacy data."
            />
          </PipelineScaleFade>

          <Reveal delay={0.06} className="lg:col-span-5">
            <p className="eyebrow">Clinical dossier</p>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {dossier.map((item) => (
                <div key={item.label} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] lg:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium leading-relaxed text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <Button href="/innovation" variant="quiet">
                Review the platform mechanism
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function EndometriosisImaging() {
  const diagnosticProfile = [
    ["Stage", FEMLUNA.stage],
    ["Detection", "Superficial and sub-millimeter lesions"],
    ["Clinical intent", "A non-invasive alternative to laparoscopy"],
  ] as const;

  return (
    <Section
      tone="tint-warm"
      size="chapter"
      className="overflow-hidden"
    >
      <Container id="femluna" className="scroll-mt-32">
        <ChapterIntro
          eyebrow="Endometriosis imaging · FemLUNA™"
          title="Designed to find lesions current imaging can miss."
        >
          FemLUNA™ is a targeted imaging agent in IND-enabling development for accurate, non-invasive detection of endometriosis.
        </ChapterIntro>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <PipelineScaleFade className="lg:col-span-7">
            <SciencePlate
              src="/illustrations/femluna-targeting-v2.avif"
              alt="Conceptual editorial illustration of a targeted peptide localizing at a small endometriosis lesion within simplified pelvic anatomy."
              aspect="landscape"
              frame="soft"
              sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
              imageClassName="object-[58%_center]"
              caption="FemLUNA™ is capable of detecting superficial and sub-millimeter lesions often missed by current imaging."
              disclosure="Conceptual representation; FemLUNA™ is IND-enabling. Not clinical imaging or performance data."
            />
          </PipelineScaleFade>

          <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
            <p className="t-lead">
              The first non-invasive, definitive diagnostic for endometriosis in development as an alternative to the current diagnostic gold standard of laparoscopy.
            </p>
            <dl className="mt-8 border-y border-line">
              {diagnosticProfile.map(([label, value]) => (
                <div key={label} className="border-b border-line py-5 last:border-b-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <Button href="/imaging" variant="ghost">
                Explore the imaging strategy
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function OncologyPairFigure() {
  return (
    <>
      <figure className="sm:hidden">
        <div className="space-y-5">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">ENDO-311</p>
              <p className="text-xs font-medium text-muted">Targeted localization</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-bl-[1.75rem] rounded-tr-[1.75rem] border border-line bg-surface">
              <Image
                src="/illustrations/oncology-pair-v2.avif"
                alt="Conceptual illustration of a targeted imaging agent localizing a solid-tumor cluster."
                fill
                sizes="94vw"
                className="object-cover object-left"
              />
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">ENDO-995</p>
              <p className="text-xs font-medium text-muted">Intracellular target</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-bl-[1.75rem] rounded-tr-[1.75rem] border border-line bg-surface">
              <Image
                src="/illustrations/oncology-pair-v2.avif"
                alt="Conceptual illustration of a cyclic peptide undergoing uptake into a tumor cell toward an intracellular target."
                fill
                sizes="94vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>
        <figcaption className="mt-4 text-xs leading-relaxed text-muted">
          Conceptual representation of investigational preclinical programs; not efficacy or imaging-performance data.
        </figcaption>
      </figure>

      <div className="hidden sm:block">
        <SciencePlate
          src="/illustrations/oncology-pair-v2.avif"
          alt="Conceptual paired illustration of a targeted imaging agent localizing a solid tumor and a cyclic peptide undergoing uptake into a tumor cell toward an intracellular target."
          frame="line"
          caption="ENDO-311 is designed for tumor localization and monitoring; ENDO-995 is designed to reach previously undruggable intracellular targets."
          disclosure="Conceptual representation of investigational preclinical programs; not efficacy or imaging-performance data."
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-2 gap-4 p-7 md:p-9">
            <div className="border-l border-rose/50 pl-3">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">ENDO-311</span>
              <strong className="mt-1 block text-sm font-semibold text-ink md:text-base">Targeted localization</strong>
            </div>
            <div className="justify-self-end border-r border-teal/50 pr-3 text-right">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">ENDO-995</span>
              <strong className="mt-1 block text-sm font-semibold text-ink md:text-base">Intracellular target</strong>
            </div>
          </div>
        </SciencePlate>
      </div>
    </>
  );
}

function OncologyPair() {
  const programs = [
    {
      program: ENDO_311,
      label: "Diagnostic",
      body: "An investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors, initially focused on colon cancer. It is radiation-free, non-hormonal, free of heavy metals, and compatible with standard imaging systems.",
      note: "Designed for early-stage tumor localization and disease monitoring.",
    },
    {
      program: ENDO_995,
      label: "Therapeutic",
      body: "A tumor-selective, non-hormonal cyclic peptide for malignant solid tumors, initially focused on colon and endometrial cancers. It is designed to overcome therapeutic resistance and restore responsiveness in cold tumors.",
      note: "Potential applicability across 25%+ of solid tumor types.",
    },
  ] as const;

  return (
    <Section
      tone="paper"
      size="chapter"
      className="overflow-hidden"
    >
      <Container id="oncology" className="scroll-mt-32">
        <ChapterIntro
          eyebrow="Oncology · Preclinical"
          title="Detection and treatment designed as a matched pair."
        >
          ENDO-995 and ENDO-311 extend the platform into malignant solid tumors through a therapeutic and companion-diagnostic strategy.
        </ChapterIntro>

        <PipelineScaleFade className="mt-14 md:mt-16">
          <OncologyPairFigure />
        </PipelineScaleFade>

        <div className="mt-12 grid-flow-dense border-y border-line md:grid md:grid-cols-12">
          {programs.map(({ program, label, body, note }, index) => (
            <Reveal
              key={program.id}
              delay={index * 0.06}
              className={index === 0 ? "py-8 md:col-span-5 md:pr-10" : "border-t border-line py-8 md:col-span-7 md:border-l md:border-t-0 md:pl-10"}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">{label}</p>
                <span className="text-xs font-medium text-muted">{program.stage}</span>
              </div>
              <h3 className="mt-6 text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.045em] text-ink">
                {program.name}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted">{body}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink">{note}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DiligenceSignals() {
  const signals = [
    {
      type: "Regulatory",
      value: "2026",
      title: "FDA IND Allowance",
      body: "Achieved for lead therapeutic ENDO-205.",
    },
    {
      type: "Clinical",
      value: "Phase 1",
      title: "First-in-human study",
      body: "ENDO-205 is now in Phase 1.",
    },
    {
      type: "External validation",
      value: "10",
      title: "NIH perfect “unicorn” score",
      body: "NIH Commercialization Readiness Pilot grant.",
    },
    {
      type: "Regulatory path",
      value: "Underway",
      title: "Fast Track filing",
      body: "Filing underway for the lead program.",
    },
  ] as const;

  return (
    <Section tone="tint-plum" size="chapter">
      <Container id="evidence" className="scroll-mt-32">
        <ChapterIntro
          eyebrow="Diligence signals"
          title="Evidence at the transitions that matter."
        >
          Regulatory progress, clinical entry, and NIH backing mark the portfolio&apos;s path from platform science toward clinical-stage development.
        </ChapterIntro>

        <div className="mt-14 grid-flow-dense border-y border-line sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, index) => (
            <Reveal
              key={signal.title}
              delay={index * 0.04}
              className="border-b border-line py-7 last:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0 lg:border-b-0 first:sm:pl-0 last:sm:pr-0"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rose-ink">{signal.type}</p>
              <p className="mt-7 text-[clamp(1.8rem,3.2vw,3.1rem)] font-medium leading-none tracking-[-0.04em] text-ink">{signal.value}</p>
              <h3 className="t-h3 mt-5 text-ink">{signal.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{signal.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/downloads/endocyclic-investor-summary.pdf" variant="ghost">
            Download investor summary
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default function PipelinePage() {
  return (
    <main id="main-content">
      <Hero />
      <PipelineChapterNav />
      <DevelopmentOverview />
      <PlatformThesis />
      <LeadProgram />
      <EndometriosisImaging />
      <OncologyPair />
      <DiligenceSignals />
      <NextChapter
        eyebrow="Partnership and diligence"
        title="Open the next diligence conversation."
        tone="plum"
        actions={
          <>
            <Button href="/contact?subject=partnership">Discuss a partnership</Button>
            <Button href="/investors" variant="ghost-on-dark">
              Investor overview
            </Button>
          </>
        }
      >
        Connect with EndoCyclic about the clinical-stage lead program, strategic partnerships, or the broader development portfolio.
      </NextChapter>
    </main>
  );
}
