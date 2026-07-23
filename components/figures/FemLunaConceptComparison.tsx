"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

const VIEWS = [
  {
    index: "01",
    controlLabel: "Current imaging",
    label: "Current imaging context",
    title: "A small lesion can blend into surrounding tissue.",
    body: "Superficial and sub-millimeter lesions are often missed by current imaging methods.",
    signal: "Low visual contrast",
    image: "/illustrations/femluna-comparison-current-v1.avif",
    alt: "Conceptual editorial tissue cross-section with a small low-contrast lesion blending into the surrounding tissue.",
    labelClass: "text-rose-ink",
    signalClass: "border-rose/30 bg-petal/90 text-rose-ink",
    groundClass: "bg-tint-warm",
  },
  {
    index: "02",
    controlLabel: "FemLUNA targeting",
    label: "FemLUNA™ targeting concept",
    title: "A targeted agent is designed to distinguish the lesion.",
    body: "FemLUNA™ applies a targeted imaging approach to accurate, non-invasive detection of endometriosis.",
    signal: "Targeted localization concept",
    image: "/illustrations/femluna-comparison-targeted-v1.avif",
    alt: "The matched conceptual tissue cross-section with a cyclic peptide and restrained teal localization signal distinguishing the small lesion.",
    labelClass: "text-teal-ink",
    signalClass: "border-teal/30 bg-tint-teal/90 text-teal-ink",
    groundClass: "bg-tint-teal",
  },
] as const;

const DETECTION_LOGIC = [
  {
    title: "Target",
    body: "Apply a targeted imaging agent.",
  },
  {
    title: "Distinguish",
    body: "Identify superficial and sub-millimeter lesions.",
  },
  {
    title: "Detect",
    body: "Support a non-invasive diagnostic path.",
  },
] as const;

const RANGE_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);

