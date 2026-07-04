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
        "eyebrow inline-flex items-center gap-2.5",
        tone === "dark" && "text-teal",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx("inline-block h-1.5 w-1.5 rounded-full", tone === "dark" ? "bg-teal" : "bg-teal")}
      />
      {children}
    </span>
  );
}
