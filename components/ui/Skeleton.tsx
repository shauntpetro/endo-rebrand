import clsx from "clsx";

/** Lightweight shimmer placeholder for loading states */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx(
        "animate-pulse rounded-lg bg-black-primary/[0.04]",
        className
      )}
    />
  );
}

/** Full-width section placeholder with configurable height */
export function SectionSkeleton({
  height = "h-64",
  className,
}: {
  height?: string;
  className?: string;
}) {
  return (
    <div className={clsx("w-full", height, className)} aria-hidden>
      <div className="container mx-auto px-6 h-full flex flex-col justify-center gap-4 py-12">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-72 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
    </div>
  );
}
