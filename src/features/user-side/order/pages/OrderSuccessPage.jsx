import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useCheckoutStore } from "../../checkout/store/checkout.store";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber } = useParams();

  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);
  useEffect(() => {
    resetCheckout();
  }, []);

  const orderId = location?.state.orderId;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto text-green-500" size={80} />

        <h1 className="mt-6 text-3xl font-bold">Order Placed Successfully</h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with GeekCart.
        </p>

        <div className="mt-8 rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Order Number</p>

          <p className="mt-1 text-lg font-semibold">{orderNumber}</p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          We'll notify you when your order is shipped.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="bg-primary cursor-pointer rounded-lg px-6 py-3 text-white"
          >
            View Order
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="cursor-pointer rounded-lg border px-6 py-3"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
