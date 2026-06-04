import { useCheckoutStore } from "../../store/checkout.store";

const DELIVERY_OPTIONS = [
  {
    id: "STANDARD",
    title: "Standard",
    description: "3-5 Business Days",
    price: 0,
  },
  {
    id: "EXPRESS",
    title: "Express",
    description: "Next Day Delivery",
    price: 25,
  },
];

const DeliveryMethod = () => {
	const selectedDeliveryMethod = useCheckoutStore((state)=> state.selectedDeliveryMethod)
	const setDeliveryMethod= useCheckoutStore((state)=> state.setDeliveryMethod)
  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-5">Delivery Method</h2>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((method) => (
          <label
            key={method.id}
            className={`
              flex items-center justify-between
              p-4 rounded-lg border cursor-pointer
              transition
              ${
                selectedDeliveryMethod === method.id
                  ? "border-primary bg-background"
                  : "border-transparent"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <input
			  className="accent-primary"
                type="radio"
                name="deliveryMethod"
                checked={selectedDeliveryMethod === method.id}
                onChange={() => setDeliveryMethod(method.id)}
              />

              <div>
                <h3 className="font-medium text-sm">{method.title}</h3>

                <p className="text-xs text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>

            <span className="font-semibold text-sm">
              {method.price === 0 ? "FREE" : `₹${method.price}`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethod;
