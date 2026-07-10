import * as yup from "yup";
import { RETURN_REASONS } from "../constants/returnReasons";

export const returnOrderSchema = yup.object({
  reason: yup
    .string()
    .required("Please select a reason")
    .oneOf(RETURN_REASONS, "Please select a valid reason"),

  customReason: yup.string().when("reason", {
    is: "Other",
    then: (schema) =>
      schema
        .trim()
        .required("Please enter a reason")
        .min(5, "Reason must be at least 5 characters")
        .max(100, "Reason must be less than 100 characters"),
    otherwise: (schema) => schema.strip(),
  }),
});
