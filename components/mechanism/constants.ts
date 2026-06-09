
/**
 * Mechanism visualization color palette
 * Aligned with reference graphic: warm peach/cream tissues, gold/amber peptides
 */
export const MECHANISM_COLORS = {
  // Tissue backgrounds — warm peach/cream tones matching reference
  normalTissue: '#FDEBD0',       // Warm cream for normal tissue bg
  normalTissueDark: '#F5D5A8',   // Slightly deeper peach for depth
  lesionTissue: '#FDE0C5',       // Warmer peach for lesion tissue
  lesionTissueDark: '#F9CFA8',   // Deeper salmon-peach for lesion depth

  // Peptide colors — gold/amber matching reference
  peptideInactive: '#C9A961',    // Brand gold for inactive peptides
  peptideActive: '#C9A961',      // Same gold for active (reference uses same)
  peptideDark: '#A68945',        // Darker gold for outlines/strokes

  // Cell membrane — thick gold/amber stroke matching reference
  cellMembrane: '#A68945',       // Dark gold membrane outline
  cellMembraneLight: '#C9A961',  // Lighter gold fill

  // Intracellular target
  intracellularTarget: '#C9A961', // Gold target (matching reference callout)
  intracellularTargetDark: '#8B7535', // Deep amber

  // Accent colors
  phRed: '#E53E3E',             // Red for H+ proton labels
  calloutGold: '#F6C547',       // Bright gold for callout boxes (matching reference)
  calloutGoldBg: '#FEF3C7',     // Light gold background for callout

  // Neutral
  background: '#FFFFFF',
  textDark: '#1A1A1A',
  textLight: '#FFFFFF',
  divider: '#1A1A1A',           // Black vertical divider (matching reference)
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
