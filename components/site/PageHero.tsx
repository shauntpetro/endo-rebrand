import Image from "next/image";
import { clsx } from "clsx";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

type HeroTone = "paper" | "tint-warm" | "tint-teal" | "tint-plum";
type HeroLayout = "editorial" | "reverse" | "stacked" | "portrait" | "evidence";
type HeroFrame = "bleed" | "soft" | "line" | "arch" | "plain";
type HeroAspect = "landscape" | "wide" | "portrait" | "auto";
type HeroVisualElement = "figure" | "div" | "aside" | "nav";

const toneClass: Record<HeroTone, string> = {
  paper: "bg-paper",
  "tint-warm": "bg-tint-warm",
  "tint-teal": "bg-tint-teal",
  "tint-plum": "bg-tint-plum",
};

const copyClass: Record<HeroLayout, string> = {
  editorial: "lg:col-span-6 xl:col-span-5",
  reverse: "lg:order-2 lg:col-span-6 lg:col-start-7",
  stacked: "lg:col-span-10 xl:col-span-9",
  portrait: "lg:col-span-7 xl:col-span-7",
  evidence: "lg:col-span-7 xl:col-span-7",
};

const figureClass: Record<HeroLayout, string> = {
  editorial: "lg:col-span-6 xl:col-span-7 xl:-mr-[max(0px,calc((100vw-74rem)/2))]",
  reverse: "lg:order-1 lg:col-span-6 xl:-ml-[max(0px,calc((100vw-74rem)/2))]",
  stacked: "lg:col-span-12",
  portrait: "lg:col-span-5 xl:col-span-4 xl:col-start-9",
  evidence: "lg:col-span-5 xl:col-span-5",
};

const frameClass: Record<HeroFrame, string> = {
  bleed: "hero-frame-bleed bg-surface",
  soft: "rounded-[1.5rem] bg-surface shadow-[0_24px_70px_rgb(57_38_56/0.09)] sm:rounded-[2rem]",
  line: "rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface sm:rounded-bl-[3rem] sm:rounded-tr-[3rem]",
  arch: "rounded-b-[1.5rem] rounded-t-[min(32vw,10rem)] bg-surface shadow-[0_24px_70px_rgb(57_38_56/0.08)]",
  plain: "bg-transparent",
};

const aspectClass: Record<HeroAspect, string> = {
  landscape: "aspect-[4/3] sm:aspect-[3/2]",
  wide: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2/1]",
  portrait: "aspect-[4/5]",
  auto: "min-h-[27rem] sm:min-h-[30rem]",
};

export default function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  proof,
  children,
  image,
  imageAlt = "",
  imagePriority = false,
  caption,
  tone = "paper",
  layout = "editorial",
  frame = "bleed",
  visualAspect = "landscape",
  className,
  visualClassName,
  titleClassName,
  visualAs: VisualTag = "figure",
  visualLabel,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  proof?: React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  caption?: React.ReactNode;
  tone?: HeroTone;
  layout?: HeroLayout;
  frame?: HeroFrame;
  visualAspect?: HeroAspect;
  className?: string;
  visualClassName?: string;
  titleClassName?: string;
  visualAs?: HeroVisualElement;
  visualLabel?: string;
}) {
  const visual = children ?? (image ? (
    <Image
      src={image}
      alt={imageAlt}
      fill
      priority={imagePriority}
      sizes={layout === "stacked" ? "(min-width: 1184px) 1120px, 94vw" : "(min-width: 1024px) 58vw, 94vw"}
      className="object-cover"
    />
  ) : null);

  const isStacked = layout === "stacked";

  return (
    <section
      data-hero-layout={layout}
      className={clsx("hero-stage relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36", toneClass[tone], className)}
    >
      <div aria-hidden className="hero-thread-trace" />
      <Container className="relative z-10">
        <div
          className={clsx(
            "grid gap-11 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-14 xl:gap-x-16",
            isStacked ? "items-end" : "items-center",
            !visual && "lg:min-h-[28rem]",
          )}
        >
          <div className={clsx("hero-copy-enter relative z-10", copyClass[layout], !visual && "lg:col-span-9")}>
            <div data-hero-step="eyebrow">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1
              data-hero-step="title"
              className={clsx(
                "t-hero mt-6 max-w-[16ch] text-ink",
                isStacked && "max-w-[19ch]",
                layout === "portrait" && "max-w-[15ch]",
                titleClassName,
              )}
            >
              {title}
            </h1>
            <p data-hero-step="intro" className="t-lead mt-6 max-w-2xl">{intro}</p>
            {actions && <div data-hero-step="actions" className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
            {proof && (
              <div data-hero-step="proof" className="mt-9 flex max-w-2xl items-start gap-3 text-sm text-muted">
                <span aria-hidden className="mt-[0.65rem] h-px w-9 shrink-0 bg-gradient-to-r from-rose via-gold to-teal" />
                <span>{proof}</span>
              </div>
            )}
          </div>

          {visual && (
            <VisualTag aria-label={visualLabel} className={clsx("hero-visual-enter min-w-0", figureClass[layout])}>
              <div className={clsx("hero-visual-frame relative overflow-hidden", aspectClass[visualAspect], frameClass[frame], visualClassName)}>
                {visual}
              </div>
              {caption && (
                VisualTag === "figure" ? (
                  <figcaption className={clsx("hero-visual-caption mt-4 max-w-2xl text-sm leading-relaxed text-muted lg:text-xs", layout === "reverse" && "lg:ml-auto")}>
                    {caption}
                  </figcaption>
                ) : (
                  <p className={clsx("hero-visual-caption mt-4 max-w-2xl text-sm leading-relaxed text-muted lg:text-xs", layout === "reverse" && "lg:ml-auto")}>
                    {caption}
                  </p>
                )
              )}
            </VisualTag>
          )}
        </div>
      </Container>
    </section>
  );
}
