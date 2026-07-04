import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline — Therapeutic & Diagnostic Programs",
  description:
    "EndoCyclic's pipeline: two therapeutic and diagnostic pairs on one non-hormonal precision peptide platform. ENDO-205 (FDA IND Allowance, Phase 1) and FemLUNA™ in endometriosis; ENDO-995 and ENDO-311 in oncology.",
  alternates: {
    canonical: "/pipeline",
  },
  openGraph: {
    title: "Pipeline — Therapeutic & Diagnostic Programs | EndoCyclic Therapeutics",
    description:
      "Four programs, one platform. ENDO-205 (FDA IND Allowance · Phase 1) and FemLUNA™ in endometriosis; ENDO-995 and ENDO-311 in oncology.",
    url: "/pipeline",
  },
};

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Drug",
        name: "ENDO-205",
        description:
          "First-in-class, non-hormonal precision peptide designed to eliminate endometriosis lesions and resolve associated symptoms. FDA IND Allowance (2026); Phase 1.",
        mechanismOfAction:
          "Non-hormonal precision peptide — pH-activated and selectively taken up by diseased tissue",
        drugClass: "Cyclic Peptide Therapeutic",
        clinicalPharmacology:
          "Selective uptake by endometriotic lesions via pH-responsive mechanism",
        legalStatus: "Investigational New Drug (FDA IND Allowance, 2026)",
        manufacturer: {
          "@type": "Organization",
          name: "EndoCyclic Therapeutics",
        },
      },
      {
        "@type": "Drug",
        name: "FemLUNA",
        description:
          "Non-invasive diagnostic imaging agent for early, accurate detection of all subtypes of endometriosis.",
        drugClass: "Targeted Imaging Agent",
        legalStatus: "Investigational",
        manufacturer: {
          "@type": "Organization",
          name: "EndoCyclic Therapeutics",
        },
      },
      {
        "@type": "Drug",
        name: "ENDO-995",
        description:
          "Novel non-hormonal therapeutic peptide for malignant solid tumors, with initial focus on colon and endometrial cancers.",
        mechanismOfAction: "Tumor-Selective Cyclic Peptide",
        drugClass: "Cyclic Peptide Therapeutic",
        legalStatus: "Investigational",
        manufacturer: {
          "@type": "Organization",
          name: "EndoCyclic Therapeutics",
        },
      },
      {
        "@type": "Drug",
        name: "ENDO-311",
        description:
          "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors. Radiation-free, non-hormonal, and free of heavy metals. Companion diagnostic to ENDO-995.",
        drugClass: "Targeted Imaging Agent",
        legalStatus: "Investigational",
        manufacturer: {
          "@type": "Organization",
          name: "EndoCyclic Therapeutics",
        },
      },
    ],
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
