"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, MotionPathPlugin);

export default function ThreadMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>("[data-selective-thread-page]");
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const title = root.querySelector<HTMLElement>("[data-split-hero]");
      const split = title
        ? SplitText.create(title, {
            type: "lines",
            mask: "lines",
            linesClass: "line",
            autoSplit: true,
            onSplit(instance) {
              return gsap.from(instance.lines, {
                yPercent: 112,
                opacity: 0,
                duration: 1.05,
                stagger: 0.12,
                ease: "expo.out",
                delay: 0.12,
              });
            },
          })
        : null;

      gsap.from(root.querySelectorAll("[data-hero-fade]"), {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.65,
      });

      const heroBloom = root.querySelector<HTMLElement>("[data-hero-bloom]");
      if (heroBloom) {
        gsap.from(heroBloom, {
          scale: 0.82,
          rotation: -6,
          opacity: 0,
          duration: 1.35,
          delay: 0.38,
          ease: "expo.out",
        });
      }

      root.querySelectorAll<HTMLElement>("[data-hero-orbit]").forEach((orbit, index) => {
        gsap.from(orbit, {
          rotation: index % 2 === 0 ? -5 : 4,
          x: index % 2 === 0 ? -10 : 8,
          scale: 0.97,
          opacity: 0.35,
          transformOrigin: "50% 50%",
          duration: 1.4 + index * 0.15,
          delay: 0.45,
          ease: "power3.out",
        });
      });

      const heroPath = root.querySelector<SVGPathElement>("#hero-selective-path");
      const marker = root.querySelector<SVGCircleElement>("[data-thread-marker]");
      const halo = root.querySelector<SVGCircleElement>("[data-thread-marker-halo]");

      if (heroPath && marker && halo) {
        gsap.set([marker, halo], { transformOrigin: "50% 50%" });
        gsap.to([halo, marker], {
          duration: 3.2,
          ease: "power2.inOut",
          motionPath: {
            path: heroPath,
            align: heroPath,
            alignOrigin: [0.5, 0.5],
          },
        });
        gsap.to(halo, {
          scale: 1.35,
          opacity: 0.05,
          duration: 1.2,
          ease: "sine.inOut",
        });
      }

      root.querySelectorAll<HTMLElement>("[data-thread-reveal]").forEach((element) => {
        const vertical = element.dataset.threadReveal === "vertical";
        gsap.fromTo(
          element,
          { clipPath: vertical ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              end: "bottom 40%",
              scrub: 0.45,
            },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-scale-media]").forEach((element) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 94%",
              end: "bottom 18%",
              scrub: 0.5,
            },
          })
          .fromTo(element, { scale: 0.9, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1, ease: "none" });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-aperture]").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(7% 4% 7% 4% round 9rem)", scale: 0.965, opacity: 0.5 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              end: "top 34%",
              scrub: 0.45,
            },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-chapter-intro]").forEach((intro) => {
        gsap.from(Array.from(intro.children), {
          y: 34,
          opacity: 0,
          duration: 0.78,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-stack-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 42,
          opacity: 0.5,
          duration: 0.9,
          delay: Math.min(index * 0.04, 0.16),
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-breathe]").forEach((element) => {
        gsap.from(element, {
          scale: 0.96,
          rotation: -1.2,
          opacity: 0.55,
          transformOrigin: "50% 50%",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      const cleanups: Array<() => void> = [];
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const moveX = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" });
        const moveY = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" });
        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const bounds = element.getBoundingClientRect();
          moveX((event.clientX - bounds.left - bounds.width / 2) * 0.13);
          moveY((event.clientY - bounds.top - bounds.height / 2) * 0.18);
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
        };
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        split?.revert();
      };
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(root.querySelectorAll("[data-thread-reveal], [data-scale-media], [data-reveal-aperture], [data-stack-card], [data-hero-fade], [data-hero-bloom], [data-chapter-intro], [data-breathe]"), {
        clearProps: "all",
        opacity: 1,
      });
    });

    return () => media.revert();
  }, []);

  return null;
}
