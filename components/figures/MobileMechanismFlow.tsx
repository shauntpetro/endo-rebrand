import { PLATFORM_MECHANISM_STEPS } from "@/lib/site";

const RING_COLORS = [
  { fill: "#E89A16", stroke: "#A95E05" },
  { fill: "#B8AA9B", stroke: "#71675E" },
  { fill: "#B8AA9B", stroke: "#71675E" },
  { fill: "#B8AA9B", stroke: "#71675E" },
  { fill: "#B8AA9B", stroke: "#71675E" },
  { fill: "#B8AA9B", stroke: "#71675E" },
  { fill: "#6F38B5", stroke: "#432078" },
  { fill: "#6F38B5", stroke: "#432078" },
  { fill: "#6F38B5", stroke: "#432078" },
  { fill: "#E89A16", stroke: "#A95E05" },
  { fill: "#E89A16", stroke: "#A95E05" },
  { fill: "#E89A16", stroke: "#A95E05" },
  { fill: "#B8AA9B", stroke: "#71675E" },
] as const;

const RING_NODES = RING_COLORS.map((color, index) => {
  const angle = (index / RING_COLORS.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 36 + Math.cos(angle) * 18,
    y: 36 + Math.sin(angle) * 18,
    color,
  };
});

function Ring({
  scale = 1,
  x = 36,
  y = 36,
}: {
  scale?: number;
  x?: number;
  y?: number;
}) {
  return (
    <g
      data-canonical-peptide
      data-residues={RING_COLORS.length}
      transform={`translate(${x - 36 * scale} ${y - 36 * scale}) scale(${scale})`}
    >
      <circle
        cx="36"
        cy="36"
        r="18"
        fill="none"
        stroke="#51463E"
        strokeWidth="2.3"
      />
      {RING_NODES.map((node, index) => (
        <g key={index}>
          <circle
            data-peptide-bead={index}
            data-bead-color={node.color.fill}
            cx={node.x}
            cy={node.y}
            r="4"
            fill={node.color.fill}
            stroke={node.color.stroke}
            strokeWidth="1.2"
          />
          <circle
            cx={node.x - 1.2}
            cy={node.y - 1.4}
            r="1"
            fill="#FFF8ED"
            opacity="0.72"
          />
        </g>
      ))}
    </g>
  );
}

