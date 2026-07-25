import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomeDesktopMotion, {
  HOME_DESKTOP_MOTION_ROOT_MARGIN,
  HOME_DESKTOP_MOTION_QUERY,
  HOME_DESKTOP_MOTION_TARGET_SELECTOR,
} from "@/components/figures/HomeDesktopMotion";

const { disposeMotion, initHomeDesktopMotion } = vi.hoisted(() => ({
  disposeMotion: vi.fn(),
  initHomeDesktopMotion: vi.fn(),
}));

vi.mock("@/components/figures/HomeMotionRuntime", () => ({
  initHomeDesktopMotion,
}));

const originalMatchMedia = window.matchMedia;
const originalIntersectionObserver = globalThis.IntersectionObserver;

let intersectionCallback: IntersectionObserverCallback | undefined;
let intersectionOptions: IntersectionObserverInit | undefined;
let observedTarget: Element | undefined;
const observeTarget = vi.fn((target: Element) => {
  observedTarget = target;
});
const disconnectObserver = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = HOME_DESKTOP_MOTION_ROOT_MARGIN;
  readonly thresholds = [0];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    intersectionCallback = callback;
    intersectionOptions = options;
  }

  observe = observeTarget;
  unobserve = vi.fn();
  disconnect = disconnectObserver;
  takeRecords = vi.fn(() => []);
}

function renderMotionLoader() {
  return render(
    <div id="home-motion-test">
      <HomeDesktopMotion rootId="home-motion-test" />
      <div data-home-narrative-thread>
        <span data-home-chapter-marker />
      </div>
    </div>,
  );
}

function intersectObservedTarget() {
  const callback = intersectionCallback;
  const target = observedTarget;

  if (!callback || !target) {
    throw new Error("Motion target is not being observed.");
  }

  act(() => {
    callback(
      [
        {
          isIntersecting: true,
          target,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });
}

function installMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let matches = initialMatches;

  const mediaQuery = {
    get matches() {
      return matches;
    },
    media: HOME_DESKTOP_MOTION_QUERY,
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
  } as unknown as MediaQueryList;

  window.matchMedia = vi.fn().mockReturnValue(mediaQuery);

  return {
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches, media: mediaQuery.media } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe("HomeDesktopMotion", () => {
  beforeEach(() => {
    disposeMotion.mockReset();
    initHomeDesktopMotion.mockReset();
    initHomeDesktopMotion.mockReturnValue(disposeMotion);
    intersectionCallback = undefined;
    intersectionOptions = undefined;
    observedTarget = undefined;
    observeTarget.mockClear();
    disconnectObserver.mockClear();
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("keeps the static fallback without initializing desktop motion on phones or reduced motion", async () => {
    installMatchMedia(false);

    renderMotionLoader();

    await act(async () => {
      await Promise.resolve();
    });

    expect(window.matchMedia).toHaveBeenCalledWith(HOME_DESKTOP_MOTION_QUERY);
    expect(observeTarget).not.toHaveBeenCalled();
    expect(initHomeDesktopMotion).not.toHaveBeenCalled();
  });

  it("waits until the first real motion target is near before loading the optional runtime", async () => {
    const media = installMatchMedia(false);

    renderMotionLoader();

    act(() => media.setMatches(true));

    expect(observeTarget).toHaveBeenCalledWith(
      document.querySelector(HOME_DESKTOP_MOTION_TARGET_SELECTOR),
    );
    expect(intersectionOptions).toEqual({
      rootMargin: HOME_DESKTOP_MOTION_ROOT_MARGIN,
      threshold: 0,
    });
    expect(initHomeDesktopMotion).not.toHaveBeenCalled();

    intersectObservedTarget();

    await waitFor(() => {
      expect(initHomeDesktopMotion).toHaveBeenCalledWith(
        document.getElementById("home-motion-test"),
      );
    });

    act(() => media.setMatches(false));

    expect(disposeMotion).toHaveBeenCalledTimes(1);
  });

  it("disposes initialized motion when the loader unmounts", async () => {
    installMatchMedia(true);

    const { unmount } = renderMotionLoader();
    intersectObservedTarget();

    await waitFor(() => {
      expect(initHomeDesktopMotion).toHaveBeenCalledTimes(1);
    });

    unmount();

    expect(disposeMotion).toHaveBeenCalledTimes(1);
  });

  it("keeps the static fallback when optional motion initialization fails", async () => {
    installMatchMedia(true);
    initHomeDesktopMotion.mockImplementation(() => {
      throw new Error("optional runtime unavailable");
    });

    renderMotionLoader();
    intersectObservedTarget();

    await waitFor(() => {
      expect(initHomeDesktopMotion).toHaveBeenCalledTimes(1);
    });
  });

  it("preserves progressive enhancement when IntersectionObserver is unavailable", async () => {
    installMatchMedia(true);
    globalThis.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver;

    renderMotionLoader();

    await waitFor(() => {
      expect(initHomeDesktopMotion).toHaveBeenCalledWith(
        document.getElementById("home-motion-test"),
      );
    });
  });
});
