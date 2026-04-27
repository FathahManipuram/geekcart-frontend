import React from 'react'
import ResetPasswordForm from '../components/ResetPasswordForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card'
import { Link } from 'react-router-dom'

const ResetpassordPage = () => {
  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
		<Card className="w-110 md:p-8 rounded-none shadow-lg ">
			<CardHeader className="space-y-2">
				<CardTitle className="text-2xl md:text-3xl font-extrabold">
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
