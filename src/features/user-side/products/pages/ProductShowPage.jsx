import ProductDetails from "../components/ProductDetails";
import SimilarProduct from "../components/SimilarProduct";
import { useUserProductStore } from "../store/product.store";

const ProductShowPage = () => {
  const productDetails = useUserProductStore((state) => state.productDetails);

  return (
    <>
      <ProductDetails />
      <SimilarProduct product={productDetails} />
    </>
  );
};

export default ProductShowPage;
