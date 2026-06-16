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
    ),

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
    .min(0, "Minimum order amount cannot be negative")
    .default(0),

  maxDiscountAmount: yup
    .number()
    .typeError("Maximum discount must be a number")
    .min(0, "Maximum discount cannot be negative")
    .when("discountType", {
      is: "PERCENTAGE",
      then: (schema) =>
        schema.moreThan(
          0,
          "Percentage coupons require a maximum discount cap to protect margins",
        ),
      otherwise: (schema) => schema,
    }),

  usageLimit: yup
    .number()
    .typeError("Total usage limit must be a number")
    .integer("Usage limit must be a whole number")
    .positive("Usage limit must be at least 1")
    .required("Global usage limit is required"),

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
    .typeError("Invalid start date")
    .required("Start date is required")
    .test("is-future", "Start date cannot be in the past", function (value) {
      if (!value) return false;
      const bufferTime = new Date(Date.now() - 5 * 60 * 1000);
      return value >= bufferTime;
    }),

  expiryDate: yup
    .date()
    .typeError("Invalid expiry date")
    .required("Expiry date is required")
    .min(
      yup.ref("startDate"),
      "Expiry date must be scheduled after the start date",
    ),
    
  isActive: yup.boolean().default(true),
});
