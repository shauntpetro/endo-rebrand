import type { Metadata } from "next";
import {
  FOUNDER_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Media Kit",
  description:
    "Access approved EndoCyclic Therapeutics boilerplate and key facts, download publication assets, or submit a media inquiry.",
  path: "/media",
  socialDescription:
    "Approved EndoCyclic boilerplate, key facts, downloadable publication assets, and a direct media inquiry route.",
});

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Media Kit — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/media`,
    description:
      "Press resources for EndoCyclic Therapeutics, including approved boilerplate, key facts, downloadable publication assets, and a media inquiry route.",
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "Corporation",
      "@id": ORGANIZATION_ID,
      name: SITE.name,
      legalName: SITE.legalName,
      ...(SITE.email ? { email: SITE.email } : {}),
      location: SITE.location,
      founder: { "@id": FOUNDER_ID },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
