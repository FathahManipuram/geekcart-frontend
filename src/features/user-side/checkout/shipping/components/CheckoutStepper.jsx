const CheckoutStepper = () => {
  return (
    <div className="flex items-center justify-center gap-8 mb-12">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          1
        </div>
        <span className="uppercase text-sm font-bold text-primary">
          Shipping
        </span>
      </div>

      <div className="w-16 h-px bg-gray-300" />

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent">
          2
        </div>
        <span className="uppercase text-sm font-bold text-accent">Payment</span>
      </div>

      <div className="w-16 h-px bg-gray-300" />

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border flex items-center justify-center text-accent">
          3
        </div>
        <span className="uppercase text-sm font-bold text-accent">Review</span>
      </div>
    </div>
  );
};

export default CheckoutStepper;
