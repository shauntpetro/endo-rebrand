import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imaging & Diagnostics — FemLUNA™ & ENDO-311",
  description:
    "FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for endometriosis, detecting superficial and sub-millimeter lesions. ENDO-311 is an investigational oncology imaging agent — radiation-free, non-hormonal, and free of heavy metals.",
  alternates: {
    canonical: "/imaging",
  },
  openGraph: {
    title: "Imaging & Diagnostics — FemLUNA™ & ENDO-311 | EndoCyclic Therapeutics",
    description:
      "Non-invasive endometriosis imaging with FemLUNA™ and investigational oncology imaging with ENDO-311. See what laparoscopy can’t.",
    url: "/imaging",
  },
};

export default function ImagingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalDevice",
    name: "FemLUNA",
    description:
      "Non-invasive diagnostic imaging agent developed to be the first definitive diagnostic for endometriosis, capable of detecting superficial and sub-millimeter lesions often missed by current imaging. Radiation-free, non-hormonal, and free of heavy metals.",
    manufacturer: {
      "@type": "Organization",
      name: "EndoCyclic Therapeutics",
    },
    medicalSpecialty: "https://schema.org/Gynecologic",
    relevantSpecialty: "Diagnostic Imaging",
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
