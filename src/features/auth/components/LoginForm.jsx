import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const LoginForm = ({ onSubmit, isAdmin }) => {
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <Label>{isAdmin ? "ADMINISTRATOR IDENTITY" : "EMAIL ADDRESS"}</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <Label>{isAdmin ? "SECURITY KEY" : "PASSWORD"}</Label>
          <Link
            to="/forgot-password"
            className="text-primary cursor-pointer text-[10px] font-bold"
          >
            {isAdmin ? "" : "FORGOT PASSWORD?"}
          </Link>
        </div>
        <div className="relative">
          <Input
            type={show ? "password" : "text"}
            placeholder="Enter your password"
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
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Logging in..."
          : isAdmin
            ? "Login to Dashboard"
            : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
