import { db } from '@/lib'
import { LikeType, NotificationType } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { User } from 'lucia'
import type { ToggleLikeInput } from './likes.dto'

export const toggleLike = async (
	{ itemId, type }: ToggleLikeInput,
	user: User
) => {
	switch (type) {
		case LikeType.POST: {
			return await togglePostLike({ itemId }, user)
		}
		case LikeType.COMMENT: {
			return await toggleCommentLike({ itemId }, user)
		}
		default: {
			throw new TRPCError({
				message: 'Unhandled type',
				code: 'UNPROCESSABLE_CONTENT',
			})
		}
	}
}

async function togglePostLike(
	{ itemId: postId }: Omit<ToggleLikeInput, 'type'>,
	{ id: userId, username }: User
) {
	const post = await db.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			title: true,
			creator: {
				select: {
					id: true,
				},
			},
		},
	})

	if (!post) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'Post not found',
		})
	}

	const existingLike = await db.like.findFirst({
		where: {
			userId,
			postId,
			type: LikeType.POST,
		},
	})

	if (existingLike) {
		return await db.like.delete({
			where: {
				id: existingLike.id,
			},
		})
	}
	const like = await db.like.create({
		data: {
			userId,
			postId,
			type: LikeType.POST,
		},
	})

	await db.notification.create({
		data: {
			userId: post.creator.id,
			message: `@${username} liked your post "${post.title}"`,
			type: NotificationType.LIKE,
		},
	})

	return like
}

async function toggleCommentLike(
	{ itemId: commentId }: Omit<ToggleLikeInput, 'type'>,
	{ id: userId, username }: User
) {
	const comment = await db.comment.findUnique({
		where: {
			id: commentId,
		},
		include: {
			post: {
				select: {
					title: true,
				},
			},
		},
	})

	if (!comment) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'Comment not found',
		})
	}

	const existingLike = await db.like.findFirst({
		where: {
			userId,
			commentId,
			type: LikeType.COMMENT,
		},
	})

	if (existingLike) {
		return await db.like.delete({
			where: {
				id: existingLike.id,
			},
		})
	}
	const like = await db.like.create({
		data: {
			userId,
			commentId,
			type: LikeType.COMMENT,
		},
	})

	await db.notification.create({
		data: {
			userId: comment.creatorId,
			message: `@${username} liked your comment at post: "${comment.post.title}"`,
			type: NotificationType.LIKE,
		},
	})

	return like
}
