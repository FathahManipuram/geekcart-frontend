import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { emailChangeValidation } from "../validations/user.validation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { OTP_TYPES } from "@/shared/constants/otpTypes";

const EmailEditForm = ({ user }) => {
  const changeEmail = useAuthStore((state) => state.changeEmail);
  const navigate = useNavigate();
  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailChangeValidation),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user?.email || "",
      });
      setFocus("email");
    }
  }, [user, reset, setFocus]);

  const onSubmit = async (data) => {
    
    const email = data.email.trim().toLowerCase();
    if (email === user?.email) {
      toast.info("Please enter a different email");
      return;
    }
    try {
      const res = await changeEmail(email);
      toast.success(res.message || "OTP sent to new email");
      navigate("/verify-otp", {
        state: { email, type: OTP_TYPES.EMAIL_CHANGE },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Change Email failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 text-sm"
    >
      <div>
        <Label>EMAIL ADDRESS</Label>
        <Input {...register("email")} type="email" className="h-8" />
        <p className="text-xs text-red-500">{errors?.email?.message}</p>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full mt-6 cursor-pointer">
        {isSubmitting ? "Sendinding..." : "Change Email"}
      </Button>
    </form>
  );
};

export default EmailEditForm;
