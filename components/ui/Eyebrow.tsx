import clsx from "clsx";

/**
 * Small uppercase label. Gold contrast is context-dependent:
 * - `gold` (default) → gold-deep, WCAG-AA on LIGHT/cream backgrounds
 * - `gold-on-dark`   → bright gold-primary, for plum-dark cinematic beats
 * - `plum`           → plum-primary
 */
export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "gold-on-dark" | "plum";
  className?: string;
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold-deep"
      : tone === "gold-on-dark"
        ? "text-gold-primary"
        : "text-plum-primary";
  return (
    <span
      className={clsx(
        "text-xs font-bold uppercase tracking-[0.2em]",
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
