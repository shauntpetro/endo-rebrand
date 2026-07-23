import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import SelectiveSequence from "@/components/figures/SelectiveSequence";

const STEPS = [
  {
    index: "01",
    title: "pH-mediated activation",
    body: "Activation copy.",
  },
  {
    index: "02",
    title: "Selective uptake",
    body: "Uptake copy.",
  },
  {
    index: "03",
    title: "Non-hormonal action",
    body: "Action copy.",
  },
] as const;

const originalMatchMedia = window.matchMedia;
const originalScrollTo = window.scrollTo;
const originalRequestAnimationFrame = window.requestAnimationFrame;
const originalCancelAnimationFrame = window.cancelAnimationFrame;
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
      name: "Complete selective mechanism sequence",
    });

    expect(within(completeSequence).getAllByRole("listitem")).toHaveLength(3);
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
      name: "02 Selective uptake",
    });
    await user.click(uptakeTab);

    expect(uptakeTab).toHaveAttribute("aria-selected", "true");
    expect(scrollTo).toHaveBeenCalledWith({
      top: 1032,
      behavior: "smooth",
    });
  });
});

describe("PipelineStageAtlas", () => {
  it("uses compact visual stage labels while retaining full accessible names", () => {
    render(<PipelineStageAtlas />);

    const stageLists = screen.getAllByRole("list", {
      name: "Development stages",
    });
    const firstStageList = stageLists[0];

    expect(within(firstStageList).getAllByRole("listitem")).toHaveLength(6);
    expect(within(firstStageList).getByText("Disc.")).toHaveClass(
      "min-[400px]:hidden",
    );
    expect(within(firstStageList).getByText("Preclin.")).toBeInTheDocument();
    expect(within(firstStageList).getByText("IND")).toBeInTheDocument();
    expect(
      within(firstStageList)
        .getAllByText("Discovery")
        .find((element) => element.classList.contains("sr-only")),
    ).toBeInTheDocument();
  });
});
