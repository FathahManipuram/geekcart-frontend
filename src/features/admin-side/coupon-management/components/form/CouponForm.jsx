import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { DISCOUNT_TYPES } from "../../constants/coupon.constants";

import AppFormInput from "@/shared/components/form/AppFormInput";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import { Label } from "@/shared/components/ui/label";
import AppFormTextarea from "@/shared/components/form/AppFormTextarea";
import { Switch } from "@/shared/components/ui/switch";
import { useEffect } from "react";
import { formatDateForInput } from "@/shared/utils/date";

const CouponForm = ({ defaultValues, onSubmit, loading, validation }) => {
  const methods = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      code: "",
      description: "",
      discountType: "PERCENTAGE",
      discountValue: "",
      minOrderAmount: "",
      maxDiscountAmount: "",
      usageLimit: 100,
      perUserLimit: 1,
      startDate: "",
      expiryDate: "",
      isActive: true,
    },
  });

  const { handleSubmit, watch, setValue, reset , formState: {isDirty, dirtyFields}} = methods;

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



  const handleFormSubmit= (data)=> {
    if(!defaultValues){
      return onSubmit(data)
    }
      console.log("data", data);
      console.log("dirtyFields", dirtyFields);

    const payload={}

    Object.keys(dirtyFields).forEach((key)=>{
      payload[key]= data[key]
    })

    onSubmit(payload)
  }


  const discountType = watch("discountType")


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Basic Information</h2>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AppFormInput
                name="code"
                label="Coupon Code"
                required
                placeholder="SUMMER50"
              />
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Active Coupon</p>
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

            {/* Description */}
            <div className="lg:col-span-3">
              <AppFormTextarea
                name="description"
                label="Description"
                placeholder="Summer Sale Offer"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Discount Settings</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Discount Type</Label>

              <FilterSelect
                value={watch("discountType")}
                onValueChange={(value) =>
                  setValue("discountType", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                options={DISCOUNT_TYPES}
              />
            </div>

            <AppFormInput
              name="discountValue"
              label="Discount Value"
              type="number"
              required
              placeholder="20"
            />

            <AppFormInput
              name="minOrderAmount"
              label="Minimum Order Amount"
              type="number"
              placeholder="1000"
            />

            {discountType == "PERCENTAGE" && (
              <AppFormInput
                name="maxDiscountAmount"
                label="Maximum Discount"
                type="number"
                placeholder="500"
              />
            )}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Usage Limits</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <AppFormInput
              name="usageLimit"
              label="Usage Limit"
              type="number"
              required
            />

            <AppFormInput
              name="perUserLimit"
              label="Per User Limit"
              type="number"
              required
            />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Schedule</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <AppFormInput
              name="startDate"
              label="Start Date"
              type="date"
              required
            />

            <AppFormInput
              name="expiryDate"
              label="Expiry Date"
              type="date"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isDirty}
          className="bg-primary text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Coupon"}
        </button>
      </form>
    </FormProvider>
  );
};

export default CouponForm;
