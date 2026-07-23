import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Homepage Design Concepts",
    template: "%s | EndoCyclic Concepts",
  },
  description: "Internal homepage design explorations for EndoCyclic Therapeutics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  // Concepts are an internal design laboratory, never a public diligence route.
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
