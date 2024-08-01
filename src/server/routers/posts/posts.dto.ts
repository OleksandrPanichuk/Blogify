import { FormErrors } from '@/constants'
import { Post } from '@prisma/client'
import { z } from 'zod'

export const createPostSchema = z.object({
	title: z
		.string({ required_error: FormErrors.required.title })
		.trim()
		.min(1, FormErrors.required.title)
		.min(2, FormErrors.length.title.short)
		.max(255, FormErrors.length.title.long),
	description: z
		.string({ required_error: FormErrors.required.description })
		.trim()
		.min(1, FormErrors.required.description)
		.min(10, FormErrors.length.description),
	content: z.string({ required_error: FormErrors.required.content }),
	image: z.string().url().optional(),
	tags: z
		.array(z.string().trim().min(2, FormErrors.length.tags), {
			required_error: FormErrors.required.tags,
		})
		.min(1, FormErrors.required.tags),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const getPostsSchema = z.object({
	searchValue: z.string().optional(),
	take: z.number().positive().optional(),
	cursor: z.string().nullish(),
	sortBy: z.enum(['newest', 'popular']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	type: z.enum(['general', 'following']).optional(),
})

export type GetPostsInput = z.infer<typeof getPostsSchema>

export type GetPostsPost = Post & {
	creator: {
		id: string
		username: string
		name: string
		image: string | null
	}
	tags: {
		id: string
		name: string
	}[]

	likes: {
		id: string
	}[]
	bookmarks: {
		id: string
	}[]
	_count: {
		likes: number
		comments: number
		tags: number
	}
}
export type GetPostsResponse = {
	posts: GetPostsPost[]
	nextCursor: string | undefined
}

export const deletePostSchema = z.object({
	id: z.string().uuid(),
})

export type DeletePostInput = z.infer<typeof deletePostSchema>
