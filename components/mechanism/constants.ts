
/**
 * Mechanism visualization color palette — "Clinical Precision" language
 * Flat, very light grounds; hairline ink/charcoal line work; gold as the single accent.
 */
export const MECHANISM_COLORS = {
  // Tissue backgrounds — flat, very light clinical grounds
  normalTissue: '#F6F3EE',
  normalTissueDark: '#EAE5DC',
  lesionTissue: '#FAF2EB',
  lesionTissueDark: '#F0E6DB',

  // Peptide — gold is the single accent; inactive reads neutral
  peptideInactive: '#A8A299',    // muted neutral (inactive)
  peptideActive: '#C9A961',      // gold accent (active)
  peptideDark: '#A68945',

  // Cell membrane — hairline ink/charcoal line work
  cellMembrane: '#4A4843',
  cellMembraneLight: '#C3BDB1',

  // Intracellular target — ink outline
  intracellularTarget: '#4A4843',
  intracellularTargetDark: '#2E2C28',

  // Accents
  phRed: '#C2553F',             // muted clinical red for H+
  calloutGold: '#C9A961',
  calloutGoldBg: '#F6F0E2',

  // Neutral
  background: '#FFFFFF',
  textDark: '#1A1A1A',
  textLight: '#FFFFFF',
  divider: '#1A1A1A',
};

export const STEPS = [
  {
    id: 1,
    title: "The Discovery",
    description: "After screening trillions of peptide sequences, EndoCyclic researchers discovered a rare class that defies convention. Rather than binding broadly and flooding the body, these peptides are absorbed exclusively by diseased tissue — leaving healthy cells untouched. It was a breakthrough that redefined what targeted therapy could look like.",
    detail: "One rare class among trillions."
  },
  {
    id: 2,
    title: "The Goldilocks Modality",
    description: "Small molecules lack precision. Antibodies are too large to enter cells. Cyclic peptides occupy the sweet spot — large enough to bind complex intracellular targets with high specificity, yet compact enough to penetrate cell membranes and reach disease biology that other modalities simply cannot access.",
    detail: "The structure is the therapeutic."
  },
  {
    id: 3,
    title: "Selective Uptake",
    description: "EndoCyclic identified a specific endocytic pathway that is active exclusively in diseased tissue. Our peptides are engineered to exploit that pathway for entry — ensuring they accumulate only where pathology is present, while healthy tissue passively excludes them.",
    detail: "Healthy cells don't absorb our peptides."
  },
  {
    id: 4,
    title: "Smart Activation",
    description: "Even after cellular entry, the peptide remains dormant until it encounters the acidic pH characteristic of diseased microenvironments. This pH-triggered activation acts as a second layer of selectivity — ensuring the therapeutic payload engages only at the site of disease.",
    detail: "Activity only where it belongs."
  },
  {
    id: 5,
    title: "Target Engagement",
    description: "Once activated, the peptide directly binds its intracellular target to reshape protein structure and suppress pathogenic signaling. Diseased cells that depend on these cues quietly recede — not through cytotoxic destruction, but through precise molecular correction.",
    detail: "Correction, not destruction."
  }
];
