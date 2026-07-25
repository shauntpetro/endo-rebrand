import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PipelineHero from "@/app/pipeline/PipelineHero";
import PipelinePage from "@/app/pipeline/page";

describe("PipelineHero", () => {
  it("keeps the hero focused on its visual and primary actions", () => {
    render(<PipelineHero />);

    const heroImage = screen.getByAltText(
      "Conceptual editorial illustration of one precision peptide platform branching toward four therapeutic and diagnostic program paths.",
    );

    expect(heroImage).toHaveAttribute("fetchpriority", "high");
    expect(heroImage).toHaveAttribute(
      "sizes",
      "(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 90vw",
    );
    expect(heroImage).toHaveClass(
      "object-right",
      "sm:object-center",
    );
    expect(heroImage.parentElement).toHaveClass(
      "aspect-[8/5]",
      "sm:aspect-[2/1]",
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "One precision peptide platform. Four programs.",
      }).parentElement,
    ).toHaveClass("lg:col-span-6");
    expect(
      screen.getAllByText(
        "A common logic of selective uptake and pH-mediated activation.",
      ),
    ).toHaveLength(2);
    expect(
      screen.getByText(
        /The portfolio combines ENDO-205 and FemLUNA™ in endometriosis with a matched therapeutic and companion diagnostic strategy in oncology/i,
      ),
    ).toBeVisible();
    expect(
      screen.queryByText(/following FDA IND Allowance in 2026/i),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("navigation", {
        name: "Portfolio program shortcuts",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Discuss a partnership" }),
    ).toHaveAttribute("href", "/contact?subject=partnership#contact-form");
    expect(
      screen.getByRole("link", { name: "View development stages" }),
    ).toHaveAttribute("href", "#development");
  });
});

describe("PipelinePage chapter continuity", () => {
  it("places the sticky chapter navigation before its overview target", () => {
    const { container } = render(<PipelinePage />);
    const chapterNav = screen.getByRole("navigation", {
      name: "Pipeline chapters",
    });
    const overview = container.querySelector("#development");

    expect(overview).not.toBeNull();
    expect(
      chapterNav.compareDocumentPosition(overview as HTMLElement) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      within(chapterNav).getByRole("link", { name: "Overview" }),
    ).toHaveAttribute("href", "#development");
  });

  it("keeps every chapter target focusable, named, and clear of the sticky index", () => {
    render(<PipelinePage />);

    const chapters = [
      ["development", "Current stages across endometriosis and oncology."],
      [
        "endo-205",
        "A short-course, disease-modifying therapeutic for endometriosis.",
      ],
      ["femluna", "Treatment and detection, on one platform."],
      ["oncology", "Detection and treatment designed as a matched pair."],
      ["evidence", "Evidence beyond reported program stage."],
    ] as const;

    for (const [id, name] of chapters) {
      const target = document.getElementById(id);
      expect(target).toBe(
        screen.getByRole("region", {
          name,
        }),
      );
      expect(target).toHaveAttribute("tabindex", "-1");
      expect(target).toHaveClass("scroll-mt-12", "outline-none");
      expect(target).not.toHaveClass("scroll-mt-32");
    }

    for (const id of ["endo-995", "endo-311"]) {
      expect(document.getElementById(id)).toHaveAttribute("tabindex", "-1");
      expect(document.getElementById(id)).toHaveClass(
        "scroll-mt-12",
        "outline-none",
      );
    }
  });

  it("keeps diligence signals readable when text is enlarged", () => {
    const { container } = render(<PipelinePage />);

    const underway = screen.getByText("Underway");
    expect(underway).toHaveClass("[overflow-wrap:anywhere]");
    expect(underway.parentElement).toHaveClass("min-w-0");
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Commercialization Readiness Pilot grant.",
      }),
    ).toHaveClass("[overflow-wrap:anywhere]");
    expect(
      container.querySelector("[data-pipeline-evidence-dossier]"),
    ).not.toBeNull();
    const evidenceRecords = Array.from(
      container.querySelectorAll<HTMLElement>(
        "[data-pipeline-evidence-record]",
      ),
    );
    expect(evidenceRecords).toHaveLength(3);
    evidenceRecords.forEach((record) => {
      expect(record).not.toHaveClass("group");
      expect(
        record.querySelector<HTMLElement>(":scope > span[aria-hidden]")
          ?.className,
      ).not.toMatch(/group-hover|transition-/);
    });
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Commercialization Readiness Pilot grant.",
      }),
    ).toHaveClass("!text-on-dark");
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: "ENDO-205 entered Phase 1.",
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps the lead dossier focused on study design instead of restating the atlas", () => {
    render(<PipelinePage />);

    expect(screen.getByText("Clinical study")).toBeVisible();
    expect(screen.getByText("First-in-human Phase 1 study")).toBeVisible();
    expect(screen.getByText("Study population")).toBeVisible();
    expect(
      screen.queryByText("FDA IND Allowance (2026) · Phase 1"),
    ).not.toBeInTheDocument();
  });

  it("lets the development atlas introduce itself once", () => {
    render(<PipelinePage />);

    expect(screen.getByText("Current development")).toBeInTheDocument();
    expect(
      screen.queryByText("Read the portfolio by area, modality, and stage."),
    ).not.toBeInTheDocument();
  });

  it("keeps the shared mechanism in uptake-then-activation order", () => {
    render(<PipelinePage />);

    expect(
      screen.getByRole("heading", {
        name: "The portfolio shares a common design logic: selective uptake by diseased tissue, pH-mediated activation, and non-hormonal action.",
      }),
    ).toBeVisible();
    expect(
      screen.queryByText(
        /common design logic: pH-mediated activation, selective uptake/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("keeps the approved mechanism before the separately qualified ENDO-205 preclinical result", () => {
    render(<PipelinePage />);

    const mechanism = screen.getByAltText(
      /Conceptual ENDO-205 sequence showing selective uptake through an endocytic pathway and pH-mediated activation/i,
    );

    expect(mechanism).toHaveAttribute(
      "src",
      expect.stringContaining("endo-205-translation-v6"),
    );
    expect(
      screen.getByText(
        "Conceptual ENDO-205 sequence through selective uptake and pH-mediated activation.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A separate final state represents the ENDO-205 preclinical lesion-elimination finding/i,
      ),
    ).toBeInTheDocument();
  });
});
