import { Check } from "lucide-react";
import { TRACKING_STEPS } from "../../constants/tracking.constants";
import { ORDER_TRACKING_STEPS } from "@/shared/constants/order/orderTrackingSteps";
import { formatDateTime } from "@/shared/utils/date";

const TrackingTimeline = ({ order }) => {
  const currentIndex = ORDER_TRACKING_STEPS.indexOf(order?.orderStatus);

  const isDelivered = order?.orderStatus === "DELIVERED";

  const getStatusDate = (status, index) => {
    const historyItem = order?.statusHistory?.find(
      (item) => item.status === status,
    );
    if (historyItem) return historyItem.updatedAt;

    if (index === 0) {
      return order?.createdAt;
    }

    return null;
  };

  if (order?.orderStatus === "CANCELLED") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h3 className="font-semibold text-red-700">Order Cancelled</h3>

        <p className="mt-2 text-sm text-red-600">
          This order has been cancelled and will not be processed further.
        </p>

        {order?.statusHistory?.find((item) => item.status === "CANCELLED")
          ?.updatedAt && (
          <p className="mt-4 text-xs text-red-500">
            Cancelled on{" "}
            {formatDateTime(
              order.statusHistory.find((item) => item.status === "CANCELLED")
                .updatedAt,
            )}
          </p>
        )}
      </div>
    );
  }

  if (order?.orderStatus === "PENDING") {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8 text-center">
        <h3 className="font-semibold text-yellow-700">
          Waiting for Payment Confirmation
        </h3>

        <p className="mt-2 text-sm text-yellow-600">
          Your order will be processed once payment is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-8">
      <h2 className="mb-10 text-xs tracking-widest uppercase">
        Journey Tracking
      </h2>

      <div className="space-y-12">
        {TRACKING_STEPS.map((step, index) => {
          const completed = isDelivered
            ? index <= currentIndex
            : index < currentIndex;

          const active = !isDelivered && index === currentIndex;
          const statusDate = getStatusDate(step.key, index);

          return (
            <div key={step.key} className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                    completed
                      ? "bg-primary border-primary text-white"
                      : active
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-300"
                  } `}
                >
                  {completed ? (
                    <Check size={16} />
                  ) : active ? (
                    <div className="h-2 w-2 rounded-full bg-current" />
                  ) : null}
                </div>

                {index < TRACKING_STEPS.length - 1 && (
                  <div
                    className={`h-16 w-px ${
                      index < currentIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{step.label}</h3>

                <p className="text-muted-foreground mt-1 text-sm">
                  {completed ? "Completed" : active ? "In Progress" : "Pending"}
                </p>

                {statusDate && (
                  <p className="text-muted-foreground mt-2 text-xs">
                    {formatDateTime(statusDate)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
