'use client'

import { useToggleFollow } from '@/api'
import { Routes } from '@/constants'
import { formatCount } from '@/lib'
import type { GetUsersUser } from '@/server'
import { Avatar, Button, Flex, Paper, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { forwardRef, memo, MouseEvent, useState } from 'react'

type Props = {
	data: GetUsersUser
}

export const UserCard = memo(
	forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
		const [isFollowing, setIsFollowing] = useState<boolean>(
			!!data.followers.length
		)
		const [followersCount, setFollowersCount] = useState(data._count.followers)

		const router = useRouter()

		const { isPending, mutate: toggleFollow } = useToggleFollow({
			onError: () => {
				setFollowersCount(followersCount - (isFollowing ? 1 : -1))
				setIsFollowing(!isFollowing)
			},
		})

		const onFollow = (e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			setFollowersCount(followersCount + (isFollowing ? -1 : 1))
			setIsFollowing(!isFollowing)
			toggleFollow({ followingId: data.id })
		}

		return (
			<Paper
				className='rounded-2xl p-3 cursor-pointer'
				ref={ref}
				onClick={() => router.push(Routes.PROFILE(data.username))}
				withBorder
			>
				<Flex gap={8}>
					<Avatar
						src={data.image}
						alt={data.name}
						name={data.name}
						size={40}
						color={'initials'}
					/>
					<Flex direction='column' className='flex-1'>
						<p>
							<Text component='span' size='md' className='hover:underline'>
								{data.name}
							</Text>
							<Text component='span' size='xs'>
								(
								{formatCount(followersCount, {
									one: 'follower',
									plural: 'followers',
								})}
								)
							</Text>
						</p>
						<Text size='sm' c='gray'>
							@{data.username}
						</Text>
					</Flex>
					<Button
						disabled={isPending}
						onClick={onFollow}
						variant={isFollowing ? 'light' : 'filled'}
						type='button'
						className='relative z-50'
					>
						{isFollowing ? 'Unfollow' : 'Follow'}
					</Button>
				</Flex>
			</Paper>
		)
	})
)

UserCard.displayName = 'UserCard'
