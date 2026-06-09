import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Latest press releases, publications, awards, and media coverage from EndoCyclic Therapeutics. Stay updated on our clinical progress and milestones.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News & Media | EndoCyclic Therapeutics",
    description:
      "Press releases, publications, and awards from EndoCyclic Therapeutics.",
    url: "/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "EndoCyclic Therapeutics News & Media",
    description:
      "Latest press releases, publications, awards, and media coverage from EndoCyclic Therapeutics.",
    publisher: {
      "@type": "Organization",
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
