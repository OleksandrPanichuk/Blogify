'use client'

import { Loader, UserCard } from '@/components'
import { api } from '@/providers'
import { GetUsersInput } from '@/server'
import { Stack, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useCallback, useRef } from 'react'

type Props = {
	sortBy?: GetUsersInput['sortBy']
	searchValue?: string
	takeFollowing?: boolean
	takeFollowers?: boolean
}

export const UsersFeed = ({
	sortBy,
	searchValue,
	takeFollowers,
	takeFollowing,
}: Props) => {
	const [debouncedSearchValue] = useDebouncedValue(searchValue ?? '', 150)

	const observer = useRef<IntersectionObserver>()

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		api.users.get.useInfiniteQuery(
			{
				searchValue: debouncedSearchValue,
				sortBy: sortBy,
				takeFollowing,
				takeFollowers,
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

	if (!data?.pages?.[0].users.length && !isLoading) {
		return <Text mt={16}>Nothing found</Text>
	}

	return (
		<Stack gap={6} my={16}>
			{data?.pages.map(page =>
				page.users.map(user => (
					<UserCard key={user.id} data={user} ref={lastElementRef} />
				))
			)}
			{isFetching && <Loader />}
		</Stack>
	)
}
