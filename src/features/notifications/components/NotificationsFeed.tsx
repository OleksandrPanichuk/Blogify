'use client'

import { Loader } from '@/components'
import {
	NotificationCard,
	useNotificationsStore,
} from '@/features/notifications'
import { api } from '@/providers'
import { Stack, Text } from '@mantine/core'
import { useCallback, useRef } from 'react'

export const NotificationsFeed = () => {
	const type = useNotificationsStore(s => s.type)

	const observer = useRef<IntersectionObserver>()

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
		api.notifications.get.useInfiniteQuery(
			{
				type: type === 'ALL' ? undefined : type,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			}
		)

	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return

			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetching) {
					fetchNextPage()
				}
			})

			if (node) observer.current.observe(node)
		},
		[fetchNextPage, hasNextPage, isFetching, isLoading]
	)

	if (!data?.pages?.[0].notifications.length && !isLoading) {
		return <Text mt={16}>Nothing found</Text>
	}

	return (
		<Stack gap='md' my={16}>
			{data?.pages.map(page =>
				page.notifications.map(notification => (
					<NotificationCard
						key={notification.id}
						data={notification}
						ref={lastElementRef}
					/>
				))
			)}
			{isFetching && <Loader />}
		</Stack>
	)
}
