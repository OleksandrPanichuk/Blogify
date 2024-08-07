'use client'

import { Loader, Post } from '@/components'
import { api, usePostsContext } from '@/providers'
import { Stack, Text } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useRef } from 'react'

type Props = {
	bookmarked?: boolean
	liked?: boolean
	tagId?: string
	creatorId?: string
}

export const Feed = (props: Props) => {
	const { sortBy, type } = usePostsContext()
	
	const searchParams = useSearchParams()
	const observer = useRef<IntersectionObserver>()

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
		api.posts.get.useInfiniteQuery(
			{
				type,
				sortBy,
				searchValue: searchParams.get('q') ?? undefined,
				...props,
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

	if (!data?.pages?.[0].posts.length && !isLoading) {
		return <Text mt={16}>Nothing found</Text>
	}

	return (
		<Stack gap={'md'} my={16}>
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.posts.map(post => (
						<Post key={post.id} data={post} ref={lastElementRef} />
					))}
				</Fragment>
			))}
			{isFetching && <Loader />}
		</Stack>
	)
}
