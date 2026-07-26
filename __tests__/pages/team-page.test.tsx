import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPage from "@/app/team/page";
import {
  FOOTER_NAV,
  LEADERSHIP_TEAM,
  NAV_LINKS,
  TEAM,
} from "@/lib/site";

describe("TeamPage founder profile", () => {
  it("keeps the founder profile within the approved fact set", () => {
    render(<TeamPage />);

    // The founder must remain first and stay inside truth.md's fact set,
    // independent of how many officers and functional leads are published.
    expect(TEAM[0]).toMatchObject({
      name: "Dr. Tanya Petrossian, PhD",
      role: "Founder & CEO",
    });
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Dr. Tanya Petrossian, PhD",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Portrait of Dr. Tanya Petrossian, PhD",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Review the leadership brief" }),
    ).toHaveAttribute("href", "#tanya-petrossian");
    expect(
      screen.getByRole("region", {
        name: "From platform science to clinical entry.",
      }),
    ).toHaveAttribute("id", "tanya-petrossian");
    expect(document.getElementById("leadership-record")).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(document.getElementById("leadership-record")).toHaveClass(
      "outline-none",
    );
    expect(document.getElementById("leadership-record")).toHaveClass("grid");
    expect(document.getElementById("leadership-record")).not.toHaveClass(
      "scroll-mt-28",
    );
    expect(document.getElementById("leadership-record")).toHaveAttribute(
      "aria-labelledby",
      "diligence-record-title",
    );
    expect(
      screen.getByRole("region", {
        name: "A documented path into the clinic.",
      }),
    ).toHaveAttribute("id", "leadership-record");
    expect(
      screen
        .getByRole("region", {
          name: "A documented path into the clinic.",
        })
        .closest("section"),
    ).toHaveClass("overflow-clip");
  });

  it("publishes every functional lead with a portrait, role, and bio", () => {
    const { container } = render(<TeamPage />);

    expect(LEADERSHIP_TEAM.length).toBeGreaterThan(0);
    expect(TEAM).toHaveLength(LEADERSHIP_TEAM.length + 1);

    const region = container.querySelector("#leadership-team");
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-labelledby", "leadership-team-title");
    expect(region).toHaveAttribute("tabindex", "-1");

    // Every direct child of the roster list must be a list item.
    const roster = container.querySelector("#leadership-team ol");
    expect(roster).toBeInTheDocument();
    expect(
      Array.from(roster?.children ?? []).every(
        (child) => child.tagName === "LI",
      ),
    ).toBe(true);
    expect(roster?.children).toHaveLength(LEADERSHIP_TEAM.length);

    for (const member of LEADERSHIP_TEAM) {
      expect(
        screen.getByRole("heading", { level: 3, name: member.name }),
      ).toBeVisible();
      expect(
        screen.getByRole("img", { name: `Portrait of ${member.name}` }),
      ).toBeInTheDocument();
      expect(screen.getByText(member.bio)).toBeVisible();
    }

    // Frank Fernandez was removed on 2026-07-25: he does not appear on the
    // company's own team page and no independent record was found. Nothing
    // should reintroduce him without a verified source.
    expect(
      screen.queryByRole("heading", { level: 3, name: "Frank Fernandez" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Chief Financial Officer/)).not.toBeInTheDocument();
    expect(TEAM.some((member) => member.id === "frank")).toBe(false);
  });

  it("states Andrea Lukes' trial count at the evidenced figure", () => {
    render(<TeamPage />);

    const lukes = TEAM.find((member) => member.id === "andrea");
    // Public sources support "over 75 FDA approved clinical studies"; the
    // earlier "more than 90" figure was not corroborated anywhere.
    expect(lukes?.bio).toContain("more than 75");
    expect(lukes?.bio).not.toMatch(/more than 90|over 90/);
  });

  it("keeps every published leadership entry complete", () => {
    // Credentials here sit outside truth.md and were confirmed by the content
    // owner on 2026-07-25. Guard the shape so an entry cannot ship half-filled.
    for (const member of LEADERSHIP_TEAM) {
      expect(member.name.trim().length).toBeGreaterThan(0);
      expect(member.role.trim().length).toBeGreaterThan(0);
      expect(member.bio.trim().length).toBeGreaterThan(40);
      expect(member.image).toMatch(/^\/team\/.+\.avif$/);
      expect(member.linkedin).toMatch(/^https:\/\//);
    }
  });

  it("keeps prohibited and superseded regulatory language out of every bio", () => {
    for (const member of TEAM) {
      expect(member.bio).not.toMatch(/\bcures?\b/i);
      expect(member.bio).not.toMatch(/\bguaranteed\b/i);
      expect(member.bio).not.toMatch(/\bproven\b/i);
      // The approved term is "FDA IND Allowance", never "IND clearance".
      expect(member.bio).not.toMatch(/IND clearance/i);
    }
  });

  it("anchors the leadership brief in four approved source records", () => {
    const { container } = render(<TeamPage />);

    expect(screen.getAllByText("Founder & CEO").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: "A documented path into the clinic.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "EndoCyclic is a founding member of the Milken Institute Women’s Health Network.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Review the Milken Institute record, opens in a new tab",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Review the FDA IND announcement, opens in a new tab",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Read the 2017 UCLA founder profile, opens in a new tab",
      }),
    ).toHaveAttribute("href", expect.stringContaining("chemistry.ucla.edu"));
    expect(
      screen.getByRole("link", {
        name: "Review the NIH grant announcement, opens in a new tab",
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", {
        name: /opens in a new tab.*opens in a new tab/i,
      }),
    ).not.toBeInTheDocument();

    const leadershipList = container.querySelector("#leadership-record ul");
    expect(leadershipList).toBeInTheDocument();
    expect(
      Array.from(leadershipList?.children ?? []).every(
        (child) => child.tagName === "LI",
      ),
    ).toBe(true);
  });

  it("labels the public surface as Leadership without changing its stable route", () => {
    expect(NAV_LINKS).toContainEqual({
      name: "Leadership",
      href: "/team",
    });
    expect(FOOTER_NAV.Company).toContainEqual({
      name: "Leadership",
      href: "/team",
    });
  });

  it("gives the approved high-resolution portrait a balanced mobile field and its intended desktop width", () => {
    render(<TeamPage />);

    const portrait = screen.getByRole("img", {
      name: "Portrait of Dr. Tanya Petrossian, PhD",
    });
    const visualFrame = portrait.closest(".hero-visual-frame");

    expect(portrait).toHaveAttribute(
      "src",
      expect.stringContaining("tanya-petrossian-v2.avif"),
    );
    expect(portrait).toHaveAttribute(
      "sizes",
      "(min-width: 1024px) 290px, (min-width: 640px) 42vw, 78vw",
    );
    expect(portrait).toHaveClass(
      "object-cover",
      "object-top",
      "sm:object-contain",
      "sm:object-bottom",
    );
    expect(portrait.parentElement).toHaveClass(
      "inset-y-0",
      "w-[78%]",
      "sm:w-[42%]",
      "lg:w-[62%]",
    );
    expect(visualFrame).toHaveClass(
      "h-[21rem]",
      "sm:h-[22rem]",
      "lg:h-[23rem]",
    );
    expect(visualFrame).not.toHaveClass("min-h-[27rem]");
    expect(
      screen.getAllByRole("link", { name: "Discuss a partnership" }),
    ).toHaveLength(2);
  });
});
