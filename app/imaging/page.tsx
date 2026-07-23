import Image from "next/image";
import FemLunaConceptComparison from "@/components/figures/FemLunaConceptComparison";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";

const FEMLUNA_BRIEF = [
  {
    term: "Stage",
    detail: "IND-enabling",
  },
  {
    term: "Intended role",
    detail: "Non-invasive detection of endometriosis",
  },
  {
    term: "Detection scope",
    detail: "Superficial and sub-millimeter lesions",
  },
  {
    term: "Diagnostic context",
    detail: "An alternative to laparoscopy",
  },
] as const;

const ENDO_311_BRIEF = [
  {
    title: "Targeted imaging",
    body: "An investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors.",
  },
  {
    title: "Localization and monitoring",
    body: "Designed for early-stage tumor localization and disease monitoring, with an initial focus on colon cancer.",
  },
  {
    title: "Radiation-free by design",
    body: "Radiation-free, non-hormonal, free of heavy metals, and compatible with standard imaging systems.",
  },
  {
    title: "Companion to ENDO-995",
    body: "The diagnostic member of the oncology therapeutic and diagnostic pair.",
  },
] as const;

function Hero() {
  return (
    <PageHero
      eyebrow="FemLUNA™ · IND-enabling"
      title="Find what current imaging can miss."
      intro="FemLUNA™ is a targeted imaging agent developed for accurate, non-invasive detection of endometriosis—including superficial and sub-millimeter lesions often missed by current imaging methods."
      actions={
        <>
          <Button href="/contact?subject=partnership">Discuss a partnership</Button>
          <Button href="#detection-logic" variant="ghost">
            See the detection logic
          </Button>
        </>
      }
      proof="A non-invasive alternative to laparoscopy, the current diagnostic gold standard."
      caption="Conceptual representation; FemLUNA™ is IND-enabling. Not clinical imaging or performance data."
      tone="tint-warm"
      layout="portrait"
      frame="arch"
      visualAspect="portrait"
      titleClassName="max-w-[14ch]"
    >
      <Image
        src="/illustrations/femluna-targeting-v2.avif"
        alt="Conceptual editorial illustration of a targeted peptide localizing at a small endometriosis lesion within simplified pelvic anatomy."
        fill
        priority
        sizes="(min-width: 1184px) 380px, (min-width: 1024px) 34vw, 94vw"
        className="object-cover object-[64%_center]"
      />
    </PageHero>
  );
}

