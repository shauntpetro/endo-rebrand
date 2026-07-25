import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OncologyPairMobileComparison from "@/components/figures/OncologyPairMobileComparison";
import { usePrefersReducedMotion } from "@/components/site/usePrefersReducedMotion";

vi.mock("@/components/site/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: vi.fn(),
}));

const mockedUsePrefersReducedMotion = vi.mocked(usePrefersReducedMotion);

describe("OncologyPairMobileComparison", () => {
  beforeEach(() => {
    mockedUsePrefersReducedMotion.mockReturnValue(false);
  });

  it("places both oncology views in one shared 4:3 art field", () => {
    const { container } = render(<OncologyPairMobileComparison />);

    const comparison = container.querySelector("[data-oncology-pair-mobile]");
    const artField = container.querySelector("[data-oncology-art-field]");

    expect(comparison).toHaveClass("sm:hidden");
    expect(artField).toHaveClass("aspect-[4/3]");
    expect(artField?.querySelectorAll("img")).toHaveLength(2);
    expect(
      Array.from(artField?.querySelectorAll("img") ?? [], (image) =>
        image.getAttribute("src"),
      ).join(" "),
    ).toContain("endo-311-localization-pair-v4");
    expect(
      Array.from(artField?.querySelectorAll("img") ?? [], (image) =>
        image.getAttribute("src"),
      ).join(" "),
    ).toContain("endo-995-intracellular-v4");
    expect(
      screen.getByText(/not clinical imaging, efficacy, or performance data/i),
    ).toBeInTheDocument();
  });

  it("exposes one selected program and updates the accessible panel", async () => {
    const user = userEvent.setup();
    render(<OncologyPairMobileComparison />);

    const tablist = screen.getByRole("tablist", {
      name: "Oncology program views",
    });
    const localizationTab = within(tablist).getByRole("tab", {
      name: /ENDO-311\s+Targeted localization/i,
    });
    const intracellularTab = within(tablist).getByRole("tab", {
      name: /ENDO-995\s+Intracellular target/i,
    });

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
    expect(localizationTab).toHaveAttribute("aria-selected", "true");
    expect(intracellularTab).toHaveAttribute("aria-selected", "false");
    expect(
      screen.getByRole("tabpanel", {
        name: /ENDO-311\s+Targeted localization/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /targeted imaging agent localizing around an intact solid-tumor focus/i,
      }),
    ).toBeInTheDocument();

    await user.click(intracellularTab);

    expect(localizationTab).toHaveAttribute("aria-selected", "false");
    expect(intracellularTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", {
        name: /ENDO-995\s+Intracellular target/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /cyclic peptide undergoing uptake into a tumor cell toward an intracellular target/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: /targeted imaging agent localizing around an intact solid-tumor focus/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps selection and roving focus together for arrow, Home, and End keys", async () => {
    const user = userEvent.setup();
    render(<OncologyPairMobileComparison />);

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    await user.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowLeft}");
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    expect(fireEvent.keyDown(tabs[0], { key: "ArrowDown" })).toBe(true);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("uses only composited transitions and removes them for reduced motion", () => {
    const { container, rerender } = render(
      <OncologyPairMobileComparison />,
    );

    const animatedElements = container.querySelectorAll(
      ".transition-\\[opacity\\,transform\\]",
    );
    expect(animatedElements.length).toBeGreaterThan(0);
    animatedElements.forEach((element) => {
      expect(element.className).not.toMatch(
        /transition-\[(?:width|height|padding|margin|top|left)/,
      );
    });

    mockedUsePrefersReducedMotion.mockReturnValue(true);
    rerender(<OncologyPairMobileComparison />);

    expect(
      container.querySelectorAll(".transition-\\[opacity\\,transform\\]"),
    ).toHaveLength(0);
    expect(
      container.querySelector("[data-oncology-art-field] img[aria-hidden='true']"),
    ).toHaveClass("scale-100");
  });
});
