import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";

describe("HomeNewsMedia", () => {
  it("keeps the sourced recognition archive and media kit directly discoverable", () => {
    const { container } = render(<HomeNewsMedia />);

    expect(
      screen.getByRole("link", { name: /review sourced news/i }),
    ).toHaveAttribute("href", "/news");
    expect(
      screen.getByRole("link", { name: /open press resources/i }),
    ).toHaveAttribute("href", "/media");
    expect(
      screen.getByRole("link", {
        name: /FDA IND Allowance advances ENDO-205 into Phase 1/i,
      }),
    ).toHaveAttribute("target", "_blank");
    expect(screen.getByText("ENDO-205")).toHaveClass("whitespace-nowrap");

    expect(
      screen.getByRole("link", { name: /review sourced news/i }),
    ).toHaveClass("min-h-28", "sm:min-h-40");
    expect(
      screen.getByText(/Company milestones, awards, profiles/i),
    ).toHaveClass("hidden", "sm:block");
    expect(
      screen.getByText(/ENDO-205 is EndoCyclic’s lead/i),
    ).toHaveClass("hidden", "sm:block");
    expect(container.querySelectorAll('a[href="/news"]')).toHaveLength(1);
    expect(container.querySelectorAll('a[href="/media"]')).toHaveLength(1);
  });

  it("leads with the featured milestone on small screens and restores the editorial desktop grid", () => {
    render(<HomeNewsMedia />);

    const featured = screen.getByRole("link", {
      name: /read the company announcement/i,
    });
    const secondary = screen.getByRole("link", {
      name: /NIH ‘Perfect 10’ recognition/i,
    });
    const news = screen.getByRole("link", {
      name: /review sourced news/i,
    });
    const media = screen.getByRole("link", {
      name: /open press resources/i,
    });
    const ownedDestinations = news.parentElement;
    const secondaryStories = secondary.closest("ol");

    expect(ownedDestinations).toBe(media.parentElement);
    expect(ownedDestinations).toHaveClass(
      "order-3",
      "lg:order-none",
      "lg:col-span-5",
      "lg:col-start-8",
      "lg:row-start-2",
    );
    expect(featured).toHaveClass(
      "order-1",
      "lg:order-none",
      "lg:col-span-7",
      "lg:row-span-2",
      "lg:row-start-1",
    );
    expect(secondaryStories).toHaveClass(
      "order-2",
      "lg:order-none",
      "lg:col-span-5",
      "lg:col-start-8",
      "lg:row-start-1",
    );
  });

  it("features the current FDA milestone and keeps NIH recognition secondary", () => {
    render(<HomeNewsMedia />);

    expect(screen.getByText("Current milestone")).toBeInTheDocument();
    expect(
      screen.getByText(/EndoCyclic Therapeutics · Hosted by PR Newswire/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /read the company announcement/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("prnewswire.com/news-releases"));
    expect(
      screen.getByRole("link", {
        name: /NIH ‘Perfect 10’ recognition/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /FDA IND Allowance advances ENDO-205 into Phase 1/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /UCLA Alumni News Profiles Dr. Tanya Petrossian/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("coalesces pointer movement into a transform and resets the featured mark", async () => {
    const { container } = render(<HomeNewsMedia />);
    const featuredLink = screen.getByRole("link", {
      name: /read the company announcement/i,
    });
    const mark = container.querySelector<HTMLElement>("[data-featured-mark]");

    expect(mark).not.toBeNull();
    vi.spyOn(featuredLink, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(featuredLink, {
      pointerType: "mouse",
      clientX: 100,
      clientY: 100,
    });

    await waitFor(() =>
      expect(mark).toHaveStyle({
        transform: "translate3d(7.00px, 5.00px, 0)",
      }),
    );

    fireEvent.pointerLeave(featuredLink);
    await waitFor(() =>
      expect(mark).toHaveStyle({
        transform: "translate3d(0.00px, 0.00px, 0)",
      }),
    );
  });
});
