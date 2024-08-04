'use client'

import { Loader } from '@/components'
import { Routes } from '@/constants'
import { useTagsStore } from '@/features/tags'
import { formatCount } from '@/lib'
import { api } from '@/providers'
import { Flex, Stack, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import Link from 'next/link'
import { useCallback, useRef } from 'react'

export const TagsSearchResults = () => {
	const { searchValue, sortBy } = useTagsStore(s => ({
		searchValue: s.searchValue,
		sortBy: s.sortBy,
	}))
	const [debouncedSearchValue] = useDebouncedValue(searchValue, 150)

	const observer = useRef<IntersectionObserver>()

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		api.tags.get.useInfiniteQuery(
			{
				searchValue: debouncedSearchValue,
				sortBy: sortBy,
				sortOrder: sortBy === 'count' ? 'desc' : 'asc',
				withCount: true,
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

	if (!data?.pages?.[0].tags.length && !isLoading) {
		return null
	}

	return (
		<Stack gap={6} my={16}>
			{data?.pages.map(page =>
				page.tags.map(tag => (
					<Flex
						key={tag.id}
						justify='space-between'
						gap={8}
						ref={lastElementRef}
					>
						<Text size='md'>
							<Link href={Routes.TAG(tag.id)} className='hover:underline'>
								{tag.name}
							</Link>
						</Text>
						<Text size='xs' c='gray'>
							{formatCount(tag._count.posts, {
								one: 'post',
								plural: 'posts',
							})}
						</Text>
					</Flex>
				))
			)}
			{isFetching && <Loader />}
		</Stack>
	)
}
