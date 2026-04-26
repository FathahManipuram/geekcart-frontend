import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../validations/auth.validation'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'

const RegisterForm = ({onSubmit}) => {
	const {register, handleSubmit, formState: {errors, isSubmitting}}= useForm({
		resolver: yupResolver(registerSchema),
	})
  return (
	<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
		<div className="space-y-1">
			<Label>FULL NAME</Label>
			<Input placeholder="Abdul fathah" {...register("name")}/>
			{errors?.fullName && (
				<p className='text-red-500 text-sm'>{errors.fullName.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<Label>EMAIL</Label>
			<Input placeholder="abdulfathah@gmail.com" {...register("email")}/>
			{errors?.email && (
				<p className='text-red-500 text-sm'>{errors.email.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<Label>PASSWORD</Label>
			<Input placeholder="........" {...register("password")}/>
			{errors?.password && (
				<p className='text-red-500 text-sm'>{errors.password.message}</p>
			)}
		</div>

		<div className='space-y-1'>
			<Label>CONFIRM PASSWORD</Label>
			<Input placeholder="........" {...register("confirmPassword")} />
			{errors?.confirmPassword && (
				<p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
			)}
		</div>

		<Button type="submit" className="w-full">
			{isSubmitting ? "Creating account..." : "Create Account"}</Button>

	</form>
  )
}

export default RegisterForm
