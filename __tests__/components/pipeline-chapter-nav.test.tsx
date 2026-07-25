import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import PipelineChapterNav from "@/components/site/PipelineChapterNav";

const originalIntersectionObserver = window.IntersectionObserver;

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
  window.IntersectionObserver = originalIntersectionObserver;
});

describe("PipelineChapterNav", () => {
  it("renders a continuation cue before hydration can measure the rail", () => {
    const markup = renderToStaticMarkup(<PipelineChapterNav />);

    expect(markup).toMatch(
      /data-chapter-overflow-cue[^>]*class="[^"]*opacity-100/,
    );
    expect(markup).toMatch(
      /data-chapter-overflow-cue[^>]*class="[^"]*md:hidden/,
    );
  });

  it("marks the current chapter with a forced-colors-safe hook", () => {
    render(<PipelineChapterNav />);

    expect(
      screen.getByRole("navigation", { name: "Pipeline chapters" }),
    ).toHaveAttribute("data-pipeline-chapter-nav");
    expect(screen.getByRole("link", { name: "Overview" })).toHaveClass(
      "pipeline-chapter-link",
    );
  });

  it.each(["endo-995", "endo-311"])(
    "maps the nested %s anchor to the oncology chapter",
    (programHash) => {
      window.history.replaceState(null, "", `/pipeline#${programHash}`);

      render(<PipelineChapterNav />);

      expect(screen.getByRole("link", { name: "Oncology" })).toHaveAttribute(
        "aria-current",
        "location",
      );
      expect(
        screen.getByRole("link", { name: "Overview" }),
      ).not.toHaveAttribute("aria-current");
    },
  );

  it("keeps the chapter state in sync when a nested hash changes", () => {
    window.history.replaceState(null, "", "/pipeline#endo-205");
    render(<PipelineChapterNav />);

    act(() => {
      window.history.replaceState(null, "", "/pipeline#endo-311");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.getByRole("link", { name: "Oncology" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("degrades to complete static hash links when IntersectionObserver is unavailable", () => {
    window.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver;
    window.history.replaceState(null, "", "/pipeline#endo-311");

    expect(() => render(<PipelineChapterNav />)).not.toThrow();

    const expectedLinks = [
      ["Overview", "#development"],
      ["ENDO-205", "#endo-205"],
      ["FemLUNA™", "#femluna"],
      ["Oncology", "#oncology"],
      ["Evidence", "#evidence"],
    ] as const;

    for (const [name, href] of expectedLinks) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }

    expect(screen.getByRole("link", { name: "Oncology" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("shows a continuation cue until the mobile chapter rail reaches its end", () => {
    const { container } = render(<PipelineChapterNav />);
    const scroller = container.querySelector<HTMLElement>(
      "[data-chapter-scroller]",
    )!;
    const cue = container.querySelector<HTMLElement>(
      "[data-chapter-overflow-cue]",
    )!;

    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 360 },
      scrollWidth: { configurable: true, value: 520 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });

    act(() => window.dispatchEvent(new Event("resize")));
    expect(cue).toHaveClass("opacity-100");

    scroller.scrollLeft = 160;
    act(() => scroller.dispatchEvent(new Event("scroll")));
    expect(cue).toHaveClass("opacity-0");
  });
});
