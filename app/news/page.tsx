"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import Eyebrow from "@/components/site/Eyebrow";
import MagneticButton from "@/components/site/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ Data */
type ArticleType = "All" | "Press Release" | "Award" | "Interview";

interface Article {
  id: number;
  type: ArticleType;
  date: string;
  source: string;
  title: string;
  excerpt?: string;
  image: string;
  link: string;
  featured?: boolean;
}

// Real press — titles, sources, dates, and links preserved verbatim.
const articles: Article[] = [
  {
    id: 1,
    type: "Award",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "EndoCyclic Therapeutics Awarded Rare NIH 'Perfect 10' Grant for Endometriosis Therapeutic",
    excerpt: "EndoCyclic Therapeutics received a highly competitive NIH Commercialization Readiness Pilot (CRP) Program grant from NICHD, earning an exceptionally rare perfect overall impact score of 10. This funding accelerates the commercialization of ENDO-205, a non-hormonal, disease-modifying therapeutic designed to treat endometriosis.",
    image: "/recognition-perfect10.webp",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: true
  },
  {
    id: 2,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "EndoCyclic Therapeutics",
    title: "EndoCyclic Therapeutics Named Founding Member of Milken Institute's Women's Health Network",
    excerpt: "EndoCyclic Therapeutics joins the Milken Institute's Women's Health Network as a founding member, furthering its commitment to advancing women's health initiatives and fostering collaboration in addressing critical health issues affecting women globally.",
    image: "/Milken_Institute_logo.svg",
    link: "https://www.endocyclictherapeutics.com/news",
    featured: false
  },
  {
    id: 3,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "BioWorld",
    title: "EndoCyclic's ENDO-205 Awarded NIH Grant for Endometriosis",
    excerpt: "BioWorld reports on EndoCyclic Therapeutics' NIH CRP grant award, highlighting the therapeutic's potential in addressing unmet needs in endometriosis treatment and the significance of this funding in advancing ENDO-205 toward commercialization.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.bioworld.com/articles/724279-endocyclics-endo-205-awarded-nih-grant-for-endometriosis",
    featured: false
  },
  {
    id: 4,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "ENDO-205: First Non-Hormonal, Disease-Modifying Therapeutic for Endometriosis",
    excerpt: "EndoCyclic Therapeutics' ENDO-205 employs a pH-sensitive peptide mechanism that selectively eliminates lesions at the disease site while preserving healthy tissue. This innovative approach has the potential to become the first-ever disease-modifying therapy for endometriosis, affecting over 190 million women globally.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: false
  },
  {
    id: 5,
    type: "Award",
    date: "Sep 16, 2025",
    source: "NIH NICHD",
    title: "NIH Commercialization Readiness Pilot Program Grant Awarded",
    excerpt: "The Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD) awarded EndoCyclic Therapeutics a Commercialization Readiness Pilot Program grant with a perfect impact score, recognizing the company's innovative approach to addressing endometriosis, a condition affecting 10% of women of reproductive age.",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://seed.nih.gov/portfolio/nih-portfolio-company-showcase/endocyclic-therapeutics",
    featured: false
  },
  {
    id: 6,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "EndoCyclic Therapeutics",
    title: "Dr. Tanya Petrossian on ENDO-205's Transformative Potential",
    excerpt: "Dr. Tanya Petrossian, CEO of EndoCyclic Therapeutics, emphasizes that ENDO-205 has the potential to deliver a transformative, disease-modifying solution for women living with endometriosis, addressing a condition with an economic burden exceeding $200 billion annually in the U.S. alone.",
    image: "/team/tanya-petrossian.avif",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: false
  },
  {
    id: 7,
    type: "Award",
    date: "Mar 20, 2020",
    source: "NIH NICHD",
    title: "NIH NICHD Director's Corner Highlights EndoCyclic Therapeutics",
    excerpt: "The Director's Corner of the Eunice Kennedy Shriver National Institute of Child Health and Human Development features EndoCyclic Therapeutics and its novel approach to developing non-hormonal therapeutics for endometriosis.",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://www.nichd.nih.gov/",
    featured: false
  },
  {
    id: 8,
    type: "Press Release",
    date: "Oct 13, 2017",
    source: "UCLA",
    title: "Alumna Creates Company to Develop Nonhormonal Endometriosis Treatment",
    excerpt: "UCLA highlights alumna Dr. Tanya Petrossian and her founding of EndoCyclic Therapeutics, a company dedicated to developing the first non-hormonal treatment for endometriosis using innovative cyclic peptide technology.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.ucla.edu/",
    featured: false
  },
  {
    id: 9,
    type: "Interview",
    date: "Nov 3, 2017",
    source: "EndoCyclic Therapeutics",
    title: "Tanya Petrossian Discusses Endometriosis",
    excerpt: "Dr. Tanya Petrossian, CEO and Founder of EndoCyclic Therapeutics, discusses the urgent need for non-hormonal endometriosis treatments and the company's innovative peptide-based approach to addressing this chronic condition.",
    image: "/team/tanya-petrossian.avif",
    link: "https://www.endocyclictherapeutics.com/news",
    featured: false
  }
];

