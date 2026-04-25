import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../validations/auth.validation'
import yupResolver from '@hookform/resolvers/yup'
import { loginApi } from '../api/auth.api'
const LoginForm = () => {
	const {setUser}= useAuthStore()

	const {
		register, handleSubmit, formState:{errors, isSubmitting,}
	}= useForm({resolver: yupResolver(loginSchema)})

	const onSubmit= async(data)=>{
		try{
			const res= await loginApi(data)
			setUser(res.user)
		}catch(err){
			console.error(err)
		}
	}
  return (
	<div>
	  
	</div>
  )
}

export default LoginForm
