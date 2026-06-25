import { Skeleton } from "@/shared/components/ui/skeleton";

const SalesSummarySkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-white p-5 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-36" />
        </div>
      ))}
    </div>
  );
};

export default SalesSummarySkeleton;
