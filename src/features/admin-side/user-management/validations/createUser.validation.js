import { confirmPasswordField, emailField, fullNameField, passwordFild } from '@/shared/validations/base.validation'
import * as yup from 'yup'

export const createUserSchema= yup.object({
	fullName: fullNameField(),
	email: emailField(),
	password: passwordFild(),
	confirmPassword: confirmPasswordField(),
})