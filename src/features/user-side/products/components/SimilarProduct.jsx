import React from 'react'
import ProductCard from '../../home/components/ProductCard'
import ProductGrid from '../../collections/components/ProductGrid'
import { useUserProductStore } from '../store/product.store'


const SimilarProduct = () => {
 const similarProducts= useUserProductStore((state)=> state.similarProducts)
 	console.log("similarProduct: ", similarProducts);

	return (
    <section className="px-10">
      <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>

      <ProductGrid products={similarProducts} />
    </section>
  );

}

export default SimilarProduct
