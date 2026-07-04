"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import Button from "@/components/site/Button";
import Reveal from "@/components/site/Reveal";
import { TEAM, type Member } from "@/lib/site";

const [FOUNDER, ...BENCH] = TEAM;

/* --------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <Section tone="paper" className="pt-32 md:pt-40" rhythm={false}>
      <Container>
        <div className="max-w-3xl reveal pb-16 md:pb-24">
          <Eyebrow>Our team</Eyebrow>
          <h1 className="t-hero mt-6 text-ink">The people behind the platform.</h1>
          <p className="t-lead mt-6 max-w-2xl">
            EndoCyclic is led by founder and CEO Dr. Tanya Petrossian, with a team whose
            expertise spans peptide chemistry, regulatory affairs, oncology, and women’s health.
          </p>
        </div>
        <div className="h-px w-full bg-line" />
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------- Founder */
function Founder() {
  return (
    <Section tone="tint-teal">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-tint-warm">
              <Image
                src={FOUNDER.image}
                alt={`Portrait of ${FOUNDER.name}, ${FOUNDER.role} of EndoCyclic Therapeutics`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <Eyebrow>Founder &amp; CEO</Eyebrow>
            <h2 className="t-h2 mt-4 text-ink">{FOUNDER.name}</h2>
            <p className="mt-1.5 text-sm font-medium text-teal-ink">{FOUNDER.role}</p>

            {FOUNDER.quote && (
              <blockquote className="mt-7 border-l-2 border-teal pl-5 text-ink">
                <p className="text-lg leading-relaxed">“{FOUNDER.quote}”</p>
              </blockquote>
            )}

            <p className="t-body mt-7 text-muted">{FOUNDER.bio}</p>

            <div className="mt-8">
              <Button href={FOUNDER.linkedin} variant="quiet" external>
                Connect on LinkedIn
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Bench card */
function BenchCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
      aria-haspopup="dialog"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-tint-warm">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role} at EndoCyclic Therapeutics`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-teal-ink">
        {member.role}
      </p>
      <h3 className="t-h3 mt-1.5 text-ink">{member.name}</h3>
      <span className="mt-2 inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-ink">
        Read bio
        <ArrowUpRight size={14} aria-hidden />
      </span>
    </button>
  );
}

/* ----------------------------------------------------------------- Bench */
function Bench({ onOpen }: { onOpen: (m: Member) => void }) {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <Eyebrow>Leadership &amp; advisors</Eyebrow>
          <h2 className="t-h2 mt-4 max-w-2xl text-ink">
            A team of seasoned drug developers and former FDA reviewers.
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {BENCH.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.06}>
              <BenchCard member={m} onOpen={() => onOpen(m)} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- Bio modal */
function BioModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = `bio-title-${member.id}`;
  const descId = `bio-desc-${member.id}`;

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onKeyDown={onKeyDown}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close biography"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-plum/40 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close biography"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-tint-warm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink"
        >
          <X size={18} aria-hidden />
        </button>

        <div className="flex items-start gap-5 pr-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-tint-warm sm:h-24 sm:w-24">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-teal-ink">
              {member.role}
            </p>
            <h2 id={titleId} className="t-h3 mt-1.5 text-ink">
              {member.name}
            </h2>
          </div>
        </div>

        <p id={descId} className="t-body mt-6 text-muted">
          {member.bio}
        </p>

        <div className="mt-7 border-t border-line pt-5">
          <Button href={member.linkedin} variant="quiet" external>
            Connect on LinkedIn
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------------- Closing */
function Closing() {
  return (
    <Section tone="plum">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="dark">Join us</Eyebrow>
            <h2 className="t-h2 mt-4 text-on-dark">Help us change what a diagnosis can mean.</h2>
            <p className="mt-5 max-w-xl text-muted-on-dark">
              We’re building a team as precise as our science. If our mission resonates, we’d
              like to hear from you.
            </p>
            <div className="mt-8">
              <Button href="/contact?subject=career" variant="ghost-on-dark">
                Explore careers
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ Page */
export default function TeamPage() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <main id="main-content">
      <Hero />
      <Founder />
      <Bench onOpen={setActive} />
      <Closing />

      <AnimatePresence>
        {active && <BioModal member={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </main>
  );
}
