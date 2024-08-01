import { db } from '@/lib'
import { Prisma } from '@prisma/client'
import { GetUsersInput } from './users.dto'

export async function getUsers(input: GetUsersInput, userId: string) {
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
					username: input.sortOrder ?? 'desc',
				}
				break
			}
			default: {
				orderBy = undefined
				break
			}
		}
	}

	return await db.user.findMany({
		where: {
			id: {
				not: userId,
			},
			username: {
				contains: input.searchValue,
				mode: 'insensitive',
			},
			followers: input.onlyUnfollowed ? { 
				none: {
					followerId: userId
				}
			} : undefined
		},
		orderBy,
		take: input.take,
		include: {
			_count: {
				select: {
					followers: true,
				},
			},
		},
	})
}
