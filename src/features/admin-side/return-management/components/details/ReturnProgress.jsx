import { Check } from "lucide-react";
import { RETURN_PROGRESS_STEPS } from "../../constants/return.constants";

const ReturnProgress = ({ currentStatus }) => {

  const currentIndex = RETURN_PROGRESS_STEPS.findIndex((step) => step.key === currentStatus);

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between">
        {RETURN_PROGRESS_STEPS.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <div key={step.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    ${completed ? "bg-primary text-white" : "bg-muted"}
                  `}
                >
                  {completed ? <Check size={18} /> : index + 1}
                </div>

                <p className="mt-2 text-xs">{step.label}</p>
              </div>

              {index < RETURN_PROGRESS_STEPS.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5
                    ${index < currentIndex ? "bg-primary" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturnProgress;
