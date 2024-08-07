'use client'

import { Feed, UsersFeed } from '@/components'
import { PostsProvider } from '@/providers'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core'
import { useProfileStore } from '../store'

export const ProfileViewTabs = () => {
	const user = useProfileStore(s => s.user)
	return (
		<Tabs defaultValue='posts' keepMounted={false}>
			<TabsList>
				<TabsTab value='posts'>Posts</TabsTab>
				<TabsTab value='liked'>Liked</TabsTab>
				<TabsTab value='followers'>Followers</TabsTab>
				<TabsTab value='following'>Following</TabsTab>
			</TabsList>

			<TabsPanel value='posts'>
				<PostsProvider>
					<Feed creatorId={user?.id} />
				</PostsProvider>
			</TabsPanel>
			<TabsPanel value='liked'>
				<PostsProvider>
					<Feed liked />
				</PostsProvider>
			</TabsPanel>
			<TabsPanel value='followers'>
				<UsersFeed sortBy='name' takeFollowers />
			</TabsPanel>
			<TabsPanel value='following'>
				<UsersFeed sortBy='name' takeFollowing />
			</TabsPanel>
		</Tabs>
	)
}
