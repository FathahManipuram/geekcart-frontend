import React, { useEffect } from "react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressSchema } from "../validations/address.validation";

import { toast } from "sonner";
import { useAccountStore } from "../../store/account.store";

const AddressForm = ({initialData = null, onClose}) => {
  const {addAddress, updateAddress, loading}= useAccountStore()

const isEditMode= Boolean(initialData)


  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, dirtyFields, },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      addressLabel: "Home",
      fullName: "",
      phoneNumber: "",
      addressLine: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      isDefault: false,
    },
  });


useEffect(()=>{
  if(initialData){
    console.log("initialData: ", initialData)
    reset({
      addressLabel: initialData.addressLabel || "Home",
      fullName: initialData.fullName || "",
      phoneNumber: initialData.phoneNumber || "",
      addressLine: initialData.addressLine || "",
      landmark: initialData.landmark || "",
      city: initialData.city?.toLowerCase() || "",
      state: initialData.state || "",
      country: initialData.country || "",
      pincode: initialData.pincode || "",
      isDefault: initialData.isDefault || false,
    });
  }
}, [initialData, reset])

const selectedLabel= watch("addressLabel")

  const onSubmit = async (data) => {
    console.log("data: ", data)

    try{
      let finalData= {}

      if(isEditMode){
        Object.keys(dirtyFields).forEach((key)=>{
          let value= data[key];
          if(typeof value === "string"){
            value= value.trim()
          }
          finalData[key]= value
        })
        if(!Object.keys(finalData).length){
          toast.info("No changes made")
          return 
        }

console.log("edit form: ",initialData._id, finalData)
        await updateAddress(initialData._id, finalData)

        toast.success("Address updated successfully")
      }else {
        finalData = {
          ...data,
          fullName: data.fullName.trim(),
          phoneNumber: data.phoneNumber.trim(),
          addressLine: data.addressLine.trim(),
          landmark: data.landmark?.trim(),
          city: data.city.trim(),
          state: data.state.trim(),
          country: data.country.trim(),
          pincode: data.pincode.trim(),
        };

const res = await addAddress(finalData);
console.log("result: ", res);
toast.success(res.message);

onClose()
      }
    }catch(err){
      console.log("err: ", err)
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Address Label */}
      <div className="space-y-2">
        <Label>Address Label</Label>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant={selectedLabel === "Home" ? "default" : "outline"}
            onClick={() =>
              setValue("addressLabel", "Home", { shouldDirty: true })
            }
          >
            Home
          </Button>

          <Button
            type="button"
            variant={selectedLabel === "Work" ? "default" : "outline"}
            onClick={() =>
              setValue("addressLabel", "Work", { shouldDirty: true })
            }
          >
            Work
          </Button>

          <Button
            type="button"
            variant={selectedLabel === "Other" ? "default" : "outline"}
            onClick={() =>
              setValue("addressLabel", "Other", { shouldDirty: true })
            }
          >
            Other
          </Button>
        </div>

        {errors.addressLabel && (
          <p className="text-sm text-red-500">{errors.addressLabel.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <Label>Full Name</Label>

        <Input {...register("fullName")} placeholder="Enter full name" />

        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label>Phone Number</Label>

        <Input
          {...register("phoneNumber")}
          type="tel"
          placeholder="+91 9876543210"
        />

        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-1">
        <Label>Address Line</Label>

        <Input {...register("addressLine")} placeholder="House No, Street" />

        {errors.addressLine && (
          <p className="text-sm text-red-500">{errors.addressLine.message}</p>
        )}
      </div>

      {/* Landmark */}
      <div className="space-y-1">
        <Label>Landmark</Label>

        <Input {...register("landmark")} placeholder="Near landmark" />

        {errors.landmark && (
          <p className="text-sm text-red-500">{errors.landmark.message}</p>
        )}
      </div>

      {/* City & State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <div className="space-y-1">
          <Label>City</Label>

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("city", value, { shouldDirty: true });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="calicut">Calicut</SelectItem>
                  <SelectItem value="kochi">Kochi</SelectItem>
                  <SelectItem value="trivandrum">Trivandrum</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-1">
          <Label>State</Label>

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("state", value, { shouldDirty: true });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
      </div>

      {/* Country & Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country */}
        <div className="space-y-1">
          <Label>Country</Label>

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("country", value, { shouldDirty: true });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div className="space-y-1">
          <Label>Pincode</Label>

          <Input {...register("pincode")} placeholder="683542" />

          {errors.pincode && (
            <p className="text-sm text-red-500">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      {/* Default Address */}
      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("isDefault")} className="h-4 w-4" />

        <p className="text-sm">Set as default address</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading || (isEditMode && !Object.keys(dirtyFields).length)}
          className="flex-1"
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Address"
              : "Save Address"}
        </Button>

        <Button
          onClick={onClose}
          type="button"
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default AddressForm
