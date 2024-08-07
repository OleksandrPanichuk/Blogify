'use client'

import { useToggleFollow } from '@/api'
import { EditProfileButton, useProfileStore } from '@/features/profile'
import { cn, formatCount } from '@/lib'
import { useAuth } from '@/providers'
import { FullUser } from '@/server'
import { Avatar, Box, Flex, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

type Props = {
	initialUser: FullUser
}

export const ProfileInfo = ({ initialUser }: Props) => {
	const { user: currentUser } = useAuth()
	const isCurrentUser = initialUser.id === currentUser?.id

	const {
		user,
		followersCount,
		initializeStore,
		incrementFollowersCount,
		decrementFollowersCount,
	} = useProfileStore()

	const [isFollowing, setIsFollowing] = useState<boolean>(
		!!initialUser.followers.length
	)

	const { mutate: toggleFollow, isPending } = useToggleFollow()

	useEffect(() => {
		initializeStore(initialUser)
	}, [initialUser, initializeStore])

	const onFollow = () => {
		if (isFollowing) {
			decrementFollowersCount()
		} else {
			incrementFollowersCount()
		}
		setIsFollowing(!isFollowing)
		toggleFollow({ followingId: initialUser.id })
	}

	return (
		<Paper className='p-3 rounded-xl flex flex-col gap-4' withBorder>
			<Flex gap={8}>
				<Avatar
					size={64}
					src={user?.image}
					alt={user?.name}
					name={user?.name}
					color='initials'
				/>
				<Box className='flex-1'>
					<Title order={3}>{user?.name}</Title>
					<Text c='gray' size='sm' className='flex gap-2 items-center'>
						<span>@{user?.username}</span>
						<span>&#183;</span>
						{formatCount(followersCount || initialUser._count.followers, {
							one: 'follower',
							plural: 'followers',
						})}
						{user?.id !== currentUser?.id && <>
							<span>&#183;</span>
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
						</button></>}
					</Text>
				</Box>
				{isCurrentUser && <EditProfileButton />}
			</Flex>
		</Paper>
	)
}
