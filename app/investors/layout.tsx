import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "The diligence front door for EndoCyclic Therapeutics. Request data-room access and review investment highlights: FDA IND Allowance (2026) for ENDO-205, a first-in-class non-hormonal platform, and a $180B–$250B market opportunity.",
  alternates: { canonical: "/investors" },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Investor Relations — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/investors",
    description:
      "Investor relations and data-room access for EndoCyclic Therapeutics, a clinical-stage precision medicine company.",
    isPartOf: {
      "@type": "WebSite",
      name: "EndoCyclic Therapeutics",
      url: "https://endocyclic.com",
    },
    about: {
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
