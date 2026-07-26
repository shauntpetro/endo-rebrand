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
  title: "Leadership",
  description:
    "Founder and CEO Dr. Tanya Petrossian leads EndoCyclic Therapeutics, with functional leads across nonclinical toxicology, CMC, clinical affairs, regulatory affairs, and biostatistics.",
  path: "/team",
  socialDescription:
    "Led by founder and CEO Dr. Tanya Petrossian, with functional leads carrying ENDO-205 through development across endometriosis and oncology.",
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Leadership — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/team`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: SITE.founder,
      jobTitle: "Founder & CEO",
      image: `${SITE_ORIGIN}/team/tanya-petrossian-v2.avif`,
      worksFor: { "@id": ORGANIZATION_ID },
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
