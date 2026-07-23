import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EndoCyclic Therapeutics — partnership and business development, investor relations, media, data room access, and careers. Based in Irvine, California.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | EndoCyclic Therapeutics",
    description:
      "Get in touch with EndoCyclic Therapeutics — partnership, investor relations, media, and general inquiries.",
    url: "https://endocyclic.com/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EndoCyclic Therapeutics",
    url: "https://endocyclic.com/contact",
    description:
      "Contact EndoCyclic Therapeutics for partnership, investor relations, media, data room access, and general inquiries.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.legalName,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Irvine",
        addressRegion: "CA",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "General inquiries",
        email: SITE.email,
      },
      sameAs: [SITE.linkedin, SITE.twitter],
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
