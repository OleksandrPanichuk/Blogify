import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { getUsersSchema } from './users.dto'
import { getUsers } from './users.service'

export const usersRouter = createTRPCRouter({
	getCurrent: protectedProcedure.query(({ ctx }) => ctx.user),
	get: protectedProcedure
		.input(getUsersSchema)
		.query(({ input, ctx }) => getUsers(input, ctx.user.id)),
})
