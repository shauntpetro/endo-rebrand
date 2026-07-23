const RING_POINTS = [
  [0, -28],
  [24.25, -14],
  [24.25, 14],
  [0, 28],
  [-24.25, 14],
  [-24.25, -14],
] as const;

const RING_TONES = {
  teal: { stroke: "#83C4B8", fill: "#43877D" },
  rose: { stroke: "#F0B4C1", fill: "#C9798A" },
  gold: { stroke: "#F1D98A", fill: "#D8B850" },
  muted: { stroke: "#D9C4CC", fill: "#6D5E66" },
} as const;

function PeptideRing({
  x,
  y,
  scale = 1,
  tone = "teal",
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  tone?: keyof typeof RING_TONES;
  opacity?: number;
}) {
  const colors = RING_TONES[tone];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} aria-hidden>
      <polygon
        points={RING_POINTS.map(([px, py]) => `${px},${py}`).join(" ")}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="2"
      />
      {RING_POINTS.map(([px, py], index) => (
        <circle key={index} cx={px} cy={py} r="6" fill={colors.fill} stroke={colors.stroke} strokeWidth="1" />
      ))}
    </g>
  );
}

export function HeroThreadArtwork() {
  const threadPath = "M-90 562 C 148 322, 322 706, 530 476 S 840 208, 1030 430 S 1286 692, 1530 368";

  return (
    <svg
      viewBox="0 0 1440 820"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-thread-gradient-warm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F0B4C1" stopOpacity="0" />
          <stop offset="0.22" stopColor="#F0B4C1" />
          <stop offset="0.61" stopColor="#D8B850" />
          <stop offset="0.82" stopColor="#83C4B8" />
          <stop offset="1" stopColor="#83C4B8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-silk-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E8E7" stopOpacity="0" />
          <stop offset="0.5" stopColor="#F0B4C1" stopOpacity="0.22" />
          <stop offset="1" stopColor="#83C4B8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g data-hero-orbit>
        <ellipse cx="1180" cy="270" rx="270" ry="192" fill="none" stroke="#F0B4C1" strokeOpacity="0.08" />
        <ellipse cx="1180" cy="270" rx="214" ry="144" fill="none" stroke="#D8B850" strokeOpacity="0.08" transform="rotate(-11 1180 270)" />
      </g>

      <path d={threadPath} fill="none" stroke="url(#hero-silk-gradient)" strokeWidth="82" strokeLinecap="round" />
      <path
        data-thread-reveal="horizontal"
        d={threadPath}
        fill="none"
        stroke="#F0B4C1"
        strokeOpacity="0.16"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <path
        id="hero-selective-path"
        data-thread-reveal="horizontal"
        d={threadPath}
        fill="none"
        stroke="url(#hero-thread-gradient-warm)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      <PeptideRing x={270} y={540} scale={0.72} tone="rose" opacity={0.54} />
      <PeptideRing x={1025} y={430} scale={1.15} tone="teal" opacity={0.7} />
      <PeptideRing x={1270} y={580} scale={0.56} tone="gold" opacity={0.52} />

      <circle data-thread-marker cx="0" cy="0" r="7" fill="#FFF8F4" />
      <circle data-thread-marker-halo cx="0" cy="0" r="20" fill="#F0B4C1" opacity="0.18" />
    </svg>
  );
}