const STEPS = [
  {
    ...PLATFORM_MECHANISM_STEPS[0],
    visual: (
      <svg viewBox="0 0 72 88" aria-hidden className="h-20 w-16">
        <path d="M40 7 H68 V81 H39 C49 60 30 31 40 7 Z" fill="#f7e8e7" />
        <path d="M40 7 C30 31 49 60 39 81" fill="none" stroke="#c9798a" strokeWidth="2" />
        <Ring x={32} y={43} />
      </svg>
    ),
  },
  {
    ...PLATFORM_MECHANISM_STEPS[1],
    visual: (
      <svg viewBox="0 0 72 88" aria-hidden className="h-20 w-16">
        <path d="M8 18 C19 7 51 7 63 19 C72 30 69 63 58 75 C47 85 20 82 10 71 C0 60 -2 29 8 18 Z" fill="#f7e8e7" stroke="#c9798a" strokeWidth="2" />
        <circle cx="42" cy="47" r="17" fill="#e5f0eb" stroke="#43877d" strokeWidth="2" />
        <Ring scale={0.48} x={42} y={47} />
        <path d="M13 25 C22 29 26 32 30 37" fill="none" stroke="#43877d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    ...PLATFORM_MECHANISM_STEPS[2],
    visual: (
      <svg
        viewBox="0 0 72 88"
        aria-hidden
        data-mobile-mechanism-escape
        className="h-20 w-16"
      >
        <circle cx="29" cy="38" r="25" fill="#f7e8e7" />
        <circle cx="29" cy="38" r="19" fill="#f5d8d2" />
        <path
          data-opened-endosome
          d="M46 48 A22 22 0 1 1 46 27"
          fill="none"
          stroke="#c9798a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M43 45 A17 17 0 1 1 43 30"
          fill="none"
          stroke="#d8b850"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <g fill="#d8b850" opacity="0.72">
          <circle cx="17" cy="27" r="1.7" />
          <circle cx="36" cy="25" r="1.5" />
          <circle cx="18" cy="48" r="1.3" />
          <circle cx="31" cy="52" r="1.2" />
        </g>
        <path
          d="M34 38 C42 40 47 45 51 50"
          fill="none"
          stroke="#43877d"
          strokeWidth="1.5"
          strokeDasharray="2.5 3"
          strokeLinecap="round"
        />
        <path
          d="M47 48 L52 51 L50 45"
          fill="none"
          stroke="#43877d"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g data-escaping-peptide>
          <Ring scale={0.34} x={56} y={56} />
        </g>
      </svg>
    ),
  },
  {
    ...PLATFORM_MECHANISM_STEPS[3],
    visual: (
      <svg
        viewBox="0 0 72 88"
        aria-hidden
        data-mobile-mechanism-clearance
        className="h-20 w-16"
      >
        <path
          d="M3 26 C8 15 23 11 36 16 C47 21 51 35 46 47 C41 59 25 64 13 58 C1 52 -3 38 3 26 Z"
          fill="#faedeb"
          stroke="#c9798a"
          strokeWidth="1.4"
          opacity="0.9"
        />
        <path
          data-intracellular-target
          d="M7 39 C4 32 8 24 15 22 C18 14 29 12 35 18 C43 16 50 23 48 31 C54 37 50 47 42 49 C38 57 27 59 21 53 C13 56 5 48 7 39 Z"
          fill="#9dcfc5"
          stroke="#2f6e62"
          strokeWidth="1.8"
        />
        <path
          d="M13 38 C11 33 14 28 19 27 C21 21 28 20 32 24 C37 22 42 27 40 32 C44 36 41 42 36 43 C33 48 26 49 23 45 C18 47 12 43 13 38 Z"
          fill="#c7e4dd"
          opacity="0.84"
        />
        <path
          d="M38 24 C42 26 44 30 43 35 C42 40 38 43 34 44"
          fill="none"
          stroke="#f9ecea"
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <g data-target-engagement>
          <Ring scale={0.34} x={41} y={34} />
        </g>
        <path
          d="M43 49 C48 52 50 56 52 60"
          fill="none"
          stroke="#43877d"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 2.5"
        />
        <path
          data-clearance-fragment
          d="M46 60 C48 55 55 54 59 58 C63 62 61 69 56 71 C51 73 44 68 46 60 Z"
          fill="#f7e8e7"
          stroke="#c9798a"
          strokeWidth="1.5"
        />
        <path
          data-clearance-fragment
          d="M59 68 C61 65 66 66 67 69 C68 73 64 76 61 74 C58 73 57 70 59 68 Z"
          fill="#f9eeec"
          stroke="#c9798a"
          strokeWidth="1.2"
        />
        <circle
          data-clearance-fragment
          cx="67"
          cy="80"
          r="2.1"
          fill="#fbf4f1"
          stroke="#dbaab1"
          strokeWidth="1"
        />
      </svg>
    ),
  },
] as const;

export default function MobileMechanismFlow({ embedded = false }: { embedded?: boolean }) {
  const visual = (
    <div className="relative overflow-hidden border-y border-line bg-surface/70 px-1 py-3">
        <span aria-hidden className="absolute bottom-20 left-[3.35rem] top-20 w-px bg-line" />
        <ol className="relative list-none">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line py-6 last:border-b-0">
              <div className="relative z-10 flex items-center justify-center">{step.visual}</div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-rose-ink">
                  0{index + 1} · {step.label}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
    </div>
  );

  if (embedded) return visual;

  return (
    <figure>
      {visual}
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">
        Stages 01–03 depict the investigational platform. Evidence 04 reflects
        the ENDO-205 preclinical lesion-elimination finding; not clinical
        outcome data.
      </figcaption>
    </figure>
  );
}
