"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Button from "@/components/site/Button";

const PROGRAM_STATUS = [
  {
    label: "Development stage",
    value: "Phase 1",
  },
  {
    label: "Regulatory milestone",
    value: "FDA IND Allowance · 2026",
  },
] as const;

export default function Endo205ImpactTranslation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let observer: IntersectionObserver | null = null;
    let animations: Animation[] = [];

    const reset = () => {
      observer?.disconnect();
      observer = null;
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };

    const prepare = () => {
      reset();
      if (reducedMotion.matches || !desktop.matches) return;

      const visual = node.querySelector<HTMLElement>("[data-endo205-visual]");
      const image = node.querySelector<HTMLElement>("[data-endo205-image]");
      const route = node.querySelector<HTMLElement>("[data-endo205-route]");
      const proof = node.querySelector<HTMLElement>("[data-endo205-proof]");
      const copy = Array.from(
        node.querySelectorAll<HTMLElement>("[data-endo205-copy]"),
      );

      if (!visual || !image) return;

      const motion: Array<{
        element: HTMLElement;
        keyframes: Keyframe[];
        options: KeyframeAnimationOptions;
      }> = [
        {
          element: visual,
          keyframes: [
            { clipPath: "inset(0 7% 0 0)" },
            { clipPath: "inset(0 0 0 0)" },
          ],
          options: {
            duration: 820,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        },
        {
          element: image,
          keyframes: [
            { transform: "scale(1.035)" },
            { transform: "scale(1)" },
          ],
          options: {
            duration: 980,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        },
      ];

      if (route) {
        motion.push({
          element: route,
          keyframes: [
            { transform: "scaleX(0)", opacity: 0.35 },
            { transform: "scaleX(1)", opacity: 1 },
          ],
          options: {
            duration: 720,
            delay: 170,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        });
      }

      copy.forEach((element, index) => {
        motion.push({
          element,
          keyframes: [
            { transform: "translateY(16px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          options: {
            duration: 560,
            delay: 150 + index * 70,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        });
      });

      if (proof) {
        motion.push({
          element: proof,
          keyframes: [
            { transform: "translateY(12px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          options: {
            duration: 520,
            delay: 360,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        });
      }

      animations = motion.map(({ element, keyframes, options }) => {
        const animation = element.animate(keyframes, options);
        animation.pause();
        return animation;
      });

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          animations.forEach((animation) => animation.play());
          observer?.disconnect();
          observer = null;
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -8% 0px",
        },
      );
      observer.observe(node);
    };

    prepare();
    reducedMotion.addEventListener("change", prepare);
    desktop.addEventListener("change", prepare);

    return () => {
      reducedMotion.removeEventListener("change", prepare);
      desktop.removeEventListener("change", prepare);
      reset();
    };
  }, []);

  return (
    <figure
      ref={root}
      className="overflow-hidden rounded-bl-[2rem] rounded-tr-[2rem] border border-line bg-surface shadow-[0_28px_80px_rgb(57_38_56/0.1)] sm:rounded-bl-[3.5rem] sm:rounded-tr-[3.5rem]"
    >
      <div className="grid lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <div
            data-endo205-visual
            className="relative aspect-[3/2] overflow-hidden bg-tint-warm"
          >
            <Image
              data-endo205-image
              src="/illustrations/endo-205-translation-v1.avif"
              alt="Conceptual illustration of pH-mediated activation and selective peptide uptake at an endometriosis lesion."
              fill
              sizes="(min-width: 1184px) 740px, (min-width: 1024px) 60vw, 100vw"
              className="object-contain transform-gpu sm:object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-plum/15 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-x-8 bottom-7 hidden items-center gap-3 sm:flex"
            >
              <span className="h-3 w-3 rounded-full border-2 border-surface bg-rose shadow-sm" />
              <span
                data-endo205-route
                className="h-px flex-1 origin-left bg-gradient-to-r from-rose via-gold to-teal"
              />
              <span className="relative h-8 w-8 rounded-full border border-teal bg-surface/90">
                <span className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal" />
              </span>
            </div>
          </div>

          <div className="grid gap-2 border-t border-line px-5 py-5 text-sm leading-relaxed text-muted sm:grid-cols-12 sm:px-7">
            <span className="sm:col-span-7">
              Conceptual view of pH-mediated activation and selective uptake by
              diseased tissue.
            </span>
            <span className="text-xs sm:col-span-5 sm:text-right">
              Conceptual representation; not clinical imagery or efficacy data.
            </span>
          </div>
        </div>

        <div
          data-tone="dark"
          className="relative flex min-w-0 flex-col overflow-hidden border-t border-line-on-dark bg-plum px-5 py-9 text-on-dark sm:px-8 sm:py-11 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-9 xl:col-span-4 xl:px-10"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose via-gold to-teal"
          />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-56 w-56 rounded-full border border-line-on-dark"
          />

          <div data-endo205-copy className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-on-dark">
              Lead therapeutic · Endometriosis
            </p>
            <h3 className="mt-5 break-words text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-on-dark [overflow-wrap:anywhere]">
              ENDO-205
            </h3>
            <p className="mt-6 text-base font-medium leading-relaxed text-on-dark">
              Designed to eliminate endometriosis lesions and resolve associated
              symptoms, including pain.
            </p>
          </div>

          <dl data-endo205-copy className="relative mt-8 divide-y divide-line-on-dark border-y border-line-on-dark">
            {PROGRAM_STATUS.map((item) => (
              <div key={item.label} className="py-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-on-dark">
                  {item.label}
                </dt>
                <dd className="mt-2 text-lg font-medium leading-snug text-on-dark">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p
            data-endo205-copy
            className="relative mt-7 border-l border-gold/70 pl-4 text-sm leading-relaxed text-muted-on-dark"
          >
            A first-in-class, non-hormonal precision peptide therapeutic designed
            as a short-course, disease-modifying treatment.
          </p>

          <div data-endo205-copy className="relative mt-9 lg:mt-auto lg:pt-10">
            <Button
              href="/pipeline#endo-205"
              variant="ghost-on-dark"
              className="w-full sm:w-auto"
            >
              Review ENDO-205 in the pipeline
            </Button>
          </div>
        </div>
      </div>

      <div
        data-endo205-proof
        className="grid border-t border-line bg-tint-teal md:grid-cols-12"
      >
        <div className="border-b border-line px-5 py-6 sm:px-7 md:col-span-4 md:border-b-0 md:border-r lg:px-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
            Preclinical foundation
          </p>
        </div>
        <p className="px-5 py-6 text-sm leading-relaxed text-ink sm:px-7 md:col-span-8 lg:px-9">
          Preclinical studies demonstrated elimination of endometriosis lesions
          and associated inflammation. GLP toxicology studies showed no
          dose-limiting toxicities.
        </p>
      </div>
      <figcaption className="sr-only">
        ENDO-205 translates the precision peptide platform&apos;s selective design
        into a first-in-class, non-hormonal therapeutic in Phase 1 following FDA
        IND Allowance in 2026.
      </figcaption>
    </figure>
  );
}
