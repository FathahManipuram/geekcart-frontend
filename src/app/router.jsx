import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import { createBrowserRouter } from "react-router-dom";


export const router= createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage/>
	},

	{
		path: "/register",
		element: <RegisterPage/>
	},
	{
		path: "/forgot-password",
		element: <ForgotPasswordPage/>
	},
	{
		path: "/verify-otp",
		element: <VerifyOtpPage/>
	},
	{
		path: "/reset-password",
		element: <ResetpassordPage/>
	}
])

