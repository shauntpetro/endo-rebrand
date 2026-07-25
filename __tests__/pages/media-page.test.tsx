import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import MediaPage, {
  APPROVED_BOILERPLATE,
  APPROVED_BOILERPLATE_PARAGRAPHS,
} from "@/app/media/page";
import mediaKitRelease from "@/lib/media-kit-release.json";
import {
  ENDO205_MECHANISM_ALT,
  PLATFORM_MECHANISM_ALT,
  SITE,
} from "@/lib/site";

const originalClipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

afterEach(() => {
  if (originalClipboardDescriptor) {
    Object.defineProperty(
      navigator,
      "clipboard",
      originalClipboardDescriptor,
    );
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
  vi.restoreAllMocks();
});

describe("MediaPage", () => {
  it("keeps the copied and downloaded approved boilerplate identical", () => {
    const download = readFileSync(
      resolve(
        process.cwd(),
        "public/downloads/endocyclic-approved-boilerplate.txt",
      ),
      "utf8",
    );
    const downloadedBoilerplate = download.split(/\r?\n\r?\n/, 2)[1]?.trim();

    expect(downloadedBoilerplate).toBe(APPROVED_BOILERPLATE);
  });

  it("presents every approved segment in three editorial paragraphs and copies the full constant", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<MediaPage />);

    const section = screen
      .getByRole("heading", {
        name: "The company story, ready for accurate coverage.",
      })
      .closest("section");
    const boilerplateBody = section?.querySelector("[data-boilerplate-body]");
    const renderedParagraphs = Array.from(
      boilerplateBody?.querySelectorAll("[data-boilerplate-paragraph]") ?? [],
      (paragraph) => paragraph.textContent,
    );

    expect(boilerplateBody).toHaveClass(
      "max-w-[58ch]",
      "border-l",
      "border-rose",
    );
    expect(renderedParagraphs).toEqual([
      ...APPROVED_BOILERPLATE_PARAGRAPHS,
    ]);
    expect(renderedParagraphs.join(" ")).toBe(APPROVED_BOILERPLATE);

    await user.click(
      within(section as HTMLElement).getByRole("button", {
        name: "Copy boilerplate",
      }),
    );

    expect(writeText).toHaveBeenCalledWith(APPROVED_BOILERPLATE);
  });

  it("routes press and asset requests through the media contact form", () => {
    render(<MediaPage />);

    for (const name of ["Contact the press desk", "Send a media inquiry"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "href",
        "/contact?subject=media&intent=press#contact-form",
      );
    }
    expect(
      screen.getByRole("link", { name: "Review sourced news" }),
    ).toHaveAttribute("href", "/news");
    expect(
      screen.getByRole("link", { name: "Request an alternate format" }),
    ).toHaveAttribute(
      "href",
      "/contact?subject=media&intent=asset#contact-form",
    );
  });

  it("offers a compact task index for the long media desk", () => {
    render(<MediaPage />);

    const shortcuts = screen.getByRole("navigation", {
      name: "Media resource shortcuts",
    });
    const links = within(shortcuts).getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#boilerplate",
      "#assets",
      "#program-visuals",
      "#media-contact",
    ]);
    expect(within(shortcuts).getByRole("list")).toHaveClass(
      "grid-cols-2",
      "lg:grid-cols-4",
    );
    for (const link of links) {
      expect(link).toHaveClass("min-h-20", "sm:min-h-24");
    }
  });

  it("makes every public hash destination a focusable named region", () => {
    render(<MediaPage />);

    const destinations = [
      ["boilerplate", "The company story, ready for accurate coverage."],
      ["assets", "Approved web assets, ready to download."],
      [
        "program-visuals",
        "Program-specific artwork, packaged for accurate coverage.",
      ],
      ["media-contact", "Need context, confirmation, or an interview?"],
    ] as const;

    for (const [id, name] of destinations) {
      const target = screen.getByRole("region", { name });
      expect(target).toHaveAttribute("id", id);
      expect(target).toHaveAttribute("tabindex", "-1");
      expect(target).toHaveClass("outline-none");
      expect(target).not.toHaveClass("scroll-mt-28");
    }
  });

  it("only exposes a direct email route when an approved public inbox is configured", () => {
    render(<MediaPage />);

    if (SITE.email) {
      const emailLinks = screen.getAllByRole("link", { name: SITE.email });
      expect(emailLinks).toHaveLength(2);
      expect(
        emailLinks.every((link) =>
          link.getAttribute("href")?.startsWith("mailto:"),
        ),
      ).toBe(true);
      return;
    }

    expect(document.querySelectorAll('a[href^="mailto:"]')).toHaveLength(0);
    expect(screen.getByText("Media inquiry form")).toBeVisible();
  });

  it("wraps a long configured media address in both the fact sheet and direct routes", () => {
    const originalEmail = SITE.email;
    const longEmail = `${"newsroom.".repeat(26)}desk@example.com`;
    (SITE as unknown as { email: string }).email = longEmail;

    try {
      render(<MediaPage />);

      expect(
        screen.getByText(longEmail, { selector: "dd" }),
      ).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
      for (const link of screen.getAllByRole("link", { name: longEmail })) {
        expect(link).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
      }
    } finally {
      (SITE as unknown as { email: string }).email = originalEmail;
    }
  });

  it("places compact provenance beside the newsroom key facts", () => {
    render(<MediaPage />);

    expect(
      screen.getByRole("link", {
        name: /Company reported · FDA IND Allowance announcement/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("prnewswire.com"));
    expect(
      screen.getByRole("link", {
        name: /Institutional record · WHO prevalence record/i,
      }),
    ).toHaveAttribute("href", expect.stringContaining("who.int"));
    expect(
      screen.getByText("Company reported · Disease-burden figures"),
    ).toBeVisible();
  });

  it("prioritizes the hero mechanism tile while keeping the remaining collage responsive", () => {
    render(<MediaPage />);

    const mechanism = screen.getByAltText(
      "Compact conceptual EndoCyclic sequence showing lesion contact, selective uptake, pH-mediated activation, intracellular target engagement, and a separate receding-lesion state representing the ENDO-205 preclinical lesion-elimination finding",
    );
    const wordmark = screen.getByAltText("EndoCyclic Therapeutics");
    const founder = screen.getByAltText(
      "Dr. Tanya Petrossian, Founder and CEO",
    );
    const portfolio = screen.getByAltText(
      "Conceptual EndoCyclic portfolio architecture",
    );

    expect(mechanism).not.toHaveAttribute("loading", "lazy");
    expect(mechanism).toHaveAttribute("fetchpriority", "high");
    expect(mechanism).toHaveAttribute(
      "sizes",
      "(min-width: 1280px) 29vw, (min-width: 1024px) 24vw, 54vw",
    );
    expect(mechanism).toHaveAttribute(
      "src",
      expect.stringContaining("endo-205-portfolio-desktop-v6"),
    );
    expect(mechanism).toHaveClass(
      "object-cover",
      "object-center",
    );
    expect(mechanism.closest("picture")).toBeNull();
    expect(
      screen.getByText("Evidence 04 · ENDO-205 preclinical"),
    ).toBeVisible();
    expect(wordmark).toHaveAttribute("loading", "lazy");
    expect(wordmark).toHaveAttribute("width", "233");
    expect(wordmark).toHaveAttribute("height", "70");
    expect(wordmark).not.toHaveAttribute("sizes");
    expect(wordmark).toHaveClass("max-w-[233px]");
    expect(founder).toHaveAttribute(
      "sizes",
      "(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw",
    );
    expect(portfolio).toHaveAttribute(
      "sizes",
      "(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw",
    );
    for (const image of [founder, portfolio]) {
      expect(image).toHaveAttribute("loading", "lazy");
    }
  });

  it("keeps the full wide scientific artwork contained at every breakpoint", () => {
    render(<MediaPage />);

    const section = screen
      .getByRole("heading", {
        name: "Approved web assets, ready to download.",
      })
      .closest("section");
    const mosaic = section?.querySelector("[data-media-asset-index]");

    expect(mosaic?.tagName).toBe("UL");
    expect(mosaic).toHaveClass(
      "sm:grid-cols-2",
      "lg:grid-cols-12",
      "items-stretch",
    );
    expect(mosaic).not.toHaveClass(
      "sm:grid-rows-[24rem_22rem_22rem]",
      "md:grid-rows-[26rem_22rem_22rem]",
      "lg:grid-rows-[22rem_22rem]",
    );
    expect(within(mosaic as HTMLElement).queryByText(/^0[1-4]$/)).not.toBeInTheDocument();

    const wideAssets = [
      {
        name: "Platform sequence + ENDO-205 evidence",
        alt: PLATFORM_MECHANISM_ALT,
      },
      {
        name: "Portfolio architecture visual",
        alt: "Conceptual illustration of the EndoCyclic four-program portfolio architecture",
      },
    ] as const;

    for (const asset of wideAssets) {
      const card = screen
        .getByRole("heading", { name: asset.name })
        .closest("[data-media-asset-card]") as HTMLElement;
      const visual = card.querySelector(
        "[data-media-asset-visual]",
      ) as HTMLElement;
      const image = within(card).getByAltText(asset.alt);
      const copy = card.querySelector(
        "[data-media-asset-copy]",
      ) as HTMLElement;

      expect(card).toHaveAttribute("data-phone-preview", "wide");
      expect(card).toHaveClass(
        "flex",
        "flex-col",
        "sm:flex",
        "sm:flex-col",
      );
      expect(card).not.toHaveClass("grid-cols-[7rem_minmax(0,1fr)]");
      expect(visual).toHaveClass(
        "aspect-[2/1]",
        "overflow-hidden",
      );
      expect(image).toHaveClass("object-contain", "object-center");
      expect(image).not.toHaveClass("sm:object-cover");
      expect(copy).toHaveClass("border-t");
      expect(copy).not.toHaveClass("border-l");

      if (asset.name === "Platform sequence + ENDO-205 evidence") {
        expect(visual).toHaveClass("sm:aspect-[2/1]", "sm:flex-none");
        expect(copy).toHaveClass("sm:flex-[1_0_auto]");
      } else {
        expect(visual).toHaveClass("sm:aspect-[2/1]", "sm:flex-none");
      }
    }
  });

  it("keeps compact assets and publication copy in expanding flow", () => {
    render(<MediaPage />);

    for (const name of ["Primary wordmark", "Founder & CEO portrait"]) {
      const card = screen
        .getByRole("heading", { name })
        .closest("[data-media-asset-card]") as HTMLElement;

      expect(card).toHaveAttribute("data-phone-preview", "compact");
      expect(card).toHaveClass(
        "grid",
        "grid-cols-[7rem_minmax(0,1fr)]",
        "sm:flex",
        "sm:flex-col",
      );
      expect(card.querySelector("[data-media-asset-copy]")).toHaveClass(
        "border-l",
        "sm:border-l-0",
        "sm:border-t",
      );
    }

    const founderDownload = screen.getByRole("link", {
      name: "Download asset: Download high-resolution portrait (JPEG)",
    });

    expect(founderDownload).toHaveAttribute(
      "aria-label",
      "Download asset: Download high-resolution portrait (JPEG)",
    );
    expect(within(founderDownload).getByText("Download asset")).toHaveClass(
      "lg:inline",
    );
    const founderDescription =
      screen.getByText(
        "High-resolution portrait of Dr. Tanya Petrossian, PhD, Founder and CEO of EndoCyclic Therapeutics.",
      );
    expect(founderDescription).not.toHaveClass("lg:hidden");

    const founderCard = founderDescription.closest(
      "[data-media-asset-card]",
    ) as HTMLElement;
    const founderVisual = founderCard.querySelector(
      "[data-media-asset-visual]",
    );
    const founderCopy = founderCard.querySelector("[data-media-asset-copy]");

    expect(founderCard).not.toHaveClass("overflow-hidden");
    expect(founderVisual).toHaveClass("overflow-hidden");
    expect(founderCopy).not.toHaveClass("absolute", "overflow-hidden");
  });

  it("packages scientific visuals with their caption and conceptual-use qualification", () => {
    render(<MediaPage />);

    const mechanismPackage = screen.getByRole("link", {
      name: "Download Platform mechanism visual package (ZIP)",
    });
    const portfolioPackage = screen.getByRole("link", {
      name: "Download visual package: Download Portfolio architecture visual package (ZIP)",
    });

    expect(mechanismPackage).toHaveAttribute(
      "href",
      "/downloads/media/endocyclic-platform-mechanism.zip",
    );
    expect(mechanismPackage).toHaveAttribute(
      "download",
      "endocyclic-platform-mechanism.zip",
    );
    expect(portfolioPackage).toHaveAttribute(
      "href",
      "/downloads/media/endocyclic-portfolio-architecture.zip",
    );
    expect(portfolioPackage).toHaveAttribute(
      "download",
      "endocyclic-portfolio-architecture.zip",
    );

    expect(
      screen.getByText(/Scientific visuals include AVIF and JPEG files/i),
    ).toBeVisible();
    expect(
      screen.getAllByText("ZIP · AVIF + JPEG + use notes"),
    ).toHaveLength(4);
    expect(
      screen.getByRole("link", { name: "Download complete web kit" }),
    ).toHaveAttribute(
      "href",
      `/downloads/media/${mediaKitRelease.archiveName}.zip`,
    );
    expect(
      screen.getByRole("link", { name: "Download complete web kit" }),
    ).toHaveAttribute("download", `${mediaKitRelease.archiveName}.zip`);
    expect(
      screen.getByText(
        `Web kit v${mediaKitRelease.version} · released ${mediaKitRelease.releaseLabel}. Bundle release only; not a regulatory review or product approval.`,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Platform sequence + ENDO-205 evidence",
      })
        .closest("article"),
    ).toHaveAttribute("data-tone", "dark");
    expect(
      screen.getByRole("heading", { name: "Portfolio architecture visual" })
        .closest("article"),
    ).toHaveAttribute("data-tone", "dark");
  });

  it("offers qualified, program-specific visual packages without implying clinical evidence", () => {
    render(<MediaPage />);

    const endoVisual = screen.getByAltText(
      ENDO205_MECHANISM_ALT,
    );
    const femLunaVisual = screen.getByAltText(
      "Conceptual editorial illustration of a targeted imaging agent localizing near a small endometriosis lesion within simplified pelvic anatomy.",
    );

    for (const image of [endoVisual, femLunaVisual]) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image).toHaveAttribute(
        "sizes",
        "(min-width: 1184px) 650px, (min-width: 1024px) 58vw, (min-width: 768px) 50vw, 94vw",
      );
    }

    expect(
      screen.getByRole("link", {
        name: "Download program visual package: ENDO-205 mechanism visual (ZIP)",
      }),
    ).toHaveAttribute(
      "href",
      "/downloads/media/endocyclic-endo-205-mechanism.zip",
    );
    expect(
      screen.getByRole("link", {
        name: "Download program visual package: FemLUNA™ targeting visual (ZIP)",
      }),
    ).toHaveAttribute(
      "href",
      "/downloads/media/endocyclic-femluna-targeting.zip",
    );
    expect(
      screen.getByText(
        "The final state represents the ENDO-205 preclinical lesion-elimination finding; not a patient image, clinical scan, clinical outcome, safety data, or performance data.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Conceptual representation; FemLUNA™ is IND-enabling. Not a patient image, clinical scan, observed detection result, or performance data.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Program-specific artwork, packaged for accurate coverage.",
      }),
    ).toBeVisible();

    const femLunaArticle = screen
      .getByRole("heading", { name: "FemLUNA™ targeting visual" })
      .closest("article");
    const semanticCopy = femLunaArticle?.querySelector(
      "[data-program-asset-copy]",
    );
    const informativeVisual = femLunaArticle?.querySelector(
      "[data-program-asset-visual]",
    );

    expect(femLunaArticle?.firstElementChild).toBe(semanticCopy);
    expect(femLunaArticle).toHaveClass(
      "md:grid-cols-12",
      "md:items-stretch",
    );
    expect(semanticCopy).toHaveClass(
      "md:col-span-6",
      "md:col-start-1",
      "md:row-start-1",
      "lg:col-span-5",
    );
    expect(informativeVisual).toHaveClass(
      "md:col-span-6",
      "md:col-start-7",
      "md:row-start-1",
      "lg:col-start-6",
      "lg:col-span-7",
    );
    expect(
      informativeVisual?.querySelector("img"),
    ).toHaveClass("group-focus-within:scale-[1.015]");
  });

  it("offers newsroom-compatible native-size wordmark and leadership downloads", () => {
    render(<MediaPage />);

    const wordmark = screen.getByAltText("EndoCyclic Therapeutics wordmark");
    const nativePreview = wordmark.closest("[data-native-size]");

    expect(wordmark).toHaveAttribute("width", "233");
    expect(wordmark).toHaveAttribute("height", "70");
    expect(wordmark).not.toHaveAttribute("sizes");
    expect(nativePreview).toHaveAttribute("data-native-size", "233x70");

    const portrait = screen.getByAltText(
      "Dr. Tanya Petrossian, Founder and CEO of EndoCyclic Therapeutics",
    );
    expect(portrait).toHaveAttribute(
      "sizes",
      "(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 41vw",
    );

    expect(
      screen.getByRole("link", { name: "Download transparent wordmark" }),
    ).toHaveAttribute(
      "href",
      "/downloads/media/endocyclic-wordmark-transparent.png",
    );
    expect(
      screen.getByRole("link", {
        name: "Download asset: Download high-resolution portrait (JPEG)",
      }),
    ).toHaveAttribute(
      "href",
      "/downloads/media/tanya-petrossian-endocyclic-v2.jpg",
    );
    expect(
      screen.getByRole("heading", { name: "Founder & CEO portrait" })
        .closest("article"),
    ).toHaveAttribute("data-tone", "dark");
    expect(
      screen.getByRole("group", { name: "Need another file format?" }),
    ).toBeVisible();
  });
});
