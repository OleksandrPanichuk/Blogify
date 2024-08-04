import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { followSchema } from './follows.dto'
import { follow, toggleFollow } from './follows.service'

export const followsRouter = createTRPCRouter({
	follow: protectedProcedure
		.input(followSchema)
		.mutation(({ input, ctx }) => follow(input, ctx.user)),
	toggle: protectedProcedure
		.input(followSchema)
		.mutation(({ input, ctx }) => toggleFollow(input, ctx.user)),
})
