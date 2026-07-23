import Image from "next/image";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import HomeNarrativeThread from "@/components/figures/HomeNarrativeThread";
import HomeBurdenHorizon from "@/components/figures/HomeBurdenHorizon";
import HomeMechanismCanvas from "@/components/figures/HomeMechanismCanvas";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";
import HomePortfolioField from "@/components/figures/HomePortfolioField";
import HomeEvidenceDossier from "@/components/figures/HomeEvidenceDossier";

function ChapterLabel({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] md:text-[0.7rem] md:tracking-[0.16em] ${
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
              <Eyebrow className="text-sm md:text-[0.72rem]">Clinical-stage precision medicine</Eyebrow>
            </div>
            <h1 data-hero-step="title" className="t-hero mt-6 max-w-2xl text-ink">
              Precision medicine, activated by disease.
            </h1>
            <p data-hero-step="intro" className="t-lead mt-6 max-w-xl">
              EndoCyclic develops non-hormonal precision peptides designed for selective uptake by diseased tissue—beginning with ENDO-205 for endometriosis, now in Phase 1.
            </p>
            <div data-hero-step="actions" className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?subject=partnership">Discuss a partnership</Button>
              <Button href="/pipeline#endo-205" variant="ghost">Review ENDO-205</Button>
            </div>
          </div>

          <figure className="hero-visual-enter -mx-5 md:absolute md:-top-24 md:bottom-0 md:left-[calc(50%_-_50vw)] md:right-[calc(50%_-_50vw)] md:mx-0">
            <div className="hero-visual-frame relative aspect-[4/3] overflow-hidden md:absolute md:inset-0 md:aspect-auto">
              <Image
                src="/illustrations/hero-home-v3.avif"
                alt="Conceptual platform illustration of a cyclic peptide changing state at a disease-tissue boundary and branching within rose-colored diseased tissue."
                aria-describedby="home-hero-disclosure"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_center]"
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
              Conceptual representation of pH-mediated activation and selective uptake by diseased tissue; not clinical imagery.
            </figcaption>
          </figure>
        </div>

        <div data-hero-proof className="relative grid grid-cols-2 border-y border-line bg-paper/90 sm:grid-cols-3 sm:divide-x sm:divide-line">
          <div className="border-b border-r border-line py-4 pr-4 sm:border-b-0 sm:border-r-0 sm:px-5 sm:first:pl-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted md:text-[0.68rem] md:tracking-[0.14em]">Lead program</p>
            <p className="mt-1 font-medium text-ink">ENDO-205</p>
          </div>
          <div className="border-b border-line py-4 pl-4 sm:border-b-0 sm:px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted md:text-[0.68rem] md:tracking-[0.14em]">Development</p>
            <p className="mt-1 font-medium text-ink">Phase 1</p>
          </div>
          <div className="col-span-2 py-4 sm:col-span-1 sm:px-5 sm:last:pr-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted md:text-[0.68rem] md:tracking-[0.14em]">Regulatory</p>
            <p className="mt-1 font-medium text-ink">FDA IND Allowance · 2026</p>
          </div>
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
              A peptide that changes state at the disease boundary.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted md:col-span-4 md:col-start-9">
            The same selective logic supports therapeutic and diagnostic programs across endometriosis and oncology.
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
            Therapeutic and diagnostic programs span endometriosis and oncology, led by ENDO-205 in Phase 1.
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
            <ChapterLabel>Regulatory &amp; external validation</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-xl text-ink">Evidence at each transition.</h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted md:col-span-5 md:col-start-8">
            Regulatory progress and external recognition mark the path from platform science to clinical-stage development.
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
              Recognition, recorded at the source.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-muted-on-dark md:col-span-4 md:col-start-9">
            A selected record of external recognition, with approved resources
            for accurate coverage.
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
          <div className="md:col-span-7">
            <ChapterLabel>Partnering</ChapterLabel>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">Advance selective precision medicine with us.</h2>
            <p className="mt-5 max-w-xl text-muted">
              Connect with EndoCyclic about strategic partnerships, investment, or access to the diligence process.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?subject=partnership">Discuss a partnership</Button>
              <Button href="/investors#data-room" variant="ghost">Request data-room access</Button>
            </div>
          </div>

          <figure className="flex items-end gap-5 md:col-span-5 md:col-start-8 md:justify-end">
            <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-b-2xl rounded-t-[999px] bg-peony shadow-[0_20px_55px_rgb(57_38_56/0.09)] sm:w-44 md:w-48">
              <Image
                src="/team/tanya-petrossian.avif"
                alt="Dr. Tanya Petrossian, founder and CEO of EndoCyclic Therapeutics"
                fill
                sizes="(min-width: 768px) 192px, 176px"
                className="object-cover object-top"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-plum/12 to-transparent" />
            </div>
            <figcaption className="border-l border-line pb-2 pl-5">
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
    <main id="main-content">
      <Hero />
      <div className="relative">
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
