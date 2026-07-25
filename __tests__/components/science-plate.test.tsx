import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SciencePlate from "@/components/site/SciencePlate";

const originalIntersectionObserver = globalThis.IntersectionObserver;
const originalMatchMedia = window.matchMedia;
const originalRequestAnimationFrame = window.requestAnimationFrame;
const originalCancelAnimationFrame = window.cancelAnimationFrame;

afterEach(() => {
  globalThis.IntersectionObserver = originalIntersectionObserver;
  window.matchMedia = originalMatchMedia;
  window.requestAnimationFrame = originalRequestAnimationFrame;
  window.cancelAnimationFrame = originalCancelAnimationFrame;
});

describe("SciencePlate", () => {
  it("keeps the complete figure visible when motion is unavailable", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media:
        "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { container } = render(
      <SciencePlate
        src="/illustrations/selective-mechanism-v5.avif"
        alt="Conceptual selective mechanism"
        caption="Conceptual representation."
      />,
    );

    expect(container.querySelector("figure")).not.toHaveAttribute(
      "data-plate-motion",
    );
    expect(
      screen.getByAltText("Conceptual selective mechanism"),
    ).toBeInTheDocument();
    expect(screen.getByText("Conceptual representation.")).toBeInTheDocument();
  });

  it("can serve an already optimized scientific master directly", () => {
    const { container } = render(
      <SciencePlate
        src="/illustrations/oncology-pair-v4.avif"
        alt="Conceptual oncology pair"
        aspect="panoramic"
        unoptimized
      />,
    );

    expect(screen.getByAltText("Conceptual oncology pair")).toHaveAttribute(
      "src",
      "/illustrations/oncology-pair-v4.avif",
    );
    expect(container.querySelector("[data-plate-frame]")).toHaveClass(
      "aspect-[2/1]",
    );
  });

  it("reveals once when the native observer reaches the scroll threshold", () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    const disconnect = vi.fn();

    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media:
        "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
      callback(window.performance.now());
      return 1;
    });
    window.cancelAnimationFrame = vi.fn();
    globalThis.IntersectionObserver = class {
      root = null;
      rootMargin = "0px 0px -14% 0px";
      thresholds = [0];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe() {}
      unobserve() {}
      disconnect = disconnect;
      takeRecords() {
        return [];
      }
    } as unknown as typeof IntersectionObserver;

    const { container } = render(
      <SciencePlate
        src="/illustrations/selective-mechanism-v5.avif"
        alt="Conceptual selective mechanism"
      />,
    );
    const figure = container.querySelector("figure");

    expect(figure).toHaveAttribute("data-plate-motion", "pending");

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(figure).toHaveAttribute("data-plate-motion", "revealed");
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("restores the full plate when reduced motion changes at runtime", () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    let matches = true;

    window.matchMedia = vi.fn().mockReturnValue({
      get matches() {
        return matches;
      },
      media:
        "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
      onchange: null,
      addEventListener: vi.fn(
        (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.add(listener);
        },
      ),
      removeEventListener: vi.fn(
        (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.delete(listener);
        },
      ),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
      callback(window.performance.now());
      return 1;
    });
    window.cancelAnimationFrame = vi.fn();
    globalThis.IntersectionObserver = class {
      root = null;
      rootMargin = "0px 0px -14% 0px";
      thresholds = [0];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    } as unknown as typeof IntersectionObserver;

    const { container } = render(
      <SciencePlate
        src="/illustrations/selective-mechanism-v5.avif"
        alt="Conceptual selective mechanism"
      />,
    );
    const figure = container.querySelector("figure");

    expect(observerCallback).toBeDefined();
    expect(figure).toHaveAttribute("data-plate-motion", "pending");

    act(() => {
      matches = false;
      listeners.forEach((listener) =>
        listener({
          matches,
          media:
            "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
        } as MediaQueryListEvent),
      );
    });

    expect(figure).not.toHaveAttribute("data-plate-motion");
    expect(container.querySelector("[data-plate-frame]")).toHaveClass(
      "[clip-path:inset(0)]",
    );
  });
});
