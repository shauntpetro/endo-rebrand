import Link from "next/link";
import SelectiveSequence from "@/components/figures/SelectiveSequence";
import ArtDirectedImage from "@/components/site/ArtDirectedImage";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import EvidenceNote from "@/components/site/EvidenceNote";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SciencePlate from "@/components/site/SciencePlate";
import Section from "@/components/site/Section";
import {
  EVIDENCE_LINKS,
  PARTNERSHIP_CONTACT_HREF,
  PLATFORM_MECHANISM_STEPS,
  type EvidenceReference,
} from "@/lib/site";

const INNOVATION_HERO_IMAGE =
  "/illustrations/innovation-target-clearance-v2.avif";
const INNOVATION_HERO_MOBILE_IMAGE =
  "/illustrations/innovation-target-clearance-mobile-v2.avif";
const INNOVATION_HERO_ALT =
  "Conceptual close-up of an intact EndoCyclic peptide remaining visible within diseased tissue before a separate final state shows the same lesion receding to represent the ENDO-205 preclinical lesion-elimination finding.";

const PROGRAM_PATHS = [
  {
    index: "01",
    label: "Endometriosis therapeutic",
    programs: "ENDO-205",
    stage: "Phase 1",
    href: "/pipeline#endo-205",
    body: "A first-in-class, non-hormonal precision peptide therapeutic following FDA IND Allowance (2026).",
  },
  {
    index: "02",
    label: "Endometriosis imaging",
    programs: "FemLUNA™",
    stage: "IND-enabling",
    href: "/pipeline#femluna",
    body: "A targeted imaging agent for accurate, non-invasive detection of endometriosis.",
  },
  {
    index: "03",
    label: "Oncology pair",
    programs: "ENDO-995 + ENDO-311",
    stage: "Pre-clinical",
    href: "/pipeline#oncology",
    body: "A tumor-selective therapeutic and companion diagnostic pair for malignant solid tumors.",
  },
] as const;

const FDA_PHASE_ONE_REFERENCE = {
  basis: "company",
  label: "FDA / Phase 1 announcement",
  href: EVIDENCE_LINKS.fdaAnnouncement,
} as const satisfies EvidenceReference;

const PRECLINICAL_REFERENCE = {
  basis: "company",
  label: "Preclinical and GLP findings",
} as const satisfies EvidenceReference;

function Hero() {
  return (
    <PageHero
      eyebrow="The precision peptide platform"
      title="A selective route into diseased tissue."
      intro="EndoCyclic combines selective uptake by diseased tissue through a proprietary endocytic pathway with pH-mediated activation."
      actions={
        <>
          <Button href={PARTNERSHIP_CONTACT_HREF}>
            Discuss a partnership
          </Button>
          <Button href="/pipeline" variant="ghost">
            Explore the pipeline
          </Button>
        </>
      }
      proof="Non-hormonal · Therapeutic and diagnostic programs across endometriosis and oncology"
      caption="Conceptual platform close-up through selective uptake and pH-mediated activation. A separate receding-lesion state represents the ENDO-205 preclinical lesion-elimination finding; not clinical imagery, outcome data, or restored-tissue histology."
      tone="tint-warm"
      layout="stacked"
      frame="bleed"
      visualAspect="wide"
      titleClassName="max-w-[17ch]"
    >
      <ArtDirectedImage
        desktopSrc={INNOVATION_HERO_IMAGE}
        mobileSrc={INNOVATION_HERO_MOBILE_IMAGE}
        alt={INNOVATION_HERO_ALT}
        priority
        sizes="(min-width: 1184px) 1120px, 94vw"
        mobileSizes="90vw"
        className="object-cover object-center"
      />
    </PageHero>
  );
}

function Mechanism() {
  return (
    <Section
      tone="paper"
      size="chapter"
      id="mechanism"
      className="!pt-14 md:!pt-16 lg:!pt-20"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10 lg:gap-16">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">The selective sequence</p>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Three platform stages. One ENDO-205 preclinical result.
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
            <p className="t-body mt-5 text-muted">
              Stages 01–03 describe diseased-tissue selectivity, selective
              uptake, and pH-mediated activation. Evidence 04 keeps the intact
              peptide visible within diseased tissue, then separately presents
              the ENDO-205 preclinical lesion and inflammation findings.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-12">
          <SelectiveSequence steps={PLATFORM_MECHANISM_STEPS} />
        </div>
      </Container>
    </Section>
  );
}

