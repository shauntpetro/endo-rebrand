import { clsx } from "clsx";

type Tone = "paper" | "paper-sunk" | "dark" | "abyss";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-sunk": "bg-paper-sunk text-ink",
  dark: "bg-plum-deep text-paper-on-dark",
  abyss: "bg-plum-abyss text-paper-on-dark",
};

export default function Section({
  children,
  tone = "paper",
  id,
  rhythm = true,
  className,
  grain = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  rhythm?: boolean;
  className?: string;
  grain?: boolean;
}) {
  const dark = tone === "dark" || tone === "abyss";
  return (
    <section
      id={id}
      data-tone={dark ? "dark" : "light"}
      className={clsx(
        "relative",
        toneClass[tone],
        rhythm && "section-rhythm",
        grain && "grain",
        className,
      )}
    >
      {children}
    </section>
  );
}
