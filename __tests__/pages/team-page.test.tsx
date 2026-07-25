import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPage from "@/app/team/page";
import { FOOTER_NAV, NAV_LINKS, TEAM } from "@/lib/site";

describe("TeamPage founder profile", () => {
  it("keeps the public leadership profile within the approved fact set", () => {
    const { container } = render(<TeamPage />);

    expect(TEAM).toHaveLength(1);
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
    expect(container.querySelector("#development-team")).not.toBeInTheDocument();
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

  it("labels the one-person public surface as Leadership without changing its stable route", () => {
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
