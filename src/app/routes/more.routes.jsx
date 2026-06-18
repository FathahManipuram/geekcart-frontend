import WalletPage from "@/features/user-side/wallet/pages/WalletPage";
import ProtectedRoute from "./ProtectedRoute";
import ReferralPage from "@/features/user-side/referral-rewards/pages/ReferralPage";

const moreRoutes = [
  {
    path: "/more/wallet",
    element: (
      <ProtectedRoute>
        <WalletPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/more/referral&rewards",
    element: (
      <ProtectedRoute>
        <ReferralPage/>
      </ProtectedRoute>
    ),
  },
];

export default moreRoutes