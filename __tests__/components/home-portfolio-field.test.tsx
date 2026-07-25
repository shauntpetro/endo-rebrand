import type { ComponentProps } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomePortfolioField from "@/components/figures/HomePortfolioField";
import {
  ENDO205_MECHANISM_ALT,
  PHASES,
  PIPELINE,
} from "@/lib/site";

vi.mock("next/link", () => ({
  default: ({
    prefetch,
    ...props
  }: ComponentProps<"a"> & { prefetch?: boolean }) => (
    <a
      data-prefetch={prefetch === false ? "false" : undefined}
      {...props}
    />
  ),
}));

const originalMatchMedia = window.matchMedia;

function setDesktopViewport(isDesktop: boolean) {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query === "(min-width: 1024px)" && isDesktop,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("HomePortfolioField", () => {
  it("server-renders a complete linked portfolio index without JavaScript", () => {
    const html = renderToStaticMarkup(<HomePortfolioField />);
    const staticFallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];

    expect(staticFallback).toBeDefined();
    expect(staticFallback).toContain("Browse every program");
    expect(staticFallback).toContain(
      "Open a program brief for its indication, modality, and current development stage.",
    );
    expect(staticFallback).toContain(
      "[data-home-portfolio-enhanced] { display: none !important; }",
    );
    expect(html).toContain("data-home-portfolio-enhanced");

    const expectedPrograms = [
      ["ENDO-205", "/pipeline#endo-205"],
      ["FemLUNA™", "/pipeline#femluna"],
      ["ENDO-995", "/pipeline#endo-995"],
      ["ENDO-311", "/pipeline#endo-311"],
    ] as const;

    for (const [name, href] of expectedPrograms) {
      expect(staticFallback).toContain(name);
      expect(staticFallback).toContain(`href="${href}"`);
    }

    expect(staticFallback?.match(/href="\/pipeline#[^"]+"/g)).toHaveLength(
      PIPELINE.length,
    );
    expect(
      staticFallback?.match(/data-prefetch="false"/g),
    ).toHaveLength(PIPELINE.length);
    expect(html.match(/data-prefetch="false"/g)).toHaveLength(
      PIPELINE.length * 2 + 1,
    );
    expect(html).toContain("data-home-portfolio-print");
  });

  it("keeps every program discoverable in the program index", () => {
    const { container } = render(<HomePortfolioField />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(PIPELINE.length);

    for (const program of PIPELINE) {
      expect(
        screen.getByRole("tab", { name: new RegExp(program.name.replace("™", ""), "i") }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText("01 / 04")).toBeInTheDocument();
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  it("uses the index for stage comparison and the panel for program design", () => {
    render(<HomePortfolioField />);

    const endo205Tab = screen.getByRole("tab", { name: /ENDO-205/i });
    const panel = screen.getByRole("tabpanel");

    expect(endo205Tab).toHaveTextContent("Phase 1");
    expect(endo205Tab).not.toHaveTextContent("FDA IND Allowance");
    expect(within(panel).getByText("Program design")).toBeVisible();
    expect(
      within(panel).getByText("First-in-class, non-hormonal precision peptide"),
    ).toBeVisible();
    expect(
      within(panel).getByRole("heading", { name: "ENDO-205" }),
    ).toHaveStyle("white-space: nowrap");
    expect(within(panel).queryByText("Current development")).not.toBeInTheDocument();
  });

  it("keeps the complete ENDO-205 illustrated-target and lesion-elimination sequence in frame", () => {
    render(<HomePortfolioField />);

    const endo205Visual = screen.getByRole("img", {
      name: ENDO205_MECHANISM_ALT,
    });

    expect(endo205Visual).toHaveClass("object-cover");
    expect(endo205Visual).not.toHaveClass("object-contain");
    expect(endo205Visual).toHaveAttribute(
      "src",
      expect.stringContaining("endo-205-portfolio-desktop-v6"),
    );
    const sources = endo205Visual.parentElement?.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources?.[0]).toHaveAttribute(
      "srcset",
      expect.stringContaining("endo-205-translation-v6"),
    );
    expect(sources?.[0]).toHaveAttribute("media", "(max-width: 63.999rem)");
    expect(sources?.[1]).toHaveAttribute(
      "srcset",
      expect.stringContaining("endo-205-portfolio-desktop-v6"),
    );
    expect(sources?.[1]).toHaveAttribute("media", "(min-width: 64rem)");
    expect(
      screen.getByText(
        /For ENDO-205, the intact peptide remains visible within diseased tissue before a separate state shows that same lesion receding/i,
      ),
    ).toBeVisible();
  });

  it("keeps the decorative active surface outside the semantic program list", () => {
    render(<HomePortfolioField />);

    const tablist = screen.getByRole("tablist", {
      name: "Development programs",
    });

    expect(
      Array.from(tablist.children).every(
        (child) => child.tagName.toLowerCase() === "li",
      ),
    ).toBe(true);
    expect(tablist.querySelector(".portfolio-active-surface")).toBeNull();
    expect(tablist.previousElementSibling).toHaveClass(
      "portfolio-active-surface",
    );
    expect(tablist.previousElementSibling).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("primes only the program a visitor signals intent to inspect", async () => {
    const user = userEvent.setup();
    const { container } = render(<HomePortfolioField />);
    const femLunaTab = screen.getByRole("tab", { name: /FemLUNA/i });
    const endo995Tab = screen.getByRole("tab", { name: /ENDO-995/i });

    await user.hover(femLunaTab);
    expect(container.querySelectorAll("img")).toHaveLength(1);

    await waitFor(() =>
      expect(container.querySelectorAll("img")).toHaveLength(2),
    );

    await user.hover(endo995Tab);
    await waitFor(() =>
      expect(container.querySelectorAll("img")).toHaveLength(2),
    );
  });

  it("retains the full six-stage development context on small screens", () => {
    render(<HomePortfolioField />);

    const phaseList = screen.getByRole("list", {
      name: /development phases for ENDO-205/i,
    });
    expect(within(phaseList).getAllByRole("listitem")).toHaveLength(PHASES.length);

    for (const phase of PHASES) {
      expect(within(phaseList).getByText(phase)).toBeInTheDocument();
    }
  });

  it("updates the active program, detail, and mobile phase context", async () => {
    const user = userEvent.setup();
    render(<HomePortfolioField />);

    const femLunaTab = screen.getByRole("tab", { name: /FemLUNA/i });
    await user.click(femLunaTab);

    expect(femLunaTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("02 / 04")).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /development phases for FemLUNA/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open program brief/i })).toHaveAttribute(
      "href",
      "/pipeline#femluna",
    );
  });

  it("routes each oncology program to its own program brief", async () => {
    const user = userEvent.setup();
    render(<HomePortfolioField />);

    await user.click(screen.getByRole("tab", { name: /ENDO-995/i }));
    expect(screen.getByRole("link", { name: /open program brief/i })).toHaveAttribute(
      "href",
      "/pipeline#endo-995",
    );

    await user.click(screen.getByRole("tab", { name: /ENDO-311/i }));
    expect(screen.getByRole("link", { name: /open program brief/i })).toHaveAttribute(
      "href",
      "/pipeline#endo-311",
    );
  });

  it("supports roving keyboard focus across every program", async () => {
    const user = userEvent.setup();
    render(<HomePortfolioField />);

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(tabs[1]).toHaveFocus());
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    await waitFor(() => expect(tabs.at(-1)).toHaveFocus());
    expect(tabs.at(-1)).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    await waitFor(() => expect(tabs[0]).toHaveFocus());
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("uses horizontal semantics and leaves vertical arrows to page scrolling below desktop", async () => {
    setDesktopViewport(false);
    render(<HomePortfolioField />);

    const tablist = screen.getByRole("tablist", {
      name: "Development programs",
    });
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
    expect(tablist).toHaveClass("flex", "overflow-x-auto", "snap-x");
    expect(tablist).not.toHaveClass("grid-cols-2");
    expect(Array.from(tablist.children)).toHaveLength(PIPELINE.length);
    expect(
      Array.from(tablist.children).every((item) =>
        item.classList.contains("shrink-0"),
      ),
    ).toBe(true);
    expect(
      tabs.every((tab) => tab.classList.contains("min-h-[7.5rem]")),
    ).toBe(true);
    expect(
      screen.getByText(/Use the Left and Right arrow keys/i),
    ).toBeInTheDocument();
    expect(fireEvent.keyDown(tabs[0], { key: "ArrowDown" })).toBe(true);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    expect(fireEvent.keyDown(tabs[0], { key: "ArrowRight" })).toBe(false);
    await waitFor(() => expect(tabs[1]).toHaveFocus());
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("uses vertical semantics and leaves horizontal arrows untouched on desktop", async () => {
    setDesktopViewport(true);
    render(<HomePortfolioField />);

    const tablist = screen.getByRole("tablist", {
      name: "Development programs",
    });
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    await waitFor(() =>
      expect(tablist).toHaveAttribute("aria-orientation", "vertical"),
    );
    expect(
      screen.getByText(/Use the Up and Down arrow keys/i),
    ).toBeInTheDocument();
    expect(fireEvent.keyDown(tabs[0], { key: "ArrowRight" })).toBe(true);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    expect(fireEvent.keyDown(tabs[0], { key: "ArrowDown" })).toBe(false);
    await waitFor(() => expect(tabs[1]).toHaveFocus());
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("keeps rapid program changes on one final accessible panel", async () => {
    const user = userEvent.setup();
    render(<HomePortfolioField />);

    await user.click(screen.getByRole("tab", { name: /ENDO-995/i }));
    await user.click(screen.getByRole("tab", { name: /ENDO-311/i }));

    expect(screen.getByRole("tab", { name: /ENDO-311/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName(/ENDO-311/i);
    expect(screen.getByRole("link", { name: /open program brief/i })).toHaveAttribute(
      "href",
      "/pipeline#endo-311",
    );
    expect(
      screen.queryByRole("img", {
        name: /tumor-selective cyclic peptide crossing a tumor-cell membrane/i,
      }),
    ).not.toBeInTheDocument();
  });
});
