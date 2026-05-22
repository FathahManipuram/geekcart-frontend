import { useAuthStore } from '@/features/auth/store/auth.store'
import Loader from '@/shared/components/Loader'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
	const user= useAuthStore((state)=> state.user)


	if(!user) return <Navigate to="/login" replace/>
  
  return children
}

export default ProtectedRoute
