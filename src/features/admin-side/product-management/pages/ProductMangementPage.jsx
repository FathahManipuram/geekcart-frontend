import React, { useEffect } from 'react'
import ProductOverviewHeader from '../components/overview/ProductOverviewHeader'
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import StatsCard from '@/shared/components/StatsCard';
import ProductStatsCards from '../components/overview/ProductStatsCards';
import ProductFilters from '../components/overview/ProductFilter';
import { useProductStore } from '../store/product.store';
import ProductTable from '../components/overview/ProductTable';

const ProductMangementPage = () => {
	const {fetchProducts, loading, products}= useProductStore() 
  
  useEffect(()=>{
    fetchProducts()
  }, [fetchProducts])
  return (
    <div className='space-y-6'>
    <ProductOverviewHeader />
	  <ProductStatsCards/>
	  <ProductFilters/>
    <ProductTable products={products} loading={loading}/>
    <Button onClick={()=> fetchProducts()}>Click</Button>
      
    </div>
  );
}

export default ProductMangementPage
