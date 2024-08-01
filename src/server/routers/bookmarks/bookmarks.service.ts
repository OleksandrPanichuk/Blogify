import { db } from '@/lib'
import { ToggleBookmarkInput } from './bookmarks.dto'

export const toggleBookmark = async (
	{ postId }: ToggleBookmarkInput,
	userId: string
) => {
	const existingBookmark = await db.bookmark.findFirst({
		where: {
			userId,
			postId,
		},
	})

	if (existingBookmark) {
		return await db.bookmark.delete({
			where: {
				id: existingBookmark.id,
			},
		})
	}

	return await db.bookmark.create({
		data: {
			userId,
			postId,
		},
	})
}
