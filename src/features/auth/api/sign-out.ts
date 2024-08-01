'use server'

import { lucia } from '@/auth'
import { validateRequest } from '@/lib'
import { cookies } from 'next/headers'

export async function signOut() {
	const { session } = await validateRequest()
	if (!session) {
		return {
			error: 'Unauthorized',
		}
	}

	await lucia.invalidateSession(session.id)

	const sessionCookie = lucia.createBlankSessionCookie()
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)
}
