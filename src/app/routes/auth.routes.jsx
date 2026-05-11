
import AdminLoginPage from "@/features/auth/pages/AdminLoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import GuestRoute from "./GuestRoute";


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
    element: <VerifyOtpPage />
  },

  {
    path: "/reset-password",
    element: (
      <GuestRoute>
        <ResetpassordPage />
      </GuestRoute>
    ),
  },
  {
    path: "admin/login",
    element: <AdminLoginPage />
  },
];


export default authRoutes