"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScaleFade({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { autoAlpha: 0.65, scale: 0.9, y: 24 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 92%",
              end: "top 52%",
              scrub: 0.5,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={clsx("will-change-transform", className)}>
      {children}
    </div>
  );
}

export function StackMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root.current);
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0.72, scale: 0.975, y: 46 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                end: "top 62%",
                scrub: 0.45,
              },
            },
          );
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

export function ScrubText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = children.split(" ");

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-scrub-word]", root.current);
        gsap.set(items, { opacity: 0.14 });
        gsap.to(items, {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
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
    <p ref={root} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-scrub-word className="inline-block">
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </p>
  );
}

export function ValidationMarquee({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <div
      className={clsx(
        "border-y px-4 py-5",
        dark ? "border-line-on-dark" : "border-line",
      )}
      aria-label="External validation"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map((item) => (
          <span
            key={item}
            className={clsx(
              "flex min-h-8 items-center gap-3 text-sm font-medium",
              dark ? "text-muted-on-dark" : "text-muted",
            )}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
