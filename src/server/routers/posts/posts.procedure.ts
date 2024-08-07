import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import {
	createPostSchema,
	deletePostSchema,
	getPostByIdSchema,
	getPostsSchema,
	updatePostSchema,
} from './posts.dto'
import {
	createPost,
	deletePost,
	getFullPost,
	getPostByIdWithTags,
	getPosts,
	updatePost,
} from './posts.service'

export const postsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createPostSchema)
		.mutation(({ input, ctx }) => createPost(input, ctx.user.id)),
	update: protectedProcedure
		.input(updatePostSchema)
		.mutation(({ input, ctx }) => updatePost(input, ctx.user.id)),
	get: protectedProcedure
		.input(getPostsSchema)
		.query(({ input, ctx }) => getPosts(input, ctx.user.id)),
	delete: protectedProcedure
		.input(deletePostSchema)
		.mutation(({ input, ctx }) => deletePost(input, ctx.user.id)),
	getByIdWithTags: protectedProcedure
		.input(getPostByIdSchema)
		.query(({ input, ctx }) => getPostByIdWithTags(input, ctx.user.id)),
	getFullPost: protectedProcedure
		.input(getPostByIdSchema)
		.query(({ input, ctx }) => getFullPost(input, ctx.user.id)),
})
