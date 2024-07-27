'use server'

import { lucia } from '@/auth'
import { db } from '@/lib'
import { isWithinExpirationDate } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export async function verifyToken(
	verificationToken: string,
	deleteToken: boolean = false
) {
	const tokenHash = encodeHex(
		await sha256(new TextEncoder().encode(verificationToken))
	)
	const token = await db.passwordResetToken.findFirst({
		where: {
			tokenHash,
		},
	})

	if (token && deleteToken) {
		await db.passwordResetToken.delete({
			where: {
				id: token.id,
			},
		})
	}
	if (!token || !isWithinExpirationDate(token.expiresAt)) {
		throw new Error('Invalid token')
	}

	await lucia.invalidateUserSessions(token.userId)

	return {
		userId: token.userId,
	}
}
