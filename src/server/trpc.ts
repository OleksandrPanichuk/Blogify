import { uncachedValidateRequest } from '@/lib'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { appRouter } from '.'

export const createTRPCContext = async () => {
	const { session, user } = await uncachedValidateRequest()
	return {
		session,
		user,
	}
}

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	isServer: true,
	allowOutsideOfServer: true,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
})



export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session || !ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}
	return next({
		ctx: {
			session: { ...ctx.session },
			user: { ...ctx.user },
		},
	})
})

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
export type ProtectedTRPCContext = TRPCContext & {
	user: NonNullable<TRPCContext['user']>
	session: NonNullable<TRPCContext['session']>
}


