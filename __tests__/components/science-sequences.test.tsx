import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import FemLunaConceptComparison from "@/components/figures/FemLunaConceptComparison";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import SelectiveSequence from "@/components/figures/SelectiveSequence";
import { PLATFORM_MECHANISM_STEPS } from "@/lib/site";

const STEPS = PLATFORM_MECHANISM_STEPS;

const originalMatchMedia = window.matchMedia;
const originalScrollTo = window.scrollTo;
const originalRequestAnimationFrame = window.requestAnimationFrame;
const originalCancelAnimationFrame = window.cancelAnimationFrame;
const originalIntersectionObserver = globalThis.IntersectionObserver;
const originalInnerHeight = Object.getOwnPropertyDescriptor(
  window,
  "innerHeight",
);
const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
const originalScrollHeight = Object.getOwnPropertyDescriptor(
  document.documentElement,
  "scrollHeight",
);

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  window.scrollTo = originalScrollTo;
  window.requestAnimationFrame = originalRequestAnimationFrame;
  window.cancelAnimationFrame = originalCancelAnimationFrame;
  globalThis.IntersectionObserver = originalIntersectionObserver;

  if (originalInnerHeight) {
    Object.defineProperty(window, "innerHeight", originalInnerHeight);
  } else {
    Reflect.deleteProperty(window, "innerHeight");
  }
  if (originalScrollY) {
    Object.defineProperty(window, "scrollY", originalScrollY);
  } else {
    Reflect.deleteProperty(window, "scrollY");
  }
  if (originalScrollHeight) {
    Object.defineProperty(
      document.documentElement,
      "scrollHeight",
      originalScrollHeight,
    );
  } else {
    Reflect.deleteProperty(document.documentElement, "scrollHeight");
  }
});

