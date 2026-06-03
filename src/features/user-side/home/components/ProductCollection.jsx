import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useWishlist } from "../../wishlist/hooks/useWishlist";

const ProductCollection = ({
  title = "Featured Products",
  showViewAll = true,
  products,
}) => {
  const navigate = useNavigate();

  const { isWishlisted, handleWishlist } = useWishlist();

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12 bg-[#f6f3ee]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 md:text-4xl">
            {title}
          </h2>

          <div className="mt-3 h-0.75 w-16 bg-neutral-300" />
        </div>

        {showViewAll && (
          <button
            onClick={() => navigate("/collections")}
            className="hidden items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800 md:flex"
          >
            View All Products →
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
        {products.map((product) => {
          const variantId = product.variantId?._id || product.variantId;

          return (
            <ProductCard
              key={product._id}
              image={product.coverImage || product.image}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              slug={product.slug}
              isActive={product.isActive}
              isWishlisted={isWishlisted(variantId)}
              onWishlist={handleWishlist}
              productId={product._id}
              variantId={variantId}
            />
          );
        })}
      </div>

      {showViewAll && (
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => navigate("/collections")}
            className="text-sm font-semibold text-amber-700"
          >
            View All Products →
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCollection;
