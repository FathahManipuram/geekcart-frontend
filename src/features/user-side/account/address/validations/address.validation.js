import { addressLabel, addressLine, city, country, fullName, landmark, phoneNumber, pincode, state } from "@/shared/validations/address.base"
import * as yup from "yup"

export const addressSchema = yup.object({
  addressLabel: addressLabel().required("Address label is required"),
  fullName: fullName().required("Full name is required"),
  phoneNumber: phoneNumber().required("Phone number is required"),
  addressLine: addressLine().required("Address is required"),
  landmark: landmark().required("Landmark is required"),
  city: city().required("City is required"),
  state: state().required("State is required"),
  country: country().required("Country is required"),
  pincode: pincode().required("Pincode is required"),
  isDefault: yup.boolean(),
});
