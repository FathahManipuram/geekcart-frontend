import { DELIVERY_OPTIONS } from "../../constants/deliveryOptions";
import { useCheckoutStore } from "../../store/checkout.store";

const DeliveryMethod = () => {
  const selectedDeliveryMethod = useCheckoutStore(
    (state) => state.selectedDeliveryMethod,
  );
  const setDeliveryMethod = useCheckoutStore(
    (state) => state.setDeliveryMethod,
  );
  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <h2 className="mb-5 text-lg font-semibold">Delivery Method</h2>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
              selectedDeliveryMethod === method.id
                ? "border-primary bg-background"
                : "border-transparent"
            } `}
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
                <h3 className="text-sm font-medium">{method.title}</h3>

                <p className="text-muted-foreground text-xs">
                  {method.description}
                </p>
              </div>
            </div>

            <span className="text-sm font-semibold">
              {method.price === 0 ? "FREE" : `₹${method.price}`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethod;
