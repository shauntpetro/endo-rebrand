import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CareGapShift from "@/components/figures/CareGapShift";

describe("CareGapShift", () => {
  it("uses one accessible, switchable visual field on phone-sized layouts", async () => {
    const user = userEvent.setup();
    render(<CareGapShift />);

    const tablist = screen.getByRole("tablist", {
      name: "Care-path views",
    });
    const currentTab = within(tablist).getByRole("tab", {
      name: "Current path",
    });
    const selectiveTab = within(tablist).getByRole("tab", {
      name: "Selective path",
    });
    const mobileComparison = tablist.closest("[data-care-gap-mobile]");

    expect(mobileComparison).toHaveClass("sm:hidden");
    expect(mobileComparison).not.toHaveAttribute("aria-label");
    expect(currentTab).toHaveAttribute("aria-selected", "true");
    expect(selectiveTab).toHaveAttribute("aria-selected", "false");

    const panel = screen.getByRole("tabpanel", { name: "Current path" });
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toHaveClass("focus-visible:outline-2");
    expect(panel.querySelectorAll("img")).toHaveLength(1);
    panel.querySelectorAll("img").forEach((image) => {
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("aria-hidden", "true");
    });
    expect(
      Array.from(panel.querySelectorAll("img"), (image) =>
        image.getAttribute("src"),
    ).join(" "),
    ).toContain("care-gap-current-path-mobile-v1");
    expect(
      Array.from(panel.querySelectorAll("img"), (image) =>
        image.getAttribute("src"),
      ).join(" "),
    ).not.toContain("care-gap-selective-path-mobile-v6");
    expect(panel).toHaveTextContent(
      "Conceptual lesion surrounded by a repeating symptom-management loop.",
    );
    panel.focus();
    expect(panel).toHaveFocus();

    await user.click(selectiveTab);

    expect(currentTab).toHaveAttribute("aria-selected", "false");
    expect(selectiveTab).toHaveAttribute("aria-selected", "true");
    const selectivePanel = screen.getByRole("tabpanel", {
      name: "Selective path",
    });
    expect(selectivePanel).toHaveTextContent(
      "Conceptual selective-uptake and pH-activation sequence with an intact peptide remaining visible within diseased tissue, followed by a separate state in which the same lesion recedes to represent the ENDO-205 preclinical lesion-elimination finding.",
    );
    expect(selectivePanel.querySelectorAll("img")).toHaveLength(1);
    expect(selectivePanel.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("care-gap-selective-path-mobile-v6"),
    );

    await user.keyboard("{ArrowLeft}");

    expect(currentTab).toHaveFocus();
    expect(currentTab).toHaveAttribute("aria-selected", "true");
  });

  it("keeps both comparison paths legible on small screens without losing the full desktop visual", () => {
    render(<CareGapShift />);

    const mobileCurrentImage = screen.getByAltText(
      "Conceptual lesion surrounded by a repeating symptom-management loop.",
    );
    const mobileGrid = mobileCurrentImage.parentElement?.parentElement;

    expect(mobileGrid).toHaveClass("md:hidden");
    expect(
      within(mobileGrid as HTMLElement).getByText("Current path"),
    ).toBeInTheDocument();
    expect(
      within(mobileGrid as HTMLElement).getByText("Selective path"),
    ).toBeInTheDocument();
    expect(
      mobileCurrentImage,
    ).toHaveAttribute(
      "src",
      expect.stringContaining("care-gap-current-path-mobile-v1"),
    );
    expect(
      screen.getByAltText(
        "Conceptual selective-uptake and pH-activation sequence with an intact peptide remaining visible within diseased tissue, followed by a separate state in which the same lesion recedes to represent the ENDO-205 preclinical lesion-elimination finding.",
      ),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("care-gap-selective-path-mobile-v6"),
    );

    const desktopVisual = screen.getByAltText(
      /persistent lesion in a repeating symptom-management loop beside selective uptake and pH-mediated activation/i,
    );
    expect(desktopVisual).toHaveAttribute(
      "src",
      expect.stringContaining("care-gap-selective-shift-v7"),
    );
    expect(desktopVisual.parentElement).toHaveClass("hidden", "md:block");
    expect(
      within(desktopVisual.parentElement as HTMLElement).getByText(
        "Current path",
      ),
    ).toBeInTheDocument();
    expect(
      within(desktopVisual.parentElement as HTMLElement).getByText(
        "Selective path",
      ),
    ).toBeInTheDocument();
  });

  it("pairs the visual comparison with approved pathway evidence and a conceptual-use disclaimer", () => {
    render(<CareGapShift />);

    const currentSection = screen.getByText("Current therapies").parentElement;
    const platformSection = screen.getByText(
      "Disease-directed path",
    ).parentElement;

    expect(currentSection).not.toBeNull();
    expect(platformSection).not.toBeNull();
    expect(
      within(currentSection as HTMLElement).getByText("Hormone-based"),
    ).toBeInTheDocument();
    expect(
      within(currentSection as HTMLElement).getByText(
        "Does not eliminate lesions",
      ),
    ).toBeInTheDocument();
    expect(
      within(platformSection as HTMLElement).getByText(
        "pH-mediated activation",
      ),
    ).toBeInTheDocument();
    expect(
      within(platformSection as HTMLElement).getByText("Selective uptake"),
    ).toBeInTheDocument();
    expect(
      within(platformSection as HTMLElement).getByText(
        "Non-hormonal",
      ),
    ).toBeInTheDocument();
    expect(
      within(platformSection as HTMLElement).getByText(
        "Preclinical lesion elimination",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not clinical outcome data/i),
    ).toBeInTheDocument();
  });
});
