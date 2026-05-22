import { AppInput } from '@/shared/components/AppInput';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import MultipleImageUploader from '@/shared/helpers/MultipleImageUploader';
import SingleImageUploader from '@/shared/helpers/SingleImageUploader';
import { Package2 } from 'lucide-react';
import React from 'react'
import { Controller} from 'react-hook-form';

const BasicInformation = ({ register, control, errors }) => {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6 border rounded-sm p-8">
        <div className="flex items-center gap-3">
          <Package2 size={18} className="text-amber-900" />
          <h2 className="text-lg font-semibold">Basic Information</h2>
        </div>

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
                className="w-full
                  rounded-md
                  border
                  bg-background
                  px-4
                  py-3
                  text-sm
                  outline-none"
              />
            )}
          />
          {errors?.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Manufacturer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="space-y-1 md:col-span-2">
              <Label>ADDRESS</Label>
              <textarea
                {...register("manufacturer.address")}
                rows={3}
                placeholder="Manufacturer address"
                className="w-full rounded-md border bg-background px-4 py-3 text-sm outline-none"
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
      <div className="rounded-lg border bg-white p-8 flex justify-around flex-col gap-8">
        <div className="space-y-2">
          {/* Title */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-amber-200" />
            <span className="text-xs font-bold tracking-[0.3em] text-primary">
              COVER IMAGE
            </span>
          </div>

          {/* Image Upload */}
          <div className="flex justify-center">
            <SingleImageUploader
              name="coverImage"
              control={control}
              title="Drop high-res shots here"
              size="w-52 h-52"
              shape="rounded-lg border-2 border-dashed"
              fallback="https://placehold.co/300x300?text=Upload"
            />
          </div>

          {/* Error */}
          {errors?.coverImage && (
            <p className="text-center text-xs text-red-500">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-amber-200" />
            <span
              className="
        text-xs
        font-bold
        tracking-[0.3em]
        text-primary
      "
            >
              GALLERY IMAGES
            </span>
          </div>

          <MultipleImageUploader
            name="galleryImages"
            control={control}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Return Policy
          </h3>
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <p className="font-medium">Returnable Product</p>
              <p className="text-sm text-muted-foreground">
                Customers can return this product.
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
          <div className="space-y-1">
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
        </div>
      </div>
    </div>
  );
};

export default BasicInformation
