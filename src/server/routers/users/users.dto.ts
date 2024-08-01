import { z } from "zod"

export const getUsersSchema = z.object({
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	sortBy: z.enum(['followers','username']).optional(),
	sortOrder: z.enum(['asc','desc']).optional(),
	onlyUnfollowed: z.boolean().optional()
})

export type GetUsersInput = z.infer<typeof getUsersSchema>