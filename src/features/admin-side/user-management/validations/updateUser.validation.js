import { emailField, fullNameField } from "@/shared/validations/base.validation.js"
import * as yup from "yup"
export const updateUserSchema= yup.object({
	fullName: fullNameField(),
	email: emailField(),
	role: yup.string().oneOf(["user", "admin"],"invalid role").default("user")
})