import * as yup from "yup"

export const addressLabel=()=> yup
.string()

export const fullName = () => yup
.string();

export const phoneNumber = () =>yup
.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits");

export const addressLine= ()=> yup
.string()

export const landmark = () => yup.string();

export const city = () => yup.string();

export const state = () => yup.string();

export const country = () => yup.string();

export const pincode = () =>
  yup.string().matches(/^[0-9]{6}$/, "Pincode must be 6 digits");
