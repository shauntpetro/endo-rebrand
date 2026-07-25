"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const MOBILE_VIEWS = [
  {
    id: "current",
    label: "Current path",
    image: "/illustrations/care-gap-current-path-mobile-v1.avif",
    description:
      "Conceptual lesion surrounded by a repeating symptom-management loop.",
    activeClass: "bg-petal text-rose-ink",
    dotClass: "bg-rose",
  },
  {
    id: "selective",
    label: "Selective path",
    image: "/illustrations/care-gap-selective-path-mobile-v6.avif",
    description:
      "Conceptual selective-uptake and pH-activation sequence with an intact peptide remaining visible within diseased tissue, followed by a separate state in which the same lesion recedes to represent the ENDO-205 preclinical lesion-elimination finding.",
    activeClass: "bg-tint-teal text-teal-ink",
    dotClass: "bg-teal",
  },
] as const;

export default function CareGapMobileComparison() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const activeView = MOBILE_VIEWS[activeIndex] ?? MOBILE_VIEWS[0];

  function select(index: number, moveFocus = false) {
    const nextIndex =
      (index + MOBILE_VIEWS.length) % MOBILE_VIEWS.length;
    setActiveIndex(nextIndex);

    if (moveFocus) {
      tabs.current[nextIndex]?.focus();
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(MOBILE_VIEWS.length - 1, true);
    }
  }

  return (
    <div
      data-care-gap-mobile
      className="bg-surface sm:hidden"
    >
      <div
        role="tablist"
        aria-label="Care-path views"
        className="grid grid-cols-2 border-b border-line"
      >
        {MOBILE_VIEWS.map((view, index) => {
          const selected = index === activeIndex;
          const tabId = `${id}-${view.id}-tab`;

          return (
            <button
              key={view.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative flex min-h-14 items-center justify-center gap-2.5 px-3 text-sm font-semibold transition-[background-color,color] duration-300 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transition-none ${
                selected ? view.activeClass : "bg-paper text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${view.dotClass} ${
                  selected ? "scale-100 opacity-100" : "scale-75 opacity-45"
                } transition-[opacity,transform] duration-300 motion-reduce:transition-none`}
              />
              {view.label}
              <span
                aria-hidden
                className={`absolute inset-x-5 bottom-0 h-0.5 origin-center ${view.dotClass} ${
                  selected ? "scale-x-100" : "scale-x-0"
                } transition-transform duration-500 ease-soft motion-reduce:transition-none`}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${activeView.id}-tab`}
        tabIndex={0}
        className="relative aspect-square overflow-hidden bg-tint-warm focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink"
      >
        <Image
          key={activeView.id}
          src={activeView.image}
          alt=""
          aria-hidden
          fill
          sizes="calc(100vw - 2.5rem)"
          className="object-cover object-center motion-safe:animate-[care-gap-view-in_600ms_cubic-bezier(0.22,1,0.36,1)_both]"
        />

        <p className="sr-only">{activeView.description}</p>
      </div>
    </div>
  );
}
