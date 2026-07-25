import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Investor Relations",
  description:
    "Investor diligence for EndoCyclic Therapeutics: ENDO-205 has FDA IND Allowance (2026), is in Phase 1, and leads a four-program precision peptide pipeline with a McKinsey-estimated $180B–$250B global market potential for endometriosis treatments.",
  path: "/investors",
  socialDescription:
    "Investor diligence for EndoCyclic Therapeutics: ENDO-205 has FDA IND Allowance (2026), is in Phase 1, and leads a four-program precision peptide pipeline.",
});

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Investor Relations — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/investors`,
    description:
      "Investor relations and data-room access for EndoCyclic Therapeutics, a clinical-stage precision medicine company.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
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
