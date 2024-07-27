'use client'
import { useAuth } from '@/providers'
import { Box } from '@mantine/core'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()

	if (user) {
		return redirect('/')
	}
	return (
		<Box className='flex items-center justify-center min-h-screen'>
			{children}
		</Box>
	)
}

export default AuthLayout
