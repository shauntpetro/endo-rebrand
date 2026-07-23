import { clsx } from "clsx";
import Eyebrow from "./Eyebrow";

export default function ChapterIntro({
  eyebrow,
  index,
  title,
  children,
  align = "end",
  className,
}: {
  eyebrow: React.ReactNode;
  index?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  return (
    <div data-chapter={index} className={clsx("chapter-intro grid gap-8 md:grid-cols-12 md:gap-10", className)}>
      <div className={clsx("md:col-span-6", align === "end" && "md:col-span-5")}>
        <div className="flex items-center gap-3">
          <span aria-hidden className="chapter-thread-mark">
            <span />
          </span>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h2 className="t-h2 mt-5 max-w-[18ch] text-ink">{title}</h2>
      </div>
      {children && (
        <div className={clsx("t-lead max-w-xl", align === "end" ? "self-end md:col-span-6 md:col-start-7" : "md:col-span-6")}>{children}</div>
      )}
    </div>
  );
}
