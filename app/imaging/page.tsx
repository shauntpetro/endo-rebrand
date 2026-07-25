import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import FemLunaConceptComparison from "@/components/figures/FemLunaConceptComparison";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import EvidenceNote from "@/components/site/EvidenceNote";
import NextChapter from "@/components/site/NextChapter";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import { PARTNERSHIP_CONTACT_HREF } from "@/lib/site";

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
    body: "Radiation-free, non-hormonal, and free of heavy metals.",
  },
  {
    title: "Standard imaging compatibility",
    body: "Designed for use with standard imaging systems.",
  },
] as const;

function Endo311Visual() {
  const alt =
    "Conceptual illustration of a targeted imaging agent localizing at the boundary of a solid-tumor focus.";

  return (
    <Image
      data-endo311-visual
      src="/illustrations/endo-311-localization-pair-v4.avif"
      alt={alt}
      fill
      sizes="(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw"
      className="object-cover object-center"
    />
  );
}

function Hero() {
  const heroAlt =
    "Conceptual editorial illustration of a targeted imaging agent localizing near a small endometriosis lesion within simplified pelvic anatomy.";
  const { props: portraitImageProps } = getImageProps({
    src: "/illustrations/femluna-targeting-v3-portrait.avif",
    alt: heroAlt,
    fill: true,
    priority: true,
    fetchPriority: "high",
    sizes: "(min-width: 1024px) 380px, 90vw",
  });
  const { props: landscapeImageProps } = getImageProps({
    src: "/illustrations/femluna-targeting-v3.avif",
    alt: heroAlt,
    fill: true,
    priority: true,
    fetchPriority: "high",
    sizes: "(min-width: 1184px) 380px, (min-width: 1024px) 34vw, 94vw",
  });

  preload(portraitImageProps.src, {
    as: "image",
    imageSrcSet: portraitImageProps.srcSet,
    imageSizes: "90vw",
    media: "(max-width: 639px)",
    fetchPriority: "high",
  });
  preload(landscapeImageProps.src, {
    as: "image",
    imageSrcSet: landscapeImageProps.srcSet,
    imageSizes: "94vw",
    media: "(min-width: 640px) and (max-width: 1023px)",
    fetchPriority: "high",
  });
  preload(portraitImageProps.src, {
    as: "image",
    imageSrcSet: portraitImageProps.srcSet,
    imageSizes: "(min-width: 1184px) 380px, 34vw",
    media: "(min-width: 1024px)",
    fetchPriority: "high",
  });

  return (
    <PageHero
      eyebrow="FemLUNA™ · IND-enabling"
      title="A targeted path toward definitive diagnosis."
      intro="FemLUNA™ is an IND-enabling targeted imaging agent designed for accurate, non-invasive detection of endometriosis."
      actions={
        <>
          <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
          <Button href="#detection-logic" variant="ghost">
            See the detection logic
          </Button>
        </>
      }
      proof="Targeted imaging agent · Endometriosis · IND-enabling"
      caption="Conceptual representation; FemLUNA™ is IND-enabling. Not clinical imaging or performance data."
      tone="tint-warm"
      layout="portrait"
      frame="arch"
      visualAspect="portrait"
      visualClassName="sm:aspect-[16/10] lg:aspect-[4/5]"
      titleClassName="max-w-[14ch]"
    >
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={portraitImageProps.srcSet}
          sizes="90vw"
        />
        <source
          media="(min-width: 1024px)"
          srcSet={portraitImageProps.srcSet}
          sizes="(min-width: 1184px) 380px, 34vw"
        />
        <img
          {...landscapeImageProps}
          alt={heroAlt}
          className="object-cover object-[64%_center]"
        />
      </picture>
    </PageHero>
  );
}

const DIAGNOSTIC_PATH = [
  {
    index: "01",
    label: "Clinical signal",
    title: "Symptoms begin the search for answers.",
    detail:
      "Endometriosis is a leading cause of infertility and chronic pelvic pain.",
    tone: "bg-paper",
    marker: "border-rose bg-petal text-rose-ink",
  },
  {
    index: "02",
    label: "Visibility gap",
    title: "Small lesions can blend into surrounding tissue.",
    detail:
      "Superficial and sub-millimeter lesions can be missed by current imaging methods.",
    tone: "bg-petal/65",
    marker: "border-rose-ink bg-rose-ink text-on-dark",
  },
  {
    index: "03",
    label: "Current confirmation",
    title: "Laparoscopy remains the diagnostic gold standard.",
    detail: "FemLUNA™ is being developed as a non-invasive alternative.",
    tone: "bg-paper",
    marker: "border-teal bg-tint-teal text-teal-ink",
  },
] as const;

