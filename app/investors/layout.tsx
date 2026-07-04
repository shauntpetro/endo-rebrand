import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "The diligence front door for EndoCyclic Therapeutics. Investment highlights, an FDA IND Allowance (2026) lead program, and a confidential data room request for qualified investors and partners.",
  alternates: {
    canonical: "/investors",
  },
  openGraph: {
    title: "Investors | EndoCyclic Therapeutics",
    description:
      "Investment highlights and a confidential data room request for qualified investors and partners in non-hormonal precision medicine.",
    url: "/investors",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Investor Relations — EndoCyclic Therapeutics",
    description:
      "Investment highlights, clinical milestones, and a confidential data room request for EndoCyclic Therapeutics.",
    mainEntity: {
      "@type": "Organization",
      name: "EndoCyclic Therapeutics",
      url: "https://endocyclic.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Irvine",
        addressRegion: "CA",
        addressCountry: "US",
      },
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
