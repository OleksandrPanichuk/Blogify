'use client'
import { useToggleFollow } from '@/api'
import { Routes } from '@/constants'
import { cn, formatRelativeDate } from '@/lib'
import { useAuth } from '@/providers'
import { GetFullPostResponse } from '@/server'
import { Avatar, Flex, Text } from '@mantine/core'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'

type Props = {
	data: GetFullPostResponse['creator']
	createdAt: Date
}

export const CreatorInfo = ({ data, createdAt }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(
		!!data.followers.length
	)

	const { user } = useAuth()

	const { isPending, mutate: toggleFollow } = useToggleFollow({
		onError: () => {
			setIsFollowing(!isFollowing)
		},
	})

	const onFollow = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setIsFollowing(!isFollowing)
		toggleFollow({ followingId: data.id })
	}

	return (
		<Flex gap={8} my={16} align='center'>
			<Avatar
				src={data.image}
				alt={data.name}
				name={data.name}
				size={40}
				color={'initials'}
			/>
			<Flex direction='column'>
				<Flex gap={8} align={'center'}>
					<Link href={Routes.PROFILE(data.username)}>
						<Text size='md' className='hover:underline'>
							{data.name}
						</Text>
					</Link>
					{user?.id !== data.id && (
						<>
							<Text c='gray' component='span'>
								&#183;
							</Text>
							<button
								disabled={isPending}
								className={cn(
									isFollowing
										? 'text-zinc-800 dark:text-zinc-200'
										: 'text-green-700',
									'disabled:pointer-events-none disabled:text-zinc-500'
								)}
								onClick={onFollow}
							>
								{isFollowing ? 'Unfollow' : 'Follow'}
							</button>
						</>
					)}
				</Flex>
				<Text c='gray' size='xs'>
					{formatRelativeDate(createdAt)}
				</Text>
			</Flex>
		</Flex>
	)
}
