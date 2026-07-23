"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import Container from "./Container";

const CHAPTERS = [
  { id: "development", label: "Overview" },
  { id: "endo-205", label: "ENDO-205" },
  { id: "femluna", label: "FemLUNA™" },
  { id: "oncology", label: "Oncology" },
  { id: "evidence", label: "Evidence" },
] as const;

type ChapterId = (typeof CHAPTERS)[number]["id"];

export default function PipelineChapterNav() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>(CHAPTERS[0].id);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const sections = CHAPTERS.map((chapter) =>
      document.getElementById(chapter.id),
    ).filter((section): section is HTMLElement => Boolean(section));
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        const next = CHAPTERS.find((chapter) => visible.has(chapter.id));
        if (next) setActiveChapter(next.id);
      },
      {
        rootMargin: "-124px 0px -66% 0px",
        threshold: [0, 0.01],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const link = linkRefs.current.get(activeChapter);
    if (!scroller || !link || scroller.scrollWidth <= scroller.clientWidth) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const left =
      link.offsetLeft - scroller.clientWidth / 2 + link.offsetWidth / 2;

    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeChapter]);

  return (
    <nav
      aria-label="Pipeline chapters"
      className="sticky top-16 z-40 border-y border-line bg-paper/95 shadow-[0_10px_28px_rgb(57_38_56/0.06)] backdrop-blur-md"
    >
      <Container className="flex min-h-14 items-center gap-3 sm:gap-5">
        <span
          aria-hidden
          className="hidden shrink-0 items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-muted sm:flex"
        >
          <span className="h-px w-7 bg-gradient-to-r from-rose via-gold to-teal" />
          Chapters
        </span>

        <ul
          ref={scrollerRef}
          className="no-scrollbar -mx-2 flex min-w-0 flex-1 snap-x snap-mandatory items-stretch overflow-x-auto px-2 lg:mx-0 lg:justify-end lg:overflow-visible lg:px-0"
        >
          {CHAPTERS.map((chapter) => {
            const active = activeChapter === chapter.id;

            return (
              <li key={chapter.id} className="shrink-0 snap-center">
                <a
                  ref={(node) => {
                    if (node) linkRefs.current.set(chapter.id, node);
                    else linkRefs.current.delete(chapter.id);
                  }}
                  href={`#${chapter.id}`}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveChapter(chapter.id)}
                  className={clsx(
                    "group relative inline-flex min-h-14 items-center gap-2 px-3 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transition-none sm:px-4",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full bg-teal transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  />
                  {chapter.label}
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute inset-x-3 bottom-0 h-px origin-left bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inset-x-4",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
