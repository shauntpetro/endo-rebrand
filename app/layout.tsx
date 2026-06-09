import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";
import MotionProvider from "@/components/MotionProvider";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://endocyclic.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    template: "%s | EndoCyclic Therapeutics",
  },
  description:
    "Clinical-stage precision medicine company developing first-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology. IND cleared by the FDA.",
  keywords: [
    "endometriosis",
    "precision medicine",
    "cyclic peptide",
    "non-hormonal therapy",
    "targeted therapeutics",
    "oncology",
    "IND cleared",
    "clinical stage biotech",
    "ENDO-205",
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
      "Developing first-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology. IND cleared by the FDA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EndoCyclic Therapeutics | Clinical-Stage Precision Medicine",
    description:
      "First-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology.",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "EndoCyclic Therapeutics",
    url: "https://endocyclic.com",
    logo: "https://endocyclic.com/logo.avif",
    description:
      "Clinical-stage precision medicine company developing first-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology.",
    foundingDate: "2017",
    founder: {
      "@type": "Person",
      name: "Dr. Tanya Petrossian",
      jobTitle: "CEO, Founder, and Inventor",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-surface text-black-soft selection:bg-gold-primary selection:text-white" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <MotionProvider>
          <PostHogProvider>
            <ScrollProgress />
            <ScrollToTop />
            <div id="main-content">
              {children}
            </div>
            <BackToTop />
          </PostHogProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
