/**
 * Shared site data. Every fact here traces to truth.md.
 * Pages import from here so copy stays consistent across the site.
 */

export const SITE = {
  name: "EndoCyclic Therapeutics",
  legalName: "EndoCyclic Therapeutics, Inc.",
  location: "Irvine, California",
  email: "info@endocyclic.com",
  linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  twitter: "https://twitter.com/EndoCyclic",
  founder: "Dr. Tanya Petrossian, PhD",
  tagline:
    "A clinical-stage precision medicine company. Non-hormonal peptides that act only where disease lives.",
} as const;

export const NAV_LINKS = [
  { name: "Innovation", href: "/innovation" },
  { name: "Pipeline", href: "/pipeline" },
  { name: "Imaging", href: "/imaging" },
  { name: "Impact", href: "/impact" },
  { name: "Team", href: "/team" },
  { name: "News & Media", href: "/news" },
  { name: "Investors", href: "/investors" },
  { name: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = {
  Platform: [
    { name: "Innovation", href: "/innovation" },
    { name: "Pipeline", href: "/pipeline" },
    { name: "Imaging", href: "/imaging" },
    { name: "Impact", href: "/impact" },
  ],
  Company: [
    { name: "Team", href: "/team" },
    { name: "News", href: "/news" },
    { name: "Investors", href: "/investors" },
    { name: "Media Kit", href: "/media" },
    { name: "Contact", href: "/contact" },
  ],
  Connect: [
    { name: "LinkedIn", href: SITE.linkedin, external: true },
    { name: "Twitter / X", href: SITE.twitter, external: true },
    { name: "Partner with us", href: "/contact?subject=partnership" },
  ],
} as const;

/* Disease burden — endometriosis (truth.md §"Disease Burden") */
export const BURDEN_STATS = [
  {
    value: 190,
    suffix: "M+",
    label: "women affected worldwide",
    detail: "Roughly 1 in 10 women of reproductive age, globally.",
  },
  {
    value: 200,
    prefix: "$",
    suffix: "B",
    label: "annual economic burden (US)",
    detail: "Lost productivity and healthcare costs in the United States alone.",
  },
  {
    value: 8,
    suffix: "yrs",
    label: "average diagnostic delay",
    detail: "From first symptom to a confirmed diagnosis of endometriosis.",
  },
  {
    value: 250,
    prefix: "$180–",
    suffix: "B",
    label: "global market potential",
    detail: "Estimated market for endometriosis treatments (McKinsey).",
    raw: true,
  },
] as const;

/* Pipeline — facts from truth.md + pipelineData */
export type Area = "Endometriosis" | "Oncology";
export type Modality = "Therapeutic" | "Diagnostic";

export interface Candidate {
  id: string;
  name: string;
  area: Area;
  modality: Modality;
  mechanism: string;
  indication: string;
  stage: string; // human-readable status per truth.md
  phaseIndex: number; // 0-based into PHASES
  summary: string;
  highlights: string[];
}

export const PHASES = [
  "Discovery",
  "Preclinical",
  "IND-enabling",
  "Phase 1",
  "Phase 2",
  "Phase 3",
] as const;

export const PIPELINE: Candidate[] = [
  {
    id: "ENDO-205",
    name: "ENDO-205",
    area: "Endometriosis",
    modality: "Therapeutic",
    mechanism: "First-in-class, non-hormonal precision peptide",
    indication: "Endometriosis",
    stage: "FDA IND Allowance (2026) · Phase 1",
    phaseIndex: 3,
    summary:
      "A first-in-class, non-hormonal precision peptide designed to eliminate endometriosis lesions and resolve associated symptoms, including pain. A short-course, disease-modifying treatment now in a first-in-human Phase 1 study.",
    highlights: [
      "Preclinical: demonstrated elimination of endometriosis lesions and associated inflammation",
      "Preclinical: no dose-limiting toxicities in GLP toxicology studies",
      "Short-course, disease-modifying — designed to avoid hormones, surgery, and systemic toxicity",
      "Phase 1 first-in-human study in healthy pre-menopausal women of reproductive age",
    ],
  },
  {
    id: "FemLUNA",
    name: "FemLUNA™",
    area: "Endometriosis",
    modality: "Diagnostic",
    mechanism: "Targeted imaging agent",
    indication: "Non-invasive endometriosis imaging",
    stage: "IND-enabling",
    phaseIndex: 2,
    summary:
      "The first non-invasive, definitive diagnostic for endometriosis — a targeted imaging agent developed to accurately detect the disease, including superficial and sub-millimeter lesions often missed by current imaging methods.",
    highlights: [
      "Designed as a non-invasive alternative to laparoscopy, today's diagnostic gold standard",
      "Developed to visualize lesion subtypes difficult to detect with standard imaging",
      "Intended to shorten the 8-year average diagnostic delay",
    ],
  },
  {
    id: "ENDO-995",
    name: "ENDO-995",
    area: "Oncology",
    modality: "Therapeutic",
    mechanism: "Tumor-selective cyclic peptide; non-hormonal",
    indication: "Malignant solid tumors",
    stage: "Pre-clinical",
    phaseIndex: 1,
    summary:
      "An investigational, non-hormonal therapeutic peptide in development for malignant solid tumors, with an initial focus on colon and endometrial cancers. Designed to overcome therapeutic resistance and restore responsiveness in ‘cold’ tumors.",
    highlights: [
      "Designed to unlock previously undruggable intracellular targets through selective peptide engineering",
      "Potential applicability across 25%+ of solid tumor types",
      "Paired with ENDO-311 as the oncology therapeutic + diagnostic match",
    ],
  },
  {
    id: "ENDO-311",
    name: "ENDO-311",
    area: "Oncology",
    modality: "Diagnostic",
    mechanism: "Targeted imaging agent",
    indication: "Solid tumor diagnostics",
    stage: "Pre-clinical",
    phaseIndex: 1,
    summary:
      "An investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors, with an initial focus on colon cancer. Radiation-free, non-hormonal, and free of heavy metals.",
    highlights: [
      "Designed for early-stage tumor localization and disease monitoring",
      "Compatible with standard imaging systems",
      "Companion diagnostic to ENDO-995 — the oncology ‘detect and treat’ pair",
    ],
  },
];

/* Milestones / validation (truth.md §"Milestones") */
export const MILESTONES = [
  {
    title: "FDA IND Allowance",
    detail: "Achieved in 2026 for lead therapeutic ENDO-205.",
  },
  {
    title: "NIH perfect “10” score",
    detail: "A rare unicorn impact score on the NIH Commercialization Readiness Pilot grant.",
  },
  {
    title: "Multiple NICHD awards",
    detail: "From the Eunice Kennedy Shriver National Institute of Child Health and Human Development.",
  },
  {
    title: "NIH SBIR Success Story",
    detail: "Recognized among the NIH’s highlighted portfolio companies.",
  },
  {
    title: "Fast Track filing underway",
    detail: "Advancing regulatory designation for the lead program.",
  },
  {
    title: "White House recognition",
    detail: "NIH-backed, UCLA partnership, and RADx Tech validation.",
  },
] as const;

/* Validation partners with official assets on hand */
export const PARTNERS = [
  { name: "NIH", src: "/NIH_2013_logo_vertical.svg" },
  { name: "NICHD", src: "/recognition-perfect10.webp" },
  { name: "UCLA", src: "/University_of_California,_Los_Angeles_logo.svg" },
  { name: "Milken Institute", src: "/Milken_Institute_logo.svg" },
  { name: "Biocom California", src: "/biocom_ca_primary_logo.svg" },
  { name: "EndoFound", src: "/Endofound.webp" },
] as const;

/* Word-set marquee (no logo asset needed) */
export const VALIDATION_WORDS = [
  "FDA IND Allowance",
  "NIH “Perfect 10”",
  "NICHD",
  "UCLA Partnership",
  "Milken Institute",
  "RADx Tech",
  "White House Recognition",
  "NIH SBIR Success Story",
] as const;

export const CONTACT_SUBJECTS = [
  { value: "partnership", label: "Partnership & BD" },
  { value: "investor", label: "Investor relations" },
  { value: "media", label: "Media & press" },
  { value: "data", label: "Data room access" },
  { value: "career", label: "Careers" },
  { value: "general", label: "General inquiry" },
  { value: "other", label: "Other" },
] as const;
