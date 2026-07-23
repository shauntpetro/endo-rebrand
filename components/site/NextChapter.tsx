import { clsx } from "clsx";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

export default function NextChapter({
  eyebrow = "Continue the story",
  title,
  children,
  actions,
  tone = "warm",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  actions: React.ReactNode;
  tone?: "warm" | "plum" | "teal";
}) {
  const dark = tone === "plum";
  return (
    <section
      data-tone={dark ? "dark" : "light"}
      className={clsx(
        "section-proof border-t",
        tone === "warm" && "bg-tint-warm text-ink-body",
        tone === "teal" && "bg-tint-teal text-ink-body",
        dark ? "border-line-on-dark bg-plum text-on-dark" : "border-line",
      )}
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-rose via-gold to-teal" />
              <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
            </div>
            <h2 className={clsx("t-h2 mt-4", dark ? "!text-on-dark" : "text-ink")}>{title}</h2>
            {children && <div className={clsx("mt-4 max-w-2xl", dark ? "text-muted-on-dark" : "text-muted")}>{children}</div>}
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">{actions}</div>
        </div>
      </Container>
    </section>
  );
}
