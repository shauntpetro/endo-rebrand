import { clsx } from "clsx";

/**
 * Printed-dossier running head: "§ 01 — Label" over a hairline.
 */
export default function FolioHeading({
  index,
  label,
  tone = "light",
  className,
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={clsx("flex items-baseline gap-4", className)}>
      <span className={clsx("t-label shrink-0", dark ? "text-gold-light" : "text-gold-ink")}>
        § {index}
      </span>
      <span className={clsx("t-label shrink-0", dark ? "text-muted-on-dark" : "text-ink-muted")}>
        {label}
      </span>
      <span aria-hidden className={clsx("h-px flex-1", dark ? "bg-line-on-dark" : "bg-line")} />
    </div>
  );
}
