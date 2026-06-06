import * as yup from "yup";
import { CANCEL_REASONS } from "../constants/cancelReasons";

export const cancelOrderSchema = yup.object({
  reason: yup.string().oneOf(CANCEL_REASONS).required("Please select a reason"),

  customReason: yup.string().when("reason", {
    is: "Other",
    then: (schema) =>
      schema
        .trim()
        .required("Please enter a reason")
        .min(5, "Reason must be at least 5 characters")
        .max(50, "Reason must be less than 50 characters"),
    otherwise: (schema) => schema.strip(),
  }),
});
