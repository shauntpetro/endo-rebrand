import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "@/app/not-found";

describe("NotFound", () => {
  it("offers clear branded recovery routes without indexing the error page", () => {
    const { container } = render(<NotFound />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This page couldn’t be found.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(container.querySelector("main#main-content")).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });
});
