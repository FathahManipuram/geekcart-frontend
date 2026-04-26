import * as yup from "yup"

export const loginSchema= yup.object({
email: yup.string().email("Invalid email").required("Email is required"),
password: yup.string().min(8, "minimum 8 character").required("Password is required"),
})


export const registerSchema= yup.object({
	fullName:yup
	.string()
	.min(3, "Minimum 3 characters")
	.max(25, "Maximum 25 characters")
	.required("Full name is required"),

	email: yup
	.string()
	.email("Invalid email")
	.required("Email is required"),

	password: yup
	.string()
	.min(8, "Minimum 8 characters")
	.max(16, "Maximum characters 16")
	.required("Password is required"),

	confirmPassword: yup
	.string()
	.oneOf([yup.ref("password")], "Password must match")
	.required("Confirm your password"),

})