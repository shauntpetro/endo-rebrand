"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { PHASES, PIPELINE, type Area } from "@/lib/site";

type ProgramPresentation = {
  image: string;
  imageAlt: string;
  imagePosition: string;
  currentStage: string;
  stageNote?: string;
  href: string;
};

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
    label: "text-[#efb2bf]",
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
    image: "/illustrations/endo-205-translation-v1.avif",
    imageAlt:
      "Conceptual illustration of a precision peptide activating at an endometriosis lesion boundary and undergoing selective uptake.",
    imagePosition: "object-center",
    currentStage: "Phase 1",
    stageNote: "FDA IND Allowance · 2026",
    href: "/pipeline#endo-205",
  },
  FemLUNA: {
    image: "/illustrations/femluna-targeting-v2.avif",
    imageAlt:
      "Conceptual anatomical illustration of a targeted imaging agent near endometriosis tissue.",
    imagePosition: "object-[62%_center]",
    currentStage: "IND-enabling",
    href: "/pipeline#femluna",
  },
  "ENDO-995": {
    image: "/illustrations/oncology-pair-v2.avif",
    imageAlt:
      "Conceptual illustration of a precision peptide entering diseased tissue.",
    imagePosition: "object-[78%_center]",
    currentStage: "Pre-clinical",
    href: "/pipeline#oncology",
  },
  "ENDO-311": {
    image: "/illustrations/endo-311-localization-v1.avif",
    imageAlt:
      "Conceptual illustration of a targeted imaging agent localizing at a solid-tumor focus.",
    imagePosition: "object-center",
    currentStage: "Pre-clinical",
    href: "/pipeline#oncology",
  },
};

const IMAGE_VARIANTS: Variants = {
  enter: (direction: number) => ({
    clipPath:
      direction >= 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    opacity: 0.72,
    scale: 1.025,
  }),
  center: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    clipPath:
      direction >= 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    opacity: 0.56,
    scale: 0.99,
  }),
};

const DETAIL_CONTAINER_VARIANTS: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.035,
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16 },
  },
};

const DETAIL_ITEM_VARIANTS: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? 18 : -14,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? -10 : 10,
    transition: { duration: 0.18, ease: "easeOut" },
  }),
};

