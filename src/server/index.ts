
import { postsRouter, usersRouter } from './routers'
import { createTRPCRouter } from './trpc'

export * from './routers'

export const appRouter = createTRPCRouter({
	users: usersRouter,
	posts: postsRouter,
})

export type AppRouter = typeof appRouter

