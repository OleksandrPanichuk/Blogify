import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { validateRequest } from '@/lib'
import { AuthProvider, TRPCProvider } from '@/providers'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Blogify',
	description:
		'A blog platform where you can share your thoughts and ideas with the world.',
}

const theme = createTheme({
	fontFamily: 'Inter, sans-serif',
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	const { user } = await validateRequest()


	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={inter.className}>
				<TRPCProvider>
					<AuthProvider initialUser={user}>
						<MantineProvider theme={theme} defaultColorScheme='auto'>
							<Notifications />
							{children}
						</MantineProvider>
					</AuthProvider>
				</TRPCProvider>
			</body>
		</html>
	)
}
