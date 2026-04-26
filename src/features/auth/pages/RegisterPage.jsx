import { CardHeader } from '@/shared/components/ui/card'
import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
	const handleRegister= async(data)=>{
		console.log("Register Data: ",data)
	}
  return (
	  <div className='min-h-screen flex items-center justify-center bg-background'>
		<Card className="w-[420] shadow-lg">
			<CardHeader>
				<CardTitle className="text-center text-2xl">
					Create Account
				</CardTitle>
				<p className='text-center text-sm text-muted-foreground'>Enter your details to begin your bespoke journey.</p>
			</CardHeader>

			<CardContent>
				<RegisterForm onSubmit={handleRegister}/>

				<div className='my-6 text-center text-sm text-muted-foreground'>
					OR CONTINUE WITH
				</div>

				<button className='w-full border rounded-lg py-2 flex items-center justify-center gap-2'><span>G</span></button>
				Continue with Google

				<p>Already Have an account? {" "}
					<span className='text-primary cursor-pointer'>Login</span>
				</p>
			</CardContent>
		</Card>
	  </div>
  )
}

export default RegisterPage
