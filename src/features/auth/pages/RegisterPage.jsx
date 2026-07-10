import { CardHeader } from '@/shared/components/ui/card'
import { Card } from '@/shared/components/ui/card'
import { CardTitle } from '@/shared/components/ui/card'
import { CardContent } from '@/shared/components/ui/card'
import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/auth.api'
import { toast } from 'sonner'
import { OTP_TYPES } from '@/shared/constants/otpTypes'
import { useAuthStore } from '../store/auth.store'
import { GoogleLogin } from '@react-oauth/google'


const RegisterPage = () => {
	const navigate= useNavigate()
	const loginWithGoogle= useAuthStore((state)=> state.loginWithGoogle)
	
	const handleRegister= async(data)=>{
		try{
		const res= await registerApi(data)
		toast.success(res.message)
		navigate("/verify-otp", {state: {
			email: data.email, 
			type: OTP_TYPES.EMAIL_VERIFY,
			}})
		
		}catch(err){
			toast.error(err.response?.data?.message || "Registration failed")
		}
	}
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-120 shadow-lg rounded-none p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">
            Create Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your details to begin your bespoke journey.
          </p>
        </CardHeader>

        <CardContent>
          <RegisterForm onSubmit={handleRegister} />

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border/60" />

            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Or continue with
            </span>

            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="flex justify-center w-full mb-8">
            <GoogleLogin
              shape="circle"
              onSuccess={async (credentialResponse) => {
                try {
                  const token = credentialResponse.credential;
                  await loginWithGoogle(token);
                  toast.success("Google login successful");
                  navigate("/");
                } catch (err) {
                  toast.error("Google login failed");
                }
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
              className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 mb-8"
            />
          </div>

          <p className="text-center font-medium text-xs mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary cursor-pointer font-bold">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage
