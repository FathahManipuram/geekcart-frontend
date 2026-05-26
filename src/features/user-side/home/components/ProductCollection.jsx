// src/features/home/components/ProductCollection.jsx

import ProductCard from "./ProductCard";

const ProductCollection = ({
  title = "Featured Products",
  showViewAll = true,
  products
}) => {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-10 bg-[#f6f3ee]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900">
            {title}
          </h2>

          <div className="w-16 h-0.75 bg-neutral-300 mt-3" />
        </div>

        {showViewAll && (
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors">
            View All Products →
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.coverImage}
            name={product.name}
            price={product.price}
            slug={product.slug}
          />
        ))}
      </div>

      {/* Mobile Button */}
      {showViewAll && (
        <div className="flex justify-center mt-8 md:hidden">
          <button className="text-sm font-semibold text-amber-700">
            View All Products →
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCollection;
