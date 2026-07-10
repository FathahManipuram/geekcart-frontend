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
import AdminOrderDetailsPage from "@/features/admin-side/order-management/pages/AdminOrderDetailsPage";
import ReturnManagementPage from "@/features/admin-side/return-management/pages/ReturnManagementPage";
import ReturnDetailsPage from "@/features/admin-side/return-management/pages/ReturnDetailsPage";
import CreateCouponPage from "@/features/admin-side/coupon-management/pages/CreateCouponPage";
import CouponManagementPage from "@/features/admin-side/coupon-management/pages/CouponManagemetPage";
import UpdateCouponPage from "@/features/admin-side/coupon-management/pages/UpdateCouponPage";
import OfferManagementPage from "@/features/admin-side/offer-management/pages/OfferManagementPage";
import CreateOfferPage from "@/features/admin-side/offer-management/pages/CreateOfferPage";
import UpdateOfferPage from "@/features/admin-side/offer-management/pages/UpdateOfferPage";
import SalesReportPage from "@/features/admin-side/sales-report/pages/SalesReportPage";

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
      element: <ReturnDetailsPage />,
    },

    {
      path: "coupons",
      element: <CouponManagementPage />,
    },
    {
      path: "coupons/create",
      element: <CreateCouponPage />,
    },
    {
      path: "coupons/:couponId/update",
      element: <UpdateCouponPage />,
    },

    {
      path: "offers",
      element: <OfferManagementPage />,
    },
    {
      path: "offers/create",
      element: <CreateOfferPage />,
    },

    {
      path: "offers/:offerId/update",
      element: <UpdateOfferPage />,
    },

    {
      path: "sales-report",
      element: <SalesReportPage />,
    },
  ],
};

export default adminRoutes;
