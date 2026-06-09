import { Skeleton } from "@/components/ui/Skeleton";

export default function PipelineLoading() {
  return (
    <div className="min-h-screen bg-surface" role="status" aria-label="Loading Pipeline page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-28 mb-6" />
          <Skeleton className="h-12 w-[450px] max-w-full mb-4" />
          <Skeleton className="h-5 w-[550px] max-w-full mb-12" />
          {/* Filter buttons skeleton */}
          <div className="flex gap-3 mb-8">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
          {/* Table skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
