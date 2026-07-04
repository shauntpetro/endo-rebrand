"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { SCENES } from "./scenes";
import { useOverlay, type OverlayId } from "./overlay";

const EASE = [0.16, 1, 0.3, 1] as const;

type Dest =
  | { label: string; kind: "scene"; target: string }
  | { label: string; kind: "overlay"; target: OverlayId };

const MENU: Dest[] = [
  { label: "The Problem", kind: "scene", target: "problem" },
  { label: "The Platform", kind: "scene", target: "platform" },
  { label: "Mechanism", kind: "scene", target: "mechanism" },
  { label: "Pipeline", kind: "scene", target: "pipeline-scene" },
  { label: "Imaging", kind: "overlay", target: "imaging" },
  { label: "Validation", kind: "scene", target: "proof" },
  { label: "Team", kind: "overlay", target: "team" },
  { label: "News", kind: "overlay", target: "news" },
  { label: "Investors", kind: "overlay", target: "invest" },
  { label: "Media", kind: "overlay", target: "media" },
];

function scrollToScene(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HUD() {
  const { open } = useOverlay();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dark, setDark] = useState(false);
  const reduced = useReducedMotion();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Track the scene currently filling the viewport → drives progress + HUD color.
  useEffect(() => {
    const els = SCENES.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = SCENES.findIndex((s) => s.id === visible.target.id);
        if (idx >= 0) setActiveIndex(idx);
        setDark((visible.target as HTMLElement).dataset.tone === "dark");
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const fg = dark ? "text-paper-on-dark" : "text-ink";
  const go = (d: Dest) => {
    closeMenu();
    if (d.kind === "scene") scrollToScene(d.target);
    else open(d.target);
  };

  return (
    <>
      {/* top-left: mark */}
      <button
        onClick={() => scrollToScene("cover")}
        aria-label="EndoCyclic — back to top"
        className="fixed left-[clamp(1rem,4vw,2.5rem)] top-6 z-[70] block h-8 w-36 md:w-44"
      >
        <Image
          src="/logo.avif"
          alt="EndoCyclic Therapeutics"
          fill
          sizes="176px"
          priority
          className={clsx("object-contain object-left transition-all duration-300", dark && "brightness-0 invert")}
        />
      </button>

      {/* top-right: partner + menu */}
      <div className="fixed right-[clamp(1rem,4vw,2.5rem)] top-5 z-[70] flex items-center gap-3">
        <button
          onClick={() => open("contact")}
          className={clsx(
            "t-label hidden items-center gap-2 px-5 py-2.5 transition-colors duration-200 sm:inline-flex",
            dark ? "bg-gold text-ink hover:bg-cream" : "bg-ink text-paper-on-dark hover:bg-gold hover:text-ink",
          )}
        >
          <span aria-hidden className="h-2 w-2 bg-current" />
          Partner
        </button>
        <button
          ref={menuBtnRef}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className={clsx(
            "t-label flex items-center gap-2.5 border-2 px-4 py-2.5 transition-colors duration-200",
            dark ? "border-paper-on-dark text-paper-on-dark hover:bg-paper-on-dark hover:text-ink" : "border-ink text-ink hover:bg-ink hover:text-cream",
          )}
        >
          Index
          <span aria-hidden className="flex flex-col gap-[3px]">
            <span className="block h-[2px] w-4 bg-current" />
            <span className="block h-[2px] w-4 bg-current" />
          </span>
        </button>
      </div>

      {/* right rail: scene progress */}
      <div className="fixed right-[clamp(1rem,4vw,2.5rem)] top-1/2 z-[65] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToScene(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={i === activeIndex ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={clsx(
                "t-label opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                fg,
              )}
            >
              {s.label}
            </span>
            <span
              className={clsx(
                "block h-[2px] transition-all duration-300",
                i === activeIndex ? "w-8 bg-gold" : clsx("w-4", dark ? "bg-paper-on-dark/40" : "bg-ink/30"),
              )}
            />
          </button>
        ))}
      </div>

      {/* index menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[75] flex flex-col bg-ink px-[clamp(1.5rem,6vw,6rem)] pb-16 pt-28 text-cream"
          >
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="t-label absolute right-[clamp(1rem,4vw,2.5rem)] top-6 flex items-center gap-2 border-2 border-cream px-4 py-2.5 text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Close ✕
            </button>
            <p className="t-label mb-8 text-gold-soft">Index — one page, eight acts</p>
            <nav aria-label="Sections" className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
              {MENU.map((d, i) => (
                <motion.button
                  key={d.label}
                  onClick={() => go(d)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.04 + i * 0.03, duration: 0.4, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-line-on-dark py-4 text-left"
                >
                  <span className="t-num text-lg text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-h3 text-cream transition-colors group-hover:text-gold-soft">{d.label}</span>
                  {d.kind === "overlay" && (
                    <span aria-hidden className="ml-auto self-center text-gold-soft">↗</span>
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