function DiagnosticDelay() {
  const years = Array.from({ length: 9 }, (_, index) => index);

  return (
    <figure>
      <div className="grid gap-10 border-y border-line py-10 lg:grid-cols-12 lg:items-center lg:py-14">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
            Average diagnostic delay
          </p>
          <p className="mt-4 text-[clamp(4.75rem,12vw,9rem)] font-medium leading-[0.85] tracking-[-0.065em] text-ink">
            8
          </p>
          <p className="mt-4 text-2xl font-medium text-ink">years</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div aria-hidden className="grid grid-cols-9 border-t border-rose/55 pt-3">
            {years.map((year) => (
              <div key={year} className="relative text-center">
                <span className="absolute -top-[1.05rem] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-paper bg-rose" />
                <span className="text-[0.65rem] font-medium text-muted">{year}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between gap-6 text-sm font-medium text-ink">
            <span>Symptoms</span>
            <span>Diagnosis</span>
          </div>

          <div className="mt-9 divide-y divide-line border-y border-line">
            <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-rose-ink">What imaging can miss</p>
              <p className="text-sm leading-relaxed text-muted">Superficial and sub-millimeter lesions.</p>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-ink">Current gold standard</p>
              <p className="text-sm leading-relaxed text-muted">Laparoscopy, a surgical procedure.</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Endometriosis affects more than 190 million women worldwide and remains a leading cause of infertility and chronic pelvic pain.
      </figcaption>
    </figure>
  );
}

function DiagnosticGap() {
  return (
    <Section tone="paper" size="chapter">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="chapter-thread-mark" aria-hidden><span /></span>
              <p className="eyebrow">The diagnostic gap</p>
            </div>
            <h2 className="t-h2 mt-5 text-ink">Eight years between symptoms and answers.</h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <p className="t-lead">
              The scale of endometriosis stands in sharp contrast to the length and invasiveness of the current diagnostic path.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <DiagnosticDelay />
        </Reveal>
      </Container>
    </Section>
  );
}

function FemLuna() {
  return (
    <Section tone="tint-teal" size="chapter" id="femluna">
      <Container>
        <div id="detection-logic" className="scroll-mt-28 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="chapter-thread-mark" aria-hidden><span /></span>
              <p className="eyebrow">The FemLUNA™ detection logic</p>
            </div>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink">
              Target the lesion. Make disease visible.
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              FemLUNA™ is designed as the first non-invasive, definitive diagnostic for endometriosis and is currently in IND-enabling development.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <FemLunaConceptComparison />
        </Reveal>

        <Reveal className="mt-12 border-y border-line">
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-line py-7 lg:col-span-3 lg:border-b-0 lg:border-r lg:py-9 lg:pr-8">
              <p className="eyebrow">Development brief</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                The program context behind the targeting concept.
              </p>
            </div>

            <dl className="grid sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {FEMLUNA_BRIEF.map((item) => (
                <div
                  key={item.term}
                  className="border-b border-line py-7 sm:px-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:px-7 lg:py-9 lg:last:border-r-0"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-rose-ink">{item.term}</dt>
                  <dd className="mt-3 text-sm font-medium leading-relaxed text-ink">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

      </Container>
    </Section>
  );
}

function Endo311() {
  return (
    <Section tone="tint-plum" size="chapter" id="endo-311">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">The diagnostic logic extends · Preclinical</p>
            <h2 className="mt-6 text-[clamp(2.35rem,5vw,3.9rem)] font-medium leading-none tracking-[-0.045em] text-ink">
              ENDO-311
            </h2>
            <p className="t-lead mt-7">A second diagnostic path, built for malignant solid tumors.</p>
            <p className="t-body mt-5 text-muted">
              ENDO-311 is the companion diagnostic to tumor-selective therapeutic ENDO-995, forming the oncology therapeutic and diagnostic pair.
            </p>
            <div className="mt-8">
              <Button href="/pipeline#oncology" variant="ghost">
                See the oncology pair
              </Button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-surface shadow-[0_24px_70px_rgb(57_38_56/0.08)] sm:aspect-[3/2]">
              <Image
                src="/illustrations/endo-311-localization-v1.avif"
                alt="Conceptual illustration of a targeted imaging agent localizing at the boundary of a solid-tumor focus."
                fill
                sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12">
              <p className="md:col-span-8">A distinct localization path for the diagnostic member of the oncology pair.</p>
              <p className="text-xs md:col-span-4 md:text-right">Conceptual representation; not clinical imaging or performance data.</p>
            </div>

            <ol className="mt-10 divide-y divide-line border-y border-line">
              {ENDO_311_BRIEF.map((item, index) => (
                <li key={item.title} className="grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr]">
                  <span className="text-sm font-semibold text-rose-ink">0{index + 1}</span>
                  <div>
                    <h3 className="t-h3 text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default function ImagingPage() {
  return (
    <main id="main-content">
      <Hero />
      <DiagnosticGap />
      <FemLuna />
      <Endo311 />
      <NextChapter
        eyebrow="Diagnostics in context"
        title="Follow both imaging programs into the full pipeline."
        tone="plum"
        actions={
          <>
            <Button href="/contact?subject=partnership">Discuss a partnership</Button>
            <Button href="/pipeline" variant="ghost-on-dark">
              View the full pipeline
            </Button>
          </>
        }
      >
        Review the therapeutic and diagnostic programs across endometriosis and oncology.
      </NextChapter>
    </main>
  );
}
