import * as yup from "yup"


const emailValidation = yup
	.string()
	.email("Enter a valid email")
	.max(100, "Email is too long")
	.required("Email is required")

const passwordValidation= yup
	.string()
	.min(8, "Minimum 8 characters")
	.matches(/[a-z]/, "Must contain at least one lowercase letter")
	.matches(/[A-Z]/,  "Must contain at least one uppercase letter")
	.matches(/[0-9]/,  "Must contain at least one number")
	.matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)")
	.max(16, "Maximum characters 16")
	.required("Password is required")


export const loginSchema= yup.object({
email: yup
	.string()
	.email("Enter a valid email")
	.required("Email is required"),
password: yup
.string().min(8, "Minimum 8 character").required("Password is required")
})



export const registerSchema= yup.object({
	fullName:yup
	.string()
	.min(3, "Minimum 3 characters")
	.max(30, "Maximum 30 characters")
	.required("Full name is required"),

	email: emailValidation,

	password: passwordValidation,

	confirmPassword: yup
	.string()
	.oneOf([yup.ref("password")], "Password must match")
	.required("Confirm your password"),

})

export const forgotPasswordSchema= yup.object({
	email: emailValidation,
})