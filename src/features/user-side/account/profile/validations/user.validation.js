import { confirmPasswordField, dateOfBirthField, emailField, fullNameField, genderField, passwordFild, phoneNumberField } from '@/shared/validations/base.validation'
import * as yup from 'yup'

export const profileSchema= yup.object({
fullName:fullNameField(),
phoneNumber: phoneNumberField(),
gender: genderField(),
dateOfBirth: dateOfBirthField(),
})

//Email change
export const emailChangeValidation= yup.object({
	email: emailField(),
})

// Change password
export const changePasswordSchema = (isGoogleUser)=> yup.object({
	oldPassword: isGoogleUser ? yup
	.string().notRequired()
	: yup.string().required("Old password required"),
	newPassword: passwordFild(),
	confirmPassword: confirmPasswordField("newPassword"),
})