import { db } from '@/lib'
import { Prisma } from '@prisma/client'
import type { GetTagsInput } from './tags.dto'

export const getTags = async (input: GetTagsInput) => {
	let orderBy: Prisma.TagOrderByWithRelationInput | undefined

	if (input.sortBy) {
		switch (input.sortBy) {
			case 'count': {
				orderBy = {
					posts: {
						_count: input.sortOrder ?? 'desc',
					},
				}
				break
			}
			default: {
				orderBy = undefined
			}
		}
	}

	return await db.tag.findMany({
		where: {
			name: {
				contains: input.searchValue,
				mode: 'insensitive',
			},
		},
		take: input.take,
		orderBy,
		include: {
			_count: !!input.withCount,
		},
	})
}
