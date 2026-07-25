"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

type MotionState = "visible" | "pending" | "revealed";

export function PipelineAtlasMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [motionState, setMotionState] = useState<MotionState>("visible");

  useEffect(() => {
    const rootNode = root.current;
    if (
      !rootNode ||
      typeof IntersectionObserver === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    const animationFrame = window.requestAnimationFrame(() => {
      try {
        const rows = Array.from(
          rootNode.querySelectorAll<HTMLElement>(
            '[data-pipeline-row="program"]',
          ),
        );

        rows.forEach((row, rowIndex) => {
          const rowDelay = rowIndex * 140;
          const tracks = Array.from(
            row.querySelectorAll<HTMLElement>("[data-pipeline-stage-track]"),
          );

          tracks.forEach((track, trackIndex) => {
            track.style.setProperty(
              "--pipeline-motion-delay",
              `${rowDelay + trackIndex * 55}ms`,
            );
          });
          row
            .querySelector<HTMLElement>("[data-pipeline-current-marker]")
            ?.style.setProperty(
              "--pipeline-motion-delay",
              `${rowDelay + 260}ms`,
            );
          row
            .querySelector<HTMLElement>("[data-pipeline-current-label]")
            ?.style.setProperty(
              "--pipeline-motion-delay",
              `${rowDelay + 300}ms`,
            );
        });

        observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;

            setMotionState("revealed");
            observer?.disconnect();
          },
          {
            rootMargin: "0px 0px -24% 0px",
            threshold: 0,
          },
        );

        // Keep SSR/no-JS fully visible. The clipped start state is applied
        // only after the observer is ready to complete the sequence.
        setMotionState("pending");
        observer.observe(rootNode);
      } catch {
        setMotionState("visible");
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={root}
      data-pipeline-motion={
        motionState === "visible" ? undefined : motionState
      }
      className={clsx(
        "min-w-0",
        motionState === "pending" && [
          "[&_[data-pipeline-stage-track]]:origin-left",
          "[&_[data-pipeline-stage-track]]:scale-x-0",
          "[&_[data-pipeline-current-marker]]:scale-[0.72]",
          "[&_[data-pipeline-current-marker]]:opacity-[0.42]",
          "[&_[data-pipeline-current-label]]:translate-y-1.5",
        ],
        motionState === "revealed" && [
          "[&_[data-pipeline-stage-track]]:origin-left",
          "[&_[data-pipeline-stage-track]]:scale-x-100",
          "[&_[data-pipeline-stage-track]]:transition-transform",
          "[&_[data-pipeline-stage-track]]:duration-[580ms]",
          "[&_[data-pipeline-stage-track]]:ease-[var(--ease-soft)]",
          "[&_[data-pipeline-stage-track]]:[transition-delay:var(--pipeline-motion-delay)]",
          "[&_[data-pipeline-current-marker]]:scale-100",
          "[&_[data-pipeline-current-marker]]:opacity-100",
          "[&_[data-pipeline-current-marker]]:transition-[transform,opacity]",
          "[&_[data-pipeline-current-marker]]:duration-[340ms]",
          "[&_[data-pipeline-current-marker]]:ease-[var(--ease-soft)]",
          "[&_[data-pipeline-current-marker]]:[transition-delay:var(--pipeline-motion-delay)]",
          "[&_[data-pipeline-current-label]]:translate-y-0",
          "[&_[data-pipeline-current-label]]:transition-transform",
          "[&_[data-pipeline-current-label]]:duration-[340ms]",
          "[&_[data-pipeline-current-label]]:ease-[var(--ease-soft)]",
          "[&_[data-pipeline-current-label]]:[transition-delay:var(--pipeline-motion-delay)]",
        ],
      )}
    >
      {children}
    </div>
  );
}

export function PipelineThesis({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const root = useRef<HTMLHeadingElement>(null);
  const [motionState, setMotionState] = useState<MotionState>("visible");
  const words = children.split(" ");

  useEffect(() => {
    const rootNode = root.current;
    if (
      !rootNode ||
      typeof IntersectionObserver === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    const animationFrame = window.requestAnimationFrame(() => {
      try {
        observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;

            setMotionState("revealed");
            observer?.disconnect();
          },
          {
            rootMargin: "0px 0px -16% 0px",
            threshold: 0,
          },
        );

        setMotionState("pending");
        observer.observe(rootNode);
      } catch {
        setMotionState("visible");
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
    };
  }, []);

  return (
    <h2
      ref={root}
      aria-label={children}
      data-pipeline-thesis-motion={
        motionState === "visible" ? undefined : motionState
      }
      className={className}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-pipeline-word
          style={{ transitionDelay: `${Math.min(index * 32, 420)}ms` }}
          className={clsx(
            "inline-block motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
            motionState === "pending" && "translate-y-1.5 opacity-[0.58]",
            motionState === "revealed" &&
              "translate-y-0 opacity-100 transition-[transform,opacity] duration-500 ease-[var(--ease-soft)]",
          )}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </h2>
  );
}
