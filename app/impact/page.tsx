import CareGapShift from "@/components/figures/CareGapShift";
import Endo205ImpactTranslation from "@/components/figures/Endo205ImpactTranslation";
import ArtDirectedImage from "@/components/site/ArtDirectedImage";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import EvidenceNote from "@/components/site/EvidenceNote";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import {
  EVIDENCE_LINKS,
  IMPACT_BIOLOGY_ALT,
  IMPACT_BIOLOGY_IMAGE,
  IMPACT_BIOLOGY_MOBILE_IMAGE,
  PARTNERSHIP_CONTACT_HREF,
} from "@/lib/site";

const BURDEN_SIGNALS = [
  {
    value: "190M+",
    label: "women affected worldwide",
  },
  {
    value: "1 in 10",
    label: "reproductive-age women globally",
  },
  {
    value: "$200B",
    label: "annual economic burden in the US",
  },
] as const;

function Hero() {
  return (
    <PageHero
      eyebrow="Disease impact"
      title="Endometriosis is a chronic disease—not a symptom."
      intro="Endometriosis is characterized by endometrial-like tissue growing outside the uterus."
      actions={
        <>
          <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
          <Button href="#burden" variant="ghost">
            Review the burden
          </Button>
        </>
      }
      proof="A leading cause of infertility and chronic pelvic pain."
      caption="Conceptual anatomical representation of endometrial-like tissue growing outside the uterus; not clinical imagery."
      tone="tint-warm"
      layout="reverse"
      frame="soft"
      visualAspect="auto"
      titleClassName="max-w-[18ch]"
    >
      <ArtDirectedImage
        desktopSrc={IMPACT_BIOLOGY_IMAGE}
        mobileSrc={IMPACT_BIOLOGY_MOBILE_IMAGE}
        alt={IMPACT_BIOLOGY_ALT}
        priority
        sizes="(min-width: 1184px) 650px, (min-width: 1024px) 52vw, 94vw"
        mobileSizes="(max-width: 399px) calc(100vw - 2.5rem), 90vw"
        className="object-cover object-center md:object-[50%_32%] lg:object-center"
      />
    </PageHero>
  );
}

function BurdenLedger() {
  return (
    <figure>
      <div className="grid border-y border-line lg:grid-cols-12">
        <div className="border-b border-line py-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">Average diagnostic delay</p>
          <p className="mt-6 text-[clamp(4.75rem,12vw,9rem)] font-medium leading-[0.85] tracking-[-0.065em] text-ink">
            8 years
          </p>
          <div aria-hidden className="mt-10 grid grid-cols-9 border-t border-rose/55 pt-3">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} className="relative text-center text-xs text-muted">
                <span className="absolute -top-[1.05rem] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-paper bg-rose" />
                {index}
              </span>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium text-muted">
            <span>Symptoms</span>
            <span>Diagnosis</span>
          </div>
        </div>

        <dl className="divide-y divide-line lg:col-span-6 lg:col-start-7">
          {BURDEN_SIGNALS.map((signal) => (
            <div key={signal.value} className="grid gap-2 py-7 sm:grid-cols-[12rem_1fr] sm:items-baseline lg:py-8">
              <dt className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.045em] text-ink">
                {signal.value}
              </dt>
              <dd className="text-sm leading-relaxed text-muted">{signal.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
        <p>
          Worldwide prevalence, diagnostic delay, and US economic burden show
          the scale of the unmet need.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
          <EvidenceNote
            flush
            reference={{
              basis: "institutional",
              label: "WHO prevalence record",
              href: EVIDENCE_LINKS.whoEndometriosis,
            }}
          />
          <EvidenceNote
            flush
            reference={{
              basis: "company",
              label: "$200B annual US burden and 8-year diagnostic delay",
            }}
          />
        </div>
      </figcaption>
    </figure>
  );
}

function Burden() {
  return (
    <Section tone="paper" size="chapter">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <div
              id="burden"
              tabIndex={-1}
              role="region"
              aria-labelledby="burden-title"
              className="outline-none"
            >
              <div className="flex items-center gap-4">
                <span aria-hidden className="chapter-thread-mark">
                  <span />
                </span>
                <p className="eyebrow">Scale and delay</p>
              </div>
              <h2 id="burden-title" className="t-h2 mt-5 text-ink">
                The burden is global. The diagnostic delay is measured in years.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              Endometriosis is associated with cardiovascular disease, an increased risk of certain cancers, and other inflammatory conditions.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <BurdenLedger />
        </Reveal>
      </Container>
    </Section>
  );
}

function CareGap() {
  return (
    <Section tone="tint-plum" size="chapter">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span aria-hidden className="chapter-thread-mark">
                <span />
              </span>
              <p className="eyebrow">The care gap</p>
            </div>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.35rem,4.5vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-ink">
              Symptoms are treated. Disease biology remains.
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              Current therapies do not eliminate lesions or modify the underlying disease biology.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <CareGapShift />
        </div>
      </Container>
    </Section>
  );
}

function Response() {
  return (
    <Section tone="paper" size="chapter">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span aria-hidden className="chapter-thread-mark">
                <span />
              </span>
              <p className="eyebrow">The response</p>
            </div>
            <h2 className="t-h2 mt-5 text-ink">From selective design to a Phase 1 program.</h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              ENDO-205 is a first-in-class, non-hormonal precision peptide therapeutic in Phase 1 following FDA IND Allowance in 2026.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <Endo205ImpactTranslation />
        </div>
      </Container>
    </Section>
  );
}

export default function ImpactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Burden />
      <CareGap />
      <Response />
      <NextChapter
        eyebrow="Continue the science"
        title="See how one selective mechanism becomes four precision programs."
        tone="plum"
        actions={
          <>
            <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
            <Button href="/pipeline" variant="ghost-on-dark">
              Explore the pipeline
            </Button>
          </>
        }
      >
        Review ENDO-205, FemLUNA™, and the paired oncology programs within the full pipeline.
      </NextChapter>
    </main>
  );
}
