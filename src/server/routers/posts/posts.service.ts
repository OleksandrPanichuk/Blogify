import { db } from '@/lib'
import { deleteFile } from '@/server/uploadthing'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import type {
	CreatePostInput,
	DeletePostInput,
	GetPostsInput,
	GetPostsResponse,
} from './posts.dto'

export const createPost = async (input: CreatePostInput, userId: string) => {
	const { image, tags, ...dto } = input

	const tagConnections = await Promise.all(
		tags.map(async tagName => {
			let tag = await db.tag.findFirst({ where: { name: tagName } })
			if (!tag) {
				tag = await db.tag.create({ data: { name: tagName } })
			}
			return { id: tag.id }
		})
	)

	return await db.post.create({
		data: {
			...dto,
			image,
			creatorId: userId,
			tags: {
				connect: tagConnections,
			},
		},
	})
}

export const deletePost = async (input: DeletePostInput, userId: string) => {
	const post = await db.post.findUnique({
		where: input,
	})

	if (!post) {
		throw new TRPCError({
			message: 'Post not found',
			code: 'NOT_FOUND',
		})
	}

	if (post.creatorId !== userId) {
		throw new TRPCError({
			message: 'Forbidden',
			code: 'FORBIDDEN',
		})
	}

	if (post.image) {
		await deleteFile(post.image)
	}

	return await db.post.delete({
		where: {
			id: input.id,
			creatorId: userId,
		},
	})
}

export const getPosts = async (input: GetPostsInput, userId: string): Promise<GetPostsResponse> => {
	const limit = input.take ?? 20
	const { cursor } = input

	let orderBy: Prisma.PostOrderByWithRelationInput | undefined

	const sortOrder = input.sortOrder ?? 'desc'

	switch (input.sortBy) {
		case 'newest':
			orderBy = { createdAt: sortOrder }
			break
		case 'popular':
			orderBy = {
				likes: {
					_count: sortOrder,
				},
			}
			break
		default: {
			orderBy = undefined
			break
		}
	}

	const posts = await db.post.findMany({
		where: {
			title: {
				contains: input.searchValue,
				mode: 'insensitive',
			},
			...(input.type === 'following' && {
				creator: {
					followers: {
						some: {
							followerId: userId,
						},
					},
				},
			}),
		},
		take: limit + 1,
		cursor: cursor
			? {
					id: cursor,
			  }
			: undefined,
		orderBy,
		include: {
			creator: {
				select: {
					id: true,
					username: true,
					name: true,
					image: true,
				},
			},
			tags: {
				take: 4,
				select: {
					id: true,
					name: true,
				},
			},
			likes: {
				where: {
					userId,
				},
				select: {
					id: true,
				},
			},
			bookmarks: {
				where: {
					userId,
				},
				select: {
					id: true,
				},
			},
			_count: {
				select: {
					likes: true,
					comments: true,
					tags: true,
				},
			},
		},
	})
	let nextCursor: typeof cursor | undefined = undefined

	if (posts.length > limit) {
		const nextItem = posts.pop()
		nextCursor = nextItem!.id
	}
	return {
		posts,
		nextCursor,
	}
}
