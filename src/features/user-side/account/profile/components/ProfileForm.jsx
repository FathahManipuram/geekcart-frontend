import { useAuthStore } from "@/features/auth/store/auth.store";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileSchema } from "../validations/user.validation";
import { useEffect } from "react";
import { formatDateForInput } from "@/shared/utils/date";

const ProfileForm = ({ user, onClose }) => {
  const { updateProfile, loading } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        gender: user?.gender || "",
        dateOfBirth: formatDateForInput(user?.dateOfBirth) || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log("DataTO: ", data);
    console.log("Dirtyfields: ", dirtyFields);
    const updatedData = {};

    Object.keys(dirtyFields).forEach((key) => {
      let value = data[key];

      if (value === "") value = null;
      if (typeof value === "string") value = value.trim();

      if (key === "dateOfBirth" && value) {
        value = new Date(value);
      }
      updatedData[key] = value;
    });

    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes made");
      return;
    }
    console.log("UpdatedData: ", updatedData);
    try {
      await updateProfile(updatedData);
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Updation failed");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label>FULL NAME</Label>
            <Input {...register("fullName")} type="text" className="h-8" />
            <p className="text-xs text-red-500">{errors?.fullName?.message}</p>
          </div>

          <div>
            <Label>PHONE NUMBER</Label>
            <Input {...register("phoneNumber")} type="tel" className="h-8" />
            <p className="text-xs text-red-500">
              {errors?.phoneNumber?.message}
            </p>
          </div>

          <div>
            <Label>GENDER</Label>
            <select
              {...register("gender")}
              className="w-full h-10.5 border-b-2 outline-none"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p className="text-xs text-red-500">{errors?.gender?.message}</p>
          </div>

          <div>
            <Label>DATE OF BIRTH</Label>
            <Input {...register("dateOfBirth")} type="date" className="h-8" />
            <p className="text-xs text-red-500">
              {errors?.dateOfBirth?.message}
            </p>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading || !Object.keys(dirtyFields).length}
          className="w-full mt-6"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;
