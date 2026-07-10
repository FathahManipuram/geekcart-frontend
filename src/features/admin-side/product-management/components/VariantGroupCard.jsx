import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import MultipleImageUploader from "@/shared/helpers/MultipleImageUploader";
import { COLOR_OPTIONS, SIZE_OPTIONS } from "../constants/productOption";
import { toggleSize } from "../utils/toggleSize";
import { Trash2 } from "lucide-react";
import ConfirmModal from "@/shared/components/ConfirmModal";

const VariantGroupCard = ({
  index,
  control,
  watch,
  setValue,
  errors,
  onRemove,
}) => {
  const [openVariantGroupDeleteModal, setOpenVariantGroupDeleteModal] =
    useState(false);

  const selectedSizes = watch(`variantGroups.${index}.sizes`) || [];

  const handleToggleSize = (size) => {
    const updatedSizes = toggleSize(selectedSizes, size);

    setValue(`variantGroups.${index}.sizes`, updatedSizes, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6 rounded-xl border p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {watch(`variantGroups.${index}.color`) || "New"} Variant
          </h3>

          <p className="text-muted-foreground text-sm">
            Configure sizes and images
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpenVariantGroupDeleteModal(true)}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} />
        </Button>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label>COLOR</Label>

        <Controller
          name={`variantGroups.${index}.color`}
          control={control}
          render={({ field }) => (
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>

              <SelectContent>
                {COLOR_OPTIONS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.variantGroups?.[index]?.color && (
          <p className="text-xs text-red-500">
            {errors.variantGroups?.[index]?.color?.message}
          </p>
        )}
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <Label>SIZES</Label>

        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => {
            const isSelected = selectedSizes.includes(size);

            return (
              <Button
                key={size}
                type="button"
                onClick={() => handleToggleSize(size)}
                className={`min-w-12 rounded-md border transition-all ${
                  isSelected
                    ? "bg-primary border-primary hover:bg-primary text-white"
                    : "bg-muted text-foreground border-border hover:bg-muted/80"
                } `}
              >
                {size}
              </Button>
            );
          })}
        </div>
        {errors?.variantGroups?.[index]?.sizes && (
          <p className="text-xs text-red-500">
            {errors.variantGroups?.[index]?.sizes?.message}
          </p>
        )}
      </div>

      {/* Images */}

      <div className="space-y-2">
        <Label>IMAGES</Label>

        <MultipleImageUploader
          control={control}
          name={`variantGroups.${index}.images`}
        />
      </div>

      <ConfirmModal
        open={openVariantGroupDeleteModal}
        onOpenChange={setOpenVariantGroupDeleteModal}
        onConfirm={onRemove}
        title="Do you want to delete this variant group"
      />
    </div>
  );
};

export default VariantGroupCard;
