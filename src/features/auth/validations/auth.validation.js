import * as yup from "yup"
import { confirmPasswordField, emailField, fullNameField, passwordFild } from "../../../shared/validations/base.validation"


//Login
export const loginSchema= yup.object({
email: emailField(),
password: yup
.string()
.required("Password is required")})

//Register
export const registerSchema = yup.object({
  fullName: fullNameField(),
  email: emailField(),
  password: passwordFild(),
  confirmPassword: confirmPasswordField("password"),
  referralCode: yup
    .string()
    .trim()
    .uppercase()
    .min(5, "Code is too short")
    .max(22, "Code is too long")
    .optional(),
});

//Forgot password
export const forgotPasswordSchema= yup.object({
	email: emailField(),
})

//Reset password
export const resetPasswordSchema= yup.object({
	password: passwordFild(),
	confirmPassword: confirmPasswordField("password")
})
