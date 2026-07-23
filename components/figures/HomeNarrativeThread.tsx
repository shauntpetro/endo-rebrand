"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, useGSAP);

const THREAD_PATH =
  "M22 0 C8 86 31 205 18 326 C6 438 33 572 17 704 C30 812 8 912 22 1000";

export default function HomeNarrativeThread() {
  const root = useRef<HTMLDivElement>(null);
  const activeLayer = useRef<HTMLDivElement>(null);
  const activePath = useRef<SVGPathElement>(null);
  const traveler = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!root.current || !activeLayer.current || !activePath.current || !traveler.current) {
            return;
          }

          const narrative = root.current.parentElement;
          const chapterDots = narrative
            ? gsap.utils.toArray<HTMLElement>(
                "[data-home-chapter-marker] > span",
                narrative,
              )
            : [];

          gsap.set(activeLayer.current, {
            clipPath: "inset(0 0 100% 0)",
          });
          gsap.set(traveler.current, {
            transformOrigin: "50% 50%",
            motionPath: {
              path: activePath.current,
              align: activePath.current,
              alignOrigin: [0, 0],
              start: 0,
              end: 0,
            },
          });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom 28%",
              scrub: 0.55,
            },
          });

          timeline
            .to(
              activeLayer.current,
              { clipPath: "inset(0 0 0% 0)" },
              0,
            )
            .to(
              traveler.current,
              {
                motionPath: {
                  path: activePath.current,
                  align: activePath.current,
                  alignOrigin: [0, 0],
                  start: 0,
                  end: 1,
                },
              },
              0,
            );

          gsap.set(chapterDots, {
            scale: 1,
            transformOrigin: "50% 50%",
          });

          chapterDots.forEach((dot) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: dot,
                  start: "top 72%",
                  once: true,
                },
              })
              .to(dot, {
                scale: 1.65,
                duration: 0.22,
                ease: "power3.out",
              })
              .to(dot, {
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
              });
          });
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 z-10 hidden w-10 md:block"
      style={{ left: "max(0.75rem, calc((100vw - 74rem) / 2 + 0.75rem))" }}
    >
      <svg
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path
          d={THREAD_PATH}
          fill="none"
          stroke="#7d697c"
          strokeLinecap="round"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        ref={activeLayer}
        className="absolute inset-0 transform-gpu will-change-[clip-path]"
      >
        <svg
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="home-narrative-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1000"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#c9798a" />
              <stop offset="0.3" stopColor="#c9798a" />
              <stop offset="0.43" stopColor="#43877d" />
              <stop offset="0.67" stopColor="#43877d" />
              <stop offset="0.8" stopColor="#d8b850" />
              <stop offset="1" stopColor="#d8b850" />
            </linearGradient>
          </defs>
          <path
            ref={activePath}
            d={THREAD_PATH}
            fill="none"
            stroke="url(#home-narrative-gradient)"
            strokeLinecap="round"
            strokeOpacity="0.74"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          ref={traveler}
          className="absolute bottom-0 left-[55%] h-0 w-0 transform-gpu"
        >
          <span className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-paper shadow-[0_0_0_3px_rgb(251_250_248/0.72)]" />
        </span>
      </div>
    </div>
  );
}
