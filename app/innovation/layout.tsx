import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation — Cyclic Peptide Platform",
  description:
    "Explore EndoCyclic's proprietary cyclic peptide platform — pH-activated, lesion-selective drug delivery with first-in-class mechanism of action for endometriosis treatment.",
  alternates: {
    canonical: "/innovation",
  },
  openGraph: {
    title: "Innovation — Cyclic Peptide Platform | EndoCyclic Therapeutics",
    description:
      "pH-activated, lesion-selective cyclic peptides. A new class of targeted, non-hormonal therapeutics.",
    url: "/innovation",
  },
};

export default function InnovationLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: "EndoCyclic Cyclic Peptide Platform",
    description:
      "Proprietary cyclic peptide platform with pH-activated, lesion-selective drug delivery. First-in-class mechanism of action for endometriosis and oncology.",
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
