import { clsx } from "clsx";

type Tone = "paper" | "white" | "tint-plum" | "tint-teal" | "tint-warm" | "plum";
type Size = "hero" | "chapter" | "proof" | "compact";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink-body",
  white: "bg-surface text-ink-body",
  "tint-plum": "bg-tint-plum text-ink-body",
  "tint-teal": "bg-tint-teal text-ink-body",
  "tint-warm": "bg-tint-warm text-ink-body",
  plum: "bg-plum text-on-dark",
};

const sizeClass: Record<Size, string> = {
  hero: "section-hero",
  chapter: "section-chapter",
  proof: "section-proof",
  compact: "section-compact",
};

export default function Section({
  children,
  tone = "paper",
  id,
  className,
  rhythm = true,
  size = "chapter",
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  rhythm?: boolean;
  size?: Size;
}) {
  return (
    <section
      id={id}
      data-tone={tone === "plum" ? "dark" : "light"}
      className={clsx(toneClass[tone], rhythm && sizeClass[size], className)}
    >
      {children}
    </section>
  );
}
