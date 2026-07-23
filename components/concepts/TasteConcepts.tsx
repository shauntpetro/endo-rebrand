import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Section from "@/components/site/Section";
import {
  BURDEN_STATS,
  MILESTONES,
  PARTNERS,
  PHASES,
  PIPELINE,
  VALIDATION_WORDS,
} from "@/lib/site";
import {
  ScaleFade,
  ScrubText,
  StackMotion,
  ValidationMarquee,
} from "@/components/concepts/ConceptMotion";

export const CONCEPTS = [
  {
    slug: "selective-thread",
    name: "The Selective Thread",
    summary: "A cinematic scientific narrative connecting burden, mechanism, pipeline, and validation through one authored visual line.",
  },
  {
    slug: "clinical-ledger",
    name: "Clinical Ledger",
    summary: "A measured, evidence-first narrative that reads like a clear clinical brief.",
  },
  {
    slug: "molecular-atlas",
    name: "Molecular Atlas",
    summary: "A visual platform story built around mechanism, modality, and selective action.",
  },
  {
    slug: "partner-brief",
    name: "Partner Brief",
    summary: "A diligence-forward direction that surfaces stage, validation, and market context.",
  },
] as const;

type ConceptSlug = (typeof CONCEPTS)[number]["slug"];

function ConceptSwitcher({ active }: { active: ConceptSlug }) {
  return (
    <>
      <div aria-hidden className="h-16 lg:h-[4.5rem]" />
      <nav
        aria-label="Design concepts"
        className="sticky top-16 z-30 border-y border-line-soft bg-paper/95 backdrop-blur-md lg:top-[4.5rem]"
      >
        <Container className="flex min-h-12 items-center gap-5 overflow-x-auto py-2 text-xs no-scrollbar">
          <Link href="/concepts" className="shrink-0 font-semibold text-ink">
            Concepts
          </Link>
          <span aria-hidden className="h-4 w-px shrink-0 bg-line" />
          {CONCEPTS.map((concept) => (
            <Link
              key={concept.slug}
              href={`/concepts/${concept.slug}`}
              aria-current={active === concept.slug ? "page" : undefined}
              className={
                active === concept.slug
                  ? "order-1 shrink-0 rounded-full bg-plum px-3 py-1.5 font-medium text-on-dark md:order-none"
                  : "order-2 shrink-0 px-1.5 py-1.5 text-muted transition-colors hover:text-ink md:order-none"
              }
            >
              {concept.name}
            </Link>
          ))}
        </Container>
      </nav>
    </>
  );
}

function InlineImage({
  src,
  className = "w-20",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`relative mx-1 inline-block h-[0.8em] overflow-hidden rounded-full align-baseline ${className}`}
    >
      <Image src={src} alt="" fill sizes="96px" className="object-cover grayscale" />
    </span>
  );
}

