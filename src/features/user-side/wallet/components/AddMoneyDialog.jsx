import { useState } from "react";

import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { AppInput } from "@/shared/components/AppInput";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

const AddMoneyDialog = ({ open, onOpenChange, onSubmit, loading }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const value = Number(amount);

    if (!value || value < 1) return;

    onSubmit?.(value);
  };


  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Money To Wallet"
      description="Add funds securely using Razorpay."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>

          <AppInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-3">Quick Select</p>

          <div className="grid grid-cols-2 gap-3">
            {QUICK_AMOUNTS.map((value) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                onClick={() => setAmount(String(value))}
              >
                ₹{value}
              </Button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          disabled={loading || !amount || Number(amount) < 100}
          onClick={handleSubmit}
        >
          {loading ? "Processing..." : "Proceed To Pay"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddMoneyDialog;
