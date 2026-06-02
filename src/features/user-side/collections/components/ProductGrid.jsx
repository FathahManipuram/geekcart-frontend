import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  /**
   * Empty
   */
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
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
