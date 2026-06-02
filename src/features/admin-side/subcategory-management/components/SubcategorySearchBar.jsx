import React, { useEffect, useState } from 'react'
import { useSubcategoryStore } from '../store/subcategory.store'
import useDebounce from '@/shared/hooks/useDebounce'
import SearchInput from '@/shared/components/SearchInput'

const SubcategorySearchBar = () => {
	const {queryParams, fetchSubcategories}= useSubcategoryStore()
	const [searchTerm, setSearchTerm]= useState(queryParams.search || "")
	const debouncedSearch= useDebounce(searchTerm, 500)


useEffect(()=> setSearchTerm(queryParams.search || ""),[queryParams.search])
useEffect(() => {
  fetchSubcategories({
    ...queryParams,
    page: 1,
    search: debouncedSearch,
  });
}, [
  debouncedSearch,
  queryParams.status,
  queryParams.category,
  fetchSubcategories,
  queryParams.search,
]);
	const handleClear=()=>{
		setSearchTerm("")
	}
  return (
	<SearchInput
	value={searchTerm}
	onChange={setSearchTerm}
	onClear={handleClear}
	placeholder='Search subcategories'
	/>
  )
}

export default SubcategorySearchBar;
