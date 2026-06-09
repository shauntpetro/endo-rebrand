import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Leadership & Advisors",
  description:
    "Meet the EndoCyclic Therapeutics team — experienced leaders in peptide chemistry, drug development, toxicology, CMC, clinical operations, and business strategy.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Team — Leadership & Advisors | EndoCyclic Therapeutics",
    description:
      "World-class team with deep expertise in peptide therapeutics, drug delivery, and clinical development.",
    url: "/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "EndoCyclic Therapeutics Leadership Team",
    description:
      "Experienced leaders in peptide chemistry, drug development, toxicology, CMC, clinical operations, and business strategy.",
    mainEntity: {
      "@type": "Organization",
      name: "EndoCyclic Therapeutics",
      member: [
        {
          "@type": "Person",
          name: "Dr. Tanya Petrossian",
          jobTitle: "CEO, Founder, and Inventor",
          description:
            "Biochemist and serial entrepreneur with over 15 years of experience in peptide therapeutics and targeted drug delivery.",
          alumniOf: { "@type": "CollegeOrUniversity", name: "UCLA" },
        },
        {
          "@type": "Person",
          name: "Dr. Melanie Hartsough",
          jobTitle: "Nonclinical Toxicology",
        },
        {
          "@type": "Person",
          name: "Dr. David Lin",
          jobTitle: "CMC (Chemistry, Manufacturing, and Controls)",
        },
        {
          "@type": "Person",
          name: "Frank Fernandez",
          jobTitle: "CFO",
        },
        {
          "@type": "Person",
          name: "Dr. Andrea Lukes",
          jobTitle: "Clinical Affairs",
        },
        {
          "@type": "Person",
          name: "Aileen Ryan",
          jobTitle: "Regulatory Affairs",
        },
        {
          "@type": "Person",
          name: "Dr. Miganush Stepanians",
          jobTitle: "Biostatistics",
        },
      ],
    },
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
