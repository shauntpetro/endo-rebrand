import { render } from "@testing-library/react";
import { statSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import ContactLayout from "@/app/contact/layout";
import InnovationLayout from "@/app/innovation/layout";
import MediaLayout from "@/app/media/layout";
import PipelineLayout from "@/app/pipeline/layout";
import sitemap, { createSitemap } from "@/app/sitemap";
import {
  FOUNDER_ID,
  ORGANIZATION_ID,
  PUBLIC_ROUTES,
  SITE_ORIGIN,
  SOCIAL_IMAGES,
  WEBSITE_ID,
  createPageMetadata,
  hasValidSiteOrigin,
  resolveSiteOrigin,
} from "@/lib/metadata";
import { PIPELINE, TEAM } from "@/lib/site";

function renderStructuredData(
  Layout: ({ children }: { children: React.ReactNode }) => React.ReactNode,
) {
  const { container } = render(
    <Layout>
      <div />
    </Layout>,
  );

  return JSON.parse(
    container.querySelector('script[type="application/ld+json"]')
      ?.textContent ?? "{}",
  );
}

describe("public metadata", () => {
  it("publishes canonical page metadata from the shared site origin", () => {
    const metadata = createPageMetadata({
      title: "Pipeline",
      description: "Pipeline description",
      path: "/pipeline",
    });

    expect(metadata.alternates).toEqual({ canonical: "/pipeline" });
    expect(metadata.openGraph).toMatchObject({
      url: `${SITE_ORIGIN}/pipeline`,
    });
  });

  it("publishes one versioned social image for every public route", async () => {
    expect(Object.keys(SOCIAL_IMAGES)).toEqual(PUBLIC_ROUTES);

    const imageUrls = PUBLIC_ROUTES.map((path) => SOCIAL_IMAGES[path].url);
    expect(new Set(imageUrls)).toHaveProperty("size", PUBLIC_ROUTES.length);

    await Promise.all(
      PUBLIC_ROUTES.map(async (path) => {
        const descriptor = SOCIAL_IMAGES[path];
        const publicPath = new URL(descriptor.url).pathname;
        const assetPath = resolve(
          process.cwd(),
          "public",
          publicPath.replace(/^\//, ""),
        );
        const image = await sharp(assetPath).metadata();

        expect(publicPath).toMatch(/^\/social\/endocyclic-[a-z-]+-v\d+\.jpg$/);
        expect(descriptor).toMatchObject({
          width: 1200,
          height: 630,
          type: "image/jpeg",
        });
        expect(descriptor.alt.length).toBeGreaterThan(30);
        expect(image).toMatchObject({
          format: "jpeg",
          width: 1200,
          height: 630,
          space: "srgb",
        });
        expect(statSync(assetPath).size).toBeLessThanOrEqual(300_000);

        const metadata = createPageMetadata({
          title: "Route title",
          description: "Route description",
          path,
        });

        expect(metadata.openGraph?.images).toEqual([descriptor]);
        expect(metadata.twitter?.images).toEqual([descriptor]);
      }),
    );
  });

  it("keeps recently revised route cards aligned with their page headlines", () => {
    expect(SOCIAL_IMAGES["/"]).toMatchObject({
      url: expect.stringContaining("endocyclic-home-v6.jpg"),
      alt: expect.stringContaining(
        "Precision peptides, activated through pH.",
      ),
    });
    expect(SOCIAL_IMAGES["/innovation"]).toMatchObject({
      url: expect.stringContaining("endocyclic-innovation-v5.jpg"),
      alt: expect.stringContaining(
        "A selective route into diseased tissue.",
      ),
    });
    expect(SOCIAL_IMAGES["/pipeline"]).toMatchObject({
      url: expect.stringContaining("endocyclic-pipeline-v3.jpg"),
      alt: expect.stringContaining(
        "One precision peptide platform. Four programs.",
      ),
    });
    expect(SOCIAL_IMAGES["/team"]).toMatchObject({
      url: expect.stringContaining("endocyclic-team-v11.jpg"),
      alt: expect.stringContaining("Founder-led into the clinic."),
    });
    expect(SOCIAL_IMAGES["/contact"]).toMatchObject({
      url: expect.stringContaining("endocyclic-contact-v3.jpg"),
      alt: expect.stringContaining("Connect with EndoCyclic."),
    });
    expect(SOCIAL_IMAGES["/investors"]).toMatchObject({
      url: expect.stringContaining("endocyclic-investors-v3.jpg"),
      alt: expect.stringContaining(
        "ENDO-205: FDA IND Allowance. Phase 1.",
      ),
    });
    expect(SOCIAL_IMAGES["/media"]).toMatchObject({
      url: expect.stringContaining("endocyclic-media-v9.jpg"),
      alt: expect.stringContaining(
        "Accurate company information, ready to use.",
      ),
    });
  });

  it("publishes no sitemap URLs until the canonical origin is configured", () => {
    expect(sitemap()).toEqual([]);
  });

  it("keeps configured sitemap freshness honest until editorial review dates exist", () => {
    const configuredOrigin = "https://www.endocyclictherapeutics.com";
    const entries = createSitemap(configuredOrigin, true);

    expect(entries).toHaveLength(10);
    expect(entries[0]).toEqual({ url: configuredOrigin });
    expect(
      entries.every(
        (entry) =>
          entry.lastModified === undefined &&
          entry.changeFrequency === undefined &&
          entry.priority === undefined,
      ),
    ).toBe(true);
  });

  it("normalizes an explicit HTTPS origin and ignores blank or malformed values", () => {
    expect(resolveSiteOrigin(" https://www.endocyclictherapeutics.com/ ")).toBe(
      "https://www.endocyclictherapeutics.com",
    );
    expect(resolveSiteOrigin("")).toBe("https://endocyclic.invalid");
    expect(resolveSiteOrigin("not-a-url")).toBe("https://endocyclic.invalid");
    expect(resolveSiteOrigin("http://endocyclic.com")).toBe(
      "https://endocyclic.invalid",
    );
    expect(
      resolveSiteOrigin("https://www.endocyclictherapeutics.com/path"),
    ).toBe(
      "https://endocyclic.invalid",
    );
    expect(hasValidSiteOrigin("")).toBe(false);
    expect(hasValidSiteOrigin("https://www.endocyclictherapeutics.com")).toBe(
      true,
    );
  });

  it("connects pipeline entities to stable organization, website, and program URLs", () => {
    const { container } = render(
      <PipelineLayout>
        <div />
      </PipelineLayout>,
    );
    const jsonLd = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? "{}",
    );

    expect(jsonLd.isPartOf).toEqual({ "@id": WEBSITE_ID });
    expect(jsonLd.publisher).toEqual({ "@id": ORGANIZATION_ID });
    expect(jsonLd.mainEntity["@type"]).toBe("ItemList");
    expect(jsonLd.mainEntity.itemListElement).toHaveLength(PIPELINE.length);
    expect(jsonLd.mainEntity.itemListElement[0].item.url).toBe(
      `${SITE_ORIGIN}/pipeline#endo-205`,
    );
  });

  it("describes the cross-modality platform without narrowing it to a therapy", () => {
    const innovation = renderStructuredData(InnovationLayout);

    expect(innovation.about).toMatchObject({
      "@type": "MedicalEntity",
      name: "Precision peptide platform",
    });
    expect(innovation.about["@type"]).not.toBe("MedicalTherapy");
  });

  it("omits blank public inboxes from contact and media structured data", () => {
    const contact = renderStructuredData(ContactLayout);
    const media = renderStructuredData(MediaLayout);

    expect(contact.mainEntity).not.toHaveProperty("email");
    expect(contact.mainEntity).not.toHaveProperty("contactPoint");
    expect(media.about).not.toHaveProperty("email");
  });

  it("keeps the team biography founder-led and within approved company language", () => {
    expect(TEAM[0]).toMatchObject({
      name: "Dr. Tanya Petrossian, PhD",
      role: "Founder & CEO",
    });
    expect(TEAM[0].bio).toContain("clinical-stage precision medicine company");
    expect(TEAM[0].bio).toContain("proprietary precision peptide platform");
    expect(TEAM[0].bio).not.toContain("Phase 1");
    expect(TEAM[0].bio).not.toContain("FDA IND clearance");
  });

  it("uses one stable founder identity across public structured data", () => {
    const media = renderStructuredData(MediaLayout);

    expect(media.about).toMatchObject({
      "@id": ORGANIZATION_ID,
      name: "EndoCyclic Therapeutics",
      legalName: "EndoCyclic Therapeutics, Inc.",
      founder: { "@id": FOUNDER_ID },
    });
  });
});
