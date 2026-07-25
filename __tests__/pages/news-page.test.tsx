import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewsPage from "@/app/news/page";

describe("NewsPage", () => {
  it("leads with the current FDA milestone while preserving independent NIH coverage", () => {
    const { container } = render(<NewsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /FDA IND Allowance advances ENDO-205 into Phase 1/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: /read the company announcement/i })
        .some((link) =>
          link.getAttribute("href")?.includes("prnewswire.com/news-releases"),
        ),
    ).toBe(true);
    const independentCoverage = screen.getByRole("link", {
      name: /BioWorld.*independent coverage.*subscriber preview/i,
    });
    expect(independentCoverage).toHaveAttribute(
      "href",
      expect.stringContaining("bioworld.com"),
    );
    expect(independentCoverage).toHaveClass(
      "min-w-0",
      "max-w-full",
    );
    expect(independentCoverage.firstElementChild).toHaveClass("min-w-0");
    expect(
      screen.getByText(/EndoCyclic Therapeutics · Hosted by BioSpace/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /UCLA Alumni class note · UCLA Alumni/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("alumni.ucla.edu"));
    expect(
      screen.getByRole("link", { name: "Review investor diligence" }),
    ).toHaveAttribute("href", "/investors");
    expect(
      screen.getByRole("heading", {
        name: "Move from the current milestone to the next diligence step.",
      }),
    ).toBeVisible();
    expect(screen.getByText("View UCLA class note")).toBeVisible();
    expect(
      screen.queryAllByRole("link", {
        name: /opens in a new tab.*opens in a new tab/i,
      }),
    ).toHaveLength(0);

    const featuredAnnouncement = screen
      .getAllByRole("link", { name: /read the company announcement/i })
      .find((link) =>
        link.getAttribute("href")?.includes("prnewswire.com/news-releases"),
      );
    expect(featuredAnnouncement).toHaveAccessibleName(
      "Read the company announcement, opens in a new tab",
    );

    const heroImage = container.querySelector(
      'img[src*="news-regulatory-threshold-v2"]',
    );
    const heroVisual = screen.getByRole("img", {
      name: /ENDO-205 regulatory milestone/i,
    });
    const artField = heroVisual.querySelector("[data-news-threshold-art]");
    const milestoneRail = heroVisual.querySelector(
      "[data-news-milestone-rail]",
    );

    expect(heroImage).toHaveAttribute("fetchpriority", "high");
    expect(heroImage).not.toHaveAttribute("loading", "lazy");
    expect(artField).toBeInTheDocument();
    expect(milestoneRail).toHaveClass("min-h-24", "grid-cols-2");
    expect(within(heroVisual).getByText("Regulatory threshold")).toBeVisible();
    expect(within(heroVisual).getByText("Clinical development")).toBeVisible();
    expect(within(heroVisual).queryByText("FDA IND")).not.toBeInTheDocument();
  });

  it("surfaces the current FDA milestone without assigning a false date to the archival NIH profile", () => {
    render(<NewsPage />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /An NIH ‘Perfect 10’ recognition/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /An NIH ‘Perfect 10’ recognition.*opens in a new tab/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("biospace.com"));
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /An archival NIH portfolio company profile/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mar 23, 2026").closest("time")).toHaveAttribute(
      "datetime",
      "2026-03-23",
    );
    expect(screen.getByText("Archival profile").closest("time")).toBeNull();
    expect(
      screen.getByText(/reflects historical program naming/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Current milestone")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", {
        name: /read the company announcement/i,
      }).some((link) =>
        link.getAttribute("href")?.includes("prnewswire.com/news-releases"),
      ),
    ).toBe(true);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Company announcements, awards, and profiles/i,
      }),
    ).toBeInTheDocument();
  });

  it("limits hover motion to actionable news links", () => {
    const { container } = render(<NewsPage />);

    const firstArchiveRow = container.querySelector("ol > li article");
    const eventMark = firstArchiveRow?.querySelector("img")?.parentElement;
    const primaryTitleLink = firstArchiveRow?.querySelector("h3 a");

    expect(firstArchiveRow).not.toHaveClass("group");
    expect(eventMark?.className).not.toContain("group-hover");
    expect(primaryTitleLink).toHaveClass("group/story");
    expect(primaryTitleLink).toHaveClass("inline-flex", "min-h-11", "items-center");
    expect(primaryTitleLink?.querySelector("span")?.className).toContain(
      "group-hover/story",
    );
  });
});
