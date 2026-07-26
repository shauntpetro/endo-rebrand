/**
 * Shared site data. Every fact here traces to truth.md.
 * Pages import from here so copy stays consistent across the site.
 */

import { PUBLIC_CONTACT_EMAIL } from "@/lib/contact-config";

export const SITE = {
  name: "EndoCyclic Therapeutics",
  legalName: "EndoCyclic Therapeutics, Inc.",
  location: "Irvine, California",
  email: PUBLIC_CONTACT_EMAIL,
  linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  founder: "Dr. Tanya Petrossian, PhD",
  tagline:
    "A clinical-stage precision medicine company. Non-hormonal peptides designed to act selectively where disease lives.",
} as const;

export const MEDIA_CONTACT_HREF =
  "/contact?subject=media&intent=press#contact-form";
export const MEDIA_ASSET_CONTACT_HREF =
  "/contact?subject=media&intent=asset#contact-form";
export const PARTNERSHIP_CONTACT_HREF =
  "/contact?subject=partnership#contact-form";

export const PLATFORM_MECHANISM_IMAGE =
  "/illustrations/selective-mechanism-v11.avif";

export const PLATFORM_MECHANISM_ALT =
  "Conceptual four-stage illustration of an intact EndoCyclic peptide localizing to diseased tissue, undergoing selective uptake through an endocytic pathway, and showing pH-mediated activation. The peptide remains visible within diseased tissue before a separate final ENDO-205 preclinical evidence state shows the same lesion receding to represent lesion elimination.";

export const ENDO205_MECHANISM_IMAGE =
  "/illustrations/endo-205-translation-v6.avif";

export const ENDO205_PORTFOLIO_IMAGE =
  "/illustrations/endo-205-portfolio-desktop-v6.avif";

export const ENDO205_MECHANISM_ALT =
  "Conceptual ENDO-205 sequence showing selective uptake through an endocytic pathway and pH-mediated activation. The intact peptide remains visible within diseased tissue before a separate final state shows the same lesion receding to represent the ENDO-205 preclinical lesion-elimination finding.";

export const IMPACT_BIOLOGY_IMAGE =
  "/illustrations/endometriosis-biology-impact-v2.avif";

export const IMPACT_BIOLOGY_MOBILE_IMAGE =
  "/illustrations/endometriosis-biology-mobile-v1.avif";

export const IMPACT_BIOLOGY_ALT =
  "Conceptual anatomical illustration of endometrial-like tissue growing outside the uterus.";

export const PLATFORM_MECHANISM_STEPS = [
  {
    index: "01",
    label: "Target",
    title: "Diseased tissue selectivity",
    body: "Designed to act only in diseased tissue.",
  },
  {
    index: "02",
    label: "Enter",
    title: "Selective uptake",
    body: "Diseased tissue selectively takes up the peptide through a proprietary endocytic pathway.",
  },
  {
    index: "03",
    label: "Activate",
    title: "pH-mediated activation",
    body: "The precision peptide platform is activated through pH.",
  },
  {
    index: "04",
    label: "ENDO-205 evidence",
    title: "Preclinical lesion elimination",
    body: "The intact peptide remains visible within diseased tissue. Separately, ENDO-205 preclinical studies demonstrated elimination of endometriosis lesions and associated inflammation.",
  },
] as const;

export const EVIDENCE_LINKS = {
  fdaAnnouncement:
    "https://www.prnewswire.com/news-releases/endocyclic-therapeutics-announces-fda-clearance-of-investigational-new-drug-ind-application-for-endo-205-a-first-in-class-non-hormonal-precision-peptide-therapeutic-for-endometriosis-302721439.html",
  nihGrantAnnouncement:
    "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
  nihPortfolio:
    "https://seed.nih.gov/portfolio/nih-portfolio-company-showcase/endocyclic-therapeutics",
  nihRadxChallenge:
    "https://www.nih.gov/challenges/radxr-tech-act-endo-challenge",
  milkenNetworkRecord:
    "https://www.linkedin.com/posts/milken-institute-health_womenshealth-healthtech-innovation-activity-7374064677296914432-XCFv",
  uclaAlumniRecognition:
    "https://alumni.ucla.edu/class-notes/tanya-petrossian-05-ph-d-10/",
  whoEndometriosis:
    "https://www.who.int/news-room/fact-sheets/detail/endometriosis",
  mckinseyWomensHealth:
    "https://www.mckinsey.com/mhi/our-insights/blueprint-to-close-the-womens-health-gap-how-to-improve-lives-and-economies-for-all",
} as const;

