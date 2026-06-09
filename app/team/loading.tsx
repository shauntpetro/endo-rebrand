import { Skeleton } from "@/components/ui/Skeleton";

export default function TeamLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]" role="status" aria-label="Loading Team page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-24 mb-6" />
          <Skeleton className="h-12 w-[400px] max-w-full mb-4" />
          <Skeleton className="h-5 w-[500px] max-w-full mb-16" />
          {/* Team grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
