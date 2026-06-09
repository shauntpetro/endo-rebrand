export type CandidateType = "Therapeutic" | "Diagnostic";
export type DiseaseArea = "Endometriosis" | "Oncology";

export interface PipelineItem {
  id: string;
  name: string;
  mechanism: string;
  indication: string;
  area: DiseaseArea;
  phase: number;      // index into PHASES
  progress: number;   // 0-1 progress within phase
  type: CandidateType;
  status: string;
  description: string;
  highlights?: string[];
}

export const PHASES = ["Discovery", "Preclinical", "IND Enabling", "Phase 1", "Phase 2", "Phase 3"] as const;

export const pipeline: PipelineItem[] = [
  {
    id: "ENDO-205",
    name: "ENDO-205",
    mechanism: "Intracellular Peptide Inhibitor",
    indication: "Endometriosis (Non-Hormonal)",
    area: "Endometriosis",
    phase: 3,
    progress: 0.1,
    type: "Therapeutic",
    status: "IND Cleared",
    description: "First-in-class non-hormonal therapeutic targeting the root cause of endometriosis lesions. IND cleared, advancing to clinical trials.",
    highlights: [
      "Short-course treatment under investigation for full and durable lesion clearance",
      "Designed to preserve fertility and avoid hormonal suppression",
      "Targeted mechanism, selectively absorbed by diseased tissue",
    ],
  },
  {
    id: "FemLUNA",
    name: "FemLUNA™",
    mechanism: "Targeted Imaging Agent",
    indication: "Diagnostic Imaging",
    area: "Endometriosis",
    phase: 2,
    progress: 0.5,
    type: "Diagnostic",
    status: "Lead Diagnostic",
    description: "Investigational imaging agent being developed to enable early, accurate, and non-invasive detection of all subtypes of endometriosis, including superficial and sub-millimeter lesions missed by current imaging.",
    highlights: [
      "Developed to visualize all lesion subtypes, including those difficult to detect with standard imaging",
      "Radiation-free, non-hormonal, and free of heavy metals",
      "Intended for use across sensitive populations, including adolescents and reproductive-age women",
      "Compatible with standard and low-field imaging platforms",
    ],
  },
  {
    id: "ENDO-995",
    name: "ENDO-995",
    mechanism: "Tumor-Selective Cyclic Peptide",
    indication: "Malignant Solid Tumors",
    area: "Oncology",
    phase: 1,
    progress: 0.75,
    type: "Therapeutic",
    status: "Preclinical",
    description: "Novel non-hormonal therapeutic peptide in development for malignant solid tumors, with initial focus on colon and endometrial cancers. Designed to overcome therapeutic resistance and restore responsiveness in cold tumors, with potential applicability across 25%+ of all solid tumor types.",
    highlights: [
      "Targets malignant solid tumors with tumor-specific selectivity",
      "Designed to overcome therapeutic resistance and restore responsiveness in cold tumors",
      "Unlocks access to previously undruggable intracellular targets through selective peptide engineering",
    ],
  },
  {
    id: "ENDO-311",
    name: "ENDO-311",
    mechanism: "Targeted Imaging Agent",
    indication: "Solid Tumor Diagnostics",
    area: "Oncology",
    phase: 1,
    progress: 0.6,
    type: "Diagnostic",
    status: "Preclinical",
    description: "Investigational imaging agent for non-invasive detection and monitoring of malignant solid tumors, with initial focus on colon cancer. Radiation-free, non-hormonal, and free of heavy metals. Designed for early-stage tumor localization and disease monitoring.",
    highlights: [
      "Radiation-free, non-hormonal, and free of heavy metals",
      "Compatible with standard imaging systems",
      "Designed for early-stage tumor localization and disease monitoring",
    ],
  },
];
