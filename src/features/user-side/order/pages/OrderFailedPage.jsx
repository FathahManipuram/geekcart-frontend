import { XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderFailedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const reason = location.state?.reason || "Payment could not be completed.";

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white border rounded-2xl p-10 text-center">
        <XCircle className="mx-auto text-red-500" size={80} />

        <h1 className="text-3xl font-bold mt-6">Payment Failed</h1>

        <p className="text-gray-500 mt-3">{reason}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/checkout/review")}
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Retry Payment
          </button>

          <button
            onClick={() => navigate("/checkout/payment")}
            className="px-6 py-3 border rounded-lg"
          >
            Change Payment Method
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="px-6 py-3 border rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderFailedPage;
