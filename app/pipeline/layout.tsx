import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";
import { PIPELINE } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Pipeline",
  description:
    "Four therapeutic and diagnostic programs across endometriosis and oncology, built on one non-hormonal precision peptide platform: ENDO-205 (Phase 1), FemLUNA™, ENDO-995, and ENDO-311.",
  path: "/pipeline",
  socialTitle: "Development Pipeline | EndoCyclic Therapeutics",
  socialDescription:
    "Four therapeutic and diagnostic programs across endometriosis and oncology, built on one non-hormonal precision peptide platform.",
});

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "EndoCyclic Therapeutics Pipeline",
    url: `${SITE_ORIGIN}/pipeline`,
    description:
      "Clinical and preclinical programs across endometriosis and oncology on one non-hormonal precision peptide platform.",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      name: "EndoCyclic Therapeutics development programs",
      numberOfItems: PIPELINE.length,
      itemListElement: PIPELINE.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type":
            c.modality === "Diagnostic" ? "MedicalEntity" : "MedicalTherapy",
          name: c.name,
          url: `${SITE_ORIGIN}/pipeline#${c.id.toLowerCase()}`,
          description: c.summary,
          relevantSpecialty:
            c.area === "Oncology"
              ? "https://schema.org/Oncologic"
              : "https://schema.org/Gynecologic",
        },
      })),
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
