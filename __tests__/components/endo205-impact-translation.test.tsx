import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Endo205ImpactTranslation from "@/components/figures/Endo205ImpactTranslation";
import { ENDO205_MECHANISM_ALT } from "@/lib/site";

describe("Endo205ImpactTranslation", () => {
  it("shows the approved mechanism before the separately qualified preclinical lesion-elimination state", () => {
    const { container } = render(<Endo205ImpactTranslation />);
    const media = container.querySelector("[data-endo205-media]");
    const image = screen.getByRole("img", {
      name: ENDO205_MECHANISM_ALT,
    });

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("endo-205-translation-v6"),
    );
    expect(media).toHaveTextContent(
      "Conceptual selective uptake and pH-mediated activation keep the intact peptide visible within diseased tissue.",
    );
    expect(media).toHaveTextContent(
      "A separate final state represents the ENDO-205 preclinical lesion-elimination finding",
    );
  });

  it("stays stacked through tablet and introduces the split at the desktop breakpoint", () => {
    const { container } = render(<Endo205ImpactTranslation />);
    const layout = container.querySelector("[data-endo205-layout]");
    const media = container.querySelector("[data-endo205-media]");
    const darkPanel = container.querySelector('[data-tone="dark"]');
    const proof = container.querySelector("[data-endo205-proof]");
    const image = screen.getByRole("img", {
      name: ENDO205_MECHANISM_ALT,
    });

    expect(layout).toHaveClass("lg:grid-cols-12");
    expect(layout).not.toHaveClass("md:grid-cols-12");
    expect(media).toHaveClass("lg:col-span-7");
    expect(media).not.toHaveClass("md:col-span-7");
    expect(darkPanel).toHaveClass(
      "lg:col-span-5",
      "lg:border-l",
      "lg:border-t-0",
    );
    expect(darkPanel).not.toHaveClass(
      "md:col-span-5",
      "md:border-l",
      "md:border-t-0",
    );
    expect(proof).toHaveClass("lg:grid-cols-12");
    expect(proof).not.toHaveClass("md:grid-cols-12");
    expect(image).toHaveAttribute(
      "sizes",
      "(min-width: 1184px) 740px, (min-width: 1024px) 60vw, 100vw",
    );
  });
});
