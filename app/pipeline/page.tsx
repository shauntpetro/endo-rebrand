import Button from "@/components/site/Button";
import ChapterIntro from "@/components/site/ChapterIntro";
import Container from "@/components/site/Container";
import EvidenceNote from "@/components/site/EvidenceNote";
import Eyebrow from "@/components/site/Eyebrow";
import NextChapter from "@/components/site/NextChapter";
import PipelineChapterNav from "@/components/site/PipelineChapterNav";
import {
  PipelineAtlasMotion,
  PipelineThesis,
} from "@/components/site/PipelineMotion";
import Reveal from "@/components/site/Reveal";
import SciencePlate from "@/components/site/SciencePlate";
import Section from "@/components/site/Section";
import OncologyPairMobileComparison from "@/components/figures/OncologyPairMobileComparison";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import PipelineHero from "./PipelineHero";
import {
  ENDO205_MECHANISM_ALT,
  ENDO205_MECHANISM_IMAGE,
  EVIDENCE_LINKS,
  PARTNERSHIP_CONTACT_HREF,
  PIPELINE,
  type EvidenceReference,
} from "@/lib/site";

const FEMLUNA = PIPELINE[1];
const ENDO_995 = PIPELINE[2];
const ENDO_311 = PIPELINE[3];
const FDA_PHASE_ONE_REFERENCE = {
  basis: "company",
  label: "FDA / Phase 1 announcement",
  href: EVIDENCE_LINKS.fdaAnnouncement,
} as const satisfies EvidenceReference;
const NIH_PERFECT_SCORE_REFERENCE = {
  basis: "company",
  label: "NIH grant announcement",
  href: EVIDENCE_LINKS.nihGrantAnnouncement,
} as const satisfies EvidenceReference;
const COMPANY_REPORTED_REFERENCE = {
  basis: "company",
  label: "Company reported",
} as const satisfies EvidenceReference;

function DevelopmentOverview() {
  return (
    <Section
      tone="tint-plum"
      size="chapter"
      className="overflow-hidden"
    >
      <Container
        id="development"
        tabIndex={-1}
        role="region"
        aria-labelledby="pipeline-atlas-title"
        className="scroll-mt-12 outline-none"
      >
        <Reveal>
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
          The portfolio shares a common design logic: selective uptake by
          diseased tissue, pH-mediated activation, and non-hormonal action.
        </PipelineThesis>
      </Container>
    </section>
  );
}

