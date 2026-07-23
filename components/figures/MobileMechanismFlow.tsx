const RING_NODES = Array.from({ length: 8 }, (_, index) => {
  const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 36 + Math.cos(angle) * 18,
    y: 36 + Math.sin(angle) * 18,
  };
});

function Ring({
  active = false,
  scale = 1,
  x = 36,
  y = 36,
}: {
  active?: boolean;
  scale?: number;
  x?: number;
  y?: number;
}) {
  const stroke = active ? "#8b4b62" : "#8b8190";
  const fill = active ? "#f1d8de" : "#f0e8f2";
  return (
    <g transform={`translate(${x - 36 * scale} ${y - 36 * scale}) scale(${scale})`}>
      <circle cx="36" cy="36" r="18" fill="none" stroke={stroke} strokeWidth="2" />
      {RING_NODES.map((node, index) => (
        <circle key={index} cx={node.x} cy={node.y} r="4.2" fill={fill} stroke={stroke} strokeWidth="1.5" />
      ))}
    </g>
  );
}

const STEPS = [
  {
    label: "Physiological pH",
    title: "Inactive near healthy tissue",
    body: "Designed to remain inactive near healthy tissue.",
    visual: (
      <svg viewBox="0 0 72 88" aria-hidden className="h-20 w-16">
        <rect x="5" y="8" width="62" height="72" rx="28" fill="#fffcfa" stroke="#39263820" />
        <Ring />
      </svg>
    ),
  },
  {
    label: "Acidic microenvironment",
    title: "pH-mediated activation",
    body: "Designed to activate in the acidic disease microenvironment.",
    visual: (
      <svg viewBox="0 0 72 88" aria-hidden className="h-20 w-16">
        <path d="M4 80 C20 58 13 31 31 8 H68 V80 Z" fill="#f7e8e7" />
        <path d="M4 80 C20 58 13 31 31 8" fill="none" stroke="#c9798a" strokeWidth="2" />
        <Ring active />
      </svg>
    ),
  },
  {
    label: "Diseased tissue",
    title: "Selective uptake",
    body: "Selective uptake by diseased tissue via a proprietary endocytic pathway.",
    visual: (
      <svg viewBox="0 0 72 88" aria-hidden className="h-20 w-16">
        <path d="M8 18 C19 7 51 7 63 19 C72 30 69 63 58 75 C47 85 20 82 10 71 C0 60 -2 29 8 18 Z" fill="#f7e8e7" stroke="#c9798a" strokeWidth="2" />
        <circle cx="42" cy="47" r="17" fill="#e5f0eb" stroke="#43877d" strokeWidth="2" />
        <Ring active scale={0.48} x={42} y={47} />
        <path d="M13 25 C22 29 26 32 30 37" fill="none" stroke="#43877d" strokeWidth="2" strokeLinecap="round" />
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
        Conceptual representation of the EndoCyclic precision peptide platform; investigational mechanism.
      </figcaption>
    </figure>
  );
}
