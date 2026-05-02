import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { loginSchema } from '@/features/auth/validations/auth.validation'
import { Label } from '@/shared/components/ui/label'


const LoginForm = ({onSubmit}) => {
const [show, setShow]=useState(true)

	const {
		register, handleSubmit, formState:{errors, isSubmitting,}}= useForm({resolver: yupResolver(loginSchema)})

  return (
	<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'> 
		<div className='space-y-1'>
			<Label>ADMINISTRATOR IDENTITY</Label>
			<Input type="email" placeholder="Enter your email"
			{...register("email")}/>
			{errors.email && (
				<p className='text-red-500 text-sm'>{errors.email.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<div className='flex justify-between'>
			<Label>SECURITY KEY</Label>
			<Link to="/forgot-password" className='text-[10px] font-bold text-primary cursor-pointer'>FORGOT ACCESS?</Link>
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
		<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in...": "Login to Dashboard"}</Button>
	</form>
  )
}

export default LoginForm
