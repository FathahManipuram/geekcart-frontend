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
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-center sm:p-6">
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
      <div className="rounded-xl border bg-white p-4 sm:p-6">
        <h2 className="mb-6 text-lg font-semibold sm:mb-8">Order Status</h2>

        <div className="flex items-center justify-between sm:justify-start">
          <div className="flex flex-col items-center">
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full text-white sm:h-10 sm:w-10">
              <Check size={18} />
            </div>

            <p className="mt-2 text-xs font-medium sm:text-sm">Placed</p>
          </div>

          <div className="mx-3 h-[2px] flex-1 bg-red-300 sm:mx-4" />

          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white sm:h-10 sm:w-10">
              <X size={18} />
            </div>

            <p className="mt-2 text-xs font-medium text-red-600 sm:text-sm">
              Cancelled
            </p>

            {cancelledAt && (
              <p className="text-muted-foreground mt-1 text-[10px] sm:text-xs">
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
    <div className="rounded-xl border bg-white p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Order Status</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
          {ORDER_STATUS_LABELS[order.orderStatus]}
        </span>
      </div>

      {/* MOBILE VERTICAL TIMELINE */}
      <div className="flex flex-col gap-4 sm:hidden">
        {ORDER_TRACKING_STEPS.map((status, index) => {
          const isDelivered = order?.orderStatus === "DELIVERED";
          const completed = isDelivered
            ? index <= currentStepIndex
            : index < currentStepIndex;
          const active = !isDelivered && index === currentStepIndex;

          return (
            <div key={status} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                    completed
                      ? "border-primary bg-primary text-white"
                      : active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {completed ? <Check size={16} /> : index + 1}
                </div>

                {index < ORDER_TRACKING_STEPS.length - 1 && (
                  <div
                    className={`mt-1 h-6 w-[2px] ${
                      index < currentStepIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    completed || active ? "text-neutral-900" : "text-gray-400"
                  }`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP HORIZONTAL TIMELINE */}
      <div className="hidden sm:block">
        <div className="flex items-center">
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
                        ? "border-primary bg-primary text-white"
                        : active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-300 text-gray-400"
                    }`}
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
                    }`}
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
