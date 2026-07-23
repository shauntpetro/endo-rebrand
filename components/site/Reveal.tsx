import { clsx } from "clsx";

/**
 * Progressive CSS view reveal. Content is visible by default, so unsupported
 * browsers and reduced-motion users never receive a hidden page.
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
  const rangeOffset = Math.max(0, Math.min(delay, 0.18)) * 30;
  const style = delay
    ? {
        "--reveal-y": `${12 + delay * 18}px`,
        "--reveal-start": `${4 + rangeOffset}%`,
        "--reveal-end": `${24 + rangeOffset}%`,
      } as React.CSSProperties
    : undefined;

  return (
    <Tag
      className={clsx("reveal", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
