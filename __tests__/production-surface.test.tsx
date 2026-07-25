import { Children, isValidElement, type ReactElement } from "react";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Hanken_Grotesk: () => ({ variable: "--font-hanken-test" }),
}));

vi.mock("@sentry/nextjs", () => ({
  withSentryConfig: (config: unknown) => config,
}));

import RootLayout, {
  metadata as rootMetadata,
  revalidate as rootRevalidate,
  viewport as rootViewport,
} from "@/app/layout";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as notFoundMetadata } from "@/app/not-found";
import {
  dynamic as formResponseDynamic,
  revalidate as formResponseRevalidate,
} from "@/app/form-response/page";
import { createRobots } from "@/app/robots";
import { FOUNDER_ID } from "@/lib/metadata";
import nextConfig from "@/next.config";

function getRootStructuredData() {
  const root = RootLayout({ children: <main /> });
  const head = Children.toArray(root.props.children).find(
    (child) => isValidElement(child) && child.type === "head",
  ) as ReactElement<{ children: ReactElement }> | undefined;
  const script = head
    ? Children.toArray(head.props.children).find(
        (child) =>
          isValidElement<{ type?: string }>(child) &&
          child.type === "script" &&
          child.props.type === "application/ld+json",
      )
    : undefined;

  if (!isValidElement<{ dangerouslySetInnerHTML: { __html: string } }>(script)) {
    throw new Error("Root JSON-LD script was not found");
  }

  return JSON.parse(script.props.dangerouslySetInnerHTML.__html);
}

describe("production surface hardening", () => {
  it("keeps the root canonical neutral while defining canonical metadata on home", () => {
    expect(rootMetadata.alternates).toBeUndefined();
    expect(homeMetadata.alternates).toEqual({ canonical: "/" });
    expect(rootMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    });
    expect(notFoundMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("does not publish an unsupported medicalSpecialty on Corporation schema", () => {
    const graph = getRootStructuredData()["@graph"];
    const corporation = graph.find(
      (entity: { "@type"?: string }) => entity["@type"] === "Corporation",
    );

    expect(corporation).toBeDefined();
    expect(corporation).not.toHaveProperty("medicalSpecialty");
    expect(corporation).toMatchObject({
      name: "EndoCyclic Therapeutics",
      legalName: "EndoCyclic Therapeutics, Inc.",
      founder: { "@id": FOUNDER_ID },
    });
  });

  it("keeps browser chrome and responsive image candidates aligned to the current surface", () => {
    expect(rootViewport.themeColor).toBe("#FFF8F4");
    expect(nextConfig.images?.deviceSizes).toEqual(
      expect.arrayContaining([384, 480, 560, 640, 650, 700, 1120, 1280]),
    );
    expect(nextConfig.images?.imageSizes).not.toContain(384);
  });

  it("bounds public HTML caching while keeping form outcomes private", () => {
    expect(rootRevalidate).toBe(300);
    expect(nextConfig.expireTime).toBe(3600);
    expect(formResponseDynamic).toBe("force-dynamic");
    expect(formResponseRevalidate).toBe(0);
  });

  it("keeps concept route templates outside the production app tree", () => {
    const productionEntries = [
      "app/concepts/layout.tsx",
      "app/concepts/page.tsx",
      "app/concepts/[concept]/page.tsx",
    ];
    const localTemplates = [
      "tools/concept-lab/routes/layout.tsx",
      "tools/concept-lab/routes/page.tsx",
      "tools/concept-lab/routes/[concept]/page.tsx",
    ];

    for (const entry of productionEntries) {
      expect(existsSync(resolve(process.cwd(), entry))).toBe(false);
    }
    for (const template of localTemplates) {
      expect(existsSync(resolve(process.cwd(), template))).toBe(true);
    }

    const packageJson = JSON.parse(
      readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
    );
    expect(packageJson.dependencies).not.toHaveProperty("@gsap/react");
    expect(packageJson.dependencies).not.toHaveProperty(
      "embla-carousel-react",
    );
    expect(packageJson.devDependencies).toMatchObject({
      "@gsap/react": expect.any(String),
      "embla-carousel-react": expect.any(String),
    });
  });

  it("disallows internal and submission routes for a configured public origin", () => {
    expect(
      createRobots("https://www.endocyclictherapeutics.com", true),
    ).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/concepts"],
      },
      sitemap: "https://www.endocyclictherapeutics.com/sitemap.xml",
    });

    expect(
      createRobots("https://endocyclic.invalid", false),
    ).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/concepts"],
      },
    });
  });

  it("suppresses framework disclosure and defends concept responses at the HTTP layer", async () => {
    expect(nextConfig.poweredByHeader).toBe(false);

    const entries =
      typeof nextConfig.headers === "function"
        ? await nextConfig.headers()
        : [];
    const conceptHeaders = entries.find(
      (entry) => entry.source === "/concepts/:path*",
    );
    const socialHeaders = entries.find(
      (entry) => entry.source === "/social/:path*",
    );
    const investorSummaryHeaders = entries.find(
      (entry) =>
        entry.source ===
        "/downloads/endocyclic-investor-summary-v2.pdf",
    );
    const mediaKitHeaders = entries.find(
      (entry) =>
        entry.source ===
        "/downloads/media/endocyclic-media-kit-web-v12.zip",
    );
    const previousMediaKitHeaders = entries.find(
      (entry) =>
        entry.source ===
        "/downloads/media/endocyclic-media-kit-web-v11.zip",
    );
    const globalHeaders = entries.find(
      (entry) => entry.source === "/(.*)",
    );
    const csp = globalHeaders?.headers.find(
      (header) => header.key === "Content-Security-Policy",
    )?.value;

    expect(conceptHeaders?.headers).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex, nofollow, noarchive",
    });
    expect(socialHeaders?.headers).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    });
    expect(investorSummaryHeaders?.headers).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    });
    expect(mediaKitHeaders?.headers).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    });
    expect(previousMediaKitHeaders?.headers).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    });
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("https://*.sentry.io");
    expect(csp?.match(/script-src[^;]*/)?.[0]).not.toContain("sentry");
    expect(globalHeaders?.headers).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex, nofollow, noarchive",
    });
  });

  it("keeps legacy public URLs on permanent canonical redirects", async () => {
    const redirects =
      typeof nextConfig.redirects === "function"
        ? await nextConfig.redirects()
        : [];

    expect(redirects).toContainEqual({
      source: "/peptide",
      destination: "/innovation",
      permanent: true,
    });
    expect(redirects).toContainEqual({
      source: "/downloads/endocyclic-investor-summary.pdf",
      destination: "/downloads/endocyclic-investor-summary-v2.pdf",
      permanent: true,
    });
  });

  it("defines a bounded Railway startup health check", () => {
    const railway = JSON.parse(
      readFileSync(resolve(process.cwd(), "railway.json"), "utf8"),
    );

    expect(railway.deploy).toMatchObject({
      healthcheckPath: "/",
      healthcheckTimeout: 30,
    });
  });
});
