"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { clsx } from "clsx";

export type SceneTone = "cream" | "cream-2" | "plum" | "ink" | "gold" | "teal";

const toneClass: Record<SceneTone, string> = {
  cream: "bg-cream text-ink",
  "cream-2": "bg-cream-2 text-ink",
  plum: "bg-plum text-paper-on-dark",
  ink: "bg-ink text-paper-on-dark",
  gold: "bg-gold text-ink",
  teal: "bg-teal text-cream-on-dark",
};

export const SCENE_DARK: ReadonlySet<SceneTone> = new Set<SceneTone>(["plum", "ink", "teal"]);

/**
 * A full-viewport act of the film. Anchored by `id` so the HUD can scroll to it.
 * `center` vertically centers content; set false for scenes that manage their
 * own layout (e.g. horizontal pinned tracks).
 */
export default function Scene({
  id,
  tone = "cream",
  center = true,
  grain = false,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  id: string;
  tone?: SceneTone;
  center?: boolean;
  grain?: boolean;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-tone={SCENE_DARK.has(tone) ? "dark" : "light"}
      className={clsx(
        "relative w-full overflow-hidden",
        center && "flex min-h-svh flex-col justify-center py-24 md:py-28",
        toneClass[tone],
        grain && "grain",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Standard inner width for scene content. */
export function SceneBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("container-editorial relative z-10 w-full", className)}>{children}</div>;
}

/**
 * Horizontal pinned track: a tall wrapper whose inner rail is sticky and
 * translates left as you scroll through it. Pass fixed-width panels as children.
 * `panels` is used to size the scroll distance. Degrades to normal vertical
 * stacking under reduced motion.
 */
export function HorizontalPin({
  children,
  panels,
  className,
}: {
  children: React.ReactNode;
  panels: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Move from 0% to the fraction that reveals all panels (panels-1)/panels of extra width.
  const shift = Math.max(0, (panels - 1) / panels) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${shift}%`]) as MotionValue<string>;

  if (reduced) {
    return (
      <div className={clsx("flex flex-col gap-6 py-16", className)}>{children}</div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: `${panels * 100}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
