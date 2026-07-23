import Image from "next/image";
import CareGapShift from "@/components/figures/CareGapShift";
import Endo205ImpactTranslation from "@/components/figures/Endo205ImpactTranslation";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";

const BURDEN_SIGNALS = [
  {
    value: "1 in 10",
    label: "reproductive-age women globally",
  },
  {
    value: "$200B",
    label: "annual economic burden in the US",
  },
  {
    value: "$180–250B",
    label: "global treatment-market potential · McKinsey estimate",
  },
] as const;

function Hero() {
  return (
    <PageHero
      eyebrow="The endometriosis burden"
      title="A disease affecting more than 190 million women."
      intro="Endometriosis affects roughly 1 in 10 women of reproductive age, yet diagnosis still takes an average of eight years. Current therapies are largely hormone-based and symptomatic."
      actions={
        <>
          <Button href="/pipeline#endo-205">Review ENDO-205</Button>
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
      <Image
        src="/illustrations/endometriosis-biology-v1.avif"
        alt="Conceptual anatomical illustration of endometriosis lesions outside the uterus, including on the ovaries and pelvic sidewall."
        fill
        priority
        sizes="(min-width: 1184px) 650px, (min-width: 1024px) 52vw, 94vw"
        className="object-cover object-left"
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
              <span key={index} className="relative text-center text-[0.65rem] text-muted">
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
      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Worldwide prevalence, diagnostic delay, US economic burden, and global treatment-market potential show the scale of the unmet need.
      </figcaption>
    </figure>
  );
}

function Burden() {
  return (
    <Section tone="paper" size="chapter" id="burden" className="scroll-mt-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.18em] text-rose-ink">01</span>
              <p className="eyebrow">Scale and delay</p>
            </div>
            <h2 className="t-h2 mt-5 text-ink">The cost of waiting is measured in years and economic burden.</h2>
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
              <span className="text-xs font-semibold tracking-[0.18em] text-rose-ink">02</span>
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
              <span className="text-xs font-semibold tracking-[0.18em] text-rose-ink">03</span>
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
    <main id="main-content">
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
            <Button href="/contact?subject=partnership">Discuss a partnership</Button>
            <Button href="/pipeline" variant="ghost-on-dark">
              Explore the pipeline
            </Button>
          </>
        }
      >
        Follow the platform from ENDO-205 and FemLUNA™ into paired oncology programs.
      </NextChapter>
    </main>
  );
}
