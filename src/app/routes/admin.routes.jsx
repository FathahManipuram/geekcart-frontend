import AdminLayout from "@/shared/layout/admin-sideLayout/AdminLayout";
import AdminDashboard from "@/features/admin-side/dashboard/pages/AdminDashboard";
import UserManagementPage from "@/features/admin-side/user-management/pages/UserManagementPage";
import UserDetailsPage from "@/features/admin-side/user-management/pages/UserDetailsPage";
import { Navigate } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";



const adminRoutes = {
  path: "/admin",
  element: (
   <AdminProtectedRoute>
      <AdminLayout />
   </AdminProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "user-management",
      element: <UserManagementPage />,
    },
    {
      path: "user-management/users/:userId",
      element: <UserDetailsPage />,
    },
  ],
};

export default adminRoutes;