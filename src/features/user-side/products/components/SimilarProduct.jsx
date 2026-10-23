import React from "react";
import ProductGrid from "../../collections/components/ProductGrid";
import { useUserProductStore } from "../store/product.store";

const SimilarProduct = () => {
  const similarProducts = useUserProductStore((state) => state.similarProducts);

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-4 md:py-12 lg:px-12 mb-4">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
          You May Also Like
        </h2>
      </div>

      <ProductGrid products={similarProducts} />
    </section>
  );
};

export default SimilarProduct;
