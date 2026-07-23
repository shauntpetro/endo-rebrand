"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { MILESTONES, PARTNERS } from "@/lib/site";

type CarouselState = {
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function DirectionIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
      <path d={direction === "previous" ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

export function EvidenceCarousel() {
  const viewportId = useId();
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    slidesToScroll: 1,
  });
  const [carouselState, setCarouselState] = useState<CarouselState>({
    selectedIndex: 0,
    canScrollPrev: false,
    canScrollNext: MILESTONES.length > 1,
  });

  const syncCarouselState = useCallback((api: EmblaCarouselType) => {
    setCarouselState({
      selectedIndex: api.selectedScrollSnap(),
      canScrollPrev: api.canScrollPrev(),
      canScrollNext: api.canScrollNext(),
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(() => syncCarouselState(emblaApi));
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  const currentMilestone = MILESTONES[Math.min(carouselState.selectedIndex, MILESTONES.length - 1)];

  return (
    <div className="relative">
      <div data-partner-rail className="grid gap-5 border-y py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Validation network</p>
        <ul aria-label="Validation organizations" className="grid grid-cols-2 items-center gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <li key={partner.name} data-partner-logo className="flex items-center justify-center">
              <Image src={partner.src} alt={partner.name} width={128} height={44} draggable={false} className="max-h-10 w-auto max-w-28 object-contain opacity-80" />
            </li>
          ))}
        </ul>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label="EndoCyclic milestones" className="pt-10 md:pt-12">
        <div className="mb-7 flex items-center justify-between gap-5">
          <div className="font-medium tabular-nums text-ink" aria-hidden>
            <span>{String(carouselState.selectedIndex + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-line">/</span>
            <span className="text-muted">{String(MILESTONES.length).padStart(2, "0")}</span>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">{`Current evidence: ${currentMilestone.title}. ${currentMilestone.detail}`}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-controls={viewportId}
              aria-label="Previous milestone"
              disabled={!carouselState.canScrollPrev}
              onClick={() => emblaApi?.scrollPrev(prefersReducedMotion())}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#8b4b62]/25 bg-paper px-4 text-sm font-medium text-ink transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#8b4b62] hover:bg-[#8b4b62] hover:text-on-dark disabled:pointer-events-none disabled:opacity-35"
            >
              <DirectionIcon direction="previous" /><span className="hidden sm:inline">Previous</span>
            </button>
            <button
              type="button"
              aria-controls={viewportId}
              aria-label="Next milestone"
              disabled={!carouselState.canScrollNext}
              onClick={() => emblaApi?.scrollNext(prefersReducedMotion())}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#4a2d43] bg-[#4a2d43] px-4 text-sm font-medium text-on-dark transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#8b4b62] hover:bg-[#8b4b62] disabled:pointer-events-none disabled:opacity-35"
            >
              <span className="hidden sm:inline">Next</span><DirectionIcon direction="next" />
            </button>
          </div>
        </div>

        <div id={viewportId} ref={viewportRef} className="overflow-hidden">
          <div className="-ml-4 flex touch-pan-y touch-pinch-zoom md:-ml-5">
            {MILESTONES.map((milestone, index) => {
              const isDark = index === 0 || index === MILESTONES.length - 1;
              const lightTone = index % 2 === 0 ? "bg-[#f4e7d8]" : "bg-[#f7e8e7]";
              return (
                <div key={milestone.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${MILESTONES.length}: ${milestone.title}`} className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 md:pl-5 xl:basis-1/3">
                  <article data-evidence-card className={`group relative flex h-full min-h-80 flex-col overflow-hidden border p-7 transition-transform duration-700 ease-[var(--ease-soft)] hover:-translate-y-1 md:min-h-96 md:p-8 ${isDark ? "border-[#4a2d43] bg-[#4a2d43] text-on-dark" : `border-line ${lightTone} text-ink-body`}`}>
                    <div aria-hidden className={`mb-12 flex items-center gap-3 ${isDark ? "text-[#f0b4c1]" : "text-[#8b4b62]"}`}>
                      <span className="h-2 w-2 rounded-full bg-current" />
                      <span className={`h-px flex-1 origin-left transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-x-90 ${isDark ? "bg-line-on-dark" : "bg-line"}`} />
                    </div>
                    <h3 className={`t-h3 max-w-xs ${isDark ? "!text-on-dark" : "text-ink"}`}>{milestone.title}</h3>
                    <p className={`mt-5 max-w-sm text-sm leading-7 ${isDark ? "text-muted-on-dark" : "text-muted"}`}>{milestone.detail}</p>
                    <div aria-hidden className={`mt-auto pt-12 ${isDark ? "text-line-on-dark" : "text-line"}`}>
                      <svg viewBox="0 0 240 32" className="h-8 w-full" fill="none">
                        <path d="M0 16h88c16 0 16-12 32-12s16 24 32 24 16-12 32-12h56" stroke="currentColor" />
                        <circle cx="120" cy="4" r="3" className={isDark ? "fill-gold" : "fill-rose"} />
                      </svg>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvidenceCarousel;
