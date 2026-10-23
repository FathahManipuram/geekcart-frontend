const CheckoutStepper = ({ steps = [], currentStep }) => {
  return (
    <div className="mb-8 flex w-full items-center justify-between gap-1 px-1 sm:mb-12 sm:justify-center sm:gap-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-1 sm:gap-3">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold sm:h-8 sm:w-8 sm:text-sm ${
                step.id === currentStep
                  ? "bg-primary text-white"
                  : step.id < currentStep
                    ? "bg-primary text-white"
                    : "border-accent text-accent border"
              }`}
            >
              {step.id}
            </div>

            <span
              className={`text-[10px] font-bold uppercase sm:text-sm ${
                step.id <= currentStep ? "text-primary" : "text-accent"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="mx-1 h-px w-10 bg-gray-300 sm:mx-6 sm:w-16" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;
