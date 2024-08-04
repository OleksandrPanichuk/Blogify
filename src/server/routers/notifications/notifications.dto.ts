import { NotificationType } from '@prisma/client'
import { z } from 'zod'

export const getNotificationsSchema = z.object({
	take: z.number().positive().optional(),
	type: z.nativeEnum(NotificationType).optional(),
	cursor: z.string().nullish(),
})

export type GetNotificationsInput = z.infer<typeof getNotificationsSchema>
