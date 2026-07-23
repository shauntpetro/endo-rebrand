"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { clsx } from "clsx";
import { NAV_LINKS } from "@/lib/site";
import Button from "./Button";

const panelVariants: Variants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      clipPath: { duration: 0.38, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.22, ease: "easeOut" },
      when: "afterChildren",
    },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      clipPath: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.18, ease: "easeOut" },
      when: "beforeChildren",
    },
  },
};

const listVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.025, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.05, staggerChildren: 0.045 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.18, ease: "easeIn" } },
  open: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [menuPresent, setMenuPresent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 32,
    mass: 0.24,
  });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => {
    setMenuPresent(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 18);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuPresent) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>(".skip-to-content, main, footer"));
    const previouslyInert = new Map(background.map((node) => [node, node.hasAttribute("inert")]));
    const previousBodyOverflow = document.body.style.overflow;
    background.forEach((node) => node.setAttribute("inert", ""));

    const focusable = () => Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    );
    requestAnimationFrame(() => focusable()[0]?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousBodyOverflow;
      background.forEach((node) => {
        if (!previouslyInert.get(node)) node.removeAttribute("inert");
      });
      const focusTarget = previouslyFocused?.isConnected ? previouslyFocused : menuButton;
      focusTarget?.focus();
    };
  }, [menuPresent, close]);

  const activePanelVariants: Variants = reducedMotion
    ? {
        closed: { opacity: 0, transition: { duration: 0 } },
        open: { opacity: 1, transition: { duration: 0 } },
      }
    : panelVariants;

  const activeListVariants: Variants = reducedMotion
    ? { closed: {}, open: {} }
    : listVariants;

  const activeItemVariants: Variants = reducedMotion
    ? {
        closed: { opacity: 0, transition: { duration: 0 } },
        open: { opacity: 1, transition: { duration: 0 } },
      }
    : itemVariants;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-rose via-gold to-teal"
          style={{ scaleX: progressScale }}
        />
      )}
      <nav
        aria-label="Main"
        aria-hidden={menuPresent || undefined}
        inert={menuPresent || undefined}
        className="pointer-events-auto relative isolate mx-auto mt-2 flex h-14 max-w-[74rem] items-center justify-between gap-5 px-3 sm:px-5 lg:px-7"
      >
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none absolute inset-0 -z-10 rounded-full border border-line-soft bg-paper/95 shadow-[0_12px_38px_rgb(57_38_56/0.08)] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <Link
          href="/"
          onClick={close}
          aria-label="EndoCyclic Therapeutics — home"
          className="relative flex h-11 w-36 shrink-0 items-center lg:w-40"
        >
          <Image
            src="/logo.avif"
            alt="EndoCyclic Therapeutics"
            width={233}
            height={70}
            sizes="160px"
            priority
            className="h-auto w-full object-contain object-left"
          />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <ul className="flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative inline-flex min-h-11 items-center px-2.5 text-sm transition-colors after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-px after:origin-left after:bg-gradient-to-r after:from-rose after:to-teal after:transition-transform",
                      active ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/investors"
            aria-current={pathname === "/investors" ? "page" : undefined}
            className={clsx(
              "inline-flex min-h-11 items-center px-2 text-sm transition-colors",
              pathname === "/investors" ? "text-rose-ink" : "text-muted hover:text-ink",
            )}
          >
            Investors
          </Link>
          <Button href="/contact?subject=partnership">
            Partner with us
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          ref={menuButtonRef}
          onClick={openMenu}
          className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence
        initial={false}
        onExitComplete={() => setMenuPresent(false)}
      >
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            ref={menuRef}
            initial={reducedMotion ? false : "closed"}
            animate="open"
            exit="closed"
            variants={activePanelVariants}
            className="pointer-events-auto fixed inset-0 overflow-y-auto bg-paper px-5 pb-10 pt-4 lg:hidden"
          >
            <div className="mx-auto flex max-w-xl items-center justify-between">
              <Link href="/" onClick={close} aria-label="EndoCyclic Therapeutics — home" className="relative flex h-11 w-36 items-center">
                <Image src="/logo.avif" alt="EndoCyclic Therapeutics" width={233} height={70} sizes="144px" className="h-auto w-full object-contain object-left" />
              </Link>
              <button type="button" onClick={close} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center text-ink">
                <X size={23} />
              </button>
            </div>

            <motion.div className="mx-auto mt-8 max-w-xl" variants={activeListVariants}>
              <motion.p className="eyebrow" variants={activeItemVariants}>Navigate</motion.p>
              <motion.ul className="mt-4 flex flex-col divide-y divide-line-soft border-y border-line-soft" variants={activeListVariants}>
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li key={link.href} variants={activeItemVariants}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        onClick={close}
                        className={clsx("flex min-h-16 items-center justify-between text-xl", active ? "text-rose-ink" : "text-ink")}
                      >
                        {link.name}
                        <span aria-hidden className="text-sm text-muted">→</span>
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li variants={activeItemVariants}>
                  <Link
                    href="/investors"
                    aria-current={pathname === "/investors" ? "page" : undefined}
                    onClick={close}
                    className={clsx("flex min-h-16 items-center justify-between text-xl", pathname === "/investors" ? "text-rose-ink" : "text-ink")}
                  >
                    Investors <span aria-hidden className="text-sm text-muted">→</span>
                  </Link>
                </motion.li>
              </motion.ul>
              <motion.div variants={activeItemVariants}>
                <Button href="/contact?subject=partnership" onClick={close} className="mt-8">
                  Partner with us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
