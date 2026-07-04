"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useOverlay, type OverlayId } from "./overlay";

import PipelinePanel from "./overlays/PipelinePanel";
import TeamPanel from "./overlays/TeamPanel";
import NewsPanel from "./overlays/NewsPanel";
import ContactPanel from "./overlays/ContactPanel";
import InvestPanel from "./overlays/InvestPanel";
import MediaPanel from "./overlays/MediaPanel";
import ImagingPanel from "./overlays/ImagingPanel";

const PANELS: Record<OverlayId, React.ComponentType<{ param?: string }>> = {
  pipeline: PipelinePanel,
  team: TeamPanel,
  news: NewsPanel,
  contact: ContactPanel,
  invest: InvestPanel,
  media: MediaPanel,
  imaging: ImagingPanel,
};

const TITLES: Record<OverlayId, string> = {
  pipeline: "Pipeline",
  team: "Team",
  news: "Newsroom",
  contact: "Contact",
  invest: "Investors",
  media: "Media kit",
  imaging: "Imaging",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function OverlayHost() {
  const { current, param, close } = useOverlay();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!current) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const inside = active ? panelRef.current.contains(active) : false;
        if (e.shiftKey && (!inside || active === first)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (!inside || active === last)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
      lastFocus.current?.focus?.();
      lastFocus.current = null;
    };
  }, [current, close]);

  const Panel = current ? PANELS[current] : null;

  return (
    <AnimatePresence>
      {current && Panel && (
        <motion.div
          className="fixed inset-0 z-[80] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={TITLES[current]}
            initial={reduced ? { opacity: 0 } : { x: "6%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: "4%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative h-full w-full overflow-y-auto overscroll-contain bg-cream text-ink shadow-2xl md:w-[min(1100px,94vw)]"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-ink bg-cream/90 px-6 py-4 backdrop-blur md:px-10">
              <span className="t-label flex items-center gap-2 text-ink">
                <span aria-hidden className="h-2.5 w-2.5 bg-gold" />
                {TITLES[current]}
              </span>
              <button
                ref={closeRef}
                onClick={close}
                aria-label="Close panel"
                className="flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <X size={20} />
              </button>
            </div>
            <Panel param={param} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
