import * as yup from "yup"

export const addressLabel=()=> yup
.string()

export const fullName = () =>
  yup
    .string()
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, or apostrophes",
    )    
export const phoneNumber = () =>yup
.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits");

export const addressLine = () =>
  yup
    .string()
    .min(5, "Address line must be at least 5 characters")
    .max(50, "Address is too long");

export const landmark = () => yup.string().max(30, "Landmark is too long");

export const city = () =>
  yup
    .string()
    .min(2, "City name is too short")
    .max(30, "City name is too long");

export const state = () =>
  yup
    .string()
    .min(2, "State name is too short")
    .max(30, "State name is too long");

export const country = () =>
  yup
    .string()
    .min(2, "Country name is too short")
    .max(30, "Country name is too long");

export const pincode = () =>
  yup.string().matches(/^[0-9]{6}$/, "Pincode must be 6 digits");
