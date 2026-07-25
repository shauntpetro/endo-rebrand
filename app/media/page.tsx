import Image from "next/image";
import { ArrowDownRight, Download } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import EvidenceNote from "@/components/site/EvidenceNote";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import {
  ENDO205_MECHANISM_ALT,
  ENDO205_MECHANISM_IMAGE,
  ENDO205_PORTFOLIO_IMAGE,
  EVIDENCE_LINKS,
  MEDIA_ASSET_CONTACT_HREF,
  MEDIA_CONTACT_HREF,
  PLATFORM_MECHANISM_ALT,
  PLATFORM_MECHANISM_IMAGE,
  SITE,
} from "@/lib/site";
import mediaKitRelease from "@/lib/media-kit-release.json";
import BoilerplateActions from "./BoilerplateActions";

export const APPROVED_BOILERPLATE =
  "EndoCyclic Therapeutics, Inc. is a clinical-stage precision medicine company based in Irvine, California, founded by Dr. Tanya Petrossian, PhD. The company is advancing a proprietary precision peptide platform with pH-mediated activation and selective uptake by diseased tissue. Its lead therapeutic, ENDO-205, is a first-in-class, non-hormonal precision peptide therapeutic for endometriosis in Phase 1 following FDA IND Allowance in 2026. Its lead diagnostic, FemLUNA™, is an IND-enabling targeted imaging agent designed as a non-invasive alternative to laparoscopy. The platform supports therapeutic and diagnostic programs across endometriosis and oncology. EndoCyclic is a founding member of the Milken Institute Women’s Health Network.";

function createBoilerplateParagraphs(boilerplate: string) {
  const paragraphStarts = [
    "Its lead therapeutic, ENDO-205,",
    "The platform supports therapeutic and diagnostic programs",
  ] as const;
  const breakIndexes = paragraphStarts.map((start) => {
    const needle = ` ${start}`;
    const index = boilerplate.indexOf(needle);

    if (
      index < 0 ||
      boilerplate.indexOf(needle, index + needle.length) >= 0
    ) {
      throw new Error("Approved boilerplate paragraph boundary is invalid.");
    }

    return index;
  });
  const [programsStart, portfolioStart] = breakIndexes;

  if (portfolioStart <= programsStart) {
    throw new Error("Approved boilerplate paragraph order is invalid.");
  }

  const paragraphs = [
    boilerplate.slice(0, programsStart),
    boilerplate.slice(programsStart + 1, portfolioStart),
    boilerplate.slice(portfolioStart + 1),
  ] as const;

  if (
    paragraphs.some((paragraph) => paragraph.length === 0) ||
    paragraphs.join(" ") !== boilerplate
  ) {
    throw new Error("Approved boilerplate paragraph grouping is incomplete.");
  }

  return paragraphs;
}

export const APPROVED_BOILERPLATE_PARAGRAPHS =
  createBoilerplateParagraphs(APPROVED_BOILERPLATE);

const KEY_FACTS = [
  { label: "Based in", value: "Irvine, California" },
  { label: "Stage", value: "Clinical-stage precision medicine company" },
  { label: "Lead therapeutic", value: "ENDO-205 · FDA IND Allowance (2026) · Phase 1" },
  { label: "Lead diagnostic", value: "FemLUNA™ · IND-enabling" },
  { label: "Platform", value: "Therapeutic and diagnostic programs · Endometriosis and oncology" },
  { label: "Disease burden", value: "190M+ women worldwide · $200B annual US burden" },
] as const;

