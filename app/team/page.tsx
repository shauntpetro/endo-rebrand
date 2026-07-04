"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Linkedin, ArrowUpRight } from "lucide-react";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import FolioHeading from "@/components/site/FolioHeading";
import Eyebrow from "@/components/site/Eyebrow";
import Reveal from "@/components/site/Reveal";
import SplitText from "@/components/site/SplitText";
import MagneticButton from "@/components/site/MagneticButton";
import { SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Data
   Bios are real and approved — copied verbatim from the prior /team page.
   Do not alter or fabricate. */
type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  quote?: string;
  linkedin: string;
};

const team: Member[] = [
  {
    id: "tanya",
    name: "Tanya Petrossian, Ph.D.",
    role: "CEO, Founder, and Inventor",
    bio: "Dr. Petrossian is a biochemist and entrepreneur with over 15 years of experience in peptide therapeutics and targeted drug delivery. She holds a B.S. and Ph.D. in Biochemistry & Molecular Biology from UCLA, where she trained under Distinguished Professor Steven Clarke. Named City of Los Angeles Entrepreneur in Residence and a Biocom California Life Science Catalyst Award winner, she has led EndoCyclic from discovery through FDA IND clearance.",
    image: "/team/tanya-petrossian.avif",
    quote: "Our peptides help restore the body's natural surveillance system.",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "melanie",
    name: "Melanie Hartsough, Ph.D.",
    role: "Nonclinical Toxicology",
    bio: "Dr. Hartsough holds a Ph.D. in Pharmacology from Penn State College of Medicine and completed a postdoctoral fellowship at the NIH. A former FDA reviewer in both CBER and CDER, she brings over two decades of experience in pharmacology and toxicology assessment. She is the first recipient of the ACT Mildred Christian Women's Leadership in Toxicology Award and a former President of the American Board of Toxicology.",
    image: "/team/melanie-hartsough.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "david",
    name: "David Lin, Ph.D.",
    role: "CMC",
    bio: "Dr. Lin brings over 27 years of pharmaceutical regulatory experience in Chemistry, Manufacturing, and Controls (CMC). He holds a Ph.D. in organic chemistry and an MBA, and previously served as a CMC reviewer and acting Division Director at the FDA's Office of New Drug Chemistry (CDER).",
    image: "/team/david-lin.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "frank",
    name: "Frank Fernandez",
    role: "CFO",
    bio: "Frank brings decades of financial leadership experience in the life sciences sector, guiding strategic financial planning and investor relations.",
    image: "/team/frank-fernandez.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "andrea",
    name: "Andrea Lukes, MD",
    role: "Clinical Affairs",
    bio: "Dr. Lukes is a board-certified OB/GYN and Fellow of ACOG with over 30 years of clinical experience. She has conducted or overseen more than 90 clinical trials of investigational women's health products, spanning endometriosis, uterine fibroids, contraception, and menopause. She is the founder of Carolina Women's Research & Wellness Center.",
    image: "/team/andrea-lukes.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "aileen",
    name: "Aileen Ryan",
    role: "Regulatory Affairs",
    bio: "Aileen brings over 40 years of pharmaceutical regulatory experience, including leadership roles at Ludwig Institute for Cancer Research and Bayer Pharmaceuticals. She holds an M.S. in Basic Medical Sciences and has guided IND, NDA, BLA, and MAA submissions across oncology, women's health, and rare diseases.",
    image: "/team/aileen-ryan.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "miganush",
    name: "Miganush Stepanians, Ph.D.",
    role: "Biostatistics",
    bio: "Dr. Stepanians holds a Ph.D. in Statistics from Boston University and an M.S. in Mathematics from MIT. With over 30 years in drug development, she has designed analyses for more than 20 successful marketing applications (NDAs/MAAs) and has presented on behalf of sponsors in meetings with the FDA.",
    image: "/team/miganush-stepanians.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
];

/* ------------------------------------------------------------------ Hero */
function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper pt-32 md:pt-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[7%] top-[30%] select-none font-serif text-[24vw] leading-none text-ink/[0.03]"
      >
        07
      </span>

      <Container className="relative z-10">
        <Reveal y={14}>
          <div className="border-b border-line pb-5">
            <Eyebrow>The people behind the platform</Eyebrow>
          </div>
        </Reveal>

        <h1 className="t-display mt-10 text-ink md:mt-14">
          <SplitText
            lines={[[{ text: "Our" }, { text: " team.", accent: true, italic: true }]]}
            accentClass="text-gold-ink"
          />
        </h1>

        <motion.div
          className="mt-10 h-px w-full origin-left bg-line"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
        />

        <div className="mt-10 grid gap-10 pb-24 md:grid-cols-12 md:pb-32">
          <Reveal delay={0.4} className="md:col-span-5">
            <p className="t-label text-ink-muted">
              Seven leaders. Discovery through IND.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="md:col-span-6 md:col-start-7">
            <p className="t-lead max-w-xl text-ink-soft">
              Led by founder and CEO{" "}
              <span className="text-ink">Dr. Tanya Petrossian</span>, EndoCyclic combines deep
              expertise across{" "}
              <span className="italic-display text-gold-ink">peptide chemistry, oncology, and
              women&rsquo;s health</span>{" "}
              — a bench that has carried this precision-medicine platform from discovery through FDA
              IND clearance.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Founder spotlight */
function FounderSpotlight() {
  const founder = team[0];
  return (
    <Section id="founder" tone="dark" grain>
      <Container>
        <FolioHeading index="01" label="Founder & CEO" tone="dark" />

        <div className="mt-14 grid items-stretch gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src={founder.image}
                alt={`Portrait of ${founder.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 60% at 30% 20%, transparent 40%, rgba(26,21,36,0.35) 100%)",
                }}
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow tone="dark">Founder &amp; CEO</Eyebrow>
              <h2 className="t-h1 mt-5 text-paper-on-dark">{founder.name}</h2>
            </Reveal>

            {founder.quote && (
              <Reveal delay={0.1}>
                <blockquote className="mt-8 border-l-2 border-gold-light/60 pl-6">
                  <p className="font-serif text-2xl italic leading-snug text-gold-light md:text-3xl">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <p className="t-body mt-8 max-w-2xl text-muted-on-dark">{founder.bio}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="klink t-label mt-10 inline-flex items-center gap-2 text-gold-light"
              >
                <Linkedin size={15} aria-hidden />
                Connect on LinkedIn
                <ArrowUpRight size={15} aria-hidden />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Bench grid */
function BenchCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View biography for ${member.name}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-line">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-plum-abyss/80 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="t-label text-paper-on-dark">Read bio</span>
          <ArrowUpRight size={16} className="text-gold-light" />
        </div>
      </div>
      <p className="t-label mt-5 text-gold-ink">{member.role}</p>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-gold-ink">
        {member.name}
      </h3>
    </div>
  );
}

function Bench({ onSelect }: { onSelect: (m: Member) => void }) {
  const bench = team.slice(1);
  return (
    <Section id="bench" tone="paper">
      <Container>
        <FolioHeading index="02" label="The Bench" />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="t-h1 text-ink">
              Decades of drug development,{" "}
              <span className="italic-display text-gold-ink">assembled with intent.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <p className="t-body text-ink-muted">
              Former FDA reviewers, board-certified clinicians, and regulatory veterans across
              toxicology, CMC, biostatistics, clinical, and finance. Select a name to read the full
              biography.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-3">
          {bench.map((member, i) => (
            <Reveal as="div" key={member.id} delay={(i % 3) * 0.08}>
              <BenchCard member={member} onOpen={() => onSelect(member)} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Bio dialog */
function BioDialog({ member, onClose }: { member: Member | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const inside = active ? panelRef.current.contains(active) : false;
        if (e.shiftKey) {
          if (!inside || active === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (!inside || active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (member) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
        lastFocusedRef.current = null;
      }
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [member, handleKeyDown]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div aria-hidden className="absolute inset-0 bg-plum-abyss/70 backdrop-blur-sm" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bio-dialog-name"
            initial={{ scale: 0.97, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 flex max-h-[86svh] w-full max-w-4xl flex-col overflow-hidden rounded-sm border border-line bg-paper-raised shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close biography"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-paper/85 text-ink backdrop-blur transition-all duration-300 hover:rotate-90 hover:bg-gold/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-5/12">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center overflow-y-auto p-8 md:w-7/12 md:p-12">
              <Eyebrow>{member.role}</Eyebrow>
              <h3
                id="bio-dialog-name"
                className="t-h2 mt-4 text-ink"
              >
                {member.name}
              </h3>

              {member.quote && (
                <blockquote className="mt-6 border-l-2 border-gold-ink/50 pl-5">
                  <p className="font-serif text-xl italic leading-snug text-ink-soft">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </blockquote>
              )}

              <p className="t-body mt-6 text-ink-muted">{member.bio}</p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="klink t-label mt-8 inline-flex items-center gap-2 self-start text-gold-ink"
              >
                <Linkedin size={15} aria-hidden />
                LinkedIn
                <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------- Closing CTA */
function Closing() {
  return (
    <Section tone="abyss" grain className="overflow-hidden">
      <Container>
        <Reveal>
          <p className="t-label text-gold-light">Build the future of women&rsquo;s health</p>
        </Reveal>
        <Reveal className="mt-8">
          <h2 className="t-display max-w-5xl text-paper-on-dark">
            Do the work that <span className="italic-display text-gold-light">matters most.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href="/contact?subject=career" variant="primary-on-dark">
            Work with us
          </MagneticButton>
          <MagneticButton href="/contact?subject=partnership" variant="ghost-on-dark">
            Partner with us
          </MagneticButton>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <p className="t-body max-w-md text-muted-on-dark">
            {SITE.legalName} · {SITE.location}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------- Page */
export default function TeamPage() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <FounderSpotlight />
        <Bench onSelect={setSelected} />
        <Closing />
      </main>
      <BioDialog member={selected} onClose={() => setSelected(null)} />
      <Footer />
    </>
  );
}
