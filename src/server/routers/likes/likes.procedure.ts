import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { toggleLikeSchema } from './likes.dto'
import { toggleLike } from './likes.service'

export const likesRouter = createTRPCRouter({
	toggle: protectedProcedure
		.input(toggleLikeSchema)
		.mutation(({ input, ctx }) => toggleLike(input, ctx.user.id)),
})
