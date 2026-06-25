import * as yup from "yup";

const strongTextRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9\s\-_.,@()!%]*$/;

export const offerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Offer name is required")
    .min(3, "Offer name must be at least 3 characters")
    .max(30)
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
    .max(150)
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
    .oneOf(["Product", "Category", "Subcategory"], "Invalid offer type")
    .required("Offer type is required"),

  targetId: yup.string().required("Please select a target"),

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

  maxDiscountAmount: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .when("discountType", {
      is: "PERCENTAGE",
      then: (schema) =>
        schema
          .required("Maximum discount is required")
          .moreThan(0, "Maximum discount must be greater than 0"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),

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





export const updateOfferSchema = offerSchema.clone().shape({
  name: offerSchema.fields.name.notRequired(),
  description: offerSchema.fields.description.notRequired(),
  offerType: offerSchema.fields.offerType.notRequired(),
  targetId: offerSchema.fields.targetId.notRequired(),
  discountType: offerSchema.fields.discountType.notRequired(),
  discountValue: offerSchema.fields.discountValue.notRequired(),
  maxDiscountAmount: offerSchema.fields.maxDiscountAmount.notRequired(),
  isActive: offerSchema.fields.isActive.notRequired(),


  startDate: yup.date().notRequired(),

  expiryDate: yup
    .date()
    .notRequired()
    .test(
      "expiry-after-start",
      "Expiry date must be on or after the start date",
      function (value) {
        const { startDate } = this.parent;

        if (!value || !startDate) return true;

        return new Date(value) >= new Date(startDate);
      },
    ),
});