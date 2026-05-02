import * as yup from 'yup'

export const profileSchema= yup.object({
fullName:yup
	.string()
	.min(3, "Minimum 3 characters")
	.max(30, "Maximum 30 characters"),

phoneNumber: yup
.string()
.matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
.nullable(),

gender: yup.
string()
.oneOf(["male", "female"], "Select a valid gender")
// .transform((value)=> (value==="" ? null : value))
.nullable(),

dateOfBirth: yup
.date()
.max(new Date(), "Date cannot be in the future")
.nullable()
})

