import { AppInput } from "@/shared/components/AppInput";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import SingleImageUploader from "@/shared/helpers/SingleImageUploader";
import { Package2 } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

const BasicInformation = ({ register, control, errors, watch }) => {
  const isReturnable = watch("isReturnable");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Section */}
      <div className="space-y-6 rounded-xl border bg-white p-8 lg:col-span-2">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Package2 size={18} className="text-amber-900" />

          <h2 className="text-lg font-semibold">Basic Information</h2>
        </div>

        {/* Product Name */}
        <div className="space-y-1">
          <Label>PRODUCT NAME</Label>

          <AppInput
            {...register("name")}
            placeholder="e.g. Italian Linen Oxford"
            className="h-12"
          />

          {errors?.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>NARRATIVE DESCRIPTION</Label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={6}
                placeholder="Describe the craftsmanship, fit, and soul of this garment..."
                className="bg-background w-full resize-none rounded-md border px-4 py-3 text-sm outline-none"
              />
            )}
          />

          {errors?.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Manufacturer */}
        <div className="space-y-4">
          <h3 className="text-muted-foreground text-sm font-semibold">
            Manufacturer Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-1">
              <Label>MANUFACTURER NAME</Label>

              <AppInput
                {...register("manufacturer.name")}
                placeholder="MenStore Garments Ltd."
                className="h-12"
              />

              {errors?.manufacturer?.name && (
                <p className="text-xs text-red-500">
                  {errors.manufacturer.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label>PHONE</Label>

              <AppInput
                {...register("manufacturer.phone")}
                placeholder="+91 9876543210"
                className="h-12"
              />

              {errors?.manufacturer?.phone && (
                <p className="text-xs text-red-500">
                  {errors.manufacturer.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1 md:col-span-2">
              <Label>EMAIL</Label>

              <AppInput
                {...register("manufacturer.email")}
                placeholder="info@menstore.com"
                className="h-12"
              />

              {errors?.manufacturer?.email && (
                <p className="text-xs text-red-500">
                  {errors.manufacturer.email.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1 md:col-span-2">
              <Label>ADDRESS</Label>

              <textarea
                {...register("manufacturer.address")}
                rows={3}
                placeholder="Manufacturer address"
                className="bg-background w-full resize-none rounded-md border px-4 py-3 text-sm outline-none"
              />

              {errors?.manufacturer?.address && (
                <p className="text-xs text-red-500">
                  {errors.manufacturer.address.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-8 self-start rounded-xl border bg-white p-6">
        {/* Cover Image */}
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Main Product Thumbnail</h3>

            <p className="text-muted-foreground text-sm">
              Upload the primary image customers see first.
            </p>
          </div>

          {/* Upload */}
          <div className="bg-muted/30 rounded-xl border border-dashed p-5">
            <div className="flex justify-center">
              <SingleImageUploader
                name="coverImage"
                control={control}
                title="Upload Cover"
                size="w-56 h-56"
                shape="rounded-xl"
                fallback="https://placehold.co/400x400?text=Cover+Image"
              />
            </div>
          </div>

          {/* Error */}
          {errors?.coverImage && (
            <p className="text-center text-xs text-red-500">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Return Policy */}
        <div className="space-y-5">
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Customer Returns</h3>

            <p className="text-muted-foreground text-sm">
              Configure return eligibility and duration.
            </p>
          </div>

          {/* Return Switch */}
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <p className="font-medium">Returnable Product</p>

              <p className="text-muted-foreground text-sm">
                Customers can return this item.
              </p>
            </div>

            <Controller
              name="isReturnable"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value ?? true}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Return Days */}
          {isReturnable && (
            <div className="space-y-2">
              <Label>RETURN WINDOW (DAYS)</Label>

              <AppInput
                type="number"
                min="1"
                {...register("returnWindowDays", {
                  valueAsNumber: true,
                })}
                className="h-12"
              />

              {errors?.returnWindowDays && (
                <p className="text-xs text-red-500">
                  {errors.returnWindowDays.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
