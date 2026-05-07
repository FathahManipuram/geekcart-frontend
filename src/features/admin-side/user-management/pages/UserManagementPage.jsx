import React, { useEffect } from 'react'
import { useDashboardStore } from '../../dashboard/store/dashboard.store';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';


const UserManagementPage = () => {
	const {fetchUsers}= useDashboardStore()

	useEffect(()=>{
		fetchUsers();
	},[])
  return (
	<div className='p-6 space-y-6'>
		<h1 className='text-2xl font-bold'>User Management</h1>
	  
	  <SearchBar/>

	  <UserTable/>
	</div>
  )
}

export default UserManagementPage
