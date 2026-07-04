import { clsx } from "clsx";

/**
 * Quiet CSS fade-up. Content ALWAYS ends visible (animation fill + the
 * reduced-motion rule in globals.css collapse it to the final state) — no
 * IntersectionObserver, no stuck-hidden states. Plays on mount.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  return (
    <Tag className={clsx("reveal", className)} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}
