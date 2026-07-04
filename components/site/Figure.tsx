import { clsx } from "clsx";

/**
 * Calm, journal-grade figure frame. Wraps an SVG (or image) with an optional
 * "Figure N" label and a caption. Static by design — no scroll-triggered motion.
 */
export default function Figure({
  children,
  caption,
  label,
  framed = true,
  className,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  label?: string;
  framed?: boolean;
  className?: string;
}) {
  return (
    <figure className={clsx("not-prose", className)}>
      <div
        className={clsx(
          "overflow-hidden",
          framed && "rounded-xl border border-line bg-surface p-5 md:p-8",
        )}
      >
        {children}
      </div>
      {(label || caption) && (
        <figcaption className="mt-3 flex gap-3 text-sm text-muted">
          {label && <span className="eyebrow shrink-0 pt-0.5 text-teal-ink">{label}</span>}
          {caption && <span className="max-w-2xl">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
