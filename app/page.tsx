import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import ArtDirectedImage from "@/components/site/ArtDirectedImage";
import HomeDesktopMotion from "@/components/figures/HomeDesktopMotion";
import HomeNarrativeThread from "@/components/figures/HomeNarrativeThread";
import HomeBurdenHorizon from "@/components/figures/HomeBurdenHorizon";
import HomeMechanismCanvas from "@/components/figures/HomeMechanismCanvas";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";
import HomePortfolioField from "@/components/figures/HomePortfolioField";
import HomeEvidenceDossier from "@/components/figures/HomeEvidenceDossier";
import { PARTNERSHIP_CONTACT_HREF } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function ChapterLabel({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] md:text-xs md:tracking-[0.16em] ${
        tone === "dark" ? "text-teal-on-dark" : "text-rose-ink"
      }`}
    >
      <span
        data-home-chapter-marker
        aria-hidden
        className="chapter-thread-mark md:-ml-10"
      >
        <span />
      </span>
      <span>{children}</span>
    </p>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper pt-20 md:pt-24">
      <Container className="relative z-10 md:pb-14">
        <div className="grid min-h-[34rem] items-center md:min-h-[42rem] md:grid-cols-12">
          <div className="hero-copy-enter relative z-10 pb-10 pt-10 md:col-span-6 md:py-16">
            <div data-hero-step="eyebrow">
              <Eyebrow className="text-sm md:text-xs">Clinical-stage precision medicine</Eyebrow>
            </div>
            <h1 data-hero-step="title" className="t-hero mt-6 max-w-2xl text-ink">
              Precision peptides, activated through pH.
            </h1>
            <p data-hero-step="intro" className="t-lead mt-6 max-w-xl">
              EndoCyclic develops non-hormonal precision peptides designed for
              selective uptake by diseased tissue across therapeutic and
              diagnostic programs in endometriosis and oncology.
            </p>
            <div data-hero-step="actions" className="mt-8 flex flex-wrap gap-3">
              <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
              <Button href="/pipeline#endo-205" variant="ghost">Review ENDO-205</Button>
            </div>
          </div>

          <figure className="hero-visual-enter -mx-5 md:absolute md:-top-24 md:bottom-0 md:left-[calc(50%_-_50vw)] md:right-[calc(50%_-_50vw)] md:mx-0">
            <div className="hero-visual-frame relative aspect-[4/3] overflow-hidden md:absolute md:inset-0 md:aspect-auto">
              <ArtDirectedImage
                desktopSrc="/illustrations/hero-home-v8.avif"
                mobileSrc="/illustrations/hero-home-mobile-v8.avif"
                alt="Conceptual platform illustration of selective uptake through an endocytic pathway and pH-mediated activation. The intact peptide remains visible within diseased tissue before a separate final state shows the same lesion receding to represent the ENDO-205 preclinical lesion-elimination finding."
                describedBy="home-hero-disclosure"
                priority
                sizes="100vw"
                mobileSizes="100vw"
                className="object-cover object-center md:object-[70%_center]"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 hidden w-[66%] bg-gradient-to-r from-paper via-paper/95 to-transparent md:block"
              />
            </div>
            <figcaption
              id="home-hero-disclosure"
              className="px-5 pt-4 text-sm leading-relaxed text-muted md:absolute md:bottom-5 md:z-10 md:max-w-3xl md:px-0 md:pt-0 md:text-xs"
              style={{ left: "max(1.25rem, calc((100vw - 74rem) / 2 + 3rem))" }}
            >
              Conceptual platform sequence through selective uptake and
              pH-mediated activation. A separate final state represents the
              ENDO-205 preclinical lesion-elimination finding; not clinical
              imagery, outcome data, or restored-tissue histology.
            </figcaption>
          </figure>
        </div>

        <div
          data-hero-proof
          className="relative grid overflow-hidden border-y border-line bg-paper/92 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
        >
          <div className="flex min-h-[5.5rem] items-center gap-4 border-b border-line px-5 py-4 sm:border-b-0 sm:px-6">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Clinical threshold
              </p>
              <p className="mt-1 text-base font-medium text-ink">ENDO-205</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 divide-x divide-line sm:border-l sm:border-line">
            <div className="flex min-h-[5.5rem] min-w-0 flex-col justify-center px-4 py-4 sm:px-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink">
                Regulatory
              </dt>
              <dd className="mt-1 text-sm font-medium leading-snug text-ink sm:text-base">
                FDA IND Allowance
                <span className="mt-0.5 block text-xs font-normal text-muted">
                  2026
                </span>
              </dd>
            </div>
            <div className="flex min-h-[5.5rem] min-w-0 flex-col justify-center px-4 py-4 sm:px-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-ink">
                Current stage
              </dt>
              <dd className="mt-1 text-base font-medium text-ink">Phase 1</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Burden() {
  return (
    <Section tone="paper" size="chapter" className="relative overflow-hidden">
      <Container className="relative z-20">
        <Reveal className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <ChapterLabel>The unmet need</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-xl text-ink">The scale is global. The wait is personal.</h2>
          </div>
          <p className="t-lead max-w-xl self-end md:col-span-5 md:col-start-8">
            Current therapies are largely hormone-based and symptomatic; they do not eliminate lesions or modify disease biology.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <HomeBurdenHorizon />
        </Reveal>
        <div className="mt-7">
          <Button href="/impact" variant="quiet" className="min-h-11">Understand the disease burden</Button>
        </div>
      </Container>
    </Section>
  );
}

function Mechanism() {
  return (
    <Section tone="tint-teal" size="chapter" className="relative overflow-hidden">
      <Container className="relative z-20">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <ChapterLabel>The platform</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Target. Enter. Activate. Evidence.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted md:col-span-4 md:col-start-9">
            The intact peptide remains visible within diseased tissue through
            the conceptual sequence. Separately, ENDO-205 preclinical studies
            demonstrated elimination of endometriosis lesions and associated
            inflammation.
          </p>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <HomeMechanismCanvas />
        </Reveal>
        <div className="mt-7">
          <Button href="/innovation" variant="quiet" className="min-h-11">Explore the mechanism</Button>
        </div>
      </Container>
    </Section>
  );
}

function Portfolio() {
  return (
    <Section tone="tint-plum" size="chapter" className="relative overflow-hidden">
      <Container className="relative z-20">
        <Reveal className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <ChapterLabel>The portfolio</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-xl text-ink">One platform branches into four precision programs.</h2>
          </div>
          <p className="t-lead max-w-xl self-end md:col-span-5 md:col-start-8">
            The portfolio combines an endometriosis therapeutic and targeted
            imaging agent with a matched oncology therapeutic and companion
            diagnostic.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <HomePortfolioField />
        </Reveal>
        <div className="mt-8">
          <Button href="/pipeline" variant="quiet" className="min-h-11">Review the full pipeline</Button>
        </div>
      </Container>
    </Section>
  );
}

function Evidence() {
  return (
    <Section tone="paper" size="chapter" className="relative overflow-hidden">
      <Container className="relative z-20">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-6">
            <ChapterLabel>Validation &amp; next steps</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-xl text-ink">
              Beyond the development-stage label.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted md:col-span-5 md:col-start-8">
            NIH recognition, institutional relationships, and the Fast Track
            filing underway add context to the clinical-stage lead program.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <HomeEvidenceDossier />
        </Reveal>
      </Container>
    </Section>
  );
}

function NewsMedia() {
  return (
    <Section tone="plum" size="chapter" className="relative overflow-hidden">
      <Container className="relative z-20">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <ChapterLabel tone="dark">News &amp; media</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-2xl !text-on-dark">
              Milestones and recognition, at the source.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted-on-dark md:col-span-4 md:col-start-9">
            A selected record of company milestones and institutional recognition,
            with approved resources for accurate coverage.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <HomeNewsMedia />
        </Reveal>
      </Container>
    </Section>
  );
}

function Closing() {
  return (
    <Section tone="tint-warm" size="proof" className="relative overflow-hidden border-t border-line">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-7">
            <ChapterLabel>Partnering</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">Advance selective precision medicine with us.</h2>
            <p className="mt-5 max-w-xl text-muted">
              Connect with EndoCyclic about strategic partnerships, investment, or access to the diligence process.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={PARTNERSHIP_CONTACT_HREF}>Discuss a partnership</Button>
              <Button href="/investors#data-room" variant="ghost">Request data-room access</Button>
            </div>
          </div>

          <figure
            data-home-founder-closing
            className="flex min-w-0 max-w-full flex-wrap items-end gap-4 md:col-span-6 md:col-start-7 md:justify-end lg:col-span-5 lg:col-start-8 lg:gap-5"
          >
            <div className="relative aspect-[4/5] w-[144px] shrink-0 overflow-hidden rounded-b-2xl rounded-t-[999px] bg-peony shadow-[0_20px_55px_rgb(57_38_56/0.09)] sm:w-[176px] lg:w-[192px]">
              <Image
                src="/team/tanya-petrossian-v2.avif"
                alt="Dr. Tanya Petrossian, founder and CEO of EndoCyclic Therapeutics"
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 144px"
                className="object-cover object-top"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-plum/12 to-transparent" />
            </div>
            <figcaption className="min-w-[7.5rem] max-w-full flex-1 border-l border-line pb-2 pl-4 lg:pl-5">
              <p className="font-medium leading-snug text-ink">Dr. Tanya Petrossian, PhD</p>
              <p className="mt-2 text-sm text-muted">Founder &amp; CEO</p>
              <span aria-hidden className="mt-5 block h-8 w-px bg-gold" />
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <div id="home-narrative" className="relative">
        <HomeDesktopMotion rootId="home-narrative" />
        <HomeNarrativeThread />
        <Burden />
        <Mechanism />
        <Portfolio />
        <Evidence />
        <NewsMedia />
        <Closing />
      </div>
    </main>
  );
}
