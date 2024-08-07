import { Feed } from '@/components'
import { ProfileInfo, ProfileViewTabs } from '@/features/profile'
import { validateRequest } from '@/lib'
import { serverApi } from '@/server'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		username: string
	}
}

const ProfilePage = async ({ params }: Props) => {
	const username = params.username.slice(3)
	console.log(username)
	const { user: currentUser } = await validateRequest()
	const user = await serverApi.users.getFullUser({ username })

	if (!user) {
		return notFound()
	}

	if (user.id !== currentUser?.id) {
		return (
			<div>
				<ProfileInfo initialUser={user} />
				<Feed creatorId={user.id} />
			</div>
		)
	}

	return (
		<div>
			<ProfileInfo initialUser={user} />
			<ProfileViewTabs />
		</div>
	)
}

export default ProfilePage
