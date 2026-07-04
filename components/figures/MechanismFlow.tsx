/**
 * MechanismFlow — flagship 3-stage mechanism figure (static, server component).
 * Stage 1 pH-mediated activation · Stage 2 Selective uptake · Stage 3 Correction, not destruction.
 * All content traceable to truth.md (Platform + ENDO-205). No efficacy numbers.
 */

const RING_NODES: [number, number][] = [
  [20, 0],
  [10, 17.32],
  [-10, 17.32],
  [-20, 0],
  [-10, -17.32],
  [10, -17.32],
];

function Ring({
  cx,
  cy,
  active = true,
  scale = 1,
}: {
  cx: number;
  cy: number;
  active?: boolean;
  scale?: number;
}) {
  const stroke = active ? "#4A9B8E" : "#B7B2BB";
  const node = active ? "#4A9B8E" : "#E4E1E6";
  const nodeStroke = active ? "#2F6E62" : "#B7B2BB";
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} aria-hidden="true">
      <circle r={20} fill="none" stroke={stroke} strokeWidth={1.5} />
      {RING_NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={4.5}
          fill={node}
          stroke={nodeStroke}
          strokeWidth={1}
        />
      ))}
    </g>
  );
}

export default function MechanismFlow() {
  return (
    <svg
      viewBox="0 0 960 430"
      role="img"
      aria-labelledby="mf-title mf-desc"
      className="w-full"
      fill="none"
    >
      <title id="mf-title">
        EndoCyclic precision peptide mechanism in three stages
      </title>
      <desc id="mf-desc">
        Stage one, pH-mediated activation: the cyclic peptide stays inert at
        physiological pH near 7.4 and switches on in the acidic disease
        microenvironment. Stage two, selective uptake: the active peptide is
        taken into a diseased cell while adjacent healthy tissue is passed over.
        Stage three, correction not destruction: the lesion resolves while
        surrounding healthy tissue remains intact.
      </desc>

      <defs>
        <marker
          id="mf-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M1,1 L8,5 L1,9"
            fill="none"
            stroke="#6F6A76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
        <marker
          id="mf-arrow-teal"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M1,1 L8,5 L1,9"
            fill="none"
            stroke="#4A9B8E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* ============ STAGE 1 — pH-mediated activation (center ~145) ============ */}
      <text
        x="145"
        y="40"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.5"
        fill="#2F6E62"
      >
        STAGE 1
      </text>
      <text
        x="145"
        y="66"
        textAnchor="middle"
        fontSize="17.5"
        fontWeight="600"
        fill="#2E263A"
      >
        pH-mediated activation
      </text>

      {/* neutral zone */}
      <rect
        x="42"
        y="112"
        width="88"
        height="150"
        rx="10"
        fill="#F6F3EE"
        stroke="#2E263A24"
        strokeWidth="1.5"
      />
      <Ring cx={86} cy={187} active={false} />
      <text
        x="86"
        y="245"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#6F6A76"
      >
        pH ~7.4
      </text>

      {/* internal transition arrow */}
      <line
        x1="136"
        y1="187"
        x2="160"
        y2="187"
        stroke="#6F6A76"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow)"
      />

      {/* acidic zone */}
      <rect
        x="166"
        y="112"
        width="88"
        height="150"
        rx="10"
        fill="#FBF4F3"
        stroke="#C98B84"
        strokeWidth="1.5"
      />
      <circle cx="210" cy="187" r="32" fill="#C98B84" opacity="0.12" aria-hidden="true" />
      <Ring cx={210} cy={187} active />
      <text
        x="210"
        y="245"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#6F6A76"
      >
        ACIDIC
      </text>

      <text x="145" y="345" textAnchor="middle" fontSize="13" fill="#6F6A76">
        Inert at physiological pH; switches on
      </text>
      <text x="145" y="364" textAnchor="middle" fontSize="13" fill="#6F6A76">
        only in the acidic disease microenvironment.
      </text>

      {/* connecting arrow 1 */}
      <line
        x1="270"
        y1="187"
        x2="346"
        y2="187"
        stroke="#6F6A76"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow)"
      />

      {/* ============ STAGE 2 — Selective uptake (center ~480) ============ */}
      <text
        x="480"
        y="40"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.5"
        fill="#2F6E62"
      >
        STAGE 2
      </text>
      <text
        x="480"
        y="66"
        textAnchor="middle"
        fontSize="17.5"
        fontWeight="600"
        fill="#2E263A"
      >
        Selective uptake
      </text>

      {/* diseased cell */}
      <circle
        cx="438"
        cy="190"
        r="54"
        fill="#FBF4F3"
        stroke="#C98B84"
        strokeWidth="1.5"
      />
      {/* internalised vesicle carrying the peptide */}
      <circle cx="452" cy="196" r="14" fill="#EDF5F2" stroke="#4A9B8E" strokeWidth="1.5" />
      <Ring cx={452} cy={196} active scale={0.45} />
      {/* peptide entering via endocytosis */}
      <Ring cx={392} cy={132} active scale={0.62} />
      <path
        d="M405 146 Q432 158 446 180"
        fill="none"
        stroke="#4A9B8E"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow-teal)"
      />
      <text
        x="438"
        y="268"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#6F6A76"
      >
        DISEASED CELL
      </text>

      {/* healthy cell — passed over */}
      <circle cx="566" cy="205" r="42" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
      <Ring cx={548} cy={118} active scale={0.62} />
      <line
        x1="512"
        y1="118"
        x2="612"
        y2="118"
        stroke="#6F6A76"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow)"
      />
      <text
        x="566"
        y="268"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#2F6E62"
      >
        HEALTHY CELL
      </text>

      <text x="480" y="345" textAnchor="middle" fontSize="13" fill="#6F6A76">
        Taken up by diseased cells;
      </text>
      <text x="480" y="364" textAnchor="middle" fontSize="13" fill="#6F6A76">
        adjacent healthy tissue is passed over.
      </text>

      {/* connecting arrow 2 */}
      <line
        x1="626"
        y1="187"
        x2="702"
        y2="187"
        stroke="#6F6A76"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow)"
      />

      {/* ============ STAGE 3 — Correction, not destruction (center ~825) ============ */}
      <text
        x="825"
        y="40"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.5"
        fill="#2F6E62"
      >
        STAGE 3
      </text>
      <text
        x="825"
        y="66"
        textAnchor="middle"
        fontSize="17.5"
        fontWeight="600"
        fill="#2E263A"
      >
        Correction, not destruction
      </text>

      {/* resolving lesion (fading rose) */}
      <path
        d="M742 168 Q726 190 742 212 Q762 228 782 212 Q796 190 782 168 Q762 152 742 168 Z"
        fill="#FBF4F3"
        stroke="#C98B84"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity="0.6"
      />
      <text
        x="762"
        y="268"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#6F6A76"
      >
        LESION RESOLVES
      </text>

      {/* transition arrow */}
      <line
        x1="806"
        y1="190"
        x2="842"
        y2="190"
        stroke="#6F6A76"
        strokeWidth="1.5"
        strokeLinecap="round"
        markerEnd="url(#mf-arrow)"
      />

      {/* intact healthy tissue (clean teal outlines) */}
      <circle cx="890" cy="172" r="24" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
      <circle cx="912" cy="204" r="21" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
      <circle cx="874" cy="210" r="19" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
      <text
        x="892"
        y="268"
        textAnchor="middle"
        fontSize="11.5"
        letterSpacing="1.2"
        fill="#2F6E62"
      >
        HEALTHY TISSUE
      </text>

      <text x="825" y="345" textAnchor="middle" fontSize="13" fill="#6F6A76">
        The lesion resolves while surrounding
      </text>
      <text x="825" y="364" textAnchor="middle" fontSize="13" fill="#6F6A76">
        healthy tissue remains intact.
      </text>
    </svg>
  );
}
