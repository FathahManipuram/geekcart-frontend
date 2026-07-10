import { CardHeader } from "@/shared/components/ui/card";
import { Card } from "@/shared/components/ui/card";
import { CardTitle } from "@/shared/components/ui/card";
import { CardContent } from "@/shared/components/ui/card";
import React from "react";
import RegisterForm from "../components/RegisterForm";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth.api";
import { toast } from "sonner";
import { OTP_TYPES } from "@/shared/constants/otpTypes";
import { useAuthStore } from "../store/auth.store";
import { GoogleLogin } from "@react-oauth/google";

const RegisterPage = () => {
  const navigate = useNavigate();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleRegister = async (data) => {
    try {
      const res = await registerApi(data);
      toast.success(res.message);
      navigate("/verify-otp", {
        state: {
          email: data.email,
          type: OTP_TYPES.EMAIL_VERIFY,
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card className="w-120 rounded-none p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">
            Create Account
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Enter your details to begin your bespoke journey.
          </p>
        </CardHeader>

        <CardContent>
          <RegisterForm onSubmit={handleRegister} />

          <div className="my-6 flex items-center gap-4">
            <div className="bg-border/60 h-px flex-1" />

            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              Or continue with
            </span>

            <div className="bg-border/60 h-px flex-1" />
          </div>

          <div className="mb-8 flex w-full justify-center">
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
              className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg border py-2"
            />
          </div>

          <p className="mt-6 text-center text-xs font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-primary cursor-pointer font-bold">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
