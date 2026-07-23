import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HomePortfolioField from "@/components/figures/HomePortfolioField";
import { PHASES, PIPELINE } from "@/lib/site";

describe("HomePortfolioField", () => {
  it("keeps every program discoverable in the program index", () => {
    render(<HomePortfolioField />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(PIPELINE.length);

    for (const program of PIPELINE) {
      expect(
        screen.getByRole("tab", { name: new RegExp(program.name.replace("™", ""), "i") }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText("01 / 04")).toBeInTheDocument();
  });

  it("retains the full six-stage development context on small screens", () => {
    render(<HomePortfolioField />);

    const phaseList = screen.getByRole("list", {
      name: /development phases for ENDO-205/i,
    });
    expect(within(phaseList).getAllByRole("listitem")).toHaveLength(PHASES.length);

    for (const phase of PHASES) {
      expect(within(phaseList).getByText(phase)).toBeInTheDocument();
    }
  });

  it("updates the active program, detail, and mobile phase context", async () => {
    const user = userEvent.setup();
    render(<HomePortfolioField />);

    const femLunaTab = screen.getByRole("tab", { name: /FemLUNA/i });
    await user.click(femLunaTab);

    expect(femLunaTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("02 / 04")).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /development phases for FemLUNA/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open program brief/i })).toHaveAttribute(
      "href",
      "/pipeline#femluna",
    );
  });
});
