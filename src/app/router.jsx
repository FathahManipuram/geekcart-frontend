import AdminLogin from "@/features/admin/auth/pages/AdminLogin";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import HomePage from "@/features/home/pages/HomePage";
import ProfilePage from "@/features/user/pages/ProfilePage";
import MainLayout from "@/shared/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import UserManagementPage from "@/features/admin/user-management/pages/UserManagementPage";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";


export const router= createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		children:[
			{
				index: true,
				element: <HomePage/>
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute>
						<ProfilePage/>
					</ProtectedRoute>
				),
			},
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
	},





	//Admin routes
	{
		path: "/admin",
		element: (
			<AdminRoute>
				<AdminLayout/>
			</AdminRoute>
		),
		children: [
			{
				path: "dashboard",
				element: <AdminDashboard/>
			},
			{
				path:"users",
				element: <UserManagementPage/>
			}
		],
		
	},
	{
		path:"/admin/login",
		element:<AdminLogin/>
	}
])

