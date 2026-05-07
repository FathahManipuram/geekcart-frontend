import HomePage from "@/features/user-side/home/pages/HomePage";
import MainLayout from "@/shared/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "@/features/user-side/account/profile/pages/ProfilePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import ResetpassordPage from "@/features/auth/pages/ResetpassordPage";
import AdminLayout from "@/features/admin-side/layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "@/features/admin-side/dashboard/pages/AdminDashboard";
import UserManagementPage from "@/features/admin-side/user-management/pages/UserManagementPage";
import AdminLogin from "@/features/admin-side/auth/pages/AdminLogin";
import AddressPage from "@/features/user-side/account/address/pages/AddressPage";
import publicRoutes from "./routes/public.routes";
import accountRoutes from "./routes/account.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";

export const router = createBrowserRouter([
  
  publicRoutes,
  accountRoutes,
  adminRoutes,
  ...authRoutes,
  
  
  
  
  
  // {
  //   path: "/",
  //   element: <MainLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <HomePage />,
  //     },
  //     {
  //       path: "profile",
  //       element: (
  //         <ProtectedRoute>
  //           <ProfilePage />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: "profile/address",
  //       element: (
  //         <ProtectedRoute>
  //           <AddressPage />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },

  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPasswordPage />,
  // },
  // {
  //   path: "/verify-otp",
  //   element: <VerifyOtpPage />,
  // },
  // {
  //   path: "/reset-password",
  //   element: <ResetpassordPage />,
  // },

  // //Admin routes
  // {
  //   path: "/admin",
  //   element: (
  //     <AdminRoute>
  //       <AdminLayout />
  //     </AdminRoute>
  //   ),
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <AdminDashboard />,
  //     },
  //     {
  //       path: "users",
  //       element: <UserManagementPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/admin/login",
  //   element: <AdminLogin />,
  // },
]);