const MEDIA_ASSETS = [
  {
    name: "Platform sequence + ENDO-205 evidence",
    description:
      "Four-part conceptual illustration of selective uptake, pH-mediated activation, and the separately qualified ENDO-205 preclinical lesion-elimination finding.",
    usage: "ZIP · AVIF + JPEG + use notes",
    href: "/downloads/media/endocyclic-platform-mechanism.zip",
    download: "endocyclic-platform-mechanism.zip",
    downloadLabel: "Download Platform mechanism visual package (ZIP)",
    compactDownloadLabel: "Download visual package",
    image: PLATFORM_MECHANISM_IMAGE,
    alt: PLATFORM_MECHANISM_ALT,
    previewClass: "object-contain object-center",
    phonePreview: "wide",
    previewShapeClass: "",
    disclosure:
      "Evidence 04 represents the ENDO-205 preclinical lesion-elimination finding; not clinical imagery or outcome data.",
    tabletClass: "sm:col-span-2 sm:row-start-1",
    layoutClass: "lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1",
    shapeClass: "rounded-bl-[2.5rem] sm:rounded-bl-[3.5rem]",
    visualClass:
      "aspect-[2/1] bg-paper sm:aspect-[2/1]",
    dark: true,
    compact: false,
  },
  {
    name: "Primary wordmark",
    description: "The current web wordmark for use on light, quiet backgrounds.",
    usage: "Transparent PNG · 233 × 70 px",
    href: "/downloads/media/endocyclic-wordmark-transparent.png",
    download: "endocyclic-wordmark-transparent.png",
    downloadLabel: "Download transparent wordmark",
    compactDownloadLabel: "Download wordmark",
    image: "/logo.avif",
    alt: "EndoCyclic Therapeutics wordmark",
    previewClass: "",
    phonePreview: "compact",
    previewShapeClass: "rounded-tr-[2.5rem] sm:rounded-tr-[3.5rem]",
    disclosure: "Use the mark without alteration or recoloring.",
    tabletClass: "sm:col-span-1 sm:row-start-2",
    layoutClass: "lg:col-span-6 lg:col-start-7 lg:row-start-1",
    shapeClass: "rounded-tr-[2.5rem] sm:rounded-tr-[3.5rem]",
    visualClass: "min-h-[13rem] sm:min-h-[15rem] lg:min-h-[13rem]",
    dark: false,
    compact: false,
  },
  {
    name: "Founder & CEO portrait",
    description: "High-resolution portrait of Dr. Tanya Petrossian, PhD, Founder and CEO of EndoCyclic Therapeutics.",
    usage: "High-resolution JPEG · 1164 × 1476 px",
    href: "/downloads/media/tanya-petrossian-endocyclic-v2.jpg",
    download: "tanya-petrossian-endocyclic-v2.jpg",
    downloadLabel: "Download high-resolution portrait (JPEG)",
    compactDownloadLabel: "Download asset",
    image: "/team/tanya-petrossian-v2.avif",
    alt: "Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics",
    previewClass: "object-cover object-top",
    phonePreview: "compact",
    previewShapeClass: "",
    disclosure: "Credit: EndoCyclic Therapeutics, Inc.",
    tabletClass: "sm:col-span-1 sm:row-start-2",
    layoutClass: "lg:col-span-3 lg:col-start-7 lg:row-start-2",
    shapeClass: "",
    visualClass: "min-h-[16rem] sm:min-h-[18rem] lg:min-h-[14rem]",
    dark: true,
    compact: true,
  },
  {
    name: "Portfolio architecture visual",
    description: "Conceptual overview of four therapeutic and diagnostic programs across two disease areas.",
    usage: "ZIP · AVIF + JPEG + use notes",
    href: "/downloads/media/endocyclic-portfolio-architecture.zip",
    download: "endocyclic-portfolio-architecture.zip",
    downloadLabel: "Download Portfolio architecture visual package (ZIP)",
    compactDownloadLabel: "Download visual package",
    image: "/illustrations/pipeline-portfolio-wide-v2.avif",
    alt: "Conceptual illustration of the EndoCyclic four-program portfolio architecture",
    previewClass: "object-contain object-center",
    phonePreview: "wide",
    previewShapeClass: "",
    disclosure: "Not clinical imagery or development-performance data.",
    tabletClass: "sm:col-span-2 sm:row-start-3",
    layoutClass: "lg:col-span-3 lg:col-start-10 lg:row-start-2",
    shapeClass: "rounded-br-[2rem] sm:rounded-br-[2.5rem]",
    visualClass: "aspect-[2/1] bg-paper sm:aspect-[2/1]",
    dark: true,
    compact: true,
  },
] as const;

