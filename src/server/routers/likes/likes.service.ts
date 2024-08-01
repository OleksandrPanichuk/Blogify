import { db } from '@/lib'
import type { ToggleLikeInput } from './likes.dto'

export const toggleLike = async (
	{ postId }: ToggleLikeInput,
	userId: string
) => {
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
	return await db.like.create({
		data: {
			userId,
			postId,
			type: 'POST',
		},
	})
}
