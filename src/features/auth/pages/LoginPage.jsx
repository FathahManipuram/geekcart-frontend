import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import React from 'react'
import LoginForm from '../components/LoginForm'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '../store/auth.store'

const LoginPage = () => {
	const navigate= useNavigate()
	const login= useAuthStore((state)=> state.login)
	const loginWithGoogle= useAuthStore((state)=> state.loginWithGoogle)

	const handleLogin= async(data)=>{
		console.log("Login data:", data)
		try{
			const res= await login(data)
			const {user}= res.data
			console.log("loginUser: ",user)
			toast.success("Login successful")
			if(user.role=== "admin"){
				navigate("/admin/login")
			}else{
				navigate("/")
			}
			
		} catch(err){
			toast.error(err.response?.data?.message || "Login failed")
		
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

				<GoogleLogin shape='circle' onSuccess={async(credentialResponse)=>{
					try{
						console.log("googllogCredential",credentialResponse)
						const token= credentialResponse.credential;
						console.log("TOKen", token)
						await loginWithGoogle(token)
						toast.success("Google login successful")
						navigate("/")
					} catch(err){
						console.log(err)
						toast.error(err?.response?.data?.message|| "Google login failed")
					}
				}}
				onError={()=>{
					console.log("Google login failed")
				}} className='w-full border rounded-lg py-2 flex items-center justify-center gap-2 mb-8'
				/>


				<p className='text-center font-light text-xs mt-8'>New to GeekCart? {" "}
					<Link to="/register" className='text-primary cursor-pointer font-bold'>Create an account</Link>
				</p>
		</CardContent>
	  </Card>
	</div>
  )
}

export default LoginPage
