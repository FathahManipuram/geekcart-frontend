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
];


export default authRoutes