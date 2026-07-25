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
import {
  getArticleDisplayTitle,
  getArticleSourceKindLabel,
  getArticleSourceLabel,
  NEWS,
  type Article,
} from "@/lib/site";

const FEATURED = NEWS.find((article) => article.featured) ?? NEWS[0];
const ARCHIVE = [...NEWS]
  .filter((article) => article.id !== FEATURED.id)
  .sort(
    (a, b) =>
      (b.dateTime ? Date.parse(b.dateTime) : 0) -
        (a.dateTime ? Date.parse(a.dateTime) : 0) || b.id - a.id,
  );

function FeaturedStoryVisual({ article }: { article: Article }) {
  if (article.id === 1) {
    return <NIHRecognitionPanel embedded />;
  }

  return (
    <div
      role="img"
      aria-label="ENDO-205 regulatory milestone: FDA IND Allowance in 2026 and Phase 1."
      className="absolute inset-0 overflow-hidden bg-surface"
    >
      <div
        aria-hidden
        className="grid h-full grid-rows-[minmax(0,1fr)_auto]"
      >
        <div
          data-news-threshold-art
          className="relative overflow-hidden bg-tint-warm"
        >
          <Image
            src={article.image}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1184px) 430px, (min-width: 1024px) 38vw, 94vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/38 via-transparent to-paper/20" />
          <p className="absolute left-6 top-6 rounded-full border border-paper/65 bg-paper/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-ink backdrop-blur-sm">
            ENDO-205
          </p>
        </div>

        <div
          data-news-milestone-rail
          className="relative grid min-h-24 grid-cols-2 items-center overflow-hidden bg-plum px-6 py-5 text-on-dark sm:px-8"
        >
          <span
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-rose via-gold to-teal"
          />
          <div className="relative pr-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-on-dark">
              Regulatory threshold
            </p>
            <p className="mt-2 text-sm font-medium text-on-dark">
              Achieved · 2026
            </p>
          </div>
          <div className="relative border-l border-line-on-dark pl-5 sm:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-on-dark">
              Clinical development
            </p>
            <p className="mt-2 text-sm font-medium text-on-dark">
              Phase 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceLink({ label, source, href }: { label: string; source: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-11 min-w-0 max-w-full items-center justify-between gap-4 border-t border-line py-3 text-sm font-medium text-ink first:border-t-0"
    >
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink [overflow-wrap:anywhere]">{source}</span>
        <span className="link-underline mt-1 block text-sm text-teal-ink [overflow-wrap:anywhere]">{label}</span>
      </span>
      <ArrowUpRight
        aria-hidden
        size={16}
        className="shrink-0 text-teal-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
      />
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
        className={`${
          article.imageFit === "cover"
            ? "object-cover"
            : "object-contain p-3 lg:p-4"
        }`}
      />
    </div>
  );
}

function EventRow({ article, index }: { article: Article; index: number }) {
  const sources = [
    {
      label: article.ctaLabel,
      source: getArticleSourceLabel(article),
      link: article.link,
    },
    ...(article.coverage ?? []),
  ];

  return (
    <Reveal as="li" delay={Math.min(index * 0.05, 0.12)}>
      <article className="grid gap-7 border-t border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
        <div className="grid grid-cols-[5rem_1fr] items-center gap-4 lg:contents">
          <div className="col-start-2 row-start-1 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:self-start">
            {article.dateTime ? (
              <time dateTime={article.dateTime} className="text-sm font-medium text-ink">
                {article.date}
              </time>
            ) : (
              <p className="text-sm font-medium text-ink">{article.date}</p>
            )}
            {article.statusLabel && (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-ink">
                {article.statusLabel}
              </p>
            )}
            <p
              className={
                article.statusLabel
                  ? "mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
                  : "mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-ink"
              }
            >
              {getArticleSourceKindLabel(article.sourceKind)} · {article.type}
            </p>
          </div>

          <div className="col-start-1 row-start-1 lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:self-start">
            <EventMark article={article} />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-5">
          <h3 className="text-[clamp(1.3rem,2.2vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/story inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
            >
              <span className="link-underline inline-block transition-transform duration-500 ease-soft group-hover/story:translate-x-1 group-focus-visible/story:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                {getArticleDisplayTitle(article)}
              </span>
              <span className="sr-only"> Opens in a new tab.</span>
            </a>
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            {article.excerpt}
          </p>
        </div>

        <div className="min-w-0 border-y border-line lg:col-span-3 lg:col-start-10 lg:border-b-0 lg:border-t-0 lg:border-l lg:pl-7">
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
            <Eyebrow>News and recognition</Eyebrow>
            <h2 className="t-h2 mt-5 max-w-2xl text-ink">
              Company announcements, awards, and profiles—preserved at their source.
            </h2>
          </div>
          <p className="max-w-lg text-muted lg:col-span-4 lg:col-start-9">
            Independent coverage is grouped beneath the original item where
            available.
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
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={FEATURED.featureLabel ?? `Featured ${FEATURED.type.toLowerCase()}`}
        title={
          FEATURED.id === 9 ? (
            <>
              FDA IND Allowance{" "}
              <span className="xl:whitespace-nowrap">
                advances <span className="whitespace-nowrap">ENDO-205</span>
              </span>{" "}
              into Phase 1.
            </>
          ) : (
            getArticleDisplayTitle(FEATURED)
          )
        }
        intro={FEATURED.excerpt}
        actions={
          <>
            <Button href={FEATURED.link} external arrow>
              {FEATURED.ctaLabel}
            </Button>
            {FEATURED.coverage?.[0] && (
              <Button href={FEATURED.coverage[0].link} variant="ghost" external>
                View UCLA class note
                <span className="sr-only">
                  . {FEATURED.coverage[0].label} · {FEATURED.coverage[0].source}.
                </span>
              </Button>
            )}
          </>
        }
        proof={FEATURED.proof}
        caption={
          <>
            {getArticleSourceKindLabel(FEATURED.sourceKind)} ·{" "}
            {getArticleSourceLabel(FEATURED)} ·{" "}
            {FEATURED.dateTime ? (
              <time dateTime={FEATURED.dateTime}>{FEATURED.date}</time>
            ) : (
              <span>{FEATURED.date}</span>
            )}
          </>
        }
        tone="tint-warm"
        layout="evidence"
        frame="line"
        visualAspect="auto"
        visualClassName="bg-surface"
        titleClassName="max-w-[18ch]"
      >
        <FeaturedStoryVisual article={FEATURED} />
      </PageHero>
      <NewsArchive />
      <NextChapter
        eyebrow="Continue"
        title="Move from the current milestone to the next diligence step."
        tone="warm"
        actions={
          <>
            <Button href="/media">Open press resources</Button>
            <Button href="/investors" variant="ghost">
              Review investor diligence
            </Button>
          </>
        }
      >
        Use approved press resources or review the lead program, portfolio, and
        data-room access path.
      </NextChapter>
    </main>
  );
}
