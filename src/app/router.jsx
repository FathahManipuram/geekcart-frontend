import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
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
])

