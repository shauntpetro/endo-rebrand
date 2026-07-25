import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MediaPage from "@/app/media/page";
import Endo205ImpactTranslation from "@/components/figures/Endo205ImpactTranslation";
import InvestorRegulatoryPath from "@/components/figures/InvestorRegulatoryPath";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import PageHero from "@/components/site/PageHero";
import { ENDO205_MECHANISM_ALT } from "@/lib/site";

describe("responsive design polish", () => {
  it("wraps narrow pipeline labels without abbreviating their accessible names", () => {
    render(<PipelineStageAtlas />);

    const stageList = screen.getByRole("list", {
      name: "ENDO-205 development stages",
    });
    const labels = Array.from(
      stageList.querySelectorAll<HTMLElement>(
        ":scope > li > span[aria-hidden].sm\\:hidden",
      ),
    );
    const phaseItems = within(stageList).getAllByRole("listitem");

    expect(phaseItems).toHaveLength(6);
    phaseItems.forEach((item) => {
      expect(item).toHaveClass("text-xs");
      expect(item).not.toHaveClass("text-[0.6875rem]");
    });
    expect(
      Array.from(
        stageList.querySelectorAll<HTMLElement>(
          ":scope > li > span[aria-hidden].hidden.sm\\:inline",
        ),
        (label) => label.textContent,
      ),
    ).toEqual([
      "Discovery",
      "Pre-clinical",
      "IND-enabling",
      "Phase 1",
      "Phase 2",
      "Phase 3",
    ]);
    expect(
      Array.from(
        labels[0]?.querySelectorAll("[data-mobile-stage-segment]") ?? [],
        (segment) => segment.textContent,
      ),
    ).toEqual(["Disc."]);
    expect(
      Array.from(
        labels[1]?.querySelectorAll("[data-mobile-stage-segment]") ?? [],
        (segment) => segment.textContent,
      ),
    ).toEqual(["Pre", "clin."]);
    expect(
      Array.from(
        labels[2]?.querySelectorAll("[data-mobile-stage-segment]") ?? [],
        (segment) => segment.textContent,
      ),
    ).toEqual(["IND", "enab."]);
    expect(
      stageList.querySelectorAll("[data-mobile-stage-segment].block"),
    ).toHaveLength(11);
    expect(stageList).toHaveTextContent(
      "Phase 1, current stage for ENDO-205",
    );
  });

  it("keeps shared heroes compact through tablet and restores desktop spacing", () => {
    render(
      <PageHero
        eyebrow="Test chapter"
        title="Tablet rhythm"
        intro="A deliberately compact inner-page introduction."
      >
        <div>Hero visual</div>
      </PageHero>,
    );

    const section = screen
      .getByRole("heading", { level: 1, name: "Tablet rhythm" })
      .closest("section");
    const grid = section?.querySelector(".grid");

    expect(section).toHaveClass(
      "pb-16",
      "pt-28",
      "lg:pb-24",
      "lg:pt-36",
    );
    expect(section).not.toHaveClass("md:pb-24", "md:pt-36");
    expect(grid).toHaveClass("gap-11", "md:gap-9", "lg:gap-y-14");
  });

  it("offers a balanced desktop hero composition for longer editorial titles", () => {
    render(
      <PageHero
        eyebrow="Press resources"
        title="Accurate company information, ready to use."
        intro="Approved reference material."
        layout="balanced"
      >
        <div>Press reference facts</div>
      </PageHero>,
    );

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Accurate company information, ready to use.",
    });
    const visual = screen.getByText("Press reference facts").closest(
      ".hero-visual-enter",
    );

    expect(heading.parentElement).toHaveClass("lg:col-span-6");
    expect(visual).toHaveClass("lg:col-span-6");
  });

  it("gives the founder portrait three columns in the desktop media mosaic", () => {
    render(<MediaPage />);

    const founderTile = screen
      .getByRole("heading", { name: "Founder & CEO portrait" })
      .closest("li");
    const mechanismTile = screen
      .getByRole("heading", {
        name: "Platform sequence + ENDO-205 evidence",
      })
      .closest("li");
    const wordmarkTile = screen
      .getByRole("heading", { name: "Primary wordmark" })
      .closest("li");

    expect(founderTile).toHaveClass(
      "lg:col-span-3",
      "lg:col-start-7",
    );
    expect(mechanismTile).toHaveClass("lg:col-span-6");
    expect(wordmarkTile).toHaveClass(
      "lg:col-span-6",
      "lg:col-start-7",
    );
  });

  it("keeps the ENDO-205 translation stacked through tablet and splits it at desktop widths", () => {
    const { container } = render(<Endo205ImpactTranslation />);

    const layout = container.querySelector("[data-endo205-layout]");
    const media = container.querySelector("[data-endo205-media]");
    const image = screen.getByRole("img", {
      name: ENDO205_MECHANISM_ALT,
    });
    const darkPanel = container.querySelector('[data-tone="dark"]');

    expect(layout).toHaveClass("lg:grid-cols-12");
    expect(layout).not.toHaveClass("md:grid-cols-12");
    expect(media).toHaveClass("lg:col-span-7");
    expect(media).not.toHaveClass("md:col-span-7");
    expect(image).toHaveAttribute(
      "sizes",
      "(min-width: 1184px) 740px, (min-width: 1024px) 60vw, 100vw",
    );
    expect(darkPanel).toHaveClass(
      "lg:col-span-5",
      "lg:border-l",
      "lg:border-t-0",
    );
    expect(darkPanel).not.toHaveClass(
      "md:col-span-5",
      "md:border-l",
      "md:border-t-0",
    );
  });

  it("turns the primary investor chronology horizontal at tablet widths", () => {
    const items = [
      {
        index: "01",
        status: "Complete",
        statusClass: "text-teal-ink",
        nodeClass: "bg-teal",
        label: "Preclinical",
        title: "Foundation",
        text: "Program foundation.",
      },
      {
        index: "02",
        status: "Achieved",
        statusClass: "text-teal-ink",
        nodeClass: "bg-gold",
        label: "Regulatory",
        title: "IND Allowance",
        text: "Regulatory milestone.",
      },
      {
        index: "03",
        status: "Current",
        statusClass: "text-rose-ink",
        nodeClass: "bg-rose",
        label: "Clinical",
        title: "Phase 1",
        text: "Current development stage.",
      },
      {
        index: "04",
        status: "Filing underway",
        statusClass: "text-rose-ink",
        nodeClass: "bg-rose",
        label: "Parallel activity",
        title: "Fast Track",
        text: "Parallel regulatory activity.",
        parallel: true,
      },
    ] as const;
    const { container } = render(<InvestorRegulatoryPath items={items} />);

    const primaryList = screen.getByRole("list");
    const firstPrimaryItem = within(primaryList).getAllByRole("listitem")[0];
    const sweep = container.querySelector(".regulatory-path-sweep");

    expect(primaryList).toHaveClass("md:grid-cols-3", "md:gap-8");
    expect(firstPrimaryItem).toHaveClass("md:block", "md:py-0");
    expect(sweep).toHaveClass(
      "md:h-px",
      "md:w-auto",
      "md:origin-left",
      "md:bg-gradient-to-r",
    );
    expect(
      screen.getByRole("group", { name: "Fast Track: Filing underway" }),
    ).toBeVisible();
  });
});
