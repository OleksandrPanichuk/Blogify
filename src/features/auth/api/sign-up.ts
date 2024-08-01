'use server'

import { lucia } from '@/auth'
import { SignUpInput, hashPassword, signUpSchema } from '@/features/auth'
import { db } from '@/lib'
import { cookies } from 'next/headers'

export async function signUp(input: SignUpInput) {
	try {
		const parsedValue = signUpSchema.safeParse(input)
		if (!parsedValue.success) {
			throw new Error(parsedValue.error.message)
		}
		const { email, password, username, name } = parsedValue.data

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
				name,
				hash: passwordHash,
			},
			select: {
				id: true,
				email: true,
				username: true,
				name: true,
				image: true,
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
	} catch (err) {
		if (err instanceof Error) {
			throw err
		}

		throw new Error('Something went wrong')
	}
}
