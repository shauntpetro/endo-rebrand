import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with EndoCyclic Therapeutics — partnership and business development, investor relations, media, data room access, and careers. Based in Irvine, California.",
  path: "/contact",
  socialDescription:
    "Get in touch with EndoCyclic Therapeutics — partnership, investor relations, media, and general inquiries.",
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/contact`,
    description:
      "Contact EndoCyclic Therapeutics for partnership, investor relations, media, data room access, and general inquiries.",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "Corporation",
      "@id": ORGANIZATION_ID,
      name: SITE.name,
      legalName: SITE.legalName,
      ...(SITE.email ? { email: SITE.email } : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Irvine",
        addressRegion: "CA",
        addressCountry: "US",
      },
      ...(SITE.email
        ? {
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "General inquiries",
              email: SITE.email,
            },
          }
        : {}),
      sameAs: [SITE.linkedin],
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
