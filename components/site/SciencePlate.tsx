"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

type PlateAspect = "wide" | "panoramic" | "landscape" | "square" | "auto";
type PlateFrame = "line" | "soft" | "bleed" | "none";
type PlateMotionState = "visible" | "pending" | "revealed";

export default function SciencePlate({
  src,
  alt,
  caption,
  disclosure,
  children,
  priority = false,
  unoptimized = false,
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
  unoptimized?: boolean;
  aspect?: PlateAspect;
  frame?: PlateFrame;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [motionState, setMotionState] =
    useState<PlateMotionState>("visible");

  useEffect(() => {
    const rootNode = root.current;
    if (!rootNode || typeof IntersectionObserver === "undefined") {
      return;
    }

    const motionQuery = window.matchMedia(
      "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
    );
    let observer: IntersectionObserver | undefined;
    let animationFrame = 0;
    let cancelled = false;
    let hasRevealed = false;

    const disconnectObserver = () => {
      observer?.disconnect();
      observer = undefined;
    };

    const connectObserver = () => {
      disconnectObserver();
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      if (!motionQuery.matches || hasRevealed) {
        setMotionState("visible");
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        if (cancelled || !motionQuery.matches) {
          setMotionState("visible");
          return;
        }

        try {
          observer = new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;

              hasRevealed = true;
              setMotionState("revealed");
              disconnectObserver();
            },
            {
              rootMargin: "0px 0px -14% 0px",
              threshold: 0,
            },
          );

          // The server-rendered default is fully visible. Only opt into the
          // clipped start state once the observer is ready to reveal it.
          setMotionState("pending");
          observer.observe(rootNode);
        } catch {
          setMotionState("visible");
        }
      });
    };

    connectObserver();
    motionQuery.addEventListener("change", connectObserver);

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", connectObserver);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      disconnectObserver();
    };
  }, []);

  const aspectClass: Record<PlateAspect, string> = {
    wide: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[2/1]",
    panoramic: "aspect-[2/1]",
    landscape: "aspect-[3/2]",
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
    <figure
      ref={root}
      data-plate-motion={
        motionState === "visible" ? undefined : motionState
      }
      className={clsx("not-prose", className)}
    >
      <div
        data-plate-frame
        className={clsx(
          "relative overflow-hidden transform-gpu",
          aspectClass[aspect],
          frameClass[frame],
          motionState === "pending"
            ? "[clip-path:inset(3.5%_6%_3.5%_0)]"
            : "[clip-path:inset(0)]",
          motionState === "revealed" &&
            "transition-[clip-path] duration-[820ms] ease-[var(--ease-soft)] motion-reduce:transition-none",
        )}
      >
        <Image
          data-plate-image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={unoptimized}
          sizes={sizes}
          className={clsx(
            "origin-center object-cover transform-gpu motion-reduce:scale-100 motion-reduce:transition-none",
            motionState === "pending" ? "scale-[1.025]" : "scale-100",
            motionState === "revealed" &&
              "transition-transform duration-[960ms] ease-[var(--ease-soft)]",
            imageClassName,
          )}
        />
        {children}
      </div>
      {(caption || disclosure) && (
        <figcaption
          data-plate-caption
          className={clsx(
            "mt-4 grid gap-2 text-sm leading-relaxed text-muted motion-reduce:translate-y-0 motion-reduce:transition-none md:grid-cols-12",
            motionState === "pending" ? "translate-y-2" : "translate-y-0",
            motionState === "revealed" &&
              "delay-200 duration-[480ms] ease-[var(--ease-soft)] transition-transform",
          )}
        >
          {caption && <span className="md:col-span-8">{caption}</span>}
          {disclosure && (
            <span className="text-xs md:col-span-4 md:text-right">
              {disclosure}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
