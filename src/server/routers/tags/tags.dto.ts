import { z } from 'zod'

export const getTagsSchema = z.object({
	take: z.number().positive().optional(),
	searchValue: z.string().optional(),
	sortBy: z.enum(['count', 'name']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	withCount: z.boolean().optional(),
	cursor: z.string().nullish(),
})

export type GetTagsInput = z.infer<typeof getTagsSchema>

export const getTagSchema = z.object({
	id: z.string().uuid(),
})

export type GetTagInput = z.infer<typeof getTagSchema>
