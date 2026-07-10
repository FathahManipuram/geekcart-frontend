import { AppInput } from "@/shared/components/AppInput";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const VariantRow = ({
  index,
  variant,
  control,
  register,
  errors,
  onRemove,
}) => {
  const [openVariantDeleteModal, setOpenVariantDeleteModal] = useState(false);

  const previewImage =
    variant.images?.[0] instanceof File
      ? URL.createObjectURL(variant.images[0])
      : variant.images?.[0];

  return (
    <div className="space-y-5 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={previewImage || "https://placehold.co/100x100"}
            alt={variant.color}
            className="h-20 w-20 shrink-0 rounded-lg border object-cover"
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold">
                {variant.color}
              </div>

              <div className="bg-muted inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                {variant.size}
              </div>
            </div>

            {/* SKU */}
            <p className="text-muted-foreground text-xs">SKU: {variant.sku}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpenVariantDeleteModal(true)}
          className="text-red-500 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <Label>STOCK</Label>

          <AppInput
            type="number"
            min="0"
            {...register(`variants.${index}.stock`)}
          />
          {errors?.variants?.[index]?.stock && (
            <p className="mt-1 text-xs text-red-500">
              {errors.variants?.[index]?.stock?.message}
            </p>
          )}
        </div>

        {/* Cost Price */}
        <div>
          <Label>COST PRICE</Label>

          <AppInput
            type="number"
            min="0"
            {...register(`variants.${index}.costPrice`)}
          />
          {errors?.variants?.[index]?.costPrice && (
            <p className="mt-1 text-xs text-red-500">
              {errors.variants?.[index]?.costPrice?.message}
            </p>
          )}
        </div>

        <div>
          <Label>PRICE</Label>

          <AppInput
            type="number"
            min="0"
            {...register(`variants.${index}.price`)}
          />
          {errors?.variants?.[index]?.price && (
            <p className="mt-1 text-xs text-red-500">
              {errors.variants?.[index]?.price?.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Label>ACTIVE</Label>

        <Controller
          name={`variants.${index}.isActive`}
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value ?? true}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>
      <ConfirmModal
        open={openVariantDeleteModal}
        onOpenChange={setOpenVariantDeleteModal}
        onConfirm={onRemove}
        title={`Do you want to delete this (${variant.size}/${variant.color}) variant`}
      />
    </div>
  );
};

export default VariantRow;
