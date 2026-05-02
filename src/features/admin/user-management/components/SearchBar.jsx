import React from 'react'
import { useAdminStore } from '../../auth/admin.store'
import { Input } from '@/shared/components/ui/input'

const SearchBar = () => {
	const {setSearch,  fetchUsers}= useAdminStore()

	const handleChange= (e)=>{
		setSearch(e.target.value);

		fetchUsers()
	}
  return (
	<Input
	placeholder="Search by name or email"
	onChange={handleChange}
    className="border p-2 w-full"
	/>
  )
}

export default SearchBar