export function HeroBloomArtwork() {
  return (
    <svg viewBox="0 0 620 700" aria-hidden className="h-auto w-full overflow-visible">
      <defs>
        <radialGradient id="hero-bloom-field" cx="45%" cy="42%" r="60%">
          <stop offset="0" stopColor="#F0B4C1" stopOpacity="0.35" />
          <stop offset="0.52" stopColor="#C9798A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#C9798A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-bloom-core" cx="50%" cy="46%" r="50%">
          <stop offset="0" stopColor="#F7E8E7" stopOpacity="0.34" />
          <stop offset="1" stopColor="#F7E8E7" stopOpacity="0.03" />
        </radialGradient>
        <linearGradient id="hero-bloom-thread" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F0B4C1" />
          <stop offset="0.5" stopColor="#D8B850" />
          <stop offset="1" stopColor="#83C4B8" />
        </linearGradient>
      </defs>

      <path
        d="M306 26 C 486 14 598 144 568 326 C 548 456 618 565 484 648 C 362 724 197 670 111 560 C 24 448 36 273 113 154 C 157 86 217 32 306 26Z"
        fill="url(#hero-bloom-field)"
        stroke="#F0B4C1"
        strokeOpacity="0.16"
      />
      <path
        data-hero-orbit
        d="M308 92 C 441 75 526 170 507 318 C 494 420 536 507 438 571 C 343 632 226 590 167 505 C 102 412 114 286 167 198 C 201 142 247 100 308 92Z"
        fill="url(#hero-bloom-core)"
        stroke="#D8B850"
        strokeOpacity="0.18"
      />
      <ellipse cx="324" cy="338" rx="126" ry="156" fill="none" stroke="#F7E8E7" strokeOpacity="0.13" transform="rotate(18 324 338)" />
      <ellipse cx="324" cy="338" rx="91" ry="111" fill="#2C1D2D" fillOpacity="0.14" stroke="#83C4B8" strokeOpacity="0.22" transform="rotate(-13 324 338)" />
      <path
        data-thread-reveal="horizontal"
        d="M58 426 C 144 364 211 455 284 386 C 348 325 401 302 468 340 C 520 370 558 348 604 300"
        fill="none"
        stroke="#F0B4C1"
        strokeOpacity="0.15"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        data-thread-reveal="horizontal"
        d="M58 426 C 144 364 211 455 284 386 C 348 325 401 302 468 340 C 520 370 558 348 604 300"
        fill="none"
        stroke="url(#hero-bloom-thread)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <PeptideRing x={337} y={349} scale={1.55} tone="teal" />
      <PeptideRing x={198} y={415} scale={0.58} tone="rose" opacity={0.72} />
      <circle cx="478" cy="340" r="9" fill="#D8B850" />
      <circle cx="478" cy="340" r="27" fill="none" stroke="#D8B850" strokeOpacity="0.28" />
    </svg>
  );
}

export function BurdenThreadArtwork() {
  const path = "M78 -30 C 126 106, 258 90, 322 218 C 396 364, 566 306, 690 560";
  return (
    <svg viewBox="0 0 760 520" aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#F0B4C1" strokeOpacity="0.12" strokeWidth="34" />
      <path data-thread-reveal="vertical" d={path} fill="none" stroke="#F0B4C1" strokeOpacity="0.72" strokeWidth="2.25" />
      <circle cx="322" cy="218" r="9" fill="#FFF8F4" stroke="#C9798A" strokeWidth="2" />
      <circle cx="322" cy="218" r="28" fill="none" stroke="#F0B4C1" strokeOpacity="0.32" />
    </svg>
  );
}

