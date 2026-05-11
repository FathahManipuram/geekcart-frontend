import { useAuthStore } from '@/features/auth/store/auth.store'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
	const user= useAuthStore((state)=> state.user)

	if(!user) return <Navigate to="/admin/login" replace/>

	if(user.role !== "admin"){
		return <Navigate to="/" replace/>
	}
	
  return children
}

export default AdminRoute
