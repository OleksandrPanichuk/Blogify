/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['bcryptjs', 'nodemailer'],
	},
}

export default nextConfig
