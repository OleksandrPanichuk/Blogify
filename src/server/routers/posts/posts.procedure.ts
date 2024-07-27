import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { createPostSchema } from './posts.dto'
import { createPost } from './posts.service'

export const postsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createPostSchema)
		.mutation(({ input }) => createPost(input)),
})
