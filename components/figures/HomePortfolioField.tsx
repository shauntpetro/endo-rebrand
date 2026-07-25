"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import ArtDirectedImage from "@/components/site/ArtDirectedImage";
import {
  ENDO205_MECHANISM_ALT,
  ENDO205_MECHANISM_IMAGE,
  ENDO205_PORTFOLIO_IMAGE,
  PHASES,
  PIPELINE,
  type Area,
} from "@/lib/site";

type ProgramPresentation = {
  image: string;
  mobileImage?: string;
  imageAlt: string;
  imageFit?: string;
  imagePosition: string;
  currentStage: string;
  href: string;
};

type PortfolioOrientation = "horizontal" | "vertical";

const PORTFOLIO_VERTICAL_QUERY = "(min-width: 1024px)";

const AREA_PRESENTATION: Record<
  Area,
  {
    label: string;
    markerFill: string;
    markerBorder: string;
    stripe: string;
  }
> = {
  Endometriosis: {
    label: "text-rose-on-dark",
    markerFill: "bg-rose",
    markerBorder: "border-rose",
    stripe: "bg-rose/70",
  },
  Oncology: {
    label: "text-teal-on-dark",
    markerFill: "bg-teal",
    markerBorder: "border-teal-on-dark",
    stripe: "bg-teal/70",
  },
};

const PRESENTATION: Record<string, ProgramPresentation> = {
  "ENDO-205": {
    image: ENDO205_PORTFOLIO_IMAGE,
    mobileImage: ENDO205_MECHANISM_IMAGE,
    imageAlt: ENDO205_MECHANISM_ALT,
    imageFit: "object-cover",
    imagePosition: "object-center",
    currentStage: "Phase 1",
    href: "/pipeline#endo-205",
  },
  FemLUNA: {
    image: "/illustrations/femluna-targeting-v3.avif",
    imageAlt:
      "Conceptual anatomical illustration of a targeted imaging agent near endometriosis tissue.",
    imagePosition: "object-[62%_center]",
    currentStage: "IND-enabling",
    href: "/pipeline#femluna",
  },
  "ENDO-995": {
    image: "/illustrations/endo-995-intracellular-v4.avif",
    imageAlt:
      "Conceptual illustration of a tumor-selective cyclic peptide crossing a tumor-cell membrane toward an intracellular target.",
    imagePosition: "object-center",
    currentStage: "Pre-clinical",
    href: "/pipeline#endo-995",
  },
  "ENDO-311": {
    image: "/illustrations/endo-311-localization-pair-v4.avif",
    imageAlt:
      "Conceptual illustration of a targeted imaging agent localizing around an intact solid-tumor focus.",
    imagePosition: "object-center",
    currentStage: "Pre-clinical",
    href: "/pipeline#endo-311",
  },
};

function PortfolioProgramImage({
  presentation,
  alt,
}: {
  presentation: ProgramPresentation;
  alt: string;
}) {
  const imageClassName = clsx(
    presentation.imageFit ?? "object-contain sm:object-cover",
    presentation.imagePosition,
  );

  if (presentation.mobileImage) {
    return (
      <ArtDirectedImage
        desktopSrc={presentation.image}
        mobileSrc={presentation.mobileImage}
        alt={alt}
        sizes="(min-width: 1184px) 650px, (min-width: 1024px) 55vw, 100vw"
        mobileSizes="100vw"
        mobileMedia="(max-width: 63.999rem)"
        desktopMedia="(min-width: 64rem)"
        className={imageClassName}
      />
    );
  }

  return (
    <Image
      src={presentation.image}
      alt={alt}
      fill
      sizes="(min-width: 1184px) 650px, (min-width: 1024px) 55vw, 100vw"
      className={imageClassName}
    />
  );
}

