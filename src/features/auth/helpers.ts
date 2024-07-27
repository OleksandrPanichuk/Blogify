import { db } from '@/lib'
import { compare, genSalt, hash } from 'bcryptjs'
import { generateIdFromEntropySize } from 'lucia'
import { TimeSpan, createDate } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export async function createPasswordResetToken(
	userId: string
): Promise<string> {
	await db.passwordResetToken.deleteMany({ where: { userId } })
	const tokenId = generateIdFromEntropySize(25) // 40 character
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)))
	await db.passwordResetToken.create({
		data: {
			tokenHash: tokenHash,
			userId: userId,
			expiresAt: createDate(new TimeSpan(2, 'h')),
		},
	})
	return tokenId
}

export async function hashPassword(password: string) {
	const salt = await genSalt(10)
	return await hash(password, salt)
}

export async function verifyPasswords(password: string, hash: string) {
	return await compare(password, hash)
}
