import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../api/auth.api";
import { toast } from "sonner";
import { OTP_TYPES } from "@/shared/constants/otpTypes";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      const res = await forgotPasswordApi(data);
      toast.success(res.message || "OTP send successfully");
      navigate("/verify-otp", {
        state: { email: data.email, type: OTP_TYPES.PASSWORD_RESET },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something wentt wrong");
    }
  };
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card className="w-105 rounded-none p-8 shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-extrabold">
            Forgot Password?
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Set a new password to get back into your account. Enter your Email
            to continue.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <ForgotPasswordForm onSubmit={handleSubmit} />
        </CardContent>

        <div className="item-center flex justify-around text-xs">
          <Link to="/login" className="font-bold hover:underline">
            Login
          </Link>
          <Link to="/register" className="font-bold hover:underline">
            Signup
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
