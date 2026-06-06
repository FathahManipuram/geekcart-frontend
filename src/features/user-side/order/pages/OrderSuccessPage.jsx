import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";


const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {orderNumber}= useParams()

const orderId= location?.state.orderId


  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white border rounded-2xl p-10 text-center">
        <CheckCircle2 className="mx-auto text-green-500" size={80} />

        <h1 className="text-3xl font-bold mt-6">Order Placed Successfully</h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with GeekCart.
        </p>

        <div className="mt-8 bg-gray-50 rounded-xl p-5">
          <p className="text-sm text-gray-500">Order Number</p>

          <p className="font-semibold text-lg mt-1">{orderNumber}</p>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          We'll notify you when your order is shipped.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            View Order
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

export default OrderSuccessPage;
