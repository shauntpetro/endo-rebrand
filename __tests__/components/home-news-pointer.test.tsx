import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomeNewsPointer from "@/components/figures/HomeNewsPointer";

const originalMatchMedia = window.matchMedia;
const originalRequestAnimationFrame = window.requestAnimationFrame;
const originalCancelAnimationFrame = window.cancelAnimationFrame;

let frameCallbacks: Map<number, FrameRequestCallback>;
let nextFrameId: number;

function installMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: reducedMotion,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

function renderPointer() {
  const view = render(
    <a href="/featured" data-featured-link>
      Featured
      <HomeNewsPointer className="featured-mark">
        <span>Mark</span>
      </HomeNewsPointer>
    </a>,
  );

  const link = view.container.querySelector<HTMLAnchorElement>(
    "[data-featured-link]",
  );
  const mark = view.container.querySelector<HTMLElement>(
    "[data-featured-mark]",
  );

  if (!link || !mark) {
    throw new Error("Pointer test fixture did not render.");
  }

  return { ...view, link, mark };
}

function pointerMove(
  target: Element,
  pointerType: "mouse" | "pen" | "touch",
  clientX: number,
  clientY: number,
) {
  const event = new Event("pointermove", { bubbles: true });
  Object.defineProperties(event, {
    pointerType: { value: pointerType },
    clientX: { value: clientX },
    clientY: { value: clientY },
  });
  fireEvent(target, event);
}

function flushFrames() {
  const callbacks = [...frameCallbacks.values()];
  frameCallbacks.clear();
  act(() => {
    callbacks.forEach((callback) => callback(window.performance.now()));
  });
}

beforeEach(() => {
  frameCallbacks = new Map();
  nextFrameId = 1;
  installMatchMedia(false);
  window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
    const frameId = nextFrameId;
    nextFrameId += 1;
    frameCallbacks.set(frameId, callback);
    return frameId;
  });
  window.cancelAnimationFrame = vi.fn((frameId: number) => {
    frameCallbacks.delete(frameId);
  });
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  window.requestAnimationFrame = originalRequestAnimationFrame;
  window.cancelAnimationFrame = originalCancelAnimationFrame;
});

describe("HomeNewsPointer", () => {
  it("coalesces mouse and pen movement into the latest animation frame", () => {
    const { link, mark } = renderPointer();
    vi.spyOn(link, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });

    pointerMove(link, "mouse", 75, 60);
    pointerMove(link, "pen", 100, 100);

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(link.getBoundingClientRect).not.toHaveBeenCalled();

    flushFrames();

    expect(link.getBoundingClientRect).toHaveBeenCalledTimes(1);
    expect(mark).toHaveStyle({
      transform: "translate3d(7.00px, 5.00px, 0)",
    });
  });

  it("ignores touch movement and reduced-motion pointer movement", () => {
    const { link } = renderPointer();

    pointerMove(link, "touch", 100, 100);
    installMatchMedia(true);
    pointerMove(link, "mouse", 100, 100);

    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    expect(frameCallbacks.size).toBe(0);
  });

  it("resets the mark on pointer leave and blur", () => {
    const { link, mark } = renderPointer();
    vi.spyOn(link, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });

    pointerMove(link, "mouse", 100, 100);
    flushFrames();
    expect(mark).toHaveStyle({
      transform: "translate3d(7.00px, 5.00px, 0)",
    });

    fireEvent.pointerLeave(link);
    flushFrames();
    expect(mark).toHaveStyle({
      transform: "translate3d(0.00px, 0.00px, 0)",
    });

    pointerMove(link, "pen", 0, 0);
    flushFrames();
    expect(mark).toHaveStyle({
      transform: "translate3d(-7.00px, -5.00px, 0)",
    });

    fireEvent.blur(link);
    flushFrames();
    expect(mark).toHaveStyle({
      transform: "translate3d(0.00px, 0.00px, 0)",
    });
  });

  it("cancels a pending animation frame when it unmounts", () => {
    const { link, unmount } = renderPointer();

    pointerMove(link, "mouse", 100, 100);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);

    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
    expect(frameCallbacks.size).toBe(0);
  });
});
