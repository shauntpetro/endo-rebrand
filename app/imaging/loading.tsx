import { Skeleton } from "@/components/ui/Skeleton";

export default function ImagingLoading() {
  return (
    <div className="min-h-screen bg-plum-dark" role="status" aria-label="Loading Imaging page">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <Skeleton className="h-3 w-48 mb-6 bg-white/10" />
          <Skeleton className="h-14 w-[500px] max-w-full mb-4 bg-white/10" />
          <Skeleton className="h-14 w-[400px] max-w-full mb-8 bg-white/10" />
          <Skeleton className="h-5 w-[550px] max-w-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
