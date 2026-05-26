import React, { useEffect } from 'react'
import HomeBanner from '../components/HomeBanner'
import CategoryCollection from '../components/CategoryCollection'
import ProductCollection from '../components/ProductCollection'
import { useHomeStore } from '../store/home.store'



const HomePage = () => {
	
	const {
    categories,

    newDrops,

    fetchHomeData,
  } = useHomeStore();

  useEffect(() => {
    fetchHomeData();
  }, []);
	


	console.log("homepage", categories)
	console.log("homepagePro", newDrops);

  return (
	<div>
	  <HomeBanner/>
	  <CategoryCollection subcategories={categories}/>

	 <ProductCollection products={newDrops}/>
	</div>
  )
}

export default HomePage
