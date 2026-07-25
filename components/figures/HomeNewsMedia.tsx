import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HomeNewsPointer from "@/components/figures/HomeNewsPointer";
import {
  getArticleDisplayTitle,
  getArticleSourceLabel,
  NEWS,
} from "@/lib/site";

const FEATURED = NEWS.find((article) => article.featured) ?? NEWS[0];
const SECONDARY = NEWS.filter((article) => article.id !== FEATURED.id).sort(
  (a, b) =>
    (b.dateTime ? Date.parse(b.dateTime) : 0) -
      (a.dateTime ? Date.parse(a.dateTime) : 0) || b.id - a.id,
).slice(0, 1);

function BreakingSafeTitle({ title }: { title: string }) {
  return title
    .split(/(ENDO-\d{3}|FemLUNA™?)/g)
    .filter(Boolean)
    .map((part, index) =>
      /^(ENDO-\d{3}|FemLUNA™?)$/.test(part) ? (
        <span key={`${part}-${index}`} className="whitespace-nowrap">
          {part}
        </span>
      ) : (
        part
      ),
    );
}

export default function HomeNewsMedia() {
  return (
    <div className="overflow-hidden border-y border-line-on-dark">
      <div className="grid lg:grid-cols-12">
        <a
          href={FEATURED.link}
          target="_blank"
          rel="noopener noreferrer"
          data-featured-link
          className="group relative order-1 grid min-h-[25rem] gap-8 overflow-hidden border-b border-line-on-dark px-5 py-8 sm:min-h-[31rem] sm:grid-cols-[minmax(0,1fr)_9rem] sm:items-end sm:gap-10 sm:px-8 sm:py-11 lg:order-none lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:border-b-0 lg:border-r lg:px-10 lg:py-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/[0.055] sm:h-96 sm:w-96"
          >
            <span className="absolute inset-[18%] rounded-full border border-white/[0.05]" />
            <span className="absolute inset-[38%] rounded-full border border-teal-on-dark/10" />
            <span className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 rotate-[28deg] bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
          </span>

          <div className="relative z-10 self-end">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.13em]">
              <span className="text-teal-on-dark">
                {FEATURED.featureLabel ?? FEATURED.type}
              </span>
              <span className="text-muted-on-dark">
                {getArticleSourceLabel(FEATURED)} ·{" "}
                {FEATURED.dateTime ? (
                  <time dateTime={FEATURED.dateTime}>{FEATURED.date}</time>
                ) : (
                  <span>{FEATURED.date}</span>
                )}
              </span>
            </div>
            <h3 className="mt-8 max-w-2xl text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-on-dark transition-transform duration-500 ease-soft group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none motion-reduce:transition-none">
              <BreakingSafeTitle title={getArticleDisplayTitle(FEATURED)} />
            </h3>
            <p className="mt-6 hidden max-w-xl text-base leading-relaxed text-muted-on-dark sm:block">
              {FEATURED.excerpt}
            </p>
            <span className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-on-dark">
              {FEATURED.ctaLabel}
              <ArrowUpRight
                aria-hidden
                size={16}
                className="transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="sr-only"> Opens in a new tab.</span>
            </span>
          </div>

          <HomeNewsPointer
            className="relative z-10 aspect-square w-28 self-end transform-gpu transition-transform duration-300 ease-soft sm:w-36 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="relative h-full w-full overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-paper p-5 shadow-[0_18px_50px_rgb(16_10_22/0.24)] transition-transform duration-500 ease-soft group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none">
              <Image
                src={FEATURED.image}
                alt=""
                fill
                sizes="144px"
                className={
                  FEATURED.imageFit === "cover"
                    ? "object-cover"
                    : "object-contain p-5"
                }
              />
            </div>
          </HomeNewsPointer>

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          />
        </a>

        <ol className="order-2 list-none lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1">
          {SECONDARY.map((article) => (
            <li key={article.id} className="lg:border-b lg:border-line-on-dark">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid min-h-40 grid-cols-[3.5rem_1fr_auto] items-center gap-4 overflow-hidden px-5 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:px-8 lg:px-9"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-bl-xl rounded-tr-[1.75rem] bg-paper/95 p-2 opacity-75 transition-[clip-path,opacity,transform] duration-500 ease-soft [clip-path:inset(6%_6%_6%_6%)] group-hover:translate-x-1 group-hover:opacity-100 group-hover:[clip-path:inset(0%_0%_0%_0%)] group-focus-visible:translate-x-1 group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0%_0%_0%_0%)] sm:h-16 sm:w-16 motion-reduce:transform-none motion-reduce:transition-none">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="64px"
                    className={
                      article.imageFit === "cover"
                        ? "object-cover"
                        : "object-contain p-2.5"
                    }
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-on-dark">
                    {getArticleSourceLabel(article)} ·{" "}
                    {article.dateTime ? (
                      <time dateTime={article.dateTime}>{article.date}</time>
                    ) : (
                      <span>{article.date}</span>
                    )}
                  </p>
                  <h3 className="mt-2 text-base font-medium leading-snug text-on-dark transition-transform duration-500 ease-soft group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:text-lg">
                    <BreakingSafeTitle
                      title={getArticleDisplayTitle(article)}
                    />
                  </h3>
                </div>
                <ArrowUpRight
                  aria-hidden
                  size={17}
                  className="text-muted-on-dark transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-on-dark group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span className="sr-only"> Opens in a new tab.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            </li>
          ))}
        </ol>

        <div className="order-3 grid border-b border-line-on-dark bg-plum-deep sm:grid-cols-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:grid-cols-1 lg:border-b-0">
          <Link
            href="/news"
            prefetch={false}
            className="group flex min-h-28 flex-col border-b border-line-on-dark px-5 py-5 sm:min-h-40 sm:border-b-0 sm:border-r sm:px-8 sm:py-6 lg:border-b lg:border-r-0 lg:px-9"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.13em] text-rose-on-dark">
              Sourced archive
            </span>
            <span className="mt-3 hidden max-w-48 text-sm leading-relaxed text-muted-on-dark sm:block">
              Company milestones, awards, profiles, and independent coverage
              preserved at their source.
            </span>
            <span className="mt-auto inline-flex items-center justify-between gap-4 pt-4 text-lg font-medium text-on-dark sm:pt-6">
              Review sourced news
              <ArrowRight aria-hidden size={17} className="transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
            </span>
          </Link>
          <Link
            href="/media"
            prefetch={false}
            className="group flex min-h-28 flex-col px-5 py-5 sm:min-h-40 sm:px-8 sm:py-6 lg:px-9"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-on-dark">
              Approved media kit
            </span>
            <span className="mt-3 hidden max-w-48 text-sm leading-relaxed text-muted-on-dark sm:block">
              Boilerplate, factual references, publication assets, and press contact.
            </span>
            <span className="mt-auto inline-flex items-center justify-between gap-4 pt-4 text-lg font-medium text-on-dark sm:pt-6">
              Open press resources
              <ArrowRight aria-hidden size={17} className="transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
