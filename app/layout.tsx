import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

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
  title: "EndoCyclic Therapeutics | Precision Medicine for Endometriosis",
  description: "Leading a new era in women's health with first-in-class, targeted, non-hormonal therapeutics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-[#F5F5F5] text-[#2D2D2D] selection:bg-[#C9A961] selection:text-white" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
