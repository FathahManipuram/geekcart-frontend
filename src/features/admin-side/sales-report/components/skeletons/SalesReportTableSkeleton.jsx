import { Skeleton } from "@/shared/components/ui/skeleton";

const SalesReportTableSkeleton = () => {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-6">
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="divide-y">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid grid-cols-8 gap-4 px-6 py-4">
            {Array.from({ length: 8 }).map((_, cell) => (
              <Skeleton key={cell} className="h-5 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesReportTableSkeleton;
