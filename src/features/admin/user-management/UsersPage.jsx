import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../auth/admin.store'
import { Input } from '@/shared/components/ui/input'

const UsersPage = () => {
	const {fetchUsers, setSearch}= useAdminStore()
	const [input, setInput]= useState("")

	useEffect(()=> {
		const delay= setTimeout(()=>{
			setSearch(input);
			fetchUsers();
		},500)

		return ()=> clearTimeout(delay)
	}, [input])
  return (
	<div>
	  <Input placeholder="Search users..." value={input} onChange={(e)=> setInput(e.target.value)}/>
	</div>
  )
}

export default UsersPage