function firstSentence(summary: string) {
  const [sentence] = summary.split(". ");
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

function StaticPortfolio({
  titleId,
  printOnly = false,
}: {
  titleId: string;
  printOnly?: boolean;
}) {
  return (
    <section
      data-home-portfolio-print={printOnly ? "" : undefined}
      aria-labelledby={titleId}
      className={clsx(
        "mb-5 overflow-hidden rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface",
        printOnly && "hidden print:block",
      )}
    >
      <div className="border-b border-line px-5 py-6 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-ink">
          Development portfolio
        </p>
        <h3
          id={titleId}
          className="mt-2 text-2xl font-medium tracking-[-0.025em] text-ink"
        >
          Browse every program
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Open a program brief for its indication, modality, and current
          development stage.
        </p>
      </div>

      <ol className="grid list-none divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {PIPELINE.map((program, index) => {
          const presentation = PRESENTATION[program.id];

          return (
            <li
              key={program.id}
              className={clsx(
                "min-w-0",
                index % 2 === 0 && "sm:border-r sm:border-line",
                index >= 2 && "sm:border-t sm:border-line",
              )}
            >
              <Link
                href={presentation.href}
                prefetch={false}
                className="group flex h-full min-h-44 flex-col px-5 py-5 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink sm:px-7"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.11em] text-rose-ink">
                  {program.area} · {program.modality}
                </span>
                <span className="mt-3 text-2xl font-medium tracking-[-0.03em] text-ink">
                  {program.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">
                  {program.indication}
                </span>
                <span className="mt-auto flex items-center justify-between gap-4 pt-5 text-sm font-semibold text-teal-ink">
                  <span>{presentation.currentStage}</span>
                  <span className="inline-flex items-center gap-2">
                    View brief
                    <ArrowRight aria-hidden size={16} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default function HomePortfolioField() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [primedIndex, setPrimedIndex] = useState<number | null>(null);
  const [tabOrientation, setTabOrientation] =
    useState<PortfolioOrientation>("horizontal");
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const primeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProgram = PIPELINE[activeIndex];
  const activePresentation = PRESENTATION[activeProgram.id];
  const previousProgram =
    previousIndex === null ? null : PIPELINE[previousIndex];
  const previousPresentation = previousProgram
    ? PRESENTATION[previousProgram.id]
    : null;
  const primedProgram =
    primedIndex === null ? null : PIPELINE[primedIndex];
  const primedPresentation = primedProgram
    ? PRESENTATION[primedProgram.id]
    : null;

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (primeTimerRef.current) {
        clearTimeout(primeTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const media = window.matchMedia(PORTFOLIO_VERTICAL_QUERY);
    const updateOrientation = () => {
      setTabOrientation(media.matches ? "vertical" : "horizontal");
    };

    updateOrientation();
    media.addEventListener("change", updateOrientation);
    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  function activateProgram(nextIndex: number, moveFocus = false) {
    if (nextIndex === activeIndex) {
      if (moveFocus) {
        buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
      }
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setPreviousIndex(prefersReducedMotion ? null : activeIndex);
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setHasInteracted(true);
    setPrimedIndex(null);
    setActiveIndex(nextIndex);

    if (!prefersReducedMotion) {
      transitionTimerRef.current = setTimeout(() => {
        setPreviousIndex(null);
        transitionTimerRef.current = null;
      }, 760);
    }

    if (moveFocus) {
      requestAnimationFrame(() => {
        const button = buttonRefs.current[nextIndex];
        button?.focus({ preventScroll: true });
        if (button && window.matchMedia("(max-width: 1023px)").matches) {
          button.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      });
    }
  }

  function primeProgram(index: number) {
    if (index === activeIndex) return;

    setPrimedIndex(index);
  }

  function cancelScheduledPrime() {
    if (!primeTimerRef.current) return;
    clearTimeout(primeTimerRef.current);
    primeTimerRef.current = null;
  }

  function scheduleProgramPrime(index: number) {
    cancelScheduledPrime();
    primeTimerRef.current = setTimeout(() => {
      primeProgram(index);
      primeTimerRef.current = null;
    }, 120);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    const forwardKey =
      tabOrientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const backwardKey =
      tabOrientation === "vertical" ? "ArrowUp" : "ArrowLeft";

    switch (event.key) {
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = PIPELINE.length - 1;
        break;
      default:
        if (event.key === forwardKey) {
          nextIndex = (index + 1) % PIPELINE.length;
        } else if (event.key === backwardKey) {
          nextIndex = (index - 1 + PIPELINE.length) % PIPELINE.length;
        } else {
          return;
        }
    }

    event.preventDefault();
    activateProgram(nextIndex, true);
  }

  const tabId = `home-portfolio-${activeProgram.id.toLowerCase()}-tab`;
  const panelId = "home-portfolio-program-panel";
  const instructionsId = "home-portfolio-instructions";

  return (
    <figure>
      <noscript>
        <style>{`
          [data-home-portfolio-enhanced] { display: none !important; }
          [data-home-portfolio-print] { display: none !important; }
        `}</style>
        <StaticPortfolio titleId="home-portfolio-static-title" />
      </noscript>

      <StaticPortfolio
        titleId="home-portfolio-print-title"
        printOnly
      />

      <section
        data-home-portfolio-enhanced
        aria-label="EndoCyclic development portfolio"
        className="relative overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-surface shadow-[0_30px_90px_rgb(57_38_56/0.12)] sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]"
      >
        <p id={instructionsId} className="sr-only">
          Select a program to update the portfolio detail. Use the{" "}
          {tabOrientation === "vertical"
            ? "Up and Down arrow keys"
            : "Left and Right arrow keys"}{" "}
          to move between programs. Home and End move to the first and last
          program.
        </p>

        <div className="grid lg:min-h-[44rem] lg:grid-cols-12">
          <div
            data-tone="dark"
            className="relative min-w-0 bg-plum text-on-dark lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:border-l"
          >
            <div className="flex min-h-12 items-center justify-between border-b border-line-on-dark px-5 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-on-dark">
                Program index
              </p>
              <p className="text-sm font-medium tabular-nums text-on-dark">
                {String(activeIndex + 1).padStart(2, "0")} / {String(PIPELINE.length).padStart(2, "0")}
              </p>
            </div>
            <div
              aria-hidden
              className="absolute bottom-[12.5%] left-7 top-[12.5%] z-10 hidden w-px lg:block"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-rose/70" />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-teal/70" />
            </div>
            <div
              style={
                {
                  "--portfolio-index": activeIndex,
                } as React.CSSProperties
              }
              className="relative overflow-hidden lg:h-full"
            >
              <span
                aria-hidden
                className="portfolio-active-surface pointer-events-none absolute z-10 hidden bg-plum-deep lg:block"
              />
              <ol
                role="tablist"
                aria-label="Development programs"
                aria-describedby={instructionsId}
                aria-orientation={tabOrientation}
                className="no-scrollbar relative flex list-none snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain bg-line-on-dark lg:grid lg:h-full lg:grid-cols-1 lg:grid-rows-4 lg:gap-0 lg:overflow-hidden lg:bg-transparent"
              >
                {PIPELINE.map((program, index) => {
                  const areaPresentation = AREA_PRESENTATION[program.area];
                  const programPresentation = PRESENTATION[program.id];
                  const isActive = index === activeIndex;
                  const buttonId = `home-portfolio-${program.id.toLowerCase()}-tab`;

                  return (
                    <li
                      key={program.id}
                      role="presentation"
                      className="w-[82vw] max-w-72 shrink-0 snap-start bg-plum sm:w-64 lg:w-auto lg:max-w-none lg:min-w-0 lg:border-b lg:border-line-on-dark lg:last:border-b-0"
                    >
                      <button
                        ref={(node) => {
                          buttonRefs.current[index] = node;
                        }}
                        id={buttonId}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onPointerEnter={() => scheduleProgramPrime(index)}
                        onPointerLeave={cancelScheduledPrime}
                        onPointerDown={() => {
                          cancelScheduledPrime();
                          primeProgram(index);
                        }}
                        onFocus={() => {
                          cancelScheduledPrime();
                          primeProgram(index);
                        }}
                        onClick={() => activateProgram(index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={clsx(
                          "group relative z-20 flex min-h-[7.5rem] w-full items-center gap-3 overflow-hidden px-4 py-4 text-left transition-colors duration-300 focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-on-dark sm:min-h-[8rem] sm:px-5 lg:h-full lg:min-h-0 lg:gap-4 lg:py-5 lg:pl-14 lg:pr-8",
                          isActive
                            ? "bg-plum-deep text-on-dark lg:bg-transparent"
                            : "text-muted-on-dark hover:bg-plum-deep/45 hover:text-on-dark",
                        )}
                      >
                        <span aria-hidden className={`absolute inset-y-0 left-0 z-20 w-1 ${areaPresentation.stripe}`} />
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute right-3 top-3 z-20 h-2 w-2 rounded-full bg-gold lg:hidden"
                          />
                        )}
                        <span
                          aria-hidden
                          className={clsx(
                            "relative z-10 hidden shrink-0 rounded-full transition-transform duration-300 lg:absolute lg:left-[1.31rem] lg:top-1/2 lg:block lg:-translate-y-1/2",
                            isActive ? "h-5 w-5 scale-100" : "h-3.5 w-3.5 scale-75",
                            program.modality === "Diagnostic"
                              ? `border-2 bg-plum ${areaPresentation.markerBorder}`
                              : `border-[3px] border-plum ${areaPresentation.markerFill}`,
                          )}
                        />
                        <span className="relative z-10 min-w-0 flex-1">
                          <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                            <span className={`text-xs font-semibold uppercase tracking-[0.1em] lg:tracking-[0.13em] ${areaPresentation.label}`}>
                              {program.area}
                              <span className="block text-muted-on-dark min-[390px]:inline"> · {program.modality}</span>
                            </span>
                            {isActive && (
                              <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-gold lg:inline">
                                Viewing
                              </span>
                            )}
                          </span>
                          <span className="mt-2 block text-lg font-medium leading-none tracking-[-0.025em] text-on-dark sm:text-xl lg:text-[clamp(1.35rem,2.5vw,1.85rem)]">
                            {program.name}
                          </span>
                          <span className="mt-2 block text-sm leading-snug text-muted-on-dark">
                            {programPresentation.currentStage}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          size={17}
                          className={clsx(
                            "relative z-10 hidden shrink-0 transition-transform duration-300 ease-soft lg:block",
                            isActive ? "translate-x-0 text-gold" : "-translate-x-1 text-muted-on-dark group-hover:translate-x-0",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className="flex min-w-0 flex-col lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden bg-tint-warm sm:aspect-[16/10] sm:min-h-[22rem] lg:aspect-auto lg:min-h-0">
              {primedProgram &&
              primedPresentation &&
              primedIndex !== activeIndex &&
              primedIndex !== previousIndex ? (
                <div
                  key={`${primedProgram.id}-primed`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0"
                >
                  <PortfolioProgramImage
                    presentation={primedPresentation}
                    alt=""
                  />
                </div>
              ) : null}
              {previousProgram && previousPresentation ? (
                <div
                  key={`${previousProgram.id}-previous`}
                  aria-hidden
                  onAnimationEnd={() => setPreviousIndex(null)}
                  className={clsx(
                    "portfolio-image-exit absolute inset-0 z-0 transform-gpu",
                    direction >= 0
                      ? "portfolio-image-exit-forward"
                      : "portfolio-image-exit-reverse",
                  )}
                >
                  <PortfolioProgramImage
                    presentation={previousPresentation}
                    alt=""
                  />
                </div>
              ) : null}
              <div
                key={activeProgram.id}
                className={clsx(
                  "absolute inset-0 z-10 transform-gpu",
                  hasInteracted && "portfolio-image-enter",
                  hasInteracted &&
                    (direction >= 0
                      ? "portfolio-image-enter-forward"
                      : "portfolio-image-enter-reverse"),
                )}
              >
                <PortfolioProgramImage
                  presentation={activePresentation}
                  alt={activePresentation.imageAlt}
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-surface/70 to-transparent"
              />
              <div
                key={`${activeProgram.id}-media-label`}
                className={clsx(
                  "absolute left-5 top-5 z-30 bg-plum px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-on-dark sm:left-7 sm:top-7",
                  hasInteracted && "portfolio-copy-enter",
                )}
              >
                {activeProgram.area} · {activeProgram.modality}
              </div>
              {activeProgram.id !== "ENDO-205" ? (
                <div
                  aria-hidden
                  className="absolute bottom-7 right-7 z-30 hidden h-16 w-16 rounded-full border border-rose/45 sm:block"
                >
                  <span className="absolute inset-[0.42rem] rounded-full border border-teal/45" />
                  <span className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
                </div>
              ) : null}
            </div>

            <div className="flex min-h-[21rem] flex-col bg-surface px-5 pb-7 pt-1 sm:px-8 sm:pb-8 lg:px-10 lg:pb-9">
              <div
                key={`${activeProgram.id}-details`}
                className={clsx(
                  hasInteracted && "portfolio-details-enter",
                  hasInteracted &&
                    (direction >= 0
                      ? "portfolio-details-enter-forward"
                      : "portfolio-details-enter-reverse"),
                )}
              >
                  <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(10.5rem,0.58fr)] sm:items-end sm:gap-8">
                    <div data-portfolio-detail="title">
                      <p className="text-sm font-semibold uppercase tracking-[0.11em] text-rose-ink md:text-xs md:tracking-[0.14em]">
                        {activeProgram.indication}
                      </p>
                      <h3
                        className="mt-3 text-[clamp(2.35rem,5vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.045em] text-ink"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {activeProgram.name}
                      </h3>
                    </div>

                    <div
                      data-portfolio-detail="stage"
                      className="border-l border-line pl-5 sm:pb-1"
                    >
                      <p className="text-sm text-muted">Program design</p>
                      <p className="mt-1 text-base font-medium leading-snug text-ink sm:text-lg">
                        {activeProgram.mechanism}
                      </p>
                    </div>
                  </div>

                  <p
                    data-portfolio-detail="summary"
                    className="mt-6 max-w-2xl text-base leading-relaxed text-muted"
                  >
                    {firstSentence(activeProgram.summary)}
                  </p>
              </div>

              <div className="mt-auto pt-7">
                <div className="border-t border-line pt-5 sm:hidden">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-ink">Development path</p>
                    <p className="text-xs font-semibold tabular-nums tracking-[0.12em] text-rose-ink">
                      {String(activeProgram.phaseIndex + 1).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")}
                    </p>
                  </div>
                  <ol
                    aria-label={`Development phases for ${activeProgram.name}`}
                    className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3"
                  >
                    {PHASES.map((phase, index) => {
                      const isCurrent = index === activeProgram.phaseIndex;
                      return (
                        <li
                          key={phase}
                          className={clsx(
                            "flex min-h-8 items-center gap-2 text-sm",
                            isCurrent ? "font-medium text-ink" : "text-muted",
                          )}
                        >
                          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line" />
                            {isCurrent && (
                              <span
                                aria-hidden
                                className={clsx(
                                  "portfolio-stage-pop absolute inset-0 rounded-full",
                                  activeProgram.modality === "Diagnostic"
                                    ? `border-2 bg-surface ${AREA_PRESENTATION[activeProgram.area].markerBorder}`
                                    : `border-[3px] border-surface ${AREA_PRESENTATION[activeProgram.area].markerFill}`,
                                )}
                              />
                            )}
                          </span>
                          <span>{phase}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="hidden border-t border-line pt-5 sm:block">
                  <div className="grid grid-cols-6 text-xs font-semibold uppercase tracking-[0.04em] text-muted">
                    {PHASES.map((phase) => (
                      <span key={phase} className="text-center">
                        {phase}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-3 h-5">
                    <div
                      aria-hidden
                      className="absolute inset-x-[8.333%] top-1/2 h-px -translate-y-1/2 bg-line"
                    />
                    <div aria-hidden className="absolute inset-0 grid grid-cols-6">
                      {PHASES.map((phase) => (
                        <span key={phase} className="relative">
                          <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
                        </span>
                      ))}
                    </div>
                    <span
                      aria-hidden
                      style={
                        {
                          "--portfolio-stage-index": activeProgram.phaseIndex,
                        } as React.CSSProperties
                      }
                      className="portfolio-stage-track absolute inset-y-0 left-0 flex w-1/6 items-center justify-center"
                    >
                      <span
                        className={clsx(
                          "block h-4 w-4 rounded-full shadow-[0_0_0_1px_rgb(57_38_56/0.12)]",
                          activeProgram.modality === "Diagnostic"
                            ? `border-2 bg-surface ${AREA_PRESENTATION[activeProgram.area].markerBorder}`
                            : `border-[3px] border-surface ${AREA_PRESENTATION[activeProgram.area].markerFill}`,
                        )}
                      />
                    </span>
                  </div>
                </div>

                <Link
                  href={activePresentation.href}
                  prefetch={false}
                  className="group mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink sm:mt-3"
                >
                  Open program brief
                  <ArrowRight
                    aria-hidden
                    size={16}
                    className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Conceptual representations of investigational programs. For ENDO-205,
        the intact peptide remains visible within diseased tissue before a
        separate state shows that same lesion receding to represent the preclinical
        lesion-elimination finding; imagery does not depict clinical results or
        restored-tissue histology.
      </figcaption>
    </figure>
  );
}
