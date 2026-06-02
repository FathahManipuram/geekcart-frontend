import CartPage from "@/features/user-side/cart/pages/Cartpage";
import ProtectedRoute from "./ProtectedRoute";

const cartRoutes= {
	path: "/cart",
	element: (
		<ProtectedRoute>
			<CartPage/>
		</ProtectedRoute>
	)
}

export default cartRoutes