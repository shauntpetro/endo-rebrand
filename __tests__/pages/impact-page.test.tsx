import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import ImpactPage from "@/app/impact/page";
import {
  IMPACT_BIOLOGY_ALT,
  IMPACT_BIOLOGY_IMAGE,
  IMPACT_BIOLOGY_MOBILE_IMAGE,
} from "@/lib/site";

describe("ImpactPage", () => {
  it("provides a focusable, named burden destination", () => {
    render(<ImpactPage />);

    const burden = screen.getByRole("region", {
      name: "The burden is global. The diagnostic delay is measured in years.",
    });

    expect(burden).toHaveAttribute("id", "burden");
    expect(burden).toHaveAttribute("tabindex", "-1");
    expect(burden).toHaveClass("outline-none");
  });

  it("uses the decorative selective-thread mark for each chapter", () => {
    const { container } = render(<ImpactPage />);
    const chapterMarks = Array.from(
      container.querySelectorAll(".chapter-thread-mark"),
    );

    expect(chapterMarks).toHaveLength(3);
    for (const mark of chapterMarks) {
      expect(mark).toHaveAttribute("aria-hidden", "true");
      expect(mark.children).toHaveLength(1);
    }

    expect(screen.queryByText(/^0[123]$/)).not.toBeInTheDocument();
  });

  it("keeps quantitative burden signals in the burden chapter instead of the hero", () => {
    const { container } = render(<ImpactPage />);
    const hero = container.querySelector(
      'section[data-hero-layout="reverse"]',
    );

    expect(hero).toHaveTextContent(
      "Endometriosis is a chronic disease—not a symptom.",
    );
    expect(hero).toHaveTextContent(
      "Endometriosis is characterized by endometrial-like tissue growing outside the uterus.",
    );
    expect(hero).not.toHaveTextContent(/190M|1 in 10|\$200B|eight years/i);
    expect(
      container.querySelector("#burden")?.closest("section"),
    ).toHaveTextContent("190M+");
  });

  it("art-directs the tight Impact crop from tablet upward while preserving the mobile derivative", () => {
    const { container } = render(<ImpactPage />);
    const image = screen.getByRole("img", {
      name: IMPACT_BIOLOGY_ALT,
    });
    const mobileSource = image.closest("picture")?.querySelector("source");

    expect(IMPACT_BIOLOGY_IMAGE).toContain(
      "endometriosis-biology-impact-v2.avif",
    );
    expect(IMPACT_BIOLOGY_MOBILE_IMAGE).toContain(
      "endometriosis-biology-mobile-v1.avif",
    );
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("endometriosis-biology-impact-v2"),
    );
    expect(image).toHaveClass(
      "md:object-[50%_32%]",
      "lg:object-center",
    );
    expect(mobileSource).toHaveAttribute("media", "(max-width: 47.999rem)");
    expect(mobileSource).toHaveAttribute(
      "srcset",
      expect.stringContaining("endometriosis-biology-mobile-v1"),
    );
    expect(container.querySelector("picture")).toContainElement(image);
  });

  it("ships the documented 960 by 1024 deterministic Impact crop", async () => {
    const derivative = await sharp(
      resolve(
        process.cwd(),
        "public",
        IMPACT_BIOLOGY_IMAGE.replace(/^\//, ""),
      ),
    ).metadata();
    const master = await sharp(
      resolve(
        process.cwd(),
        "public/illustrations/endometriosis-biology-v1.avif",
      ),
    ).metadata();

    expect(master).toMatchObject({
      width: 1536,
      height: 1024,
    });
    expect(derivative).toMatchObject({
      format: "heif",
      width: 960,
      height: 1024,
    });
  });
});
