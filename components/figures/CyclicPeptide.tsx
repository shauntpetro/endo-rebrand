/**
 * CyclicPeptide — a quiet molecular schematic contrasting a floppy linear
 * peptide (open gray chain) with EndoCyclic's constrained cyclic peptide
 * (closed teal ring, the hero). Static, journal-grade "Calm Clinical" style.
 * Server component: no "use client", no hooks, no animation.
 */
export default function CyclicPeptide() {
  return (
    <svg
      viewBox="0 0 900 420"
      role="img"
      aria-labelledby="cyclicpeptide-title cyclicpeptide-desc"
      className="w-full"
    >
      <title id="cyclicpeptide-title">
        Linear peptide versus cyclic peptide
      </title>
      <desc id="cyclicpeptide-desc">
        A flexible open chain of amino-acid residues is cyclized into a closed
        ring. The constrained ring gives a defined shape for selective binding,
        metabolic stability, and access to intracellular targets.
      </desc>

      {/* ---------------- Panel titles ---------------- */}
      <text
        x="200"
        y="68"
        textAnchor="middle"
        fontSize="14"
        letterSpacing="1.5"
        fill="#6f6a76"
      >
        LINEAR PEPTIDE
      </text>
      <text
        x="610"
        y="68"
        textAnchor="middle"
        fontSize="14"
        letterSpacing="1.5"
        fill="#2f6e62"
      >
        CYCLIC PEPTIDE
      </text>

      {/* ---------------- Left: floppy open chain (inert / gray) ---------------- */}
      <g
        stroke="#b7b2bb"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* backbone bonds */}
        <polyline points="90,250 134,205 178,255 222,200 266,250 310,205" />
        {/* free termini stubs */}
        <line x1="90" y1="250" x2="66" y2="262" />
        <line x1="310" y1="205" x2="334" y2="193" />
      </g>
      {/* residues */}
      <g fill="#e4e1e6" stroke="#b7b2bb" strokeWidth="1.5">
        <circle cx="90" cy="250" r="13" />
        <circle cx="134" cy="205" r="13" />
        <circle cx="178" cy="255" r="13" />
        <circle cx="222" cy="200" r="13" />
        <circle cx="266" cy="250" r="13" />
        <circle cx="310" cy="205" r="13" />
      </g>
      {/* termini labels */}
      <text x="54" y="266" fontSize="12" fill="#6f6a76" textAnchor="end">
        N
      </text>
      <text x="346" y="190" fontSize="12" fill="#6f6a76">
        C
      </text>
      <text x="200" y="332" textAnchor="middle" fontSize="13" fill="#6f6a76">
        flexible open chain — metabolically labile
      </text>

      {/* ---------------- Cyclization arrow ---------------- */}
      <text
        x="410"
        y="208"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.5"
        fill="#2f6e62"
      >
        CYCLIZATION
      </text>
      <g
        stroke="#4a9b8e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <line x1="368" y1="225" x2="450" y2="225" />
        <polyline points="440,219 452,225 440,231" />
      </g>

      {/* ---------------- Right: cyclic ring (the hero / active teal) ---------------- */}
      {/* ring bonds (closed hexagon) */}
      <polygon
        points="610,157 668.9,191 668.9,259 610,293 551.1,259 551.1,191"
        fill="#edf5f2"
        stroke="#4a9b8e"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* residues — filled teal = active / on */}
      <g fill="#4a9b8e">
        <circle cx="610" cy="157" r="14" />
        <circle cx="668.9" cy="191" r="14" />
        <circle cx="668.9" cy="259" r="14" />
        <circle cx="610" cy="293" r="14" />
        <circle cx="551.1" cy="259" r="14" />
        <circle cx="551.1" cy="191" r="14" />
      </g>

      {/* ---------------- Annotations pointing to the ring ---------------- */}
      <g
        stroke="#2e263a24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        aria-hidden="true"
      >
        {/* A: top-right */}
        <polyline points="668.9,191 705,180 720,180" />
        {/* B: mid-right */}
        <polyline points="668.9,259 705,270 720,270" />
        {/* C: bottom */}
        <line x1="610" y1="293" x2="610" y2="340" />
      </g>
      {/* leader anchor dots */}
      <g fill="#2f6e62" aria-hidden="true">
        <circle cx="668.9" cy="191" r="2.5" />
        <circle cx="668.9" cy="259" r="2.5" />
        <circle cx="610" cy="293" r="2.5" />
      </g>

      {/* annotation text */}
      <text x="726" y="176" fontSize="14" fill="#2e263a">
        Constrained shape →
      </text>
      <text x="726" y="194" fontSize="14" fill="#2e263a">
        selective binding
      </text>
      <text x="726" y="274" fontSize="14" fill="#2e263a">
        Metabolically stable
      </text>
      <text x="610" y="362" textAnchor="middle" fontSize="14" fill="#2e263a">
        Reaches intracellular targets
      </text>
    </svg>
  );
}
