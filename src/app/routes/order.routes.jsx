import OrderSuccessPage from "@/features/user-side/order/pages/OrderSuccessPage";
import ProtectedRoute from "./ProtectedRoute";
import OrderDetailsPage from "@/features/user-side/order/pages/OrderDetailsPage";
import OrderTrackingPage from "@/features/user-side/order/pages/OrderTrackingPage";
import ReturnOrderPage from "@/features/user-side/return/pages/ReturnOrderPage";
import OrderFailedPage from "@/features/user-side/order/pages/OrderFailedPage";

export const orderRoutes = [
  {
    path: "/orders/success/:orderNumber",
    element: (
      <ProtectedRoute>
        <OrderSuccessPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/orders/payment-failed",
    element: (
      <ProtectedRoute>
        <OrderFailedPage/>
      </ProtectedRoute>
    ),
  },

  {
    path: "/orders/:orderId",
    element: (
      <ProtectedRoute>
        <OrderDetailsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/orders/:orderId/tracking",
    element: (
      <ProtectedRoute>
        <OrderTrackingPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/orders/:orderId/return",
    element: (
      <ProtectedRoute>
        <ReturnOrderPage />
      </ProtectedRoute>
    ),
  },
];
