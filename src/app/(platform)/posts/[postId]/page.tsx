import { BookmarkToggle, LikeButton, PostActions } from '@/components'
import {
	CommentForm,
	CommentsCount,
	CommentsList,
	CreatorInfo,
} from '@/features/post'
import { EditorOutput } from '@/features/post-editor'
import { validateRequest } from '@/lib'
import { GetFullPostResponse, serverApi } from '@/server'
import { Box, Divider, Flex, Image, Text, Title } from '@mantine/core'
import { LikeType } from '@prisma/client'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		postId: string
	}
}

const PostPage = async ({ params }: Props) => {
	let post: GetFullPostResponse | undefined
	const { user } = await validateRequest()

	try {
		post = await serverApi.posts.getFullPost({
			id: params.postId,
		})
	} catch {
		post = undefined
	}

	if (!post) {
		return notFound()
	}

	return (
		<Flex direction={'column'} mb={32} gap={16}>
			<Box w='100%'>
				{post.image && (
					<Box w='100%'>
						<Image w='100%' src={post.image} alt={post.description} />
					</Box>
				)}
				<Title mt={16} order={1} fw={700}>
					{post.title}
				</Title>
				<Text>{post.description}</Text>
			</Box>
			<CreatorInfo data={post.creator} createdAt={post.createdAt} />
			<Box>
				<Divider />
				<Flex className='p-2'>
					<Flex
						gap={8}
						justify={'flex-start'}
						align={'center'}
						className='flex-1'
					>
						<LikeButton
							count={post._count.likes}
							likes={post.likes}
							itemId={post.id}
							type={LikeType.POST}
						/>

						<CommentsCount defaultCount={post._count.comments} />
					</Flex>
					<Flex gap={8}>
						<BookmarkToggle bookmarks={post.bookmarks} postId={post.id} />
						{post.creator.id === user?.id && <PostActions postId={post.id} />}
					</Flex>
				</Flex>
				<Divider />
			</Box>
			<EditorOutput content={post.content} />
			<Divider />
			<CommentForm postId={post.id} />
			<CommentsList postId={post.id} />
		</Flex>
	)
}

export default PostPage