const PROGRAM_VISUALS = [
  {
    name: "ENDO-205 mechanism visual",
    label: "Lead therapeutic",
    description:
      "Conceptual illustration of ENDO-205 moving from selective uptake and pH-mediated activation to the separately qualified preclinical lesion-elimination finding.",
    usage: "ZIP · AVIF + JPEG + use notes",
    href: "/downloads/media/endocyclic-endo-205-mechanism.zip",
    download: "endocyclic-endo-205-mechanism.zip",
    image: ENDO205_MECHANISM_IMAGE,
    alt: ENDO205_MECHANISM_ALT,
    disclosure:
      "The final state represents the ENDO-205 preclinical lesion-elimination finding; not a patient image, clinical scan, clinical outcome, safety data, or performance data.",
    tone: "bg-petal/45",
    labelClass: "text-rose-ink",
    frameClass: "rounded-tr-[3.5rem] sm:rounded-tr-[5rem]",
  },
  {
    name: "FemLUNA™ targeting visual",
    label: "Lead diagnostic",
    description:
      "Conceptual illustration of FemLUNA™, an IND-enabling targeted imaging agent developed for accurate, non-invasive detection of endometriosis.",
    usage: "ZIP · AVIF + JPEG + use notes",
    href: "/downloads/media/endocyclic-femluna-targeting.zip",
    download: "endocyclic-femluna-targeting.zip",
    image: "/illustrations/femluna-targeting-v3.avif",
    alt: "Conceptual editorial illustration of a targeted imaging agent localizing near a small endometriosis lesion within simplified pelvic anatomy.",
    disclosure:
      "Conceptual representation; FemLUNA™ is IND-enabling. Not a patient image, clinical scan, observed detection result, or performance data.",
    tone: "bg-tint-teal/65",
    labelClass: "text-teal-ink",
    frameClass: "rounded-bl-[3.5rem] sm:rounded-bl-[5rem]",
  },
] as const;

const MEDIA_SHORTCUTS = [
  { label: "Copy approved language", href: "#boilerplate" },
  { label: "Browse web assets", href: "#assets" },
  { label: "Review scientific visuals", href: "#program-visuals" },
  { label: "Open press contact", href: "#media-contact" },
] as const;

