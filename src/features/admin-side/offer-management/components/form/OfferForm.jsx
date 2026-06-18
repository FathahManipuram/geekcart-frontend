import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import AppFormInput from "@/shared/components/form/AppFormInput";
import AppFormTextarea from "@/shared/components/form/AppFormTextarea";
import FilterSelect from "@/shared/components/filters/FilterSelect";

import { Switch } from "@/shared/components/ui/switch";
import { Label } from "@/shared/components/ui/label";

import { OFFER_TYPES, DISCOUNT_TYPES } from "../../constants/offer.constants";
import { createOfferSchema } from "../../validations/offer.validation";
import { Button } from "@/shared/components/ui/button";
import { useEffect } from "react";
import { formatDateForInput } from "@/shared/utils/date";

const OfferForm = ({ defaultValues, onSubmit, loading, products, categories, subcategories }) => {

const productOptions =
  products?.map((product) => ({
    value: product._id,
    label: product.name,
  })) || [];

const categoryOptions =
  categories?.map((category) => ({
    value: category._id,
    label: category.name,
  })) || [];

const subcategoryOptions =
  subcategories?.map((subcategory) => ({
    value: subcategory._id,
    label: subcategory.name,
  })) || [];


  const methods = useForm({
	resolver: yupResolver(createOfferSchema),
    defaultValues: {
      name: "",
      description: "",

      offerType: "PRODUCT",

      productId: "",
      categoryId: "",
      subcategoryId: "",

      discountType: "PERCENTAGE",
      discountValue: "",

      minOrderAmount: "",
      maxDiscountAmount: "",

      startDate: "",
      expiryDate: "",

      isActive: true,

      ...defaultValues,
    },
  });

  const { handleSubmit, watch, setValue, reset, formState:{errors, isDirty} } = methods;

  const offerType = watch("offerType");

const handleOfferTypeChange = (value) => {
  setValue("offerType", value, {
    shouldValidate: true,
    shouldDirty: true,
  });

  setValue("productId", "", {
    shouldValidate: true,
  });

  setValue("categoryId", "", {
    shouldValidate: true,
  });

  setValue("subcategoryId", "", {
    shouldValidate: true,
  });
};

  useEffect(() => {
	if (defaultValues) {
	  reset({
		...defaultValues,

		startDate: defaultValues.startDate
		  ? 
		  formatDateForInput(defaultValues.startDate)
		  : "",

		expiryDate: defaultValues.expiryDate
		  ? formatDateForInput(defaultValues.expiryDate)
		  : "",
	  });
	}
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Basic Information</h2>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AppFormInput
                name="name"
                label="Offer Name"
                placeholder="Summer Sale"
              />
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Active Offer</p>

                  <p className="text-xs text-muted-foreground">
                    Enable or disable this offer
                  </p>
                </div>

                <Switch
                  checked={watch("isActive")}
                  onCheckedChange={(checked) =>
                    setValue("isActive", checked, {
                      shouldValidate: true,
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

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Offer Configuration</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="uppercase">Offer Type</Label>

              <FilterSelect
                value={offerType}
                options={OFFER_TYPES}
                onValueChange={handleOfferTypeChange}
              />
              {methods.formState.errors.offerType && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.offerType.message}
                </p>
              )}
            </div>

            {offerType === "PRODUCT" && (
              <div className="space-y-1">
                <Label className="uppercase">Product</Label>

                <FilterSelect
                  value={watch("productId")}
                  options={productOptions}
                  onValueChange={(value) =>
                    setValue("productId", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {methods.formState.errors.productId && (
                  <p className="text-sm text-red-500">
                    {methods.formState.errors.productId.message}
                  </p>
                )}
              </div>
            )}

            {offerType === "CATEGORY" && (
              <div className="space-y-1">
                <Label className="uppercase">Category</Label>

                <FilterSelect
                  value={watch("categoryId")}
                  options={categoryOptions}
                  onValueChange={(value) =>
                    setValue("categoryId", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {methods.formState.errors.categoryId && (
                  <p className="text-sm text-red-500">
                    {methods.formState.errors.categoryId.message}
                  </p>
                )}
              </div>
            )}

            {offerType === "SUBCATEGORY" && (
              <div className="space-y-1">
                <Label className="uppercase">Subcategory</Label>

                <FilterSelect
                  value={watch("subcategoryId")}
                  options={subcategoryOptions}
                  onValueChange={(value) =>
                    setValue("subcategoryId", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                {methods.formState.errors.subcategoryId && (
                  <p className="text-sm text-red-500">
                    {methods.formState.errors.subcategoryId.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Discount */}

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Discount Settings</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="uppercase">Discount Type</Label>

              <FilterSelect
                value={watch("discountType")}
                options={DISCOUNT_TYPES}
                onValueChange={(value) =>
                  setValue("discountType", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
              {methods.formState.errors.discountType && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.discountType.message}
                </p>
              )}
            </div>

            <AppFormInput
              name="discountValue"
              label="Discount Value"
              type="number"
            />
          </div>
        </div>

        {/* Conditions */}

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Conditions</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <AppFormInput
              name="minOrderAmount"
              label="Minimum Order Amount"
              type="number"
            />

            <AppFormInput
              name="maxDiscountAmount"
              label="Maximum Discount"
              type="number"
            />
          </div>
        </div>

        {/* Schedule */}

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Schedule</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <AppFormInput name="startDate" label="Start Date" type="date" />

            <AppFormInput name="expiryDate" label="Expiry Date" type="date" />
          </div>
        </div>

        <Button type="submit" disabled={loading || !isDirty}>
          {loading ? "Saving..." : "Save Offer"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default OfferForm;
