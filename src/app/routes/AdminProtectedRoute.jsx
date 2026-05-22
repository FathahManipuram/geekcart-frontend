import { useAdminAuthStore } from '@/features/auth/store/auth.admin.store'
import Loader from '@/shared/components/Loader'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({children}) => {
	const {adminUser}= useAdminAuthStore()

	if(!adminUser) return <Navigate to="/admin/login" replace/>

	if(adminUser.role !== "admin"){
		return <Navigate to="/" replace/>
	}
	
  return children
}

export default AdminProtectedRoute;
