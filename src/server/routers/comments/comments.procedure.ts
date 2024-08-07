import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import {
	createCommentSchema,
	deleteCommentSchema,
	getCommentsSchema,
} from './comments.dto'
import { createComment, deleteComment, getComments } from './comments.service'

export const commentsRouter = createTRPCRouter({
	get: protectedProcedure
		.input(getCommentsSchema)
		.query(({ input, ctx }) => getComments(input, ctx.user.id)),
	create: protectedProcedure
		.input(createCommentSchema)
		.mutation(({ input, ctx }) => createComment(input, ctx.user.id)),
	delete: protectedProcedure
		.input(deleteCommentSchema)
		.mutation(({ input, ctx }) => deleteComment(input, ctx.user.id)),
})