export function MechanismThreadArtwork() {
  return (
    <svg
      viewBox="0 0 1200 590"
      role="img"
      aria-labelledby="thread-mechanism-title thread-mechanism-desc"
      className="h-auto w-full"
    >
      <title id="thread-mechanism-title">Selective precision peptide mechanism</title>
      <desc id="thread-mechanism-desc">
        A peptide remains inactive at physiological pH, activates in the acidic disease microenvironment, and is selectively taken up by diseased tissue while healthy tissue is passed over.
      </desc>

      <defs>
        <linearGradient id="mechanism-thread-gradient-warm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D9C4CC" />
          <stop offset="0.48" stopColor="#C9798A" />
          <stop offset="0.7" stopColor="#D8B850" />
          <stop offset="1" stopColor="#43877D" />
        </linearGradient>
        <radialGradient id="mechanism-rose-field" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F0B4C1" stopOpacity="0.56" />
          <stop offset="1" stopColor="#F0B4C1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="590" fill="#FFFCFA" />
      <path d="M-40 410 C 62 190 240 150 400 254 C 518 330 622 310 716 208 C 844 70 1032 100 1248 306 L1248 620 L-40 620Z" fill="#F7E8E7" fillOpacity="0.62" />
      <ellipse cx="200" cy="330" rx="164" ry="142" fill="#F0E8F2" opacity="0.72" />
      <ellipse cx="600" cy="312" rx="202" ry="190" fill="url(#mechanism-rose-field)" />
      <ellipse cx="1010" cy="324" rx="158" ry="174" fill="#E5F0EB" opacity="0.94" />

      <path
        data-thread-reveal="horizontal"
        d="M30 350 C 150 286 264 398 392 314 C 520 230 620 226 792 308 C 936 376 1040 308 1172 228"
        fill="none"
        stroke="#C9798A"
        strokeOpacity="0.12"
        strokeWidth="30"
        strokeLinecap="round"
      />
      <path
        data-thread-reveal="horizontal"
        d="M30 350 C 150 286 264 398 392 314 C 520 230 620 226 792 308 C 936 376 1040 308 1172 228"
        fill="none"
        stroke="url(#mechanism-thread-gradient-warm)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g transform="translate(204 314)">
        <circle r="88" fill="#FFF8F4" fillOpacity="0.78" stroke="#D9C4CC" strokeOpacity="0.5" />
        <PeptideRing x={0} y={0} scale={1.2} tone="muted" />
      </g>
      <text x="62" y="78" fill="#8B4B62" fontSize="12" fontWeight="600" letterSpacing="1.2">01 · PHYSIOLOGICAL pH</text>
      <text x="62" y="114" fill="#392638" fontSize="27" fontWeight="500">Inactive by design</text>
      <text x="62" y="147" fill="#6D5E66" fontSize="15">The peptide remains inert near healthy tissue.</text>

      <g transform="translate(600 294)">
        <ellipse rx="104" ry="119" fill="#F7E8E7" fillOpacity="0.7" stroke="#C9798A" strokeOpacity="0.54" strokeDasharray="4 9" />
        <PeptideRing x={0} y={0} scale={1.3} tone="rose" />
        <circle cx="64" cy="-72" r="7" fill="#D8B850" />
      </g>
      <text x="452" y="78" fill="#8B4B62" fontSize="12" fontWeight="600" letterSpacing="1.2">02 · ACIDIC MICROENVIRONMENT</text>
      <text x="452" y="114" fill="#392638" fontSize="27" fontWeight="500">Activated by disease</text>
      <text x="452" y="147" fill="#6D5E66" fontSize="15">pH-mediated activation changes the peptide state.</text>

      <g transform="translate(1012 312)">
        <ellipse rx="106" ry="118" fill="#E5F0EB" stroke="#43877D" strokeOpacity="0.72" />
        <circle cx="20" cy="10" r="44" fill="#FFF8F4" fillOpacity="0.8" stroke="#43877D" strokeOpacity="0.75" />
        <PeptideRing x={20} y={10} scale={0.78} tone="teal" />
      </g>
      <circle cx="872" cy="414" r="48" fill="#FFF8F4" stroke="#D9C4CC" strokeWidth="1.5" />
      <path d="M834 414 H910" stroke="#D9C4CC" strokeWidth="1.5" />
      <text x="836" y="78" fill="#27675E" fontSize="12" fontWeight="600" letterSpacing="1.2">03 · SELECTIVE UPTAKE</text>
      <text x="836" y="114" fill="#392638" fontSize="27" fontWeight="500">Taken up where needed</text>
      <text x="836" y="147" fill="#6D5E66" fontSize="15">Diseased cells take up the active peptide.</text>
    </svg>
  );
}

