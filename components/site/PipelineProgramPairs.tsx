"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { clsx } from "clsx";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { PIPELINE, type Candidate } from "@/lib/site";

gsap.registerPlugin(Flip);

type Pair = {
  area: Candidate["area"];
  programs: readonly [Candidate, Candidate];
  defaultActive: 0 | 1;
};

type ProgramTone = {
  panel: string;
  accent: string;
  label: string;
};

const programById = (id: string) => {
  const program = PIPELINE.find((candidate) => candidate.id === id);

  if (!program) {
    throw new Error(`Missing pipeline program: ${id}`);
  }

  return program;
};

const PAIRS: readonly Pair[] = [
  {
    area: "Endometriosis",
    programs: [programById("ENDO-205"), programById("FemLUNA")],
    defaultActive: 0,
  },
  {
    area: "Oncology",
    programs: [programById("ENDO-995"), programById("ENDO-311")],
    defaultActive: 1,
  },
];

const PROGRAM_TONES: Record<string, ProgramTone> = {
  "ENDO-205": {
    panel: "bg-petal",
    accent: "bg-rose",
    label: "text-rose-ink",
  },
  FemLUNA: {
    panel: "bg-tint-plum",
    accent: "bg-gold",
    label: "text-rose-ink",
  },
  "ENDO-995": {
    panel: "bg-tint-warm",
    accent: "bg-gold",
    label: "text-gold-ink",
  },
  "ENDO-311": {
    panel: "bg-tint-teal",
    accent: "bg-teal",
    label: "text-teal-ink",
  },
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function DiseasePair({ pair }: { pair: Pair }) {
  const [activeIndex, setActiveIndex] = useState<number>(pair.defaultActive);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const instanceId = useId();

  const activateProgram = useCallback(
    (nextIndex: number, moveFocus = false) => {
      if (nextIndex === activeIndex) {
        if (moveFocus) {
          buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
        }
        return;
      }

      const panels = rootRef.current
        ? Array.from(
            rootRef.current.querySelectorAll<HTMLElement>("[data-pair-panel]"),
          )
        : [];

      Flip.killFlipsOf(panels, true);
      const previousState = prefersReducedMotion
        ? null
        : Flip.getState(panels, { simple: true });

      flushSync(() => setActiveIndex(nextIndex));

      if (previousState) {
        Flip.from(previousState, {
          duration: 0.48,
          ease: "power3.out",
          nested: true,
          prune: true,
          scale: true,
        });
      }

      if (moveFocus) {
        buttonRefs.current[nextIndex]?.focus({ preventScroll: true });
      }
    },
    [activeIndex, prefersReducedMotion],
  );

  useEffect(() => {
    const root = rootRef.current;

    return () => {
      if (root) {
        Flip.killFlipsOf(
          Array.from(root.querySelectorAll<HTMLElement>("[data-pair-panel]")),
          true,
        );
      }
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
        nextIndex = (index + 1) % pair.programs.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + pair.programs.length) % pair.programs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = pair.programs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateProgram(nextIndex, true);
  }

  const areaId = `${instanceId}-${pair.area.toLowerCase()}-heading`;
  const instructionsId = `${instanceId}-${pair.area.toLowerCase()}-instructions`;

  return (
    <section
      aria-labelledby={areaId}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 bg-paper px-5 py-5 sm:px-7 lg:px-9">
        <div>
          <p className="eyebrow">Disease area</p>
          <h2 id={areaId} className="t-h3 mt-1.5 text-ink">
            {pair.area}
          </h2>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">
          02 programs · select to compare
        </p>
      </div>

      <p id={instructionsId} className="sr-only">
        Select a program to reveal its details. Use the arrow keys to move
        between the two programs in this disease area.
      </p>

      <div
        ref={rootRef}
        aria-describedby={instructionsId}
        className="grid grid-cols-1 gap-px border-t border-line bg-line lg:grid-flow-dense lg:grid-cols-12"
      >
        {pair.programs.map((program, index) => {
          const isActive = activeIndex === index;
          const tone = PROGRAM_TONES[program.id];
          const buttonId = `${instanceId}-${program.id}-button`;
          const panelId = `${instanceId}-${program.id}-details`;
          return (
            <article
              key={program.id}
              data-pair-panel
              data-active={isActive ? "true" : "false"}
              className={clsx(
                "relative isolate min-w-0 scroll-mt-28 overflow-hidden",
                tone.panel,
                isActive ? "lg:col-span-7" : "lg:col-span-5",
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-300 ease-[var(--ease-soft)]",
                  tone.accent,
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />

              <h3 className="m-0">
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
                  className="group flex min-h-32 w-full cursor-pointer items-start justify-between gap-5 px-5 py-6 text-left text-ink focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-rose-ink sm:px-7 lg:min-h-40 lg:px-9 lg:py-8"
                >
                  <span className="min-w-0">
                    <span
                      className={clsx(
                        "block text-[0.68rem] font-semibold uppercase tracking-[0.13em]",
                        tone.label,
                      )}
                    >
                      {program.modality}
                    </span>
                    <span
                      className={clsx(
                        "mt-3 block font-medium leading-none tracking-[-0.035em] text-ink",
                        isActive
                          ? "text-[clamp(2rem,4vw,3.75rem)]"
                          : "text-[clamp(1.65rem,3vw,2.65rem)]",
                      )}
                    >
                      {program.name}
                    </span>
                    <span className="mt-3 block max-w-sm text-sm font-medium leading-snug text-muted">
                      {program.stage}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={clsx(
                        "absolute h-3.5 w-px bg-current transition-transform duration-300 ease-[var(--ease-soft)]",
                        isActive && "rotate-90",
                      )}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isActive}
                className="border-t border-line px-5 pb-8 pt-7 sm:px-7 lg:px-9 lg:pb-10"
              >
                <p className="max-w-2xl text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-ink-body">
                  {program.summary}
                </p>

                <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-muted">Indication</dt>
                    <dd className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                      {program.indication}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted">Mechanism</dt>
                    <dd className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                      {program.mechanism}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-7 grid gap-4 border-t border-line pt-5 xl:grid-cols-2">
                  {program.highlights.slice(0, 2).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "mt-[0.68rem] h-1.5 w-1.5 shrink-0 rounded-full",
                          tone.accent,
                        )}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function PipelineProgramPairs({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx("divide-y divide-line border-y border-line", className)}>
      {PAIRS.map((pair) => (
        <DiseasePair key={pair.area} pair={pair} />
      ))}
    </div>
  );
}