describe("SelectiveSequence", () => {
  it("keeps the complete ordered mechanism available as the static fallback", () => {
    render(<SelectiveSequence steps={STEPS} />);

    const completeSequence = screen.getByRole("list", {
      name: "Complete platform-to-evidence sequence",
    });

    expect(within(completeSequence).getAllByRole("listitem")).toHaveLength(4);
    const stageMarkers = completeSequence.querySelectorAll(
      "[data-sequence-static-marker]",
    );
    expect(stageMarkers).toHaveLength(4);
    stageMarkers.forEach((marker) => {
      expect(marker).toHaveClass("bg-plum", "text-on-dark");
    });
    for (const step of STEPS) {
      expect(within(completeSequence).getByText(step.title)).toBeInTheDocument();
    }
  });

  it("moves native scroll to the selected sticky stage", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 768px"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.scrollTo = scrollTo;
    window.requestAnimationFrame = vi.fn(() => 1);
    window.cancelAnimationFrame = vi.fn();
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 5000,
    });

    const { container } = render(<SelectiveSequence steps={STEPS} />);
    const sentinels = container.querySelectorAll(
      "[data-sequence-track] > div",
    );
    vi.spyOn(sentinels[1], "getBoundingClientRect").mockReturnValue({
      bottom: 1800,
      height: 800,
      left: 0,
      right: 1,
      top: 1000,
      width: 1,
      x: 0,
      y: 1000,
      toJSON: () => ({}),
    });

    const uptakeTab = screen.getByRole("tab", {
      name: /02\s*Enter\s*Selective uptake/i,
    });
    await user.click(uptakeTab);

    expect(uptakeTab).toHaveAttribute("aria-selected", "true");
    expect(scrollTo).toHaveBeenCalledWith({
      top: 1032,
      behavior: "smooth",
    });
  });

  it("shows only the active stage panel so copy never crossfades on top of itself", async () => {
    const user = userEvent.setup();
    render(<SelectiveSequence steps={STEPS} />);

    expect(screen.getByRole("tabpanel")).toHaveTextContent(STEPS[0].body);
    expect(
      document.querySelectorAll('[role="tabpanel"]:not([hidden])'),
    ).toHaveLength(1);

    await user.click(
      screen.getByRole("tab", { name: /02\s*Enter\s*Selective uptake/i }),
    );

    expect(screen.getByRole("tabpanel")).toHaveTextContent(STEPS[1].body);
    expect(
      document.querySelectorAll('[role="tabpanel"]:not([hidden])'),
    ).toHaveLength(1);
  });

  it("leaves vertical arrow keys available for page scrolling", () => {
    render(<SelectiveSequence steps={STEPS} />);

    const tablist = screen.getByRole("tablist", {
      name: "Platform stages and ENDO-205 evidence",
    });
    const targetTab = screen.getByRole("tab", {
      name: /01\s*Target\s*Diseased tissue selectivity/i,
    });
    const uptakeTab = screen.getByRole("tab", {
      name: /02\s*Enter\s*Selective uptake/i,
    });

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
    expect(
      fireEvent.keyDown(targetTab, { key: "ArrowDown" }),
    ).toBe(true);
    expect(
      fireEvent.keyDown(targetTab, { key: "ArrowUp" }),
    ).toBe(true);
    expect(targetTab).toHaveAttribute("aria-selected", "true");
    expect(uptakeTab).toHaveAttribute("aria-selected", "false");
  });

  it("keeps keyboard focus and ARIA selection together during scroll synchronization", async () => {
    const user = userEvent.setup();
    let simulatedScrollY = 0;
    let observerCallback: IntersectionObserverCallback | undefined;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 768px"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    globalThis.IntersectionObserver = class {
      root = null;
      rootMargin = "0px";
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
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      get: () => simulatedScrollY,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 5000,
    });
    window.scrollTo = vi.fn(
      (optionsOrX?: ScrollToOptions | number, y?: number) => {
        simulatedScrollY =
          typeof optionsOrX === "number"
            ? Number(y ?? 0)
            : Number(optionsOrX?.top ?? 0);
      },
    ) as typeof window.scrollTo;
    window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
      callback(window.performance.now());
      return 1;
    });
    window.cancelAnimationFrame = vi.fn();

    const { container } = render(
      <>
        <SelectiveSequence steps={STEPS} />
        <button type="button">After sequence</button>
      </>,
    );
    const sentinels = Array.from(
      container.querySelectorAll<HTMLElement>("[data-sequence-track] > div"),
    );

    sentinels.forEach((sentinel, index) => {
      vi.spyOn(sentinel, "getBoundingClientRect").mockImplementation(() => {
        const top = index * 800 - simulatedScrollY;
        return {
          bottom: top + 800,
          height: 800,
          left: 0,
          right: 1,
          top,
          width: 1,
          x: 0,
          y: top,
          toJSON: () => ({}),
        };
      });
    });

    const targetTab = screen.getByRole("tab", {
      name: /01\s*Target\s*Diseased tissue selectivity/i,
    });
    targetTab.focus();
    await user.keyboard("{ArrowRight}");

    const uptakeTab = screen.getByRole("tab", {
      name: /02\s*Enter\s*Selective uptake/i,
    });
    expect(uptakeTab).toHaveAttribute("aria-selected", "true");
    expect(document.activeElement).toBe(uptakeTab);

    simulatedScrollY = 1632;
    act(() => {
      observerCallback?.([], {} as IntersectionObserver);
    });

    const activationTab = screen.getByRole("tab", {
      name: /03\s*Activate\s*pH-mediated activation/i,
    });
    expect(uptakeTab).toHaveAttribute("aria-selected", "true");
    expect(activationTab).toHaveAttribute("aria-selected", "false");
    expect(activationTab).toHaveAttribute("tabindex", "-1");
    expect(document.activeElement).toBe(uptakeTab);

    const uptakePanel = screen.getByRole("tabpanel");
    uptakePanel.focus();
    expect(document.activeElement).toBe(uptakePanel);

    act(() => {
      observerCallback?.([], {} as IntersectionObserver);
    });

    expect(uptakeTab).toHaveAttribute("aria-selected", "true");
    expect(activationTab).toHaveAttribute("aria-selected", "false");
    expect(document.activeElement).toBe(uptakePanel);

    screen.getByRole("button", { name: "After sequence" }).focus();
    act(() => {
      observerCallback?.([], {} as IntersectionObserver);
    });

    expect(activationTab).toHaveAttribute("aria-selected", "true");
  });
});

