import { FormErrors } from '@/constants'
import { User } from '@prisma/client'
import { z } from 'zod'

export const getUsersSchema = z.object({
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	sortBy: z.enum(['followers', 'username', 'name']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	onlyUnfollowed: z.boolean().optional(),
	cursor: z.string().nullish(),
	takeFollowers: z.boolean().optional(),
	takeFollowing: z.boolean().optional(),
})

export type GetUsersInput = z.infer<typeof getUsersSchema>

export type GetUsersUser = User & {
	followers: {
		id: string
	}[]
	_count: {
		followers: number
	}
}
export type GetUsersResponse = {
	users: GetUsersUser[]
	nextCursor: string | undefined
}

export const getUserSchema = z.object({
	username: z.string(),
})

export type GetUserInput = z.infer<typeof getUserSchema>

export type FullUser = User & {
	followers: {
		id: string
	}[]
	_count: {
		followers: number
		following: number
	}
}

export const updateUserSchema = z.object({
	username: z
		.string({ required_error: FormErrors.required.username })
		.trim()
		.min(1, FormErrors.required.username)
		.refine(value => !/\s/.test(value), {
			message: FormErrors.invalid.username,
		}),
	name: z
		.string({ required_error: FormErrors.required.name })
		.trim()
		.min(1, FormErrors.required.name),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>


export const updateUserAvatarSchema = z.object({
	image: z.string().url().nullish(),
})

export type UpdateUserAvatarInput = z.infer<typeof updateUserAvatarSchema>