/**
 * DiseaseBurden — a quiet, journal-grade data figure for endometriosis burden.
 * Every number is traceable to truth.md ("Disease Burden (Endometriosis)"):
 *   8-year average diagnostic delay · 10% of reproductive-age women (1 in 10) ·
 *   190M+ women worldwide · $200B annual US burden ·
 *   $180–250B global market potential (McKinsey).
 * Static, no animation. Server component.
 */
export default function DiseaseBurden() {
  // 8-year timeline axis geometry
  const axisX0 = 70;
  const axisX1 = 830;
  const axisY = 116;
  const years = 8;
  const step = (axisX1 - axisX0) / years;

  // 1-in-10 dot unit geometry
  const dotY = 292;
  const dotX0 = 82;
  const dotGap = 30;
  const dotR = 9;

  return (
    <svg
      viewBox="0 0 900 400"
      role="img"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Endometriosis disease burden at a glance</title>
      <desc>
        A three-part figure. Top: a horizontal timeline showing an 8-year average
        delay from first symptom to diagnosis. Lower left: a unit of ten dots with
        one shaded teal, indicating 1 in 10 reproductive-age women and 190 million
        or more women worldwide. Lower right: two figures — a 200 billion dollar
        annual US economic burden and a 180 to 250 billion dollar global market
        potential (McKinsey estimate).
      </desc>

      <rect x="1" y="1" width="898" height="398" rx="12" fill="#FBFAF8" stroke="#2E263A24" />

      {/* ---------- A. 8-year diagnostic delay ---------- */}
      <text x="70" y="50" fill="#2F6E62" fontSize="12.5" letterSpacing="1.6" fontWeight="600">
        DIAGNOSTIC DELAY
      </text>

      <text
        x={(axisX0 + axisX1) / 2}
        y="84"
        textAnchor="middle"
        fill="#2E263A"
        fontSize="20"
        fontWeight="600"
      >
        8-year average delay
      </text>

      {/* axis */}
      <line
        x1={axisX0}
        y1={axisY}
        x2={axisX1}
        y2={axisY}
        stroke="#2E263A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* year ticks */}
      {Array.from({ length: years + 1 }).map((_, i) => {
        const x = axisX0 + i * step;
        const endpoint = i === 0 || i === years;
        return (
          <g key={i} aria-hidden="true">
            <line
              x1={x}
              y1={axisY - (endpoint ? 8 : 5)}
              x2={x}
              y2={axisY + (endpoint ? 8 : 5)}
              stroke={endpoint ? "#2E263A" : "#6F6A76"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {!endpoint && (
              <text x={x} y={axisY + 24} textAnchor="middle" fill="#6F6A76" fontSize="12">
                {i}
              </text>
            )}
          </g>
        );
      })}

      {/* first-symptom marker (teal, healthy start) */}
      <circle cx={axisX0} cy={axisY} r="6.5" fill="#4A9B8E" />
      <text x={axisX0} y={axisY + 46} textAnchor="middle" fill="#2E263A" fontSize="14">
        First symptom
      </text>

      {/* diagnosis marker (rose, disease recognized) */}
      <circle cx={axisX1} cy={axisY} r="12" fill="#FBF4F3" stroke="#C98B84" strokeWidth="1.5" />
      <circle cx={axisX1} cy={axisY} r="4" fill="#C98B84" aria-hidden="true" />
      <text x={axisX1} y={axisY + 46} textAnchor="middle" fill="#2E263A" fontSize="14">
        Diagnosis
      </text>

      {/* section divider */}
      <line x1="70" y1="200" x2="830" y2="200" stroke="#2E263A24" strokeWidth="1" />

      {/* ---------- B. 1 in 10 ---------- */}
      <text x="70" y="238" fill="#2F6E62" fontSize="12.5" letterSpacing="1.6" fontWeight="600">
        PREVALENCE
      </text>

      <g>
        {Array.from({ length: 10 }).map((_, i) => {
          const affected = i === 0;
          const x = dotX0 + i * dotGap;
          return (
            <circle
              key={i}
              cx={x}
              cy={dotY}
              r={dotR}
              fill={affected ? "#4A9B8E" : "#E4E1E6"}
              stroke={affected ? "#2F6E62" : "#B7B2BB"}
              strokeWidth="1.5"
            />
          );
        })}
      </g>

      <text x="82" y="340" fill="#2E263A" fontSize="17" fontWeight="600">
        1 in 10
      </text>
      <text x="82" y="362" fill="#6F6A76" fontSize="14">
        reproductive-age women — 190M+ worldwide
      </text>

      {/* vertical divider between B and C */}
      <line x1="560" y1="222" x2="560" y2="366" stroke="#2E263A24" strokeWidth="1" />

      {/* ---------- C. two stat blocks (stacked) ---------- */}
      <text x="600" y="238" fill="#2F6E62" fontSize="12.5" letterSpacing="1.6" fontWeight="600">
        ECONOMIC SCALE
      </text>

      {/* $200B US burden */}
      <text x="600" y="284" fill="#2E263A" fontSize="30" fontWeight="600">
        $200B
      </text>
      <text x="602" y="306" fill="#6F6A76" fontSize="14">
        annual US economic burden
      </text>

      {/* $180–250B global market */}
      <text x="600" y="346" fill="#2E263A" fontSize="30" fontWeight="600">
        $180–250B
      </text>
      <text x="602" y="368" fill="#6F6A76" fontSize="14">
        global market potential (McKinsey)
      </text>
    </svg>
  );
}
