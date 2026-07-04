/**
 * FemLunaDetection — Calm Clinical schematic contrasting endometriosis detection.
 * Left: laparoscopy (invasive, today's gold standard). Right: FemLUNA non-invasive
 * targeted imaging, where a teal imaging agent binds a sub-millimeter lesion and
 * makes it clearly visible versus a faint/gray signal on standard imaging.
 * Static, server-rendered, journal-grade. Only truth.md-traceable content.
 */
export default function FemLunaDetection() {
  return (
    <svg
      viewBox="0 0 900 420"
      role="img"
      aria-labelledby="femluna-title femluna-desc"
      className="w-full"
    >
      <title id="femluna-title">
        FemLUNA non-invasive detection versus laparoscopy
      </title>
      <desc id="femluna-desc">
        Two panels compare endometriosis detection on the same pelvic outline. Left:
        laparoscopy, the invasive current gold standard, requires a surgical incision.
        Right: FemLUNA non-invasive, radiation-free imaging in which a targeted imaging
        agent binds a sub-millimeter lesion and renders it clearly visible, whereas
        standard imaging leaves the same lesion faint.
      </desc>

      <rect x="0" y="0" width="900" height="420" fill="#FBFAF8" />

      {/* soft panel washes */}
      <rect x="40" y="72" width="380" height="296" rx="14" fill="#F6F3EE" stroke="#2E263A24" />
      <rect x="480" y="72" width="380" height="296" rx="14" fill="#EDF5F2" stroke="#2E263A24" />

      {/* central divider */}
      <line x1="450" y1="96" x2="450" y2="344" stroke="#2E263A24" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />

      {/* ---------- panel headers ---------- */}
      <text x="230" y="46" textAnchor="middle" fontSize="19" fill="#2E263A" fontWeight="600">
        Laparoscopy
      </text>
      <text x="230" y="66" textAnchor="middle" fontSize="13.5" fill="#6F6A76">
        invasive — today&#8217;s gold standard
      </text>

      <text x="670" y="46" textAnchor="middle" fontSize="19" fill="#2F6E62" fontWeight="600">
        FemLUNA
      </text>
      <text x="670" y="66" textAnchor="middle" fontSize="13.5" fill="#6F6A76">
        non-invasive targeted imaging
      </text>

      {/* =========================================================
           LEFT PANEL — laparoscopy: outline + incision + surgical port
         ========================================================= */}
      <g aria-hidden="true">
        {/* pelvis / lower-abdomen outline */}
        <path
          d="M150 150
             C 150 118, 310 118, 310 150
             C 322 200, 300 260, 230 300
             C 160 260, 138 200, 150 150 Z"
          fill="#FFFFFF"
          stroke="#2E263A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* subtle interior contour */}
        <path
          d="M176 168 C 210 158, 250 158, 284 168"
          fill="none"
          stroke="#2E263A24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* incision marker on the abdominal wall */}
        <line x1="222" y1="132" x2="246" y2="132" stroke="#C98B84" strokeWidth="2.5" strokeLinecap="round" />
        {/* trocar / laparoscope port entering through the incision */}
        <line x1="234" y1="102" x2="234" y2="130" stroke="#6F6A76" strokeWidth="3" strokeLinecap="round" />
        <rect x="227" y="90" width="14" height="16" rx="2.5" fill="#E4E1E6" stroke="#B7B2BB" strokeWidth="1.5" />

        {/* the lesion inside — visible only via surgery */}
        <ellipse cx="228" cy="230" rx="8" ry="6" fill="#FBF4F3" stroke="#C98B84" strokeWidth="1.5" />
      </g>

      {/* left annotations */}
      <text x="270" y="120" fontSize="13" fill="#6F6A76">surgical incision</text>
      <line x1="266" y1="124" x2="248" y2="131" stroke="#B7B2BB" strokeWidth="1.5" strokeLinecap="round" />

      <text x="230" y="332" textAnchor="middle" fontSize="12.5" letterSpacing="1.5" fill="#6F6A76">
        REQUIRES SURGERY
      </text>

      {/* =========================================================
           RIGHT PANEL — FemLUNA: same outline scanned non-invasively
         ========================================================= */}
      <g aria-hidden="true">
        {/* identical pelvis outline, no incision */}
        <path
          d="M590 150
             C 590 118, 750 118, 750 150
             C 762 200, 740 260, 670 300
             C 600 260, 578 200, 590 150 Z"
          fill="#FFFFFF"
          stroke="#2E263A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M616 168 C 650 158, 690 158, 724 168"
          fill="none"
          stroke="#2E263A24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* non-invasive scan sweep entering from outside the body */}
        <path d="M628 96 L 660 128" fill="none" stroke="#4A9B8E" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 6" opacity="0.7" />
        <path d="M668 92 L 668 126" fill="none" stroke="#4A9B8E" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 6" opacity="0.7" />
        <path d="M708 96 L 676 128" fill="none" stroke="#4A9B8E" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 6" opacity="0.7" />

        {/* acidic disease microenvironment: soft rose halo around lesion */}
        <circle cx="668" cy="230" r="26" fill="#FBF4F3" />

        {/* the SAME lesion — now clearly highlighted by the bound teal agent */}
        <circle cx="668" cy="230" r="15" fill="none" stroke="#4A9B8E" strokeWidth="1.5" opacity="0.55" />
        <circle cx="668" cy="230" r="9" fill="#4A9B8E" opacity="0.16" stroke="#4A9B8E" strokeWidth="1.5" />
        {/* lesion core */}
        <ellipse cx="668" cy="230" rx="5.5" ry="4.5" fill="#4A9B8E" />

        {/* targeted imaging agent = small teal cyclic ring, bound to the lesion */}
        <g>
          <circle cx="642" cy="204" r="6.5" fill="#FFFFFF" stroke="#4A9B8E" strokeWidth="1.5" />
          <line x1="647" y1="209" x2="659" y2="221" stroke="#2F6E62" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* right annotations */}
      <text x="596" y="204" fontSize="13" fill="#2F6E62" textAnchor="end">imaging agent</text>
      <line x1="600" y1="204" x2="635" y2="204" stroke="#4A9B8E" strokeWidth="1.5" strokeLinecap="round" />

      <text x="748" y="238" fontSize="13" fill="#2E263A">sub-millimeter lesion</text>
      <text x="748" y="256" fontSize="12" fill="#6F6A76">clearly visible</text>
      <line x1="686" y1="230" x2="744" y2="234" stroke="#B7B2BB" strokeWidth="1.5" strokeLinecap="round" />

      {/* contrast note: same lesion is faint on standard imaging */}
      <g aria-hidden="true">
        <ellipse cx="612" cy="272" rx="5" ry="4" fill="#E4E1E6" stroke="#B7B2BB" strokeWidth="1.5" />
      </g>
      <text x="600" y="298" fontSize="11.5" fill="#6F6A76" textAnchor="middle">faint on standard imaging</text>

      <text x="670" y="332" textAnchor="middle" fontSize="12.5" letterSpacing="1.5" fill="#2F6E62">
        RADIATION-FREE · NON-INVASIVE
      </text>

      {/* baseline caption strip */}
      <text x="450" y="396" textAnchor="middle" fontSize="13" fill="#6F6A76">
        The same lesion — imaged without surgery.
      </text>
    </svg>
  );
}
