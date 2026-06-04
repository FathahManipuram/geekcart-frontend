import ShippingPage from "@/features/user-side/checkout/shipping/pages/ShippingPage";
import ProtectedRoute from "./ProtectedRoute";

export const checkoutRoutes={
	path: "/checkout/shipping",
	element: (
		<ProtectedRoute>
			<ShippingPage/>
		</ProtectedRoute>
	)
}