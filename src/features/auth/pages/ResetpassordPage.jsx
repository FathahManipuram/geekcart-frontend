import React from 'react'
import ResetPasswordForm from '../components/ResetPasswordForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card'
import { Link } from 'react-router-dom'

const ResetpassordPage = () => {
  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
		<Card className="w-105 p-8 rounded-none">
			<CardHeader>
				<CardTitle className="text-3xl font-extrabold">
					Create New Password
				</CardTitle>
				<p className='text-sm text-muted-foreground'>Choose a strong password for your account.</p>
			</CardHeader>
			<CardContent>
				<ResetPasswordForm/>
			</CardContent>
				<div className='flex item-center justify-around text-xs'>
					<Link to="/login" className='font-bold hover:underline'>Login</Link>
					<Link to="/register" className='font-bold hover:underline'>Signup</Link>
				</div>
		</Card>
	  
	</div>
  )
}

export default ResetpassordPage
