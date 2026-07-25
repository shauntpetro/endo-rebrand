import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Imaging & Diagnostics",
  description:
    "FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for endometriosis — detecting superficial and sub-millimeter lesions often missed by current imaging and offering a non-invasive alternative to laparoscopy.",
  path: "/imaging",
  socialTitle: "FemLUNA™ Imaging & Diagnostics | EndoCyclic Therapeutics",
  socialDescription:
    "FemLUNA™ — developed as the first non-invasive, definitive diagnostic for endometriosis, detecting lesions often missed by current imaging. Plus ENDO-311, an investigational oncology imaging agent.",
});

export default function ImagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Imaging & Diagnostics — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/imaging`,
    description:
      "FemLUNA™ is developed to be the first non-invasive, definitive diagnostic for endometriosis, detecting superficial and sub-millimeter lesions often missed by current imaging methods. ENDO-311 is an investigational oncology imaging agent.",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: [
      {
        "@type": "MedicalEntity",
        name: "FemLUNA™",
        description:
          "Investigational targeted imaging agent developed as the first non-invasive, definitive diagnostic for endometriosis and as a non-invasive alternative to laparoscopy.",
      },
      {
        "@type": "MedicalEntity",
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
