"use client";

import { type ReactNode, useEffect, useRef } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type HomeNewsPointerProps = {
  children: ReactNode;
  className: string;
};

export default function HomeNewsPointer({
  children,
  className,
}: HomeNewsPointerProps) {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return;

    const featuredLink = mark.closest<HTMLAnchorElement>(
      "[data-featured-link]",
    );
    if (!featuredLink) return;

    const activeMark: HTMLDivElement = mark;
    const activeLink: HTMLAnchorElement = featuredLink;
    let markFrame: number | null = null;
    let markPosition = { x: 0, y: 0 };
    let markPointer: { clientX: number; clientY: number } | null = null;

    function scheduleMarkFrame() {
      if (markFrame !== null) return;

      markFrame = window.requestAnimationFrame(() => {
        if (markPointer) {
          const bounds = activeLink.getBoundingClientRect();
          if (bounds.width > 0 && bounds.height > 0) {
            markPosition = {
              x:
                ((markPointer.clientX - bounds.left) / bounds.width - 0.5) *
                14,
              y:
                ((markPointer.clientY - bounds.top) / bounds.height - 0.5) *
                10,
            };
          }
        }

        activeMark.style.transform = `translate3d(${markPosition.x.toFixed(2)}px, ${markPosition.y.toFixed(2)}px, 0)`;
        markFrame = null;
      });
    }

    function moveMark(event: PointerEvent) {
      if (
        event.pointerType === "touch" ||
        (typeof window.matchMedia === "function" &&
          window.matchMedia(REDUCED_MOTION_QUERY).matches)
      ) {
        return;
      }

      markPointer = {
        clientX: event.clientX,
        clientY: event.clientY,
      };
      scheduleMarkFrame();
    }

    function resetMark() {
      markPointer = null;
      markPosition = { x: 0, y: 0 };
      scheduleMarkFrame();
    }

    activeLink.addEventListener("pointermove", moveMark);
    activeLink.addEventListener("pointerleave", resetMark);
    activeLink.addEventListener("blur", resetMark);

    return () => {
      activeLink.removeEventListener("pointermove", moveMark);
      activeLink.removeEventListener("pointerleave", resetMark);
      activeLink.removeEventListener("blur", resetMark);
      if (markFrame !== null) {
        window.cancelAnimationFrame(markFrame);
      }
    };
  }, []);

  return (
    <div
      ref={markRef}
      data-featured-mark
      aria-hidden
      className={className}
    >
      {children}
    </div>
  );
}
