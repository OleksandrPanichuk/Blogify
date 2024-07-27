import { Box } from '@mantine/core'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<Box className='flex items-center justify-center min-h-screen'>
			{children}
		</Box>
	)
}

export default AuthLayout
