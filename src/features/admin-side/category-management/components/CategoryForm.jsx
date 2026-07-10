import { AppInput } from "@/shared/components/AppInput";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const CategoryForm = ({
  initialData = null,
  onSubmit,
  onClose,
  schema,
  fallback = "Category",
}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        isActive: initialData.isActive ?? true,
      });
    }
  }, [reset, initialData]);

  const isActive = watch("isActive");
  const name = watch("name");

  const handleCancel = () => {
    reset({
      name: "",
      isActive: true,
    });
    onClose?.();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category Preview */}
      <div className="flex items-start justify-between rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-muted-foreground text-2xl font-semibold">
              {name || fallback}
            </h3>
            {initialData && (
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mt-2 text-sm">0 Subcategory</p>
        </div>
        {initialData && (
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        )}
      </div>
      <div className="space-y-2">
        <Label>CATEGORY NAME</Label>
        <AppInput {...register("name")} placeholder="Eg: Shirts" type="text" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting || (initialData && !isDirty)}
          className="w-full"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? `Update ${fallback}`
              : `Save ${fallback}`}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
