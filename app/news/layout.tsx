import type { Metadata } from "next";
import { NEWS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Recognition",
  description:
    "Selected awards, external coverage, and interviews from EndoCyclic Therapeutics — including the rare NIH 'Perfect 10' grant for ENDO-205.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Recognition | EndoCyclic Therapeutics",
    description:
      "Selected awards, external coverage, and interviews from EndoCyclic Therapeutics.",
    url: "https://endocyclic.com/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Recognition — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/news",
    description:
      "Selected awards, external coverage, and interviews from EndoCyclic Therapeutics.",
    mainEntity: {
      "@type": "ItemList",
      name: "Selected EndoCyclic Therapeutics news and recognition",
      numberOfItems: NEWS.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: NEWS.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          datePublished: article.dateTime,
          url: article.link,
          publisher: {
            "@type": "Organization",
            name: article.source,
          },
          about: {
            "@type": "Organization",
            name: SITE.legalName,
            url: "https://endocyclic.com",
          },
        },
      })),
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
