import React from 'react'
// import { useAuthStore } from '../store/auth.store'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../validations/auth.validation'
import {yupResolver} from '@hookform/resolvers/yup'
// import { loginApi } from '../api/auth.api'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

const LoginForm = ({onSubmit}) => {
	// {setUser}= useAuthStore()

	const {
		register, handleSubmit, formState:{errors, isSubmitting,}
	}= useForm({resolver: yupResolver(loginSchema)})

  return (
	<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'> 
		<div className='space-y-1'>
			<Label>Email</Label>
			<Input type="email" placeholder="Enter your email" 
			{...register("email")}/>
			{errors.email && (
				<p className='text-redd-500 text-sm'>{errors.email.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<Label>Password</Label>
			<Input type="password" placeholder="Enter your password"
			{...register("password")}/>
			{errors.password && (
				<p className='text-red-500 text-sm'>{errors.password.message}</p>
			)}
			
		</div>
		<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in...": "Login"}</Button>
	</form>
  )
}

export default LoginForm
