import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";

describe("HomeNewsMedia", () => {
  it("keeps the sourced recognition archive and media kit directly discoverable", () => {
    render(<HomeNewsMedia />);

    expect(
      screen.getByRole("link", { name: /review sourced recognition/i }),
    ).toHaveAttribute("href", "/news");
    expect(
      screen.getByRole("link", { name: /open press resources/i }),
    ).toHaveAttribute("href", "/media");
    expect(
      screen.getByRole("link", { name: /rare NIH ‘Perfect 10’ for ENDO-205/i }),
    ).toHaveAttribute("target", "_blank");
  });

  it("identifies the featured item as a company release and leaves later chronology to the archive", () => {
    render(<HomeNewsMedia />);

    expect(screen.getByText("Company press release")).toBeInTheDocument();
    expect(
      screen.getByText(/EndoCyclic Therapeutics · Hosted by BioSpace/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /read the company announcement/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("biospace.com/press-releases"));
    expect(
      screen.getByRole("link", {
        name: /EndoCyclic Therapeutics Featured in the NIH Portfolio Company Showcase/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /UCLA Alumni News Profiles Dr. Tanya Petrossian/i,
      }),
    ).not.toBeInTheDocument();
  });
});
