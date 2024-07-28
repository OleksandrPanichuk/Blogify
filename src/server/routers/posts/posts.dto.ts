import { FormErrors } from '@/constants'
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
