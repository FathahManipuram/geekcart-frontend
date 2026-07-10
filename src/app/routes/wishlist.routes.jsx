import ProtectedRoute from "./ProtectedRoute";
import WishlistPage from "@/features/user-side/wishlist/pages/WishlistPage";

const wishlistRoute = {
  path: "/wishlist",
  element: (
    <ProtectedRoute>
      <WishlistPage />
    </ProtectedRoute>
  ),
};

export default wishlistRoute;
