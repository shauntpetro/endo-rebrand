"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./SelectiveSequence.module.css";

type SequenceStep = {
  index: string;
  title: string;
  body: string;
};

const STAGE_PRESENTATION = [
  {
    shortTitle: "Activation",
    marker: "bg-gold",
    ring: "border-gold/75",
    ink: "text-gold-ink",
    activeGround: "bg-tint-warm",
  },
  {
    shortTitle: "Uptake",
    marker: "bg-teal",
    ring: "border-teal/70",
    ink: "text-teal-ink",
    activeGround: "bg-tint-teal",
  },
  {
    shortTitle: "Action",
    marker: "bg-rose",
    ring: "border-rose/75",
    ink: "text-rose-ink",
    activeGround: "bg-petal",
  },
] as const;

const STICKY_MEDIA_QUERY =
  "(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

export default function SelectiveSequence({
  steps,
}: {
  steps: readonly SequenceStep[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sentinelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const keyboardFocusRef = useRef(false);
  const activeStage = STAGE_PRESENTATION[activeIndex] ?? STAGE_PRESENTATION[0];

  useEffect(() => {
    const media = window.matchMedia(STICKY_MEDIA_QUERY);
    let observer: IntersectionObserver | null = null;

    const selectStageAtReadingLine = () => {
      if (
        keyboardFocusRef.current &&
        tablistRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      const readingLine = window.innerHeight * 0.46;
      let nextIndex: number | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sentinelRefs.current.forEach((sentinel, index) => {
        if (!sentinel) return;
        const rect = sentinel.getBoundingClientRect();
        if (rect.top > readingLine || rect.bottom < readingLine) return;

        const distance = Math.abs(rect.top + rect.height / 2 - readingLine);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== null) {
        const resolvedIndex = nextIndex;
        setActiveIndex((current) =>
          current === resolvedIndex ? current : resolvedIndex,
        );
      }
    };

    const connectObserver = () => {
      observer?.disconnect();
      observer = null;

      if (!media.matches) return;

      observer = new IntersectionObserver(selectStageAtReadingLine, {
        rootMargin: "-42% 0px -50% 0px",
        threshold: 0,
      });

      sentinelRefs.current.forEach((sentinel) => {
        if (sentinel) observer?.observe(sentinel);
      });
      selectStageAtReadingLine();
    };

    connectObserver();
    media.addEventListener("change", connectObserver);

    return () => {
      observer?.disconnect();
      media.removeEventListener("change", connectObserver);
    };
  }, [steps.length]);

  const focusStage = (index: number) => {
    const nextIndex = (index + steps.length) % steps.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusStage(index + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusStage(index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusStage(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusStage(steps.length - 1);
    }
  };

  return (
    <div className={styles.scene} data-sequence-scene>
      <figure className={styles.sticky} data-sequence-sticky>
        <div className="overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-paper editorial-shadow sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]">
          <div className="border-b border-line bg-paper">
            <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal-ink">
                Follow the mechanism
              </p>
              <p className="hidden text-xs text-muted sm:block">
                Select a stage to inspect the sequence.
              </p>
            </div>

            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Selective mechanism stages"
              onPointerDownCapture={() => {
                keyboardFocusRef.current = false;
              }}
              onKeyDownCapture={() => {
                keyboardFocusRef.current = true;
              }}
              onFocusCapture={(event) => {
                if ((event.target as HTMLElement).matches(":focus-visible")) {
                  keyboardFocusRef.current = true;
                }
              }}
              onBlurCapture={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  keyboardFocusRef.current = false;
                }
              }}
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border-t border-line sm:grid sm:grid-cols-3 sm:overflow-visible"
            >
              {steps.map((step, index) => {
                const stage =
                  STAGE_PRESENTATION[index] ?? STAGE_PRESENTATION[0];
                const active = index === activeIndex;

                return (
                  <button
                    key={step.index}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`${sequenceId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`${sequenceId}-panel-${index}`}
                    aria-label={`${step.index} ${step.title}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={`group relative flex min-w-[11.5rem] snap-start items-center gap-3 border-r border-line px-5 py-4 text-left last:border-r-0 active:scale-[0.99] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transform-none sm:min-w-0 sm:px-6 sm:py-5 ${
                      active
                        ? stage.activeGround
                        : "bg-paper hover:bg-tint-warm/55"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-semibold tracking-[0.08em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        active
                          ? `${stage.marker} ${stage.ring} scale-100 text-ink`
                          : "scale-90 border-line bg-paper text-muted group-hover:scale-100"
                      }`}
                    >
                      {step.index}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-xs font-semibold uppercase tracking-[0.12em] ${active ? stage.ink : "text-muted"}`}
                      >
                        {stage.shortTitle}
                      </span>
                      <span className="mt-1 hidden text-sm font-medium leading-tight text-ink md:block">
                        {step.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${stage.marker} ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid bg-tint-warm md:grid-cols-12">
            <div className="relative aspect-[2/1] overflow-hidden bg-tint-warm md:col-span-8 md:self-center">
              <Image
                src="/illustrations/selective-mechanism-v2.avif"
                alt="Conceptual illustration of a cyclic peptide changing state in a disease microenvironment and undergoing selective uptake by diseased tissue."
                fill
                sizes="(min-width: 1184px) 720px, (min-width: 768px) 64vw, 94vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-paper/10 via-transparent to-plum/5"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-bl-[2rem] border border-paper/45 sm:inset-3 sm:rounded-bl-[3.25rem]"
              />
            </div>

            <div
              className={`relative flex min-h-[20rem] border-t border-line md:col-span-4 md:min-h-0 md:border-l md:border-t-0 ${activeStage.activeGround}`}
            >
              <div
                aria-hidden
                className={`absolute left-0 top-0 h-full w-0.5 md:w-px ${activeStage.marker}`}
              />

              <div className="grid w-full px-6 py-7 sm:px-8 sm:py-9 md:px-7 md:py-8 lg:px-9 lg:py-10">
                {steps.map((step, index) => {
                  const stage =
                    STAGE_PRESENTATION[index] ?? STAGE_PRESENTATION[0];
                  const active = index === activeIndex;

                  return (
                    <div
                      key={step.index}
                      id={`${sequenceId}-panel-${index}`}
                      role="tabpanel"
                      aria-labelledby={`${sequenceId}-tab-${index}`}
                      aria-hidden={!active}
                      tabIndex={active ? 0 : -1}
                      className={`col-start-1 row-start-1 flex flex-col justify-between transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none ${
                        active
                          ? "relative z-[1] translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-3 opacity-0"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${stage.marker}`}
                          />
                          <p
                            className={`text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${stage.ink}`}
                          >
                            Stage {step.index} of{" "}
                            {String(steps.length).padStart(2, "0")}
                          </p>
                        </div>
                        <h3 className="mt-6 text-[clamp(1.55rem,3vw,2.2rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-muted lg:text-base">
                          {step.body}
                        </p>
                      </div>

                      <div className="mt-10 border-t border-line pt-5">
                        <div className="flex items-center gap-2" aria-hidden>
                          {steps.map((railStep, railIndex) => (
                            <span
                              key={railStep.index}
                              className={`h-px flex-1 ${
                                railIndex <= activeIndex
                                  ? stage.marker
                                  : "bg-line"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-muted">
                          Activation, uptake, then action in diseased tissue.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <noscript>
          <style>{`
          [data-sequence-scene] { display: block !important; }
          [data-sequence-sticky] { position: static !important; top: auto !important; }
          [data-sequence-track] { display: none !important; }
        `}</style>
          <div className="mt-5 border-y border-line bg-paper px-5 py-2 sm:px-7">
            <p className="py-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal-ink">
              Complete mechanism sequence
            </p>
            <ol className="divide-y divide-line">
              {steps.map((step) => (
                <li
                  key={step.index}
                  className="grid gap-2 py-4 sm:grid-cols-[2rem_1fr] sm:gap-4"
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-rose-ink">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </noscript>

        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs leading-relaxed text-muted">
          <span>Conceptual representation; investigational platform.</span>
          <span className={styles.scrollHint}>
            {activeIndex === steps.length - 1
              ? "Continue to the next chapter"
              : "Continue scrolling to advance"}
          </span>
        </figcaption>
      </figure>

      <div className={styles.track} data-sequence-track aria-hidden="true">
        {steps.map((step, index) => (
          <div
            key={step.index}
            ref={(node) => {
              sentinelRefs.current[index] = node;
            }}
            className={styles.sentinel}
          />
        ))}
      </div>
    </div>
  );
}
