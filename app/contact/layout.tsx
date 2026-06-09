import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EndoCyclic Therapeutics. Reach our team for partnership inquiries, investor relations, media requests, and general information.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | EndoCyclic Therapeutics",
    description:
      "Partnership inquiries, investor relations, media requests, and general information.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact EndoCyclic Therapeutics",
    description:
      "Get in touch for partnership inquiries, investor relations, media requests, and general information.",
    mainEntity: {
      "@type": "Organization",
      name: "EndoCyclic Therapeutics",
      email: "info@endocyclic.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Irvine",
        addressRegion: "CA",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "General Inquiries",
        email: "info@endocyclic.com",
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
