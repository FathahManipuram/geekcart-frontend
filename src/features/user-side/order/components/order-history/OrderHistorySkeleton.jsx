const OrderHistorySkeleton = () => {
  return (
    <div className="bg-white border rounded-2xl p-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-28 h-28 bg-gray-200 rounded-lg" />

        <div className="flex-1 space-y-3">
          <div className="w-24 h-5 bg-gray-200 rounded" />

          <div className="w-56 h-6 bg-gray-200 rounded" />

          <div className="w-40 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySkeleton;
