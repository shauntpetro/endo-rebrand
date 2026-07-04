import { clsx } from "clsx";

export default function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "t-label inline-flex items-center gap-3",
        tone === "dark" ? "text-gold-light" : "text-gold-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx("h-px w-8", tone === "dark" ? "bg-gold-light/60" : "bg-gold-ink/50")}
      />
      {children}
    </span>
  );
}
