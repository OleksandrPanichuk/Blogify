export * from './routers'

import {
	bookmarksRouter,
	commentsRouter,
	followsRouter,
	likesRouter,
	notificationsRouter,
	postsRouter,
	tagsRouter,
	usersRouter,
} from './routers'
import { createTRPCContext, createTRPCRouter, t} from './trpc'

export const appRouter = createTRPCRouter({
	users: usersRouter,
	posts: postsRouter,
	tags: tagsRouter,
	likes: likesRouter,
	bookmarks: bookmarksRouter,
	follows: followsRouter,
	notifications: notificationsRouter,
	comments: commentsRouter
})


export type AppRouter = typeof appRouter


const createCaller = t.createCallerFactory(appRouter)

export const serverApi = createCaller(createTRPCContext)