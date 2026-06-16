import * as yup from "yup";

const strongTextRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9\s\-_.,()!%]*$/;


export const createOfferSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Offer name is required")
    .min(3, "Offer name must be at least 3 characters")
    .matches(
      strongTextRegex,
      "Offer name must begin with letters or numbers and contain readable text",
    )
    .test(
      "no-repeated-symbols",
      "Offer name contains too many symbols",
      (value) => {
        if (!value) return true;
        return !/([.\-_*])\1{3,}/.test(value);
      },
    ),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .test(
      "no-repeated-symbols",
      "Description contains too many symbols",
      (value) => {
        if (!value) return true;
        return !/([.\-_*])\1{3,}/.test(value);
      },
    ),
	
  offerType: yup
    .string()
    .oneOf(["PRODUCT", "CATEGORY", "SUBCATEGORY"], "Invalid offer type")
    .required("Offer type is required"),

  productId: yup.string().when("offerType", {
    is: "PRODUCT",
    then: (schema) => schema.required("Product selection is required").trim(),
    otherwise: (schema) => schema.strip().nullable(),
  }),

  categoryId: yup.string().when("offerType", {
    is: "CATEGORY",
    then: (schema) => schema.required("Category selection is required"),
    otherwise: (schema) => schema.strip().nullable(),
  }),

  subcategoryId: yup.string().when("offerType", {
    is: "SUBCATEGORY",
    then: (schema) => schema.required("Subcategory selection is required"),
    otherwise: (schema) => schema.strip().nullable(),
  }),

  discountType: yup
    .string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid discount type")
    .required("Discount type is required"),

  discountValue: yup
    .number()
    .typeError("Discount value must be a number")
    .positive("Discount value must be greater than 0")
    .required("Discount value is required")
    .when(["discountType"], {
      is: "PERCENTAGE",
      then: (schema) => schema.max(90, "Percentage discount cannot exceed 90%"),
      otherwise: (schema) => schema,
    }),

  minOrderAmount: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .min(0, "Minimum order amount cannot be negative"),

  maxDiscountAmount: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .min(0, "Maximum discount cannot be negative"),

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

  isActive: yup.boolean().required(),
});
