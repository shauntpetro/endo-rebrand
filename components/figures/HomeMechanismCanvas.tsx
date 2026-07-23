"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MobileMechanismFlow from "./MobileMechanismFlow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LABELS = [
  {
    index: "01",
    label: "Inactive",
    title: "Near healthy tissue",
    body: "Designed to remain inactive near healthy tissue.",
    className: "left-[5%] top-8 max-w-52 border-rose",
  },
  {
    index: "02",
    label: "Activate",
    title: "Disease microenvironment",
    body: "pH-mediated activation changes the peptide state.",
    className: "left-[39%] bottom-8 max-w-56 border-gold",
  },
  {
    index: "03",
    label: "Enter",
    title: "Selective uptake",
    body: "A proprietary endocytic pathway supports uptake by diseased tissue.",
    className: "right-[4%] top-8 max-w-60 border-teal",
  },
] as const;

export default function HomeMechanismCanvas() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!root.current) {
            return;
          }

          const image = root.current.querySelector<HTMLElement>(
            "[data-mechanism-image]",
          );
          const labels = gsap.utils.toArray<HTMLElement>(
            "[data-mechanism-label]",
            root.current,
          );

          if (!image) {
            return;
          }

          gsap.set(image, {
            autoAlpha: 0.72,
            clipPath: "inset(7% 8% round 2.25rem)",
            scale: 0.975,
          });
          gsap.set(labels, { autoAlpha: 0, y: 18 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top 82%",
              once: true,
            },
          });

          timeline
            .to(image, {
              autoAlpha: 1,
              clipPath: "inset(0% 0% round 0rem)",
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            })
            .to(
              labels,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.12,
              },
              "-=0.5",
            );
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <figure ref={root}>
      <div className="hidden border-y border-line bg-surface md:block">
        <div
          data-mechanism-image
          className="relative aspect-[2/1] overflow-hidden transform-gpu will-change-[clip-path,transform]"
        >
          <Image
            src="/illustrations/selective-mechanism-v2.avif"
            alt="Conceptual illustration of a cyclic peptide near healthy tissue, changing state at a disease-tissue boundary, and entering a diseased cell."
            fill
            sizes="(min-width: 1184px) 1120px, 94vw"
            className="object-cover"
          />
          <ol className="absolute inset-0 list-none">
            {LABELS.map((item) => (
              <li
                key={item.index}
                data-mechanism-label
                className={`absolute border-l-2 bg-paper/90 px-4 py-3 transform-gpu ${item.className}`}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-rose-ink">
                  {item.index} · {item.label}
                </p>
                <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="md:hidden">
        <MobileMechanismFlow embedded />
      </div>

      <figcaption className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12">
        <span className="md:col-span-8">
          The EndoCyclic platform combines pH-mediated activation with selective uptake through a proprietary endocytic pathway.
        </span>
        <span className="md:col-span-4 md:text-right md:text-xs">
          Conceptual representation; investigational platform.
        </span>
      </figcaption>
    </figure>
  );
}
