import { SectionSkeleton } from "@/components/ui/Skeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ImpactLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]" role="status" aria-label="Loading Impact page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-32 mb-6" />
          <Skeleton className="h-12 w-[450px] max-w-full mb-4" />
          <Skeleton className="h-5 w-[500px] max-w-full" />
        </div>
      </div>
      <SectionSkeleton height="h-64" />
    </div>
  );
}
