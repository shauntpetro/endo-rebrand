"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { PIPELINE } from "@/lib/site";

gsap.registerPlugin(Flip);

const PANEL_TONES = [
  "bg-[#f7e8e7]",
  "bg-[#f0e8f2]",
  "bg-[#f4e7d8]",
  "bg-[#e5f0eb]",
] as const;

type ProgramAccordionProps = {
  className?: string;
};

export function ProgramAccordion({ className }: ProgramAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const detailTweenRef = useRef<gsap.core.Tween | null>(null);
  const flipTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const instanceId = useId();

  const activateProgram = useCallback(
    (nextIndex: number, moveFocus = false) => {
      if (nextIndex === activeIndex) {
        if (moveFocus) {
          buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
        }
        return;
      }

      const root = rootRef.current;
      const panels = root
        ? Array.from(root.querySelectorAll<HTMLElement>("[data-program-panel]"))
        : [];
      const duration = prefersReducedMotion ? 0 : 0.8;

      detailTweenRef.current?.kill();

      if (panels.length) {
        Flip.killFlipsOf(panels, true);
      } else {
        flipTimelineRef.current?.kill();
      }
      flipTimelineRef.current = null;

      const previousState = panels.length
        ? Flip.getState(panels, { simple: true })
        : null;

      flushSync(() => setActiveIndex(nextIndex));

      if (previousState) {
        flipTimelineRef.current = Flip.from(previousState, {
          duration,
          ease: "power3.inOut",
          nested: true,
          scale: true,
          prune: true,
        });
      }

      const nextDetail = root?.querySelector<HTMLElement>("[data-program-detail]");
      if (nextDetail) {
        if (duration === 0) {
          gsap.set(nextDetail, { autoAlpha: 1, y: 0 });
        } else {
          detailTweenRef.current = gsap.fromTo(
            nextDetail,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.46,
              delay: 0.24,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }
      }

      if (moveFocus) {
        buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
      }
    },
    [activeIndex, prefersReducedMotion],
  );

  useEffect(() => {
    return () => {
      detailTweenRef.current?.kill();
      flipTimelineRef.current?.kill();
    };
  }, []);

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

  return (
    <div className={clsx("w-full", className)}>
      <p id={`${instanceId}-instructions`} className="sr-only">
        Select a program to reveal its details. Use the arrow keys to move between
        programs.
      </p>

      <div
        ref={rootRef}
        aria-describedby={`${instanceId}-instructions`}
        className="flex w-full flex-col overflow-hidden border-y border-line lg:min-h-[40rem] lg:flex-row"
      >
        {PIPELINE.map((program, index) => {
          const isActive = activeIndex === index;
          const buttonId = `${instanceId}-${program.id}-button`;
          const panelId = `${instanceId}-${program.id}-panel`;

          return (
            <article
              key={program.id}
              data-program-panel
              data-active={isActive ? "true" : "false"}
              className={clsx(
                "relative isolate min-w-0 overflow-hidden border-b border-line last:border-b-0 lg:flex lg:border-b-0 lg:border-r lg:last:border-r-0",
                isActive ? "lg:flex-[3.35_1_0%]" : "lg:flex-[0.72_1_0%]",
                PANEL_TONES[index],
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute left-0 top-0 h-0.5 bg-rose lg:left-1/2 lg:h-1 lg:w-1 lg:-translate-x-1/2 lg:rounded-full",
                  isActive ? "w-full lg:w-1" : "w-0 lg:w-1",
                )}
              />

              <div className="flex min-h-full w-full flex-col">
                <h3 className={clsx("m-0", !isActive && "lg:flex lg:flex-1")}>
                  <button
                    ref={(node) => {
                      buttonRefs.current[index] = node;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => activateProgram(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={clsx(
                      "flex min-h-[4.75rem] w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left text-ink focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#8b4b62] sm:px-6",
                      isActive
                        ? "lg:min-h-0 lg:items-start lg:px-8 lg:py-8"
                        : "lg:min-h-full lg:flex-1 lg:flex-col lg:items-center lg:justify-between lg:gap-8 lg:px-5 lg:py-8",
                    )}
                  >
                    <span
                      className={clsx(
                        "min-w-0",
                        isActive
                          ? "flex-1"
                          : "lg:flex lg:h-full lg:flex-1 lg:flex-col lg:items-center lg:justify-between",
                      )}
                    >
                      <span
                        className={clsx(
                          "block text-[0.68rem] font-semibold tracking-[0.08em] text-[#8b4b62]",
                          !isActive && "lg:[writing-mode:vertical-rl] lg:rotate-180",
                        )}
                      >
                        {program.modality} · {program.area}
                      </span>
                      <span
                        className={clsx(
                          "mt-1 block font-medium tracking-[-0.025em] text-ink",
                          isActive
                            ? "text-[clamp(1.8rem,3.2vw,3.35rem)] leading-none lg:mt-3"
                            : "text-xl leading-tight lg:mt-0 lg:text-[1.4rem] lg:[writing-mode:vertical-rl] lg:rotate-180",
                        )}
                      >
                        {program.name}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-xs font-medium leading-snug text-muted",
                          !isActive && "lg:mt-0 lg:[writing-mode:vertical-rl] lg:rotate-180",
                        )}
                      >
                        {program.stage}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-xl font-light leading-none text-ink lg:h-10 lg:w-10"
                    >
                      {isActive ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isActive}
                  data-program-detail={isActive ? "true" : undefined}
                  className={clsx(
                    isActive &&
                      "flex flex-1 flex-col border-t border-line px-5 py-7 sm:px-6 lg:mx-8 lg:px-0 lg:py-8",
                  )}
                >
                  {isActive && (
                    <>
                      <div className="grid flex-1 gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.85fr)] xl:gap-10">
                        <div>
                          <p className="max-w-2xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.55] text-ink-body">
                            {program.summary}
                          </p>

                          <dl className="mt-7 grid gap-5 border-t border-line pt-5 sm:grid-cols-2 xl:grid-cols-1">
                            <div>
                              <dt className="text-xs text-muted">Indication</dt>
                              <dd className="mt-1 text-sm font-medium text-ink">
                                {program.indication}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-xs text-muted">Mechanism</dt>
                              <dd className="mt-1 text-sm font-medium text-ink">
                                {program.mechanism}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <ul className="space-y-3 border-t border-line pt-5 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                          {program.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-sm leading-relaxed text-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-rose"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={`/pipeline#${program.id}`}
                        className="group mt-9 inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
                      >
                        View full program
                        <ArrowRight
                          aria-hidden="true"
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default ProgramAccordion;