function MediaHeroVisual() {
  return (
    <div className="relative flex min-h-[27rem] flex-col overflow-hidden bg-plum p-7 text-on-dark sm:min-h-[24rem] sm:p-10 lg:min-h-[30rem] lg:p-12">
      <div aria-hidden className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-line-on-dark" />
      <div aria-hidden className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose/10" />

      <div className="relative flex items-center justify-between gap-5 border-b border-line-on-dark pb-5 text-xs text-muted-on-dark">
        <span>Press desk</span>
        <span>Irvine, California</span>
      </div>

      <div className="relative my-7 grid flex-1 grid-cols-7 grid-rows-6 gap-2 sm:grid-rows-5 sm:gap-3">
        <div className="relative col-span-4 row-span-2 flex items-center justify-center overflow-hidden rounded-br-2xl bg-paper px-5 sm:px-7">
          <Image
            src="/logo.avif"
            alt="EndoCyclic Therapeutics"
            width={233}
            height={70}
            className="h-auto w-full max-w-[233px]"
          />
        </div>
        <div className="relative col-span-3 row-span-3 overflow-hidden rounded-t-[4rem] bg-peony">
          <Image
            src="/team/tanya-petrossian-v2.avif"
            alt="Dr. Tanya Petrossian, Founder and CEO"
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw"
            className="object-cover object-center"
          />
          <span
            aria-hidden
            className="absolute left-3 top-3 hidden rounded-full bg-plum/82 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-on-dark sm:inline-flex"
          >
            Founder &amp; CEO
          </span>
        </div>
        <div className="relative col-span-4 row-span-4 overflow-hidden rounded-tl-2xl bg-tint-warm sm:row-span-3">
          <Image
            src={ENDO205_PORTFOLIO_IMAGE}
            alt="Compact conceptual EndoCyclic sequence showing lesion contact, selective uptake, pH-mediated activation, intracellular target engagement, and a separate receding-lesion state representing the ENDO-205 preclinical lesion-elimination finding"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1280px) 29vw, (min-width: 1024px) 24vw, 54vw"
            className="object-cover object-center"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/92 via-plum/78 via-65% to-transparent px-4 pb-3 pt-10 text-on-dark">
            <span className="block text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="sm:hidden">Mechanism</span>
              <span className="hidden sm:inline">Platform + ENDO-205 evidence</span>
            </span>
            <span className="mt-1 block text-[0.65rem] leading-tight text-on-dark/88">
              Evidence 04 · ENDO-205 preclinical
            </span>
          </span>
        </div>
        <div className="relative col-span-3 row-span-3 overflow-hidden rounded-bl-2xl bg-tint-teal sm:row-span-2">
          <Image
            src="/illustrations/pipeline-portfolio-wide-v2.avif"
            alt="Conceptual EndoCyclic portfolio architecture"
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw"
            className="object-cover object-center"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/92 via-plum/78 via-60% to-transparent px-2 pb-3 pt-8 text-xs font-semibold uppercase tracking-[0.12em] text-on-dark sm:px-4">
            Portfolio
          </span>
        </div>
      </div>

      <dl className="relative grid gap-5 border-t border-line-on-dark pt-5 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-muted-on-dark">Company stage</dt>
          <dd className="mt-1 font-medium text-on-dark">Clinical-stage</dd>
        </div>
        <div>
          <dt className="text-muted-on-dark">Lead program</dt>
          <dd className="mt-1 font-medium text-on-dark">ENDO-205 · Phase 1</dd>
        </div>
        <div>
          <dt className="text-muted-on-dark">Media contact</dt>
          <dd className="mt-1 min-w-0 font-medium text-on-dark [overflow-wrap:anywhere]">
            {SITE.email || "Media inquiry form"}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function MediaQuickIndex() {
  return (
    <nav
      aria-label="Media resource shortcuts"
      className="border-y border-line bg-surface"
    >
      <Container>
        <ul className="grid list-none grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {MEDIA_SHORTCUTS.map((item) => (
            <li key={item.href} className="bg-surface">
              <a
                href={item.href}
                className="group relative flex min-h-20 items-center justify-between gap-4 overflow-hidden px-4 py-4 text-sm font-semibold leading-snug text-ink sm:min-h-24 sm:px-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
                <span className="relative transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                  {item.label}
                </span>
                <ArrowDownRight
                  aria-hidden
                  size={16}
                  className="relative shrink-0 text-teal-ink transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

function PressSheet() {
  return (
    <Section tone="paper" size="proof">
      <Container
        id="boilerplate"
        tabIndex={-1}
        role="region"
        aria-labelledby="boilerplate-title"
        className="outline-none"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Approved language</Eyebrow>
            <h2 id="boilerplate-title" className="t-h2 mt-4 max-w-2xl text-ink">
              The company story, ready for accurate coverage.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            A concise boilerplate and the core facts most often needed by journalists,
            editors, and event partners.
          </p>
        </div>

        <div className="mt-10 grid border-y border-line sm:mt-12 lg:grid-cols-12">
          <Reveal className="py-8 lg:col-span-7 lg:border-r lg:border-line lg:py-10 lg:pr-12">
            <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
              <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-ink">
                Approved boilerplate
              </p>
              <BoilerplateActions text={APPROVED_BOILERPLATE} />
            </div>
            <div
              data-boilerplate-body
              className="mt-6 max-w-[58ch] space-y-4 border-l border-rose pl-5 sm:mt-7 sm:pl-7"
            >
              {APPROVED_BOILERPLATE_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  data-boilerplate-paragraph
                  className="text-base leading-[1.65] text-ink-body"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div id="facts" className="py-8 lg:col-span-5 lg:py-10 lg:pl-12">
            <Reveal delay={0.08}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-ink">
                Key facts
              </p>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {KEY_FACTS.map((fact) => (
                  <div key={fact.label} className="py-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Source notes
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <EvidenceNote
                    flush
                    reference={{
                      basis: "company",
                      label: "FDA IND Allowance announcement",
                      href: EVIDENCE_LINKS.fdaAnnouncement,
                    }}
                  />
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
                      label: "Disease-burden figures",
                    }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BrandAssets() {
  return (
    <Section tone="tint-plum" size="chapter">
      <Container
        id="assets"
        tabIndex={-1}
        role="region"
        aria-labelledby="assets-title"
        className="outline-none"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Media assets</Eyebrow>
            <h2 id="assets-title" className="t-h2 mt-5 max-w-2xl text-ink">
              Approved web assets, ready to download.
            </h2>
          </div>
          <div className="max-w-lg lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              Scientific visuals include AVIF and JPEG files, publication
              caption, and required qualification in one ZIP package. Brand and
              leadership files remain native-size web assets.
            </p>
            <Button
              href={`/downloads/media/${mediaKitRelease.archiveName}.zip`}
              download={`${mediaKitRelease.archiveName}.zip`}
              variant="ghost"
              className="mt-5"
            >
              Download complete web kit
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Web kit v{mediaKitRelease.version} · released{" "}
              {mediaKitRelease.releaseLabel}. Bundle release only; not a
              regulatory review or product approval.
            </p>
          </div>
        </div>

        <ul
          data-media-asset-index
          className="mt-14 grid list-none items-stretch gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:gap-3"
        >
          {MEDIA_ASSETS.map((asset, index) => (
            <Reveal
              as="li"
              delay={Math.min(index * 0.04, 0.12)}
              key={asset.name}
              className={`group min-w-0 ${asset.tabletClass} ${asset.layoutClass}`}
            >
              <article
                data-tone={asset.dark ? "dark" : undefined}
                data-media-asset-card
                data-phone-preview={asset.phonePreview}
                className={`relative isolate h-full min-w-0 border border-line sm:flex sm:flex-col ${
                  asset.phonePreview === "wide"
                    ? "flex flex-col"
                    : "grid grid-cols-[7rem_minmax(0,1fr)]"
                } ${
                  asset.dark ? "bg-plum text-on-dark" : "bg-surface text-ink"
                } ${asset.shapeClass}`}
              >
                <div
                  data-media-asset-visual
                  className={`relative min-h-0 overflow-hidden ${
                    asset.phonePreview === "wide"
                      ? "sm:flex-none"
                      : "sm:flex-1"
                  } ${asset.visualClass} ${asset.previewShapeClass}`}
                >
                  {asset.name === "Primary wordmark" ? (
                    <div
                      data-native-size="233x70"
                      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(164,112,137,0.08),transparent_58%)] px-6"
                    >
                      <div className="relative w-full max-w-[233px]">
                        <Image
                          src={asset.image}
                          alt={asset.alt}
                          width={233}
                          height={70}
                          className="h-auto w-full"
                        />
                        <span
                          aria-hidden
                          className="absolute -inset-x-3 -inset-y-4 border-x border-line/60"
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={asset.image}
                      alt={asset.alt}
                      fill
                      sizes={
                        asset.name === "Platform sequence + ENDO-205 evidence"
                          ? "(min-width: 1024px) 48vw, (min-width: 640px) 88vw, 94vw"
                          : asset.name === "Portfolio architecture visual"
                            ? "(min-width: 1024px) 24vw, (min-width: 640px) 88vw, 94vw"
                            : "(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw"
                      }
                      className={asset.previewClass}
                    />
                  )}
                  <span
                    aria-hidden
                    className={`absolute inset-0 ${
                      asset.dark
                        ? "bg-gradient-to-t from-plum/45 via-transparent to-transparent"
                        : "bg-gradient-to-t from-paper/55 via-transparent to-transparent"
                    }`}
                  />
                </div>

                <div
                  data-media-asset-copy
                  className={`relative z-10 p-5 sm:p-7 ${
                    asset.name === "Platform sequence + ENDO-205 evidence"
                      ? "flex-none sm:flex-[1_0_auto]"
                      : "flex-none"
                  } ${
                    asset.phonePreview === "wide"
                      ? "border-t"
                      : "border-l sm:border-l-0 sm:border-t"
                  } ${
                    asset.dark ? "border-line-on-dark" : "border-line"
                  } ${
                    asset.dark ? "text-on-dark" : "text-ink"
                  } ${asset.compact ? "lg:p-5" : "lg:p-8"}`}
                >
                  <p
                    className={`text-xs ${
                      asset.dark ? "text-teal-on-dark" : "text-rose-ink"
                    }`}
                  >
                    {asset.usage}
                  </p>
                  <h3
                    className={`mt-3 font-medium leading-tight tracking-[-0.025em] sm:mt-4 ${
                      asset.compact ? "text-xl" : "text-[clamp(1.35rem,2.4vw,2rem)]"
                    }`}
                  >
                    {asset.name}
                  </h3>
                  <p
                    className={`mt-3 max-w-xl text-sm leading-relaxed ${
                      asset.dark ? "text-muted-on-dark" : "text-muted"
                    }`}
                  >
                    {asset.description}
                  </p>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      asset.dark ? "text-muted-on-dark" : "text-muted"
                    } ${asset.compact ? "lg:leading-snug" : ""}`}
                  >
                    {asset.disclosure}
                  </p>
                  <a
                    href={asset.href}
                    download={asset.download}
                    aria-label={
                      asset.compact
                        ? `${asset.compactDownloadLabel}: ${asset.downloadLabel}`
                        : asset.downloadLabel
                    }
                    className={`mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 ${
                      asset.dark
                        ? "text-teal-on-dark focus-visible:outline-teal-on-dark"
                        : "text-teal-ink focus-visible:outline-teal-ink"
                    }`}
                  >
                    {asset.compact ? (
                      <>
                        <span className="lg:hidden">{asset.downloadLabel}</span>
                        <span aria-hidden className="hidden lg:inline">
                          {asset.compactDownloadLabel}
                        </span>
                      </>
                    ) : (
                      asset.downloadLabel
                    )}
                    <Download
                      aria-hidden
                      size={16}
                      className="transition-transform duration-300 ease-soft group-hover:translate-y-0.5 group-focus-within:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <section
          id="program-visuals"
          tabIndex={-1}
          aria-labelledby="program-visuals-title"
          className="mt-16 border-t border-line pt-10 outline-none sm:mt-20 sm:pt-12"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Program visuals</Eyebrow>
              <h3
                id="program-visuals-title"
                className="t-h2 mt-5 max-w-2xl text-ink"
              >
                Program-specific artwork, packaged for accurate coverage.
              </h3>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
              Each package keeps the source visual, publication caption,
              qualification, alt text, and integrity checks together.
            </p>
          </div>

          <ol className="mt-10 list-none overflow-hidden border-y border-line sm:mt-12">
            {PROGRAM_VISUALS.map((asset, index) => (
              <Reveal
                as="li"
                key={asset.name}
                delay={index * 0.05}
                className={index > 0 ? "border-t border-line" : undefined}
              >
                <article
                  className={`group grid min-w-0 md:grid-cols-12 md:items-stretch ${asset.tone}`}
                >
                  <div
                    data-program-asset-copy
                    className={`flex min-w-0 flex-col justify-between px-6 py-8 sm:px-9 sm:py-10 md:col-span-6 md:px-8 lg:col-span-5 lg:px-12 lg:py-14 ${
                      index % 2 === 1
                        ? "md:col-start-1 md:row-start-1"
                        : "md:col-start-7 lg:col-start-8"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.15em] ${asset.labelClass}`}
                        >
                          {asset.label}
                        </p>
                        <p className="text-xs text-muted">{asset.usage}</p>
                      </div>
                      <h4 className="t-h3 mt-5 max-w-md text-ink">
                        {asset.name}
                      </h4>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                        {asset.description}
                      </p>
                      <p className="mt-4 max-w-lg text-xs leading-relaxed text-muted">
                        {asset.disclosure}
                      </p>
                    </div>

                    <a
                      href={asset.href}
                      download={asset.download}
                      aria-label={`Download program visual package: ${asset.name} (ZIP)`}
                      className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                    >
                      Download program visual package
                      <Download
                        aria-hidden
                        size={16}
                        className="transition-transform duration-300 ease-soft group-hover:translate-y-0.5 group-focus-within:translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </a>
                  </div>

                  <div
                    data-program-asset-visual
                    className={`relative aspect-[3/2] min-h-0 overflow-hidden md:col-span-6 md:row-start-1 md:aspect-auto md:min-h-[25rem] lg:col-span-7 ${
                      index % 2 === 1
                        ? "md:col-start-7 lg:col-start-6"
                        : "md:col-start-1"
                    } ${asset.frameClass}`}
                  >
                    <Image
                      src={asset.image}
                      alt={asset.alt}
                      fill
                      sizes="(min-width: 1184px) 650px, (min-width: 1024px) 58vw, (min-width: 768px) 50vw, 94vw"
                      className="object-cover object-center transition-transform duration-700 ease-soft group-hover:scale-[1.015] group-focus-within:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </section>

        <div
          role="group"
          aria-labelledby="asset-request-title"
          className="mt-10 grid gap-7 border-y border-line py-7 sm:py-8 lg:grid-cols-12 lg:items-center"
        >
          <div className="min-w-0 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
              Asset requests
            </p>
            <h3 id="asset-request-title" className="t-h3 mt-3 text-ink">
              Need another file format?
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Use the media inquiry form to ask about source, vector, or
              print-ready formats. Include the intended use and required format;
              availability is confirmed case by case.
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-3 lg:col-span-4 lg:col-start-9 lg:items-end">
            <Button href={MEDIA_ASSET_CONTACT_HREF}>
              Request an alternate format
            </Button>
            {SITE.email ? (
              <p className="min-w-0 text-sm leading-relaxed text-muted [overflow-wrap:anywhere] lg:text-right">
                Prefer email?{" "}
                <a
                  className="prose-link min-w-0 font-medium text-teal-ink [overflow-wrap:anywhere]"
                  href={`mailto:${SITE.email}?subject=Press%20asset%20format%20request`}
                >
                  {SITE.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MediaContact() {
  return (
    <Section tone="plum" size="proof">
      <Container
        id="media-contact"
        tabIndex={-1}
        role="region"
        aria-labelledby="media-contact-title"
        className="outline-none"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="dark">Media contact</Eyebrow>
            <h2
              id="media-contact-title"
              className="t-h2 mt-5 max-w-3xl !text-on-dark"
            >
              Need context, confirmation, or an interview?
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-on-dark sm:text-base">
              Use the media inquiry form for interview requests, fact checks, and
              publication questions. Include your outlet and deadline when relevant.
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-3 lg:col-span-4 lg:items-end">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={MEDIA_CONTACT_HREF}>Send a media inquiry</Button>
              <Button href="/news" variant="ghost-on-dark">
                Review sourced news
              </Button>
            </div>
            {SITE.email ? (
              <p className="min-w-0 text-sm leading-relaxed text-muted-on-dark [overflow-wrap:anywhere] lg:text-right">
                Prefer email?{" "}
                <a
                  href={`mailto:${SITE.email}?subject=Media%20inquiry`}
                  className="prose-link min-w-0 font-medium text-teal-on-dark [overflow-wrap:anywhere]"
                >
                  {SITE.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function MediaPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Press resources"
        title="Accurate company information, ready to use."
        titleClassName="max-w-[19ch]"
        intro="Approved boilerplate, key facts, brand asset guidance, leadership imagery, and a direct route to the EndoCyclic team."
        actions={
          <>
            <Button href={MEDIA_CONTACT_HREF}>Contact the press desk</Button>
            <Button href="#assets" variant="ghost">Browse approved assets</Button>
          </>
        }
        proof="Clinical-stage precision medicine · Irvine, California"
        tone="tint-warm"
        layout="balanced"
        frame="plain"
        visualAspect="auto"
        visualClassName="min-h-[27rem] bg-plum sm:min-h-[24rem] lg:min-h-[30rem]"
        titleMotion={false}
        visualAs="aside"
        visualLabel="Press reference facts"
      >
        <MediaHeroVisual />
      </PageHero>
      <MediaQuickIndex />
      <PressSheet />
      <BrandAssets />
      <MediaContact />
    </main>
  );
}