function Rationale() {
  return (
    <Section tone="tint-teal" size="proof">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Why selectivity matters in endometriosis</p>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
              <span className="block">Correction,</span>{" "}
              <span className="block">not destruction.</span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="border-t border-line pt-7 lg:col-span-4 lg:col-start-9"
          >
            <p className="t-lead">
              Current endometriosis therapies are largely hormone-based and
              symptomatic. They do not eliminate lesions or modify disease
              biology.
            </p>
            <p className="t-body mt-5 text-muted">
              EndoCyclic&apos;s platform is designed to act only in diseased
              tissue through a non-hormonal mechanism.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Breadth() {
  return (
    <Section tone="paper" size="chapter">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SciencePlate
              src="/illustrations/platform-breadth-v3.avif"
              alt="Conceptual illustration of one cyclic peptide branching toward therapeutic and diagnostic applications across endometriosis and oncology."
              aspect="landscape"
              frame="none"
              sizes="(min-width: 1184px) 560px, (min-width: 1024px) 48vw, 94vw"
              caption="One precision peptide platform supports therapeutic and diagnostic programs across endometriosis and oncology."
              disclosure="Conceptual representation"
            />
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow">Platform breadth</p>
              <h2 className="t-h2 mt-5 text-ink">
                One platform. Three development paths. Four programs.
              </h2>
              <p className="t-body mt-5 text-muted">
                The same precision peptide logic supports ENDO-205, FemLUNA™,
                and the paired ENDO-995/ENDO-311 oncology programs, with
                expansion into additional women&apos;s health indications.
              </p>
            </Reveal>

            <div className="mt-9 divide-y divide-line border-y border-line">
              {PROGRAM_PATHS.map((path, index) => (
                <Reveal key={path.programs} delay={index * 0.05}>
                  <article className="grid gap-3 py-6 sm:grid-cols-[2.25rem_1fr_auto] sm:items-start">
                    <span className="text-xs font-semibold tracking-[0.18em] text-rose-ink">
                      {path.index}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">
                        {path.label}
                      </p>
                      <h3 className="t-h3 mt-1 text-ink">
                        <Link
                          href={path.href}
                          prefetch={false}
                          className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-teal-ink"
                          aria-label={`Review ${path.programs} in the pipeline`}
                        >
                          <span className="link-underline">{path.programs}</span>
                          <span
                            aria-hidden
                            className="text-sm font-medium text-rose-ink transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                          >
                            →
                          </span>
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {path.body}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-teal-ink sm:text-right">
                      {path.stage}
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Translation() {
  const proof = [
    "Preclinical studies demonstrated elimination of endometriosis lesions and associated inflammation.",
    "GLP toxicology studies showed no dose-limiting toxicities.",
    "The Phase 1 first-in-human study is in healthy pre-menopausal women of reproductive age.",
  ] as const;

  return (
    <Section tone="tint-plum" size="chapter" id="clinical-translation">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Clinical translation</p>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              From selective mechanism to clinical study.
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              ENDO-205 carries the platform&apos;s targeting logic into a
              first-in-human Phase 1 study.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-7">
            <SciencePlate
              src="/illustrations/endo-205-clinical-translation-v7.avif"
              alt="Conceptual illustration showing selective uptake and pH-mediated activation with an intact peptide remaining visible within diseased tissue. A separate receding-lesion state represents the ENDO-205 preclinical lesion-elimination finding before a structured Phase 1 clinical-study pathway."
              aspect="landscape"
              frame="soft"
              sizes="(min-width: 1184px) 650px, (min-width: 1024px) 58vw, 94vw"
              imageClassName="object-cover object-center"
              caption="Selective uptake and pH-mediated activation are shown before the separately qualified ENDO-205 preclinical lesion-elimination finding and Phase 1 pathway."
              disclosure="The receding-lesion state reflects preclinical findings; it does not depict restored-tissue histology, and the study pathway does not depict clinical outcomes."
            />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <article
              data-tone="dark"
              className="rounded-bl-[2.25rem] rounded-tr-[2.25rem] bg-plum p-7 text-on-dark shadow-[0_24px_70px_rgb(57_38_56/0.12)] sm:p-9 lg:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
                <p className="eyebrow !text-teal-on-dark">ENDO-205</p>
                <p className="text-sm font-medium text-muted-on-dark">
                  FDA IND Allowance · 2026
                </p>
              </div>

              <h3 className="mt-7 text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.055em]">
                Phase 1
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-muted-on-dark">
                A first-in-class, non-hormonal precision peptide therapeutic
                designed as a short-course, disease-modifying treatment for
                endometriosis.
              </p>

              <ul className="mt-7 divide-y divide-white/15 border-y border-white/15">
                {proof.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1rem_1fr] gap-4 py-4 text-sm leading-relaxed text-muted-on-dark"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
                <EvidenceNote
                  flush
                  reference={FDA_PHASE_ONE_REFERENCE}
                  className="!text-teal-on-dark"
                />
                <EvidenceNote
                  flush
                  reference={PRECLINICAL_REFERENCE}
                  className="!text-muted-on-dark"
                />
              </div>

              <div className="mt-7">
                <Button href="/pipeline#endo-205" variant="ghost-on-dark">
                  Follow ENDO-205 into the pipeline
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function InnovationPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Mechanism />
      <Rationale />
      <Breadth />
      <Translation />
      <NextChapter
        eyebrow="From platform to programs"
        title="See how selectivity becomes a four-program pipeline."
        tone="plum"
        actions={
          <>
            <Button href={PARTNERSHIP_CONTACT_HREF}>
              Discuss a partnership
            </Button>
            <Button href="/pipeline" variant="ghost-on-dark">
              View the pipeline
            </Button>
          </>
        }
      >
        Explore the clinical-stage lead, the endometriosis imaging program, and
        the oncology therapeutic and diagnostic pair.
      </NextChapter>
    </main>
  );
}
