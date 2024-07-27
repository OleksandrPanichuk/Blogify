import { usersRouter } from './routers'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
	users: usersRouter,
})
export type AppRouter = typeof appRouter

export * from './routers'
export * from './trpc'
