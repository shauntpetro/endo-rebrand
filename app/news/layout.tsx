import type { Metadata } from "next";
import { NEWS } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Recognition",
  description:
    "Press releases, awards, and interviews from EndoCyclic Therapeutics — including the rare NIH 'Perfect 10' grant, NICHD recognition, and coverage of ENDO-205.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Recognition | EndoCyclic Therapeutics",
    description:
      "Press releases, awards, and interviews from EndoCyclic Therapeutics — including the rare NIH 'Perfect 10' grant, NICHD recognition, and coverage of ENDO-205.",
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
      "Press releases, awards, and interviews from EndoCyclic Therapeutics.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: NEWS.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: a.link,
        name: a.title,
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
