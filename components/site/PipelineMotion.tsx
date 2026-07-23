"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PipelineAtlasMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      const buildSequence = (rowSelector: string) => {
        const rows = gsap.utils.toArray<HTMLElement>(rowSelector, root.current);
        if (!rows.length) return;

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 76%",
            once: true,
          },
        });

        rows.forEach((row, index) => {
          const tracks = gsap.utils.toArray<HTMLElement>(
            "[data-pipeline-stage-track]",
            row,
          );
          const marker = row.querySelector<HTMLElement>(
            "[data-pipeline-current-marker]",
          );
          const label = row.querySelector<HTMLElement>(
            "[data-pipeline-current-label]",
          );
          const start = index * 0.14;

          gsap.set(tracks, { scaleX: 0, transformOrigin: "left center" });
          if (marker) gsap.set(marker, { opacity: 0.42, scale: 0.72 });
          if (label) gsap.set(label, { y: 6 });

          timeline.to(
            tracks,
            {
              scaleX: 1,
              duration: 0.58,
              stagger: 0.055,
            },
            start,
          );

          if (marker) {
            timeline.to(
              marker,
              { opacity: 1, scale: 1, duration: 0.34 },
              start + 0.26,
            );
          }

          if (label) {
            timeline.to(
              label,
              { y: 0, duration: 0.34 },
              start + 0.3,
            );
          }
        });
      };

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => buildSequence('[data-pipeline-row="desktop"]'),
      );
      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => buildSequence('[data-pipeline-row="mobile"]'),
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="min-w-0">
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
  const words = children.split(" ");

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-pipeline-word]",
          root.current,
        );

        gsap.set(items, { opacity: 0.74 });
        gsap.to(items, {
          opacity: 1,
          stagger: 0.065,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 84%",
            end: "bottom 46%",
            scrub: 0.5,
          },
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <h2 ref={root} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-pipeline-word
          className="inline-block"
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </h2>
  );
}
