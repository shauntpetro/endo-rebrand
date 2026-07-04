import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "Press resources for EndoCyclic Therapeutics — company boilerplate, key facts, logo downloads, leadership, and media contact.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media Kit | EndoCyclic Therapeutics",
    description:
      "Boilerplate, key facts, logos, and media contact for EndoCyclic Therapeutics, a clinical-stage precision medicine company.",
    url: "https://endocyclic.com/media",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Media Kit — EndoCyclic Therapeutics",
    url: "https://endocyclic.com/media",
    description:
      "Press resources for EndoCyclic Therapeutics — boilerplate, key facts, logos, leadership, and media contact.",
    about: {
      "@type": "Organization",
      name: SITE.legalName,
      email: SITE.email,
      location: SITE.location,
      founder: { "@type": "Person", name: SITE.founder },
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
