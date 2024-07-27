'use server'

import { createPasswordResetToken } from '@/features/auth'
import { db } from '@/lib'
import { mailer } from '@/lib/mailer'

export async function sendResetPasswordLink(toEmail: string) {
	try {
		const user = await db.user.findUnique({
			where: {
				email: toEmail,
			},
		})

		if (!user) {
			throw new Error('Unauthorized')
		}

		const verificationToken = await createPasswordResetToken(user.id)

		try {
			await mailer.sendResetPasswordLink(verificationToken, {
				to: toEmail,
			})
		} catch (err) {
			throw new Error('Failed to send email')
		}

		return {
			success: true,
		}
	} catch (err) {
		if (err instanceof Error) {
			throw err
		}

		throw new Error('Something went wrong')
	}
}
