import { createTRPCRouter, protectedProcedure } from '@/server/trpc'

export const usersRouter = createTRPCRouter({
	get: protectedProcedure.query(({ ctx }) => ctx.user),
})
