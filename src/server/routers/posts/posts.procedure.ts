import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { createPostSchema, deletePostSchema, getPostsSchema } from './posts.dto'
import { createPost, deletePost, getPosts } from './posts.service'

export const postsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createPostSchema)
		.mutation(({ input, ctx }) => createPost(input, ctx.user.id)),
	get: protectedProcedure
		.input(getPostsSchema)
		.query(({ input, ctx }) => getPosts(input, ctx.user.id)),
	delete: protectedProcedure.input(deletePostSchema).mutation(({ input, ctx }) =>
		deletePost(input, ctx.user.id)
	),
})
