import { db } from '@/lib'
import type { GetTagsInput } from './tags.dto'

export const getTags = async (input: GetTagsInput) => {
	return await db.tag.findMany({
		where: {
			name: {
				contains: input.searchValue,
				mode: 'insensitive'
			}
		},
		take: input.take,
	})
}
