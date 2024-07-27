import { APP_URL } from '@/constants'
import { Body, Head, Heading, Html, Link, Text } from '@react-email/components'

export const ResetPasswordTemplate = ({ token }: { token: string }) => {
	const link = APP_URL + '/reset-password/' + token
	return (
		<Html>
			<Head>
				<title>Blogify, Reset password</title>
			</Head>
			<Body>
				<Heading
					as='h1'
					style={{ fontSize: '32px', fontWeight: 700, marginBottom: '40px' }}
				>
					Forgot password?
				</Heading>
				<Text style={{ marginBottom: '40px' }}>
					Click the following link to reset your password:
				</Text>
				<Text
					style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}
				>
					<Link href={link} target='_blank'>
						Click here
					</Link>
				</Text>
				<Text style={{ marginBottom: '60px' }}>
					To protect your account, do not share this link with anyone.
				</Text>
				<Text style={{ marginTop: '40px' }}>{"Didn't request this?"}</Text>
				<Text>
					{"If you didn't make this request, you can safely ignore this email."}
				</Text>
			</Body>
		</Html>
	)
}
