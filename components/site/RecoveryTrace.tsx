export default function RecoveryTrace({
  eyebrow = "Reorient",
  caption = "A clear route back to the EndoCyclic story.",
}: {
  eyebrow?: string;
  caption?: string;
}) {
  return (
    <div
      aria-hidden
      className="recovery-trace relative mx-auto aspect-[5/4] w-full max-w-[32rem] overflow-hidden rounded-bl-[4.5rem] rounded-tr-[4.5rem] border border-line bg-surface shadow-[0_28px_90px_rgb(57_38_56/0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(220,235,229,0.92),transparent_32%),radial-gradient(circle_at_26%_76%,rgba(247,232,231,0.9),transparent_35%)]" />
      <svg
        viewBox="0 0 520 416"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="recovery-thread" x1="46" y1="304" x2="482" y2="112">
            <stop stopColor="#C9798A" />
            <stop offset=".5" stopColor="#D8B850" />
            <stop offset="1" stopColor="#43877D" />
          </linearGradient>
        </defs>

        <circle cx="386" cy="117" r="86" fill="#E5F0EB" opacity=".72" />
        <circle cx="386" cy="117" r="53" stroke="#43877D" strokeOpacity=".34" />
        <circle cx="386" cy="117" r="24" fill="#FFFCFA" stroke="#43877D" />
        <circle cx="386" cy="117" r="7" fill="#43877D" />

        <path
          d="M45 304C118 304 121 219 195 219C268 219 276 291 335 253C382 223 351 156 386 117C411 89 446 91 482 94"
          stroke="url(#recovery-thread)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M45 326C122 326 139 249 202 249C263 249 285 308 342 281"
          stroke="#392638"
          strokeOpacity=".12"
          strokeLinecap="round"
          strokeDasharray="2 9"
        />

        {[
          [78, 295, 13],
          [159, 230, 17],
          [241, 239, 13],
          [324, 264, 17],
          [437, 94, 13],
        ].map(([cx, cy, radius], index) => (
          <g
            key={`${cx}-${cy}`}
            className="recovery-trace-node"
            style={{ animationDelay: `${90 + index * 70}ms` }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="#FFFCFA"
              stroke={index < 3 ? "#C9798A" : "#43877D"}
              strokeOpacity=".72"
            />
            <circle
              cx={cx}
              cy={cy}
              r="3.5"
              fill={index < 3 ? "#C9798A" : "#43877D"}
            />
          </g>
        ))}
      </svg>

      <div className="absolute left-7 top-7 flex items-center gap-3 sm:left-9 sm:top-9">
        <span className="h-px w-8 bg-gradient-to-r from-rose via-gold to-teal" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <p className="absolute bottom-6 left-6 max-w-[13rem] rounded-tr-2xl border-l border-line bg-surface/95 px-3 py-2 text-xs leading-relaxed text-muted shadow-[0_8px_24px_rgb(57_38_56/0.06)] sm:bottom-8 sm:left-8">
        {caption}
      </p>
    </div>
  );
}