describe("PipelineStageAtlas", () => {
  it("renders one responsive program row per candidate with precise stage names", () => {
    const { container } = render(<PipelineStageAtlas />);

    const firstStageList = screen.getByRole("list", {
      name: "ENDO-205 development stages",
    });
    const atlasTitle = screen.getByRole("heading", {
      level: 2,
      name: "Current stages across endometriosis and oncology.",
    });

    expect(within(firstStageList).getAllByRole("listitem")).toHaveLength(6);
    expect(atlasTitle).toHaveAttribute("id", "pipeline-atlas-title");
    expect(
      screen.getByRole("heading", { level: 3, name: "Endometriosis" }),
    ).toHaveAttribute("id", "pipeline-area-endometriosis");
    expect(
      screen.getByRole("heading", { level: 3, name: "Oncology" }),
    ).toHaveAttribute("id", "pipeline-area-oncology");
    expect(container.querySelectorAll("[data-pipeline-row]")).toHaveLength(4);
    expect(
      firstStageList.querySelector("[data-mobile-stage-segment]"),
    ).toHaveTextContent("Disc.");
    expect(
      Array.from(
        firstStageList.querySelectorAll(
          ":scope > li > span[aria-hidden].hidden.sm\\:inline",
        ),
        (label) => label.textContent?.replace(/\s+/g, ""),
      ),
    ).toEqual([
      "Discovery",
      "Pre-clinical",
      "IND-enabling",
      "Phase1",
      "Phase2",
      "Phase3",
    ]);
    expect(
      within(firstStageList).getByRole("listitem", {
        current: "step",
      }),
    ).toHaveTextContent("Phase 1, current stage for ENDO-205");
    expect(
      screen
        .getAllByRole("link", { name: /ENDO-995/i })
        .every((link) => link.getAttribute("href") === "/pipeline#endo-995"),
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: /ENDO-311/i })
        .every((link) => link.getAttribute("href") === "/pipeline#endo-311"),
    ).toBe(true);
  });
});

describe("FemLunaConceptComparison", () => {
  it("exposes targeting visibility as the direct range value with explicit direction", async () => {
    const user = userEvent.setup();
    const { container } = render(<FemLunaConceptComparison />);

    const slider = screen.getByRole("slider", {
      name: "FemLUNA targeting visibility in the matched tissue field",
    });
    const targetingLayer = container.querySelector<HTMLElement>(
      "[data-femluna-targeting-layer]",
    );
    const currentLayer = container.querySelector<HTMLElement>(
      "[data-femluna-current-layer]",
    );
    const interactiveComparison = container.querySelector<HTMLElement>(
      "[data-femluna-comparison-interactive]",
    );
    const focusIndicator = container.querySelector<HTMLElement>(
      "[data-femluna-range-focus]",
    );

    expect(slider).toHaveValue("50");
    expect(currentLayer).toHaveAttribute("aria-hidden", "false");
    expect(targetingLayer).toHaveAttribute("aria-hidden", "false");
    expect(
      within(interactiveComparison as HTMLElement).getAllByRole("img"),
    ).toHaveLength(2);
    expect(targetingLayer).toHaveStyle({ clipPath: "inset(0 0 0 50%)" });
    expect(focusIndicator).toHaveAttribute("aria-hidden", "true");
    expect(slider).toHaveAttribute("dir", "rtl");
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Comparison position: 50% toward the FemLUNA targeting concept and 50% toward the current-imaging view",
    );
    expect(
      screen.getByText(/Arrow Left to reveal more FemLUNA targeting/i),
    ).toBeInTheDocument();

    slider.focus();
    await user.keyboard("{ArrowLeft}");
    expect(slider).toHaveValue("51");
    expect(targetingLayer).toHaveStyle({ clipPath: "inset(0 0 0 49%)" });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Comparison position: 51% toward the FemLUNA targeting concept and 49% toward the current-imaging view",
    );

    await user.keyboard("{End}");
    expect(slider).toHaveValue("100");
    expect(targetingLayer).toHaveStyle({ clipPath: "inset(0 0 0 0%)" });
    expect(currentLayer).toHaveAttribute("aria-hidden", "true");
    expect(targetingLayer).toHaveAttribute("aria-hidden", "false");
    expect(
      within(interactiveComparison as HTMLElement).getByRole("img", {
        name: /matched conceptual tissue cross-section/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(interactiveComparison as HTMLElement).queryByRole("img", {
        name: /small lesion shown subtly/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /FemLUNA targeting/ }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /Current imaging/ }));
    expect(slider).toHaveValue("0");
    expect(targetingLayer).toHaveStyle({ clipPath: "inset(0 0 0 100%)" });
    expect(currentLayer).toHaveAttribute("aria-hidden", "false");
    expect(targetingLayer).toHaveAttribute("aria-hidden", "true");
    expect(
      within(interactiveComparison as HTMLElement).getByRole("img", {
        name: /small lesion shown subtly/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(interactiveComparison as HTMLElement).queryByRole("img", {
        name: /matched conceptual tissue cross-section/i,
      }),
    ).not.toBeInTheDocument();
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Comparison position: 0% toward the FemLUNA targeting concept and 100% toward the current-imaging view",
    );
  });
});
