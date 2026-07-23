import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "@/components/site/Button";

describe("Button", () => {
  it("anchors subject-specific internal contact links to the form", () => {
    render(<Button href="/contact?subject=media">Contact media relations</Button>);

    expect(
      screen.getByRole("link", { name: "Contact media relations" }),
    ).toHaveAttribute("href", "/contact?subject=media#contact-form");
  });

  it("preserves hashes and unrelated internal links", () => {
    const { rerender } = render(
      <Button href="/contact?subject=investor#contact-form">Investor contact</Button>,
    );

    expect(screen.getByRole("link", { name: "Investor contact" })).toHaveAttribute(
      "href",
      "/contact?subject=investor#contact-form",
    );

    rerender(<Button href="/pipeline#endo-205">View pipeline</Button>);

    expect(screen.getByRole("link", { name: "View pipeline" })).toHaveAttribute(
      "href",
      "/pipeline#endo-205",
    );
  });

  it("does not rewrite links rendered through the external branch", () => {
    render(
      <Button href="/contact?subject=media" external>
        External contact link
      </Button>,
    );

    expect(
      screen.getByRole("link", { name: "External contact link" }),
    ).toHaveAttribute("href", "/contact?subject=media");
  });
});
