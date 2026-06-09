import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Investor relations for EndoCyclic Therapeutics. Access pipeline data, clinical milestones, and partnership opportunities in precision medicine for endometriosis.",
  alternates: {
    canonical: "/investors",
  },
  openGraph: {
    title: "Investors | EndoCyclic Therapeutics",
    description:
      "Pipeline data, clinical milestones, and partnership opportunities in precision medicine for endometriosis.",
    url: "/investors",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Investor Relations — EndoCyclic Therapeutics",
    description:
      "Access pipeline data, clinical milestones, and investor materials for EndoCyclic Therapeutics.",
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