const categories: ArticleType[] = ["All", "Press Release", "Award", "Interview"];

const isExternal = (link: string) => link.startsWith("http");
const isSvg = (src: string) => src.endsWith(".svg");

/* --------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[36%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        Press
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <div className="border-b border-line pb-6">
            <Eyebrow>Newsroom</Eyebrow>
          </div>
        </Reveal>

        <h1 className="t-display mt-10 text-ink md:mt-14">
          <SplitText
            lines={[
              [{ text: "Pioneering progress in" }],
              [{ text: "women’s health.", accent: true, italic: true }],
            ]}
            accentClass="text-gold-ink"
          />
        </h1>

        <div className="mt-12 grid gap-10 pb-20 md:grid-cols-12 md:pb-28">
          <Reveal delay={0.5} className="md:col-span-6">
            <p className="t-lead max-w-xl text-ink-soft">
              The latest breakthroughs, clinical milestones, and corporate announcements as we work
              to redefine the standard of care in <span className="text-ink">women’s health</span>.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="flex flex-wrap items-center gap-4 self-end md:col-span-5 md:col-start-8">
            <MagneticButton href="#newsletter" variant="primary">
              Subscribe
            </MagneticButton>
            <MagneticButton href="/media" variant="ghost" arrow={false}>
              Media kit
            </MagneticButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Article card */
