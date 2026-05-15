import React, { useEffect } from 'react'
import CategoryForm from '../components/CategoryForm'
import PageHeader from '../components/PageHeader'
import CategoryStats from '../components/CategoryStats'
import { useCategoryStore } from '../store/category.store'
import CategoryTable from '../components/CategoryTable'


const CategoyManagementPage = () => {
	const {fetchCategories, categories, loading}= useCategoryStore()
	useEffect(()=>{
		fetchCategories({
			page: 1,
			limit :5,
			search:"",
			status: "",
		})
	}, [fetchCategories])

  return (
	<div className='space-y-8'>
		<PageHeader/>
		<CategoryStats/>
		<CategoryTable categories={categories} loading={loading}/>
	</div>
  )
}

export default CategoyManagementPage
