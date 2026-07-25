import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export function initHomeDesktopMotion(root: HTMLElement) {
  let clearMechanismCompositorHints: (() => void) | undefined;

  const context = gsap.context(() => {
    const thread = root.querySelector<HTMLElement>(
      "[data-home-narrative-thread]",
    );
    const activeLayer = thread?.querySelector<HTMLElement>(
      "[data-home-thread-active]",
    );
    const activePath = thread?.querySelector<SVGPathElement>(
      "[data-home-thread-path]",
    );
    const traveler = thread?.querySelector<HTMLElement>(
      "[data-home-thread-traveler]",
    );

    if (thread && activeLayer && activePath && traveler) {
      const chapterDots = gsap.utils.toArray<HTMLElement>(
        "[data-home-chapter-marker] > span",
        root,
      );

      gsap.set(activeLayer, {
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(traveler, {
        transformOrigin: "50% 50%",
        motionPath: {
          path: activePath,
          align: activePath,
          alignOrigin: [0, 0],
          start: 0,
          end: 0,
        },
      });

      const updateThreadCompositorHints = (isActive: boolean) => {
        if (isActive) {
          gsap.set(activeLayer, { willChange: "clip-path" });
          gsap.set(traveler, { willChange: "transform" });
          return;
        }

        gsap.set([activeLayer, traveler], { clearProps: "willChange" });
      };

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: thread,
            start: "top 78%",
            end: "bottom 28%",
            scrub: 0.55,
            onToggle: (trigger) => {
              updateThreadCompositorHints(trigger.isActive);
            },
          },
        })
        .to(activeLayer, { clipPath: "inset(0 0 0% 0)" }, 0)
        .to(
          traveler,
          {
            motionPath: {
              path: activePath,
              align: activePath,
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
    }

    const mechanism = root.querySelector<HTMLElement>(
      "[data-home-mechanism]",
    );
    const mechanismImage = mechanism?.querySelector<HTMLElement>(
      "[data-mechanism-image]",
    );

    if (mechanism && mechanismImage) {
      const labels = gsap.utils.toArray<HTMLElement>(
        "[data-mechanism-label]",
        mechanism,
      );
      const mechanismMotionTargets = [mechanismImage, ...labels];

      const updateMechanismCompositorHints = (isActive: boolean) => {
        if (isActive) {
          gsap.set(mechanismImage, {
            willChange: "clip-path, transform",
          });
          gsap.set(labels, {
            willChange: "transform, opacity",
          });
          return;
        }

        gsap.set(mechanismMotionTargets, {
          clearProps: "willChange",
        });
      };
      clearMechanismCompositorHints = () => {
        updateMechanismCompositorHints(false);
      };

      gsap.set(mechanismImage, {
        autoAlpha: 0.72,
        clipPath: "inset(7% 8% round 2.25rem)",
        scale: 0.975,
      });
      gsap.set(labels, {
        autoAlpha: 0,
        y: 18,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: mechanismImage,
            start: "top 82%",
            once: true,
            onToggle: (trigger) => {
              updateMechanismCompositorHints(trigger.isActive);
            },
          },
        })
        .to(mechanismImage, {
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
        )
        .set(mechanismMotionTargets, { clearProps: "willChange" });
    }
  }, root);

  return () => {
    clearMechanismCompositorHints?.();
    context.revert();
  };
}
