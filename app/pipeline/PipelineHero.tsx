import Image from "next/image";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import { PARTNERSHIP_CONTACT_HREF } from "@/lib/site";

export default function PipelineHero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper pb-16 pt-28 md:pb-20 md:pt-32">
      <svg
        aria-hidden
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="pipeline-hero-thread pointer-events-none absolute inset-x-0 top-20 h-72 w-full opacity-25"
      >
        <path
          d="M-80 328C165 360 262 190 476 244c192 48 280-126 441-42 133 70 203 15 363-111"
          fill="none"
          stroke="url(#pipeline-hero-thread)"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="pipeline-hero-thread" x1="0" x2="1">
            <stop stopColor="#c9798a" />
            <stop offset="0.5" stopColor="#d8b850" />
            <stop offset="1" stopColor="#43877d" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="hero-copy-enter lg:col-span-6">
            <div data-hero-step="eyebrow">
              <Eyebrow>Development portfolio</Eyebrow>
            </div>
            <h1
              data-hero-step="title"
              className="mt-6 max-w-2xl text-[clamp(2.45rem,5vw,4.5rem)] font-medium leading-[1.01] tracking-[-0.045em] text-ink"
            >
              One precision peptide platform. Four programs.
            </h1>
            <p data-hero-step="intro" className="t-lead mt-7 max-w-xl">
              The portfolio combines ENDO-205 and FemLUNA™ in endometriosis
              with a matched therapeutic and companion diagnostic strategy in
              oncology.
            </p>
            <div data-hero-step="actions" className="mt-8 flex flex-wrap gap-3">
              <Button href={PARTNERSHIP_CONTACT_HREF}>
                Discuss a partnership
              </Button>
              <Button href="#development" variant="ghost">
                View development stages
              </Button>
            </div>
          </div>

          <Reveal delay={0.06} className="lg:col-span-6">
            <figure>
              <div className="hero-visual-frame relative aspect-[8/5] overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-tint-warm sm:aspect-[2/1] md:rounded-bl-[3rem] md:rounded-tr-[6rem]">
                <Image
                  src="/illustrations/pipeline-portfolio-wide-v2.avif"
                  alt="Conceptual editorial illustration of one precision peptide platform branching toward four therapeutic and diagnostic program paths."
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 90vw"
                  className="object-cover object-right sm:object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 hidden bg-gradient-to-t from-plum/92 via-plum/76 via-38% to-transparent to-72% sm:block"
                />
                <p className="absolute inset-x-0 bottom-0 hidden max-w-md p-7 text-sm font-medium leading-relaxed text-on-dark sm:block">
                  A common logic of selective uptake and pH-mediated activation.
                </p>
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-ink sm:hidden">
                A common logic of selective uptake and pH-mediated activation.
              </p>
              <figcaption className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
                Conceptual portfolio architecture; not clinical imagery or
                development-performance data.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
