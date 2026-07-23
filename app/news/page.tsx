import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/site/Button";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import NextChapter from "@/components/site/NextChapter";
import NIHRecognitionPanel from "@/components/site/NIHRecognitionPanel";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Section from "@/components/site/Section";
import { NEWS, type Article } from "@/lib/site";

const FEATURED = NEWS.find((article) => article.featured) ?? NEWS[0];
const ARCHIVE = [...NEWS]
  .filter((article) => article.id !== FEATURED.id)
  .sort((a, b) => Date.parse(b.dateTime) - Date.parse(a.dateTime) || b.id - a.id);

function SourceLink({ label, source, href }: { label: string; source: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-11 items-center justify-between gap-4 border-t border-line py-3 text-sm font-medium text-ink first:border-t-0"
    >
      <span>
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink">{source}</span>
        <span className="link-underline mt-1 block text-sm text-teal-ink">{label}</span>
      </span>
      <ArrowUpRight aria-hidden size={16} className="shrink-0 text-teal-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only"> Opens in a new tab.</span>
    </a>
  );
}

function EventMark({ article }: { article: Article }) {
  return (
    <div
      aria-hidden
      className="relative h-20 w-20 overflow-hidden rounded-bl-2xl rounded-tr-[2.5rem] border border-line bg-tint-teal lg:h-24 lg:w-full"
    >
      <Image
        src={article.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 150px, 80px"
        className="object-contain p-3 lg:p-4"
      />
    </div>
  );
}

function EventRow({ article, index }: { article: Article; index: number }) {
  const sources = [
    { label: "Read source", source: article.source, link: article.link },
    ...(article.coverage ?? []),
  ];

  return (
    <Reveal as="li" delay={Math.min(index * 0.05, 0.12)}>
      <article className="grid gap-7 border-t border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
        <div className="grid grid-cols-[5rem_1fr] items-center gap-4 lg:contents">
          <div className="col-start-2 row-start-1 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:self-start">
            <time dateTime={article.dateTime} className="text-sm font-medium text-ink">
              {article.date}
            </time>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink">
              {article.type}
            </p>
          </div>

          <div className="col-start-1 row-start-1 lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:self-start">
            <EventMark article={article} />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-5">
          <h3 className="text-[clamp(1.3rem,2.2vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{article.excerpt}</p>
          )}
        </div>

        <div className="border-y border-line lg:col-span-3 lg:col-start-10 lg:border-b-0 lg:border-t-0 lg:border-l lg:pl-7">
          {sources.map((source) => (
            <SourceLink
              key={`${article.id}-${source.source}`}
              label={source.label}
              source={source.source}
              href={source.link}
            />
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function NewsArchive() {
  return (
    <Section tone="paper" size="chapter">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Selected recognition</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Awards and profiles, preserved at their source.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            A selected record of external recognition, with independent coverage grouped
            beneath the original item where available.
          </p>
        </div>

        <ol className="mt-14 list-none border-b border-line">
          {ARCHIVE.map((article, index) => (
            <EventRow key={article.id} article={article} index={index} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export default function NewsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Featured recognition"
        title="A rare NIH ‘Perfect 10’ for ENDO-205."
        intro="EndoCyclic received an NIH Commercialization Readiness Pilot grant from NICHD with a perfect overall impact score of 10."
        actions={
          <>
            <Button href={FEATURED.link} external arrow>
              Read the announcement
              <span className="sr-only"> Opens in a new tab.</span>
            </Button>
            {FEATURED.coverage?.[0] && (
              <Button href={FEATURED.coverage[0].link} variant="ghost" external>
                {FEATURED.coverage[0].label}
                <span className="sr-only"> Opens in a new tab.</span>
              </Button>
            )}
          </>
        }
        proof="NIH Commercialization Readiness Pilot grant · NICHD"
        caption={
          <>
            {FEATURED.source} · <time dateTime={FEATURED.dateTime}>{FEATURED.date}</time>
          </>
        }
        tone="tint-warm"
        layout="evidence"
        frame="line"
        visualAspect="auto"
        visualClassName="bg-surface"
      >
        <NIHRecognitionPanel embedded />
      </PageHero>
      <NewsArchive />
      <NextChapter
        eyebrow="Press desk"
        title="Need approved company facts or direct context?"
        tone="warm"
        actions={
          <>
            <Button href="/media">Open press resources</Button>
            <Button href="/contact?subject=media" variant="ghost">Contact the company</Button>
          </>
        }
      >
        Review the approved boilerplate, key facts, and the direct route for media inquiries.
      </NextChapter>
    </main>
  );
}
