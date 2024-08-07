import { TAKE_COMMENTS } from '@/constants'
import { db } from '@/lib'
import { TRPCError } from '@trpc/server'
import {
	CreateCommentInput,
	DeleteCommentInput,
	GetCommentsComment,
	GetCommentsInput,
} from './comments.dto'

export const getComments = async (input: GetCommentsInput, userId: string) => {
	const limit = input.take ?? TAKE_COMMENTS
	const { cursor } = input

	const comments: GetCommentsComment[] = await db.comment.findMany({
		where: {
			postId: input.postId,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: limit + 1,
		cursor: cursor
			? {
					id: cursor,
			  }
			: undefined,
		include: {
			creator: {
				select: {
					id: true,
					username: true,
					name: true,
					image: true,
				},
			},
			likes: {
				where: {
					userId,
				},
				select: {
					id: true,
				},
			},
			_count: {
				select: {
					likes: true,
				},
			},
		},
	})

	let nextCursor: typeof cursor | undefined = undefined

	if (comments.length > limit) {
		const nextItem = comments.pop()
		nextCursor = nextItem!.id
	}
	return {
		comments,
		nextCursor,
	}
}

export const createComment = async (
	input: CreateCommentInput,
	userId: string
) => {
	const post = await db.post.findUnique({
		where: {
			id: input.postId
		}
	})

	if(!post) {
		throw new TRPCError({
			message:"Post to comment not found",
			code: 'NOT_FOUND'
		})
	}

	return await db.comment.create({
		data: {
			creatorId: userId,
			...input,
		},
	})
}


export const deleteComment = async (input: DeleteCommentInput, userId:string) => {
	return await db.comment.delete({
		where: {
			id: input.commentId,
			creatorId: userId,
			postId: input.postId
		}
	})
}