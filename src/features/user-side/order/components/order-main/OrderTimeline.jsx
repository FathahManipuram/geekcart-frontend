import { Check, X } from "lucide-react";
import { ORDER_STATUS_LABELS } from "@/shared/constants/order/orderStatusLabel";
import { ORDER_TRACKING_STEPS } from "@/shared/constants/order/orderTrackingSteps";

const OrderTimeline = ({ order }) => {
  const currentStepIndex = ORDER_TRACKING_STEPS.indexOf(order?.orderStatus);

  const isPending = order?.orderStatus === "PENDING";

  const cancelledAt = order?.statusHistory?.find(
    (item) => item.status === "CANCELLED",
  )?.updatedAt;

  // Pending Order
  if (isPending) {
    return (
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
        <h3 className="font-medium text-yellow-700">
          Waiting for Payment Confirmation
        </h3>

        <p className="mt-2 text-sm text-yellow-600">
          Your order will be processed once payment is confirmed.
        </p>
      </div>
    );
  }

  // Cancelled Order
  if (order?.orderStatus === "CANCELLED") {
    return (
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-8 text-lg font-semibold">Order Status</h2>

        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
              <Check size={18} />
            </div>

            <p className="mt-2 text-sm font-medium">Placed</p>
          </div>

          <div className="mx-4 h-[2px] flex-1 bg-red-300" />

          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
              <X size={18} />
            </div>

            <p className="mt-2 text-sm font-medium text-red-600">Cancelled</p>

            {cancelledAt && (
              <p className="text-muted-foreground mt-1 text-xs">
                {new Date(cancelledAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Normal Order Timeline
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Order Status</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
          {ORDER_STATUS_LABELS[order.orderStatus]}
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[700px] items-center">
          {ORDER_TRACKING_STEPS.map((status, index) => {
            const isDelivered = order?.orderStatus === "DELIVERED";

            const completed = isDelivered
              ? index <= currentStepIndex
              : index < currentStepIndex;

            const active = !isDelivered && index === currentStepIndex;

            return (
              <div key={status} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                      completed
                        ? "bg-primary border-primary text-white"
                        : active
                          ? "border-primary text-primary bg-primary/10"
                          : "border-gray-300 text-gray-400"
                    } `}
                  >
                    {completed ? <Check size={18} /> : index + 1}
                  </div>

                  <p className="mt-2 text-center text-xs font-medium whitespace-nowrap">
                    {ORDER_STATUS_LABELS[status]}
                  </p>
                </div>

                {index < ORDER_TRACKING_STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-[2px] flex-1 ${
                      index < currentStepIndex ? "bg-primary" : "bg-gray-200"
                    } `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
