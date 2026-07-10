import * as yup from "yup";

export const emailField = () =>
  yup
    .string()
    .email("Enter a valid email")
    .lowercase()
    .trim()
    .max(100, "Email is too long")
    .required("Email is required");

export const passwordFild = () =>
  yup
    .string()
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Must contain at least one special character (@$!%*?&)",
    )
    .min(8, "Minimum 8 characters")
    .max(16, "Maximum characters 16")
    .required("Password is required");

export const confirmPasswordField = (ref = "password") =>
  yup
    .string()
    .oneOf([yup.ref(ref)], "Password must match")
    .required("Confirm your password");

export const fullNameField = () =>
  yup
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters")
    .required("Full name is required");

export const phoneNumberField = () =>
  yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
    .nullable()
    .transform((value) => (value === "" ? null : value));

export const genderField = () =>
  yup
    .string()
    .oneOf(["male", "female"], "Select a valid gender")
    .nullable()
    .transform((value) => (value === "" ? null : value));

export const dateOfBirthField = () =>
  yup
    .date()
    .max(new Date(), "Date cannot be in the future")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value));

//Category validation
export const categoryName = () =>
  yup
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters");

//SubCategory

const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageField = () =>
  yup.mixed().test("required", "Image is required", (value) => {
    if (typeof value === "string" && value.trim() !== "") {
      return true;
    }

    if (value instanceof File) {
      return true;
    }

    return false;
  });

//Product
export const productName = () =>
  yup
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(150, "Product name must not exceed 150 characters");

export const description = () =>
  yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters");

export const fabric = () => yup.string().trim();

export const images = () => yup.array().of(yup.mixed().required()).default([]);

//Variant
export const sizes = () => yup.array().of(yup.string());

export const size = () => yup.string().trim();

export const color = () => yup.string().trim();

export const sku = () => yup.string().trim();

export const stock = () =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number");
//.min(1, "Stock must be at least 1");

export const price = () =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Price must be a number")
    .moreThan(0, "Price must be greater than 0");

export const costPrice = () =>
  yup
    .number()
    .typeError("Cost price must be a number")
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? null : value,
    )
    .min(0, "Cost price cannot be negative");

export const lowStockThreshold = () =>
  yup
    .number()
    .typeError("Low stock threshold must be a number")
    .integer("Low stock threshold must be a whole number")
    .min(0, "Low stock threshold cannot be negative");

export const sleeve = () => yup.string().trim();
