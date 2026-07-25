import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Platform",
  description:
    "A non-hormonal precision peptide platform with selective uptake by diseased tissue and pH-mediated activation — spanning therapeutics, diagnostics, and oncology. Correction, not destruction.",
  path: "/innovation",
  socialTitle: "Precision Peptide Platform | EndoCyclic Therapeutics",
  socialDescription:
    "A non-hormonal precision peptide platform with selective uptake by diseased tissue and pH-mediated activation — designed for correction, not destruction.",
});

export default function InnovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Platform — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/innovation`,
    description:
      "A non-hormonal precision peptide platform with selective uptake by diseased tissue and pH-mediated activation, spanning therapeutics, diagnostics, and oncology.",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: {
      "@type": "MedicalEntity",
      name: "Precision peptide platform",
      description:
        "Proprietary precision peptides with selective uptake by diseased tissue via a proprietary endocytic pathway and pH-mediated activation. Non-hormonal mechanism of action.",
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
