import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isConceptLabAvailable } from "@/lib/concept-lab";

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
  // Defense in depth for a route that is materialized only by dev:concepts.
  if (!isConceptLabAvailable()) notFound();
  return children;
}