function StaticComparison() {
  return (
    <div className="grid md:grid-cols-2 md:divide-x md:divide-line">
      {VIEWS.map((view) => (
        <section key={view.index} className={`min-w-0 ${view.groundClass}`}>
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
            <Image
              src={view.image}
              alt={view.alt}
              fill
              sizes="(min-width: 1184px) 560px, (min-width: 768px) 50vw, 94vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/35 via-42% to-transparent"
            />
            <div className="absolute inset-x-0 top-0 z-10 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.16em] ${view.labelClass}`}>
                  {view.label}
                </p>
                <span className="text-[0.66rem] font-semibold tracking-[0.16em] text-muted">
                  {view.index}
                </span>
              </div>
              <h4 className="mt-4 max-w-[21ch] text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium leading-[1.14] tracking-[-0.02em] text-ink">
                {view.title}
              </h4>
            </div>
            <span
              className={`absolute bottom-5 left-5 z-10 rounded-full border px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.11em] sm:bottom-6 sm:left-7 ${view.signalClass}`}
            >
              {view.signal}
            </span>
          </div>

          <div className="border-t border-line bg-surface/90 px-6 py-6 sm:px-8 lg:px-10 lg:py-7">
            <p className="max-w-lg text-sm leading-relaxed text-muted">{view.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

function InteractiveComparison() {
  const [position, setPosition] = useState(50);
  const [adjusting, setAdjusting] = useState(false);
  const currentSelected = position === 0;
  const targetedSelected = position === 100;

  function selectView(nextPosition: 0 | 100) {
    setAdjusting(false);
    setPosition(nextPosition);
  }

  function handleRangeKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (RANGE_KEYS.has(event.key)) setAdjusting(true);
  }

  return (
    <section aria-label="Interactive conceptual imaging comparison">
      <div className="grid border-b border-line bg-paper sm:grid-cols-2 sm:divide-x sm:divide-line">
        {VIEWS.map((view, index) => {
          const selected = index === 0 ? currentSelected : targetedSelected;
          return (
            <button
              key={view.index}
              type="button"
              aria-pressed={selected}
              aria-controls="femluna-shared-viewport"
              onClick={() => selectView(index === 0 ? 0 : 100)}
              className={`group relative flex min-h-16 items-center justify-between gap-4 border-b border-line px-6 py-3 text-left active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transform-none sm:border-b-0 sm:px-8 lg:px-10 ${
                selected ? (index === 0 ? "bg-petal text-rose-ink" : "bg-tint-teal text-teal-ink") : "bg-paper text-ink"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-full ${index === 0 ? "bg-rose" : "bg-teal"} ${
                    selected ? "scale-125 opacity-100" : "scale-75 opacity-45"
                  } transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
                />
                <span className="text-sm font-semibold">{view.controlLabel}</span>
              </span>
              <span className="text-[0.66rem] font-semibold tracking-[0.16em] opacity-60">
                {view.index}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="femluna-shared-viewport"
        className="relative isolate aspect-[4/3] overflow-hidden bg-tint-warm sm:aspect-[16/9]"
      >
        <Image
          src={VIEWS[0].image}
          alt={VIEWS[0].alt}
          fill
          sizes="(min-width: 1184px) 1120px, 94vw"
          className="object-cover"
        />

        <div
          className={`absolute inset-0 ${adjusting ? "" : "transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"} motion-reduce:transition-none`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={VIEWS[1].image}
            alt={VIEWS[1].alt}
            fill
            sizes="(min-width: 1184px) 1120px, 94vw"
            className="object-cover"
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-6">
          <span className="rounded-full border border-rose/30 bg-paper/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-rose-ink backdrop-blur-sm">
            Current imaging
          </span>
          <span className="rounded-full border border-teal/30 bg-paper/90 px-3 py-1.5 text-right text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-teal-ink backdrop-blur-sm">
            FemLUNA targeting
          </span>
        </div>

        <input
          id="femluna-comparison-range"
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onPointerDown={() => setAdjusting(true)}
          onPointerUp={() => setAdjusting(false)}
          onPointerCancel={() => setAdjusting(false)}
          onKeyDown={handleRangeKeyDown}
          onKeyUp={() => setAdjusting(false)}
          onBlur={() => setAdjusting(false)}
          aria-label="Reveal FemLUNA targeting in the matched tissue field"
          aria-valuetext={`${position}% FemLUNA targeting visible`}
          aria-describedby="femluna-range-instructions femluna-comparison-caption"
          className="peer absolute inset-0 z-30 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />

        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-20 ${adjusting ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"} motion-reduce:transition-none`}
          style={{ transform: `translate3d(${position - 50}%, 0, 0)` }}
        >
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgb(57_38_56/0.12)]" />
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal/35 bg-paper text-teal-ink shadow-[0_10px_30px_rgb(57_38_56/0.18)]">
            <span className="flex items-center gap-1">
              <span className="h-4 w-px bg-rose" />
              <span className="h-5 w-px bg-gold" />
              <span className="h-4 w-px bg-teal" />
            </span>
          </span>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 z-40 rounded-bl-[1.5rem] rounded-tr-[1.5rem] ring-2 ring-teal-ink opacity-0 transition-opacity duration-200 peer-focus-visible:opacity-100 motion-reduce:transition-none"
        />
      </div>

      <div className="grid border-t border-line bg-surface md:grid-cols-2 md:divide-x md:divide-line">
        {VIEWS.map((view) => (
          <section key={view.index} className="px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.16em] ${view.labelClass}`}>
                {view.label}
              </p>
              <span className={`rounded-full border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${view.signalClass}`}>
                {view.signal}
              </span>
            </div>
            <h4 className="mt-4 max-w-[24ch] text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium leading-[1.14] tracking-[-0.02em] text-ink">
              {view.title}
            </h4>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{view.body}</p>
          </section>
        ))}
      </div>

      <div className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 text-xs leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 lg:px-10">
        <p id="femluna-range-instructions">
          Drag the comparison thread, or focus the image and use the Arrow keys. Home and End select a complete view.
        </p>
        <output htmlFor="femluna-comparison-range" className="shrink-0 font-semibold text-teal-ink">
          {position}% targeting visible
        </output>
      </div>
    </section>
  );
}

export default function FemLunaConceptComparison() {
  return (
    <figure
      aria-labelledby="femluna-comparison-title"
      aria-describedby="femluna-comparison-caption"
    >
      <div className="overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-surface editorial-shadow sm:rounded-bl-[4rem] sm:rounded-tr-[4rem]">
        <header
          data-tone="dark"
          className="relative overflow-hidden border-b border-line-on-dark bg-plum px-6 py-6 text-on-dark sm:px-8 lg:px-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_4%_20%,rgba(201,121,138,0.2),transparent_28%),radial-gradient(circle_at_94%_80%,rgba(143,197,186,0.16),transparent_30%)]"
          />
          <div className="relative grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(12rem,18rem)] md:items-end">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-teal-on-dark">
                Conceptual detection contrast
              </p>
              <h3
                id="femluna-comparison-title"
                className="mt-3 max-w-2xl text-[clamp(1.45rem,2.7vw,2.15rem)] font-medium leading-tight tracking-[-0.025em] !text-on-dark"
              >
                One tissue field. Two levels of visual distinction.
              </h3>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-on-dark md:justify-self-end md:text-right">
              Matched conceptual views; not clinical imaging or performance data.
            </p>
          </div>
        </header>

        <noscript>
          <style>{`.femluna-interactive{display:none!important}.femluna-static{display:block!important}`}</style>
        </noscript>
        <div className="femluna-interactive motion-reduce:hidden">
          <InteractiveComparison />
        </div>
        <div className="femluna-static hidden motion-reduce:block">
          <StaticComparison />
        </div>

        <ol className="grid border-t border-line bg-paper md:grid-cols-3 md:divide-x md:divide-line">
          {DETECTION_LOGIC.map((item, index) => (
            <li
              key={item.title}
              className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-line px-6 py-5 last:border-b-0 sm:px-8 md:border-b-0 lg:px-10 lg:py-6"
            >
              <span className="pt-0.5 text-xs font-semibold text-rose-ink">
                0{index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption
        id="femluna-comparison-caption"
        className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12"
      >
        <span className="md:col-span-8">
          The panels use matched conceptual tissue geometry to illustrate targeting logic.
        </span>
        <span className="text-xs md:col-span-4 md:text-right">
          FemLUNA™ is investigational and in IND-enabling development.
        </span>
      </figcaption>
    </figure>
  );
}
