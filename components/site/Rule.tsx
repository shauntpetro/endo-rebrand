import { clsx } from "clsx";

export default function Rule({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <hr
      className={clsx("border-0 h-px", tone === "dark" ? "bg-line-on-dark" : "bg-line", className)}
    />
  );
}
