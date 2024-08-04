import {
	NotificationsFeed,
	NotificationTypeTabs,
} from '@/features/notifications'

const NotificationsPage = () => {
	return (
		<div>
			<NotificationTypeTabs />
			<NotificationsFeed />
		</div>
	)
}

export default NotificationsPage
