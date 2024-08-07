import { Follower } from '@prisma/client'
import { z } from 'zod'

export const followSchema = z.object({
	followingId: z.string().uuid(),
})

export const toggleFollowSchema = followSchema

export type FollowInput = z.infer<typeof followSchema>
export type ToggleFollowInput = z.infer<typeof toggleFollowSchema>

export type ToggleFollowResponse = {
	data: Follower & {
		following: {
			name: string
		}
	}
	type: 'follow' | 'unfollow'
}
