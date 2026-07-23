import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";
import MotionProvider from "@/components/MotionProvider";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://endocyclic.com"),
  alternates: { canonical: "/" },
  title: {
    default: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    template: "%s | EndoCyclic Therapeutics",
  },
  description:
    "Clinical-stage precision medicine company developing non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology. ENDO-205 has FDA IND Allowance.",
  keywords: [
    "endometriosis",
    "precision medicine",
    "cyclic peptide",
    "non-hormonal therapy",
    "targeted therapeutics",
    "oncology",
    "IND allowance",
    "clinical stage biotech",
    "ENDO-205",
    "FemLUNA",
    "EndoCyclic",
  ],
  authors: [{ name: "EndoCyclic Therapeutics" }],
  creator: "EndoCyclic Therapeutics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://endocyclic.com",
    siteName: "EndoCyclic Therapeutics",
    title: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    description:
      "Non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology. ENDO-205 has FDA IND Allowance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    description:
      "Non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "EndoCyclic Therapeutics",
    url: "https://endocyclic.com",
    logo: "https://endocyclic.com/logo.avif",
    description:
      "Clinical-stage precision medicine company developing non-hormonal precision peptide therapeutics and diagnostics for endometriosis and oncology.",
    founder: {
      "@type": "Person",
      name: "Dr. Tanya Petrossian",
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Irvine",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/company/endocyclic-therapeutics",
      "https://twitter.com/EndoCyclic",
    ],
    medicalSpecialty: [
      "https://schema.org/Gynecologic",
      "https://schema.org/Oncologic",
    ],
    knowsAbout: [
      "Endometriosis",
      "Cyclic Peptide Therapeutics",
      "Non-Hormonal Therapy",
      "Targeted Drug Delivery",
      "Precision Medicine",
    ],
  };

  return (
    <html lang="en" className={hanken.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <MotionProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
        <PostHogProvider />
      </body>
    </html>
  );
}
