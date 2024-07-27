'use server'

import { lucia } from '@/auth'
import {
	ResetPasswordInput,
	hashPassword,
	resetPasswordSchema,
	verifyToken,
} from '@/features/auth'
import { db } from '@/lib'
import { cookies } from 'next/headers'

export async function resetPassword(input: ResetPasswordInput, token: string) {
	const parsedValue = resetPasswordSchema.safeParse(input)
	if (!parsedValue.success) {
		throw new Error(parsedValue.error.message)
	}
	const { password } = parsedValue.data

	const { userId } = await verifyToken(token, true)

	const hash = await hashPassword(password)

	const user = await db.user.update({
		where: {
			id: userId,
		},
		data: {
			hash,
		},
	})

	const session = await lucia.createSession(userId, {})
	const sessionCookie = lucia.createSessionCookie(session.id)

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	return user
}
