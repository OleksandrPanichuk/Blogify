import { db } from '@/lib'
import { NotificationType } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { User } from 'lucia'
import type { ToggleLikeInput } from './likes.dto'

export const toggleLike = async (
	{ postId }: ToggleLikeInput,
	{ id: userId, username }: User
) => {
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
			type: 'POST',
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
			type: 'POST',
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
