import { ORDER_STATUS_STEPS } from "@/shared/constants/orderStatus";
import { Check } from "lucide-react";


const OrderTimeline = ({ order }) => {
  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(order.orderStatus);

  const isCancelled = order.orderStatus === "CANCELLED";

  const isReturned = order.orderStatus === "RETURNED";

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Order Status</h2>

        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${
              isCancelled
                ? "bg-red-100 text-red-600"
                : isReturned
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
            }
          `}
        >
          {order.orderStatus}
        </span>
      </div>

      {isCancelled || isReturned ? (
        <div className="text-center py-6">
          <p className="font-medium">Order {order.orderStatus}</p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {ORDER_STATUS_STEPS.map((status, index) => {
            const completed = index <= currentStepIndex;

            return (
              <div key={status} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                        w-10 h-10 rounded-full border flex items-center justify-center
                        ${
                          completed
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 text-gray-400"
                        }
                      `}
                  >
                    {completed ? <Check size={18} /> : index + 1}
                  </div>

                  <p className="mt-2 text-xs font-medium">{status}</p>
                </div>

                {index < ORDER_STATUS_STEPS.length - 1 && (
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
      )}
    </div>
  );
};

export default OrderTimeline;
