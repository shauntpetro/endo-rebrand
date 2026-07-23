import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";

describe("HomeNewsMedia", () => {
  it("keeps both the news archive and media kit directly discoverable", () => {
    render(<HomeNewsMedia />);

    expect(screen.getByRole("link", { name: /view all news/i })).toHaveAttribute(
      "href",
      "/news",
    );
    expect(
      screen.getByRole("link", { name: /open press resources/i }),
    ).toHaveAttribute("href", "/media");
    expect(
      screen.getByRole("link", { name: /rare NIH “Perfect 10” for ENDO-205/i }),
    ).toHaveAttribute("target", "_blank");
  });
});