function LeadProgram() {
  const dossier = [
    {
      label: "Clinical study",
      value: "First-in-human Phase 1 study",
    },
    {
      label: "Study population",
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
      <Container
        id="endo-205"
        tabIndex={-1}
        role="region"
        aria-labelledby="endo-205-title"
        className="scroll-mt-12 outline-none"
      >
        <ChapterIntro
          eyebrow="Clinical lead · ENDO-205"
          title="A short-course, disease-modifying therapeutic for endometriosis."
          titleId="endo-205-title"
        >
          ENDO-205 is a first-in-class, non-hormonal precision peptide
          therapeutic designed to eliminate endometriosis lesions and resolve
          associated symptoms, including pain.
        </ChapterIntro>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SciencePlate
              src={ENDO205_MECHANISM_IMAGE}
              alt={ENDO205_MECHANISM_ALT}
              aspect="landscape"
              frame="bleed"
              sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
              imageClassName="object-center"
              caption="Conceptual ENDO-205 sequence through selective uptake and pH-mediated activation."
              disclosure="A separate final state represents the ENDO-205 preclinical lesion-elimination finding; not clinical imagery, outcome data, or restored-tissue histology."
            />
          </div>

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
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
              <EvidenceNote reference={FDA_PHASE_ONE_REFERENCE} flush />
              <EvidenceNote
                reference={{
                  basis: "company",
                  label: "Preclinical study summary",
                }}
                flush
              />
            </div>
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
      <Container
        id="femluna"
        tabIndex={-1}
        role="region"
        aria-labelledby="femluna-title"
        className="scroll-mt-12 outline-none"
      >
        <ChapterIntro
          eyebrow="Endometriosis imaging · FemLUNA™"
          title="Treatment and detection, on one platform."
          titleId="femluna-title"
        >
          FemLUNA™ extends the endometriosis portfolio from therapeutics into
          targeted, non-invasive imaging.
        </ChapterIntro>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <SciencePlate
              src="/illustrations/femluna-targeting-v3.avif"
              alt="Conceptual editorial illustration of a targeted imaging agent localizing near a small endometriosis lesion within simplified pelvic anatomy."
              aspect="landscape"
              frame="soft"
              sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
              imageClassName="object-[58%_center]"
              caption="FemLUNA™ is capable of detecting superficial and sub-millimeter lesions often missed by current imaging."
              disclosure="Conceptual representation; FemLUNA™ is IND-enabling. Not clinical imaging or performance data."
            />
          </div>

          <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
            <p className="t-lead">
              Developed as the first non-invasive, definitive diagnostic for
              endometriosis.
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
      <OncologyPairMobileComparison />

      <div className="hidden sm:block">
        <SciencePlate
          src="/illustrations/oncology-pair-v4.avif"
          alt="Conceptual paired illustration of a targeted imaging agent localizing a solid-tumor focus and a tumor-selective cyclic peptide crossing a tumor-cell membrane toward an intracellular target."
          aspect="panoramic"
          frame="line"
          imageClassName="object-contain"
          caption="One platform, two distinct oncology applications: ENDO-311 is designed to localize at the tumor boundary; ENDO-995 is designed for selective uptake and intracellular access."
          disclosure="Conceptual representation of investigational preclinical programs; not clinical imaging, efficacy, or performance data."
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
      reference: {
        basis: "company",
        label: "Oncology diagnostic program description",
      } as const satisfies EvidenceReference,
    },
    {
      program: ENDO_995,
      label: "Therapeutic",
      body: "A tumor-selective, non-hormonal cyclic peptide for malignant solid tumors, initially focused on colon and endometrial cancers. It is designed to overcome therapeutic resistance and restore responsiveness in cold tumors.",
      note: "Potential applicability across 25%+ of solid tumor types.",
      reference: {
        basis: "company",
        label: "Oncology therapeutic and applicability estimate",
      } as const satisfies EvidenceReference,
    },
  ] as const;

  return (
    <Section
      tone="paper"
      size="chapter"
      className="overflow-hidden"
    >
      <Container
        id="oncology"
        tabIndex={-1}
        role="region"
        aria-labelledby="oncology-title"
        className="scroll-mt-12 outline-none"
      >
        <ChapterIntro
          eyebrow="Oncology · Pre-clinical"
          title="Detection and treatment designed as a matched pair."
          titleId="oncology-title"
        >
          ENDO-995 and ENDO-311 extend the platform into malignant solid tumors through a therapeutic and companion-diagnostic strategy.
        </ChapterIntro>

        <div className="mt-14 min-w-0 md:mt-16">
          <OncologyPairFigure />
        </div>

        <div className="mt-12 grid-flow-dense border-y border-line md:grid md:grid-cols-12">
          {programs.map(({ program, label, body, note, reference }, index) => (
            <Reveal
              key={program.id}
              delay={index * 0.06}
              className={index === 0 ? "py-8 md:col-span-5 md:pr-10" : "border-t border-line py-8 md:col-span-7 md:border-l md:border-t-0 md:pl-10"}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">{label}</p>
                <span className="text-xs font-medium text-muted">{program.stage}</span>
              </div>
              <h3
                id={program.id.toLowerCase()}
                tabIndex={-1}
                className="mt-6 scroll-mt-12 text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.045em] text-ink outline-none"
              >
                {program.name}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted">{body}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink">{note}</p>
              <EvidenceNote reference={reference} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DiligenceSignals() {
  const supportingSignals = [
    {
      type: "NIH portfolio record",
      value: "SBIR",
      title: "NIH SBIR Success Story",
      body: "Recognized among NIH’s highlighted portfolio companies.",
      reference: {
        basis: "institutional",
        label: "Archival NIH SEED profile",
        href: EVIDENCE_LINKS.nihPortfolio,
      } as const satisfies EvidenceReference,
    },
    {
      type: "NIH support",
      value: "NICHD",
      title: "Multiple NIH awards",
      body: "Awards from the Eunice Kennedy Shriver National Institute of Child Health and Human Development.",
      reference: {
        basis: "company",
        label: "NICHD awards announcement",
        href: EVIDENCE_LINKS.fdaAnnouncement,
      } as const satisfies EvidenceReference,
    },
    {
      type: "Regulatory path",
      value: "Underway",
      title: "Fast Track filing",
      body: "Filing underway for the lead program.",
      reference: COMPANY_REPORTED_REFERENCE,
    },
  ] as const;

  return (
    <Section tone="tint-plum" size="chapter">
      <Container
        id="evidence"
        tabIndex={-1}
        role="region"
        aria-labelledby="pipeline-evidence-title"
        className="scroll-mt-12 outline-none"
      >
        <ChapterIntro
          eyebrow="Diligence signals"
          title="Evidence beyond reported program stage."
          titleId="pipeline-evidence-title"
        >
          NIH recognition, multiple NICHD awards, and the Fast Track filing
          underway add context beyond reported program stage.
        </ChapterIntro>

        <div
          data-pipeline-evidence-dossier
          className="mt-14 overflow-hidden rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface editorial-shadow md:mt-16 md:rounded-bl-[3rem] md:rounded-tr-[3rem] lg:grid lg:grid-cols-12"
        >
          <Reveal
            className="relative overflow-hidden bg-plum p-7 text-on-dark sm:p-9 lg:col-span-5 lg:p-10 xl:p-12"
          >
            <span
              aria-hidden
              className="absolute -right-20 -top-24 h-60 w-60 rounded-full border border-line-on-dark"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-on-dark">
                NIH grant milestone
              </p>
              <div className="mt-8 flex items-end gap-4 border-b border-white/15 pb-6">
                <p className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-[0.78] tracking-[-0.06em] text-on-dark">
                  10
                </p>
                <p className="pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-on-dark">
                  Overall
                  <br />
                  impact score
                </p>
              </div>
              <h3 className="mt-7 text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.035em] !text-on-dark [overflow-wrap:anywhere]">
                Commercialization Readiness Pilot grant.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-on-dark sm:text-base">
                A perfect “unicorn” score.
              </p>
              <EvidenceNote
                reference={NIH_PERFECT_SCORE_REFERENCE}
                className="!text-teal-on-dark"
              />
            </div>
          </Reveal>

          <div className="p-7 sm:p-9 lg:col-span-7 lg:p-10 xl:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
              Supporting record
            </p>
            <ol className="relative mt-5 border-y border-line">
              {supportingSignals.map((signal, index) => (
                <li
                  key={signal.title}
                  data-pipeline-evidence-record
                  className="relative grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[2.25rem_minmax(6rem,0.75fr)_minmax(0,1.7fr)] sm:items-start sm:gap-x-5"
                >
                  <span
                    aria-hidden
                    className="row-span-2 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-xs font-semibold text-rose-ink sm:row-span-1"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="col-start-2 min-w-0 sm:col-start-auto sm:pt-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted [overflow-wrap:anywhere]">
                      {signal.type}
                    </p>
                    <p className="mt-2 text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-none tracking-[-0.035em] text-ink [overflow-wrap:anywhere]">
                      {signal.value}
                    </p>
                  </div>
                  <div className="col-start-2 mt-4 min-w-0 sm:col-start-auto sm:mt-0 sm:pt-1">
                    <h3 className="text-base font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                      {signal.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
                      {signal.body}
                    </p>
                    <EvidenceNote reference={signal.reference} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8">
          <Button
            href="/downloads/endocyclic-investor-summary-v2.pdf"
            variant="ghost"
            download
          >
            Download investor summary
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default function PipelinePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PipelineHero />
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
            <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
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
