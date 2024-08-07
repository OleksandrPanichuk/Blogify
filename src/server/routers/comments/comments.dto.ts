import { FormErrors } from '@/constants'
import { Comment } from '@prisma/client'
import { z } from 'zod'

export const getCommentsSchema = z.object({
	postId: z.string().uuid(),
	take: z.number().positive().optional(),
	cursor: z.string().nullish(),
})

export type GetCommentsInput = z.infer<typeof getCommentsSchema>

export type GetCommentsComment = Comment & {
	creator: {
		id: string
		username: string
		name: string
		image: string | null
	}
	likes: {
		id: string
	}[]
	_count: {
		likes: number
	}
}

export const createCommentSchema = z.object({
	postId: z.string().uuid(),
	text: z
		.string({ required_error: FormErrors.required.comment })
		.trim()
		.min(3, FormErrors.length.comment),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>

export const deleteCommentSchema = z.object({
	commentId: z.string().uuid(),
	postId: z.string().uuid()
})

export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>
