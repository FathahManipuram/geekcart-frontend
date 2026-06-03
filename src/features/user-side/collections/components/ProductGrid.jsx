import { useWishlist } from "../../wishlist/hooks/useWishlist";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
console.log("productgrid", products)

const { isWishlisted, handleWishlist } = useWishlist();
  if (!products.length) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-3xl
          border
          bg-white
        "
      >
        <p
          className="
            text-sm
            text-neutral-500
          "
        >
          No products found
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4

        md:grid-cols-3

        xl:grid-cols-4
      "
    >
      {products.map((product) => {
 const firstVariant = product.variants?.[0];
 return (
<ProductCard
   key={product._id}
   product={product}
   isWishlisted={isWishlisted(firstVariant?._id)}
   onWishlist={handleWishlist}
   productId={product._id}
   variantId={firstVariant?._id}
 />
 )
      }
         
      )}
    </div>
  );
};

export default ProductGrid;
