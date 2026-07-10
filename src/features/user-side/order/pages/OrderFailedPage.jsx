import { XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderFailedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const reason = location.state?.reason || "Payment could not be completed.";

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-10 text-center">
        <XCircle className="mx-auto text-red-500" size={80} />

        <h1 className="mt-6 text-3xl font-bold">Payment Failed</h1>

        <p className="mt-3 text-gray-500">{reason}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/checkout/review")}
            className="bg-primary rounded-lg px-6 py-3 text-white"
          >
            Retry Payment
          </button>

          <button
            onClick={() => navigate("/checkout/payment")}
            className="rounded-lg border px-6 py-3"
          >
            Change Payment Method
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="rounded-lg border px-6 py-3"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderFailedPage;
