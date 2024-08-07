import { ProfileInfo, ProfileViewTabs } from '@/features/profile'
import { serverApi } from '@/server'
import { notFound } from 'next/navigation'

const MyProfilePage = async () => {
	const user = await serverApi.users.getCurrent()

	if (!user) {
		return notFound()
	}

	return (
		<div>
			<ProfileInfo initialUser={user}  />
			<ProfileViewTabs  />
		</div>
	)
}

export default MyProfilePage
