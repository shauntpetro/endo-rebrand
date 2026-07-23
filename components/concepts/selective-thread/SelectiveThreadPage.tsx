import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveDown } from "lucide-react";
import Container from "@/components/site/Container";
import { VALIDATION_WORDS } from "@/lib/site";
import DiagnosticCompare from "./DiagnosticCompare";
import EvidenceCarousel from "./EvidenceCarousel";
import ProgramAccordion from "./ProgramAccordion";
import ThreadMotion from "./ThreadMotion";
import {
  BurdenThreadArtwork,
  ClosingThreadMark,
  HeroBloomArtwork,
  HeroThreadArtwork,
  MobileMechanismArtwork,
} from "./ThreadArtwork";
import styles from "./selective-thread.module.css";

const MECHANISM_STEPS = [
  {
    step: "01 · Physiological pH",
    title: "Inactive near healthy tissue",
    body: "Designed to remain inactive near healthy tissue.",
  },
  {
    step: "02 · Acidic microenvironment",
    title: "pH-mediated activation",
    body: "Designed to activate in the acidic disease microenvironment.",
  },
  {
    step: "03 · Diseased tissue",
    title: "Selective uptake",
    body: "Selective uptake by diseased tissue via a proprietary endocytic pathway.",
  },
] as const;

function FlagshipLink({
  href,
  children,
  tone = "cream",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "cream" | "outline" | "text" | "dark" | "outline-light";
}) {
  const classes = {
    cream: "bg-on-dark text-plum shadow-[0_12px_34px_rgba(44,29,45,0.18)] hover:bg-[#f7e8e7]",
    outline: "border border-line-on-dark text-on-dark hover:border-[#f0b4c1] hover:bg-[#f0b4c1]/10",
    text: "text-teal-ink hover:text-ink",
    dark: "bg-plum text-on-dark shadow-[0_12px_34px_rgba(74,45,67,0.16)] hover:bg-[#8b4b62]",
    "outline-light": "border border-[#8b4b62]/30 text-plum hover:border-[#8b4b62] hover:bg-[#fff8f4]/70",
  } as const;

  return (
    <Link
      href={href}
      data-magnetic={tone !== "text" ? "" : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] ${classes[tone]} ${tone === "text" ? "px-0" : ""}`}
    >
      {children}
      <ArrowRight aria-hidden size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function ChapterLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={dark ? styles.chapterLabelDark : styles.chapterLabel}>{children}</p>;
}

function ValidationMarquee() {
  return (
    <div className="border-y border-line-on-dark px-5 py-5" aria-label="External validation">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-3">
        {VALIDATION_WORDS.map((item) => (
          <span key={item} className="flex min-h-8 items-center gap-3 text-sm font-medium text-on-dark">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SelectiveThreadPage() {
  return (
    <main
      id="main-content"
      data-selective-thread-page
      className={`${styles.warmPage} w-full max-w-full overflow-x-hidden bg-paper`}
    >
      <ThreadMotion />

      <section className={`${styles.hero} relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-28 md:pb-24 md:pt-32`}>
        <HeroThreadArtwork />
        <Container className="relative z-10">
          <div className="relative flex min-h-[calc(100dvh-13rem)] items-center">
            <div className={styles.heroCopy}>
              <div data-hero-fade>
                <ChapterLabel dark>Clinical-stage precision medicine</ChapterLabel>
              </div>
              <h1 data-split-hero className={`${styles.heroTitle} mt-8`}>
                <span>One selective platform.</span>
                <span>Four precision programs.</span>
              </h1>
              <p data-hero-fade className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-muted-on-dark md:text-xl">
                Non-hormonal peptides designed to activate in diseased tissue—advancing therapeutics and diagnostics across endometriosis and oncology.
              </p>
              <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
                <FlagshipLink href="/innovation">Follow the mechanism</FlagshipLink>
                <FlagshipLink href="/contact?subject=partnership#contact-form" tone="outline">Discuss a partnership</FlagshipLink>
              </div>
              <a
                href="#burden"
                data-hero-fade
                className="mt-14 inline-flex min-h-11 items-center gap-2 text-xs font-semibold tracking-[0.08em] text-muted-on-dark transition-colors hover:text-on-dark"
              >
                Trace the platform <MoveDown aria-hidden size={15} />
              </a>
            </div>

            <div data-hero-bloom className={styles.heroBloom} aria-hidden>
              <HeroBloomArtwork />
              <span className={styles.heroBloomLabel}>Inactive by design</span>
              <span className={styles.heroBloomLabel}>Activated by disease</span>
            </div>
          </div>
        </Container>
      </section>

      <section id="burden" className={`${styles.burdenSection} py-28 md:py-44`}>
        <Container className="relative z-10">
          <div data-chapter-intro className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <ChapterLabel>The burden</ChapterLabel>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
                The cost of waiting <span className={styles.softUnderline}>is already visible.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted md:col-span-4">
              Endometriosis affects more than 190 million women worldwide, while diagnosis still takes an average of eight years.
            </p>
          </div>

          <div className={`mt-16 ${styles.burdenQuilt}`}>
            <article data-stack-card className={`${styles.burdenLead} p-8 md:p-12`}>
              <BurdenThreadArtwork />
              <div className={styles.femaleSilhouette} aria-hidden />
              <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-between">
                <p className="max-w-sm text-sm text-muted-on-dark">Women affected worldwide</p>
                <div>
                  <p className="text-[clamp(4.5rem,10vw,9rem)] font-medium leading-none tracking-[-0.055em] text-on-dark tabular-nums">190M+</p>
                  <div className="mt-8 flex items-end justify-between gap-8 border-t border-line-on-dark pt-6">
                    <p className="max-w-xs text-sm text-muted-on-dark">A leading cause of infertility and chronic pelvic pain.</p>
                    <p className="whitespace-nowrap text-right text-2xl font-medium text-on-dark">1 in 10</p>
                  </div>
                </div>
              </div>
            </article>

            <article data-stack-card className={`${styles.burdenDelay} flex flex-col justify-between p-8 md:p-10`}>
              <p className="text-sm text-muted">Average diagnostic delay</p>
              <div className="flex items-end justify-between gap-6">
                <p className="text-[clamp(3.4rem,7vw,6rem)] font-medium leading-none tracking-[-0.045em] text-ink tabular-nums">8 years</p>
                <p className="max-w-36 pb-1 text-right text-xs text-muted">From first symptoms to confirmed diagnosis.</p>
              </div>
            </article>

            <article data-stack-card className={`${styles.burdenCost} flex flex-col justify-between p-8 md:p-10`}>
              <p className="text-sm text-muted">Annual economic burden in the US</p>
              <div className="flex items-end justify-between gap-6">
                <p className="text-[clamp(3.4rem,7vw,6rem)] font-medium leading-none tracking-[-0.045em] text-ink tabular-nums">$200B</p>
                <p className="max-w-36 pb-1 text-right text-xs text-muted">Healthcare costs and lost productivity.</p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={`${styles.mechanismSection} py-28 md:py-48`}>
        <Container>
          <div data-chapter-intro className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <ChapterLabel>The mechanism</ChapterLabel>
              <h2 className="mt-5 text-[clamp(2.25rem,4vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ink">A thread that changes state.</h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted md:col-span-6 md:col-start-7">
              The platform is designed to remain inactive near healthy tissue, activate in the acidic disease microenvironment, and undergo selective uptake by diseased tissue via a proprietary endocytic pathway.
            </p>
          </div>

          <figure data-reveal-aperture className={`${styles.mechanismFrame} mt-16 hidden origin-center md:mt-24 md:block`}>
            <div className={styles.mechanismVisual}>
              <Image
                src="/illustrations/selective-mechanism-v2.avif"
                alt="Conceptual three-stage illustration of a precision peptide near healthy tissue, activating in an acidic disease microenvironment, and undergoing selective uptake by diseased tissue."
                width={1774}
                height={887}
                sizes="(min-width: 1280px) 1200px, calc(100vw - 64px)"
                className={styles.mechanismImage}
              />
              <ol className={styles.mechanismOverlay}>
                {MECHANISM_STEPS.map((item) => (
                  <li key={item.step} className={styles.mechanismStep}>
                    <span className={styles.mechanismStepLabel}>{item.step}</span>
                    <strong>{item.title}</strong>
                    <span className={styles.mechanismStepBody}>{item.body}</span>
                  </li>
                ))}
              </ol>
            </div>
            <figcaption className={styles.mechanismCaption}>
              Conceptual representation of the EndoCyclic precision peptide platform.
            </figcaption>
          </figure>

          <div data-reveal-aperture className="mt-14 md:hidden">
            <figure>
              <div className={styles.mobileMechanismFrame}>
                <MobileMechanismArtwork />
              </div>
              <figcaption className={styles.mechanismCaption}>
                Conceptual representation of the EndoCyclic precision peptide platform.
              </figcaption>
            </figure>
            <ol className={styles.mechanismMobileSteps}>
              {MECHANISM_STEPS.map((item) => (
                <li key={item.step}>
                  <span className={styles.mechanismMobileIndex}>{item.step.slice(0, 2)}</span>
                  <div>
                    <span className={styles.mechanismStepLabel}>{item.step.slice(5)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.mechanismTakeaway}>
            <div>
              <p className={styles.mechanismTakeawayLabel}>Non-hormonal mechanism of action</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">A precision approach designed to act without suppressing hormones.</p>
            </div>
            <FlagshipLink href="/innovation" tone="text">Explore the platform</FlagshipLink>
          </div>
        </Container>
      </section>

      <section className={`${styles.pipelineSection} py-28 md:py-44`}>
        <Container className="relative z-10">
          <div data-chapter-intro className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <ChapterLabel>The pipeline</ChapterLabel>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">The thread becomes a pipeline.</h2>
            </div>
            <p className="text-muted md:col-span-4">Four investigational programs apply the same platform logic across therapeutics and diagnostics.</p>
          </div>
          <div className="mt-16 md:mt-24"><ProgramAccordion className={styles.programAccordion} /></div>
        </Container>
      </section>

      <section className={`${styles.diagnosticSection} py-28 md:py-48`}>
        <Container className="relative z-10">
          <div data-chapter-intro className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <ChapterLabel>The diagnostic</ChapterLabel>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
                Find what current imaging <span className={styles.softUnderline}>can miss.</span>
              </h2>
            </div>
            <p className="text-muted md:col-span-4">
              FemLUNA is being developed as the first non-invasive, definitive diagnostic for endometriosis.
            </p>
          </div>
          <div data-reveal-aperture className="mt-16 origin-center md:mt-24"><DiagnosticCompare /></div>
        </Container>
      </section>

      <section className={`${styles.marqueeSection} py-10`}>
        <ValidationMarquee />
      </section>

      <section className={`${styles.validationSection} py-28 md:py-44`}>
        <Container>
          <div data-chapter-intro className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <ChapterLabel>External validation</ChapterLabel>
              <h2 className="mt-5 max-w-3xl text-[clamp(2.25rem,4.5vw,4.5rem)] font-medium leading-[1.03] tracking-[-0.035em] text-ink">Progress that holds up under scrutiny.</h2>
            </div>
            <p className="text-muted md:col-span-4 md:col-start-9">Regulatory progress, NIH support, institutional partnerships, and national recognition.</p>
          </div>
          <div className={`${styles.evidenceCarousel} mt-16 md:mt-20`}><EvidenceCarousel /></div>
        </Container>
      </section>

      <section className={`${styles.closingSection} py-28 md:py-44`}>
        <Container className="relative z-10">
          <div className="grid gap-16 md:grid-cols-12 md:items-end">
            <div data-chapter-intro className="md:col-span-8">
              <ChapterLabel>The diligence front door</ChapterLabel>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,5.5vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink">Move from overview to diligence.</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">Connect with EndoCyclic about strategic partnerships, investment, or data-room access.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <FlagshipLink href="/contact?subject=partnership#contact-form" tone="dark">Partner with us</FlagshipLink>
                <FlagshipLink href="/investors" tone="outline-light">Investor overview</FlagshipLink>
              </div>
            </div>
            <div className="md:col-span-4">
              <div data-breathe><ClosingThreadMark /></div>
              <div className={`${styles.founderProof} mt-7`}>
                <div className={styles.founderPortrait}>
                  <Image
                    src="/team/tanya-petrossian.avif"
                    alt="Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics"
                    fill
                    sizes="84px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-semibold text-ink">Dr. Tanya Petrossian, PhD</p>
                  <p className="mt-0.5 text-sm text-muted">Founder &amp; CEO</p>
                  <p className="mt-2 text-sm font-medium text-[#8b4b62]">Correction, not destruction.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
