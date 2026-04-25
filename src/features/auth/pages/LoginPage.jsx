import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
	const handleLogin= async(data)=>{
		console.log("Login data:", data)
	}
  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
	  <Card>
		<CardHeader>
			<CardTitle className="text-center">
				Welcome Back
			</CardTitle>
		</CardHeader>
		<CardContent>
			<LoginForm onSubmit={handleLogin}/>
		</CardContent>
	  </Card>
	</div>
  )
}

export default LoginPage
