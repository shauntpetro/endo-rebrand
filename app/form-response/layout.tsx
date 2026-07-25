import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submission status",
  description: "Status for an EndoCyclic website form submission.",
  referrer: "no-referrer",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

export default function FormResponseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
