import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Boxes } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

const OrganizationAttributes = ({
  control,
  watch,
  categories,
  subcategories,
  errors,
  sleeveOptions,
  fabricOptions,
  setValue,
}) => {
  const selectedCategory = watch("category");
  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      String(subcategory.category?._id || subcategory.category) ===
      String(selectedCategory),
  );

  return (
    <div className="space-y-6 rounded-lg border bg-white p-8">
      <div className="flex items-center gap-3">
        <Boxes size={18} className="text-amber-700" />
        <h2 className="text-lg font-semibold">Organization & Attributes</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>PRIMARY CATEGORY</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("subcategory", "", {
                    shouldDirty: true,
                    shouldValidate: false,
                  });
                }}
              >
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={String(category._id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>SUBCATEGORY</Label>
          <Controller
            name="subcategory"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={field.onChange}
                disabled={!selectedCategory}
              >
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory._id}
                      value={String(subcategory._id)}
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.subcategory && (
            <p className="text-xs text-red-500">{errors.subcategory.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>SLEEVE TYPE</Label>
          <Controller
            name="sleeve"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Select sleeve type" />
                </SelectTrigger>
                <SelectContent>
                  {sleeveOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.sleeve && (
            <p className="text-xs text-red-500">{errors.sleeve.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label> FABRIC</Label>
          <Controller
            name="fabric"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Select fabric" />
                </SelectTrigger>
                <SelectContent>
                  {fabricOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.fabric && (
            <p className="text-xs text-red-500">{errors.fabric.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationAttributes;
