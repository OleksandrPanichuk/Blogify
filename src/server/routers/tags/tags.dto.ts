import { z } from 'zod'

export const getTagsSchema = z.object({
	take: z.number().positive().optional(),
	searchValue: z.string().optional(),
})


export type GetTagsInput = z.infer<typeof getTagsSchema>