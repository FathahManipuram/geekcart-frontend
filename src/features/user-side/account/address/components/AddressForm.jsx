import React, { useEffect, useMemo } from "react";

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
import { Country } from "country-state-city";
import { getPincodeDetails } from "@/shared/services/pincode.helper";

const AddressForm = ({ initialData = null, onClose }) => {
  const { addAddress, updateAddress, loading } = useAccountStore();
  const isEditMode = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, dirtyFields },
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
      country: "India",
      pincode: "",
      isDefault: false,
    },
  });

  const selectedLabel = watch("addressLabel");
  const watchedPincode = watch("pincode");


  const countries = useMemo(
    () => Country.getAllCountries().filter((c) => c.isoCode === "IN"),
    [],
  );


  useEffect(() => {
    if (initialData) {
      reset({
        addressLabel: initialData.addressLabel || "Home",
        fullName: initialData.fullName || "",
        phoneNumber: initialData.phoneNumber || "",
        addressLine: initialData.addressLine || "",
        landmark: initialData.landmark || "",
        country: initialData.country || "India",
        state: initialData.state || "",
        city: initialData.city || "",
        pincode: initialData.pincode || "",
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData, reset]);


  useEffect(() => {
    if (isEditMode && !dirtyFields.pincode) return;
    if (watchedPincode?.length !== 6) return;

    const timer = setTimeout(async () => {
      try {
        const { state: apiState, city: apiCity } =
          await getPincodeDetails(watchedPincode);

        setValue("country", "India", {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("state", apiState, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("city", apiCity, { shouldDirty: true, shouldValidate: true });

        toast.success(`Location updated: ${apiCity}, ${apiState}`);
      } catch (error) {
        console.error(error);
        toast.error("Invalid pincode details");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [watchedPincode, setValue, isEditMode, dirtyFields.pincode]);

  const onSubmit = async (data) => {
    try {
      let finalData = {};
      if (isEditMode) {
        Object.keys(dirtyFields).forEach((key) => {
          let value = data[key];
          if (typeof value === "string") value = value.trim();
          finalData[key] = value;
        });
        if (!Object.keys(finalData).length) {
          toast.info("No changes made");
          return;
        }
        await updateAddress(initialData._id, finalData);
        toast.success("Address updated successfully");
        onClose();
      } else {
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
        toast.success(res.message);
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label>Address Label</Label>
        <div className="grid grid-cols-3 gap-3">
          {["Home", "Work", "Other"].map((label) => (
            <Button
              key={label}
              type="button"
              variant={selectedLabel === label ? "default" : "outline"}
              onClick={() =>
                setValue("addressLabel", label, { shouldDirty: true })
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Full Name</Label>
        <Input {...register("fullName")} placeholder="Enter full name" />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Phone Number</Label>
        <Input
          {...register("phoneNumber")}
          type="tel"
          placeholder="9876543210"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Address Line</Label>
        <Input {...register("addressLine")} placeholder="House No, Street" />
        {errors.addressLine && (
          <p className="text-sm text-red-500">{errors.addressLine.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Landmark</Label>
        <Input {...register("landmark")} placeholder="Near landmark" />
        {errors.landmark && (
          <p className="text-sm text-red-500">{errors.landmark.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>State</Label>
          <Input {...register("state")} placeholder="e.g. Kerala" />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>City</Label>
          <Input {...register("city")} placeholder="City / District" />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || "India"}
                onValueChange={(value) =>
                  setValue("country", value, { shouldDirty: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Pincode</Label>
          <Input
            {...register("pincode")}
            placeholder="683542"
            inputMode="numeric"
            maxLength={6}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
              register("pincode").onChange(e);
            }}
          />
          {errors.pincode && (
            <p className="text-sm text-red-500">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("isDefault")}
          className="h-4 w-4 accent-primary"
        />
        <p className="text-sm">Set as default address</p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
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
};

export default AddressForm;
