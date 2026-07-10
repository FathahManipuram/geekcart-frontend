const OrderHistorySkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-5">
          <div className="h-48 w-full rounded-xl bg-gray-200 sm:h-28 sm:w-28" />

          <div className="flex-1 space-y-3">
            <div className="h-5 w-20 rounded-full bg-gray-200" />

            <div className="h-4 w-32 rounded bg-gray-200" />

            <div className="h-6 w-3/4 rounded bg-gray-200 sm:w-56" />

            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
        </div>

        <div className="flex min-w-[120px] flex-row items-center gap-4 border-t border-gray-100 pt-4 md:flex-col md:items-end md:justify-between md:border-none md:pt-0">
          <div className="w-full space-y-2 text-left md:text-right">
            <div className="h-3 w-16 rounded bg-gray-200 md:ml-auto" />

            <div className="h-8 w-24 rounded bg-gray-200 md:ml-auto" />
          </div>
          <div className="h-9 w-28 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySkeleton;
