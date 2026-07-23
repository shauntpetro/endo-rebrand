import Image from "next/image";
import { Download } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import { SITE } from "@/lib/site";

const KEY_FACTS = [
  { label: "Based in", value: "Irvine, California" },
  { label: "Stage", value: "Clinical-stage precision medicine company" },
  { label: "Lead therapeutic", value: "ENDO-205 · FDA IND Allowance (2026) · Phase 1" },
  { label: "Lead diagnostic", value: "FemLUNA™ · IND-enabling" },
  { label: "Platform", value: "Therapeutics, diagnostics, and oncology" },
  { label: "Disease burden", value: "190M+ women worldwide · $200B annual US burden" },
] as const;

const MEDIA_ASSETS = [
  {
    name: "Primary wordmark",
    description: "The current digital wordmark for use on light, quiet backgrounds.",
    usage: "AVIF · 233 × 70 px",
    href: "/logo.avif",
    download: "endocyclic-wordmark.avif",
    image: "/logo.avif",
    alt: "EndoCyclic Therapeutics wordmark",
    previewClass: "object-contain p-8 sm:p-10",
    disclosure: "Use the mark without alteration or recoloring.",
  },
  {
    name: "Founder & CEO portrait",
    description: "Dr. Tanya Petrossian, PhD, Founder and CEO of EndoCyclic Therapeutics.",
    usage: "AVIF · 291 × 369 px",
    href: "/team/tanya-petrossian.avif",
    download: "tanya-petrossian-endocyclic.avif",
    image: "/team/tanya-petrossian.avif",
    alt: "Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics",
    previewClass: "object-cover object-top",
    disclosure: "Credit: EndoCyclic Therapeutics, Inc.",
  },
  {
    name: "Platform mechanism visual",
    description: "Conceptual illustration of pH-mediated activation and selective uptake by diseased tissue.",
    usage: "AVIF · 1774 × 887 px",
    href: "/illustrations/selective-mechanism-v2.avif",
    download: "endocyclic-platform-mechanism.avif",
    image: "/illustrations/selective-mechanism-v2.avif",
    alt: "Conceptual illustration of the EndoCyclic selective peptide mechanism",
    previewClass: "object-cover object-center",
    disclosure: "Conceptual representation; not clinical imagery.",
  },
  {
    name: "Portfolio architecture visual",
    description: "Conceptual overview of four therapeutic and diagnostic programs across two disease areas.",
    usage: "AVIF · 1774 × 887 px",
    href: "/illustrations/pipeline-portfolio-wide-v1.avif",
    download: "endocyclic-portfolio-architecture.avif",
    image: "/illustrations/pipeline-portfolio-wide-v1.avif",
    alt: "Conceptual illustration of the EndoCyclic four-program portfolio architecture",
    previewClass: "object-cover object-center",
    disclosure: "Not clinical imagery or development-performance data.",
  },
] as const;

function MediaHeroVisual() {
  return (
    <div className="relative flex min-h-[27rem] flex-col overflow-hidden bg-plum p-7 text-on-dark sm:min-h-[30rem] sm:p-10 lg:p-12">
      <div aria-hidden className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-line-on-dark" />
      <div aria-hidden className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose/10" />

      <div className="relative flex items-center justify-between gap-5 border-b border-line-on-dark pb-5 text-xs text-muted-on-dark">
        <span>Press desk</span>
        <span>Irvine, California</span>
      </div>

      <div className="relative my-7 grid flex-1 grid-cols-7 grid-rows-5 gap-2 sm:gap-3">
        <div className="relative col-span-4 row-span-2 overflow-hidden rounded-br-2xl bg-paper">
          <Image
            src="/logo.avif"
            alt="EndoCyclic Therapeutics"
            fill
            sizes="260px"
            className="object-contain px-6 py-2 sm:px-8 sm:py-3"
          />
        </div>
        <div className="relative col-span-3 row-span-3 overflow-hidden rounded-t-[4rem] bg-peony">
          <Image
            src="/team/tanya-petrossian.avif"
            alt="Dr. Tanya Petrossian, Founder and CEO"
            fill
            sizes="220px"
            className="object-cover object-center"
          />
          <span className="absolute left-3 top-3 rounded-full bg-plum/82 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.11em] text-on-dark">
            Founder &amp; CEO
          </span>
        </div>
        <div className="relative col-span-4 row-span-3 overflow-hidden rounded-tl-2xl bg-tint-warm">
          <Image
            src="/illustrations/selective-mechanism-v2.avif"
            alt="Conceptual EndoCyclic selective peptide mechanism"
            fill
            sizes="300px"
            className="object-cover object-center"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/75 to-transparent px-4 pb-3 pt-9 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-on-dark">
            Platform mechanism
          </span>
        </div>
        <div className="relative col-span-3 row-span-2 overflow-hidden rounded-bl-2xl bg-tint-teal">
          <Image
            src="/illustrations/pipeline-portfolio-wide-v1.avif"
            alt="Conceptual EndoCyclic portfolio architecture"
            fill
            sizes="220px"
            className="object-cover object-center"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/75 to-transparent px-3 pb-3 pt-8 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-on-dark sm:px-4">
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
          <dd className="mt-1 font-medium text-on-dark">{SITE.email}</dd>
        </div>
      </dl>
    </div>
  );
}

