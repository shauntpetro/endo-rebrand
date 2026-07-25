import type { Metadata } from "next";
import {
  ORGANIZATION_ID,
  SITE_ORIGIN,
  WEBSITE_ID,
  createPageMetadata,
} from "@/lib/metadata";
import { NEWS } from "@/lib/site";

const ORDERED_NEWS = [...NEWS].sort(
  (a, b) =>
    (b.dateTime ? Date.parse(b.dateTime) : 0) -
      (a.dateTime ? Date.parse(a.dateTime) : 0) || b.id - a.id,
);

export const metadata: Metadata = createPageMetadata({
  title: "News & Recognition",
  description:
    "Selected company announcements, awards, institutional profiles, and external coverage from EndoCyclic Therapeutics.",
  path: "/news",
});

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Recognition — EndoCyclic Therapeutics",
    url: `${SITE_ORIGIN}/news`,
    description:
      "Selected company announcements, awards, institutional profiles, and external coverage from EndoCyclic Therapeutics.",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      name: "Selected EndoCyclic Therapeutics news and recognition",
      numberOfItems: NEWS.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: ORDERED_NEWS.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          ...(article.dateTime ? { datePublished: article.dateTime } : {}),
          url: article.link,
          publisher: {
            "@type": "Organization",
            name: article.source,
          },
          about: {
            "@id": ORGANIZATION_ID,
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
