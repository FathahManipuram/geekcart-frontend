import { useAuthStore } from '@/features/auth/store/auth.store'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
	const user= useAuthStore((state)=> state.user)

	if(!user) return <Navigate to="login"/>
  
  return children
}

export default ProtectedRoute
