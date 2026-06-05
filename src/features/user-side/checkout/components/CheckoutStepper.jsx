const CheckoutStepper = ({ steps=[], currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-8 mb-12">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step.id === currentStep
                    ? "bg-primary text-white"
                    : step.id < currentStep
                      ? "bg-primary text-white"
                      : "border border-accent text-accent"
                }
              `}
            >
              {step.id}
            </div>

            <span
              className={`
                uppercase text-sm font-bold
                ${step.id <= currentStep ? "text-primary" : "text-accent"}
              `}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="w-16 h-px bg-gray-300 mx-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;
