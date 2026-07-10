const CheckoutStepper = ({ steps = [], currentStep }) => {
  return (
    <div className="mb-12 flex items-center justify-center gap-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step.id === currentStep
                  ? "bg-primary text-white"
                  : step.id < currentStep
                    ? "bg-primary text-white"
                    : "border-accent text-accent border"
              } `}
            >
              {step.id}
            </div>

            <span
              className={`text-sm font-bold uppercase ${step.id <= currentStep ? "text-primary" : "text-accent"} `}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="mx-6 h-px w-16 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;
