import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ClinicalLedger,
  CONCEPTS,
  MolecularAtlas,
  PartnerBrief,
} from "@/components/concepts/TasteConcepts";
import SelectiveThreadPage from "@/components/concepts/selective-thread/SelectiveThreadPage";

type Props = {
  params: Promise<{ concept: string }>;
};

export function generateStaticParams() {
  return CONCEPTS.map(({ slug }) => ({ concept: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { concept } = await params;
  const match = CONCEPTS.find(({ slug }) => slug === concept);
  if (!match) return {};
  return {
    title: match.name,
    description: match.summary,
  };
}

export default async function ConceptPage({ params }: Props) {
  const { concept } = await params;

  if (concept === "selective-thread") return <SelectiveThreadPage />;
  if (concept === "clinical-ledger") return <ClinicalLedger />;
  if (concept === "molecular-atlas") return <MolecularAtlas />;
  if (concept === "partner-brief") return <PartnerBrief />;

  notFound();
}
