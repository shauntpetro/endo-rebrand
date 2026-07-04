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

// Lean primary nav — the rest lives in the footer.
export const NAV_LINKS = [
  { name: "Platform", href: "/innovation" },
  { name: "Pipeline", href: "/pipeline" },
  { name: "Impact", href: "/impact" },
  { name: "Team", href: "/team" },
  { name: "News", href: "/news" },
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

/* Team — real, approved bios (verbatim). Do not alter. */
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  quote?: string;
  linkedin: string;
}

export const TEAM: Member[] = [
  {
    id: "tanya",
    name: "Tanya Petrossian, Ph.D.",
    role: "CEO, Founder, and Inventor",
    bio: "Dr. Petrossian is a biochemist and entrepreneur with over 15 years of experience in peptide therapeutics and targeted drug delivery. She holds a B.S. and Ph.D. in Biochemistry & Molecular Biology from UCLA, where she trained under Distinguished Professor Steven Clarke. Named City of Los Angeles Entrepreneur in Residence and a Biocom California Life Science Catalyst Award winner, she has led EndoCyclic from discovery through FDA IND clearance.",
    image: "/team/tanya-petrossian.avif",
    quote: "Our peptides help restore the body's natural surveillance system.",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "melanie",
    name: "Melanie Hartsough, Ph.D.",
    role: "Nonclinical Toxicology",
    bio: "Dr. Hartsough holds a Ph.D. in Pharmacology from Penn State College of Medicine and completed a postdoctoral fellowship at the NIH. A former FDA reviewer in both CBER and CDER, she brings over two decades of experience in pharmacology and toxicology assessment. She is the first recipient of the ACT Mildred Christian Women's Leadership in Toxicology Award and a former President of the American Board of Toxicology.",
    image: "/team/melanie-hartsough.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "david",
    name: "David Lin, Ph.D.",
    role: "CMC",
    bio: "Dr. Lin brings over 27 years of pharmaceutical regulatory experience in Chemistry, Manufacturing, and Controls (CMC). He holds a Ph.D. in organic chemistry and an MBA, and previously served as a CMC reviewer and acting Division Director at the FDA's Office of New Drug Chemistry (CDER).",
    image: "/team/david-lin.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "frank",
    name: "Frank Fernandez",
    role: "CFO",
    bio: "Frank brings decades of financial leadership experience in the life sciences sector, guiding strategic financial planning and investor relations.",
    image: "/team/frank-fernandez.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "andrea",
    name: "Andrea Lukes, MD",
    role: "Clinical Affairs",
    bio: "Dr. Lukes is a board-certified OB/GYN and Fellow of ACOG with over 30 years of clinical experience. She has conducted or overseen more than 90 clinical trials of investigational women's health products, spanning endometriosis, uterine fibroids, contraception, and menopause. She is the founder of Carolina Women's Research & Wellness Center.",
    image: "/team/andrea-lukes.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "aileen",
    name: "Aileen Ryan",
    role: "Regulatory Affairs",
    bio: "Aileen brings over 40 years of pharmaceutical regulatory experience, including leadership roles at Ludwig Institute for Cancer Research and Bayer Pharmaceuticals. She holds an M.S. in Basic Medical Sciences and has guided IND, NDA, BLA, and MAA submissions across oncology, women's health, and rare diseases.",
    image: "/team/aileen-ryan.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
  {
    id: "miganush",
    name: "Miganush Stepanians, Ph.D.",
    role: "Biostatistics",
    bio: "Dr. Stepanians holds a Ph.D. in Statistics from Boston University and an M.S. in Mathematics from MIT. With over 30 years in drug development, she has designed analyses for more than 20 successful marketing applications (NDAs/MAAs) and has presented on behalf of sponsors in meetings with the FDA.",
    image: "/team/miganush-stepanians.avif",
    linkedin: "https://www.linkedin.com/company/endocyclic-therapeutics",
  },
];

/* Newsroom — real press (verbatim titles/sources/dates/links). Do not alter. */
export type ArticleType = "Press Release" | "Award" | "Interview";
export interface Article {
  id: number;
  type: ArticleType;
  date: string;
  source: string;
  title: string;
  excerpt?: string;
  image: string;
  link: string;
  featured?: boolean;
}

export const NEWS: Article[] = [
  {
    id: 1,
    type: "Award",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "EndoCyclic Therapeutics Awarded Rare NIH 'Perfect 10' Grant for Endometriosis Therapeutic",
    excerpt: "EndoCyclic Therapeutics received a highly competitive NIH Commercialization Readiness Pilot (CRP) Program grant from NICHD, earning an exceptionally rare perfect overall impact score of 10. This funding accelerates the commercialization of ENDO-205, a non-hormonal, disease-modifying therapeutic designed to treat endometriosis.",
    image: "/recognition-perfect10.webp",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: true,
  },
  {
    id: 2,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "EndoCyclic Therapeutics",
    title: "EndoCyclic Therapeutics Named Founding Member of Milken Institute's Women's Health Network",
    excerpt: "EndoCyclic Therapeutics joins the Milken Institute's Women's Health Network as a founding member, furthering its commitment to advancing women's health initiatives and fostering collaboration in addressing critical health issues affecting women globally.",
    image: "/Milken_Institute_logo.svg",
    link: "https://www.endocyclictherapeutics.com/news",
  },
  {
    id: 3,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "BioWorld",
    title: "EndoCyclic's ENDO-205 Awarded NIH Grant for Endometriosis",
    excerpt: "BioWorld reports on EndoCyclic Therapeutics' NIH CRP grant award, highlighting the therapeutic's potential in addressing unmet needs in endometriosis treatment and the significance of this funding in advancing ENDO-205 toward commercialization.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.bioworld.com/articles/724279-endocyclics-endo-205-awarded-nih-grant-for-endometriosis",
  },
  {
    id: 4,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "ENDO-205: First Non-Hormonal, Disease-Modifying Therapeutic for Endometriosis",
    excerpt: "EndoCyclic Therapeutics' ENDO-205 employs a pH-sensitive peptide mechanism that selectively eliminates lesions at the disease site while preserving healthy tissue. This innovative approach has the potential to become the first-ever disease-modifying therapy for endometriosis, affecting over 190 million women globally.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
  },
  {
    id: 5,
    type: "Award",
    date: "Sep 16, 2025",
    source: "NIH NICHD",
    title: "NIH Commercialization Readiness Pilot Program Grant Awarded",
    excerpt: "The Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD) awarded EndoCyclic Therapeutics a Commercialization Readiness Pilot Program grant with a perfect impact score, recognizing the company's innovative approach to addressing endometriosis, a condition affecting 10% of women of reproductive age.",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://seed.nih.gov/portfolio/nih-portfolio-company-showcase/endocyclic-therapeutics",
  },
  {
    id: 6,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "EndoCyclic Therapeutics",
    title: "Dr. Tanya Petrossian on ENDO-205's Transformative Potential",
    excerpt: "Dr. Tanya Petrossian, CEO of EndoCyclic Therapeutics, emphasizes that ENDO-205 has the potential to deliver a transformative, disease-modifying solution for women living with endometriosis, addressing a condition with an economic burden exceeding $200 billion annually in the U.S. alone.",
    image: "/team/tanya-petrossian.avif",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
  },
  {
    id: 7,
    type: "Award",
    date: "Mar 20, 2020",
    source: "NIH NICHD",
    title: "NIH NICHD Director's Corner Highlights EndoCyclic Therapeutics",
    excerpt: "The Director's Corner of the Eunice Kennedy Shriver National Institute of Child Health and Human Development features EndoCyclic Therapeutics and its novel approach to developing non-hormonal therapeutics for endometriosis.",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://www.nichd.nih.gov/",
  },
  {
    id: 8,
    type: "Press Release",
    date: "Oct 13, 2017",
    source: "UCLA",
    title: "Alumna Creates Company to Develop Nonhormonal Endometriosis Treatment",
    excerpt: "UCLA highlights alumna Dr. Tanya Petrossian and her founding of EndoCyclic Therapeutics, a company dedicated to developing the first non-hormonal treatment for endometriosis using innovative cyclic peptide technology.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.ucla.edu/",
  },
  {
    id: 9,
    type: "Interview",
    date: "Nov 3, 2017",
    source: "EndoCyclic Therapeutics",
    title: "Tanya Petrossian Discusses Endometriosis",
    excerpt: "Dr. Tanya Petrossian, CEO and Founder of EndoCyclic Therapeutics, discusses the urgent need for non-hormonal endometriosis treatments and the company's innovative peptide-based approach to addressing this chronic condition.",
    image: "/team/tanya-petrossian.avif",
    link: "https://www.endocyclictherapeutics.com/news",
  },
];
