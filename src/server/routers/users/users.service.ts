import { TAKE_USERS } from '@/constants'
import { db } from '@/lib'
import { deleteFile } from '@/server/uploadthing'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import type {
	FullUser,
	GetUsersInput,
	GetUsersResponse,
	UpdateUserAvatarInput,
	UpdateUserInput,
} from './users.dto'

export async function getFullUser(username: string): Promise<FullUser | null> {
	return await db.user.findUnique({
		where: {
			username,
		},
		include: {
			followers: {
				where: {
					follower: {
						username,
					},
				},
				select: {
					id: true,
				},
			},
			_count: {
				select: {
					followers: true,
					following: true,
				},
			},
		},
	})
}

export async function getUsers(
	input: GetUsersInput,
	userId: string
): Promise<GetUsersResponse> {
	const limit = input.take ?? TAKE_USERS
	const { cursor } = input
	let orderBy: Prisma.UserOrderByWithRelationInput | undefined

	if (input.sortBy) {
		switch (input.sortBy) {
			case 'followers': {
				orderBy = {
					followers: {
						_count: input.sortOrder ?? 'desc',
					},
				}
				break
			}
			case 'username': {
				orderBy = {
					username: input.sortOrder ?? 'asc',
				}
				break
			}
			case 'name': {
				orderBy = {
					name: input.sortOrder ?? 'asc',
				}
				break
			}
			default: {
				orderBy = undefined
				break
			}
		}
	}

	const users = await db.user.findMany({
		where: {
			id: {
				not: userId,
			},
			OR: input.searchValue
				? [
						{
							username: {
								contains: input.searchValue,
								mode: 'insensitive',
							},
						},
						{
							name: {
								contains: input.searchValue,
								mode: 'insensitive',
							},
						},
				  ]
				: undefined,
			followers: input.onlyUnfollowed
				? {
						none: {
							followerId: userId,
						},
				  }
				: undefined,
			...(input.takeFollowers && {
				following: {
					some: {
						followingId: userId,
					},
				},
			}),
			...(input.takeFollowing && {
				followers: {
					some: {
						followerId: userId,
					},
				},
			}),
		},
		orderBy,
		take: cursor ? limit + 1 : limit,
		include: {
			_count: {
				select: {
					followers: true,
				},
			},
			followers: {
				where: {
					followerId: userId,
				},
				select: {
					id: true,
				},
			},
		},
		cursor: cursor
			? {
					id: cursor,
			  }
			: undefined,
	})

	let nextCursor: typeof cursor | undefined = undefined

	if (users.length > limit) {
		const nextItem = users.pop()
		nextCursor = nextItem!.id
	}
	return {
		users,
		nextCursor,
	}
}

export async function updateUserAvatar(
	input: UpdateUserAvatarInput,
	userId: string
) {
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new TRPCError({
			message: 'User not found',
			code: 'NOT_FOUND',
		})
	}

	if (user.image && input.image !== user.image) {
		await deleteFile(user.image)
	}

	return await db.user.update({
		where: {
			id: userId,
		},
		data: input
	})
}

export async function updateUser(input: UpdateUserInput, userId: string) {
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	})

	if (!user) {
		throw new TRPCError({
			message: 'User not found',
			code: 'NOT_FOUND',
		})
	}

	const existingUserWithNewUsername = await db.user.findUnique({
		where: {
			username: input.username,
		},
	})

	if (
		existingUserWithNewUsername &&
		existingUserWithNewUsername.id !== userId
	) {
		throw new TRPCError({
			message: 'Username already in use',
			code: 'CONFLICT',
		})
	}

	return await db.user.update({
		where: {
			id: userId,
		},
		data: input,
	})
}
