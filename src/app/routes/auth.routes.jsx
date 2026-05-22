
import AdminLoginPage from "@/features/auth/pages/AdminLoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpasswordPage from "@/features/auth/pages/ResetpasswordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import GuestRoute from "./GuestRoute";
import AdminGuestRoute from "./AdminGuestRoute";


const authRoutes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },

  {
    path: "/forgot-password",
    element: (
      <GuestRoute>
        <ForgotPasswordPage />
      </GuestRoute>
    ),
  },

  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },

  {
    path: "/reset-password",
    element: (
      <GuestRoute>
        <ResetpasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <AdminGuestRoute>
        <AdminLoginPage />
      </AdminGuestRoute>
    ),
  },
];


export default authRoutes