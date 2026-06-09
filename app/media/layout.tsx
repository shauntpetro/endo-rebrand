import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "EndoCyclic Therapeutics media kit. Download logos, company boilerplate, key facts, and press contact information.",
  alternates: {
    canonical: "/media",
  },
  openGraph: {
    title: "Media Kit | EndoCyclic Therapeutics",
    description:
      "Download logos, company boilerplate, key facts, and press contact information.",
    url: "/media",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Media Kit — EndoCyclic Therapeutics",
    description:
      "Press resources, logos, company boilerplate, and media contact information for EndoCyclic Therapeutics.",
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
