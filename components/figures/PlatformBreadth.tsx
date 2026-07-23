/**
 * PlatformBreadth — a calm branching tree showing one precision peptide platform
 * spanning three domains (therapeutics, diagnostics, oncology) with program leaves.
 * Static, server-rendered SVG. Content is traceable to truth.md.
 */
export default function PlatformBreadth() {
  return (
    <svg
      viewBox="0 0 900 400"
      role="img"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>One precision peptide platform spanning three domains</title>
      <desc>
        A branching diagram. A central node, the precision peptide platform, branches to
        three areas: Therapeutics (ENDO-205), Diagnostics (FemLUNA and ENDO-311), and
        Oncology (ENDO-995 and ENDO-311). A note indicates the platform is expanding into
        additional women&rsquo;s health indications.
      </desc>

      <rect x="1" y="1" width="898" height="398" rx="12" fill="#FBFAF8" stroke="#2E263A24" />

      {/* Connectors: platform -> categories */}
      <g aria-hidden="true" fill="none" stroke="#B7B2BB" strokeWidth="1.5" strokeLinecap="round">
        <path d="M260 200 C 300 200, 292 90, 332 90" />
        <path d="M260 200 L 332 200" />
        <path d="M260 200 C 300 200, 292 310, 332 310" />
      </g>

      {/* Connectors: categories -> program leaves */}
      <g aria-hidden="true" fill="none" stroke="#4A9B8E" strokeWidth="1.5" strokeLinecap="round">
        {/* Therapeutics */}
        <path d="M507 90 L 585 90" />
        {/* Diagnostics */}
        <path d="M507 200 C 548 200, 544 175, 585 175" />
        <path d="M507 200 C 548 200, 544 225, 585 225" />
        {/* Oncology */}
        <path d="M507 310 C 548 310, 544 285, 585 285" />
        <path d="M507 310 C 548 310, 544 335, 585 335" />
      </g>

      {/* Central platform node */}
      <g>
        <rect x="50" y="160" width="210" height="80" rx="14" fill="#4A9B8E" />
        {/* small cyclic peptide ring glyph */}
        <circle cx="82" cy="200" r="9" fill="none" stroke="#FFFFFF" strokeWidth="1.5" aria-hidden="true" />
        <text x="168" y="194" textAnchor="middle" fontSize="17" fill="#FFFFFF" fontWeight="600">
          Precision peptide
        </text>
        <text x="168" y="216" textAnchor="middle" fontSize="17" fill="#FFFFFF" fontWeight="600">
          platform
        </text>
      </g>

      {/* Category: Therapeutics */}
      <g>
        <rect x="332" y="66" width="175" height="48" rx="10" fill="#EDF5F2" stroke="#4A9B8E" strokeWidth="1.5" />
        <text x="419" y="87" textAnchor="middle" fontSize="14.5" fill="#2E263A" fontWeight="600">
          Therapeutics
        </text>
        <text x="419" y="104" textAnchor="middle" fontSize="11" letterSpacing="1.5" fill="#2F6E62">
          NON-HORMONAL
        </text>
      </g>

      {/* Category: Diagnostics */}
      <g>
        <rect x="332" y="176" width="175" height="48" rx="10" fill="#F4F1F8" stroke="#6F6A76" strokeWidth="1.5" />
        <text x="419" y="197" textAnchor="middle" fontSize="14.5" fill="#2E263A" fontWeight="600">
          Diagnostics
        </text>
        <text x="419" y="214" textAnchor="middle" fontSize="11" letterSpacing="1.5" fill="#6F6A76">
          NON-INVASIVE
        </text>
      </g>

      {/* Category: Oncology */}
      <g>
        <rect x="332" y="286" width="175" height="48" rx="10" fill="#F6F3EE" stroke="#6F6A76" strokeWidth="1.5" />
        <text x="419" y="307" textAnchor="middle" fontSize="14.5" fill="#2E263A" fontWeight="600">
          Oncology
        </text>
        <text x="419" y="324" textAnchor="middle" fontSize="11" letterSpacing="1.5" fill="#6F6A76">
          SOLID TUMORS
        </text>
      </g>

      {/* Program leaves */}
      <g>
        {/* ENDO-205 */}
        <rect x="585" y="73" width="170" height="34" rx="17" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
        <text x="670" y="95" textAnchor="middle" fontSize="14" fill="#2F6E62" fontWeight="600">
          ENDO-205
        </text>

        {/* FemLUNA */}
        <rect x="585" y="158" width="170" height="34" rx="17" fill="#FFFFFF" stroke="#B7B2BB" strokeWidth="1.5" />
        <text x="670" y="180" textAnchor="middle" fontSize="14" fill="#2E263A" fontWeight="600">
          FemLUNA&#8482;
        </text>

        {/* ENDO-311 (diagnostic) */}
        <rect x="585" y="208" width="170" height="34" rx="17" fill="#FFFFFF" stroke="#B7B2BB" strokeWidth="1.5" />
        <text x="670" y="230" textAnchor="middle" fontSize="14" fill="#2E263A" fontWeight="600">
          ENDO-311
        </text>

        {/* ENDO-995 */}
        <rect x="585" y="268" width="170" height="34" rx="17" fill="#FFFFFF" stroke="#B7B2BB" strokeWidth="1.5" />
        <text x="670" y="290" textAnchor="middle" fontSize="14" fill="#2E263A" fontWeight="600">
          ENDO-995
        </text>

        {/* ENDO-311 (oncology diagnostic) */}
        <rect x="585" y="318" width="170" height="34" rx="17" fill="#FFFFFF" stroke="#B7B2BB" strokeWidth="1.5" />
        <text x="670" y="340" textAnchor="middle" fontSize="14" fill="#2E263A" fontWeight="600">
          ENDO-311
        </text>
      </g>

      {/* Expansion note */}
      <text x="785" y="383" textAnchor="end" fontSize="12.5" fontStyle="italic" fill="#6F6A76">
        Expanding into additional women&rsquo;s health indications
      </text>
    </svg>
  );
}
