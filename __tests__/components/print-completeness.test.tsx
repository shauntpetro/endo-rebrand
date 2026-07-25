import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Endo205ImpactTranslation from "@/components/figures/Endo205ImpactTranslation";
import FemLunaConceptComparison from "@/components/figures/FemLunaConceptComparison";
import HomePortfolioField from "@/components/figures/HomePortfolioField";
import SelectiveSequence from "@/components/figures/SelectiveSequence";
import { PIPELINE, PLATFORM_MECHANISM_STEPS } from "@/lib/site";

const STEPS = PLATFORM_MECHANISM_STEPS;

const readPrintBlock = (path: string) => {
  const css = readFileSync(resolve(process.cwd(), path), "utf8");
  const printStart = css.lastIndexOf("@media print");

  expect(printStart).toBeGreaterThanOrEqual(0);
  return css.slice(printStart);
};

describe("print-complete scientific figures", () => {
  it("prints the complete four-program portfolio instead of one active tab", () => {
    const { container } = render(<HomePortfolioField />);
    const printPortfolio = container.querySelector<HTMLElement>(
      "[data-home-portfolio-print]",
    );

    expect(printPortfolio).not.toBeNull();
    expect(printPortfolio).toHaveClass("hidden", "print:block");

    const programLinks = within(printPortfolio as HTMLElement).getAllByRole(
      "link",
    );
    expect(programLinks).toHaveLength(PIPELINE.length);

    for (const program of PIPELINE) {
      expect(
        within(printPortfolio as HTMLElement).getByText(program.name),
      ).toBeInTheDocument();
    }

    const printCss = readPrintBlock("app/globals.css");
    expect(printCss).toMatch(
      /\[data-home-portfolio-enhanced\],[\s\S]*?display:\s*none\s*!important/,
    );
    expect(printCss).toMatch(
      /\[data-home-portfolio-print\],[\s\S]*?display:\s*block\s*!important/,
    );
  });

  it("prints both static FemLUNA views instead of the clipped comparator", () => {
    const { container } = render(<FemLunaConceptComparison />);
    const interactiveComparison = container.querySelector(
      "[data-femluna-comparison-interactive]",
    );
    const staticComparison = container.querySelector<HTMLElement>(
      "[data-femluna-comparison-static]",
    );

    expect(interactiveComparison).not.toBeNull();
    expect(staticComparison).not.toBeNull();
    expect(staticComparison).toHaveClass("hidden", "motion-reduce:block");
    expect(
      within(staticComparison as HTMLElement).getByText(
        "Current imaging can miss small lesions.",
      ),
    ).toBeInTheDocument();
    expect(
      within(staticComparison as HTMLElement).getByText(
        "A targeted agent is designed to distinguish the lesion.",
      ),
    ).toBeInTheDocument();
    expect(
      within(staticComparison as HTMLElement).getAllByRole("img"),
    ).toHaveLength(2);

    const printCss = readPrintBlock("app/globals.css");
    expect(printCss).toMatch(
      /\[data-femluna-comparison-interactive\]\s*\{[\s\S]*?display:\s*none\s*!important/,
    );
    expect(printCss).toMatch(
      /\[data-femluna-comparison-static\]\s*\{[\s\S]*?display:\s*block\s*!important/,
    );
    expect(printCss).toMatch(
      /\[data-femluna-static-grid\]\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)\s*!important/,
    );
    expect(printCss).toMatch(
      /\[data-femluna-detection-logic\]\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)\s*!important/,
    );
  });

  it("reveals every animated ENDO-205 translation layer and permits page flow", () => {
    const { container } = render(<Endo205ImpactTranslation />);
    const figure = container.querySelector<HTMLElement>(
      "[data-endo205-impact-translation]",
    );

    expect(figure).not.toBeNull();
    expect(figure?.querySelector("[data-endo205-visual]")).not.toBeNull();
    expect(figure?.querySelector("[data-endo205-image]")).not.toBeNull();
    expect(figure?.querySelector("[data-endo205-route]")).not.toBeNull();
    expect(figure?.querySelectorAll("[data-endo205-copy]")).toHaveLength(4);
    expect(figure?.querySelector("[data-endo205-proof]")).not.toBeNull();
    expect(within(figure as HTMLElement).getByText("Phase 1")).toBeInTheDocument();
    expect(
      within(figure as HTMLElement).getByText("FDA IND Allowance · 2026"),
    ).toBeInTheDocument();
    expect(
      within(figure as HTMLElement).getByText(/GLP toxicology studies/i),
    ).toBeInTheDocument();

    const printCss = readPrintBlock("app/globals.css");

    for (const selector of [
      "[data-endo205-visual]",
      "[data-endo205-image]",
      "[data-endo205-route]",
      "[data-endo205-copy]",
      "[data-endo205-proof]",
    ]) {
      expect(printCss).toContain(selector);
    }
    expect(printCss).toMatch(/opacity:\s*1\s*!important/);
    expect(printCss).toMatch(/transform:\s*none\s*!important/);
    expect(printCss).toMatch(/clip-path:\s*none\s*!important/);
    expect(printCss).toMatch(
      /\[data-endo205-impact-translation\]\s*\{[\s\S]*?break-inside:\s*auto\s*!important/,
    );
    expect(printCss).toMatch(
      /html body \[data-tone\],[\s\S]*?html body \[data-tone\] \*[\s\S]*?color:\s*#111\s*!important;[\s\S]*?-webkit-text-fill-color:\s*#111\s*!important/,
    );
  });

  it("prints the sticky mechanism as one complete ordered four-stage sequence", () => {
    render(<SelectiveSequence steps={STEPS} />);

    const completeSequence = screen.getByRole("list", {
      name: "Complete platform-to-evidence sequence",
    });
    expect(within(completeSequence).getAllByRole("listitem")).toHaveLength(4);
    for (const step of STEPS) {
      expect(within(completeSequence).getByText(step.title)).toBeInTheDocument();
      expect(within(completeSequence).getByText(step.body)).toBeInTheDocument();
    }

    const printCss = readPrintBlock(
      "components/figures/SelectiveSequence.module.css",
    );

    expect(printCss).toMatch(
      /\.enhancedSequence\s*\{\s*display:\s*none\s*!important/,
    );
    expect(printCss).toMatch(
      /\.staticSequence\s*\{[\s\S]*?display:\s*block\s*!important/,
    );
    expect(printCss).toMatch(
      /\.sticky\s*\{[\s\S]*?position:\s*static\s*!important[\s\S]*?break-inside:\s*auto\s*!important/,
    );
    expect(printCss).toMatch(
      /\.track,[\s\S]*?\.scrollHint\s*\{\s*display:\s*none\s*!important/,
    );
    expect(printCss).toMatch(
      /\.staticSequence li\s*\{\s*break-inside:\s*avoid-page/,
    );
  });
});
