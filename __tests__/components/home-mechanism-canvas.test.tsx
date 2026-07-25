import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeMechanismCanvas from "@/components/figures/HomeMechanismCanvas";

describe("HomeMechanismCanvas", () => {
  it("keeps one readable annotation rail outside the scientific artwork", () => {
    const { container } = render(<HomeMechanismCanvas />);
    const desktop = container.querySelector(
      "[data-home-mechanism-desktop]",
    );
    const image = desktop?.querySelector("[data-mechanism-image]");
    const callouts = image?.querySelectorAll("[data-mechanism-callout]");
    const rail = desktop?.querySelector("[data-mechanism-rail]");
    const railItems = rail?.querySelectorAll(":scope > [data-mechanism-label]");

    expect(desktop).toBeInTheDocument();
    expect(callouts).toHaveLength(0);
    expect(image?.querySelector("[data-mechanism-hotspot]")).toBeNull();
    expect(rail).toHaveAccessibleName(
      "Four-part platform and ENDO-205 evidence sequence",
    );
    expect(railItems).toHaveLength(4);
    expect(rail).toHaveTextContent("Diseased tissue selectivity");
    expect(rail).toHaveTextContent("Selective uptake");
    expect(rail).toHaveTextContent("pH-mediated activation");
    expect(rail).toHaveTextContent("Preclinical lesion elimination");
    expect(
      image?.querySelector('img[src*="selective-mechanism-v11"]'),
    ).toBeInTheDocument();
  });

  it("shows pH activation before the illustrated target and separately qualified lesion-elimination evidence on mobile", () => {
    const { container } = render(<HomeMechanismCanvas />);
    const escape = container.querySelector("[data-mobile-mechanism-escape]");
    const clearance = container.querySelector(
      "[data-mobile-mechanism-clearance]",
    );

    expect(escape).toBeInTheDocument();
    expect(escape?.querySelector("[data-opened-endosome]")).toBeInTheDocument();
    expect(
      escape?.querySelector(
        "[data-escaping-peptide] [data-canonical-peptide][data-residues='13']",
      ),
    ).toBeInTheDocument();
    expect(clearance).toBeInTheDocument();
    expect(
      clearance?.querySelector("[data-intracellular-target]"),
    ).toBeInTheDocument();
    expect(
      clearance?.querySelector(
        "[data-target-engagement] [data-canonical-peptide][data-residues='13']",
      ),
    ).toBeInTheDocument();
    const clearanceSequence = clearance?.querySelectorAll(
      "[data-target-engagement], [data-clearance-fragment]",
    );
    expect(clearanceSequence).toHaveLength(4);
    expect(clearanceSequence?.[0]).toHaveAttribute("data-target-engagement");

    const rings = container.querySelectorAll("[data-canonical-peptide]");
    expect(rings).toHaveLength(4);
    rings.forEach((ring) => {
      expect(ring).toHaveAttribute("data-residues", "13");

      const beads = Array.from(
        ring.querySelectorAll<SVGCircleElement>("[data-peptide-bead]"),
      );
      const beadColors = beads.map((bead) =>
        bead.getAttribute("data-bead-color"),
      );
      const canonicalClockwiseOrder = [
        "#E89A16",
        "#B8AA9B",
        "#B8AA9B",
        "#B8AA9B",
        "#B8AA9B",
        "#B8AA9B",
        "#6F38B5",
        "#6F38B5",
        "#6F38B5",
        "#E89A16",
        "#E89A16",
        "#E89A16",
        "#B8AA9B",
      ];

      expect(beads).toHaveLength(13);
      expect(
        beads.map((bead) => bead.getAttribute("data-peptide-bead")),
      ).toEqual(Array.from({ length: 13 }, (_, index) => String(index)));
      expect(beadColors).toEqual(canonicalClockwiseOrder);
      expect(beadColors.filter((color) => color === "#E89A16")).toHaveLength(4);
      expect(beadColors.filter((color) => color === "#B8AA9B")).toHaveLength(6);
      expect(beadColors.filter((color) => color === "#6F38B5")).toHaveLength(3);
    });
  });
});
