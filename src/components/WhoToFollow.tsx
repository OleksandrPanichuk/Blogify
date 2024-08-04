'use client'

import { useFollow } from '@/api'
import { Routes } from '@/constants'
import { formatCount } from '@/lib'
import { api } from '@/providers'
import {
	Avatar,
	Button,
	Flex,
	List,
	ListItem,
	Paper,
	Skeleton,
	Text,
	Title,
} from '@mantine/core'
import { User } from '@prisma/client'
import Link from 'next/link'

export const WhoToFollow = () => {
	const { data, isLoading } = api.users.get.useQuery({
		take: 4,
		sortBy: 'followers',
		onlyUnfollowed: true,
	})

	if (!isLoading && data?.length === 0) {
		return null
	}

	return (
		<Paper p={12} withBorder>
			<Flex direction={'column'} gap='sm'>
				<Title order={5}>Who to follow</Title>
				<List w={'100%'} className='flex flex-col gap-2'>
					{isLoading
						? Array(5)
								.fill(0)
								.map((_, index) => (
									<Skeleton h={16} component='li' key={index} width={'70%'} />
								))
						: data?.map(user => (
								<ListItem
									w={'100%'}
									classNames={{ itemLabel: 'w-full', itemWrapper: 'w-full' }}
									key={user.id}
								>
									<Item user={user} />
								</ListItem>
						  ))}
				</List>
				{!isLoading && (
					<Button
						variant='transparent'
						className='hover:underline self-start'
						component={Link}
						href={Routes.USERS}
					>
						Show more
					</Button>
				)}
			</Flex>
		</Paper>
	)
}

type ItemProps = {
	user: User & {
		_count: {
			followers: number
		}
	}
}

const Item = ({ user }: ItemProps) => {
	const { mutate: follow, isPending } = useFollow()
	return (
		<Flex w={'100%'} gap={8}>
			<Link href={Routes.PROFILE(user.username)}>
				<Avatar
					src={user.image}
					alt={`avatar ${user.name}`}
					name={user.name}
					color='initials'
				/>
			</Link>
			<Flex className='flex-1' direction={'column'}>
				<Text
					component={Link}
					href={Routes.PROFILE(user.username)}
					className='text-black dark:text-white line-clamp-1'
					size='sm'
				>
					{user.name}
				</Text>

				<Text
					component='span'
					className='text-zinc-700 dark:text-zinc-300'
					size='xs'
				>
					{formatCount(user._count.followers, {
						one: 'follower',
						plural: 'followers',
					})}
				</Text>
			</Flex>
			<Button
				size='xs'
				onClick={() => follow({ followingId: user.id })}
				disabled={isPending}
			>
				{'Follow'}
			</Button>
		</Flex>
	)
}
