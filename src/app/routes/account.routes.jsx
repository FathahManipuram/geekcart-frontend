import AccountLayout from "@/features/user-side/account/layout/AccountLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "@/features/user-side/account/profile/pages/ProfilePage";
import AddressPage from "@/features/user-side/account/address/pages/AddressPage";


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
  ],
};

export default accountRoutes