import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imaging & Diagnostics",
  description:
    "FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for endometriosis — detecting superficial and sub-millimeter lesions often missed by current imaging and offering a non-invasive alternative to laparoscopy.",
  alternates: { canonical: "/imaging" },
  openGraph: {
    title: "Imaging & Diagnostics | EndoCyclic Therapeutics",
    description:
      "FemLUNA™ — developed as the first non-invasive, definitive diagnostic for endometriosis, detecting lesions often missed by current imaging. Plus ENDO-311, an investigational oncology imaging agent.",
    url: "https://endocyclic.com/imaging",
    type: "website",
  },
};

export default function ImagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Imaging & Diagnostics — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/imaging",
    description:
      "FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for endometriosis, detecting superficial and sub-millimeter lesions often missed by current imaging methods. ENDO-311 is an investigational oncology imaging agent.",
    isPartOf: {
      "@type": "MedicalOrganization",
      name: "EndoCyclic Therapeutics",
      url: "https://endocyclic.com",
    },
    about: [
      {
        "@type": "MedicalDevice",
        name: "FemLUNA",
        description:
          "Investigational targeted imaging agent developed as the first non-invasive, definitive diagnostic for endometriosis and as a non-invasive alternative to laparoscopy.",
      },
      {
        "@type": "MedicalDevice",
        name: "ENDO-311",
        description:
          "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors. Radiation-free, non-hormonal, and free of heavy metals; companion diagnostic to ENDO-995.",
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
