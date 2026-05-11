import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { OTP_TYPES } from "@/shared/constants/otpTypes";
import { resendOtpApi, verifyOtpApi } from "../api/auth.api";
import { verifyEmailChangeApi } from "@/features/user-side/account/profile/api/user.api";

const OTP_CONFIG = {
  [OTP_TYPES.EMAIL_VERIFY]: {
    title: "Verify Email",
    description: "Enter the code sent to your email.",
    onSuccess: (navigate) => navigate("/login"),
  },
  [OTP_TYPES.PASSWORD_RESET]: {
    title: "Reset Password",
    description: "Enter the OTP to reset your password.",
    onSuccess: (navigate, email) =>
      navigate("/reset-password", { state: { email } }),
  },
  [OTP_TYPES.EMAIL_CHANGE]: {
    title: "Verify New Email",
    description: "Enter the OTP sent to your new email.",
    onSuccess: (navigate) => navigate("/account/profile"),
  },
};

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(30);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location?.state?.email;
  const type = location?.state?.type;
  const config = OTP_CONFIG[type];

  console.log("VerifyOtp page: ", location);
  useEffect(() => {
    if (!email || !type || !config) {
      toast.error("Session expired. Please try again");
      navigate("/forgot-password");
    }
  }, [email, type, navigate, config]);

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleVerify = async () => {
    try {
      if (type === OTP_TYPES.EMAIL_CHANGE) {
        await verifyEmailChangeApi({ email, otp, type });
      } else {
        await verifyOtpApi({ email, otp, type });
      }
      toast.success("OTP verified successfully");
      config.onSuccess(navigate, email);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtpApi({ email, type });
      toast.success("OTP resent successfully");
      setTime(30);
      setOtp("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Resend failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-105 shadow-lg lg:p-8 rounded-none">
        <CardHeader>
          <CardTitle className="font-extrabold text-3xl">
            {config?.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div className="text-sm text-muted-foreground">
            {time > 0 ? `⏱ ${time}s` : "Code expired"}
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="w-full"
          >
            Verify-OTP
          </Button>
          <button
            onClick={handleResend}
            disabled={time > 0}
            className={`${time > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Resend Code
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;
