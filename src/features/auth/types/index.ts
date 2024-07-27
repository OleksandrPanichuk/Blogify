import { forgotPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema } from '@/features/auth'
import { z } from 'zod'

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>