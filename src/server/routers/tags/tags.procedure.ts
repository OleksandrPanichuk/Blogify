import { createTRPCRouter, protectedProcedure } from '@/server/trpc'
import { getTagById, getTags } from './tags.service'
import { getTagSchema, getTagsSchema } from './tags.dto'

export const tagsRouter = createTRPCRouter({
	get: protectedProcedure.input(getTagsSchema).query(({input}) => getTags(input)),
	getById: protectedProcedure.input(getTagSchema).query(({input}) => getTagById(input)),
})
