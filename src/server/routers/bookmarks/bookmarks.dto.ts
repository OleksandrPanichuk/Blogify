import { z } from "zod"


export const toggleBookmarkSchema = z.object({
	postId: z.string().uuid()
})

export type ToggleBookmarkInput = z.infer<typeof toggleBookmarkSchema>