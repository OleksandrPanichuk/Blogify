import { db } from '@/lib'
import { NotificationType } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { User } from 'lucia'
import type {
	FollowInput,
	ToggleFollowInput,
	ToggleFollowResponse,
} from './follows.dto'

export const follow = async ({ followingId }: FollowInput, follower: User) => {
	const isAlreadyFollowed = await db.follower.findFirst({
		where: {
			followerId: follower.id,
			followingId,
		},
	})

	if (isAlreadyFollowed) {
		throw new TRPCError({
			message: 'Already followed',
			code: 'CONFLICT',
		})
	}

	const follow = await db.follower.create({
		data: {
			followerId: follower.id,
			followingId,
		},
		include: {
			following: {
				select: {
					name: true,
				},
			},
		},
	})

	await db.notification.create({
		data: {
			userId: followingId,
			message: `@${follower.username} followed you`,
			type: NotificationType.FOLLOW,
		},
	})

	return follow
}

export const toggleFollow = async (
	{ followingId }: ToggleFollowInput,
	follower: User
): Promise<ToggleFollowResponse> => {
	const existingFollow = await db.follower.findFirst({
		where: {
			followerId: follower.id,
			followingId,
		},
	})

	if (existingFollow) {
		const deletedFollow = await db.follower.delete({
			where: {
				id: existingFollow.id,
			},
			include: {
				following: {
					select: {
						name: true,
					},
				},
			},
		})

		await db.notification.create({
			data: {
				userId: followingId,
				message: `@${follower.username} unfollowed you`,
				type: NotificationType.UNFOLLOW,
			},
		})

		return {
			data: deletedFollow,
			type: 'unfollow',
		}
	}

	const follow = await db.follower.create({
		data: {
			followerId: follower.id,
			followingId,
		},
		include: {
			following: {
				select: {
					name: true,
				},
			},
		},
	})

	await db.notification.create({
		data: {
			userId: followingId,
			message: `@${follower.username} followed you`,
			type: NotificationType.FOLLOW,
		},
	})

	return {
		data: follow,
		type: 'follow',
	}
}
