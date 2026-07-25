import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import {
  FOUNDER_ID,
  ORGANIZATION_ID,
  SITE_ORIGIN,
  SITE_ORIGIN_IS_CONFIGURED,
  SOCIAL_IMAGES,
  WEBSITE_ID,
} from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { isFormDeliveryConfigured } from "@/lib/server/form-delivery";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Public HTML may be reused briefly at the edge, then regenerated. This keeps
// deploy-driven content fresh without giving shared caches a year-long lease.
export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    template: "%s | EndoCyclic Therapeutics",
  },
  description:
    "Clinical-stage precision medicine company developing non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology. ENDO-205 has FDA IND Allowance.",
  authors: [{ name: "EndoCyclic Therapeutics" }],
  creator: "EndoCyclic Therapeutics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_ORIGIN,
    siteName: "EndoCyclic Therapeutics",
    title: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    description:
      "Non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology. ENDO-205 has FDA IND Allowance.",
    images: [SOCIAL_IMAGES["/"]],
  },
  twitter: {
    card: "summary_large_image",
    title: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    description:
      "Non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology.",
    images: [SOCIAL_IMAGES["/"]],
  },
  robots: {
    index: SITE_ORIGIN_IS_CONFIGURED,
    follow: SITE_ORIGIN_IS_CONFIGURED,
    googleBot: {
      index: SITE_ORIGIN_IS_CONFIGURED,
      follow: SITE_ORIGIN_IS_CONFIGURED,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#FFF8F4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const formDeliveryAvailable = isFormDeliveryConfigured();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        "@id": ORGANIZATION_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}/apple-touch-icon.png`,
          width: 180,
          height: 180,
        },
        description:
          "Clinical-stage precision medicine company developing non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology.",
        founder: {
          "@type": "Person",
          "@id": FOUNDER_ID,
          name: SITE.founder,
          jobTitle: "Founder & CEO",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irvine",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: ["https://www.linkedin.com/company/endocyclic-therapeutics"],
        knowsAbout: [
          "Endometriosis",
          "Cyclic Peptide Therapeutics",
          "Non-Hormonal Therapy",
          "Targeted Drug Delivery",
          "Precision Medicine",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "EndoCyclic Therapeutics",
        alternateName: "EndoCyclic",
        url: SITE_ORIGIN,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={hanken.variable}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer deliveryAvailable={formDeliveryAvailable} />
        <PostHogProvider />
      </body>
    </html>
  );
}
