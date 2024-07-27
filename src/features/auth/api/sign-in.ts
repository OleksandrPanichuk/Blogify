'use server'

import { lucia } from '@/auth'
import { SignInInput, signInSchema, verifyPasswords } from '@/features/auth'
import { db } from '@/lib'
import { cookies } from 'next/headers'

export async function signIn(input: SignInInput) {
	const parsedValue = signInSchema.safeParse(input)
	if (!parsedValue.success) {
		throw new Error(parsedValue.error.message)
	}
	const { email, password } = parsedValue.data

	const user = await db.user.findUnique({
		where: {
			email,
		},
	})
	if (!user) {
		throw new Error('Incorrect email or password')
	}
	const doPasswordsMatch = await verifyPasswords(password, user.hash)

	if (!doPasswordsMatch) {
		throw new Error('Incorrect email or password')
	}
	const session = await lucia.createSession(user.id, {})
	const sessionCookie = lucia.createSessionCookie(session.id)
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	return user
}
