import { Check } from "lucide-react";
import { TRACKING_STEPS } from "../../constants/tracking.constants";
import { ORDER_TRACKING_STEPS } from "@/shared/constants/order/orderTrackingSteps";
import { formatDateTime } from "@/shared/utils/date";

const TrackingTimeline = ({ order }) => {
  const currentIndex = ORDER_TRACKING_STEPS.indexOf(order?.orderStatus);

  const isDelivered = order?.orderStatus === "DELIVERED";

const getStatusDate = (status, index) => {

  const historyItem = order?.statusHistory?.find((item) => item.status === status)
  if (historyItem) return historyItem.updatedAt;

  if (index === 0) {
    return order?.createdAt;
  }

  return null;
};

if (order?.orderStatus === "CANCELLED") {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
      <h3 className="font-semibold text-red-700">Order Cancelled</h3>

      <p className="text-sm text-red-600 mt-2">
        This order has been cancelled and will not be processed further.
      </p>

      {order?.statusHistory?.find((item) => item.status === "CANCELLED")
        ?.updatedAt && (
        <p className="text-xs text-red-500 mt-4">
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
        <h3 className="font-semibold text-yellow-700">
          Waiting for Payment Confirmation
        </h3>

        <p className="text-sm text-yellow-600 mt-2">
          Your order will be processed once payment is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-8">
      <h2 className="uppercase text-xs tracking-widest mb-10">
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
                  className={`
                    w-8 h-8 rounded-full border flex items-center justify-center
                    ${
                      completed
                        ? "bg-primary text-white border-primary"
                        : active
                          ? "border-primary text-primary"
                          : "border-gray-300 text-gray-300"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={16} />
                  ) : active ? (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  ) : null}
                </div>

                {index < TRACKING_STEPS.length - 1 && (
                  <div
                    className={`w-px h-16 ${
                      index < currentIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{step.label}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {completed ? "Completed" : active ? "In Progress" : "Pending"}
                </p>

                {statusDate && (
                  <p className="text-xs text-muted-foreground mt-2">
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
