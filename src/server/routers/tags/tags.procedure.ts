import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { getTags } from './tags.service'
import { getTagsSchema } from './tags.dto'

export const tagsRouter = createTRPCRouter({
	get: protectedProcedure.input(getTagsSchema).query(({input}) => getTags(input)),
})
