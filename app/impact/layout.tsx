import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Impact",
  description:
    "Endometriosis affects 190M+ women worldwide, carries a $200B annual US burden, and takes an average of eight years to diagnose. ENDO-205 is designed to eliminate lesions and modify disease biology.",
  path: "/impact",
  socialTitle: "Endometriosis Impact | EndoCyclic Therapeutics",
  socialDescription:
    "The scale of endometriosis — and a non-hormonal, disease-modifying approach designed to change what a diagnosis can mean.",
});

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Impact — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/impact`,
    description:
      "The disease burden of endometriosis and ENDO-205, a non-hormonal precision therapeutic designed to eliminate lesions and modify disease biology.",
    about: {
      "@type": "MedicalCondition",
      name: "Endometriosis",
      description:
        "A chronic disease in which endometrial-like tissue grows outside the uterus — a leading cause of infertility and chronic pelvic pain.",
    },
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
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
