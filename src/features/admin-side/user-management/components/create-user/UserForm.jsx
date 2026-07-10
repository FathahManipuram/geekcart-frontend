import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useUserManagementStore } from "../../stores/userManagement.store";

const UserForm = ({ initialData = null, onClose, onSubmit, schema }) => {
  const [showPassword, setShowPassword] = useState(false);
  const loading = useUserManagementStore((state) => state.loading);
  const isEditMode = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        role: initialData.role || "user",
        password: "",
        conformPassword: "",
      });
    }
  }, [initialData, reset]);

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
        <Label>SELECT ROLE</Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full rounded-none border-b-2 border-none shadow-none">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="user" className="rounded-none">
                  User
                </SelectItem>
                <SelectItem value="admin" className="rounded-none">
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="space-y-1">
            <Label>INITIAL PASSWORD</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="........"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground absolute top-1 right-2 translate-y-1/2"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>CONFIRM PASSWORD</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="........"
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading || (isEditMode && !Object.keys(dirtyFields).length)}
          className="flex-1 cursor-pointer"
        >
          {loading ? "Saving..." : isEditMode ? "Update User" : "Create User"}
        </Button>

        <Button
          onClick={onClose}
          type="button"
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
