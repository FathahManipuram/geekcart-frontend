import AdminLayout from "@/shared/layout/admin-sideLayout/AdminLayout";
import UserManagementPage from "@/features/admin-side/user-management/pages/UserManagementPage";
import UserDetailsPage from "@/features/admin-side/user-management/pages/UserDetailsPage";
import { Navigate } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CategoyManagementPage from "@/features/admin-side/category-management/pages/CategoyManagementPage";
import SubcategoryManagemetPage from "@/features/admin-side/subcategory-management/pages/SubcategoryManagemetPage";
import ProductMangementPage from "@/features/admin-side/product-management/pages/ProductMangementPage";
import AddProductPage from "@/features/admin-side/product-management/pages/AddProductPage";
import ProductDetailsPage from "@/features/admin-side/product-management/pages/ProductDetailsPage";
import EditProductPage from "@/features/admin-side/product-management/pages/EditProductPage";
import AdminDashboardPage from "@/features/admin-side/dashboard/pages/AdminDashboardPage";
import OrderManagementPage from "@/features/admin-side/order-management/pages/OrderManagementPage";
import OrderDetailsPage from "@/features/user-side/order/pages/OrderDetailsPage";
import AdminOrderDetailsPage from "@/features/admin-side/order-management/pages/AdminOrderDetailsPage";
import ReturnManagementPage from "@/features/admin-side/return-management/pages/ReturnManagementPage";
import ReturnDetailsPage from "@/features/admin-side/return-management/pages/ReturnDetailsPage";

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
      element: <AdminDashboardPage />,
    },
    {
      path: "user-management",
      element: <UserManagementPage />,
    },
    {
      path: "user-management/users/:userId",
      element: <UserDetailsPage />,
    },
    {
      path: "categories",
      element: <CategoyManagementPage />,
    },
    {
      path: "subcategories",
      element: <SubcategoryManagemetPage />,
    },
    {
      path: "products",
      element: <ProductMangementPage />,
    },
    {
      path: "products/create",
      element: <AddProductPage />,
    },
    {
      path: "products/:slug",
      element: <ProductDetailsPage />,
    },
    {
      path: "products/:productId/edit",
      element: <EditProductPage />,
    },

    {
      path: "orders",
      element: <OrderManagementPage />,
    },
    {
      path: "orders/:orderId",
      element: <AdminOrderDetailsPage />,
    },
    {
      path: "returns",
      element: <ReturnManagementPage />,
    },
    {
      path: "returns/:returnId",
      element: <ReturnDetailsPage/>,
    },
  ],
};

export default adminRoutes;