import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema } from '../validations/auth.validation'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'


const ForgotPasswordForm = ({onSubmit}) => {
	const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm({
		resolver: yupResolver(forgotPasswordSchema)
	})
  return (
<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
	<div>
		<Label>ENTER YOUR EMAIL</Label>
	<Input placeholder="name@example.com" {...register("email")}/>
	{errors?.email && (
		<p className='text-red-500 text-xs'>{errors.email.message}</p>
	)}
	</div>

	<Button type="submit" className="w-full">{isSubmitting ? "Sending" : "Next →"}</Button>
</form>
  )
}

export default ForgotPasswordForm
