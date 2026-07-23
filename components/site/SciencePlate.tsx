"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PlateAspect = "wide" | "landscape" | "square" | "auto";
type PlateFrame = "line" | "soft" | "bleed" | "none";

export default function SciencePlate({
  src,
  alt,
  caption,
  disclosure,
  children,
  priority = false,
  aspect = "wide",
  frame = "line",
  sizes = "(min-width: 1184px) 1120px, 94vw",
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  disclosure?: React.ReactNode;
  children?: React.ReactNode;
  priority?: boolean;
  aspect?: PlateAspect;
  frame?: PlateFrame;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
        const frameNode = root.current?.querySelector<HTMLElement>("[data-plate-frame]");
        const imageNode = root.current?.querySelector<HTMLElement>("[data-plate-image]");
        const captionNode = root.current?.querySelector<HTMLElement>("[data-plate-caption]");

        if (!frameNode || !imageNode) return;

        gsap.set(frameNode, { clipPath: "inset(3.5% 6% 3.5% 0)" });
        gsap.set(imageNode, { scale: 1.025, transformOrigin: "50% 50%" });
        if (captionNode) gsap.set(captionNode, { autoAlpha: 0.58, y: 8 });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 86%",
            once: true,
          },
        });

        timeline
          .to(frameNode, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.82 }, 0)
          .to(imageNode, { scale: 1, duration: 0.96 }, 0);

        if (captionNode) {
          timeline.to(captionNode, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.2);
        }
      });

      return () => media.revert();
    },
    { scope: root },
  );

  const aspectClass: Record<PlateAspect, string> = {
    wide: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[2/1]",
    landscape: "aspect-[4/3] lg:aspect-[3/2]",
    square: "aspect-square",
    auto: "min-h-[24rem]",
  };
  const frameClass: Record<PlateFrame, string> = {
    line: "rounded-bl-[1.75rem] rounded-tr-[1.75rem] border border-line bg-surface sm:rounded-bl-[3rem] sm:rounded-tr-[3rem]",
    soft: "rounded-[1.5rem] bg-surface shadow-[0_22px_64px_rgb(57_38_56/0.08)] sm:rounded-[2rem]",
    bleed: "hero-frame-bleed bg-surface",
    none: "bg-transparent",
  };

  return (
    <figure ref={root} className={clsx("not-prose", className)}>
      <div data-plate-frame className={clsx("relative overflow-hidden transform-gpu", aspectClass[aspect], frameClass[frame])}>
        <Image data-plate-image src={src} alt={alt} fill priority={priority} sizes={sizes} className={clsx("object-cover transform-gpu", imageClassName)} />
        {children}
      </div>
      {(caption || disclosure) && (
        <figcaption data-plate-caption className="mt-4 grid gap-2 text-sm leading-relaxed text-muted md:grid-cols-12">
          {caption && <span className="md:col-span-8">{caption}</span>}
          {disclosure && <span className="text-xs md:col-span-4 md:text-right">{disclosure}</span>}
        </figcaption>
      )}
    </figure>
  );
}