export type EvidenceReference = {
  basis: "institutional" | "company";
  label: string;
  href?: string;
};

// Lean primary nav — the rest lives in the footer.
export const NAV_LINKS = [
  { name: "Platform", href: "/innovation" },
  { name: "Pipeline", href: "/pipeline" },
  { name: "Imaging", href: "/imaging" },
  { name: "Impact", href: "/impact" },
  { name: "Leadership", href: "/team" },
  { name: "News", href: "/news" },
] as const;

export const FOOTER_NAV = {
  Explore: [
    { name: "Precision peptide platform", href: "/innovation" },
    { name: "Development pipeline", href: "/pipeline" },
    { name: "FemLUNA imaging", href: "/imaging" },
    { name: "Disease impact", href: "/impact" },
  ],
  Company: [
    { name: "Leadership", href: "/team" },
    { name: "News", href: "/news" },
    { name: "Investors", href: "/investors" },
    { name: "Media Kit", href: "/media" },
    { name: "Contact", href: "/contact" },
  ],
  Connect: [
    { name: "LinkedIn", href: SITE.linkedin, external: true },
    { name: "Partner with us", href: PARTNERSHIP_CONTACT_HREF },
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
    detail: "Annual economic burden estimate for the United States.",
  },
  {
    value: 8,
    suffix: "yrs",
    label: "average diagnostic delay",
    detail: "Average time to an endometriosis diagnosis.",
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
  "Pre-clinical",
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
      "Targeted imaging agent developed for accurate, non-invasive detection of endometriosis",
      "Capable of detecting superficial and sub-millimeter lesions often missed by current imaging methods",
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
    reference: {
      basis: "company",
      label: "FDA IND Allowance announcement",
      href: EVIDENCE_LINKS.fdaAnnouncement,
    },
  },
  {
    title: "NIH perfect “10” score",
    detail: "A perfect “unicorn” score of 10 on an NIH Commercialization Readiness Pilot grant.",
    reference: {
      basis: "company",
      label: "NIH grant announcement",
      href: EVIDENCE_LINKS.nihGrantAnnouncement,
    },
  },
  {
    title: "Multiple NICHD awards",
    detail: "From the Eunice Kennedy Shriver National Institute of Child Health and Human Development.",
    reference: {
      basis: "company",
      label: "FDA IND Allowance announcement",
      href: EVIDENCE_LINKS.fdaAnnouncement,
    },
  },
  {
    title: "NIH SBIR Success Story",
    detail: "Recognized among the NIH’s highlighted portfolio companies.",
    reference: {
      basis: "company",
      label: "FDA IND Allowance announcement",
      href: EVIDENCE_LINKS.fdaAnnouncement,
    },
  },
  {
    title: "Fast Track filing underway",
    detail: "Advancing regulatory designation for the lead program.",
    reference: {
      basis: "company",
      label: "Company reported",
    },
  },
  {
    title: "White House recognition",
    detail: "Company-reported White House recognition.",
    reference: {
      basis: "company",
      label: "NIH grant announcement",
      href: EVIDENCE_LINKS.nihGrantAnnouncement,
    },
  },
] as const satisfies readonly {
  title: string;
  detail: string;
  reference: EvidenceReference;
}[];

