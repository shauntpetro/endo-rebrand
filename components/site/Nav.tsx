"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { NAV_LINKS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav({ overDark = false }: { overDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  // Light text only when over a dark hero AND not scrolled AND menu closed.
  const lightText = overDark && !scrolled && !open;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-paper/85 backdrop-blur-xl border-b border-line py-3"
            : "bg-transparent border-b border-transparent py-5",
        )}
      >
        <nav aria-label="Main" className="container-editorial flex items-center justify-between gap-6">
          <Link href="/" aria-label="EndoCyclic Therapeutics — home" className="relative block h-9 w-40 lg:w-48 shrink-0">
            <Image
              src="/logo.avif"
              alt="EndoCyclic Therapeutics"
              fill
              sizes="192px"
              priority
              className={clsx("object-contain object-left transition-all duration-500", lightText && "brightness-0 invert")}
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active}
                  className={clsx(
                    "klink t-label transition-colors",
                    lightText
                      ? "text-paper-on-dark/85 hover:text-paper-on-dark"
                      : active
                        ? "text-gold-ink"
                        : "text-ink/75 hover:text-ink",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact?subject=partnership"
              className={clsx(
                "t-label rounded-full px-5 py-2.5 transition-colors duration-300",
                lightText
                  ? "bg-paper text-plum-abyss hover:bg-gold"
                  : "bg-plum-deep text-paper-on-dark hover:bg-gold-ink",
              )}
            >
              Partner
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              "relative z-[60] flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
              lightText ? "text-paper-on-dark" : "text-ink",
            )}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-plum-abyss px-8 pb-10 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block border-b border-line-on-dark py-4 font-serif text-3xl text-paper-on-dark"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + NAV_LINKS.length * 0.045, duration: 0.5, ease: EASE }}
              className="mt-8"
            >
              <Link
                href="/contact?subject=partnership"
                onClick={close}
                className="t-label block w-full rounded-full bg-gold px-6 py-4 text-center text-plum-abyss"
              >
                Partner with us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
