import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/auth.validation";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

const RegisterForm = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <Label>FULL NAME</Label>
        <Input placeholder="Abdul fathah" {...register("fullName")} />
        {errors?.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>EMAIL ADDRESS</Label>
        <Input placeholder="abdulfathah@gmail.com" {...register("email")} />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>PASSWORD</Label>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            placeholder="........"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="text-muted-foreground absolute top-1 right-2 translate-y-1/2"
          >
            {show ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>CONFIRM PASSWORD</Label>
        <Input
          type={show ? "text" : "password"}
          placeholder="........"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowReferral(!showReferral)}
          className="text-primary text-sm font-medium"
        >
          Have a referral code?
        </button>
      </div>

      {showReferral && (
        <div className="space-y-1">
          <Label>REFERRAL CODE</Label>

          <Input placeholder="GCABDUL4832BCA" {...register("referralCode")} />

          {errors?.referralCode && (
            <p className="text-sm text-red-500">
              {errors.referralCode.message}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
