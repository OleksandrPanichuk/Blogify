import { LikeType } from '@prisma/client'
import { z } from 'zod'

export const toggleLikeSchema = z.object({
	itemId: z.string().uuid(),
	type: z.nativeEnum(LikeType),
})

export type ToggleLikeInput = z.infer<typeof toggleLikeSchema>
