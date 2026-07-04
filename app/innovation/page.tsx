import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import Figure from "@/components/site/Figure";
import MechanismFlow from "@/components/figures/MechanismFlow";
import SelectiveUptake from "@/components/figures/SelectiveUptake";
import CyclicPeptide from "@/components/figures/CyclicPeptide";
import PlatformBreadth from "@/components/figures/PlatformBreadth";

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
    v: "The peptide is engineered to stay inert throughout healthy tissue, where pH sits near the physiological 7.4. It switches on only in the mildly acidic microenvironment that surrounds disease — turning a chemical signature into a targeting mechanism. Because activity is conditional on local chemistry rather than a systemic dose, its effect is designed to concentrate where disease lives.",
  },
  {
    k: "Selective uptake",
    v: "Once active, the peptide is drawn into diseased cells through a proprietary endocytic pathway that healthy cells do not engage. This adds a second layer of selectivity: the peptide not only switches on in the right place, it is preferentially internalized by the cells that need to be reached — so its effect stays confined to diseased tissue while neighboring cells are passed over.",
  },
  {
    k: "Non-hormonal",
    v: "Where today’s endometriosis therapies are largely hormonal and symptomatic, this peptide acts through a non-hormonal mechanism. It is designed to work only in diseased tissue while avoiding hormones, surgery, and systemic toxicity — engineered to correct the underlying biology rather than suppress it.",
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

        <Reveal className="mt-20">
          <Figure
            label="Figure 1"
            caption="The precision peptide mechanism in three stages — inert at physiological pH, selectively taken up by diseased cells, then acting to resolve the lesion while surrounding healthy tissue is left intact."
          >
            <MechanismFlow />
          </Figure>
        </Reveal>

        <div className="mt-20 max-w-2xl">
          <Reveal>
            <h3 className="t-h3 text-ink">Selectivity, seen directly.</h3>
            <p className="t-body mt-4 text-muted">
              Selectivity is what makes the mechanism specific rather than merely potent. In a
              mixed tissue field, the active peptide is internalized only by diseased cells,
              while the healthy cells beside them are passed over — the difference between acting
              at the source and acting everywhere.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Figure
            label="Figure 2"
            caption="Selective uptake across a mixed tissue field: the peptide is internalized by diseased cells through a proprietary endocytic pathway, while adjacent healthy cells show no uptake."
          >
            <SelectiveUptake />
          </Figure>
        </Reveal>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------- How a cyclic peptide works */
function Cyclic() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow>The molecule</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">How a cyclic peptide works.</h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-6 md:col-start-7">
            <p className="t-body text-muted">
              The platform’s selectivity begins with structure. A conventional linear peptide is a
              flexible open chain — straightforward to make, but metabolically labile and prone to
              losing its shape before it reaches a target. EndoCyclic’s peptides are cyclized: the
              chain is closed into a constrained ring, locking the molecule into a defined
              three-dimensional shape.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <Figure
            label="Figure 3"
            caption="Cyclization constrains a flexible open chain into a closed ring — engineered for a defined shape, metabolic stability, and access to intracellular targets."
          >
            <CyclicPeptide />
          </Figure>
        </Reveal>

        <div className="mt-14 max-w-2xl">
          <Reveal>
            <p className="t-body text-muted">
              That constraint is what the platform is engineered around. A defined shape is
              designed to give more selective binding to the intended target; the closed ring is
              built to resist the enzymes that degrade linear peptides, improving stability; and the
              compact, rigid form is intended to help the peptide reach intracellular targets that
              many larger biologics cannot access. Together, these properties let a single cyclic
              scaffold be tuned across therapeutic, diagnostic, and oncology programs.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------- Platform breadth */
const BREADTH = [
  {
    k: "Therapeutics",
    v: "Non-hormonal precision peptides designed to eliminate disease at the source — led by ENDO-205, a first-in-class, short-course, disease-modifying candidate for endometriosis now in a Phase 1 first-in-human study.",
  },
  {
    k: "Diagnostics",
    v: "Targeted imaging agents built to detect disease non-invasively — led by FemLUNA™, designed as the first non-invasive diagnostic for endometriosis, capable of detecting superficial and sub-millimeter lesions often missed by current imaging.",
  },
  {
    k: "Oncology",
    v: "Tumor-selective cyclic peptides engineered to reach previously undruggable intracellular targets in solid tumors — ENDO-995, an investigational non-hormonal candidate paired with the ENDO-311 imaging agent as a detect-and-treat approach.",
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
              The same targeting principle — activate in the acidic disease microenvironment, then
              be selectively taken up by diseased cells — spans therapeutics, diagnostics, and
              oncology, and is expanding into additional women’s health indications. Selectivity,
              not a single disease, is the through-line: the same scaffold can be engineered to
              carry a therapeutic effect or an imaging signal to the very tissue it is designed to
              find.
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

        <Reveal className="mt-16">
          <Figure
            label="Figure 4"
            caption="One precision peptide platform branching across therapeutics (ENDO-205), diagnostics (FemLUNA™, ENDO-311), and oncology (ENDO-995, ENDO-311) — with expansion into additional women’s health indications."
          >
            <PlatformBreadth />
          </Figure>
        </Reveal>
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
      <Cyclic />
      <Breadth />
      <Signal />
      <Closing />
    </main>
  );
}
