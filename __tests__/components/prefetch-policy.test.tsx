import type { AnchorHTMLAttributes, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ContactPage from "@/app/contact/ContactPageContent";
import InnovationPage from "@/app/innovation/page";
import InvestorsPage from "@/app/investors/InvestorsPageContent";
import HomeNewsMedia from "@/components/figures/HomeNewsMedia";
import PipelineStageAtlas from "@/components/figures/PipelineStageAtlas";
import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import { CONTACT_SUBJECTS, FOOTER_NAV, NAV_LINKS } from "@/lib/site";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    prefetch,
    ...props
  }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    href: string;
    prefetch?: boolean;
  }) => (
    <a
      href={href}
      data-next-prefetch={String(prefetch)}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/contact",
  useRouter: () => ({ prefetch: vi.fn() }),
}));

function documentFrom(markup: string) {
  const document = window.document.implementation.createHTMLDocument();
  document.body.innerHTML = markup;
  return document;
}

describe("internal link prefetch policy", () => {
  it("keeps offscreen home news and media CTAs out of speculative prefetching", () => {
    const document = documentFrom(renderToStaticMarkup(<HomeNewsMedia />));

    for (const href of ["/news", "/media"]) {
      expect(
        document.querySelector<HTMLAnchorElement>(`a[href="${href}"]`)
          ?.dataset.nextPrefetch,
      ).toBe("false");
    }
  });

  it("keeps innovation pipeline CTAs out of speculative prefetching", () => {
    const document = documentFrom(
      renderToStaticMarkup(<InnovationPage />),
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[aria-label^="Review "][href^="/pipeline#"]',
      ),
    );

    expect(links).toHaveLength(3);
    expect(
      links.every((link) => link.dataset.nextPrefetch === "false"),
    ).toBe(true);
  });

  it("opts investor program deep links out of speculative prefetching", () => {
    const document = documentFrom(renderToStaticMarkup(<InvestorsPage />));
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[aria-label^="Review "][href^="/pipeline#"]',
      ),
    );

    expect(links).toHaveLength(4);
    expect(
      links.every((link) => link.dataset.nextPrefetch === "false"),
    ).toBe(true);
  });

  it("uses native anchors for pipeline links that only update the current hash", () => {
    const document = documentFrom(
      renderToStaticMarkup(<PipelineStageAtlas />),
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/pipeline#"]'),
    );

    expect(links).toHaveLength(4);
    expect(
      links.every((link) => !link.hasAttribute("data-next-prefetch")),
    ).toBe(true);
  });

  it("opts every contact inquiry route out of viewport prefetching", async () => {
    const document = documentFrom(
      renderToStaticMarkup(await ContactPage()),
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#inquiry-routes a"),
    );

    expect(links).toHaveLength(CONTACT_SUBJECTS.length + 1);
    expect(links.every((link) => link.dataset.nextPrefetch === "false")).toBe(
      true,
    );
  });

  it("opts every no-JavaScript navigation fallback link out of prefetching", () => {
    const html = renderToStaticMarkup(<Nav />);
    const fallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];

    expect(fallback).toBeDefined();

    const expectedDestinations = [
      "/",
      ...NAV_LINKS.map((link) => link.href),
      "/investors",
      "/contact?subject=partnership#contact-form",
    ];

    for (const href of expectedDestinations) {
      expect(fallback).toContain(
        `href="${href}" data-next-prefetch="false"`,
      );
    }
  });

  it("opts internal footer destinations out while leaving external links alone", () => {
    const document = documentFrom(renderToStaticMarkup(<Footer />));
    const internalLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('footer a[href^="/"]'),
    );
    const expectedInternalCount =
      1 +
      Object.values(FOOTER_NAV)
        .flat()
        .filter((link) => !("external" in link && link.external)).length;

    expect(internalLinks).toHaveLength(expectedInternalCount);
    expect(
      internalLinks.every(
        (link) => link.dataset.nextPrefetch === "false",
      ),
    ).toBe(true);

    expect(
      document
        .querySelector<HTMLAnchorElement>(
          `footer a[href="${FOOTER_NAV.Connect[0].href}"]`,
        )
        ?.hasAttribute("data-next-prefetch"),
    ).toBe(false);
  });
});
