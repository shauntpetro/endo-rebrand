import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact — The Endometriosis Crisis",
  description:
    "Over 190 million women and girls worldwide live with endometriosis. Learn about the unmet medical need driving EndoCyclic's mission for non-hormonal solutions.",
  alternates: {
    canonical: "/impact",
  },
  openGraph: {
    title: "Impact — The Endometriosis Crisis | EndoCyclic Therapeutics",
    description:
      "190M+ affected worldwide. 7+ year average diagnosis delay. Zero non-hormonal FDA-approved treatments. Until now.",
    url: "/impact",
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: "Endometriosis",
    alternateName: "Endometriotic Disease",
    description:
      "A chronic condition affecting over 190 million women and girls worldwide, characterized by tissue similar to the uterine lining growing outside the uterus.",
    epidemiology:
      "Affects approximately 1 in 10 women of reproductive age worldwide. Over 7.5 million affected in the United States alone.",
    possibleComplication: [
      "Infertility",
      "Chronic pelvic pain",
      "Autoimmune conditions",
      "Cardiovascular risks",
    ],
    typicalTest: "Laparoscopic surgery (current standard), FemLUNA imaging (investigational)",
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
