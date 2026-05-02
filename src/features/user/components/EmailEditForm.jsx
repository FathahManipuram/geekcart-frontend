import { emailChangeValidation } from '@/features/auth/validations/auth.validation'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { changeEmailApi } from '../api/user.api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const EmailEditForm = ({user}) => {

const navigate= useNavigate()
	const {register, handleSubmit, reset, formState:{errors,}}=useForm({
		resolver: yupResolver(emailChangeValidation)
	})

		useEffect(()=>{
			if(user){
				reset({
				email: user?.email || ""
			})
			}
		},[user, reset])

		const onSubmit= async (data)=>{
			try{
				console.log("data", data)
				const res= await changeEmailApi(data)
				toast.success(res.message)
				navigate("/verify-otp", {state: {email: data.email}})
			}catch(err){
				console.log(err)
			}
		}

  return (
	<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 text-sm'>
		<div>
			<Label >EMAIL ADDRESS</Label>
			<Input {...register("email")} type="text" className="h-8"/>
			<p className='text-xs text-red-500'>{errors?.email?.message}</p>
		</div>
		 <Button type="submit" className="w-full mt-6">Change Email</Button>
	</form>
  )
}

export default EmailEditForm
