import React from "react";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/shared/components/ui/button";

import { Input } from "@/shared/components/ui/input";

import { Label } from "@/shared/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { Card, CardContent } from "@/shared/components/ui/card";

import { createUserSchema } from "../validations/createUser.validation";

import { useUserManagementStore } from "../stores/userManagement.store";

import { toast } from "sonner";

const CreateUserForm = () => {
  const createUser = useUserManagementStore((state) => state.createUser);

  const loading = useUserManagementStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "user",
      isBlocked: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await createUser(data);

      toast.success("User created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT */}

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <Label>ACCOUNT STATUS</Label>

              <p>Active</p>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT */}

        <Card>
          <CardContent className="p-6 space-y-5">
            {/* Full Name */}

            <div>
              <Label>FULL NAME</Label>

              <Input {...register("fullName")} placeholder="John Doe" />

              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
            </div>

            {/* Email */}

            <div>
              <Label>EMAIL ADDRESS</Label>

              <Input {...register("email")} placeholder="john@example.com" />

              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* Phone */}

            <div>
              <Label>PHONE NUMBER</Label>

              <Input
                {...register("phoneNumber")}
                placeholder="+91 9876543210"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom */}

      <Card>
        <CardContent className="p-6 grid grid-cols-2 gap-6">
          {/* Role */}

          <div>
            <Label>ROLE ASSIGNMENT</Label>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>

                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Password */}

          <div>
            <Label>INITIAL PASSWORD</Label>

            <Input {...register("password")} type="password" />
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
