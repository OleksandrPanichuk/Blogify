import { z } from "zod"


export const followSchema = z.object({
	followingId: z.string().uuid()
})

export const toggleFollowSchema = followSchema


export type FollowInput = z.infer<typeof followSchema>
export type ToggleFollowInput = z.infer<typeof toggleFollowSchema>