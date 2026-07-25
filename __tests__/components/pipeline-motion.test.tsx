import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PipelineAtlasMotion,
  PipelineThesis,
} from "@/components/site/PipelineMotion";

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

function installMotionEnvironment() {
  let observerCallback: IntersectionObserverCallback | undefined;
  const disconnect = vi.fn();

  window.matchMedia = vi.fn((query: string) => ({
    matches:
      query === "(prefers-reduced-motion: no-preference)" ||
      query === "(min-width: 1024px)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
    callback(window.performance.now());
    return 1;
  });
  window.cancelAnimationFrame = vi.fn();
  globalThis.IntersectionObserver = class {
    root = null;
    rootMargin = "0px 0px -24% 0px";
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

  return {
    disconnect,
    reveal() {
      act(() => {
        observerCallback?.(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      });
    },
  };
}

describe("Pipeline motion", () => {
  it("keeps atlas content fully visible when motion is unavailable", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: no-preference)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { container } = render(
      <PipelineAtlasMotion>
        <span data-pipeline-stage-track>Stage track</span>
      </PipelineAtlasMotion>,
    );

    expect(container.firstChild).not.toHaveAttribute("data-pipeline-motion");
    expect(screen.getByText("Stage track")).toBeVisible();
  });

  it("runs the atlas reveal once and assigns stagger delays", () => {
    const motion = installMotionEnvironment();
    const { container } = render(
      <PipelineAtlasMotion>
        <div data-pipeline-row="program">
          <span data-pipeline-stage-track>Stage one</span>
          <span data-pipeline-stage-track>Stage two</span>
          <span data-pipeline-current-marker>Current marker</span>
          <span data-pipeline-current-label>Current label</span>
        </div>
      </PipelineAtlasMotion>,
    );

    const root = container.firstChild;
    expect(root).toHaveAttribute("data-pipeline-motion", "pending");
    expect(screen.getByText("Stage two")).toHaveStyle({
      "--pipeline-motion-delay": "55ms",
    });

    motion.reveal();

    expect(root).toHaveAttribute("data-pipeline-motion", "revealed");
    expect(motion.disconnect).toHaveBeenCalledTimes(1);
  });

  it("renders the complete thesis as readable text", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: no-preference)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    render(
      <PipelineThesis>
        One platform. Four precision programs.
      </PipelineThesis>,
    );

    expect(
      screen.getByRole("heading", {
        name: "One platform. Four precision programs.",
      }),
    ).toBeVisible();
  });
});
