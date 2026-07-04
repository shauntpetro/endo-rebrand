/**
 * SelectiveUptake — Calm Clinical scientific figure.
 * A tissue field of healthy cells (teal outline) and one diseased cluster
 * (rose-washed, acidic rose halo). Teal cyclic-ring peptides diffuse across;
 * they are taken up ONLY by the diseased cells, and simply pass by the
 * healthy cells. One idea: selectivity. Static, server-rendered SVG.
 * Traceable to truth.md: "Selective uptake by diseased tissue via
 * proprietary endocytic pathway"; non-hormonal precision peptide.
 */
export default function SelectiveUptake() {
  return (
    <svg
      viewBox="0 0 900 420"
      role="img"
      aria-labelledby="selUptakeTitle selUptakeDesc"
      className="w-full"
    >
      <title id="selUptakeTitle">Selective uptake of the peptide by diseased tissue</title>
      <desc id="selUptakeDesc">
        A field of healthy cells drawn as teal outline circles, and one cluster of
        diseased cells drawn rose-washed within a soft rose acidic halo. Teal cyclic-ring
        peptides diffuse across the field. Arrows show the peptides being taken up only by
        the diseased cells, while near healthy cells they pass by without uptake.
      </desc>

      <defs>
        {/* soft rose halo = acidic disease microenvironment */}
        <radialGradient id="su-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBF4F3" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#FBF4F3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FBF4F3" stopOpacity="0" />
        </radialGradient>

        {/* teal arrowhead — active uptake */}
        <marker
          id="su-arrTeal"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#2F6E62" />
        </marker>

        {/* gray arrowhead — no uptake, passes by */}
        <marker
          id="su-arrGray"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#B7B2BB" />
        </marker>

        {/* a single cyclic peptide ring (residue beads on a teal ring) */}
        <g id="su-peptide" aria-hidden="true">
          <circle r="8" fill="#EDF5F2" stroke="#4A9B8E" strokeWidth="2" />
          <circle cx="8" cy="0" r="2.3" fill="#2F6E62" />
          <circle cx="4" cy="6.93" r="2.3" fill="#2F6E62" />
          <circle cx="-4" cy="6.93" r="2.3" fill="#2F6E62" />
          <circle cx="-8" cy="0" r="2.3" fill="#2F6E62" />
          <circle cx="-4" cy="-6.93" r="2.3" fill="#2F6E62" />
          <circle cx="4" cy="-6.93" r="2.3" fill="#2F6E62" />
        </g>
      </defs>

      {/* paper */}
      <rect x="1" y="1" width="898" height="418" rx="12" fill="#FBFAF8" stroke="#2E263A24" />

      {/* subtle divider between the two tissue zones */}
      <line
        x1="470"
        y1="70"
        x2="470"
        y2="350"
        stroke="#2E263A24"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
        aria-hidden="true"
      />

      {/* ============ DISEASED TISSUE (right) ============ */}
      {/* acidic rose halo */}
      <ellipse cx="670" cy="215" rx="185" ry="150" fill="url(#su-halo)" aria-hidden="true" />
      <ellipse
        cx="670"
        cy="215"
        rx="150"
        ry="120"
        fill="none"
        stroke="#C98B84"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
        opacity="0.75"
        aria-hidden="true"
      />

      {/* diseased cells: rose-washed */}
      <g fill="#FBF4F3" stroke="#C98B84" strokeWidth="1.5">
        <circle cx="628" cy="175" r="26" />
        <circle cx="705" cy="182" r="23" />
        <circle cx="608" cy="245" r="23" />
        <circle cx="683" cy="252" r="26" />
        <circle cx="742" cy="238" r="21" />
      </g>
      {/* one peptide already internalised inside a diseased cell (uptake result) */}
      <use href="#su-peptide" transform="translate(742,238) scale(0.8)" />

      {/* ============ HEALTHY TISSUE (left) ============ */}
      <g fill="#EDF5F2" stroke="#4A9B8E" strokeWidth="1.5">
        <circle cx="112" cy="142" r="24" />
        <circle cx="188" cy="238" r="26" />
        <circle cx="142" cy="322" r="22" />
        <circle cx="252" cy="122" r="24" />
        <circle cx="305" cy="218" r="26" />
        <circle cx="250" cy="318" r="22" />
        <circle cx="362" cy="160" r="24" />
        <circle cx="388" cy="292" r="24" />
      </g>

      {/* ============ UPTAKE arrows (teal) into diseased cells ============ */}
      <g fill="none" stroke="#2F6E62" strokeWidth="1.5" strokeLinecap="round">
        <path d="M556,118 Q592,132 610,160" markerEnd="url(#su-arrTeal)" />
        <path d="M800,146 Q754,156 724,176" markerEnd="url(#su-arrTeal)" />
        <path d="M700,342 Q690,312 684,282" markerEnd="url(#su-arrTeal)" />
      </g>
      {/* peptides arriving at diseased cells */}
      <use href="#su-peptide" transform="translate(550,110)" />
      <use href="#su-peptide" transform="translate(806,142)" />
      <use href="#su-peptide" transform="translate(704,350)" />

      {/* ============ PASS-BY arrows (gray) skirting healthy cells ============ */}
      <g fill="none" stroke="#B7B2BB" strokeWidth="1.5" strokeLinecap="round">
        <path d="M300,110 Q362,86 432,126" markerEnd="url(#su-arrGray)" />
        <path d="M232,116 Q205,220 250,342" markerEnd="url(#su-arrGray)" />
      </g>
      {/* peptides drifting past healthy cells */}
      <use href="#su-peptide" transform="translate(294,106)" />
      <use href="#su-peptide" transform="translate(228,110)" />

      {/* ============ small caps annotations ============ */}
      <text
        x="670"
        y="118"
        textAnchor="middle"
        fill="#2F6E62"
        fontSize="12"
        letterSpacing="1.5"
      >
        UPTAKE
      </text>
      <text
        x="235"
        y="392"
        textAnchor="middle"
        fill="#6F6A76"
        fontSize="12"
        letterSpacing="1.5"
      >
        NO UPTAKE
      </text>

      {/* ============ zone labels ============ */}
      <text x="235" y="60" textAnchor="middle" fill="#2E263A" fontSize="16">
        Healthy tissue — unaffected
      </text>
      <text x="670" y="392" textAnchor="middle" fill="#2E263A" fontSize="16">
        Diseased tissue — selective uptake
      </text>
    </svg>
  );
}
