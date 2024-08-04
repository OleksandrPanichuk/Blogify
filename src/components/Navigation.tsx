'use client'
import { Routes } from '@/constants'
import { cn } from '@/lib'
import { api } from '@/providers'
import { Badge, Button, Flex, Paper } from '@mantine/core'
import { IconBookmark, IconHome, IconNotification } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
	const pathname = usePathname()

	const { data: unseenCount } = api.notifications.getUnseenCount.useQuery(
		undefined,
		{
			refetchInterval: 60 * 1000,
		}
	)

	return (
		<Paper
			p={12}
			className='lg:w-1/6 w-full sm:w-min gap-2 flex flex-row justify-center sm:justify-stretch sm:flex-col sticky top-[76px] left-0'
			withBorder
		>
			<Button
				component={Link}
				href={Routes.POSTS}
				color='gray'
				variant='subtle'
				w={'100%'}
				className={cn(
					'px-[5px] lg:px-2 flex justify-center sm:justify-start',
					pathname === Routes.POSTS && 'bg-zinc-100 dark:bg-neutral-700'
				)}
			>
				<Flex
					component='span'
					className='flex justify-start items-center lg:gap-2'
				>
					<IconHome />
					<span className='hidden lg:inline'>Home</span>
				</Flex>
			</Button>
			<Button
				component={Link}
				href={Routes.NOTIFICATIONS}
				color='gray'
				variant='subtle'
				w={'100%'}
				className={cn(
					'px-[5px] lg:px-2 flex justify-center sm:justify-start relative',
					pathname.startsWith(Routes.NOTIFICATIONS) &&
						'bg-zinc-100 dark:bg-neutral-700'
				)}
			>
				<Flex
					component='span'
					className='flex justify-start items-center lg:gap-2'
				>
					<IconNotification />
					<span className='hidden lg:inline'>Notifications</span>
				</Flex>
				{!!unseenCount && (
					<Badge
						color='red'
						size='xs'
						className='absolute top-[5%] left-[2%]'
						circle
					>
						{unseenCount}
					</Badge>
				)}
			</Button>
			<Button
				component={Link}
				href={Routes.BOOKMARKS}
				color='gray'
				variant='subtle'
				w={'100%'}
				className={cn(
					'px-[5px] lg:px-2 flex justify-center sm:justify-start',
					pathname === Routes.BOOKMARKS && 'bg-zinc-100 dark:bg-neutral-700'
				)}
			>
				<Flex
					component='span'
					className='flex justify-start items-center lg:gap-2'
				>
					<IconBookmark />
					<span className='hidden lg:inline'>Bookmarks</span>
				</Flex>
			</Button>
		</Paper>
	)
}
