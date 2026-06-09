import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]" role="status" aria-label="Loading Contact page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-28 mb-6" />
          <Skeleton className="h-12 w-[350px] max-w-full mb-4" />
          <Skeleton className="h-5 w-[450px] max-w-full mb-12" />
          {/* Form skeleton */}
          <div className="max-w-2xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