function PressSheet() {
  return (
    <Section tone="paper" size="chapter">
      <Container id="boilerplate" className="scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Approved language</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              The company story, ready for accurate coverage.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            A concise boilerplate and the core facts most often needed by journalists,
            editors, and event partners.
          </p>
        </div>

        <div className="mt-14 grid border-y border-line lg:grid-cols-12">
          <Reveal className="py-9 lg:col-span-7 lg:border-r lg:border-line lg:py-12 lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-ink">
              Approved boilerplate
            </p>
            <p className="mt-7 text-lg leading-[1.75] text-ink-body">
              EndoCyclic Therapeutics, Inc. is a clinical-stage precision medicine company
              based in Irvine, California, founded by Dr. Tanya Petrossian, PhD. The company
              is advancing a proprietary precision peptide platform with pH-mediated
              activation and selective uptake by diseased tissue. Its lead therapeutic,
              ENDO-205, is a first-in-class, non-hormonal precision peptide therapeutic for
              endometriosis in Phase 1 following FDA IND Allowance in 2026. Its lead
              diagnostic, FemLUNA™, is an IND-enabling targeted imaging agent designed as a
              non-invasive alternative to laparoscopy. The platform spans therapeutics,
              diagnostics, and oncology. EndoCyclic is a founding member of the Milken
              Institute Women’s Health Network.
            </p>
          </Reveal>

          <div id="facts" className="py-9 lg:col-span-5 lg:py-12 lg:pl-12">
            <Reveal delay={0.08}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-ink">
                Key facts
              </p>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {KEY_FACTS.map((fact) => (
                  <div key={fact.label} className="py-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
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
      <Container id="assets" className="scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Publication assets</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Approved digital assets, ready to download.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            Download the current web-ready files below. Contact the press desk for alternate
            formats, print production, or use beyond editorial coverage.
          </p>
        </div>

        <ol className="mt-14 grid list-none border-y border-line md:grid-cols-2">
          {MEDIA_ASSETS.map((asset, index) => (
            <Reveal
              as="li"
              delay={(index % 2) * 0.04}
              key={asset.name}
              className="group border-b border-line py-7 md:px-8 md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold tracking-[0.16em] text-rose-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-xs text-muted">{asset.usage}</p>
              </div>
              <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-bl-2xl rounded-tr-2xl border border-line bg-surface">
                <Image
                  src={asset.image}
                  alt={asset.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 94vw"
                  className={asset.previewClass}
                />
              </div>
              <h3 className="t-h3 mt-6 text-ink">{asset.name}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {asset.description}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{asset.disclosure}</p>
              <a
                href={asset.href}
                download={asset.download}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
              >
                Download asset
                <Download aria-hidden size={16} className="transition-transform duration-300 ease-soft group-hover:translate-y-0.5" />
              </a>
            </Reveal>
          ))}
        </ol>

        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted">
          Need SVG, transparent-background, or print-ready files? Email{" "}
          <a className="link-underline font-medium text-teal-ink" href={`mailto:${SITE.email}?subject=Press%20asset%20format%20request`}>
            {SITE.email}
          </a>
          {" "}with the intended use.
        </p>
      </Container>
    </Section>
  );
}

function MediaContact() {
  return (
    <Section tone="plum" size="proof">
      <Container id="media-contact" className="scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="dark">Media contact</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-3xl !text-on-dark">
              Need context, confirmation, or an interview?
            </h2>
            <a
              href={`mailto:${SITE.email}?subject=Media%20inquiry`}
              className="link-underline mt-7 inline-flex min-h-12 items-center text-[clamp(1.15rem,2vw,1.55rem)] font-medium text-teal-on-dark"
            >
              {SITE.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button href="/news" variant="ghost-on-dark">Read company news</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function MediaPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Press resources"
        title="Accurate company information, ready to use."
        titleClassName="max-w-[19ch]"
        intro="Approved boilerplate, key facts, brand asset guidance, leadership imagery, and a direct route to the EndoCyclic team."
        actions={
          <>
            <Button href="#assets">
              Download assets
            </Button>
            <Button href="#boilerplate" variant="ghost">Approved boilerplate</Button>
          </>
        }
        proof="Clinical-stage precision medicine · Irvine, California"
        tone="tint-warm"
        layout="editorial"
        frame="plain"
        visualAspect="auto"
        visualClassName="min-h-[27rem] bg-plum sm:min-h-[30rem]"
        visualAs="aside"
        visualLabel="Press reference facts"
      >
        <MediaHeroVisual />
      </PageHero>
      <PressSheet />
      <BrandAssets />
      <MediaContact />
    </main>
  );
}
