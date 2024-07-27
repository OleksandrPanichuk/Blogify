'use client'
import { useAuth } from '@/providers'

const Page = () => {
	const { user } = useAuth()
	return (
		<div>
			Main
			<p>{user?.username ?? 'No user'}</p>
		</div>
	)
}

export default Page
