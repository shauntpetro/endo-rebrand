import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "ghost-on-dark" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink";

const variants: Record<Variant, string> = {
  primary: "bg-plum px-6 py-3 text-on-dark hover:bg-teal-ink",
  ghost: "border border-line px-6 py-3 text-ink hover:border-ink",
  "ghost-on-dark": "border border-line-on-dark px-6 py-3 text-on-dark hover:border-on-dark",
  quiet: "gap-1.5 text-teal-ink hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  arrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const cls = clsx(base, variants[variant], className);
  const inner = (
    <>
      <span className={variant === "quiet" ? "link-underline" : undefined}>{children}</span>
      {(arrow || variant === "quiet") && (
        <ArrowRight size={variant === "quiet" ? 15 : 16} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clsx("group", cls)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={clsx("group", cls)}>
      {inner}
    </Link>
  );
}
