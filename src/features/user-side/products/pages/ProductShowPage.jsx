import ProductDetails from "../components/ProductDetails";
import SimilarProduct from "../components/SimilarProduct";
import { useUserProductStore } from "../store/product.store";

const ProductShowPage = () => {
  const productDetails = useUserProductStore((state) => state.productDetails);
  const error= useUserProductStore((state)=> state.error)

  return (
    <>
      <ProductDetails />
      {error !== "Product not found" && (
      <SimilarProduct product={productDetails} />
      )}
    </>
  );
};

export default ProductShowPage;
