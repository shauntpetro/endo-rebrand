import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The founder-led team advancing EndoCyclic Therapeutics' precision peptide platform and Phase 1 lead program, ENDO-205.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team | EndoCyclic Therapeutics",
    description:
      "Led by founder and CEO Dr. Tanya Petrossian, EndoCyclic is advancing a precision peptide platform across therapeutics, diagnostics, and oncology.",
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
      founder: {
        "@type": "Person",
        name: SITE.founder,
        jobTitle: "Founder & CEO",
        image: "https://endocyclic.com/team/tanya-petrossian.avif",
        worksFor: { "@type": "Organization", name: SITE.legalName },
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
