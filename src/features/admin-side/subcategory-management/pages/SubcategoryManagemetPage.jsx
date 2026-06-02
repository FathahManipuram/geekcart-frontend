import React, { useEffect } from 'react'
import SubcategoryHeader from '../components/SubcategoryHeader'
import { useSubcategoryStore } from '../store/subcategory.store'
import SubcategoryTable from '../components/SubcategoryTable'
import SubcategoryStats from '../components/SubcategoryStats'
import Pagination from '@/shared/components/Pagination'
import SubcategorySearchBar from '../components/SubcategorySearchBar'

const SubcategoryManagemetPage = () => {
	const {fetchSubcategories, subcategories, loading, totalSubcategories, activeSubcategories, totalCategories, pagination, changePage,} = useSubcategoryStore()

	useEffect(()=>{
		fetchSubcategories()
	}, [fetchSubcategories])

  return (
	<div className='space-y-8'>
	<SubcategoryHeader/>
	{/* <SubcategorySearchBar/> */}
	<SubcategoryStats totalSubcategories={totalSubcategories} activeSubcategories={activeSubcategories} totalCategories={totalCategories}/>
	<SubcategoryTable subcategories={subcategories} loading={loading}/>
	<Pagination 
	currentPage={pagination?.currentPage ||1} 
	totalPages= {pagination?.totalPages||1} 
	onPageChange={changePage}/>
	
	</div>
  )
}

export default SubcategoryManagemetPage
