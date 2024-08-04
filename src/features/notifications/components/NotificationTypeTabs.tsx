'use client'

import { useNotificationsStore } from '@/features/notifications'
import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { NotificationType } from '@prisma/client'

export const NotificationTypeTabs = () => {
	const { type, setType } = useNotificationsStore()
	return (
		<Tabs
			value={type}
			onChange={val => setType(val as 'ALL' | NotificationType)}
		>
			<TabsList>
				<TabsTab value={'ALL'}>All</TabsTab>
				<TabsTab value={NotificationType.LIKE}>Likes</TabsTab>
				<TabsTab value={NotificationType.COMMENT}>Comments</TabsTab>
				<TabsTab value={NotificationType.FOLLOW}>Follows</TabsTab>
				<TabsTab value={NotificationType.UNFOLLOW}>Unfollows</TabsTab>
				<TabsTab value={NotificationType.REPLY}>Replies</TabsTab>
			</TabsList>
		</Tabs>
	)
}
