import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "@/components/site/Button";

describe("Button", () => {
  it("anchors subject-specific internal contact links to the form", () => {
    render(<Button href="/contact?subject=media">Contact media relations</Button>);

    expect(
      screen.getByRole("link", { name: "Contact media relations" }),
    ).toHaveAttribute("href", "/contact?subject=media#contact-form");
    expect(
      screen.getByRole("link", { name: "Contact media relations" }),
    ).not.toHaveAttribute("data-site-event");
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

  it("announces when an external destination opens a new tab", () => {
    render(
      <Button href="https://example.com/source" external>
        Read source
      </Button>,
    );

    const link = screen.getByRole("link", {
      name: "Read source, opens in a new tab",
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("preserves native download semantics for internal assets", () => {
    render(
      <Button href="/downloads/investor-summary.pdf" download>
        Download summary
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Download summary" })).toHaveAttribute(
      "download",
      "",
    );
  });

  it.each([
    [
      "/contact?subject=partnership#contact-form",
      "cta_partnership",
    ],
    ["/investors#data-room", "cta_data_room"],
    ["#data-room", "cta_data_room"],
    [
      "/downloads/endocyclic-investor-summary-v2.pdf",
      "cta_investor_summary",
    ],
    [
      "/downloads/media/endocyclic-media-kit-web-v12.zip",
      "cta_media_kit",
    ],
  ])("marks the known high-intent destination %s with %s", (href, eventId) => {
    render(<Button href={href}>High-intent action</Button>);

    expect(
      screen.getByRole("link", { name: "High-intent action" }),
    ).toHaveAttribute("data-site-event", eventId);
  });

  it("does not infer an event from arbitrary link copy or lookalike downloads", () => {
    render(
      <Button href="/downloads/media/private-company-media-kit.zip">
        Download complete web kit
      </Button>,
    );

    expect(
      screen.getByRole("link", { name: "Download complete web kit" }),
    ).not.toHaveAttribute("data-site-event");
  });
});
