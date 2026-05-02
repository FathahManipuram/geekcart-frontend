import React, { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp'
import { Card, CardTitle, CardHeader, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { resendOtpApi, verifyEmailApi } from '../api/auth.api'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom'
import { OTP_TYPES } from '@/shared/constants/otpTypes'
const VerifyOtpPage = () => {
	const[otp, setOtp]= useState("")
	const [time, setTime]= useState(30)
	const navigate= useNavigate()
	const location= useLocation()
	const email= location?.state?.email;

	if(!email){
		toast.error("Session expired. Please register again")
		navigate("/register")
	}

	useEffect(()=>{
		if(time===0) return
		const timer= setInterval(()=>{
		setTime((prev)=> prev-1)
	},1000)

	return ()=> clearInterval(timer)
	}, [time])

	const handleVerify= async()=>{
		console.log("OTP: ",otp)
		try{
			await verifyEmailApi({email, otp})
			toast.success("Email verified successfully")
			navigate("/login")
		}catch(error){
			toast.error(error.response?.data?.message || "Invalid OTP")
		}
	}

	const handleResend= async()=>{
		try{
		console.log("Resend OTP")
		console.log(email)
		await resendOtpApi({email, type: OTP_TYPES.EMAIL_VERIFY})
		toast.success("OTP resent successfully")
		setTime(30)
		}catch(err){
			toast.error(err.response?.data?.message || "Resend failed")
		}
	}

  return (
	<div className='min-h-screen flex items-center justify-center bg-background'>
	  <Card className="w-105 shadow-lg lg:p-8 rounded-none">
		<CardHeader>
			<CardTitle className="font-extrabold text-3xl">
				Verify OTP
			</CardTitle>
			<p className='text-sm text-muted-foreground'>Enter the 6-digit code sent to your email.</p>
		</CardHeader>
		<CardContent className="space-y-5">
			<InputOTP maxLength={6}
			value={otp}
			onChange={setOtp}
			>
			<InputOTPGroup>
			<InputOTPSlot index={0}/>
			<InputOTPSlot index={1}/>
			<InputOTPSlot index={2}/>
			<InputOTPSlot index={3}/>
			<InputOTPSlot index={4}/>
			<InputOTPSlot index={5}/>
			</InputOTPGroup>
			</InputOTP>

			<div className='text-sm text-muted-foreground'>
				{time>0 ? `⏱ ${time}s`: "Code expired"}
			</div>

			<Button onClick={handleVerify} disabled={otp.length !==6} className="w-full">
				Verify-OTP
				
			</Button>
			<button onClick={handleResend} disabled={time >0}>Resend Code</button>
		</CardContent>
	  </Card>
	</div>
  )
}

export default VerifyOtpPage
