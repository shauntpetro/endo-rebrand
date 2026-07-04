"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { clsx } from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Headline whose words rise out of a mask, staggered. Each word sits in an
 * overflow-hidden wrapper so the motion reads as type "setting" into place.
 * Content is real text (SSR-visible); reduced motion shows it instantly.
 *
 * Pass an array of lines; each line breaks. Use <em>-style emphasis by wrapping
 * a segment with { text, accent: true }.
 */
export type Segment = string | { text: string; accent?: boolean; italic?: boolean };

export default function SplitText({
  lines,
  className,
  delay = 0,
  stagger = 0.055,
  play = true,
  accentClass = "text-gold-ink",
}: {
  lines: Segment[][];
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  accentClass?: string;
}) {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: reduced ? { y: "0%" } : { y: "115%" },
    show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
  };

  let key = 0;
  return (
    <motion.span
      className={clsx("block", className)}
      variants={container}
      initial="hidden"
      animate={play ? "show" : "hidden"}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg) => {
            const text = typeof seg === "string" ? seg : seg.text;
            const accent = typeof seg === "object" && seg.accent;
            const italic = typeof seg === "object" && seg.italic;
            return text.split(" ").map((w, wi) => (
              <span
                key={key++}
                className="inline-block overflow-hidden align-baseline"
                style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
              >
                <motion.span
                  variants={word}
                  className={clsx(
                    "inline-block",
                    accent && accentClass,
                    italic && "italic-display",
                  )}
                >
                  {w}
                  {wi < text.split(" ").length - 1 ? " " : ""}
                </motion.span>
                {wi === text.split(" ").length - 1 ? " " : null}
              </span>
            ));
          })}
        </span>
      ))}
    </motion.span>
  );
}
