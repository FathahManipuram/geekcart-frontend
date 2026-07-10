import { Label } from "@/shared/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../validations/auth.validation";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const ResetPasswordForm = ({ onSubmit }) => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <Label>NEW PASSWORD</Label>
        <div className="relative">
          <Input
            type={show ? "password" : "text"}
            placeholder="........"
            {...register("password")}
          />
          <button
            onClick={() => setShow(!show)}
            className="text-muted-foreground absolute top-2 right-2 translate-y-1/2"
          >
            {show ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label>CONFIRM PASSWORD</Label>
        <Input
          type={show ? "password" : "text"}
          placeholder="........"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Password updating..." : "Update Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
