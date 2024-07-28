import { db } from '@/lib'
import type { CreatePostInput } from './posts.dto'

export const createPost = async (input: CreatePostInput) => {
	const { image, tags, ...dto } = input

	const tagConnections = await Promise.all(
		tags.map(async tagName => {
			let tag = await db.tag.findFirst({ where: { name: tagName } })
			if (!tag) {
				tag = await db.tag.create({ data: { name: tagName } })
			}
			return { id: tag.id }
		})
	)

	return await db.post.create({
		data: {
			...dto,
			image,
			tags: {
				connect: tagConnections,
			},
		},
	})
}
