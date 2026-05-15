import React, { useEffect} from 'react'
import CategoryForm from '../components/CategoryForm'
import PageHeader from '../components/PageHeader'
import CategoryStats from '../components/CategoryStats'
import { useCategoryStore } from '../store/category.store'
import CategoryTable from '../components/CategoryTable'
import Pagination from '@/shared/components/Pagination'


const CategoyManagementPage = () => {

	const {fetchCategories, categories, loading, pagination, changePage, activeCategories, totalCategories}= useCategoryStore()
	useEffect(()=>{
		fetchCategories()
	}, [fetchCategories])

  return (
	<div className='space-y-8'>
		<PageHeader/>
		<CategoryStats totalCategories={totalCategories} activeCategories={activeCategories}/>
		<CategoryTable categories={categories} loading={loading} currentPage={pagination?.currentPage || 1} perPage={pagination?.perPage || 5}/>
		<Pagination currentPage={pagination?.currentPage || 1} totalPages={pagination?.totalPages || 1} onPageChange={changePage}/>
	</div>
  )
}

export default CategoyManagementPage
