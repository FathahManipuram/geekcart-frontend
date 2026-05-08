import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import React from 'react'

import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'
import LoginForm from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/features/auth/store/auth.store'



const AdminLogin = () => {
	const navigate= useNavigate()
	const login= useAuthStore((state)=> state.login)

	const handleLogin= async(data)=>{
		console.log("Login data:", data)
		try{
			const res= await login(data)
			const user= res.data
			console.log("REs", user)
			toast.success("Login successful")
			if(user.role=== "admin"){
				console.login ("admin")
				return navigate("/admin/dashboard")
			}

			navigate("/")
		} catch(err){
			console.log("error:", err)
		
		}
		
	}
  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
	  <Card className="w-120 shadow-lg rounded-none p-8">
		<CardHeader>
			<CardTitle className="text-3xl font-extrabold">
				Welcome Back
			</CardTitle>
			<p className='text-sm text-muted-foreground'>Please authenticate to access the dashboard.</p>
		</CardHeader>
		<CardContent>
			<LoginForm onSubmit={handleLogin}/>
			<div className="flex items-center gap-4 my-6">
  <div className="flex-1 h-px bg-border/60" />
  
  <span className="text-xs tracking-widest text-muted-foreground uppercase">
    Or continue with
  </span>
  
  <div className="flex-1 h-px bg-border/60" />
</div>

				<button className='w-full border rounded-lg py-2 flex items-center justify-center gap-2 mb-8'> <FcGoogle size={20}/> <span className=''>Continue with Google</span></button>
		</CardContent>
	  </Card>
	</div>
  )
}

export default AdminLogin
