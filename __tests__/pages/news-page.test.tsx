import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewsPage from "@/app/news/page";

describe("NewsPage", () => {
  it("distinguishes the company announcement from independent coverage", () => {
    render(<NewsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /rare NIH ‘Perfect 10’ for ENDO-205/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read the company announcement/i }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("biospace.com/press-releases"),
    );
    expect(
      screen.getByRole("link", {
        name: /independent coverage · BioWorld/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("bioworld.com"));
    expect(
      screen.getByText(/EndoCyclic Therapeutics · Hosted by BioSpace/i),
    ).toBeInTheDocument();
  });
});
