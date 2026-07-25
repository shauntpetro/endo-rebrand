import { render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import ArtDirectedImage from "@/components/site/ArtDirectedImage";
import Footer from "@/components/site/Footer";
import PageHero from "@/components/site/PageHero";
import { SITE } from "@/lib/site";

describe("responsive shell", () => {
  it("art-directs priority imagery without requesting both crops at one viewport", () => {
    const { container } = render(
      <div className="relative">
        <ArtDirectedImage
          desktopSrc="/illustrations/hero-desktop.avif"
          mobileSrc="/illustrations/hero-mobile-v1.avif"
          alt="Conceptual test artwork."
          describedBy="artwork-note"
          priority
          sizes="100vw"
        />
        <p id="artwork-note">Conceptual representation.</p>
      </div>,
    );

    const picture = container.querySelector("picture");
    const sources = picture?.querySelectorAll("source");
    const mobileSource = sources?.[0];
    const desktopSource = sources?.[1];
    const image = screen.getByRole("img", {
      name: "Conceptual test artwork.",
    });

    expect(mobileSource).toHaveAttribute("media", "(max-width: 47.999rem)");
    expect(mobileSource?.getAttribute("srcset")).toContain(
      "hero-mobile-v1.avif",
    );
    expect(sources).toHaveLength(2);
    expect(desktopSource).toHaveAttribute("media", "(min-width: 48rem)");
    expect(desktopSource?.getAttribute("srcset")).toContain(
      "hero-desktop.avif",
    );
    expect(image.getAttribute("srcset")).toContain("hero-desktop.avif");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("aria-describedby", "artwork-note");
  });

  it("uses a compact two-column mobile footer without shrinking link targets", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const mainGrid = footer.querySelector(".container-page.grid");
    const connect = screen.getByRole("navigation", { name: "Connect" });

    expect(mainGrid).toHaveClass("grid-cols-2", "[&>*]:min-w-0");
    expect(
      screen
        .getByRole("link", { name: "EndoCyclic Therapeutics — home" })
        .closest("div"),
    ).toHaveClass("col-span-2");
    expect(connect).toHaveClass("col-span-2", "sm:col-span-1");
    expect(within(connect).getByRole("list")).toHaveClass(
      "flex",
      "flex-wrap",
      "sm:block",
    );

    for (const link of within(connect).getAllByRole("link")) {
      expect(link).toHaveClass(
        "min-h-11",
        "min-w-11",
        "max-w-full",
        "[overflow-wrap:anywhere]",
      );
      expect(link.firstElementChild).toHaveClass(
        "min-w-0",
        "[overflow-wrap:anywhere]",
      );
    }

    expect(
      within(
        screen.getByRole("navigation", { name: "Explore" }),
      ).getByRole("link", { name: "Precision peptide platform" }),
    ).toHaveAttribute("href", "/innovation");
    expect(
      footer.querySelector('a[href^="mailto:"]'),
    ).not.toBeInTheDocument();
  });

  it("shortens automatic hero visuals at tablet widths and restores desktop depth", () => {
    render(
      <PageHero
        eyebrow="Test chapter"
        title="Test title"
        intro="Test introduction"
        visualAspect="auto"
      >
        <div>Test visual</div>
      </PageHero>,
    );

    expect(screen.getByText("Test visual").closest(".hero-visual-frame")).toHaveClass(
      "min-h-[27rem]",
      "sm:min-h-[24rem]",
      "lg:min-h-[30rem]",
    );
  });

  it("lets content-led hero visuals avoid artwork-sized empty space", () => {
    render(
      <PageHero
        eyebrow="Contact"
        title="Choose a route"
        intro="A content-led hero panel."
        visualAspect="content"
      >
        <div>Routing panel</div>
      </PageHero>,
    );

    const frame = screen
      .getByText("Routing panel")
      .closest(".hero-visual-frame");

    expect(frame).toHaveClass("min-h-0");
    expect(frame).not.toHaveClass(
      "min-h-[27rem]",
      "sm:min-h-[24rem]",
      "lg:min-h-[30rem]",
    );
  });

  it("can keep a text-led hero title immediately paintable", () => {
    render(
      <PageHero
        eyebrow="Test chapter"
        title="Immediate title"
        intro="Test introduction"
        titleMotion={false}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Immediate title" }),
    ).toHaveAttribute("data-hero-title-motion", "static");
  });

  it("keeps long hero proof and footer contact text inside narrow layouts", () => {
    const originalEmail = SITE.email;
    const longEmail = `${"investor.".repeat(25)}relations@example.com`;
    (SITE as unknown as { email: string }).email = longEmail;

    try {
      render(
        <>
          <PageHero
            eyebrow="Test chapter"
            title="Resilient contact"
            intro="Test introduction"
            proof={longEmail}
          />
          <Footer />
        </>,
      );

      expect(screen.getByText(longEmail, { selector: "span" })).toHaveClass(
        "min-w-0",
        "[overflow-wrap:anywhere]",
      );
      expect(screen.getByRole("link", { name: longEmail })).toHaveClass(
        "max-w-full",
        "[overflow-wrap:anywhere]",
      );
    } finally {
      (SITE as unknown as { email: string }).email = originalEmail;
    }
  });

  it("preserves focus indicators and control boundaries in forced-colors mode", () => {
    const css = readFileSync(
      resolve(process.cwd(), "app/globals.css"),
      "utf8",
    );

    expect(css).toContain("@media (forced-colors: active)");
    expect(css).toMatch(
      /\[role="region"\]\[tabindex="-1"\]\.outline-none:focus-visible\s*\{[\s\S]*?outline:\s*none;[\s\S]*?box-shadow:\s*inset 0 2px 0 var\(--color-teal-ink\)/,
    );
    expect(css).toMatch(/outline:\s*2px solid Highlight\s*!important/);
    expect(css).toMatch(/border-color:\s*CanvasText/);
    expect(css).toMatch(
      /\[aria-current="page"\],[\s\S]*?\.pipeline-chapter-link\[aria-current="location"\]\s*\{[\s\S]*?outline:\s*2px solid Highlight/,
    );
    expect(css).toMatch(
      /\.peer\[type="radio"\]:checked \+ span,[\s\S]*?\[data-home-portfolio-enhanced\] \[role="tab"\]\[aria-selected="true"\],[\s\S]*?\[data-sequence-enhanced\] \[role="tab"\]\[aria-selected="true"\],[\s\S]*?\[data-femluna-comparison\] \[aria-pressed="true"\],[\s\S]*?\[data-care-gap-mobile\] \[role="tab"\]\[aria-selected="true"\],[\s\S]*?\[data-oncology-pair-mobile\] \[role="tab"\]\[aria-selected="true"\]\s*\{[\s\S]*?outline:\s*2px solid Highlight/,
    );
    expect(css).toMatch(
      /#femluna-comparison-range:focus-visible ~ \[data-femluna-range-focus\]\s*\{[\s\S]*?opacity:\s*1\s*!important;[\s\S]*?outline:\s*3px solid Highlight\s*!important/,
    );
  });

  it("keeps the generic scroll reveal contrast-safe and transform-only", () => {
    const css = readFileSync(
      resolve(process.cwd(), "app/globals.css"),
      "utf8",
    );
    const revealStart = css.indexOf("@keyframes reveal-view");
    const revealEnd = css.indexOf(
      "@keyframes mobile-nav-panel-in",
      revealStart,
    );
    const revealRule = css.slice(revealStart, revealEnd);

    expect(revealStart).toBeGreaterThanOrEqual(0);
    expect(revealEnd).toBeGreaterThan(revealStart);
    expect(revealRule).toContain("transform:");
    expect(revealRule).not.toContain("opacity:");
    expect(revealRule).not.toContain("clip-path:");
  });

  it("provides a print-safe diligence view without fixed navigation or clipped motion", () => {
    const css = readFileSync(
      resolve(process.cwd(), "app/globals.css"),
      "utf8",
    );

    expect(css).toContain("@media print");
    expect(css).toMatch(
      /body > header,[\s\S]*\[data-pipeline-chapter-nav\],[\s\S]*display:\s*none\s*!important/,
    );
    expect(css).toMatch(
      /\[data-pipeline-motion\][\s\S]*opacity:\s*1\s*!important;[\s\S]*transform:\s*none\s*!important;[\s\S]*clip-path:\s*none\s*!important/,
    );
    expect(css).toMatch(/padding-block:\s*1\.5rem\s*!important/);
    expect(css).toMatch(/break-inside:\s*avoid-page/);
  });
});
