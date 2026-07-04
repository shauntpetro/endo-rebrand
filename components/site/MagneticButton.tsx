"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "primary-on-dark" | "ghost-on-dark";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 t-label transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  primary: "bg-plum-deep text-paper-on-dark hover:bg-gold-ink",
  ghost: "border border-line text-ink hover:border-gold-ink hover:text-gold-ink",
  "primary-on-dark": "bg-gold text-plum-abyss hover:bg-paper-on-dark",
  "ghost-on-dark":
    "border border-line-on-dark text-paper-on-dark hover:border-gold-light hover:text-gold-light",
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  arrow = true,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = clsx(base, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={2}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}
