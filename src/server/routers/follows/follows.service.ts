import { db } from '@/lib'
import { TRPCError } from '@trpc/server'
import type { FollowInput, ToggleFollowInput } from './follows.dto'

export const follow = async (
	{ followingId }: FollowInput,
	followerId: string
) => {
	const isAlreadyFollowed = await db.follower.findFirst({
		where: {
			followerId,
			followingId,
		},
	})

	if (isAlreadyFollowed) {
		throw new TRPCError({
			message: 'Already followed',
			code: 'CONFLICT',
		})
	}

	return await db.follower.create({
		data: {
			followerId,
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
}

export const toggleFollow = async (
	{ followingId }: ToggleFollowInput,
	followerId: string
) => {
	const existingFollow = await db.follower.findFirst({
		where: {
			followerId,
			followingId,
		},
	})

	if (existingFollow) {
		return await db.follower.delete({
			where: {
				id: existingFollow.id,
			},
		})
	}

	return await db.follower.create({
		data: {
			followerId,
			followingId,
		},
	})
}
