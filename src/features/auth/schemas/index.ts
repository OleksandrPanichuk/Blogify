import { FormErrors } from '@/constants'
import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string({ required_error: FormErrors.required.email })
		.trim()
		.min(1, FormErrors.required.email)
		.email(FormErrors.invalid.email),
	password: z
		.string({ required_error: FormErrors.required.password })
		.trim()
		.min(1, FormErrors.required.password)
		.min(8, FormErrors.length.password),
})

export const signUpSchema = signInSchema.merge(
	z.object({
		username: z
			.string({ required_error: FormErrors.required.username })
			.trim()
			.min(1, FormErrors.required.username),
	})
)

export const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: FormErrors.required.email })
		.trim()
		.min(1, FormErrors.required.email)
		.email(FormErrors.invalid.email),
})

export const resetPasswordSchema = z
	.object({
		password: z
			.string({ required_error: FormErrors.required.password })
			.trim()
			.min(1, FormErrors.required.password)
			.min(8, FormErrors.length.password),
		confirmPassword: z
			.string({ required_error: FormErrors.required.password })
			.trim()
			.min(1, FormErrors.required.password),
	})
	.refine(data => data.confirmPassword === data.password, {
		message: FormErrors.match.passwords,
		path: ['confirmPassword'],
	})
