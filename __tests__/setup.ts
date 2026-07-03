import "@testing-library/jest-dom/vitest";

// jsdom lacks the browser APIs our scroll/motion hooks rely on.
// Stub them so components using useVisibility / usePrefersReducedMotion render in tests.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error - assigning a minimal stub to the global
  globalThis.IntersectionObserver = IntersectionObserverStub;
}

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
