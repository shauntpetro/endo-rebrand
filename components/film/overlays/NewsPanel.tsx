"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { NEWS, type Article, type ArticleType } from "@/lib/site";

/* ---------------------------------------------------------------------------
   Newsroom overlay — verbatim press from lib/site NEWS. Featured lead +
   color-block grid, optional category filter. Modernist Color-Block voice.
   --------------------------------------------------------------------------- */

const FILTERS = ["All", "Press Release", "Award", "Interview"] as const;
type Filter = (typeof FILTERS)[number];

/** Bauhaus chip per article type. */
const TYPE_CHIP: Record<ArticleType, string> = {
  "Press Release": "bg-plum text-cream",
  Award: "bg-gold text-ink",
  Interview: "bg-teal text-cream",
};

/** Map a deep-link param (e.g. "#!news/award", "#!news/press-release") to a filter. */
function filterFromParam(param?: string): Filter {
  if (!param) return "All";
  const norm = param.toLowerCase().replace(/-/g, " ").trim();
  return FILTERS.find((f) => f.toLowerCase() === norm) ?? "All";
}

/** Article art: SVG marks sit contained on a light tile; rasters bleed edge-to-edge. */
function ArticleImage({ article, sizes }: { article: Article; sizes: string }) {
  const isSvg = article.image.endsWith(".svg");
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden",
        isSvg ? "bg-bone" : "bg-cream-2",
      )}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={sizes}
          unoptimized={isSvg}
          className={clsx(
            isSvg
              ? "object-contain p-8 md:p-10"
              : "object-cover transition-transform duration-700 group-hover:scale-[1.03]",
          )}
        />
      </div>
    </div>
  );
}

/** External press opens in a new tab; internal paths use client navigation. */
function ArticleLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function MetaRow({ article, onDark = false }: { article: Article; onDark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className={clsx("t-label px-2.5 py-1", TYPE_CHIP[article.type])}>{article.type}</span>
      <span className={clsx("t-label", onDark ? "text-muted-on-dark" : "text-ink-muted")}>
        {article.date}
      </span>
      <span aria-hidden className={clsx("h-1.5 w-1.5 shape-dot", onDark ? "bg-gold" : "bg-ink/40")} />
      <span className={clsx("t-label", onDark ? "text-gold-soft" : "text-gold-ink")}>
        {article.source}
      </span>
    </div>
  );
}

/** Featured lead — plum color-block, full-bleed art, oversized title. */
function FeaturedCard({ article }: { article: Article }) {
  return (
    <Reveal>
      <article className="relative">
        <ArticleLink
          href={article.link}
          className="group block border-2 border-ink bg-plum text-paper-on-dark transition-transform duration-500 hover:-translate-y-1"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative border-b-2 border-ink md:border-b-0 md:border-r-2">
              <ArticleImage article={article} sizes="(min-width: 768px) 550px, 94vw" />
              <span className="t-label absolute left-0 top-0 bg-gold px-3 py-1.5 text-ink">
                Featured
              </span>
            </div>
            <div className="relative flex flex-col justify-center gap-5 p-6 md:p-10">
              {/* Bauhaus corner accent */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-6 h-4 w-4 shape-dot bg-teal"
              />
              <MetaRow article={article} onDark />
              <h3 className="t-h3 uppercase text-cream">{article.title}</h3>
              {article.excerpt && (
                <p className="t-body text-muted-on-dark">{article.excerpt}</p>
              )}
              <span className="t-label inline-flex items-center gap-2 text-gold-soft">
                Read the article
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </div>
          </div>
        </ArticleLink>
      </article>
    </Reveal>
  );
}

/** Grid card — cream block with hard 2px frame and index numeral. */
function GridCard({ article, index }: { article: Article; index: number }) {
  return (
    <Reveal as="li" delay={Math.min(index, 5) * 0.06} className="h-full">
      <article className="h-full">
        <ArticleLink
          href={article.link}
          className="group flex h-full flex-col border-2 border-ink bg-paper-raised transition-transform duration-500 hover:-translate-y-1"
        >
          <div className="relative border-b-2 border-ink">
            <ArticleImage article={article} sizes="(min-width: 768px) 480px, 94vw" />
            <span
              aria-hidden
              className="t-num pointer-events-none absolute bottom-0 right-3 text-5xl leading-none text-ink/15"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <MetaRow article={article} />
            <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-ink">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="t-body line-clamp-4 text-ink-muted">{article.excerpt}</p>
            )}
            <span className="t-label mt-auto inline-flex items-center gap-2 pt-2 text-gold-ink">
              Read the article
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>
        </ArticleLink>
      </article>
    </Reveal>
  );
}

export default function NewsPanel({ param }: { param?: string }) {
  const [filter, setFilter] = useState<Filter>(() => filterFromParam(param));

  const featured = NEWS.find((a) => a.featured);
  const showFeatured = !!featured && (filter === "All" || featured.type === filter);

  const rest = useMemo(
    () =>
      NEWS.filter(
        (a) => a.id !== featured?.id && (filter === "All" || a.type === filter),
      ),
    [filter, featured?.id],
  );

  const visibleCount = rest.length + (showFeatured ? 1 : 0);

  return (
    <div className="px-6 pb-24 pt-12 md:px-10 md:pt-16">
      {/* masthead */}
      <header className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 right-0 hidden h-14 w-14 shape-dot bg-gold md:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-20 top-8 hidden h-6 w-6 shape-dot bg-teal md:block"
        />
        <p className="t-label flex items-center gap-2 text-gold-ink">
          <span aria-hidden className="h-2 w-2 bg-gold" />
          § Newsroom
        </p>
        <h2 className="t-h1 mt-5 max-w-[14ch] uppercase text-ink">
          On the <span className="mark-gold">record.</span>
        </h2>
        <p className="t-lead mt-6 max-w-xl text-ink-muted">
          Press, awards, and interviews — the public record of the platform and its milestones.
        </p>
      </header>

      {/* category filter */}
      <div
        role="group"
        aria-label="Filter articles by category"
        className="mt-10 flex flex-wrap items-center gap-2 border-y-2 border-ink py-4"
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={clsx(
                "t-label border-2 border-ink px-4 py-2 transition-colors",
                active ? "bg-ink text-cream" : "bg-transparent text-ink hover:bg-gold",
              )}
            >
              {f}
            </button>
          );
        })}
        <p aria-live="polite" className="t-label ml-auto text-ink-muted">
          <span className="t-num text-ink">{String(visibleCount).padStart(2, "0")}</span>{" "}
          {visibleCount === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* featured lead */}
      {showFeatured && featured && (
        <div className="mt-10">
          <FeaturedCard article={featured} />
        </div>
      )}

      {/* the rest */}
      {rest.length > 0 && (
        <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2">
          {rest.map((a, i) => (
            <GridCard key={a.id} article={a} index={i} />
          ))}
        </ul>
      )}

      {visibleCount === 0 && (
        <p role="status" className="t-body mt-10 text-ink-muted">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
