import { z } from 'zod'

export const toggleLikeSchema = z.object({
	postId: z.string().uuid(),
})


export type ToggleLikeInput = z.infer<typeof toggleLikeSchema>