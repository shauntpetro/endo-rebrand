import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InvestorsPage from "@/app/investors/InvestorsPageContent";
import { EVIDENCE_LINKS } from "@/lib/site";

describe("InvestorsPage", () => {
  it("presents a focused thesis and focusable diligence destinations", () => {
    render(<InvestorsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "ENDO-205: FDA IND Allowance. Phase 1.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "EndoCyclic is advancing a proprietary, non-hormonal precision peptide platform across four therapeutic and diagnostic programs in endometriosis and oncology.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A large unmet need, with a clinical-stage lead.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Current therapies are largely hormone-based and symptomatic; they do not eliminate lesions or modify disease biology.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("group", {
        name: "Fast Track: Filing underway",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("navigation", {
        name: "Investor diligence sections",
      }),
    ).toHaveClass("lg:col-start-6", "lg:row-start-1");

    for (const [name, id] of [
      [
        "From preclinical evidence to FDA IND Allowance and Phase 1.",
        "regulatory",
      ],
      ["One selective logic across four programs.", "platform"],
      [
        "Recognition and relationships around the platform.",
        "validation",
      ],
      ["Request the confidential data room.", "data-room"],
    ] as const) {
      const region = screen.getByRole("region", { name });
      expect(region).toHaveAttribute("id", id);
      expect(region).toHaveAttribute("tabindex", "-1");
      expect(region).toHaveClass("outline-none");
      expect(region).not.toHaveClass("scroll-mt-28");
    }
  });

  it("keeps the investor-summary download name concise and action-led", () => {
    const { container } = render(<InvestorsPage />);

    expect(screen.getByText("Public document")).toBeVisible();
    expect(screen.queryByText("Investor memo")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Investor summary",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("article", { name: "Investor summary" }),
    ).toBeVisible();
    const summaryLink = screen.getByText("Download summary (PDF)").closest("a");
    const diligenceNavigation = screen.getByRole("navigation", {
      name: "Investor diligence sections",
    });
    expect(summaryLink).not.toBeNull();
    expect(
      (summaryLink as HTMLElement).compareDocumentPosition(
        diligenceNavigation,
      ) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(summaryLink).toHaveAttribute(
      "href",
      "/downloads/endocyclic-investor-summary-v2.pdf",
    );
    expect(summaryLink).toHaveAccessibleName(
      "Download summary (PDF) 3 pages · PDF",
    );
    expect(summaryLink).not.toHaveAttribute("aria-label");

    const sections = container.querySelectorAll("main > section");
    expect(sections[1]).toContainElement(summaryLink);
    expect(
      screen.getByRole("article", { name: "Investor summary" }),
    ).toHaveClass(
      "grid-cols-[7rem_minmax(0,1fr)]",
      "sm:grid-cols-[9.5rem_1fr]",
      "lg:grid-cols-1",
    );
    expect(sections[2]).toHaveTextContent("Investment context");
  });

  it("links material market and disease-burden figures to their named sources", () => {
    render(<InvestorsPage />);

    expect(screen.getByRole("link", { name: /McKinsey estimate/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mckinsey.com"),
    );
    expect(screen.getByRole("link", { name: /^WHO/i })).toHaveAttribute(
      "href",
      "https://www.who.int/news-room/fact-sheets/detail/endometriosis",
    );
  });

  it("shows the evidence basis for institutional and company-reported validation", () => {
    render(<InvestorsPage />);

    const fdaAnnouncementLinks = screen.getAllByRole("link", {
      name: /Company reported · FDA IND Allowance announcement/i,
    });
    expect(fdaAnnouncementLinks.length).toBeGreaterThan(0);
    for (const link of fdaAnnouncementLinks) {
      expect(link).toHaveAttribute("href", EVIDENCE_LINKS.fdaAnnouncement);
    }
    expect(
      screen.getByRole("link", {
        name: /Institutional record · NIH source record/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.nihRadxChallenge);
    expect(
      screen.getByRole("link", {
        name: /Institutional record · Milken Institute Health/i,
      }),
    ).toHaveAttribute("href", EVIDENCE_LINKS.milkenNetworkRecord);

    const uclaItem = screen.getByText("UCLA partnership").closest("li");
    expect(uclaItem).not.toBeNull();
    expect(
      within(uclaItem as HTMLElement).getByText("Company reported"),
    ).toBeVisible();
  });
});
