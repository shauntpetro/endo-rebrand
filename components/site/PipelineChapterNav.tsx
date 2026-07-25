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

const NESTED_HASH_CHAPTERS: Record<string, ChapterId> = {
  "endo-995": "oncology",
  "endo-311": "oncology",
};

function chapterFromHash(hash: string): ChapterId | undefined {
  const id = hash.replace(/^#/, "");
  const chapter = CHAPTERS.find((candidate) => candidate.id === id);

  return chapter?.id ?? NESTED_HASH_CHAPTERS[id];
}

export default function PipelineChapterNav() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>(CHAPTERS[0].id);
  // Render the narrow-screen continuation cue in SSR/no-JS output. Once the
  // client can measure the rail, it removes the cue when every chapter fits or
  // the reader reaches the end.
  const [hasMoreChapters, setHasMoreChapters] = useState(true);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const sections = CHAPTERS.map((chapter) =>
      document.getElementById(chapter.id),
    ).filter((section): section is HTMLElement => Boolean(section));
    const visible = new Set<string>();
    let hashTarget: HTMLElement | null = null;
    const syncHash = () => {
      const chapter = chapterFromHash(window.location.hash);
      hashTarget = document.getElementById(
        window.location.hash.replace(/^#/, ""),
      );
      if (chapter) setActiveChapter(chapter);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    let observer: IntersectionObserver | undefined;
    if (typeof window.IntersectionObserver === "function") {
      observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          });

          if (hashTarget) {
            const targetTop = hashTarget.getBoundingClientRect().top;
            const reachedTarget =
              targetTop >= 80 && targetTop <= window.innerHeight * 0.72;

            if (!reachedTarget) return;
            hashTarget = null;
          }

          const next = CHAPTERS.find((chapter) => visible.has(chapter.id));
          if (next) setActiveChapter(next.id);
        },
        {
          rootMargin: "-124px 0px -66% 0px",
          threshold: [0, 0.01],
        },
      );

      sections.forEach((section) => observer?.observe(section));
    }

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const syncOverflowCue = () => {
      const remaining =
        scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft;
      setHasMoreChapters(remaining > 2);
    };

    syncOverflowCue();
    scroller.addEventListener("scroll", syncOverflowCue, { passive: true });
    window.addEventListener("resize", syncOverflowCue);

    return () => {
      scroller.removeEventListener("scroll", syncOverflowCue);
      window.removeEventListener("resize", syncOverflowCue);
    };
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
      data-pipeline-chapter-nav
      className="sticky top-16 z-40 border-y border-line bg-paper/95 shadow-[0_10px_28px_rgb(57_38_56/0.06)] backdrop-blur-md"
    >
      <Container className="flex min-h-14 items-center gap-3 sm:gap-5">
        <span
          aria-hidden
          className="hidden shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted sm:flex"
        >
          <span className="h-px w-7 bg-gradient-to-r from-rose via-gold to-teal" />
          Chapters
        </span>

        <div className="relative min-w-0 flex-1">
          <ul
            ref={scrollerRef}
            data-chapter-scroller
            className="no-scrollbar -mx-2 flex min-w-0 snap-x snap-mandatory items-stretch overflow-x-auto px-2 lg:mx-0 lg:justify-end lg:overflow-visible lg:px-0"
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
                      "pipeline-chapter-link group relative inline-flex min-h-14 items-center gap-2 px-3 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-ink motion-reduce:transition-none sm:px-4",
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

          <span
            data-chapter-overflow-cue
            aria-hidden
            className={clsx(
              "pointer-events-none absolute inset-y-0 -right-1 flex w-14 items-center justify-end bg-gradient-to-l from-paper via-paper/90 to-transparent pr-1 text-xl text-teal-ink transition-opacity duration-300 motion-reduce:transition-none md:hidden",
              hasMoreChapters ? "opacity-100" : "opacity-0",
            )}
          >
            ›
          </span>
        </div>
      </Container>
    </nav>
  );
}
