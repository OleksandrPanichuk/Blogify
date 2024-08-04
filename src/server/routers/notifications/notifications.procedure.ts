import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { getNotifications, getUnseenNotificationsCount } from './notifications.service'
import { getNotificationsSchema } from './notifications.dto'

export const notificationsRouter = createTRPCRouter({
	getUnseenCount: protectedProcedure.query(({ ctx }) =>
		getUnseenNotificationsCount(ctx.user.id)
	),
	get: protectedProcedure.input(getNotificationsSchema).query(({ ctx, input }) =>
		getNotifications(input, ctx.user.id)
	),
})
