import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import {
	getUserSchema,
	getUsersSchema,
	updateUserAvatarSchema,
	updateUserSchema,
} from './users.dto'
import {
	getFullUser,
	getUsers,
	updateUser,
	updateUserAvatar,
} from './users.service'

export const usersRouter = createTRPCRouter({
	getCurrent: protectedProcedure.query(({ ctx }) =>
		getFullUser(ctx.user.username)
	),
	getFullUser: protectedProcedure
		.input(getUserSchema)
		.query(({ input }) => getFullUser(input.username)),
	get: protectedProcedure
		.input(getUsersSchema)
		.query(({ input, ctx }) => getUsers(input, ctx.user.id)),
	update: protectedProcedure
		.input(updateUserSchema)
		.mutation(({ input, ctx }) => updateUser(input, ctx.user.id)),
	updateAvatar: protectedProcedure
		.input(updateUserAvatarSchema)
		.mutation(({ input, ctx }) => updateUserAvatar(input, ctx.user.id)),
})