function firstSentence(summary: string) {
  const [sentence] = summary.split(". ");
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

export default function HomePortfolioField() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const activeProgram = PIPELINE[activeIndex];
  const activePresentation = PRESENTATION[activeProgram.id];

  function activateProgram(nextIndex: number, moveFocus = false) {
    if (nextIndex === activeIndex) {
      if (moveFocus) {
        buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
      }
      return;
    }

    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);

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

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % PIPELINE.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + PIPELINE.length) % PIPELINE.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = PIPELINE.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateProgram(nextIndex, true);
  }

  const tabId = `home-portfolio-${activeProgram.id.toLowerCase()}-tab`;
  const panelId = "home-portfolio-program-panel";
  const instructionsId = "home-portfolio-instructions";

  return (
    <figure>
      <section
        aria-label="EndoCyclic development portfolio"
        className="relative overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-surface shadow-[0_30px_90px_rgb(57_38_56/0.12)] sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]"
      >
        <p id={instructionsId} className="sr-only">
          Select a program to update the portfolio detail. Use the arrow keys,
          Home, or End to move between programs.
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
            <ol
              role="tablist"
              aria-label="Development programs"
              aria-describedby={instructionsId}
              className="grid list-none grid-cols-2 gap-px bg-line-on-dark sm:grid-cols-4 lg:h-full lg:grid-cols-1 lg:grid-rows-4 lg:gap-0 lg:bg-transparent"
            >
              {PIPELINE.map((program, index) => {
                const areaPresentation = AREA_PRESENTATION[program.area];
                const isActive = index === activeIndex;
                const buttonId = `home-portfolio-${program.id.toLowerCase()}-tab`;

                return (
                  <li
                    key={program.id}
                    role="presentation"
                    className="min-w-0 bg-plum lg:border-b lg:border-line-on-dark lg:last:border-b-0"
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
                      onClick={() => activateProgram(index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      className={clsx(
                        "group relative flex min-h-[7.5rem] w-full items-center gap-3 overflow-hidden px-4 py-4 text-left transition-colors duration-300 focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-on-dark sm:min-h-[8rem] sm:px-5 lg:h-full lg:min-h-0 lg:gap-4 lg:py-5 lg:pl-14 lg:pr-8",
                        isActive
                          ? "text-on-dark"
                          : "text-muted-on-dark hover:bg-plum-deep/45 hover:text-on-dark",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="home-portfolio-active-program"
                          aria-hidden
                          className="absolute inset-0 z-0 bg-plum-deep"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
                          }
                        />
                      )}
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
                          <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.08em] sm:text-xs lg:text-[0.68rem] lg:tracking-[0.13em] ${areaPresentation.label}`}>
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
                          {program.stage}
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

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className="flex min-w-0 flex-col lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden bg-tint-warm sm:aspect-[16/10] sm:min-h-[22rem] lg:aspect-auto lg:min-h-0">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={activeProgram.id}
                  custom={direction}
                  variants={IMAGE_VARIANTS}
                  initial={prefersReducedMotion ? false : "enter"}
                  animate="center"
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.68, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="absolute inset-0 transform-gpu will-change-[clip-path,transform]"
                >
                  <Image
                    src={activePresentation.image}
                    alt={activePresentation.imageAlt}
                    fill
                    sizes="(min-width: 1184px) 650px, (min-width: 1024px) 55vw, 100vw"
                    className={clsx(
                      "object-contain sm:object-cover",
                      activePresentation.imagePosition,
                    )}
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"
              />
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${activeProgram.id}-media-label`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="absolute left-5 top-5 bg-plum px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-on-dark sm:left-7 sm:top-7"
                >
                  {activeProgram.area} · {activeProgram.modality}
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden
                className="absolute bottom-7 right-7 hidden h-16 w-16 rounded-full border border-rose/45 sm:block"
              >
                <span className="absolute inset-[0.42rem] rounded-full border border-teal/45" />
                <span className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
              </div>
            </div>

            <div className="flex min-h-[21rem] flex-col bg-surface px-5 pb-7 pt-1 sm:px-8 sm:pb-8 lg:px-10 lg:pb-9">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`${activeProgram.id}-details`}
                  custom={direction}
                  variants={DETAIL_CONTAINER_VARIANTS}
                  initial={prefersReducedMotion ? false : "enter"}
                  animate="center"
                  exit={prefersReducedMotion ? undefined : "exit"}
                >
                  <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(10.5rem,0.58fr)] sm:items-end sm:gap-8">
                    <motion.div
                      custom={direction}
                      variants={DETAIL_ITEM_VARIANTS}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.11em] text-rose-ink md:text-[0.7rem] md:tracking-[0.14em]">
                        {activeProgram.indication}
                      </p>
                      <h3 className="mt-3 text-[clamp(2.35rem,5vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.045em] text-ink">
                        {activeProgram.name}
                      </h3>
                    </motion.div>

                    <motion.div
                      custom={direction}
                      variants={DETAIL_ITEM_VARIANTS}
                      className="border-l border-line pl-5 sm:pb-1"
                    >
                      <p className="text-sm text-muted">Current development</p>
                      <p className="mt-1 text-xl font-medium leading-tight text-ink">
                        {activePresentation.currentStage}
                      </p>
                      {activePresentation.stageNote && (
                        <p className="mt-2 text-sm leading-snug text-rose-ink">
                          {activePresentation.stageNote}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <motion.p
                    custom={direction}
                    variants={DETAIL_ITEM_VARIANTS}
                    className="mt-6 max-w-2xl text-base leading-relaxed text-muted"
                  >
                    {firstSentence(activeProgram.summary)}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

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
                              <motion.span
                                layoutId="home-portfolio-mobile-stage-marker"
                                aria-hidden
                                className={clsx(
                                  "absolute inset-0 rounded-full",
                                  activeProgram.modality === "Diagnostic"
                                    ? `border-2 bg-surface ${AREA_PRESENTATION[activeProgram.area].markerBorder}`
                                    : `border-[3px] border-surface ${AREA_PRESENTATION[activeProgram.area].markerFill}`,
                                )}
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0 }
                                    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                                }
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
                  <div className="grid grid-cols-6 text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-muted">
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
                      {PHASES.map((phase, index) => (
                        <span key={phase} className="relative">
                          <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-line" />
                          {index === activeProgram.phaseIndex && (
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                              <motion.span
                                layoutId="home-portfolio-stage-marker"
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0 }
                                    : {
                                        duration: 0.52,
                                        ease: [0.22, 1, 0.36, 1],
                                      }
                                }
                                className={clsx(
                                  "block h-4 w-4 rounded-full shadow-[0_0_0_1px_rgb(57_38_56/0.12)]",
                                  activeProgram.modality === "Diagnostic"
                                    ? `border-2 bg-surface ${AREA_PRESENTATION[activeProgram.area].markerBorder}`
                                    : `border-[3px] border-surface ${AREA_PRESENTATION[activeProgram.area].markerFill}`,
                                )}
                              />
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={activePresentation.href}
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
        Conceptual representations of investigational programs; imagery does not
        depict clinical results or comparative development performance.
      </figcaption>
    </figure>
  );
}
