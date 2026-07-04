"use client";

import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import { useOverlay, type OverlayId } from "./overlay";

type Variant = "solid" | "gold" | "ghost" | "ghost-on-dark" | "gold-on-dark";

const base =
  "group inline-flex items-center justify-center gap-2.5 px-8 py-4 t-label transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper-on-dark hover:bg-gold hover:text-ink",
  gold: "bg-gold text-ink hover:bg-ink hover:text-paper-on-dark",
  ghost: "border-2 border-ink text-ink hover:bg-ink hover:text-paper-on-dark",
  "ghost-on-dark": "border-2 border-cream/40 text-cream hover:bg-gold hover:text-ink hover:border-gold",
  "gold-on-dark": "bg-gold text-ink hover:bg-cream hover:text-ink",
};

export default function FilmCTA({
  children,
  overlay,
  scene,
  href,
  external,
  variant = "solid",
  arrow = true,
  className,
}: {
  children: React.ReactNode;
  overlay?: OverlayId;
  scene?: string;
  href?: string;
  external?: boolean;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const { open } = useOverlay();
  const cls = clsx(base, variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={15} strokeWidth={2.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={() => {
        if (overlay) open(overlay);
        else if (scene) document.getElementById(scene)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {inner}
    </button>
  );
}