function PhaseMarks({ phaseIndex }: { phaseIndex: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Development stage: ${PHASES[phaseIndex]}`}>
      {PHASES.map((phase, index) => (
        <span
          key={phase}
          className={`h-1 flex-1 rounded-full ${index <= phaseIndex ? "bg-teal" : "bg-line"}`}
        />
      ))}
    </div>
  );
}

function ProofRail() {
  return (
    <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-3">
      {MILESTONES.map((milestone) => (
        <article
          key={milestone.title}
          className="w-[82vw] max-w-sm shrink-0 snap-start border-l border-line bg-surface p-6 sm:w-80"
        >
          <CheckCircle2 aria-hidden size={18} strokeWidth={1.5} className="text-teal-ink" />
          <h3 className="t-h3 mt-8 text-ink">{milestone.title}</h3>
          <p className="mt-3 text-sm text-muted">{milestone.detail}</p>
        </article>
      ))}
    </div>
  );
}

function Closing({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Section tone="plum">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow tone="dark">Start a conversation</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl !text-on-dark">{title}</h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button href="/contact?subject=partnership" variant="ghost-on-dark">
              Partner with us
            </Button>
            <Button href="/investors" variant="ghost-on-dark">
              Investor overview
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ClinicalLedger() {
  const lead = PIPELINE[0];
  const diagnostic = PIPELINE[1];

  return (
    <main id="main-content" className="w-full max-w-full overflow-x-hidden">
      <ConceptSwitcher active="clinical-ledger" />

      <section className="relative overflow-hidden bg-paper py-24 md:py-36">
        <div aria-hidden className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-tint-teal blur-3xl" />
        <Container className="relative text-center">
          <div className="mx-auto max-w-5xl reveal">
            <Eyebrow>Clinical-stage precision medicine</Eyebrow>
            <h1 className="t-hero mx-auto mt-6 max-w-5xl text-ink">
              A clear clinical story, from selective mechanism to Phase 1.
            </h1>
            <p className="t-lead mx-auto mt-7 max-w-2xl">
              EndoCyclic develops non-hormonal precision peptides designed to act selectively in
              diseased tissue, led by ENDO-205 for endometriosis.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/pipeline" variant="primary">Review the pipeline</Button>
              <Button href="/contact?subject=partnership" variant="ghost">Discuss a partnership</Button>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="tint-warm">
        <Container>
          <div className="grid gap-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-36">
                <Eyebrow>The investment case</Eyebrow>
                <h2 className="t-h2 mt-5 text-ink">
                  One platform. A therapeutic <InlineImage src="/illustrations/femluna-targeting-v2.avif" /> and
                  diagnostic path.
                </h2>
                <p className="mt-5 text-muted">
                  The story is organized around the questions a clinical or strategic reviewer
                  asks first: what is differentiated, what is advancing, and what has been
                  externally validated.
                </p>
              </div>
            </div>

            <StackMotion className="space-y-6 md:col-span-7 md:col-start-6">
              <article data-stack-card className="group overflow-hidden border border-line bg-surface p-7 md:p-9">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Lead therapeutic</p>
                    <h3 className="t-h2 mt-4 text-ink">{lead.name}</h3>
                  </div>
                  <p className="max-w-48 text-left text-sm font-medium text-ink sm:text-right">{lead.stage}</p>
                </div>
                <p className="mt-7 max-w-2xl text-muted">{lead.summary}</p>
                <div className="mt-8"><PhaseMarks phaseIndex={lead.phaseIndex} /></div>
                <Link href="/pipeline#ENDO-205" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-teal-ink">
                  Review ENDO-205 <ArrowRight aria-hidden size={15} />
                </Link>
              </article>

              <article data-stack-card className="group overflow-hidden border border-line bg-tint-teal p-7 md:p-9">
                <div className="grid gap-8 md:grid-cols-5 md:items-center">
                  <div className="md:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Lead diagnostic</p>
                    <h3 className="t-h2 mt-4 text-ink">{diagnostic.name}</h3>
                    <p className="mt-5 text-muted">{diagnostic.summary}</p>
                    <div className="mt-7"><PhaseMarks phaseIndex={diagnostic.phaseIndex} /></div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden md:col-span-2">
                    <Image
                      src="/illustrations/femluna-targeting-v2.avif"
                      alt="Conceptual FemLUNA targeted-imaging illustration"
                      fill
                      sizes="(min-width: 768px) 240px, 100vw"
                      className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </article>

              <article data-stack-card className="border border-line bg-plum p-7 text-on-dark md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Platform logic</p>
                <h3 className="t-h2 mt-4 max-w-xl !text-on-dark">
                  pH-mediated activation. Selective uptake. Non-hormonal action.
                </h3>
                <p className="mt-5 max-w-2xl text-muted-on-dark">
                  A proprietary precision peptide platform designed to activate in diseased tissue
                  and enter diseased cells through a proprietary endocytic pathway.
                </p>
              </article>
            </StackMotion>
          </div>
        </Container>
      </Section>

      <div className="bg-paper py-10">
        <ValidationMarquee items={VALIDATION_WORDS} />
      </div>

      <Section tone="paper">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Independent validation</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-2xl text-ink">Evidence, presented without the noise.</h2>
            </div>
            <p className="text-sm text-muted md:col-span-4 md:col-start-9">
              Regulatory progress, public funding, and institutional recognition sit in one concise
              review rail.
            </p>
          </div>
          <ScaleFade className="mt-14">
            <ProofRail />
          </ScaleFade>
        </Container>
      </Section>

      <Closing
        title="Review the platform behind the lead clinical program."
        body="For strategic partnerships, investment, or data-room inquiries, connect with the EndoCyclic team."
      />
    </main>
  );
}

export function MolecularAtlas() {
  const lead = PIPELINE[0];
  const diagnostic = PIPELINE[1];

  return (
    <main id="main-content" className="w-full max-w-full overflow-x-hidden">
      <ConceptSwitcher active="molecular-atlas" />

      <section className="bg-tint-teal py-24 md:py-36">
        <Container>
          <div className="grid gap-14 md:grid-cols-12 md:items-center">
            <div className="reveal md:col-span-7">
              <Eyebrow>Precision peptide platform</Eyebrow>
              <h1 className="t-hero mt-6 max-w-4xl text-ink">
                Precision that reads the chemistry of disease.
              </h1>
              <p className="t-lead mt-7 max-w-xl">
                A disease-selective, non-hormonal platform spanning therapeutics, diagnostics, and
                oncology.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/innovation" variant="primary">Explore the mechanism</Button>
                <Button href="/pipeline" variant="ghost">See the programs</Button>
              </div>
            </div>

            <ScaleFade className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-paper p-8">
                <div aria-hidden className="absolute inset-8 rounded-full border border-line" />
                <div aria-hidden className="absolute left-[18%] top-[16%] h-[38%] w-[38%] rounded-full bg-tint-plum" />
                <div aria-hidden className="absolute bottom-[13%] right-[13%] h-[54%] w-[54%] rounded-full bg-teal-tint" />
                <div aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-plum bg-paper" />
                <p className="absolute bottom-8 left-8 max-w-52 text-sm text-muted">
                  Designed for pH-mediated activation and selective uptake by diseased tissue.
                </p>
              </div>
            </ScaleFade>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Platform expression</Eyebrow>
            <h2 className="t-h2 mt-5 text-ink">One biological logic, expressed across the pipeline.</h2>
          </div>

          <StackMotion className="grid grid-flow-dense gap-4 md:grid-cols-12 md:grid-rows-2">
            <article data-stack-card className="relative overflow-hidden bg-plum p-8 text-on-dark md:col-span-7 md:row-span-2 md:min-h-[34rem] md:p-10">
              <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[42px] border-white/5" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Disease-selective platform</p>
                  <h3 className="t-h2 mt-5 max-w-xl !text-on-dark">
                    Activate in the disease microenvironment. Enter selectively. Address the biology.
                  </h3>
                </div>
                <ol className="mt-16 grid gap-8 border-t border-line-on-dark pt-8 sm:grid-cols-3">
                  {["pH-mediated activation", "Selective uptake", "Non-hormonal"].map((item) => (
                    <li key={item} className="text-sm text-muted-on-dark">{item}</li>
                  ))}
                </ol>
              </div>
            </article>

            <article data-stack-card className="group overflow-hidden border border-line bg-tint-warm p-7 md:col-span-5 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Therapeutic</p>
                  <h3 className="t-h3 mt-3 text-ink">{lead.name}</h3>
                </div>
                <span className="text-right text-xs font-medium text-ink">Phase 1</span>
              </div>
              <p className="mt-6 text-sm text-muted">{lead.mechanism} for endometriosis.</p>
              <div className="mt-8"><PhaseMarks phaseIndex={lead.phaseIndex} /></div>
            </article>

            <article data-stack-card className="group overflow-hidden border border-line bg-tint-plum p-7 md:col-span-5 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Diagnostic</p>
                  <h3 className="t-h3 mt-3 text-ink">{diagnostic.name}</h3>
                </div>
                <span className="text-right text-xs font-medium text-ink">IND-enabling</span>
              </div>
              <p className="mt-6 text-sm text-muted">Designed to detect superficial and sub-millimeter lesions.</p>
              <div className="mt-8"><PhaseMarks phaseIndex={diagnostic.phaseIndex} /></div>
            </article>
          </StackMotion>
        </Container>
      </Section>

      <div className="bg-tint-warm py-10">
        <ValidationMarquee items={VALIDATION_WORDS} />
      </div>

      <Section tone="tint-warm">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Designed to translate</Eyebrow>
              <h2 className="t-h2 mt-5 text-ink">
                From endometriosis <InlineImage src="/illustrations/femluna-targeting-v2.avif" className="w-16" /> to oncology.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ScrubText className="text-[clamp(1.55rem,3.1vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.025em] text-ink">
                The same precision peptide platform is being developed across therapeutics, diagnostics, and oncology, with programs designed around selective uptake by diseased tissue.
              </ScrubText>
            </div>
          </div>

          <div className="mt-20 flex min-h-[30rem] flex-col gap-3 md:flex-row">
            {[
              {
                title: "Endometriosis therapy",
                body: "ENDO-205 is a first-in-class, non-hormonal precision peptide therapeutic now in Phase 1.",
                href: "/pipeline#ENDO-205",
                tone: "bg-paper",
              },
              {
                title: "Endometriosis imaging",
                body: "FemLUNA is an IND-enabling targeted imaging agent developed as a non-invasive alternative to laparoscopy.",
                href: "/imaging",
                tone: "bg-tint-teal",
              },
              {
                title: "Oncology",
                body: "A therapeutic and diagnostic pair in pre-clinical development for malignant solid tumors.",
                href: "/pipeline#ENDO-995",
                tone: "bg-tint-plum",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex min-h-56 flex-1 flex-col justify-between overflow-hidden border border-line p-7 transition-[flex,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:hover:flex-[1.7] ${item.tone}`}
              >
                <ArrowRight aria-hidden size={18} className="self-end text-teal-ink transition-transform duration-700 group-hover:translate-x-1" />
                <div>
                  <h3 className="t-h3 text-ink">{item.title}</h3>
                  <p className="mt-4 max-w-sm text-sm text-muted opacity-100 transition-opacity duration-500 md:opacity-70 md:group-hover:opacity-100">{item.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Closing
        title="See how one selective platform becomes a multi-program pipeline."
        body="Explore the mechanism in detail or connect with the team about therapeutic and diagnostic partnerships."
      />
    </main>
  );
}

