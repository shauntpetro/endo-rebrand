import type { Metadata } from "next";
import { TEAM, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind EndoCyclic Therapeutics — led by founder and CEO Dr. Tanya Petrossian, with deep expertise across peptide chemistry, regulatory affairs, oncology, and women's health.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team | EndoCyclic Therapeutics",
    description:
      "Led by Dr. Tanya Petrossian, EndoCyclic's team spans peptide chemistry, regulatory affairs, oncology, and women's health.",
    url: "https://endocyclic.com/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Team — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/team",
    about: {
      "@type": "Organization",
      name: SITE.legalName,
      employee: TEAM.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        image: `https://endocyclic.com${m.image}`,
        worksFor: { "@type": "Organization", name: SITE.legalName },
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
