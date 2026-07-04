/**
 * OncologyMechanism — Calm Clinical scientific figure.
 *
 * Three-stage flow: a "cold" tumor (muted gray cell cluster) → a teal cyclic
 * peptide crosses the cell membrane to engage a previously-undruggable
 * intracellular target (drawn as a locked keyhole) → "restored responsiveness"
 * (the tumor shifts from gray toward teal immune/response markers).
 *
 * Only truth.md-traceable content: the "25%+ of solid tumor types" note and the
 * "undruggable intracellular target" language are drawn directly from truth.md
 * (ENDO-995, Oncology Therapeutic). No efficacy or invented numbers.
 *
 * Server component: no "use client", no hooks, no animation.
 */
export default function OncologyMechanism() {
  return (
    <svg
      viewBox="0 0 900 400"
      role="img"
      aria-labelledby="oncomech-title oncomech-desc"
      className="w-full"
    >
      <title id="oncomech-title">
        Unlocking undruggable targets in cold solid tumors
      </title>
      <desc id="oncomech-desc">
        A three-stage schematic. Left: a cold tumor shown as a cluster of muted
        gray cells with sparse markers. Center: a teal cyclic peptide crosses a
        single cell membrane to engage a previously undruggable intracellular
        target, drawn as a locked keyhole that the peptide docks into. Right:
        restored responsiveness, where the tumor shifts from gray toward teal
        immune and response markers. A note reads: potential across twenty-five
        percent or more of solid tumor types.
      </desc>

      <rect x="1" y="1" width="898" height="398" rx="12" fill="#FBFAF8" stroke="#2E263A24" />

      {/* ================= STAGE 1 — COLD TUMOR ================= */}
      <g aria-hidden="true">
        {/* cold cell cluster (gray, inert) */}
        <g fill="#E4E1E6" stroke="#B7B2BB" strokeWidth="1.5">
          <circle cx="150" cy="150" r="22" />
          <circle cx="112" cy="185" r="22" />
          <circle cx="190" cy="182" r="22" />
          <circle cx="150" cy="205" r="22" />
          <circle cx="118" cy="228" r="18" />
          <circle cx="188" cy="228" r="18" />
        </g>
        {/* sparse inert markers */}
        <g fill="#B7B2BB">
          <circle cx="150" cy="150" r="3" />
          <circle cx="190" cy="182" r="3" />
          <circle cx="150" cy="205" r="3" />
        </g>
      </g>
      <text
        x="150"
        y="300"
        textAnchor="middle"
        fill="#2F6E62"
        fontSize="14"
        letterSpacing="1.5"
        style={{ textTransform: "uppercase" }}
      >
        Cold tumor
      </text>
      <text x="150" y="322" textAnchor="middle" fill="#6F6A76" fontSize="13">
        Poorly responsive, few markers
      </text>

      {/* arrow 1 → */}
      <g aria-hidden="true" stroke="#6F6A76" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M246 182 H304" />
        <path d="M296 175 L306 182 L296 189" fill="#6F6A76" stroke="none" />
      </g>

      {/* ================= STAGE 2 — ENGAGE UNDRUGGABLE TARGET ================= */}
      <g aria-hidden="true">
        {/* acidic disease microenvironment: soft rose halo (used sparingly) */}
        <ellipse cx="450" cy="182" rx="118" ry="112" fill="#FBF4F3" />
        <ellipse cx="450" cy="182" rx="118" ry="112" fill="none" stroke="#C98B84" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.7" />

        {/* single cell + membrane bilayer */}
        <circle cx="450" cy="182" r="90" fill="#FFFFFF" stroke="#2E263A" strokeWidth="1.5" />
        <circle cx="450" cy="182" r="84" fill="none" stroke="#2E263A24" strokeWidth="1.5" />

        {/* dashed teal route: entry ring → docked ring at the target */}
        <path
          d="M372 182 C 402 168, 424 176, 448 182"
          fill="none"
          stroke="#4A9B8E"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />

        {/* teal cyclic peptide crossing the membrane (left edge) */}
        <CyclicRing cx={365} cy={182} />

        {/* undruggable intracellular target — a locked padlock/keyhole (gray) */}
        <g>
          {/* shackle */}
          <path
            d="M474 178 v-10 a15 15 0 0 1 30 0 v10"
            fill="none"
            stroke="#B7B2BB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* body */}
          <rect x="466" y="178" width="46" height="38" rx="7" fill="#E4E1E6" stroke="#B7B2BB" strokeWidth="1.5" />
          {/* keyhole — engaged in teal to show the peptide unlocking it */}
          <circle cx="489" cy="193" r="5" fill="none" stroke="#2F6E62" strokeWidth="1.5" />
          <path d="M489 197 v9" stroke="#2F6E62" strokeWidth="1.5" strokeLinecap="round" />
          {/* docked peptide ring engaging the keyhole */}
          <CyclicRing cx={489} cy={193} scale={0.55} />
        </g>
      </g>
      <text
        x="450"
        y="300"
        textAnchor="middle"
        fill="#2F6E62"
        fontSize="14"
        letterSpacing="1.5"
        style={{ textTransform: "uppercase" }}
      >
        Undruggable intracellular target
      </text>
      <text x="450" y="322" textAnchor="middle" fill="#6F6A76" fontSize="13">
        Cyclic peptide crosses the membrane and engages the target
      </text>

      {/* arrow 2 → */}
      <g aria-hidden="true" stroke="#6F6A76" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M596 182 H654" />
        <path d="M646 175 L656 182 L646 189" fill="#6F6A76" stroke="none" />
      </g>

      {/* ================= STAGE 3 — RESTORED RESPONSIVENESS ================= */}
      <g aria-hidden="true">
        {/* tumor cluster shifting toward teal (healthy / responsive) */}
        <g fill="#EDF5F2" stroke="#4A9B8E" strokeWidth="1.5">
          <circle cx="750" cy="150" r="22" />
          <circle cx="712" cy="185" r="22" />
          <circle cx="790" cy="182" r="22" />
          <circle cx="750" cy="205" r="22" />
          <circle cx="718" cy="228" r="18" />
          <circle cx="788" cy="228" r="18" />
        </g>
        {/* teal response / immune markers (denser, active) */}
        <g fill="#4A9B8E">
          <circle cx="750" cy="150" r="3.5" />
          <circle cx="712" cy="185" r="3.5" />
          <circle cx="790" cy="182" r="3.5" />
          <circle cx="750" cy="205" r="3.5" />
          <circle cx="718" cy="228" r="3" />
          <circle cx="788" cy="228" r="3" />
        </g>
        {/* small immune "response" cues (teal chevrons) approaching the cluster */}
        <g fill="#EDF5F2" stroke="#2F6E62" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M672 140 l8 5 l-8 5 z" />
          <path d="M676 250 l8 5 l-8 5 z" />
          <path d="M828 148 l-8 5 l8 5 z" />
        </g>
      </g>
      <text
        x="750"
        y="300"
        textAnchor="middle"
        fill="#2F6E62"
        fontSize="14"
        letterSpacing="1.5"
        style={{ textTransform: "uppercase" }}
      >
        Restored responsiveness
      </text>
      <text x="750" y="322" textAnchor="middle" fill="#6F6A76" fontSize="13">
        Tumor shifts toward an active, responsive state
      </text>

      {/* ================= FOOTNOTE (truth.md) ================= */}
      <line x1="60" y1="352" x2="840" y2="352" stroke="#2E263A24" strokeWidth="1.5" />
      <text x="450" y="376" textAnchor="middle" fill="#6F6A76" fontSize="13">
        Potential applicability across 25%+ of solid tumor types
      </text>
    </svg>
  );
}

/** A small teal cyclic peptide ring (six beads), the shared "peptide" motif. */
function CyclicRing({
  cx,
  cy,
  scale = 1,
}: {
  cx: number;
  cy: number;
  scale?: number;
}) {
  const R = 16 * scale;
  const r = 4.5 * scale;
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const ringPath =
    nodes
      .map((n, i) => `${i === 0 ? "M" : "L"}${n.x.toFixed(1)} ${n.y.toFixed(1)}`)
      .join(" ") + " Z";
  return (
    <g aria-hidden="true">
      <path d={ringPath} fill="none" stroke="#4A9B8E" strokeWidth="1.5" strokeLinejoin="round" />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={r} fill="#4A9B8E" />
      ))}
    </g>
  );
}
