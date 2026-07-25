import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ClinicalLedger,
  CONCEPTS,
  MolecularAtlas,
  PartnerBrief,
} from "@/components/concepts/TasteConcepts";
import SelectiveThreadPage from "@/components/concepts/selective-thread/SelectiveThreadPage";
import { isConceptLabAvailable } from "@/lib/concept-lab";

type Props = {
  params: Promise<{ concept: string }>;
};

// Keep unknown local slugs on the explicit notFound() path.
export const dynamicParams = true;

export function createConceptStaticParams(
  nodeEnv = process.env.NODE_ENV,
) {
  if (!isConceptLabAvailable(nodeEnv)) return [];
  return CONCEPTS.map(({ slug }) => ({ concept: slug }));
}

export function generateStaticParams() {
  return createConceptStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isConceptLabAvailable()) {
    return {
      title: "Page not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { concept } = await params;
  const match = CONCEPTS.find(({ slug }) => slug === concept);
  if (!match) return {};
  return {
    title: match.name,
    description: match.summary,
  };
}

export default async function ConceptPage({ params }: Props) {
  if (!isConceptLabAvailable()) notFound();

  const { concept } = await params;

  if (concept === "selective-thread") return <SelectiveThreadPage />;
  if (concept === "clinical-ledger") return <ClinicalLedger />;
  if (concept === "molecular-atlas") return <MolecularAtlas />;
  if (concept === "partner-brief") return <PartnerBrief />;

  notFound();
}
