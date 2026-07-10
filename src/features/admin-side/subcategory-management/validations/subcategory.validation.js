import { categoryName, imageField } from "@/shared/validations/base.validation";
import * as yup from "yup";

export const createSubcategorySchema = yup.object({
  name: categoryName().required("Category name is required"),
  category: yup.string().trim().required("Please select a category"),
  image: imageField().required("Image is required"),
});

export const updateSubcategorySchema = yup.object({
  name: categoryName().optional(),
  category: yup.string().trim().optional(),
  image: yup.mixed().nullable().notRequired(),
  isActive: yup.boolean().optional(),
});
