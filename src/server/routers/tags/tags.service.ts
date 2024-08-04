import { TAKE_TAGS } from '@/constants'
import { db } from '@/lib'
import { Prisma } from '@prisma/client'
import type { GetTagInput, GetTagsInput } from './tags.dto'
import { TRPCError } from '@trpc/server'

export const getTags = async (input: GetTagsInput) => {
	const limit = input.take ?? TAKE_TAGS
	const { cursor } = input

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
			case 'name': {
				orderBy = {
					name: input.sortOrder ?? 'asc',
				}
				break
			}
			default: {
				orderBy = undefined
			}
		}
	}

	const tags =  await db.tag.findMany({
		where: {
			name: {
				contains: input.searchValue,
				mode: 'insensitive',
			},
		},
		take: cursor ? limit + 1 : limit,
		cursor: cursor
			? {
					id: cursor,
			  }
			: undefined,
		orderBy,
		include: {
			_count: !!input.withCount,
		},
	})
	let nextCursor: typeof cursor | undefined = undefined

	if (tags.length > limit) {
		const nextItem = tags.pop()
		nextCursor = nextItem!.id
	}

	return {
		tags,
		nextCursor,
	}
}


export const getTagById = async (input: GetTagInput) => {
	const tag = await db.tag.findUnique({
		where: {
			id: input.id,
		}
	})
	if(!tag) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'Tag not found',
		})
	}
	return tag
}