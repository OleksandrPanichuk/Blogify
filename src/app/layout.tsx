import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Notifications} from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Blogify',
	// Provide me with a description for my website(blog)
	description:
		'A blog platform where you can share your thoughts and ideas with the world.',
}

const theme = createTheme({
	fontFamily: 'Inter, sans-serif',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={inter.className}>
				<MantineProvider theme={theme} defaultColorScheme='auto'>
					<Notifications /> 
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
