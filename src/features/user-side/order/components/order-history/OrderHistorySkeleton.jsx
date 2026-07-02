const OrderHistorySkeleton = () => {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-6 animate-pulse">

      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 flex-1">
          {/* Matches responsive image dimensions */}
          <div className="w-full sm:w-28 h-48 sm:h-28 bg-gray-200 rounded-xl" />

          <div className="flex-1 space-y-3">
            {/* Status pill placeholder */}
            <div className="w-20 h-5 bg-gray-200 rounded-full" />

            {/* Order number placeholder */}
            <div className="w-32 h-4 bg-gray-200 rounded" />

            {/* Product name placeholder */}
            <div className="w-3/4 sm:w-56 h-6 bg-gray-200 rounded" />

            {/* Date placeholder */}
            <div className="w-40 h-4 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Right Section: Pricing and Actions Skeleton */}
        <div className="flex flex-row md:flex-col md:justify-between items-center md:items-end gap-4 pt-4 md:pt-0 border-t md:border-none border-gray-100 min-w-[120px]">
          <div className="space-y-2 text-left md:text-right w-full">
            {/* "Order Total" label placeholder */}
            <div className="w-16 h-3 bg-gray-200 rounded md:ml-auto" />
            {/* Large price placeholder */}
            <div className="w-24 h-8 bg-gray-200 rounded md:ml-auto" />
          </div>

          {/* Action button placeholder */}
          <div className="w-28 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySkeleton;