function DiagnosticPath() {
  return (
    <figure aria-labelledby="diagnostic-path-title">
      <div className="overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-surface editorial-shadow sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]">
        <header
          data-tone="dark"
          className="relative overflow-hidden border-b border-line-on-dark bg-plum px-6 py-8 text-on-dark sm:px-9 sm:py-10 lg:px-11"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-line-on-dark"
          />
          <div
            aria-hidden
            className="absolute right-10 top-1/2 h-px w-28 bg-gradient-to-r from-rose via-gold to-teal opacity-80"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark">
            Current diagnostic path
          </p>
          <h3
            id="diagnostic-path-title"
            className="relative mt-4 max-w-3xl text-[clamp(1.65rem,3.2vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.03em] !text-on-dark"
          >
            The bottleneck is visibility, followed by invasive confirmation.
          </h3>
        </header>

        <div className="grid lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <span
              aria-hidden
              className="absolute bottom-12 left-[2.65rem] top-12 w-px bg-gradient-to-b from-rose via-gold to-teal sm:left-[3.65rem]"
            />
            <ol className="relative list-none">
              {DIAGNOSTIC_PATH.map((step) => (
                <li
                  key={step.index}
                  className={`relative grid gap-5 border-b border-line px-6 py-7 last:border-b-0 sm:grid-cols-[4.5rem_1fr] sm:gap-7 sm:px-9 sm:py-8 lg:px-11 ${step.tone}`}
                >
                  <span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold tracking-[0.08em] sm:h-12 sm:w-12 ${step.marker}`}
                  >
                    {step.index}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink">
                      {step.label}
                    </p>
                    <h4 className="t-h3 mt-2 max-w-xl !text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative flex min-h-[25rem] flex-col justify-between overflow-hidden border-t border-line bg-tint-teal px-6 py-8 sm:px-9 sm:py-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:px-10">
            <div
              aria-hidden
              className="absolute -right-16 bottom-14 h-52 w-52 rounded-full border border-teal/25"
            >
              <span className="absolute inset-8 rounded-full border border-rose/35" />
              <span className="absolute inset-[4.25rem] rounded-full border border-gold/60" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal" />
            </div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
                Design handoff
              </p>
              <p className="mt-5 max-w-[12ch] text-[clamp(1.8rem,3vw,2.45rem)] font-medium leading-[1.06] tracking-[-0.035em] text-ink">
                Shift the confirmation path.
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                The development objective is targeted, non-invasive detection
                that can distinguish small lesions.
              </p>
            </div>
            <div className="relative mt-16">
              <Button href="#detection-logic" variant="quiet">
                See the targeting concept
              </Button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 text-sm leading-relaxed text-muted">
        <span>
          The current path is shown as diagnostic context, not a clinical
          performance comparison.
        </span>
        <EvidenceNote
          flush
          reference={{ basis: "company", label: "Diagnostic context" }}
        />
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
              <p className="eyebrow">The diagnostic bottleneck</p>
            </div>
            <h2 className="t-h2 mt-5 text-ink">
              The diagnostic path still ends in laparoscopy.
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
            <p className="t-lead">
              With an eight-year average delay, the problem is both time and
              the limits of current imaging.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <DiagnosticPath />
        </Reveal>
      </Container>
    </Section>
  );
}

function FemLuna() {
  return (
    <Section tone="tint-teal" size="chapter" id="femluna">
      <Container>
        <div
          id="detection-logic"
          tabIndex={-1}
          role="region"
          aria-labelledby="detection-logic-title"
          className="grid gap-8 outline-none lg:grid-cols-12 lg:items-end"
        >
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="chapter-thread-mark" aria-hidden><span /></span>
              <p className="eyebrow">The FemLUNA™ detection logic</p>
            </div>
            <h2
              id="detection-logic-title"
              className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.04em] text-ink"
            >
              A targeted signal is designed to distinguish the lesion.
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
            <p className="eyebrow">The diagnostic logic extends · Pre-clinical</p>
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-surface shadow-[0_24px_70px_rgb(57_38_56/0.08)] lg:aspect-[3/2]">
              <Endo311Visual />
            </div>
            <div className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12">
              <p className="md:col-span-8">A conceptual view of targeted localization at a solid-tumor focus.</p>
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
    <main id="main-content" tabIndex={-1}>
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
            <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
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
