// WalletBalanceCard.jsx

import { Wallet } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import AddMoneyDialog from "./AddMoneyDialog";
import { useWalletStore } from "../store/wallet.store";
import { toast } from "sonner";
import { loadRazorpay } from "@/shared/helpers/loadRazorpay";

const WalletBalanceCard = ({ fetchWallet, fetchTransactions }) => {
  const [open, setOpen] = useState(false);

  const createWalletTopupOrder = useWalletStore(
    (state) => state.createWalletTopupOrder,
  );
  const wallet = useWalletStore((state) => state.wallet);

  const verifyWalletTopup = useWalletStore((state) => state.verifyWalletTopup);
  const loading = useWalletStore((state) => state.loading);

  const handleAddMoney = async (amount) => {
    try {
      const res = await createWalletTopupOrder(amount);
      const { orderId, amount: orderAmount } = res;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderAmount * 100,
        currency: "INR",
        name: "GeekCart Wallet",
        description: "Wallet Topup",
        order_id: orderId,

        handler: async (razorpayResponse) => {
          try {
            await verifyWalletTopup(razorpayResponse);
            await fetchWallet();
            await fetchTransactions({ page: 1 });

            toast.success("Money added successfully");

            setOpen(false);

            // refresh wallet later
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Verification failed",
            );
          }
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },

        theme: {
          color: "#825026",
        },
      };

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay");
        return;
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (res) => {
        toast.error("Payment failed");
      });

      razorpay.open();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <div className="from-primary to-primary/80 rounded-2xl bg-linear-to-r p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm tracking-wider uppercase opacity-80">
            Wallet Balance
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            ₹{wallet?.balance?.toFixed(2) || "0.00"}
          </h2>

          <p className="mt-3 text-white/80">
            Available for purchases, refunds and rewards.
          </p>
        </div>

        <Wallet size={40} />
      </div>

      <div className="mt-8">
        <Button
          className="cursor-pointer"
          onClick={() => setOpen(true)}
          size="lg"
          variant="secondary"
        >
          Add Money
        </Button>
      </div>

      <AddMoneyDialog
        open={open}
        onOpenChange={setOpen}
        loading={loading}
        onSubmit={handleAddMoney}
      />
    </div>
  );
};

export default WalletBalanceCard;
