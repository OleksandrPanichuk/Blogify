import { createTRPCRouter, protectedProcedure } from '@/server'

export const usersRouter = createTRPCRouter({
	get: protectedProcedure.query(({ ctx }) => ctx.user),
})
