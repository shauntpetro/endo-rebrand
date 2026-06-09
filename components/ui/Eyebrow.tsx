import clsx from "clsx";

export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "plum";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "text-xs font-bold uppercase tracking-[0.2em]",
        tone === "gold" ? "text-gold-primary" : "text-plum-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
