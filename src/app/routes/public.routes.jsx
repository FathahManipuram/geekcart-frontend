import CollectionsPage from "@/features/user-side/collections/pages/CollectionsPage";
import HomePage from "@/features/user-side/home/pages/HomePage";
import ProductDetails from "@/features/user-side/products/components/ProductDetails";
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
      element: <ProductDetails />,
    },
    {
      path: "/collections",
      element: <CollectionsPage/>,
    },
  ],
};

export default publicRoutes