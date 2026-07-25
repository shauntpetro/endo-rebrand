"use client";

import { useEffect } from "react";

export const HOME_DESKTOP_MOTION_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const HOME_DESKTOP_MOTION_TARGET_SELECTOR =
  "[data-home-chapter-marker]";
export const HOME_DESKTOP_MOTION_ROOT_MARGIN = "0px 0px 64px 0px";

export default function HomeDesktopMotion({
  rootId,
}: {
  rootId: string;
}) {
  useEffect(() => {
    const media = window.matchMedia(HOME_DESKTOP_MOTION_QUERY);
    let dispose: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;
    let targetIsNear = false;
    let loadVersion = 0;
    let unmounted = false;

    const disable = () => {
      loadVersion += 1;
      dispose?.();
      dispose = undefined;
    };

    const enable = async () => {
      if (!media.matches || dispose) return;

      const version = ++loadVersion;
      try {
        const { initHomeDesktopMotion } = await import("./HomeMotionRuntime");

        if (unmounted || !media.matches || version !== loadVersion) return;

        const root = document.getElementById(rootId);
        if (!root) return;

        dispose = initHomeDesktopMotion(root);
      } catch {
        // The server-rendered experience is complete without the optional
        // desktop motion runtime, so a failed chunk remains a quiet fallback.
      }
    };

    const disconnectObserver = () => {
      observer?.disconnect();
      observer = undefined;
    };

    const watchFirstTarget = () => {
      if (!media.matches || targetIsNear || observer) return;

      const root = document.getElementById(rootId);
      const target = root?.querySelector<HTMLElement>(
        HOME_DESKTOP_MOTION_TARGET_SELECTOR,
      );
      if (!root || !target) return;

      if (typeof window.IntersectionObserver !== "function") {
        targetIsNear = true;
        void enable();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;

          targetIsNear = true;
          disconnectObserver();
          void enable();
        },
        {
          rootMargin: HOME_DESKTOP_MOTION_ROOT_MARGIN,
          threshold: 0,
        },
      );
      observer.observe(target);
    };

    const sync = () => {
      if (!media.matches) {
        disconnectObserver();
        disable();
      } else if (targetIsNear) {
        void enable();
      } else {
        watchFirstTarget();
      }
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      unmounted = true;
      media.removeEventListener("change", sync);
      disconnectObserver();
      disable();
    };
  }, [rootId]);

  return null;
}
