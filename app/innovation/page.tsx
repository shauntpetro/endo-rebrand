import Image from "next/image";
import SelectiveSequence from "@/components/figures/SelectiveSequence";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SciencePlate from "@/components/site/SciencePlate";
import Section from "@/components/site/Section";

const MECHANISM_STEPS = [
  {
    index: "01",
    title: "pH-mediated activation",
    body: "The proprietary platform uses pH-mediated activation as its first layer of targeting.",
  },
  {
    index: "02",
    title: "Selective uptake",
    body: "Diseased tissue selectively takes up the peptide through a proprietary endocytic pathway.",
  },
  {
    index: "03",
    title: "Non-hormonal action",
    body: "The platform is designed to act in diseased tissue while avoiding hormones, surgery, and systemic toxicity.",
  },
] as const;

const PROGRAM_PATHS = [
  {
    index: "01",
    label: "Endometriosis therapeutic",
    programs: "ENDO-205",
    stage: "Phase 1",
    body: "A first-in-class, non-hormonal precision peptide therapeutic following FDA IND Allowance (2026).",
  },
  {
    index: "02",
    label: "Endometriosis imaging",
    programs: "FemLUNA™",
    stage: "IND-enabling",
    body: "A targeted imaging agent for accurate, non-invasive detection of endometriosis.",
  },
  {
    index: "03",
    label: "Oncology pair",
    programs: "ENDO-995 + ENDO-311",
    stage: "Preclinical",
    body: "A tumor-selective therapeutic and companion diagnostic pair for malignant solid tumors.",
  },
] as const;

function Hero() {
  return (
    <PageHero
      eyebrow="The precision peptide platform"
      title="Selectivity begins with a change in state."
      intro="EndoCyclic combines pH-mediated activation with selective uptake by diseased tissue through a proprietary endocytic pathway."
      actions={
        <>
          <Button href="/contact?subject=partnership">
            Discuss a partnership
          </Button>
          <Button href="/pipeline" variant="ghost">
            Explore the pipeline
          </Button>
        </>
      }
      proof="Non-hormonal · Therapeutics, diagnostics, and oncology"
      caption="pH-mediated activation and selective uptake form the core of the EndoCyclic platform. Conceptual representation; investigational platform."
      tone="tint-warm"
      layout="stacked"
      frame="bleed"
      visualAspect="wide"
      titleClassName="max-w-[17ch]"
    >
      <Image
        src="/illustrations/selective-state-transition-v1.avif"
        alt="Conceptual illustration of a single cyclic peptide changing state at the boundary of a diseased tissue microenvironment."
        fill
        priority
        sizes="(min-width: 1184px) 1120px, 94vw"
        className="object-cover object-center"
      />
    </PageHero>
  );
}

function Mechanism() {
  return (
    <Section tone="paper" size="chapter" id="mechanism">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10 lg:gap-16">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">The selective sequence</p>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Three linked decisions around diseased tissue.
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
            <p className="t-body mt-5 text-muted">
              The platform&apos;s differentiation is the sequence: activation,
              uptake, then non-hormonal action in diseased tissue.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-14">
          <SelectiveSequence steps={MECHANISM_STEPS} />
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
              src="/illustrations/platform-breadth-v2.avif"
              alt="Conceptual illustration of one cyclic peptide branching toward therapeutic, diagnostic, and oncology applications."
              aspect="landscape"
              frame="none"
              sizes="(min-width: 1184px) 560px, (min-width: 1024px) 48vw, 94vw"
              caption="One precision peptide platform supports therapeutic and diagnostic programs across endometriosis and oncology."
              disclosure="Conceptual representation"
            />
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.18em] text-rose-ink">
                  02
                </span>
                <p className="eyebrow">Platform breadth</p>
              </div>
              <h2 className="t-h2 mt-5 text-ink">
                One logic. Three development paths.
              </h2>
              <p className="t-body mt-5 text-muted">
                The platform spans therapeutics, diagnostics, and oncology, with
                additional expansion into women&apos;s health indications and
                oncology.
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
                      <h3 className="t-h3 mt-2 text-ink">{path.programs}</h3>
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
    <Section tone="tint-plum" size="chapter">
      <Container>
        <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Clinical translation</p>
            <p className="mt-6 text-sm font-medium text-teal-ink">
              FDA IND Allowance · 2026
            </p>
            <h2 className="mt-3 text-[clamp(2.35rem,5vw,3.9rem)] font-medium leading-none tracking-[-0.045em] text-ink">
              ENDO-205
            </h2>
            <p className="mt-5 text-2xl font-medium text-rose-ink">Phase 1</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <p className="t-lead">
              A first-in-class, non-hormonal precision peptide therapeutic
              designed as a short-course, disease-modifying treatment for
              endometriosis.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {proof.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1rem_1fr] gap-4 py-5 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/pipeline#endo-205" variant="ghost">
                Follow ENDO-205 into the pipeline
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function InnovationPage() {
  return (
    <main id="main-content">
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
            <Button href="/contact?subject=partnership">
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
