import { PIPELINE, PHASES } from "@/lib/site";

/**
 * PhaseTimeline — a calm, journal-grade development-stage chart.
 *
 * A single horizontal axis across six development stages. Each of the four
 * pipeline programs is plotted as a progress track ending in a marker at its
 * current `phaseIndex`. Therapeutics read as a filled teal dot; diagnostics as
 * an open teal ring. All positions and copy trace to lib/site (→ truth.md).
 *
 * Server component — static SVG, no client code.
 */
export default function PhaseTimeline() {
  // ---- Geometry (viewBox units) ------------------------------------------
  const VB_W = 900;
  const VB_H = 380;

  const chartX0 = 210; // left edge of the phase grid
  const chartX1 = 862; // right edge of the phase grid
  const gridTop = 84;
  const gridBottom = 314;

  const cols = PHASES.length; // 6
  const colW = (chartX1 - chartX0) / cols;
  const colCenter = (i: number) => chartX0 + colW * (i + 0.5);

  const rowY = (i: number) => 128 + i * 52; // one row per program

  const barStart = colCenter(0); // every track starts at Discovery

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-labelledby="phasetimeline-title phasetimeline-desc"
      className="w-full"
    >
      <title id="phasetimeline-title">
        EndoCyclic development pipeline by clinical phase
      </title>
      <desc id="phasetimeline-desc">
        A horizontal axis across six phases — Discovery, Preclinical,
        IND-enabling, Phase 1, Phase 2, and Phase 3. ENDO-205 (therapeutic) is
        at Phase 1; FemLUNA (diagnostic) is IND-enabling; ENDO-995 (therapeutic)
        and ENDO-311 (diagnostic) are Preclinical. Filled teal dots mark
        therapeutics; open teal rings mark diagnostics.
      </desc>

      <rect x="1" y="1" width={VB_W - 2} height={VB_H - 2} rx="12" fill="#FBFAF8" />

      {/* ---- Phase grid: vertical hairlines + column labels ---------------- */}
      <g aria-hidden="true">
        {PHASES.map((_, i) => {
          const x = chartX0 + colW * i;
          return (
            <line
              key={`grid-${i}`}
              x1={x}
              y1={gridTop}
              x2={x}
              y2={gridBottom}
              stroke="#2E263A24"
              strokeWidth="1"
            />
          );
        })}
        <line
          x1={chartX1}
          y1={gridTop}
          x2={chartX1}
          y2={gridBottom}
          stroke="#2E263A24"
          strokeWidth="1"
        />
      </g>

      {PHASES.map((phase, i) => (
        <text
          key={`phase-label-${i}`}
          x={colCenter(i)}
          y={66}
          textAnchor="middle"
          fontSize="12.5"
          letterSpacing="1.2"
          fill="#2F6E62"
          style={{ textTransform: "uppercase" }}
        >
          {phase}
        </text>
      ))}

      {/* Axis eyebrow */}
      <text
        x={chartX0}
        y={40}
        textAnchor="start"
        fontSize="12.5"
        letterSpacing="1.6"
        fill="#6F6A76"
        style={{ textTransform: "uppercase" }}
        aria-hidden="true"
      >
        Development stage
      </text>

      {/* ---- One track per program ---------------------------------------- */}
      {PIPELINE.map((c, i) => {
        const y = rowY(i);
        const mx = colCenter(c.phaseIndex);
        const isDx = c.modality === "Diagnostic";

        return (
          <g key={c.id}>
            {/* Program name */}
            <text
              x={chartX0 - 22}
              y={y - 3}
              textAnchor="end"
              fontSize="16"
              fontWeight="600"
              fill="#2E263A"
            >
              {c.name}
            </text>
            {/* Modality tag */}
            <text
              x={chartX0 - 22}
              y={y + 13}
              textAnchor="end"
              fontSize="10.5"
              letterSpacing="1"
              fill="#6F6A76"
              style={{ textTransform: "uppercase" }}
            >
              {c.modality}
            </text>

            {/* Faint full-length rail */}
            <line
              x1={barStart}
              y1={y}
              x2={colCenter(cols - 1)}
              y2={y}
              stroke="#2E263A24"
              strokeWidth="1"
              aria-hidden="true"
            />

            {/* Teal progress track from Discovery to current phase */}
            <line
              x1={barStart}
              y1={y}
              x2={mx}
              y2={y}
              stroke="#4A9B8E"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Marker: filled dot = therapeutic, open ring = diagnostic */}
            {isDx ? (
              <circle
                cx={mx}
                cy={y}
                r="7"
                fill="#FFFFFF"
                stroke="#4A9B8E"
                strokeWidth="2.5"
              />
            ) : (
              <circle cx={mx} cy={y} r="7.5" fill="#4A9B8E" />
            )}

            {/* Human-readable stage, set to the right of the marker */}
            <text
              x={mx + 18}
              y={y + 4}
              textAnchor="start"
              fontSize="12.5"
              fill="#6F6A76"
            >
              {c.stage}
            </text>
          </g>
        );
      })}

      {/* ---- Legend ------------------------------------------------------- */}
      <g transform={`translate(${chartX0 - 22}, 352)`} aria-hidden="true">
        <circle cx="7" cy="-4" r="7.5" fill="#4A9B8E" />
        <text x="22" y="0" fontSize="12.5" fill="#2E263A">
          Therapeutic
        </text>

        <circle
          cx="147"
          cy="-4"
          r="7"
          fill="#FFFFFF"
          stroke="#4A9B8E"
          strokeWidth="2.5"
        />
        <text x="162" y="0" fontSize="12.5" fill="#2E263A">
          Diagnostic
        </text>
      </g>
    </svg>
  );
}
