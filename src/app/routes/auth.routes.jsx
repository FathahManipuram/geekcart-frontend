import AdminLogin from "@/features/admin-side/auth/pages/AdminLogin";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";


const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>,
  },

  {
    path: "/verify-otp",
    element: <VerifyOtpPage/>,
  },
  
  {
    path: "/reset-password",
    element: <ResetpassordPage />,
  },
  {
    path: "admin/login",
    element: <AdminLogin/>
  }
];


export default authRoutes