export function MobileMechanismArtwork() {
  return (
    <svg viewBox="0 0 360 680" aria-hidden className="h-auto w-full">
      <defs>
        <linearGradient id="mobile-mechanism-thread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9C4CC" />
          <stop offset="0.48" stopColor="#C9798A" />
          <stop offset="0.7" stopColor="#D8B850" />
          <stop offset="1" stopColor="#43877D" />
        </linearGradient>
        <radialGradient id="mobile-rose-field" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F0B4C1" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F0B4C1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="680" rx="56" fill="#FFFCFA" />
      <path
        data-thread-reveal="vertical"
        d="M184 -20 C 110 94 244 140 174 232 C 110 316 254 372 178 456 C 112 530 228 590 172 706"
        fill="none"
        stroke="#C9798A"
        strokeOpacity="0.13"
        strokeWidth="30"
        strokeLinecap="round"
      />
      <path
        data-thread-reveal="vertical"
        d="M184 -20 C 110 94 244 140 174 232 C 110 316 254 372 178 456 C 112 530 228 590 172 706"
        fill="none"
        stroke="url(#mobile-mechanism-thread)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path d="M36 70 C 88 18 191 20 232 74 C 268 122 238 186 174 202 C 112 217 38 188 24 130 C 18 105 22 84 36 70Z" fill="#F0E8F2" />
      <circle cx="164" cy="118" r="62" fill="#FFF8F4" stroke="#D9C4CC" strokeOpacity="0.6" />
      <PeptideRing x={164} y={118} scale={1.05} tone="muted" />

      <path d="M68 244 C 122 205 236 209 286 276 C 328 332 284 406 206 420 C 130 434 52 390 42 322 C 37 289 46 260 68 244Z" fill="url(#mobile-rose-field)" />
      <ellipse cx="187" cy="318" rx="70" ry="82" fill="#F7E8E7" stroke="#C9798A" strokeOpacity="0.58" strokeDasharray="4 9" />
      <PeptideRing x={187} y={318} scale={1.15} tone="rose" />
      <circle cx="238" cy="264" r="8" fill="#D8B850" />

      <path d="M42 492 C 96 438 222 442 290 506 C 345 558 306 644 220 658 C 132 672 48 625 28 558 C 20 532 25 509 42 492Z" fill="#E5F0EB" />
      <ellipse cx="190" cy="554" rx="82" ry="92" fill="none" stroke="#43877D" strokeOpacity="0.74" />
      <circle cx="206" cy="568" r="46" fill="#FFF8F4" stroke="#43877D" strokeOpacity="0.72" />
      <PeptideRing x={206} y={568} scale={0.78} tone="teal" />
    </svg>
  );
}

export function ClosingThreadMark() {
  return (
    <svg viewBox="0 0 520 320" aria-hidden className="h-auto w-full overflow-visible">
      <ellipse cx="278" cy="158" rx="194" ry="118" fill="#FFF8F4" fillOpacity="0.33" stroke="#C9798A" strokeOpacity="0.17" transform="rotate(-8 278 158)" />
      <ellipse cx="278" cy="158" rx="154" ry="87" fill="none" stroke="#D8B850" strokeOpacity="0.19" transform="rotate(10 278 158)" />
      <path
        data-thread-reveal="horizontal"
        d="M12 212 C 94 114, 164 246, 250 150 C 318 74, 374 104, 506 42"
        fill="none"
        stroke="#F0B4C1"
        strokeOpacity="0.18"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        data-thread-reveal="horizontal"
        d="M12 212 C 94 114, 164 246, 250 150 C 318 74, 374 104, 506 42"
        fill="none"
        stroke="url(#closing-thread-gradient)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="closing-thread-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C9798A" />
          <stop offset="0.55" stopColor="#D8B850" />
          <stop offset="1" stopColor="#43877D" />
        </linearGradient>
      </defs>
      <PeptideRing x={250} y={150} scale={1.18} tone="teal" />
      <circle cx="506" cy="42" r="8" fill="#D8B850" />
      <circle cx="506" cy="42" r="24" fill="none" stroke="#D8B850" strokeOpacity="0.26" />
    </svg>
  );
}
