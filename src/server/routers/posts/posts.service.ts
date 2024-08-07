import { TAKE_POSTS } from '@/constants'
import { db } from '@/lib'
import { deleteFile } from '@/server/uploadthing'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import type {
	CreatePostInput,
	DeletePostInput,
	GetFullPostResponse,
	GetPostByIdInput,
	GetPostByIdWithTagsResponse,
	GetPostsInput,
	GetPostsResponse,
	UpdatePostInput,
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

export const updatePost = async (input: UpdatePostInput, userId: string) => {
	const post = await db.post.findUnique({
		where: {
			id: input.id,
		},
		select: {
			image: true,
			creatorId: true,
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	})

	if (!post) {
		throw new TRPCError({
			message: 'Post not found',
			code: 'NOT_FOUND',
		})
	}

	if (post.creatorId !== userId) {
		throw new TRPCError({
			message: "You cannot edit another user's post",
			code: 'FORBIDDEN',
		})
	}

	if (post.image && input.image !== post.image) {
		await deleteFile(post.image)
	}

	const existingTags = await db.tag.findMany({
		where: {
			name: { in: input.tags },
		},
		select: {
			id: true,
			name: true,
		},
	})

	const existingTagNames = existingTags.map(tag => tag.name)
	const newTagNames = input.tags.filter(tag => !existingTagNames.includes(tag))

	const newTags = await Promise.all(
		newTagNames.map(name =>
			db.tag.create({
				data: { name },
				select: { id: true, name: true },
			})
		)
	)

	const allTags = [...existingTags, ...newTags]

	const currentTagIds = post.tags.map(tag => tag.id)
	const newTagIds = allTags.map(tag => tag.id)

	const tagsToDisconnect = currentTagIds.filter(
		tagId => !newTagIds.includes(tagId)
	)
	const tagsToConnect = newTagIds.filter(
		tagId => !currentTagIds.includes(tagId)
	)

	return await db.post.update({
		where: {
			id: input.id,
			creatorId: userId,
		},
		data: {
			...input,
			tags: {
				disconnect: tagsToDisconnect.map(id => ({ id })),
				connect: tagsToConnect.map(id => ({ id })),
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

export const getPosts = async (
	input: GetPostsInput,
	userId: string
): Promise<GetPostsResponse> => {
	const limit = input.take ?? TAKE_POSTS
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
			OR: [
				{
					title: {
						contains: input.searchValue,
						mode: 'insensitive',
					},
				},
				{
					tags: {
						some: {
							name: {
								startsWith: input.searchValue,
								mode: 'insensitive',
							},
						},
					},
				},
			],
			...(input.creatorId && {
				creatorId: input.creatorId,
			}),
			...(input.type === 'following' && {
				creator: {
					followers: {
						some: {
							followerId: userId,
						},
					},
				},
			}),
			...(input.bookmarked && {
				bookmarks: {
					some: {
						userId,
					},
				},
			}),
			...(input.liked && {
				likes: {
					some: {
						userId,
					},
				},
			}),
			...(input.tagId && {
				tags: {
					some: {
						id: input.tagId,
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

export const getPostByIdWithTags = async (
	input: GetPostByIdInput,
	userId: string
): Promise<GetPostByIdWithTagsResponse> => {
	const post = await db.post.findUnique({
		where: {
			id: input.id,
			creatorId: input.isCreator ? userId : undefined,
		},
		include: {
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	})

	if (!post) {
		throw new TRPCError({
			message: 'Post not found',
			code: 'NOT_FOUND',
		})
	}

	return post
}

export const getFullPost = async (
	input: GetPostByIdInput,
	userId: string
): Promise<GetFullPostResponse> => {
	const post = await db.post.findUnique({
		where: {
			id: input.id,
			creatorId: input.isCreator ? userId : undefined,
		},
		include: {
			creator: {
				select: {
					id: true,
					username: true,
					name: true,
					image: true,
					followers: {
						where: {
							followerId: userId,
						},
						select: {
							id: true,
						},
					},
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
			comments: {
				include: {
					creator: {
						select: {
							id: true,
							username: true,
							name: true,
							image: true,
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
					_count: {
						select: {
							likes: true,
						},
					},
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
			tags: {
				select: {
					id: true,
					name: true,
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

	if (!post) {
		throw new TRPCError({
			message: 'Post not found',
			code: 'NOT_FOUND',
		})
	}

	return post
}
