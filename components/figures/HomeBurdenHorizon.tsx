const METRICS = [
  {
    value: "190M+",
    label: "women affected worldwide",
    detail: "A chronic disease with global reach.",
    desktopClassName: "justify-end pr-12",
    desktopValueClassName: "text-[clamp(4rem,9vw,7.5rem)]",
  },
  {
    value: "1 in 10",
    label: "women of reproductive age",
    detail: "The worldwide prevalence of endometriosis.",
    desktopClassName: "justify-start border-l border-line px-7 pt-12",
    desktopValueClassName: "text-[clamp(2.15rem,4vw,3.75rem)]",
  },
  {
    value: "8 years",
    label: "average diagnostic delay",
    detail: "From symptoms to a confirmed diagnosis.",
    desktopClassName: "justify-center border-l border-line px-7",
    desktopValueClassName: "text-[clamp(2.15rem,4vw,3.75rem)]",
  },
  {
    value: "$200B",
    label: "annual US economic burden",
    detail: "Annual economic burden estimate for the United States.",
    desktopClassName: "justify-end border-l border-line pb-12 pl-8",
    desktopValueClassName: "text-[clamp(2.15rem,4vw,3.75rem)]",
  },
] as const;

export default function HomeBurdenHorizon() {
  return (
    <figure>
      <div className="border-y border-line xl:hidden">
        <dl className="py-8 sm:py-10">
          <div className="grid">
            <dt className="order-2 mt-5 font-medium leading-snug text-ink sm:max-w-52">
              {METRICS[0].label}
            </dt>
            <dd className="order-1 text-[clamp(4rem,18vw,6rem)] font-medium leading-none tracking-[-0.055em] text-ink">
              {METRICS[0].value}
            </dd>
            <dd className="order-3 mt-2 text-sm leading-relaxed text-muted">
              {METRICS[0].detail}
            </dd>
          </div>
        </dl>

        <dl className="border-t border-line sm:grid sm:grid-cols-3">
          {METRICS.slice(1).map((metric) => (
            <div
              key={metric.value}
              className="grid grid-cols-[7.5rem_1fr] gap-x-5 border-b border-line py-6 last:border-b-0 sm:flex sm:flex-col sm:border-b-0 sm:border-l sm:px-5 sm:py-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="order-2 col-start-2 font-medium leading-snug text-ink sm:mt-5">
                {metric.label}
              </dt>
              <dd className="order-1 col-start-1 row-span-2 row-start-1 text-[2.15rem] font-medium leading-none tracking-[-0.045em] text-ink sm:text-[clamp(2rem,5vw,3.25rem)]">
                {metric.value}
              </dd>
              <dd className="order-3 col-start-2 mt-2 text-sm leading-relaxed text-muted">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative hidden border-y border-line xl:block">
        <svg
          aria-hidden
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-32 -translate-y-1/2"
        >
          <path
            d="M0 116 C130 116 170 40 292 72 S475 136 610 92 S820 54 1000 106"
            fill="none"
            stroke="#c9798a"
            strokeOpacity="0.34"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="292" cy="72" r="5" fill="#fff8f4" stroke="#c9798a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx="610" cy="92" r="5" fill="#fff8f4" stroke="#43877d" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx="1000" cy="106" r="5" fill="#fff8f4" stroke="#d8b850" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>

        <dl className="relative grid min-h-[28rem] grid-cols-[1.55fr_0.9fr_0.9fr_1.05fr]">
          {METRICS.map((metric) => (
            <div
              key={metric.value}
              className={`flex min-h-48 flex-col py-8 ${metric.desktopClassName}`}
            >
              <dt className="order-2 mt-5 max-w-44 font-medium leading-snug text-ink">
                {metric.label}
              </dt>
              <dd className={`order-1 whitespace-nowrap font-medium leading-none tracking-[-0.055em] text-ink ${metric.desktopValueClassName}`}>
                {metric.value}
              </dd>
              <dd className="order-3 mt-2 max-w-48 text-sm leading-relaxed text-muted">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Endometriosis is a leading cause of infertility and chronic pelvic pain.
      </figcaption>
    </figure>
  );
}
