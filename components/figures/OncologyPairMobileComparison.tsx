"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { clsx } from "clsx";
import { usePrefersReducedMotion } from "@/components/site/usePrefersReducedMotion";

const ONCOLOGY_PROGRAMS = [
  {
    id: "endo-311",
    name: "ENDO-311",
    label: "Targeted localization",
    image: "/illustrations/endo-311-localization-pair-v4.avif",
    alt: "Conceptual illustration of a targeted imaging agent localizing around an intact solid-tumor focus.",
    activeGround: "bg-petal",
    activeInk: "text-rose-ink",
    marker: "bg-rose",
  },
  {
    id: "endo-995",
    name: "ENDO-995",
    label: "Intracellular target",
    image: "/illustrations/endo-995-intracellular-v4.avif",
    alt: "Conceptual illustration of a cyclic peptide undergoing uptake into a tumor cell toward an intracellular target.",
    activeGround: "bg-tint-teal",
    activeInk: "text-teal-ink",
    marker: "bg-teal",
  },
] as const;

type OncologyPairMobileComparisonProps = {
  className?: string;
};

export default function OncologyPairMobileComparison({
  className,
}: OncologyPairMobileComparisonProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeProgram =
    ONCOLOGY_PROGRAMS[activeIndex] ?? ONCOLOGY_PROGRAMS[0];
  const panelId = `${instanceId}-oncology-panel`;

  function selectProgram(nextIndex: number, moveFocus = false) {
    const resolvedIndex =
      (nextIndex + ONCOLOGY_PROGRAMS.length) % ONCOLOGY_PROGRAMS.length;

    setActiveIndex(resolvedIndex);
    if (moveFocus) {
      tabRefs.current[resolvedIndex]?.focus({ preventScroll: true });
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = index + 1;
        break;
      case "ArrowLeft":
        nextIndex = index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = ONCOLOGY_PROGRAMS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectProgram(nextIndex, true);
  }

  return (
    <figure
      data-oncology-pair-mobile
      className={clsx(
        "overflow-hidden rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface sm:hidden",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Oncology program views"
        aria-orientation="horizontal"
        className="grid grid-cols-2 border-b border-line bg-paper"
      >
        {ONCOLOGY_PROGRAMS.map((program, index) => {
          const selected = index === activeIndex;
          const tabId = `${instanceId}-${program.id}-tab`;

          return (
            <button
              key={program.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-label={`${program.name} ${program.label}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectProgram(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={clsx(
                "group relative flex min-h-16 min-w-0 flex-col justify-center px-4 py-3 text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink",
                index === 0 && "border-r border-line",
                selected
                  ? `${program.activeGround} ${program.activeInk}`
                  : "bg-paper text-muted",
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.13em]">
                {program.name}
              </span>
              <span
                className={clsx(
                  "mt-1 text-sm font-medium leading-snug",
                  selected ? "text-ink" : "text-muted",
                )}
              >
                {program.label}
              </span>
              <span
                aria-hidden
                className={clsx(
                  "absolute inset-x-4 bottom-0 h-0.5 origin-left",
                  program.marker,
                  !prefersReducedMotion &&
                    "transition-[opacity,transform] duration-500 ease-soft",
                  selected
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${instanceId}-${activeProgram.id}-tab`}
        tabIndex={0}
        className="focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink"
      >
        <div
          data-oncology-art-field
          className="relative aspect-[4/3] overflow-hidden bg-tint-warm"
        >
          {ONCOLOGY_PROGRAMS.map((program, index) => {
            const selected = index === activeIndex;

            return (
              <Image
                key={program.id}
                src={program.image}
                alt={selected ? program.alt : ""}
                aria-hidden={!selected}
                fill
                sizes="calc(100vw - 2.5rem)"
                className={clsx(
                  "object-cover object-center transform-gpu",
                  !prefersReducedMotion &&
                    "transition-[opacity,transform] duration-500 ease-soft",
                  selected
                    ? "z-10 scale-100 opacity-100"
                    : clsx(
                        "pointer-events-none z-0 opacity-0",
                        prefersReducedMotion ? "scale-100" : "scale-[1.025]",
                      ),
                )}
              />
            );
          })}
        </div>
      </div>

      <figcaption className="border-t border-line px-5 py-4 text-xs leading-relaxed text-muted">
        Conceptual representation of investigational preclinical programs; not
        clinical imaging, efficacy, or performance data.
      </figcaption>
    </figure>
  );
}
