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
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <h3 className="font-medium text-yellow-700">
          Waiting for Payment Confirmation
        </h3>

        <p className="text-sm text-yellow-600 mt-2">
          Your order will be processed once payment is confirmed.
        </p>
      </div>
    );
  }

  // Cancelled Order
  if (order?.orderStatus === "CANCELLED") {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-8">Order Status</h2>

        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              <Check size={18} />
            </div>

            <p className="mt-2 text-sm font-medium">Placed</p>
          </div>

          <div className="flex-1 h-[2px] bg-red-300 mx-4" />

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
              <X size={18} />
            </div>

            <p className="mt-2 text-sm font-medium text-red-600">Cancelled</p>

            {cancelledAt && (
              <p className="text-xs text-muted-foreground mt-1">
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
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Order Status</h2>

        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
          {ORDER_STATUS_LABELS[order.orderStatus]}
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-center min-w-[700px]">
          {ORDER_TRACKING_STEPS.map((status, index) => {
            const isDelivered = order?.orderStatus === "DELIVERED";

            const completed = isDelivered
              ? index <= currentStepIndex
              : index < currentStepIndex;

            const active = !isDelivered && index === currentStepIndex;

            return (
              <div key={status} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                        w-10 h-10 rounded-full border flex items-center justify-center
                        ${
                          completed
                            ? "bg-primary text-white border-primary"
                            : active
                              ? "border-primary text-primary bg-primary/10"
                              : "border-gray-300 text-gray-400"
                        }
                      `}
                  >
                    {completed ? <Check size={18} /> : index + 1}
                  </div>

                  <p className="mt-2 text-xs font-medium text-center whitespace-nowrap">
                    {ORDER_STATUS_LABELS[status]}
                  </p>
                </div>

                {index < ORDER_TRACKING_STEPS.length - 1 && (
                  <div
                    className={`
                        flex-1 h-[2px] mx-2
                        ${
                          index < currentStepIndex
                            ? "bg-primary"
                            : "bg-gray-200"
                        }
                      `}
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
