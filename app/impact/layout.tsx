import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Endometriosis affects 190M+ women worldwide, carries a $200B annual US burden, and takes an average of eight years to diagnose. EndoCyclic is working to eliminate lesions and modify disease — not mask symptoms.",
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Impact | EndoCyclic Therapeutics",
    description:
      "The scale of endometriosis — and a non-hormonal, disease-modifying approach designed to change what a diagnosis can mean.",
    url: "https://endocyclic.com/impact",
    type: "website",
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Impact — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/impact",
    description:
      "The disease burden of endometriosis and EndoCyclic's mission to eliminate lesions and modify disease with a non-hormonal precision approach.",
    about: {
      "@type": "MedicalCondition",
      name: "Endometriosis",
      description:
        "A chronic disease in which endometrial-like tissue grows outside the uterus — a leading cause of infertility and chronic pelvic pain.",
    },
    isPartOf: {
      "@type": "MedicalOrganization",
      name: "EndoCyclic Therapeutics",
      url: "https://endocyclic.com",
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
