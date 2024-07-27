import { ResetPasswordTemplate } from '@/components/templates'
import { render } from '@react-email/render'
import { SendMailOptions, Transporter, createTransport } from 'nodemailer'

type SendEmailOptions = Omit<SendMailOptions, 'html'>

class Mailer {
	private transporter: Transporter

	constructor() {
		this.transporter = createTransport({
			host: process.env.MAIL_HOST,
			secure: true,
			port: parseInt(process.env.MAIL_PORT ?? ''),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
			from: process.env.MAIL_FROM,
		})
		this.verifyTransporter()
	}
	private verifyTransporter() {
		if (!this.transporter.verify) return
		this.transporter.verify()
	}

	private async sendEmail(html: string, options?: SendEmailOptions) {
		return await this.transporter.sendMail({
			html,
			...options,
		})
	}

	public async sendResetPasswordLink(
		token: string,
		options?: SendEmailOptions
	) {
		const html = render(<ResetPasswordTemplate token={token} />)
		return await this.sendEmail(html, options)
	}
}

export const mailer = new Mailer()
