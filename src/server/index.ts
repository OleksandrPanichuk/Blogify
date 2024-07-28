export * from './routers'

import { postsRouter, tagsRouter, usersRouter } from './routers'
import { createTRPCRouter } from './trpc'


export const appRouter = createTRPCRouter({
	users: usersRouter,
	posts: postsRouter,
	tags: tagsRouter
})

export type AppRouter = typeof appRouter

