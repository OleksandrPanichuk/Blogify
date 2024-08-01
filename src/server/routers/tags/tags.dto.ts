import { z } from 'zod'

export const getTagsSchema = z.object({
	take: z.number().positive().optional(),
	searchValue: z.string().optional(),
	sortBy: z.enum(['count']).optional(),
	sortOrder: z.enum(['asc','desc']).optional(),
	withCount: z.boolean().optional()
})

export type GetTagsInput = z.infer<typeof getTagsSchema>
