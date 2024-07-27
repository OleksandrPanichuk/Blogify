import { ResetPasswordForm, verifyToken } from '@/features/auth'
import { notFound } from 'next/navigation'

interface Props {
	params: {
		token: string
	}
}
 const ResetPasswordPage = async ({ params: { token } }: Props) => {
	try {
		await verifyToken(token)
	} catch {
		return notFound()
	}
	return <ResetPasswordForm token={token} />
}

export default ResetPasswordPage