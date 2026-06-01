import CollectionsPage from "@/features/user-side/collections/pages/CollectionsPage";
import HomePage from "@/features/user-side/home/pages/HomePage";
import ProductDetails from "@/features/user-side/products/components/ProductDetails";
import ProductShowPage from "@/features/user-side/products/pages/ProductShowPage";
import MainLayout from "@/shared/layout/MainLayout";


const publicRoutes = {
  path: "/",
  element: <MainLayout />,

  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "/products/:slug",
      element: <ProductShowPage />,
    },
    {
      path: "/products/:id",
      element: <ProductShowPage />,
    },
    {
      path: "/collections",
      element: <CollectionsPage />,
    },
  ],
};

export default publicRoutes