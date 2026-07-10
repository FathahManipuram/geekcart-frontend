import { Wallet } from "lucide-react";

const PaymentMethodCard = ({
  method,
  value,
  selected,
  onSelect,
  wallet,
  orderTotal = 0,
}) => {
  const isWallet = method.id === "WALLET";

  const hasEnoughBalance = wallet?.balance >= orderTotal;

  return (
    <button
      disabled={value === "COD" && orderTotal > 2000}
      onClick={() => onSelect(method.id)}
      className={`w-full cursor-pointer rounded-xl border p-5 text-left transition disabled:cursor-not-allowed ${selected ? "border-primary bg-primary/5" : ""} `}
    >
      <div className="flex items-start gap-3">
        <input
          disabled={value === "COD" && orderTotal > 2000}
          type="radio"
          checked={selected}
          readOnly
          className="accent-primary mt-1 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="flex-1">
          <h3 className="font-medium">{method.title}</h3>

          <p className="text-muted-foreground text-sm">{method.description}</p>
          {value === "COD" && orderTotal > 2000 && (
            <p className="mt-2 text-sm text-amber-600">
              Cash on Delivery is available only for orders up to ₹2,000.
            </p>
          )}
          {isWallet && (
            <div className="mt-4 rounded-lg border border-green-100 bg-green-50 p-3">
              <div className="flex items-center gap-2">
                <Wallet size={16} />

                <span className="text-sm font-medium">Available Balance</span>
              </div>

              <p className="mt-1 text-lg font-bold text-green-700">
                ₹{wallet?.balance?.toFixed(2) || "0.00"}
              </p>

              <div className="text-muted-foreground mt-2 text-xs">
                Order Total: ₹{orderTotal.toFixed(2)}
              </div>

              {!hasEnoughBalance && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  Insufficient wallet balance
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default PaymentMethodCard;
