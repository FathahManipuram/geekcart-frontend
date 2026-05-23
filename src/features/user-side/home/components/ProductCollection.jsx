// src/features/home/components/ProductCollection.jsx

import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Midnight Linen Shirt",
    price: "$129.00",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800",
  },
  {
    id: 2,
    name: "Oxford Classic White",
    price: "$95.00",
    image:
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?q=80&w=800",
  },
  {
    id: 3,
    name: "Terracotta Weaver",
    price: "$110.00",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=800",
  },
  {
    id: 4,
    name: "Sage Oversize Cotton",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800",
  },
  {
    id: 5,
    name: "Urban Denim Jacket",
    price: "$149.00",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800",
  },
  {
    id: 6,
    name: "Minimal Beige Tee",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  },
  {
    id: 7,
    name: "Classic Brown Coat",
    price: "$199.00",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
  },
  {
    id: 8,
    name: "Relaxed Fit Hoodie",
    price: "$99.00",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800",
  },
];

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

          <div className="w-16 h-[3px] bg-neutral-300 mt-3" />
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
            key={product.id}
            image={product.coverImage}
            name={product.name}
            price={product.price}
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
