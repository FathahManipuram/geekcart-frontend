import { useAuthStore } from "@/features/auth/store/auth.store"
import { Navigate } from "react-router-dom"

const GuestRoute= ({children})=>{
	const user= useAuthStore((state)=> state.user)

	if(user){
		if(user.role=== "admin"){
			return (
				<Navigate to="/admin/dashboard" replace />
			)
		}

		return (
			<Navigate to="/" replace/>
		)
	}

	return children
}

export default GuestRoute