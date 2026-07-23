import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "ghost-on-dark" | "quiet";

const base =
  "relative isolate inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-[border-color,color,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.975] motion-reduce:transform-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "overflow-hidden bg-rose-ink px-6 py-3 text-on-dark before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-plum before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
  ghost:
    "overflow-hidden border border-line bg-transparent px-6 py-3 text-ink before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-plum before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-plum hover:text-on-dark hover:before:scale-x-100 focus-visible:border-plum focus-visible:text-on-dark focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
  "ghost-on-dark":
    "overflow-hidden border border-line-on-dark bg-transparent px-6 py-3 text-on-dark before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-on-dark before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-on-dark hover:text-plum hover:before:scale-x-100 focus-visible:text-plum focus-visible:outline-teal-on-dark focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
  quiet: "gap-1.5 px-1 text-teal-ink hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  arrow = false,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const cls = clsx(base, variants[variant], className);
  const inner = (
    <>
      <span className={clsx("relative z-10", variant === "quiet" && "link-underline")}>{children}</span>
      {(arrow || variant === "quiet") && (
        <ArrowRight
          size={variant === "quiet" ? 15 : 16}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden
        />
      )}
    </>
  );
  if (external) {
    const opensNewTab = /^https?:\/\//.test(href);
    return (
      <a href={href} target={opensNewTab ? "_blank" : undefined} rel={opensNewTab ? "noopener noreferrer" : undefined} onClick={onClick} className={clsx("group", cls)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={clsx("group", cls)}>
      {inner}
    </Link>
  );
}
