import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { changePasswordApi } from "../api/user.api";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { EyeClosed, Eye } from "lucide-react";
import { toast } from "sonner";
import { changePasswordSchema } from "../validations/user.validation";

const ChangePasswordForm = ({ user }) => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const isGoogleUser = user?.provider === "google";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changePasswordSchema(isGoogleUser)),
  });

  const onSubmit = async (data) => {
    try {
      console.log("changepass:", data);
      await changePasswordApi(data);
      toast.success("Password updated");
      onclose();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {user.provider !== "google" && (
        <div className="space-y-1">
          <div className="flex justify-between">
            <Label>OLD PASSWORD</Label>
          </div>
          <div className="relative">
            <Input
              type={showOld ? "password" : "text"}
              placeholder="Enter your Old password"
              {...register("oldPassword")}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute translate-y-1/2 right-2 top-1 text-muted-foreground"
            >
              {showOld ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">
              {errors.oldPassword?.message}
            </p>
          )}
        </div>
      )}
      <div className="space-y-1">
        <div className="flex justify-between">
          <Label>NEW PASSWORD</Label>
        </div>
        <div className="relative">
          <Input
            type={showNew ? "password" : "text"}
            placeholder="Enter your new password"
            {...register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute translate-y-1/2 right-2 top-1 text-muted-foreground"
          >
            {showNew ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword?.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <Label>CONFIRM PASSWORD</Label>
        </div>
        <div className="relative">
          <Input
            type={showNew ? "password" : "text"}
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
