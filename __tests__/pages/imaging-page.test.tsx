import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImagingPage from "@/app/imaging/page";

describe("ImagingPage", () => {
  it("qualifies FemLUNA's laparoscopy comparison as design intent", () => {
    render(<ImagingPage />);

    expect(
      screen.getByText(
        "FemLUNA™ is being developed as a non-invasive alternative.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Targeted imaging agent · Endometriosis · IND-enabling",
      ),
    ).toBeVisible();
    expect(
      screen.queryByText(/^A non-invasive alternative to laparoscopy/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Development brief")).not.toBeInTheDocument();
  });

  it("uses a distinct diagnostic-path composition instead of repeating the impact timeline", () => {
    render(<ImagingPage />);

    expect(
      screen.getByRole("heading", {
        name: "The bottleneck is visibility, followed by invasive confirmation.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Visibility gap")).toBeVisible();
    expect(
      screen.getByText(
        "Superficial and sub-millimeter lesions can be missed by current imaging methods.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /See the targeting concept/i }),
    ).toHaveAttribute("href", "#detection-logic");
    expect(
      screen.getByText(
        "With an eight-year average delay, the problem is both time and the limits of current imaging.",
      ),
    ).toBeVisible();
    const diagnosticHeading = screen.getByRole("heading", {
      name: "The bottleneck is visibility, followed by invasive confirmation.",
    });
    const diagnosticList = diagnosticHeading
      .closest("figure")
      ?.querySelector("ol");
    expect(diagnosticList).not.toBeNull();
    expect(
      Array.from(diagnosticList?.children ?? []).every(
        (child) => child.tagName === "LI",
      ),
    ).toBe(true);

    const detectionTarget = screen.getByRole("region", {
      name: "A targeted signal is designed to distinguish the lesion.",
    });
    expect(detectionTarget).toHaveAttribute("id", "detection-logic");
    expect(detectionTarget).toHaveAttribute("tabindex", "-1");
    expect(detectionTarget).toHaveClass("outline-none");
    expect(detectionTarget).not.toHaveClass("scroll-mt-28");
  });

  it("serves the art-directed portrait hero at portrait breakpoints", () => {
    const { container } = render(<ImagingPage />);
    const mobileSource = container.querySelector(
      'main picture source[media="(max-width: 639px)"]',
    );
    const desktopPortraitSource = container.querySelector(
      'main picture source[media="(min-width: 1024px)"]',
    );

    expect(mobileSource?.getAttribute("srcset")).toContain(
      "femluna-targeting-v3-portrait.avif",
    );
    expect(mobileSource).toHaveAttribute("sizes", "90vw");
    expect(desktopPortraitSource?.getAttribute("srcset")).toContain(
      "femluna-targeting-v3-portrait.avif",
    );

    const heroImage = screen.getByAltText(
      /targeted imaging agent localizing near a small endometriosis lesion/i,
    );
    expect(heroImage).toHaveAttribute("fetchpriority", "high");
    expect(heroImage).not.toHaveAttribute("loading", "lazy");

    const heroPreloads = document.querySelectorAll(
      'link[rel="preload"][as="image"][fetchpriority="high"]',
    );
    expect(heroPreloads).toHaveLength(3);
  });

  it("uses the focused ENDO-311 derivative at every breakpoint", () => {
    const { container } = render(<ImagingPage />);
    const image = screen.getByAltText(
      /targeted imaging agent localizing at the boundary of a solid-tumor focus/i,
    );

    expect(image.getAttribute("src")).toContain(
      "endo-311-localization-pair-v4.avif",
    );
    expect(image).toHaveAttribute(
      "sizes",
      "(min-width: 1184px) 650px, (min-width: 1024px) 57vw, 94vw",
    );
    expect(container.querySelector("[data-endo311-visual]")?.parentElement).toHaveClass(
      "aspect-[4/3]",
      "lg:aspect-[3/2]",
    );
  });
});
