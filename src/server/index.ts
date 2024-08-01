export * from './routers'

import {
	bookmarksRouter,
	followsRouter,
	likesRouter,
	postsRouter,
	tagsRouter,
	usersRouter,
} from './routers'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
	users: usersRouter,
	posts: postsRouter,
	tags: tagsRouter,
	likes: likesRouter,
	bookmarks: bookmarksRouter,
	follows: followsRouter,
})

export type AppRouter = typeof appRouter
