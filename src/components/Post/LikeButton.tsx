'use client'

import { useToggleLike } from '@/api'
import { formatCount } from '@/lib'
import type { GetPostsPost } from '@/server'
import { ActionIcon, Flex } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useState } from 'react'

type Props = {
	postId: string
	likes: GetPostsPost['likes']
	count: number
}

export const LikeButton = ({ likes, count: initialCount, postId }: Props) => {
	const [liked, setLiked] = useState(!!likes.length)
	const [count, setCount] = useState(initialCount)
	const { mutate: toggleLike, isPending } = useToggleLike()

	const onClick = () => {
		if (isPending) {
			return
		}
		toggleLike({ postId })
		setCount(prev => prev + (liked ? -1 : 1))
		setLiked(prev => !prev)
	}

	return (
		<Flex align='center' gap={4}>
			<ActionIcon
				onClick={onClick}
				variant='transparent'
				color='red'
				className={
					'transition-all duration-300 active:scale-90 focus:scale-110'
				}
			>
				{liked ? <IconHeartFilled /> : <IconHeart />}
			</ActionIcon>
			{formatCount(count, {
				one: 'like',
				plural: 'likes',
			})}
		</Flex>
	)
}
