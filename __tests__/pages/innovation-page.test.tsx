import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InnovationPage from "@/app/innovation/page";

describe("InnovationPage", () => {
  it("presents one truth-qualified four-stage mechanism sequence", () => {
    render(<InnovationPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Three platform stages. One ENDO-205 preclinical result/i,
      }),
    ).toBeInTheDocument();

    const tablist = screen.getByRole("tablist", {
      name: "Platform stages and ENDO-205 evidence",
    });
    expect(within(tablist).getAllByRole("tab")).toHaveLength(4);
    expect(
      within(tablist).getByRole("tab", {
        name: /04\s*Evidence\s*Preclinical lesion elimination/i,
      }),
    ).toBeInTheDocument();

    const completeSequence = screen.getByRole("list", {
      name: "Complete platform-to-evidence sequence",
    });
    expect(within(completeSequence).getAllByRole("listitem")).toHaveLength(4);
    expect(
      screen.getAllByText(/ENDO-205 preclinical lesion and inflammation findings/i),
    ).not.toHaveLength(0);
  });

  it("uses a dedicated target-clearance hero and keeps the four-stage art in both mechanism states", () => {
    render(<InnovationPage />);

    const hero = screen.getByAltText(
      /Conceptual close-up of an intact EndoCyclic peptide remaining visible within diseased tissue/i,
    );
    expect(hero).toHaveAttribute(
      "src",
      expect.stringContaining("innovation-target-clearance-v2"),
    );
    expect(hero.parentElement?.querySelector("source")).toHaveAttribute(
      "srcset",
      expect.stringContaining("innovation-target-clearance-mobile-v2"),
    );

    const sequenceImages = screen.getAllByAltText(
      /Conceptual four-stage illustration of an intact EndoCyclic peptide localizing to diseased tissue/i,
    );
    expect(sequenceImages).toHaveLength(2);
    sequenceImages.forEach((image) => {
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining("selective-mechanism-v11"),
      );
    });

    expect(
      screen.getByAltText(
        /Conceptual illustration showing selective uptake and pH-mediated activation with an intact peptide remaining visible within diseased tissue/i,
      ),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("endo-205-clinical-translation-v7"),
    );
  });
});