function ArticleImage({
  article,
  className,
  sizes,
  priority,
}: {
  article: Article;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (isSvg(article.image)) {
    return (
      <div className={clsx("flex items-center justify-center bg-paper-sunk p-10", className)}>
        <Image
          src={article.image}
          alt={article.title}
          width={360}
          height={240}
          style={{ width: "auto", height: "auto" }}
          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <div className={clsx("relative overflow-hidden bg-paper-sunk", className)}>
      <Image
        src={article.image}
        alt={article.title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  const external = isExternal(article.link);
  return (
    <motion.a
      key="featured"
      href={article.link}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative mb-20 grid overflow-hidden rounded-2xl border border-line bg-paper-raised transition-colors duration-500 hover:border-gold-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:grid-cols-12"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 z-10 h-[3px] w-24 bg-gold transition-all duration-500 group-hover:w-full"
      />
      <ArticleImage
        article={article}
        sizes="(max-width: 768px) 100vw, 58vw"
        priority
        className="h-64 md:col-span-7 md:h-auto md:min-h-[26rem]"
      />
      <div className="flex flex-col justify-center p-9 md:col-span-5 md:p-12 lg:p-14">
        <div className="flex items-center gap-3">
          <span className="t-label text-gold-ink">{article.type}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
          <time className="t-label text-ink-muted" dateTime={article.date}>
            {article.date}
          </time>
        </div>
        <h2 className="mt-6 font-serif text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.02] text-ink transition-colors group-hover:text-gold-ink">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="t-body mt-6 text-ink-muted">{article.excerpt}</p>
        )}
        <span className="mt-8 inline-flex items-center gap-2 t-label text-ink transition-transform group-hover:translate-x-1">
          Read story <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>
    </motion.a>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const external = isExternal(article.link);
  return (
    <motion.a
      layout
      href={article.link}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-colors duration-500 hover:border-gold-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 z-10 h-[2px] w-14 bg-gold transition-all duration-500 group-hover:w-full"
      />
      <ArticleImage
        article={article}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="h-52"
      />
      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-3">
          <span className="t-label text-gold-ink">{article.type}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
          <time className="t-label text-ink-muted" dateTime={article.date}>
            {article.date}
          </time>
        </div>
        <h3 className="mt-5 font-serif text-2xl leading-[1.08] text-ink transition-colors group-hover:text-gold-ink">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <span className="t-label text-ink-muted">{article.source}</span>
          <span className="inline-flex items-center gap-1 t-label text-gold-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Read <ArrowUpRight size={14} aria-hidden />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* --------------------------------------------------------------- Newsletter */
function Newsletter() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), _honeypot: honeypot }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail("");
      }, 4000);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const errId = "newsletter-email-error";

  return (
    <Section id="newsletter" tone="abyss" grain>
      <Container>
        <FolioHeading index="02" label="Stay Connected" tone="dark" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="t-h1 text-paper-on-dark">
              Milestones, as they <span className="italic-display text-gold-light">happen.</span>
            </h2>
            <p className="t-lead mt-8 max-w-md text-muted-on-dark">
              Join our newsletter for clinical progress, scientific publications, and company news —
              key milestones only, no noise.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {["Quarterly updates", "Key milestones only", "No spam"].map((item) => (
                <li key={item} className="flex items-center gap-2 t-label text-muted-on-dark">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
            {success ? (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="flex flex-col items-start gap-5 border-t border-gold-light/50 pt-10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-light/15">
                  <CheckCircle2 size={28} className="text-gold-light" aria-hidden />
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-paper-on-dark">You’re subscribed.</h3>
                  <p className="mt-2 text-muted-on-dark">
                    Thank you. We’ll keep you posted on our progress.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="border-t border-line-on-dark pt-10">
                {/* Honeypot — off-screen, not tab-reachable */}
                <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor="news-hp">Leave this field empty</label>
                  <input
                    id="news-hp"
                    name="_honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <label htmlFor="newsletter-email" className="t-label mb-1 block text-gold-light">
                  Email address
                </label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    aria-required="true"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errId : undefined}
                    className={clsx(
                      "w-full bg-transparent border-b px-0 py-3 text-paper-on-dark placeholder:text-muted-on-dark/60 focus:outline-none transition-colors",
                      error ? "border-rose" : "border-line-on-dark focus:border-gold-light",
                    )}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 t-label text-plum-abyss transition-colors duration-300 hover:bg-paper-on-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span
                          aria-hidden
                          className="h-4 w-4 animate-spin rounded-full border-2 border-plum-abyss/30 border-t-plum-abyss motion-reduce:animate-none"
                        />
                        Subscribing
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                {error && (
                  <p id={errId} role="alert" className="mt-2 text-sm text-rose">
                    {error}
                  </p>
                )}
                <p className="mt-4 text-xs text-muted-on-dark">
                  By subscribing, you agree to our privacy policy.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Page */
export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleType>("All");
  const [query, setQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCategory = selectedCategory === "All" || a.type === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q || a.title.toLowerCase().includes(q) || a.source.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const showFeaturedLayout = selectedCategory === "All" && !query.trim();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const gridArticles = showFeaturedLayout
    ? filtered.filter((a) => a.id !== featured.id)
    : filtered;

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />

        {/* Filter + search — sticky editorial control bar */}
        <div className="sticky top-0 z-30 border-y border-line bg-paper/85 backdrop-blur-xl">
          <Container className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
            <div
              role="group"
              aria-label="Filter articles by category"
              className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1"
            >
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                    className={clsx(
                      "t-label whitespace-nowrap rounded-full px-5 py-2.5 transition-colors duration-300",
                      active
                        ? "bg-plum-deep text-paper-on-dark"
                        : "border border-line text-ink-muted hover:border-gold-ink hover:text-gold-ink",
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                size={16}
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="search"
                aria-label="Search articles by title or source"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border-b border-line bg-transparent py-2.5 pl-7 pr-2 text-ink placeholder:text-ink-muted/60 focus:border-gold-ink focus:outline-none transition-colors"
              />
            </div>
          </Container>
        </div>

        {/* Articles */}
        <Section tone="paper" aria-label="News articles">
          <Container>
            <FolioHeading index="01" label="Press & Recognition" />
            <h2 className="sr-only">News articles</h2>

            <div className="mt-14">
              <AnimatePresence mode="wait">
                {showFeaturedLayout && <FeaturedCard key="featured" article={featured} />}
              </AnimatePresence>

              {gridArticles.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                >
                  <AnimatePresence>
                    {gridArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div role="status" className="border-t border-line py-20 text-center">
                  <h3 className="font-serif text-3xl text-ink">No articles found.</h3>
                  <p className="mt-3 text-ink-muted">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedCategory("All");
                    }}
                    className="klink mt-8 t-label text-gold-ink"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </Container>
        </Section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
