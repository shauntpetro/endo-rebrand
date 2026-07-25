import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeEvidenceDossier from "@/components/figures/HomeEvidenceDossier";
import { EVIDENCE_LINKS, NEWS } from "@/lib/site";

describe("HomeEvidenceDossier", () => {
  it("separates the next regulatory path from sourced NIH recognition", () => {
    render(<HomeEvidenceDossier />);
    const fastTrackHeading = screen.getByRole("heading", {
      name: "Fast Track filing underway.",
    });
    const regulatoryPath = fastTrackHeading.closest("div");

    expect(
      within(regulatoryPath as HTMLElement).getByText("Company reported"),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: /Review the company grant announcement,\s*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", NEWS.find((article) => article.id === 1)?.link);
    expect(
      screen.queryByRole("heading", { name: "FDA IND Allowance" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /Read the company announcement,\s*opens in a new tab/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("distinguishes institutional records from company-reported evidence", () => {
    const { container } = render(<HomeEvidenceDossier />);

    const mobileDisclosure = container.querySelector(
      "[data-home-evidence-mobile]",
    );
    const desktopEvidence = container.querySelector(
      "[data-home-evidence-desktop]",
    );
    const summary = within(mobileDisclosure as HTMLElement)
      .getByText(/Additional validation & institutional relationships/i)
      .closest("summary");
    const disclosure = summary?.closest("details");

    expect(mobileDisclosure).toHaveClass("md:hidden");
    expect(disclosure).not.toHaveAttribute("open");
    expect(summary).toHaveClass("min-h-14");
    fireEvent.click(summary as HTMLElement);
    expect(disclosure).toHaveAttribute("open");

    expect(
      within(mobileDisclosure as HTMLElement).getByRole("link", {
        name: /Institutional record · Archival NIH SEED profile,\s*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.nihPortfolio);
    expect(
      within(mobileDisclosure as HTMLElement).getByText(
        "Funding & archival portfolio record",
      ),
    ).toBeVisible();
    expect(
      within(mobileDisclosure as HTMLElement).getByRole("link", {
        name: /Institutional record · NIH portfolio company profile,\s*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.nihPortfolio);
    expect(
      within(mobileDisclosure as HTMLElement).getByRole("link", {
        name: /Company reported · NICHD awards announcement,\s*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.fdaAnnouncement);

    expect(desktopEvidence).toHaveClass(
      "hidden",
      "border-t",
      "md:grid",
      "md:grid-cols-12",
    );
    expect(desktopEvidence?.closest("details")).toBeNull();
    expect(desktopEvidence).toHaveAttribute(
      "aria-labelledby",
      "home-evidence-supporting-title",
    );
    expect(
      within(desktopEvidence as HTMLElement).getByRole("link", {
        name: /Institutional record · Archival NIH SEED profile,\s*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.nihPortfolio);

    const uclaRelationship = within(desktopEvidence as HTMLElement)
      .getByText("UCLA")
      .closest("li");
    expect(uclaRelationship).not.toBeNull();
    expect(
      within(uclaRelationship as HTMLElement).getByText("Company reported"),
    ).toBeVisible();

    expect(
      screen.getByText(/Logos identify named relationships and records/i),
    ).toBeVisible();
  });
});
