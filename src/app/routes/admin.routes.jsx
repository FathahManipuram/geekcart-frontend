import AdminLayout from "@/features/admin-side/layout/AdminLayout";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "@/features/admin-side/dashboard/pages/AdminDashboard";



const adminRoutes = {
  path: "admin",
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
  ],
};

export default adminRoutes;