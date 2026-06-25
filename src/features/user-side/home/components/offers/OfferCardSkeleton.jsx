import { Skeleton } from "@/shared/components/ui/skeleton";

const OfferCardSkeleton = () => {
  return (
    <div className="rounded-3xl border p-6 space-y-5">
      <Skeleton className="h-6 w-32" />

      <Skeleton className="h-10 w-44" />

      <Skeleton className="h-5 w-56" />

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-10 w-32" />
    </div>
  );
};

export default OfferCardSkeleton;
