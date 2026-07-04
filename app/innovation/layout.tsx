import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "A non-hormonal precision peptide platform with pH-mediated activation and selective uptake by diseased tissue — spanning therapeutics, diagnostics, and oncology. Correction, not destruction.",
  alternates: { canonical: "/innovation" },
  openGraph: {
    title: "Platform | EndoCyclic Therapeutics",
    description:
      "A non-hormonal precision peptide that stays inert until it reaches the acidic microenvironment of disease — designed to correct, not destroy.",
    url: "https://endocyclic.com/innovation",
  },
};

export default function InnovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Platform — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/innovation",
    description:
      "A non-hormonal precision peptide platform with pH-mediated activation and selective uptake by diseased tissue, spanning therapeutics, diagnostics, and oncology.",
    about: {
      "@type": "MedicalTherapy",
      name: "Precision peptide platform",
      description:
        "Proprietary precision peptides with pH-mediated activation and selective uptake by diseased tissue via a proprietary endocytic pathway. Non-hormonal mechanism of action.",
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
