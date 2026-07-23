import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Section from "@/components/site/Section";
import { CONCEPTS } from "@/components/concepts/TasteConcepts";

const previews = {
  "selective-thread": {
    image: "/illustrations/selective-mechanism-v2.avif",
    alt: "Conceptual illustration of selective peptide activation and uptake in diseased tissue",
    emphasis: "Flagship system",
    treatment: "Cinematic thread, mechanism journey, tactile pipeline, diagnostic comparison",
    tone: "bg-tint-teal",
  },
  "clinical-ledger": {
    image: "/illustrations/femluna-targeting-v2.avif",
    alt: "Conceptual illustration of a targeted imaging agent localizing at an endometriosis lesion",
    emphasis: "Clinical narrative",
    treatment: "Centered opening, stacked evidence, horizontal proof rail",
    tone: "bg-tint-warm",
  },
  "molecular-atlas": {
    image: "/cubes.webp",
    alt: "Abstract molecular pattern",
    emphasis: "Platform mechanism",
    treatment: "Editorial split, gapless bento, expanding program panels",
    tone: "bg-tint-teal",
  },
  "partner-brief": {
    image: "/white-house.webp",
    alt: "The White House wordmark",
    emphasis: "Strategic diligence",
    treatment: "Market context, sticky proof stack, diligence pathways",
    tone: "bg-tint-plum",
  },
} as const;

export default function ConceptsIndexPage() {
  return (
    <main id="main-content" className="overflow-x-hidden bg-paper pt-32 md:pt-40">
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="reveal md:col-span-8">
              <Eyebrow>Homepage explorations</Eyebrow>
              <h1 className="t-hero mt-6 max-w-4xl text-ink">Four directions for the same scientific truth.</h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-muted">
                Each route uses the approved content, Hanken Grotesk, and the Calm Clinical palette
                while testing a different path through the EndoCyclic story.
              </p>
              <Button href="/" variant="quiet" className="mt-5">View the current homepage</Button>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <div className="space-y-8">
            {CONCEPTS.map((concept, index) => {
              const preview = previews[concept.slug];
              return (
                <Link
                  key={concept.slug}
                  href={`/concepts/${concept.slug}`}
                  className={`group grid overflow-hidden border border-line md:grid-cols-12 ${preview.tone}`}
                >
                  <div className={`relative min-h-64 overflow-hidden md:col-span-5 ${index === 1 ? "md:order-2 md:col-start-8" : ""}`}>
                    <Image
                      src={preview.image}
                      alt={preview.alt}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${concept.slug === "selective-thread" ? "opacity-90" : "grayscale"} ${concept.slug === "molecular-atlas" ? "opacity-40" : "opacity-80"}`}
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-plum/25 to-transparent" />
                  </div>
                  <div className={`flex min-h-72 flex-col justify-between p-8 md:col-span-7 md:p-12 ${index === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-start justify-between gap-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">{preview.emphasis}</p>
                      <ArrowRight aria-hidden size={19} className="text-teal-ink transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                    <div className="mt-16">
                      <h2 className="t-h2 text-ink">{concept.name}</h2>
                      <p className="mt-4 max-w-xl text-muted">{concept.summary}</p>
                      <p className="mt-7 border-t border-line pt-4 text-sm text-ink">{preview.treatment}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="plum">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <Eyebrow tone="dark">Comparison guide</Eyebrow>
              <h2 className="t-h2 mt-5 max-w-2xl !text-on-dark">Choose the direction that makes the core story easiest to understand.</h2>
            </div>
            <p className="text-sm text-muted-on-dark md:col-span-4">
              The Selective Thread prioritizes synthesis. Clinical Ledger prioritizes clarity.
              Molecular Atlas prioritizes mechanism. Partner Brief prioritizes diligence.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
