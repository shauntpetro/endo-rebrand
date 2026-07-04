import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <Section tone="paper" className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6rem] top-28 h-72 w-72 rounded-full bg-tint-teal blur-2xl md:right-[-2rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-24 top-56 h-40 w-40 rounded-full bg-tint-plum blur-2xl"
      />
      <Container className="relative">
        <div className="max-w-3xl reveal">
          <Eyebrow>The platform</Eyebrow>
          <h1 className="t-hero mt-6 text-ink">
            A precision peptide that reads the body’s chemistry.
          </h1>
          <p className="t-lead mt-6 max-w-2xl">
            EndoCyclic is built on a proprietary, non-hormonal precision peptide platform. Each
            peptide stays inert in healthy tissue and activates only where disease lives —
            designed to act at the source while sparing everything around it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/pipeline" variant="primary">
              See the pipeline
            </Button>
            <Button href="/contact?subject=partnership" variant="ghost">
              Partner with us
            </Button>
          </div>
        </div>
        <div className="mt-16 h-px w-full bg-line md:mt-24" />
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- The mechanism */
const MECHANISM = [
  {
    k: "pH-mediated activation",
    v: "The peptide remains inert throughout healthy tissue and switches on only in the acidic microenvironment that surrounds disease — turning a chemical signature into a targeting mechanism.",
  },
  {
    k: "Selective uptake",
    v: "A proprietary endocytic pathway concentrates the active peptide inside diseased cells, not healthy ones — so its effect is confined to where it is needed.",
  },
  {
    k: "Non-hormonal",
    v: "It works without hormones, and is designed to avoid surgery and systemic toxicity — engineered to correct the underlying biology rather than suppress it.",
  },
];

function Mechanism() {
  return (
    <Section tone="tint-teal">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The mechanism</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">Correction, not destruction.</h2>
            <p className="t-lead mt-5">
              Three properties, working together, let a single peptide find disease by its own
              chemistry — then act only there.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {MECHANISM.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <div className="text-sm font-medium text-teal-ink">{`0${i + 1}`}</div>
              <h3 className="t-h3 mt-3 text-ink">{p.k}</h3>
              <p className="mt-2.5 text-sm text-muted">{p.v}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------- Platform breadth */
const BREADTH = [
  {
    k: "Therapeutics",
    v: "Precision peptides designed to eliminate disease at the source — led by ENDO-205 for endometriosis.",
  },
  {
    k: "Diagnostics",
    v: "Targeted imaging agents built to detect disease non-invasively, including lesions missed by current methods.",
  },
  {
    k: "Oncology",
    v: "Tumor-selective peptides engineered to reach previously undruggable intracellular targets in solid tumors.",
  },
];

function Breadth() {
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>Platform breadth</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              One platform. Many ways to reach disease.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-6 md:col-start-7">
            <p className="t-body text-muted">
              The same targeting principle spans therapeutics, diagnostics, and oncology — and it
              is expanding into additional women’s health indications. Selectivity, not a single
              disease, is the through-line.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {BREADTH.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.08} className="border-t border-line pt-5">
              <h3 className="t-h3 text-ink">{b.k}</h3>
              <p className="mt-2.5 text-sm text-muted">{b.v}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------- Preclinical signal */
const SIGNAL = [
  {
    k: "Lesions eliminated in preclinical studies",
    v: "Preclinical work demonstrated elimination of endometriosis lesions and the inflammation associated with them.",
  },
  {
    k: "No dose-limiting toxicities",
    v: "GLP toxicology studies showed no dose-limiting toxicities for the lead program.",
  },
  {
    k: "Now in first-in-human study",
    v: "ENDO-205 reached FDA IND Allowance (2026) and is in a Phase 1 first-in-human study.",
  },
];

function Signal() {
  return (
    <Section tone="tint-warm">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>The preclinical signal</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">
              An early read that carried into the clinic.
            </h2>
            <p className="t-body mt-5 text-muted">
              The platform’s first therapeutic, ENDO-205, moved from a clear preclinical signal
              into a first-in-human study — a short-course, disease-modifying candidate designed
              to eliminate endometriosis lesions.
            </p>
            <div className="mt-8">
              <Button href="/pipeline" variant="quiet">
                Explore the full pipeline
              </Button>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-muted">Preclinical</p>
            <dl className="mt-4 divide-y divide-line border-t border-line">
              {SIGNAL.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.06}>
                  <div className="py-5">
                    <dt className="t-h3 text-ink">{s.k}</dt>
                    <dd className="mt-1.5 text-sm text-muted">{s.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="plum">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="dark">Go deeper</Eyebrow>
            <h2 className="t-h2 mt-4 text-on-dark">
              From one platform to a full pipeline.
            </h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">
              See how the platform translates into programs across endometriosis and oncology — or
              reach out to explore a partnership.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/pipeline" variant="ghost-on-dark">
                View the pipeline
              </Button>
              <Button href="/contact?subject=partnership" variant="ghost-on-dark">
                Partner with us
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
      <Breadth />
      <Signal />
      <Closing />
    </main>
  );
}
