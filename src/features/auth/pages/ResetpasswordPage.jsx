import React, { useEffect } from 'react'
import ResetPasswordForm from '../components/ResetPasswordForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPasswordApi } from '../api/auth.api'
import { toast } from 'sonner'

const ResetpasswordPage = () => {
	const location = useLocation()
	const navigate= useNavigate()
const email= location.state.email;
	useEffect(()=>{
		if(!email){
			toast.error("Session expired. Please try again")
			navigate("/forgot-password")
		}
	}, [email, navigate])

	

	const handleSubmit= async(data)=>{
		try{
			console.log("Resetdata:", data)
			const res=await resetPasswordApi({
				email,
				newPassword: data.password,
			})
console.log("resetPassRESPO: ", res)
			toast.success("Password reset successfully");
			navigate("/login")
		} catch(err){
			toast.error(err.response?.data?.message || "Reset failed")
		}
	}
  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
		<Card className="w-110 md:p-8 rounded-none shadow-lg ">
			<CardHeader className="space-y-2">
				<CardTitle className="text-2xl md:text-3xl font-extrabold">
					Create New Password
				</CardTitle>
				<p className='text-sm text-muted-foreground'>Choose a strong password for your account.</p>
			</CardHeader>
			<CardContent>
				<ResetPasswordForm onSubmit={handleSubmit}/>
			</CardContent>
				<div className='flex item-center justify-around text-xs'>
					<Link to="/login" className='font-bold hover:underline'>Login</Link>
					<Link to="/register" className='font-bold hover:underline'>Signup</Link>
				</div>
		</Card>
	  
	</div>
  )
}

export default ResetpasswordPage
