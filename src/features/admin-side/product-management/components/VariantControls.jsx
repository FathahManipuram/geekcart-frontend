import { Button } from "@/shared/components/ui/button";
import { toggleSize } from "../utils/toggleSize"
import React from 'react'
import { Boxes, Sparkles } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { COLOR_OPTIONS, SIZE_OPTIONS } from "../constants/productOption";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

const VariantControls = ({ control, watch, setValue, onGenerate, errors }) => {

	const selectedSizes = watch("selectedSizes") || [];
  const selectedColor = watch("selectedColor") || "";

  const handleToggleSize = (size) => {
    const updatedSizes = toggleSize(selectedSizes, size);

    setValue("selectedSizes", updatedSizes, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const canGenerate = selectedSizes.length > 0 && !!selectedColor;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Boxes size={18} className="text-amber-700" />
          <h2 className="text-lg font-semibold">Variant Matrix</h2>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`gap-2 cursor-pointer`}
        >
          <Sparkles size={16} />
          Generate Variants
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label>AVAILABLE SIZES</Label>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <Button
                  key={size}
                  type="button"
                  onClick={() => handleToggleSize(size)}
                  className={`px-4 py-2 rounded-md border text-sm font-semibold transition ${
                    isSelected
                      ? "bg-primary text-white border-amber-700"
                      : "bg-white hover:bg-muted border-muted text-foreground"
                  }`}
                >
                  {size}
                </Button>
              );
            })}
          </div>
          {errors?.selectedSizes && (
            <p className="text-xs text-red-500">
              {errors.selectedSizes.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>COLOR</Label>
          <Controller
            name="selectedColor"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 w-full">
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
          {errors?.selectedColor && (
            <p className="text-xs text-red-500">
              {errors.selectedColor.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default VariantControls
