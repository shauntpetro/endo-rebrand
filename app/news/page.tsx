"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import { TextField, Honeypot } from "@/components/site/Field";
import { NEWS, type Article, type ArticleType } from "@/lib/site";

/* --------------------------------------------------------------- Filtering */
type Filter = "All" | ArticleType;
const FILTERS: Filter[] = ["All", "Press Release", "Award", "Interview"];

/* ------------------------------------------------------------ Article image */
function ArticleImage({
  article,
  sizes,
  className,
}: {
  article: Article;
  sizes: string;
  className?: string;
}) {
  const isSvg = article.image.endsWith(".svg");
  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        isSvg ? "bg-tint-warm" : "bg-tint-plum",
        className,
      )}
    >
      <Image
        src={article.image}
        alt={`${article.source} — ${article.title}`}
        fill
        sizes={sizes}
        className={isSvg ? "object-contain p-10" : "object-cover"}
      />
    </div>
  );
}

/* ----------------------------------------------------------- Article meta */
function ArticleMeta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
      <span className="font-semibold uppercase tracking-wider text-teal-ink">
        {article.type}
      </span>
      <span aria-hidden>·</span>
      <span>{article.date}</span>
      <span aria-hidden>·</span>
      <span>{article.source}</span>
    </p>
  );
}

function linkProps(article: Article) {
  return article.link.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <Section tone="paper" rhythm={false} className="pb-0">
      <div className="pt-32 md:pt-40">
        <Container>
          <div className="max-w-3xl reveal">
            <Eyebrow>Newsroom</Eyebrow>
            <h1 className="t-hero mt-6 text-ink">News &amp; recognition.</h1>
            <p className="t-lead mt-6 max-w-2xl">
              Press releases, awards, and interviews — from the NIH&rsquo;s rare
              &ldquo;Perfect 10&rdquo; grant score to national recognition for our work in
              endometriosis.
            </p>
          </div>
          <div className="mt-16 h-px w-full bg-line md:mt-20" />
        </Container>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- Featured story */
function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Reveal>
      <a
        href={article.link}
        {...linkProps(article)}
        className="group grid overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-ink/30 md:grid-cols-2"
      >
        <ArticleImage
          article={article}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] md:aspect-auto md:min-h-full"
        />
        <div className="flex flex-col justify-center p-7 md:p-10">
          <Eyebrow>Featured</Eyebrow>
          <div className="mt-5">
            <ArticleMeta article={article} />
          </div>
          <h2 className="t-h3 mt-3 text-ink">
            <span className="link-underline">{article.title}</span>
          </h2>
          {article.excerpt && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          )}
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-ink">
            Read the announcement
            <ArrowUpRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/* ------------------------------------------------------------ Article card */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Reveal as="li" delay={index * 0.06} className="h-full">
      <a
        href={article.link}
        {...linkProps(article)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-ink/30"
      >
        <ArticleImage
          article={article}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10]"
        />
        <div className="flex flex-1 flex-col p-6">
          <ArticleMeta article={article} />
          <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug text-ink">
            <span className="link-underline">{article.title}</span>
          </h3>
          {article.excerpt && (
            <p className="mt-2.5 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-teal-ink">
            Read article
            <ArrowUpRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/* -------------------------------------------------------------- Newsroom */
function Newsroom() {
  const [filter, setFilter] = useState<Filter>("All");

  const featured = NEWS.find((a) => a.featured);
  const showFeatured =
    featured !== undefined && (filter === "All" || featured.type === filter);
  const rest = NEWS.filter(
    (a) => a.id !== featured?.id && (filter === "All" || a.type === filter),
  );

  return (
    <Section tone="paper">
      <Container>
        <h2 className="sr-only">Articles</h2>

        <Reveal>
          <div
            role="group"
            aria-label="Filter news by category"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors duration-300",
                  filter === f
                    ? "border-plum bg-plum text-on-dark"
                    : "border-line text-muted hover:border-ink/40 hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Keyed by filter so cards re-fade gently on each change */}
        <div key={filter} className="mt-10">
          {showFeatured && featured && <FeaturedArticle article={featured} />}

          {rest.length > 0 && (
            <ul
              className={clsx(
                "grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3",
                showFeatured && "mt-6",
              )}
            >
              {rest.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </ul>
          )}

          {!showFeatured && rest.length === 0 && (
            <p role="status" className="mt-4 text-sm text-muted">
              No articles in this category yet.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Newsletter */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldError, setFieldError] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldError(undefined);
    setErrorMessage("");

    if (!email.trim()) {
      setFieldError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), _honeypot: honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <Section tone="tint-teal">
      <Container prose>
        <Reveal>
          <Eyebrow>Stay informed</Eyebrow>
          <h2 className="t-h2 mt-4 text-ink">Occasional updates, only when there&rsquo;s news.</h2>
          <p className="t-body mt-4 text-muted">
            Milestones, publications, and announcements from EndoCyclic Therapeutics.
            No noise — unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <TextField
                label="Email address"
                name="email"
                type="email"
                required
                value={email}
                onChange={setEmail}
                error={fieldError}
                placeholder="you@example.com"
                autoComplete="email"
                className="flex-1"
              />
              <Honeypot value={honeypot} onChange={setHoneypot} />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-2.5 text-sm font-medium text-on-dark transition-colors duration-300 hover:bg-teal-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink disabled:opacity-60 sm:mt-7"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>

            {status === "success" && (
              <p role="alert" className="mt-4 text-sm font-medium text-teal-ink">
                Thank you — you&rsquo;re on the list.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-rose">
                {errorMessage}
              </p>
            )}
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------- Page */
export default function NewsPage() {
  return (
    <main id="main-content">
      <Hero />
      <Newsroom />
      <Newsletter />
    </main>
  );
}
