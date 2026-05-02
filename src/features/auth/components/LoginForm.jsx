import React, { useState } from 'react'
// import { useAuthStore } from '../store/auth.store'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../validations/auth.validation'
import {yupResolver} from '@hookform/resolvers/yup'
// import { loginApi } from '../api/auth.api'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Link } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'

const LoginForm = ({onSubmit}) => {
const [show, setShow]=useState(true)

	const {
		register, handleSubmit, formState:{errors, isSubmitting,}
	}= useForm({resolver: yupResolver(loginSchema)})

  return (
	<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'> 
		<div className='space-y-1'>
			<Label>EMAIL ADDRESS</Label>
			<Input type="email" placeholder="Enter your email"
			{...register("email")}/>
			{errors.email && (
				<p className='text-red-500 text-sm'>{errors.email.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<div className='flex justify-between'>
			<Label>PASSWORD</Label>
			<Link to="/forgot-password" className='text-[10px] font-bold text-primary cursor-pointer'>FORGOT PASSWORD?</Link>
			</div>
			<div className='relative'>
				<Input type= {show? "password": "text"} placeholder="Enter your password"
			{...register("password")}/>
				<button type='button' onClick={()=> setShow(!show)} className='absolute translate-y-1/2 right-2 top-1 text-muted-foreground'>{show ? <EyeClosed size={20}/> :<Eye size={20}/>}</button>
			</div>
			{errors.password && (
				<p className='text-red-500 text-sm'>{errors.password.message}</p>
			)}
		</div>
		<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in...": "Login"}</Button>
	</form>
  )
}

export default LoginForm
