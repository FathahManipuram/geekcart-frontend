import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import HomePage from "@/features/home/pages/HomePage";
import MainLayout from "@/shared/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";


export const router= createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		children:[
			{
				index: true,
				element: <HomePage/>
			}
		]
		
	},
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

