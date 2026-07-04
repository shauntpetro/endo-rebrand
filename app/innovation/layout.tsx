import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation — The Precision Peptide Platform",
  description:
    "EndoCyclic's proprietary precision peptide platform: pH-mediated activation and selective uptake by diseased tissue via a proprietary endocytic pathway. Non-hormonal, designed to act only where disease lives — spanning therapeutics, diagnostics, and oncology.",
  alternates: {
    canonical: "/innovation",
  },
  openGraph: {
    title: "Innovation — The Precision Peptide Platform | EndoCyclic Therapeutics",
    description:
      "pH-activated, tissue-selective, non-hormonal precision peptides. A new grammar for medicine — correction, not destruction.",
    url: "/innovation",
  },
};

export default function InnovationLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "EndoCyclic Precision Peptide Platform",
    description:
      "Proprietary precision peptide platform with pH-mediated activation and selective uptake by diseased tissue via a proprietary endocytic pathway. Non-hormonal, designed to act only in diseased tissue while avoiding hormones, surgery, and systemic toxicity. Spans therapeutics, diagnostics, and oncology.",
    funder: {
      "@type": "Organization",
      name: "National Institutes of Health (NIH)",
    },
    sponsor: {
      "@type": "Organization",
      name: "EndoCyclic Therapeutics",
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
