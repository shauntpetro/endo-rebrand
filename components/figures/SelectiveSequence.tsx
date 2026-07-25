"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  PLATFORM_MECHANISM_ALT,
  PLATFORM_MECHANISM_IMAGE,
} from "@/lib/site";
import styles from "./SelectiveSequence.module.css";

type SequenceStep = {
  index: string;
  title: string;
  body: string;
};

const STAGE_PRESENTATION = [
  {
    shortTitle: "Target",
    marker: "bg-rose",
    ring: "border-rose/75",
    ink: "text-rose-ink",
    activeGround: "bg-petal",
    focusX: "11%",
    focusY: "58%",
    artworkTransform: "scale-[1.02] translate-x-[1%] translate-y-0",
  },
  {
    shortTitle: "Enter",
    marker: "bg-teal",
    ring: "border-teal/70",
    ink: "text-teal-ink",
    activeGround: "bg-tint-teal",
    focusX: "32%",
    focusY: "55%",
    artworkTransform: "scale-[1.02] translate-x-0 translate-y-0",
  },
  {
    shortTitle: "Activate",
    marker: "bg-gold",
    ring: "border-gold/75",
    ink: "text-gold-ink",
    activeGround: "bg-tint-warm",
    focusX: "48%",
    focusY: "55%",
    artworkTransform: "scale-[1.025] -translate-x-[1%] translate-y-0",
  },
  {
    shortTitle: "Evidence",
    marker: "bg-plum",
    ring: "border-plum/70",
    ink: "text-rose-ink",
    activeGround: "bg-tint-plum",
    focusX: "65%",
    focusY: "59%",
    artworkTransform: "scale-[1.025] -translate-x-[2%] translate-y-0",
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
  const panelRegionRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sentinelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const keyboardFocusRef = useRef(false);
  const programmaticStageRef = useRef<number | null>(null);
  const programmaticScrollFrameRef = useRef<number | null>(null);
  const programmaticScrollTokenRef = useRef(0);
  const syncStageFromReadingLineRef = useRef<() => void>(() => {});
  const activeStage = STAGE_PRESENTATION[activeIndex] ?? STAGE_PRESENTATION[0];
  const evidenceIndex = Math.max(steps.length - 1, 0);
  const platformStageCount = String(evidenceIndex).padStart(2, "0");

  useEffect(() => {
    const media = window.matchMedia(STICKY_MEDIA_QUERY);
    let observer: IntersectionObserver | null = null;

    const selectStageAtReadingLine = () => {
      if (
        programmaticStageRef.current !== null ||
        panelRegionRef.current?.contains(document.activeElement) ||
        (keyboardFocusRef.current &&
          tablistRef.current?.contains(document.activeElement))
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
    syncStageFromReadingLineRef.current = selectStageAtReadingLine;

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
      syncStageFromReadingLineRef.current = () => {};
    };
  }, [steps.length]);

  useEffect(
    () => () => {
      programmaticScrollTokenRef.current += 1;
      if (programmaticScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(programmaticScrollFrameRef.current);
      }
    },
    [],
  );

  const selectStage = (index: number, moveFocus = false) => {
    const nextIndex = (index + steps.length) % steps.length;
    setActiveIndex(nextIndex);
    if (moveFocus) {
      tabRefs.current[nextIndex]?.focus({ preventScroll: true });
    }

    if (!window.matchMedia(STICKY_MEDIA_QUERY).matches) return;

    const sentinel = sentinelRefs.current[nextIndex];
    if (!sentinel) return;

    programmaticScrollTokenRef.current += 1;
    const scrollToken = programmaticScrollTokenRef.current;

    if (programmaticScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(programmaticScrollFrameRef.current);
    }

    const readingLine = window.innerHeight * 0.46;
    const rect = sentinel.getBoundingClientRect();
    const desiredTop =
      window.scrollY + rect.top + rect.height / 2 - readingLine;
    const maxTop = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const targetTop = Math.min(maxTop, Math.max(0, desiredTop));
    const deadline = window.performance.now() + 1200;

    programmaticStageRef.current = nextIndex;
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    const settleProgrammaticScroll = () => {
      if (programmaticScrollTokenRef.current !== scrollToken) return;

      const settled =
        Math.abs(window.scrollY - targetTop) <= 2 ||
        window.performance.now() >= deadline;

      if (settled) {
        programmaticScrollFrameRef.current = null;
        programmaticStageRef.current = null;
        setActiveIndex(nextIndex);
        syncStageFromReadingLineRef.current();
        return;
      }

      programmaticScrollFrameRef.current = window.requestAnimationFrame(
        settleProgrammaticScroll,
      );
    };

    programmaticScrollFrameRef.current = window.requestAnimationFrame(
      settleProgrammaticScroll,
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectStage(index + 1, true);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectStage(index - 1, true);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectStage(steps.length - 1, true);
    }
  };

  return (
    <div className={styles.scene} data-sequence-scene>
      <figure className={styles.sticky} data-sequence-sticky>
        <div
          data-sequence-enhanced
          className={`${styles.enhancedSequence} overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-paper editorial-shadow sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]`}
        >
          <div className="border-b border-line bg-paper">
            <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
                Follow the mechanism
              </p>
              <p className="max-w-[8.5rem] text-right text-sm leading-tight text-muted sm:max-w-none">
                Select a stage to inspect.
              </p>
            </div>

            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Platform stages and ENDO-205 evidence"
              aria-orientation="horizontal"
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
              className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4"
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
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectStage(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={`group relative flex min-w-0 flex-col items-start gap-2 px-4 py-3.5 text-left active:scale-[0.99] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transform-none sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-5 ${
                      active
                        ? stage.activeGround
                        : "bg-paper hover:bg-tint-warm/55"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-[0.08em] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-8 sm:w-8 ${
                        active
                          ? `${stage.ring} scale-100 bg-plum text-on-dark`
                          : "scale-90 border-line bg-paper text-muted group-hover:scale-100"
                      }`}
                    >
                      {step.index}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-xs font-semibold uppercase leading-tight tracking-[0.08em] sm:tracking-[0.12em] ${active ? stage.ink : "text-muted"}`}
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
              <div
                className={`absolute inset-0 transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:scale-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${activeStage.artworkTransform}`}
              >
                <Image
                  src={PLATFORM_MECHANISM_IMAGE}
                  alt={PLATFORM_MECHANISM_ALT}
                  fill
                  sizes="(min-width: 1184px) 750px, (min-width: 768px) 61vw, 94vw"
                  className="object-contain"
                />

                {steps.map((step, index) => {
                  const stage =
                    STAGE_PRESENTATION[index] ?? STAGE_PRESENTATION[0];
                  const active = index === activeIndex;

                  return (
                    <div key={step.index}>
                      <span
                        aria-hidden
                        className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background: `radial-gradient(circle at ${stage.focusX} ${stage.focusY}, transparent 0%, transparent 11%, color-mix(in srgb, var(--color-paper) 22%, transparent) 48%, color-mix(in srgb, var(--color-paper) 58%, transparent) 100%)`,
                        }}
                      />
                      <span
                        aria-hidden
                        className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          active
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0"
                        }`}
                        style={{ left: stage.focusX, top: "10%" }}
                      >
                        <span
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full border bg-paper/88 shadow-[0_6px_18px_rgb(57_38_56/0.1)] sm:h-9 sm:w-9 ${stage.ring}`}
                        >
                          <span className="text-[0.65rem] font-semibold tracking-[0.05em] text-ink">
                            {step.index}
                          </span>
                          <span
                            className={`absolute -bottom-1 h-1.5 w-1.5 rounded-full border border-paper ${stage.marker}`}
                          />
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
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

              <div
                ref={panelRegionRef}
                className="grid w-full px-6 py-7 sm:px-8 sm:py-9 md:px-7 md:py-8 lg:px-9 lg:py-10"
              >
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
                      hidden={!active}
                      tabIndex={active ? 0 : -1}
                      className={`col-start-1 row-start-1 flex flex-col justify-between ${
                        active ? styles.activePanel : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${stage.marker}`}
                          />
                          <p
                            className={`text-xs font-semibold uppercase tracking-[0.16em] ${stage.ink}`}
                          >
                            {index === evidenceIndex
                              ? `ENDO-205 evidence · ${step.index}`
                              : `Platform stage ${step.index} of ${platformStageCount}`}
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
                          Target, enter, activate. Then review the separately
                          qualified ENDO-205 preclinical evidence.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          data-sequence-static
          className={`${styles.staticSequence} overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-paper editorial-shadow sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]`}
        >
          <div className="border-b border-line bg-paper px-5 py-5 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
              Complete platform-to-evidence sequence
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Targeting, uptake, pH-mediated activation, and the ENDO-205
              preclinical lesion-elimination finding.
            </p>
          </div>

          <div className="relative aspect-[2/1] overflow-hidden bg-tint-warm">
            <Image
              src={PLATFORM_MECHANISM_IMAGE}
              alt={PLATFORM_MECHANISM_ALT}
              fill
              sizes="(min-width: 1184px) 1120px, 94vw"
              className="object-contain"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-paper/10 via-transparent to-plum/5"
            />
          </div>

          <ol
            aria-label="Complete platform-to-evidence sequence"
            className="divide-y divide-line"
          >
            {steps.map((step, index) => {
              const stage =
                STAGE_PRESENTATION[index] ?? STAGE_PRESENTATION[0];

              return (
                <li
                  key={step.index}
                  className={`grid gap-4 px-5 py-6 sm:grid-cols-[3rem_1fr] sm:px-7 sm:py-7 ${stage.activeGround}`}
                >
                  <span
                    data-sequence-static-marker
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-plum text-xs font-semibold tracking-[0.08em] text-on-dark ${stage.ring}`}
                  >
                    {step.index}
                  </span>
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.14em] ${stage.ink}`}
                    >
                      {stage.shortTitle}
                    </p>
                    <h3 className="mt-2 text-lg font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <noscript>
          <style>{`
          [data-sequence-scene] { display: block !important; }
          [data-sequence-sticky] { position: static !important; top: auto !important; }
          [data-sequence-track] { display: none !important; }
          [data-sequence-enhanced] { display: none !important; }
          [data-sequence-static] { display: block !important; }
        `}</style>
        </noscript>

        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs leading-relaxed text-muted">
          <span>
            The intermediate focal point inside diseased tissue is conceptual.
          </span>
          <span>
            The final state represents the ENDO-205 preclinical
            lesion-elimination finding; not clinical outcome data or
            restored-tissue histology.
          </span>
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
