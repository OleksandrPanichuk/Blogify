'use client'

import { formatCount, formatRelativeDate } from '@/lib'
import { useAuth } from '@/providers'
import type { GetPostsPost } from '@/server'
import {
	Avatar,
	Box,
	Divider,
	Flex,
	Image,
	Paper,
	Text,
	Title,
} from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'
import Link from 'next/link'
import { forwardRef, memo } from 'react'
import { BookmarkToggle } from './BookmarkToggle'
import { LikeButton } from './LikeButton'
import { PostActions } from './PostActions'

type Props = {
	data: GetPostsPost
}

export const Post = memo(
	forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
		const { image, title, description, creator, likes, bookmarks, id } = data
		const { user } = useAuth()
		return (
			<Paper ref={ref} className='rounded-xl p-3' withBorder>
				<Flex align='center' justify={'space-between'} gap={12}>
					<Flex align='center' gap={12}>
						<Link href={`/profile/${creator.id}`}>
							<Avatar
								src={creator.image}
								alt={creator.name}
								name={creator.name}
								color={'initials'}
							/>
						</Link>
						<Flex direction={'column'}>
							<Flex
								component={Link}
								href={`/profile/${creator.id}`}
								align='center'
								gap={4}
							>
								<Text size='md' fw={700}>
									{creator.name}
								</Text>
								<Text size='xs'>@{creator.username}</Text>
							</Flex>
							<Link
								href={`/posts/${id}`}
								className='block text-sm text-muted-foreground hover:underline'
							>
								{formatRelativeDate(data.createdAt)}
							</Link>
						</Flex>
					</Flex>
					{creator.id === user?.id && <PostActions postId={id} />}
				</Flex>
				<Box my={16}>
					<Title order={3} className='line-clamp-1'>
						<Link href={`/posts/${id}`}>{title}</Link>
					</Title>
					<Text className='line-clamp-4'>
						<Link href={`/posts/${id}`}>{description}</Link>
					</Text>
				</Box>
				{image && (
					<Link href={`/posts/${id}`}>
						<Image src={image} alt={'preview image'} height={100} />
					</Link>
				)}
				<Divider my={8} />
				<Flex align={'center'} justify='space-between' gap={12}>
					<Flex gap={12}>
						<LikeButton likes={likes} count={data._count.likes} postId={id} />
						<Flex component={Link} href={`/posts/${id}`} align='center' gap={4}>
							<IconMessage />
							{formatCount(data._count.comments, {
								one: 'comment',
								plural: 'comments',
							})}
						</Flex>
					</Flex>
					<BookmarkToggle bookmarks={bookmarks} postId={id} />
				</Flex>
			</Paper>
		)
	})
)

Post.displayName = 'Post'
