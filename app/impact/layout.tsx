import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact — The Endometriosis Crisis",
  description:
    "Endometriosis affects 190M+ women — roughly 1 in 10 of reproductive age — yet remains under-recognized, with an 8-year average diagnostic delay. EndoCyclic's mission: see it earlier and change its course.",
  alternates: {
    canonical: "/impact",
  },
  openGraph: {
    title: "Impact — The Endometriosis Crisis | EndoCyclic Therapeutics",
    description:
      "190M+ affected worldwide. 8-year average diagnostic delay. A non-hormonal diagnostic and a disease-modifying therapeutic, designed to change the trajectory.",
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
      "A chronic condition affecting over 190 million women worldwide, characterized by endometrial-like tissue growing outside the uterus.",
    epidemiology:
      "Affects approximately 1 in 10 women of reproductive age worldwide, with an 8-year average diagnostic delay.",
    possibleComplication: [
      "Infertility",
      "Chronic pelvic pain",
      "Cardiovascular disease",
      "Increased risk of certain cancers",
      "Other inflammatory conditions",
    ],
    typicalTest:
      "Laparoscopic surgery (current standard), FemLUNA imaging (investigational)",
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
