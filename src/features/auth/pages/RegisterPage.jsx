import { CardHeader } from '@/shared/components/ui/card'
import { Card } from '@/shared/components/ui/card'
import { CardTitle } from '@/shared/components/ui/card'
import { CardContent } from '@/shared/components/ui/card'
import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { FcGoogle } from "react-icons/fc"
import { Link } from 'react-router-dom'

const RegisterPage = () => {
	const handleRegister= async(data)=>{
		console.log("Register Data: ",data)
	}
  return (
	  <div className='min-h-screen flex items-center justify-center bg-background'>
		<Card className="w-120 shadow-lg rounded-none p-8">
			<CardHeader>
				<CardTitle className="text-2xl font-extrabold">
					Create Account
				</CardTitle>
				<p className='text-sm text-muted-foreground'>Enter your details to begin your bespoke journey.</p>
			</CardHeader>

			<CardContent>
				<RegisterForm onSubmit={handleRegister}/>

<div className="flex items-center gap-4 my-6">
  <div className="flex-1 h-px bg-border/60" />
  
  <span className="text-xs tracking-widest text-muted-foreground uppercase">
    Or continue with
  </span>
  
  <div className="flex-1 h-px bg-border/60" />
</div>

				<button className='w-full border rounded-lg py-2 flex items-center justify-center gap-2 mb-8'> <FcGoogle size={20}/> <span className=''>Continue with Google</span></button>

				<p className='text-center font-medium text-xs'>Already Have an account? {" "}
					<Link to="/login" className='text-primary cursor-pointer font-bold'>Login</Link>
				</p>
			</CardContent>
		</Card>
	  </div>
  )
}

export default RegisterPage