export function PartnerBrief() {
  return (
    <main id="main-content" className="w-full max-w-full overflow-x-hidden">
      <ConceptSwitcher active="partner-brief" />

      <section className="relative overflow-hidden bg-paper py-24 md:py-36">
        <div aria-hidden className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-tint-plum blur-3xl" />
        <div aria-hidden className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-tint-teal blur-3xl" />
        <Container className="relative text-center">
          <div className="mx-auto max-w-5xl reveal">
            <Eyebrow>Built for strategic diligence</Eyebrow>
            <h1 className="t-hero mx-auto mt-6 max-w-5xl text-ink">
              A Phase 1 lead program. A platform with therapeutic and diagnostic reach.
            </h1>
            <p className="t-lead mx-auto mt-7 max-w-2xl">
              EndoCyclic is advancing a non-hormonal precision peptide pipeline across
              endometriosis and oncology.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/investors" variant="primary">Investor overview</Button>
              <Button href="/contact?subject=data" variant="ghost">Request data-room access</Button>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="tint-plum">
        <Container>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {BURDEN_STATS.map((stat) => (
              <div key={stat.label} className="border-t border-line pt-5">
                <p className="t-stat">
                  {"prefix" in stat ? stat.prefix : ""}{stat.value}{"suffix" in stat ? stat.suffix : ""}
                </p>
                <h2 className="mt-4 text-sm font-semibold text-ink">{stat.label}</h2>
                <p className="mt-2 text-sm text-muted">{stat.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <div className="bg-plum py-10 text-on-dark">
        <ValidationMarquee items={VALIDATION_WORDS} dark />
      </div>

      <Section tone="paper">
        <Container>
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-36">
                <Eyebrow>Proof of progress</Eyebrow>
                <h2 className="t-h2 mt-5 text-ink">
                  The milestones <InlineImage src="/white-house.webp" className="w-24" /> behind the thesis.
                </h2>
                <p className="mt-5 text-muted">
                  A concise review of regulatory stage, scientific validation, and platform breadth.
                </p>
                <div className="mt-8 flex items-center gap-5">
                  {PARTNERS.slice(0, 3).map((partner) => (
                    <div key={partner.name} className="relative h-7 w-20 opacity-60 grayscale">
                      <Image src={partner.src} alt={partner.name} fill sizes="80px" className="object-contain object-left" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <StackMotion className="space-y-5 md:col-span-7 md:col-start-6">
              <article data-stack-card className="border border-line bg-surface p-7 md:sticky md:top-36 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Regulatory</p>
                <h3 className="t-h2 mt-4 text-ink">FDA IND Allowance achieved in 2026.</h3>
                <p className="mt-5 max-w-2xl text-muted">ENDO-205 is in a first-in-human Phase 1 study in healthy pre-menopausal women of reproductive age.</p>
              </article>
              <article data-stack-card className="border border-line bg-tint-teal p-7 md:sticky md:top-48 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Scientific validation</p>
                <h3 className="t-h2 mt-4 text-ink">An NIH perfect “10” impact score.</h3>
                <p className="mt-5 max-w-2xl text-muted">Supported by multiple NICHD awards and recognized as an NIH SBIR Success Story.</p>
              </article>
              <article data-stack-card className="border border-line bg-tint-warm p-7 md:sticky md:top-60 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">Platform breadth</p>
                <h3 className="t-h2 mt-4 text-ink">Therapeutics, diagnostics, and oncology.</h3>
                <p className="mt-5 max-w-2xl text-muted">Four programs apply a proprietary precision peptide platform across endometriosis and malignant solid tumors.</p>
              </article>
              <article data-stack-card className="border border-line bg-plum p-7 text-on-dark md:sticky md:top-72 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Strategic context</p>
                <h3 className="t-h2 mt-4 !text-on-dark">A large burden with limited disease-modifying options.</h3>
                <p className="mt-5 max-w-2xl text-muted-on-dark">Endometriosis affects more than 190 million women worldwide, while current therapies are largely hormone-based and symptomatic.</p>
              </article>
            </StackMotion>
          </div>
        </Container>
      </Section>

      <Section tone="tint-teal">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Diligence pathways</Eyebrow>
            <h2 className="t-h2 mt-5 text-ink">Choose the part of the story you need to examine.</h2>
          </div>
          <div className="mt-14 flex min-h-[26rem] flex-col gap-3 md:flex-row">
            {[
              { title: "Lead clinical program", body: "ENDO-205, FDA IND Allowance, Phase 1, and the supporting therapeutic rationale.", href: "/pipeline#ENDO-205" },
              { title: "Diagnostic strategy", body: "FemLUNA and the path toward non-invasive detection of superficial and sub-millimeter lesions.", href: "/imaging" },
              { title: "Platform expansion", body: "The pre-clinical oncology therapeutic and diagnostic pair, ENDO-995 and ENDO-311.", href: "/pipeline#ENDO-995" },
            ].map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex min-h-56 flex-1 flex-col justify-between overflow-hidden border border-line p-7 transition-[flex,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:hover:flex-[1.65] ${index === 1 ? "bg-surface" : "bg-paper"}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">{item.title}</span>
                <div>
                  <p className="max-w-sm text-sm text-muted">{item.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-ink">
                    Review <ArrowRight aria-hidden size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Closing
        title="Move from overview to diligence."
        body="Request investor materials, discuss a strategic partnership, or connect with the team about the pipeline."
      />
    </main>
  );
}
