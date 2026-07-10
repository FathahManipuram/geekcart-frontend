import { categoryName } from "@/shared/validations/base.validation.js";
import * as yup from "yup";
export const addCategorySchema = yup.object({
  name: categoryName().required("Category name is required"),
});

export const updateCategorySchema = yup.object({
  name: categoryName().optional(),
  isActive: yup.boolean().optional(),
});
