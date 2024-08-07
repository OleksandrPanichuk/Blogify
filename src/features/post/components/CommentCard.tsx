'use client'

import { LikeButton } from '@/components'
import { Routes } from '@/constants'
import { CommentActions } from '@/features/post'
import { formatRelativeDate } from '@/lib'
import { useAuth } from '@/providers'
import { GetCommentsComment } from '@/server'
import { Avatar, Flex, Paper, Text } from '@mantine/core'
import { LikeType } from '@prisma/client'
import Link from 'next/link'
import { forwardRef } from 'react'

type Props = {
	data: GetCommentsComment
}

export const CommentCard = forwardRef<HTMLDivElement, Props>(
	({ data }, ref) => {
		const { user } = useAuth()
		return (
			<Paper className='rounded-2xl p-3' ref={ref} withBorder>
				<Flex gap={8} align='center'>
					<Avatar
						src={data.creator.image}
						name={data.creator.name}
						alt={data.creator.name}
						color='initials'
					/>
					<Flex direction='column' className='flex-1' align='flex-start'>
						<Text component={Link} href={Routes.PROFILE(data.creator.username)}>
							{data.creator.name}
						</Text>
						<Text c='gray' size='xs'>
							{formatRelativeDate(data.createdAt)}
						</Text>
					</Flex>
					{user?.id === data.creatorId && (
						<CommentActions postId={data.postId} commentId={data.id} />
					)}
				</Flex>
				<Text component='pre'>{data.text}</Text>
				<LikeButton
					count={data._count.likes}
					likes={data.likes}
					itemId={data.id}
					type={LikeType.COMMENT}
				/>
			</Paper>
		)
	}
)

CommentCard.displayName = 'CommentCard'
