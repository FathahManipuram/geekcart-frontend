import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AppFormInput from "@/shared/components/form/AppFormInput";
import AppFormTextarea from "@/shared/components/form/AppFormTextarea";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";

import { OFFER_TYPES, DISCOUNT_TYPES } from "../../constants/offer.constants";

import { formatDateForInput } from "@/shared/utils/date";

const OfferForm = ({
  defaultValues,
  onSubmit,
  loading,
  validation,
  products = [],
  categories = [],
  subcategories = [],
}) => {
  const methods = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      name: "",
      description: "",

      offerType: "Product",
      targetId: "",

      discountType: "PERCENTAGE",
      discountValue: "",
      maxDiscountAmount: "",

      startDate: "",
      expiryDate: "",

      isActive: true,
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  const offerType = watch("offerType");
  const discountType = watch("discountType");

  const targetOptions =
    offerType === "Product"
      ? products.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      : offerType === "Category"
        ? categories.map((item) => ({
            value: item._id,
            label: item.name,
          }))
        : subcategories.map((item) => ({
            value: item._id,
            label: item.name,
          }));

  useEffect(() => {
    if (!defaultValues) return;

    reset({
      ...defaultValues,

      targetId:
        typeof defaultValues.targetId === "object"
          ? defaultValues.targetId._id
          : defaultValues.targetId,

      startDate: defaultValues.startDate
        ? formatDateForInput(defaultValues.startDate)
        : "",

      expiryDate: defaultValues.expiryDate
        ? formatDateForInput(defaultValues.expiryDate)
        : "",
    });
  }, [defaultValues, reset]);

  useEffect(() => {
    if (discountType === "FIXED") {
      setValue("maxDiscountAmount", null, {
        //shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [discountType, setValue]);

  const handleOfferTypeChange = (value) => {
    setValue("offerType", value, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("targetId", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleFormSubmit = (data) => {
    if (!defaultValues) {
      return onSubmit(data);
    }

    const payload = {};

    Object.keys(dirtyFields).forEach((key) => {
      payload[key] = data[key];
    });

    onSubmit(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AppFormInput
                name="name"
                label="Offer Name"
                placeholder="Summer Sale"
              />
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Active Offer</p>

                  <p className="text-muted-foreground text-xs">
                    Enable or disable this offer
                  </p>
                </div>

                <Switch
                  checked={watch("isActive")}
                  onCheckedChange={(checked) =>
                    setValue("isActive", checked, {
                      shouldDirty: true,
                    })
                  }
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <AppFormTextarea
                name="description"
                label="Description"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Offer */}

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Offer Configuration</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Offer Type</Label>

              <FilterSelect
                value={offerType}
                options={OFFER_TYPES}
                onValueChange={handleOfferTypeChange}
              />

              {errors.offerType && (
                <p className="text-sm text-red-500">
                  {errors.offerType.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>{offerType} Target</Label>

              <FilterSelect
                value={watch("targetId")}
                options={targetOptions}
                onValueChange={(value) =>
                  setValue("targetId", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />

              {errors.targetId && (
                <p className="text-sm text-red-500">
                  {errors.targetId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Discount */}

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Discount Settings</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Discount Type</Label>

              <FilterSelect
                value={discountType}
                options={DISCOUNT_TYPES}
                onValueChange={(value) =>
                  setValue("discountType", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />

              {errors.discountType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discountType.message}
                </p>
              )}
            </div>

            <AppFormInput
              name="discountValue"
              label="Discount Value"
              type="number"
            />

            {discountType === "PERCENTAGE" && (
              <div className="md:col-span-2">
                <AppFormInput
                  name="maxDiscountAmount"
                  label="Maximum Discount"
                  type="number"
                />
              </div>
            )}
          </div>
        </div>

        {/* Schedule */}

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Schedule</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <AppFormInput name="startDate" label="Start Date" type="date" />

            <AppFormInput name="expiryDate" label="Expiry Date" type="date" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || (defaultValues ? !isDirty : false)}
        >
          {loading ? "Saving..." : "Save Offer"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default OfferForm;
