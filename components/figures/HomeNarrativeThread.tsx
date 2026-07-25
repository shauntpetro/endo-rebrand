const THREAD_PATH =
  "M22 0 C8 86 31 205 18 326 C6 438 33 572 17 704 C30 812 8 912 22 1000";

export default function HomeNarrativeThread() {
  return (
    <>
      <div
        data-home-mobile-thread
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[2.625rem] z-10 w-px bg-gradient-to-b from-rose/15 via-teal/35 to-gold/20 md:hidden"
      />

      <div
        data-home-narrative-thread
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-10 hidden w-10 md:block"
        style={{ left: "max(0.75rem, calc((100vw - 74rem) / 2 + 0.75rem))" }}
      >
        <svg
          viewBox="0 0 40 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <path
            d={THREAD_PATH}
            fill="none"
            stroke="#7d697c"
            strokeLinecap="round"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          data-home-thread-active
          className="absolute inset-0 transform-gpu"
        >
          <svg
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="home-narrative-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1000"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#c9798a" />
                <stop offset="0.3" stopColor="#c9798a" />
                <stop offset="0.43" stopColor="#43877d" />
                <stop offset="0.67" stopColor="#43877d" />
                <stop offset="0.8" stopColor="#d8b850" />
                <stop offset="1" stopColor="#d8b850" />
              </linearGradient>
            </defs>
            <path
              data-home-thread-path
              d={THREAD_PATH}
              fill="none"
              stroke="url(#home-narrative-gradient)"
              strokeLinecap="round"
              strokeOpacity="0.74"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <span
          data-home-thread-traveler
          className="absolute bottom-0 left-[55%] z-20 h-0 w-0 transform-gpu"
        >
          <span className="absolute left-0 top-0 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-paper shadow-[0_0_0_3px_rgb(251_250_248/0.72)]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        </span>
      </div>
    </>
  );
}
