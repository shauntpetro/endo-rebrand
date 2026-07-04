import { clsx } from "clsx";

/**
 * Seamless marquee. Renders the item set twice; CSS translates the track -50%.
 * Pauses on hover; static under prefers-reduced-motion (handled in globals.css).
 */
export default function Marquee({
  items,
  tone = "light",
  className,
}: {
  items: React.ReactNode[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={clsx("marquee relative overflow-hidden", className)}>
      <div className="marquee-track" aria-hidden>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className={clsx(
                  "flex items-center gap-4 whitespace-nowrap px-8",
                  dark ? "text-paper-on-dark" : "text-ink",
                )}
              >
                {item}
                <span
                  className={clsx(
                    "inline-block h-1 w-1 rounded-full",
                    dark ? "bg-gold-light/60" : "bg-gold/70",
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
