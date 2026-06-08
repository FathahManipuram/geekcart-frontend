import { Check } from "lucide-react";
import { TRACKING_STEPS } from "../../constants/tracking.constants";
import { ORDER_TRACKING_STEPS } from "@/shared/constants/order/orderTrackingSteps";

const TrackingTimeline = ({ order }) => {
  
const currentIndex = ORDER_TRACKING_STEPS.indexOf(order?.orderStatus);

if (order.orderStatus === "PENDING") {
  return (
    <div className="text-center py-6">
      <p className="font-medium">Waiting for payment confirmation</p>
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
          const completed = index < currentIndex;

          const active = index === currentIndex;

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
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>

                {index < TRACKING_STEPS.length - 1 && (
                  <div className="w-px h-16 bg-gray-200" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{step.label}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {completed ? "Completed" : active ? "In Progress" : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
