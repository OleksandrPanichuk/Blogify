'use client'

import { Loader } from '@/components'
import { api } from '@/providers'
import { Stack, Text } from '@mantine/core'
import { useCallback, useRef } from 'react'
import { CommentCard } from './CommentCard'

type Props = {
	postId: string
}

export const CommentsList = ({ postId }: Props) => {
	const observer = useRef<IntersectionObserver>()
	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
		api.comments.get.useInfiniteQuery(
			{
				postId,
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

	if (!data?.pages?.[0].comments.length && !isLoading) {
		return <Text className='text-center'>Be first to leave a comment!</Text>
	}

	return (
		<Stack gap='md' id='comments'>
			{data?.pages.map((page, i) =>
				page.comments.map(comment => (
					<CommentCard key={comment.id} data={comment} ref={lastElementRef} />
				))
			)}
			{isFetching && <Loader />}
		</Stack>
	)
}
