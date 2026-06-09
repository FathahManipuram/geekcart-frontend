import AccountLayout from "@/features/user-side/account/layout/AccountLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "@/features/user-side/account/profile/pages/ProfilePage";
import AddressPage from "@/features/user-side/account/address/pages/AddressPage";
import OrderHistoryPage from "@/features/user-side/order/pages/OrderHistoryPage";


const accountRoutes = {
  path: "/account",
  element: (
    <ProtectedRoute>
      <AccountLayout />
    </ProtectedRoute>
  ),

  children: [
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "addresses",
      element: <AddressPage />,
    },
    {
      path: "order-history",
      element: <OrderHistoryPage/>,
    },
    
  ],
};

export default accountRoutes