import * as yup from "yup"

export const loginSchema= yup.object({
email: yup.string().email("Invalid email").required("Email is required"),
pasword: yup.string().min(8, "minimum 8 character").required("Password is required"),
})