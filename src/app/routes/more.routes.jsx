import WalletPage from "@/features/user-side/wallet/pages/WalletPage";
import ProtectedRoute from "./ProtectedRoute";

const moreRoutes= {
	path: "/more/wallet",
	element: (
		<ProtectedRoute>
			<WalletPage/>
		</ProtectedRoute>
	)
}

export default moreRoutes