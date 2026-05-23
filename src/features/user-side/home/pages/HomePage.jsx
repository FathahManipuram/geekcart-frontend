import React, { useEffect } from 'react'
import CategoriesSection from '../components/CategoryCollection'
import HomeBanner from '../components/HomeBanner'
import HomeCollections from '../components/CategoryCard'
import { useSubcategoryStore } from '@/features/admin-side/subcategory-management/store/subcategory.store'
import CategoryCollection from '../components/CategoryCollection'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import ProductCollection from '../components/ProductCollection'
import { useProductStore } from '@/features/admin-side/product-management/store/product.store'


const HomePage = () => {
	const fetchSubcategories = useSubcategoryStore(
    (state) => state.fetchSubcategories);
	const subcategories= useSubcategoryStore((state)=> state.subcategories)

	const fetchProducts= useProductStore((state)=> state.fetchProducts)
	const products= useProductStore((state)=> state.products)
	
	useEffect(()=>{
		fetchSubcategories()
		fetchProducts()
	},[])

	console.log("homepage", subcategories)
	console.log("homepagePro", products);

  return (
	<div>
	  <HomeBanner/>
	  <CategoryCollection subcategories={subcategories}/>

	 <ProductCollection products={products}/>
	</div>
  )
}

export default HomePage
