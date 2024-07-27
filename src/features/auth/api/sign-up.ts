'use server'

import { lucia } from '@/auth'
import { SignUpInput, hashPassword, signUpSchema } from '@/features/auth'
import { db } from '@/lib'
import { cookies } from 'next/headers'

export async function signUp(input: SignUpInput) {
	const parsedValue = signUpSchema.safeParse(input)
	if (!parsedValue.success) {
		throw new Error(parsedValue.error.message)
	}
	const { email, password, username } = parsedValue.data

	const existingUser = await db.user.findFirst({
		where: {
			OR: [
				{
					email,
				},
				{
					username,
				},
			],
		},
	})

	if (existingUser) {
		throw new Error('Credentials already in use')
	}

	const passwordHash = await hashPassword(password)

	const user = await db.user.create({
		data: {
			email,
			username,
			hash: passwordHash,
		},
	})

	const session = await lucia.createSession(user.id, {})
	const sessionCookie = lucia.createSessionCookie(session.id)

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	return user
}
