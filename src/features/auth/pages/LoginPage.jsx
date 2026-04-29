import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import React from 'react'
import LoginForm from '../components/LoginForm'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import { toast } from 'sonner'


const LoginPage = () => {
	const navigate= useNavigate()
	const login= useAuthStore((state)=> state.login)

	const handleLogin= async(data)=>{
		console.log("Login data:", data)
		try{
			console.log("Trying to fetch....")
			await login(data)
			toast.success("Login successful")
			navigate("/reset-password")
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
			<p className='text-sm text-muted-foreground'>Please enter your details to access your account.</p>
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

				<p className='text-center font-light text-xs'>New to GeekCart? {" "}
					<Link to="/register" className='text-primary cursor-pointer font-bold'>Create an account</Link>
				</p>
		</CardContent>
	  </Card>
	</div>
  )
}

export default LoginPage
