'use client'
import { ColorSchemeSelect } from '@/components'
import { useAuth } from '@/providers'
import { Button } from '@mantine/core'
import Link from 'next/link'

const Page = () => {
	const { user } = useAuth()
	return (
		<div>
			<ColorSchemeSelect />
			{!user && (
				<Button component={Link} href={'/sign-in'}>
					Sign In
				</Button>
			)}
			<p>{user?.username ?? 'No user'}</p>
		</div>
	)
}

export default Page