/* Validation partners with official assets on hand */
export const PARTNERS = [
  {
    name: "NIH",
    relationship: "Funding & archival portfolio record",
    src: "/NIH_2013_logo_vertical.svg",
    reference: {
      basis: "institutional",
      label: "Archival NIH SEED profile",
      href: EVIDENCE_LINKS.nihPortfolio,
    },
  },
  {
    name: "UCLA",
    relationship: "Partnership",
    src: "/University_of_California,_Los_Angeles_logo.svg",
    reference: {
      basis: "company",
      label: "Company reported",
    },
  },
  {
    name: "Milken Institute",
    relationship: "Women’s Health Network · Founding member",
    src: "/Milken_Institute_logo.svg",
    reference: {
      basis: "institutional",
      label: "Milken Institute Health",
      href: EVIDENCE_LINKS.milkenNetworkRecord,
    },
  },
] as const satisfies readonly {
  name: string;
  relationship: string;
  src: string;
  reference: EvidenceReference;
}[];

export const INVESTOR_VALIDATION = [
  {
    title: "Multiple NICHD awards",
    detail: "NIH-supported development through NICHD award mechanisms.",
    reference: {
      basis: "company",
      label: "FDA IND Allowance announcement",
      href: EVIDENCE_LINKS.fdaAnnouncement,
    },
  },
  {
    title: "NIH SBIR Success Story",
    detail: "Company-reported NIH small-business program recognition.",
    reference: {
      basis: "company",
      label: "FDA IND Allowance announcement",
      href: EVIDENCE_LINKS.fdaAnnouncement,
    },
  },
  {
    title: "UCLA partnership",
    detail: "A company-reported institutional relationship.",
    reference: {
      basis: "company",
      label: "Company reported",
    },
  },
  {
    title: "RADx Tech",
    detail: "NIH institutional record.",
    reference: {
      basis: "institutional",
      label: "NIH source record",
      href: EVIDENCE_LINKS.nihRadxChallenge,
    },
  },
  {
    title: "White House recognition",
    detail: "Company-reported recognition.",
    reference: {
      basis: "company",
      label: "NIH grant announcement",
      href: EVIDENCE_LINKS.nihGrantAnnouncement,
    },
  },
  {
    title: "Milken Institute Women’s Health Network",
    detail: "Founding member.",
    reference: {
      basis: "institutional",
      label: "Milken Institute Health",
      href: EVIDENCE_LINKS.milkenNetworkRecord,
    },
  },
] as const satisfies readonly {
  title: string;
  detail: string;
  reference: EvidenceReference;
}[];

/* Word-set marquee (no logo asset needed) */
export const VALIDATION_WORDS = [
  "FDA IND Allowance",
  "NIH “Perfect 10”",
  "NICHD",
  "UCLA Partnership",
  "Milken Women’s Health Network · Founding Member",
  "RADx Tech",
  "White House Recognition",
  "NIH SBIR Success Story",
] as const;

export const CONTACT_SUBJECTS = [
  { value: "partnership", label: "Partnership & BD" },
  { value: "investor", label: "Investor relations" },
  { value: "media", label: "Media & press" },
  { value: "career", label: "Careers" },
  { value: "general", label: "General inquiry" },
  { value: "other", label: "Not sure where to start" },
] as const;

