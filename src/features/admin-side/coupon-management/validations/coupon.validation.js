import * as yup from "yup";

export const couponSchema = yup.object({
  code: yup
    .string()
    .trim()
    .required("Coupon code is required")
    .min(3, "Code must be at least 3 characters")
    .max(15, "Code cannot exceed 15 characters")
    .matches(
      /^[A-Z0-9]+$/,
      "Code must contain only uppercase letters and numbers (no spaces or symbols)",
    ),

  description: yup
    .string()
    .trim()
    .required("A short description is required for the checkout UI")
    .min(
      10,
      "Description should be at least 10 characters to be clear to users",
    )
    .max(80),

  discountType: yup
    .string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid discount type")
    .required("Discount type is required"),

  discountValue: yup
    .number()
    .typeError("Discount value must be a number")
    .positive("Discount value must be greater than 0")
    .required("Discount value is required")
    .when("discountType", {
      is: "PERCENTAGE",
      then: (schema) =>
        schema.max(100, "Percentage discount cannot exceed 100%"),
      otherwise: (schema) => schema,
    }),

  minOrderAmount: yup
    .number()
    .typeError("Minimum order amount must be a number")
    .min(0, "Minimum order amount cannot be negative"),

  maxDiscountAmount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("discountType", {
      is: "PERCENTAGE",
      then: (schema) =>
        schema
          .required("Maximum discount is required")
          .moreThan(0, "Percentage coupons require a maximum discount cap"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  // usageLimit: yup
  //   .number()
  //   .typeError("Total usage limit must be a number")
  //   .integer("Usage limit must be a whole number")
  //   .positive("Usage limit must be at least 1")
  //   .required("Global usage limit is required"),

  usageLimit: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .notRequired()
    .integer("Usage limit must be a whole number")
    .positive("Usage limit must be at least 1")
    .typeError("Total usage limit must be a number"),

  perUserLimit: yup
    .number()
    .typeError("Per user limit must be a number")
    .integer("Per user limit must be a whole number")
    .positive("Per user limit must be at least 1")
    .max(
      yup.ref("usageLimit"),
      "Per user limit cannot be higher than the total global usage limit",
    )
    .required("Per user limit is required")
    .default(1),

  startDate: yup
    .date()
    .required("Start date is required")
    .test("not-in-past", "Start date cannot be in the past", (value) => {
      if (!value) return false;

      const start = new Date(value);
      start.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return start >= today;
    }),

  expiryDate: yup
    .date()
    .required("Expiry date is required")
    .test(
      "expiry-valid",
      "Expiry date must be after start date",
      function (value) {
        const { startDate } = this.parent;

        if (!value || !startDate) return true;

        const expiry = new Date(value);
        expiry.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        return expiry >= start;
      },
    ),

  isActive: yup.boolean().default(true),
});

export const updateCouponSchema = couponSchema.clone().shape({
  code: couponSchema.fields.code.optional(),
  description: couponSchema.fields.description.optional(),
  discountType: couponSchema.fields.discountType.optional(),
  discountValue: couponSchema.fields.discountValue.optional(),
  minOrderAmount: couponSchema.fields.minOrderAmount.optional(),
  maxDiscountAmount: couponSchema.fields.maxDiscountAmount.optional(),
  usageLimit: couponSchema.fields.usageLimit.optional(),
  perUserLimit: couponSchema.fields.perUserLimit.optional(),
  startDate: yup.date().optional(),
  expiryDate: couponSchema.fields.expiryDate.optional(),
  isActive: couponSchema.fields.isActive.optional(),
});