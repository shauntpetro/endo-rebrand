import { Skeleton } from "@/components/ui/Skeleton";

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-surface" role="status" aria-label="Loading News page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-28 mb-6" />
          <Skeleton className="h-12 w-[350px] max-w-full mb-4" />
          <Skeleton className="h-5 w-[450px] max-w-full mb-12" />
          {/* Article cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
