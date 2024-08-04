export * from './routers'

import {
	bookmarksRouter,
	followsRouter,
	likesRouter,
	notificationsRouter,
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
	notifications: notificationsRouter,
})

export type AppRouter = typeof appRouter
