'use client'

import { Routes } from '@/constants'
import { extractUsername } from '@/features/notifications'
import { cn, formatRelativeDate } from '@/lib'
import { Box, Flex, Paper, Text } from '@mantine/core'
import { Notification, NotificationType } from '@prisma/client'
import {
	IconHeartFilled,
	IconMessage,
	IconMessages,
	IconUserMinus,
	IconUserPlus,
	TablerIcon,
} from '@tabler/icons-react'
import Link from 'next/link'
import { forwardRef, memo } from 'react'

type Props = {
	data: Notification
}

const iconsMap: Record<
	NotificationType,
	{
		icon: TablerIcon
		iconClass: string
	}
> = {
	COMMENT: {
		icon: IconMessage,
		iconClass: 'text-[rgb(2, 132, 199)]',
	},
	LIKE: {
		icon: IconHeartFilled,
		iconClass: 'text-[red]',
	},
	REPLY: {
		icon: IconMessages,
		iconClass: 'text-[rgb(2, 132, 199)]',
	},
	FOLLOW: {
		icon: IconUserPlus,
		iconClass: 'text-black dark:text-zinc-100',
	},
	UNFOLLOW: {
		icon: IconUserMinus,
		iconClass: 'text-black dark:text-zinc-100',
	},
}

export const NotificationCard = memo(
	forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
		const { icon: Icon, iconClass } = iconsMap[data.type]

		const { before, after, username } = extractUsername(data.message)

		return (
			<Paper ref={ref} className='rounded-xl p-3' withBorder>
				<Flex align='center' gap={8}>
					<Icon className={cn('size-8 min-w-8', iconClass)} />
					<Box>
						<Text>
							{before}{' '}
							<Link href={Routes.PROFILE(username)}>
								<Text component='span' className='hover:underline' fw={700}>
									@{username}
								</Text>
							</Link>{' '}
							{after}
						</Text>
						<Text c='gray' size='xs'>
							{formatRelativeDate(data.createdAt)}
						</Text>
					</Box>
				</Flex>
			</Paper>
		)
	})
)

NotificationCard.displayName = 'NotificationCard'
