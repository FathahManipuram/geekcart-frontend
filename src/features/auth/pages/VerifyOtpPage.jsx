import React, { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp'
import { Card, CardTitle, CardHeader, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
const VerifyOtpPage = () => {
	const[otp, setOtp]= useState("")
	const [time, setTime]= useState(30)

	useEffect(()=>{
		if(time===0) return
		const timer= setInterval(()=>{
		setTime((prev)=> prev-1)
	},1000)

	return ()=> clearInterval(timer)
	}, [time])

	const handleVerify=()=>{
		console.log("OTP: ",otp)
	}

	const handleResend= ()=>{
		setTime(30)
		console.log("Resend OTP")
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

			<Button onClick={handleVerify} className="w-full">
				Verify-OTP
				
			</Button>
			<button onClick={handleResend} disabled={time >0}>Resend Code</button>
		</CardContent>
	  </Card>
	</div>
  )
}

export default VerifyOtpPage
