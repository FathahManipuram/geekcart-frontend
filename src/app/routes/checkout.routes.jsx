import ShippingPage from "@/features/user-side/checkout/shipping/pages/ShippingPage";
import ProtectedRoute from "./ProtectedRoute";
import PaymentPage from "@/features/user-side/checkout/payment/pages/PaymentPage";
import ReviewPage from "@/features/user-side/checkout/review/pages/ReviewPage";

export const checkoutRoutes = [
  {
    path: "/checkout/shipping",
    element: (
      <ProtectedRoute>
        <ShippingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout/payment",
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout/review",
    element: (
      <ProtectedRoute>
        <ReviewPage/>
      </ProtectedRoute>
    ),
  },
];