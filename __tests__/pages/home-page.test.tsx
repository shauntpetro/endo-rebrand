import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("gives the mobile LCP hero image an explicit high fetch priority", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByAltText(
        /Conceptual platform illustration of selective uptake through an endocytic pathway and pH-mediated activation/i,
      ),
    ).toHaveAttribute("fetchpriority", "high");
    const heroImage = screen.getByAltText(
      /Conceptual platform illustration of selective uptake through an endocytic pathway and pH-mediated activation/i,
    );
    expect(heroImage).toHaveAttribute(
      "src",
      expect.stringContaining("hero-home-v8"),
    );
    expect(heroImage.parentElement?.querySelector("source")).toHaveAttribute(
      "srcset",
      expect.stringContaining("hero-home-mobile-v8"),
    );
    expect(container.querySelector("main#main-content")).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(container.querySelector("[data-home-mobile-thread]")).toHaveClass(
      "md:hidden",
      "bg-gradient-to-b",
    );
    expect(container.querySelector("[data-home-narrative-thread]")).toHaveClass(
      "hidden",
      "md:block",
    );
    const activeThread = container.querySelector<HTMLElement>(
      "[data-home-thread-active]",
    );
    const traveler = container.querySelector<HTMLElement>(
      "[data-home-thread-traveler]",
    );
    expect(traveler).toBeInTheDocument();
    expect(activeThread).not.toContainElement(traveler);
  });

  it("lands every partnership action directly on the inquiry form", () => {
    const { container } = render(<HomePage />);

    const links = screen.getAllByRole("link", {
      name: "Discuss a partnership",
    });
    expect(links).toHaveLength(2);
    expect(
      links.every(
        (link) =>
          link.getAttribute("href") ===
          "/contact?subject=partnership#contact-form",
      ),
    ).toBe(true);
    expect(container.querySelector("[data-home-founder-closing]")).toHaveClass(
      "min-w-0",
      "max-w-full",
      "flex-wrap",
      "gap-4",
      "md:col-span-6",
      "lg:col-span-5",
    );
    expect(
      container.querySelector("[data-home-founder-closing] figcaption"),
    ).toHaveClass("min-w-[7.5rem]", "flex-1");
  });

  it("presents clinical entry as a balanced proof ledger", () => {
    const { container } = render(<HomePage />);
    const proof = container.querySelector("[data-hero-proof]");

    expect(proof).toHaveTextContent("Clinical threshold");
    expect(proof).toHaveTextContent("ENDO-205");
    expect(proof).toHaveTextContent("FDA IND Allowance");
    expect(proof).toHaveTextContent("2026");
    expect(proof).toHaveTextContent("Phase 1");
    expect(proof).toHaveTextContent("Regulatory");
    expect(proof).toHaveTextContent("Current stage");
    expect(proof).toHaveClass("grid", "border-y");
    expect(proof?.querySelectorAll("dl > div")).toHaveLength(2);
  });

  it("lets each homepage chapter advance beyond the hero milestone", () => {
    render(<HomePage />);

    expect(
      screen.getByText(
        /across therapeutic and diagnostic programs in endometriosis and oncology/i,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        /an endometriosis therapeutic and targeted imaging agent with a matched oncology therapeutic and companion diagnostic/i,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Beyond the development-stage label.",
      }),
    ).toBeVisible();
    expect(
      screen.queryByText(/beginning with ENDO-205 for endometriosis, now in Phase 1/i),
    ).not.toBeInTheDocument();
  });
});
