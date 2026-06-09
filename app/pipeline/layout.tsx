import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline — Therapeutic & Diagnostic Programs",
  description:
    "EndoCyclic's clinical and preclinical pipeline: ENDO-205 (IND cleared, Phase 1 for endometriosis), ENDO-995 (oncology), and FemLUNA diagnostic imaging agent.",
  alternates: {
    canonical: "/pipeline",
  },
  openGraph: {
    title: "Pipeline — Therapeutic & Diagnostic Programs | EndoCyclic Therapeutics",
    description:
      "ENDO-205: IND cleared, first-in-class non-hormonal endometriosis therapy. ENDO-995: targeted oncology. FemLUNA: diagnostic imaging.",
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
          "First-in-class non-hormonal therapeutic targeting the root cause of endometriosis lesions. IND cleared by the FDA.",
        mechanismOfAction:
          "Intracellular Peptide Inhibitor — pH-activated cyclic peptide selectively absorbed by diseased tissue",
        drugClass: "Cyclic Peptide Therapeutic",
        clinicalPharmacology:
          "Selective uptake by endometriotic lesions via pH-responsive mechanism",
        legalStatus: "Investigational New Drug (IND cleared)",
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
