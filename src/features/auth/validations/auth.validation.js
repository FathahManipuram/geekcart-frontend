import * as yup from "yup"


const emailValidation = yup
	.string()
	.email("Enter a valid email")
	.max(100, "Email is too long")
	.required("Email is required")

const passwordValidation= yup
	.string()
	.matches(/[a-z]/, "Must contain at least one lowercase letter")
	.matches(/[A-Z]/,  "Must contain at least one uppercase letter")
	.matches(/[0-9]/,  "Must contain at least one number")
	.matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)")
	.min(8, "Minimum 8 characters")
	.max(16, "Maximum characters 16")
	.required("Password is required")

const confirmPasswordValidation= yup
 	.string()
	.oneOf([yup.ref("password")], "Password must match")
	.required("Confirm your password")



//Login
export const loginSchema= yup.object({
email: emailValidation,
password: yup
.string()
.required("Password is required")
})


//Register
export const registerSchema= yup.object({
	fullName:yup
	.string()
	.min(3, "Minimum 3 characters")
	.max(30, "Maximum 30 characters")
	.required("Full name is required"),

	email: emailValidation,

	password: passwordValidation,

	confirmPassword: confirmPasswordValidation,
})


//Forgot password
export const forgotPasswordSchema= yup.object({
	email: emailValidation,
})

//Reset password
export const resetPasswordSchema= yup.object({
	password: passwordValidation,
	confirmPassword: confirmPasswordValidation
})