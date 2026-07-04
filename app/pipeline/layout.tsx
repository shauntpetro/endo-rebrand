import type { Metadata } from "next";
import { PIPELINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pipeline",
  description:
    "Four programs across endometriosis and oncology — two therapeutic and diagnostic pairs built on one non-hormonal precision peptide platform. ENDO-205 (Phase 1), FemLUNA™, ENDO-995, and ENDO-311.",
  alternates: { canonical: "/pipeline" },
  openGraph: {
    title: "Pipeline | EndoCyclic Therapeutics",
    description:
      "Four programs across endometriosis and oncology — two therapeutic and diagnostic pairs built on one non-hormonal precision peptide platform.",
    url: "https://endocyclic.com/pipeline",
  },
};

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EndoCyclic Therapeutics Pipeline",
    description:
      "Clinical and preclinical programs across endometriosis and oncology on one non-hormonal precision peptide platform.",
    itemListElement: PIPELINE.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MedicalTherapy",
        name: c.name,
        description: c.summary,
        relevantSpecialty:
          c.area === "Oncology" ? "https://schema.org/Oncologic" : "https://schema.org/Gynecologic",
      },
    })),
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
