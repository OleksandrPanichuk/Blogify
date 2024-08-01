import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { toggleBookmarkSchema } from './bookmarks.dto'
import { toggleBookmark } from './bookmarks.service'

export const bookmarksRouter = createTRPCRouter({
	toggle: protectedProcedure
		.input(toggleBookmarkSchema)
		.mutation(({ input, ctx }) => toggleBookmark(input, ctx.user.id)),
})
