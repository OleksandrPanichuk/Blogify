import { TAKE_NOTIFICATIONS } from '@/constants'
import { db } from '@/lib'
import { GetNotificationsInput } from './notifications.dto'

export const getUnseenNotificationsCount = async (userId: string) => {
	return await db.notification.count({
		where: {
			userId,
			seen: false,
		},
	})
}

export const getNotifications = async (
	input: GetNotificationsInput,
	userId: string
) => {
	const limit = input.take ?? TAKE_NOTIFICATIONS
	const { cursor } = input

	const notifications = await db.notification.findMany({
		where: {
			type: input.type,
			userId,
		},

		orderBy: {
			createdAt: 'desc',
		},
		take: limit + 1,
		cursor: cursor
			? {
					id: cursor,
			  }
			: undefined,
	})
	let nextCursor: typeof cursor | undefined = undefined

	if (notifications.length > limit) {
		const nextItem = notifications.pop()
		nextCursor = nextItem!.id
	}

	const unseenNotifications = notifications.filter(n => !n.seen)

	if (unseenNotifications.length > 0) {
		await db.notification.updateMany({
			where: {
				userId,
				seen: false,
				// id: {
				// 	in: unseenNotifications.map(n => n.id),
				// },
			},
			data: {
				seen: true,
			},
		})
	}

	return {
		notifications,
		nextCursor,
	}
}
