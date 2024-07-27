import { db } from '@/lib'
import type { CreatePostInput } from './posts.dto'

export const createPost = async (
	input: CreatePostInput
) => {
	return  await db.post.create({
		data: { ...input },
	})
}