/*
 * Leadership.
 *
 * TEAM[0] (founder) is limited to facts approved in truth.md.
 *
 * The officer and functional-lead entries carry specific professional
 * credentials — prior FDA review roles, named awards, trial counts, degrees —
 * that sit outside truth.md. The content owner confirmed these as verified on
 * 2026-07-25, which is the approval basis for publishing them.
 *
 * These describe real, named individuals. Never add, embellish, or infer a
 * credential here, and never source one from an unattributed search result;
 * only the content owner may add or amend a claim. Narrow or remove an entry
 * that cannot be substantiated on request.
 */
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export const TEAM: Member[] = [
  {
    id: "tanya",
    name: "Dr. Tanya Petrossian, PhD",
    role: "Founder & CEO",
    bio: "Dr. Tanya Petrossian, PhD is the founder and CEO of EndoCyclic Therapeutics, a clinical-stage precision medicine company in Irvine, California. She leads the company as it advances a proprietary precision peptide platform across therapeutic and diagnostic programs in endometriosis and oncology.",
    image: "/team/tanya-petrossian-v2.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "frank",
    name: "Frank Fernandez",
    role: "Chief Financial Officer",
    bio: "Frank Fernandez brings decades of financial leadership experience in the life sciences sector, guiding strategic financial planning and investor relations for EndoCyclic.",
    image: "/team/frank-fernandez.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "melanie",
    name: "Dr. Melanie Hartsough, PhD",
    role: "Nonclinical Toxicology",
    bio: "Dr. Melanie Hartsough holds a PhD in Pharmacology from Penn State College of Medicine and completed a postdoctoral fellowship at the NIH. A former FDA reviewer in both CBER and CDER, she brings over two decades of experience in pharmacology and toxicology assessment. She is the first recipient of the ACT Mildred Christian Women's Leadership in Toxicology Award and a former President of the American Board of Toxicology.",
    image: "/team/melanie-hartsough.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "david",
    name: "Dr. David Lin, PhD",
    role: "Chemistry, Manufacturing & Controls",
    bio: "Dr. David Lin brings over 27 years of pharmaceutical regulatory experience in Chemistry, Manufacturing, and Controls. He holds a PhD in organic chemistry and an MBA, and previously served as a CMC reviewer and acting Division Director at the FDA's Office of New Drug Chemistry (CDER).",
    image: "/team/david-lin.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "andrea",
    name: "Dr. Andrea Lukes, MD",
    role: "Clinical Affairs",
    bio: "Dr. Andrea Lukes is a board-certified OB/GYN and Fellow of ACOG with over 30 years of clinical experience. She has conducted or overseen more than 90 clinical trials of investigational women's health products, spanning endometriosis, uterine fibroids, contraception, and menopause. She is the founder of Carolina Women's Research & Wellness Center.",
    image: "/team/andrea-lukes.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "aileen",
    name: "Aileen Ryan",
    role: "Regulatory Affairs",
    bio: "Aileen Ryan brings over 40 years of pharmaceutical regulatory experience, including leadership roles at Ludwig Institute for Cancer Research and Bayer Pharmaceuticals. She holds an MS in Basic Medical Sciences and has guided IND, NDA, BLA, and MAA submissions across oncology, women's health, and rare diseases.",
    image: "/team/aileen-ryan.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "miganush",
    name: "Dr. Miganush Stepanians, PhD",
    role: "Biostatistics",
    bio: "Dr. Miganush Stepanians holds a PhD in Statistics from Boston University and an MS in Mathematics from MIT. With over 30 years in drug development, she has designed analyses for more than 20 successful marketing applications and has presented on behalf of sponsors in meetings with the FDA.",
    image: "/team/miganush-stepanians.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
];

/** The founder entry; the rest of TEAM are officers and functional leads. */
export const FOUNDER_MEMBER = TEAM[0];
export const LEADERSHIP_TEAM = TEAM.slice(1);

/* Newsroom — verified event-level source records. */
export type ArticleType = "Press Release" | "Award" | "Interview" | "Profile";
export type ArticleSourceKind = "company" | "institutional" | "independent";
export interface Article {
  id: number;
  type: ArticleType;
  date: string;
  dateTime?: string;
  sourceKind: ArticleSourceKind;
  source: string;
  host?: string;
  title: string;
  displayTitle?: string;
  excerpt: string;
  ctaLabel: string;
  featureLabel?: string;
  featureMark?: string;
  statusLabel?: string;
  proof?: string;
  image: string;
  imageFit?: "contain" | "cover";
  link: string;
  featured?: boolean;
  coverage?: readonly {
    label: string;
    source: string;
    link: string;
  }[];
}

export function getArticleDisplayTitle(article: Article) {
  return article.displayTitle ?? article.title;
}

export function getArticleSourceLabel(article: Article) {
  return article.host
    ? `${article.source} · Hosted by ${article.host}`
    : article.source;
}

export function getArticleSourceKindLabel(sourceKind: ArticleSourceKind) {
  if (sourceKind === "institutional") return "Institutional profile";
  if (sourceKind === "independent") return "Independent coverage";
  return "Company announcement";
}

export const NEWS: Article[] = [
  {
    id: 9,
    type: "Press Release",
    date: "Mar 23, 2026",
    dateTime: "2026-03-23",
    sourceKind: "company",
    source: "EndoCyclic Therapeutics",
    host: "PR Newswire",
    title: "EndoCyclic Therapeutics Announces FDA IND Allowance for ENDO-205",
    displayTitle: "FDA IND Allowance advances ENDO-205 into Phase 1.",
    excerpt:
      "ENDO-205 is EndoCyclic’s lead first-in-class, non-hormonal precision peptide therapeutic for endometriosis.",
    ctaLabel: "Read the company announcement",
    featureLabel: "Current milestone",
    featureMark: "IND",
    statusLabel: "Current milestone",
    proof: "FDA IND Allowance · ENDO-205 · 2026",
    image: "/illustrations/news-regulatory-threshold-v2.avif",
    imageFit: "cover",
    link: EVIDENCE_LINKS.fdaAnnouncement,
    featured: true,
    coverage: [
      {
        label: "UCLA Alumni class note",
        source: "UCLA Alumni",
        link: EVIDENCE_LINKS.uclaAlumniRecognition,
      },
    ],
  },
  {
    id: 1,
    type: "Press Release",
    date: "Sep 16, 2025",
    dateTime: "2025-09-16",
    sourceKind: "company",
    source: "EndoCyclic Therapeutics",
    host: "BioSpace",
    title: "EndoCyclic Therapeutics Awarded Rare NIH 'Perfect 10' Grant for Endometriosis Therapeutic",
    displayTitle: "An NIH ‘Perfect 10’ recognition.",
    excerpt: "EndoCyclic received a perfect overall impact score of 10 on an NIH Commercialization Readiness Pilot grant.",
    ctaLabel: "Read the company announcement",
    featureLabel: "Company press release",
    featureMark: "10",
    proof: "NIH Commercialization Readiness Pilot grant · Score of 10",
    image: "/NIH_2013_logo_vertical.svg",
    link: EVIDENCE_LINKS.nihGrantAnnouncement,
    coverage: [
      {
        label: "Independent coverage · subscriber preview",
        source: "BioWorld",
        link: "https://www.bioworld.com/articles/724279-endocyclics-endo-205-awarded-nih-grant-for-endometriosis",
      },
    ],
  },
  {
    id: 5,
    type: "Profile",
    date: "Archival profile",
    sourceKind: "institutional",
    source: "NIH SEED",
    title: "EndoCyclic Therapeutics Featured in the NIH Portfolio Company Showcase",
    displayTitle: "An archival NIH portfolio company profile.",
    excerpt:
      "This NIH SEED portfolio profile documents EndoCyclic’s participation in the NIH innovation ecosystem. It reflects historical program naming; current program facts are presented on this site.",
    ctaLabel: "Open the archival NIH profile",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://seed.nih.gov/portfolio/nih-portfolio-company-showcase/endocyclic-therapeutics",
  },
  {
    id: 8,
    type: "Profile",
    date: "Oct 23, 2017",
    dateTime: "2017-10-23",
    sourceKind: "institutional",
    source: "UCLA",
    title: "UCLA Alumni News Profiles Dr. Tanya Petrossian and EndoCyclic Therapeutics",
    excerpt: "UCLA profiles alumna Dr. Tanya Petrossian and the founding of EndoCyclic Therapeutics to develop a non-hormonal treatment for endometriosis.",
    ctaLabel: "Read the UCLA profile",
    image: "/University_of_California,_Los_Angeles_logo.svg",
    link: "https://www.chemistry.ucla.edu/news/alumni-news-13/",
  },
];
