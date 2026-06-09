import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imaging — FemLUNA Diagnostic Platform",
  description:
    "FemLUNA: EndoCyclic's non-invasive diagnostic imaging agent for endometriosis. Selective lesion uptake enables earlier, more accurate detection without surgery.",
  alternates: {
    canonical: "/imaging",
  },
  openGraph: {
    title: "Imaging — FemLUNA Diagnostic Platform | EndoCyclic Therapeutics",
    description:
      "Non-invasive endometriosis imaging. Selective lesion uptake for earlier, accurate detection.",
    url: "/imaging",
  },
};

export default function ImagingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalDevice",
    name: "FemLUNA",
    description:
      "Non-invasive diagnostic imaging agent for endometriosis. Selective lesion uptake enables earlier, more accurate detection without surgery. Radiation-free, non-hormonal, and free of heavy metals.",
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
